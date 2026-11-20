const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-prediksi-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const ProdukSurplus = require('../models/ProdukSurplus');
const DataPenjualan = require('../models/DataPenjualan');
const PrediksiProduksi = require('../models/PrediksiProduksi');
const PrediksiController = require('../controllers/PrediksiController');

let urut = 0;

function tanggalMundur(hari) {
    const dasar = new Date(`${DataPenjualan.tanggalHariIni()}T00:00:00+07:00`);
    dasar.setDate(dasar.getDate() - hari);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(dasar);
}

function pemilikBaru(namaProduk = 'Roti Uji') {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `prediksi-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Dapur Uji ${urut}`,
        alamatUsaha: '-6.9147,107.6098',
        jamOperasional: '08.00-20.00'
    });
    const { idPemilik } = db
        .prepare('SELECT id_pemilik AS idPemilik FROM pemilik_fnb WHERE id_akun = ?')
        .get(idAkun);
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, namaProduk, 'Makanan');
    return { idPemilik, idProduk };
}

function isiRiwayat(idProduk, hari, terjual, tersisa) {
    db.prepare(`
        INSERT INTO data_penjualan (id_produk, tanggal, jumlah_terjual, jumlah_tersisa)
        VALUES (?, ?, ?, ?)
    `).run(idProduk, tanggalMundur(hari), terjual, tersisa);
}

function isiTujuhHari(idProduk, terjual, tersisa) {
    for (let i = 0; i < 7; i += 1) isiRiwayat(idProduk, i, terjual, tersisa);
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('catatPenjualan menyimpan baris hari ini', () => {
    const { idPemilik, idProduk } = pemilikBaru();
    const tanggal = DataPenjualan.catatPenjualan([
        { idProduk, jumlahTerjual: 8, jumlahTersisa: 2 }
    ]);

    assert.equal(tanggal, DataPenjualan.tanggalHariIni());
    const baris = DataPenjualan.getPenjualanHarian(idPemilik, tanggal);
    assert.equal(baris.length, 1);
    assert.equal(baris[0].jumlahTerjual, 8);
    assert.equal(baris[0].jumlahTersisa, 2);
});

test('catatPenjualan kedua memperbarui baris yang sama (upsert)', () => {
    const { idPemilik, idProduk } = pemilikBaru();
    DataPenjualan.catatPenjualan([{ idProduk, jumlahTerjual: 3, jumlahTersisa: 4 }]);
    DataPenjualan.catatPenjualan([{ idProduk, jumlahTerjual: 9, jumlahTersisa: 0 }]);

    const baris = DataPenjualan.getPenjualanHarian(idPemilik, DataPenjualan.tanggalHariIni());
    assert.equal(baris.length, 1);
    assert.equal(baris[0].jumlahTerjual, 9);
    assert.equal(baris[0].jumlahTersisa, 0);
});

test('getDataHistoris hanya memuat jendela tujuh hari terakhir', () => {
    const { idPemilik, idProduk } = pemilikBaru();
    isiRiwayat(idProduk, 0, 5, 1);
    isiRiwayat(idProduk, 6, 6, 1);
    isiRiwayat(idProduk, 7, 99, 9);

    const data = DataPenjualan.getDataHistoris(idPemilik, 7);
    assert.equal(data.length, 2);
    assert.ok(data.every((item) => item.jumlahTerjual !== 99));
});

test('hitungHariTerkumpul menghitung tanggal unik, bukan jumlah baris', () => {
    const { idPemilik, idProduk } = pemilikBaru();
    const idProduk2 = ProdukSurplus.tambahProduk(idPemilik, 'Susu Uji', 'Minuman');
    for (let i = 0; i < 3; i += 1) {
        isiRiwayat(idProduk, i, 4, 1);
        isiRiwayat(idProduk2, i, 2, 1);
    }

    assert.equal(DataPenjualan.hitungHariTerkumpul(idPemilik, 7), 3);
    assert.equal(DataPenjualan.hitungHariTerkumpul(idPemilik, 2), 2);
});

test('hitungRekomendasi menerapkan rumus rata-terjual + 0,5 rata-tersisa', () => {
    assert.equal(PrediksiProduksi.hitungRekomendasi(10, 2), 11);
    assert.equal(PrediksiProduksi.hitungRekomendasi(3, 1), 4);
    assert.equal(PrediksiProduksi.hitungRekomendasi(0, 0), 0);
    assert.equal(PrediksiProduksi.hitungRekomendasi(-5, 0), 0);
    assert.equal(PrediksiProduksi.hitungRekomendasi(NaN, 2), 0);
});

test('simpanPrediksi menolak data kosong', () => {
    assert.throws(() => PrediksiProduksi.simpanPrediksi([]), /tidak boleh kosong/);
    assert.throws(() => PrediksiProduksi.simpanPrediksi(null), /tidak boleh kosong/);
});

test('simpanPrediksi menyimpan hasil dan getHasilPrediksi menghitung tren', () => {
    const { idPemilik, idProduk } = pemilikBaru();
    isiTujuhHari(idProduk, 10, 2);

    const dataHistoris = DataPenjualan.getDataHistoris(idPemilik, 7);
    PrediksiProduksi.simpanPrediksi(dataHistoris);

    const hasil = PrediksiProduksi.getHasilPrediksi(idPemilik);
    assert.equal(hasil.length, 1);
    assert.equal(hasil[0].jumlahRekomendasi, 11);
    assert.equal(hasil[0].terjualTerakhir, 10);
    assert.equal(hasil[0].tren, 1);
    assert.equal(hasil[0].tanggalPrediksi, PrediksiProduksi.tanggalBesok());
});

test('simpanPrediksi kedua memperbarui rekomendasi (upsert)', () => {
    const { idPemilik, idProduk } = pemilikBaru();
    isiTujuhHari(idProduk, 4, 0);
    PrediksiProduksi.simpanPrediksi(DataPenjualan.getDataHistoris(idPemilik, 7));

    db.prepare(`
        UPDATE data_penjualan SET jumlah_terjual = 20 WHERE id_produk = ? AND tanggal = ?
    `).run(idProduk, tanggalMundur(0));
    PrediksiProduksi.simpanPrediksi(DataPenjualan.getDataHistoris(idPemilik, 7));

    const hasil = PrediksiProduksi.getHasilPrediksi(idPemilik);
    assert.equal(hasil.length, 1);
    assert.ok(hasil[0].jumlahRekomendasi > 4);
});

test('cekKecukupanData mensyaratkan tujuh tanggal berbeda', () => {
    const { idPemilik, idProduk } = pemilikBaru();
    for (let i = 0; i < 6; i += 1) isiRiwayat(idProduk, i, 5, 1);

    assert.equal(PrediksiController.cekKecukupanData(idPemilik), false);
    isiRiwayat(idProduk, 6, 5, 1);
    assert.equal(PrediksiController.cekKecukupanData(idPemilik), true);
});

test('jalankanPrediksi menolak data kurang dari tujuh hari', () => {
    const { idPemilik } = pemilikBaru();
    assert.throws(() => PrediksiController.jalankanPrediksi(idPemilik), /minimal 7 hari/);
});

test('tampilkanDashboard menampilkan pesan saat data historis kurang', () => {
    const { idPemilik } = pemilikBaru();
    const hasil = {};
    const res = {
        render(vista, data) {
            hasil.vista = vista;
            hasil.data = data;
        }
    };

    PrediksiController.tampilkanDashboard(
        { user: { idPemilik, namaUsaha: 'Dapur Uji' } },
        res
    );

    assert.equal(hasil.vista, 'fnb/I05-DashboardF&B');
    assert.match(hasil.data.pesanError, /minimal 7 hari/);
    assert.equal(hasil.data.hasilPrediksi.length, 0);
    assert.equal(hasil.data.progres.terisi, 0);
});

test('tampilkanDashboard menjalankan prediksi saat data cukup', () => {
    const { idPemilik, idProduk } = pemilikBaru();
    isiTujuhHari(idProduk, 10, 2);
    const hasil = {};
    const res = {
        render(vista, data) {
            hasil.vista = vista;
            hasil.data = data;
        }
    };

    PrediksiController.tampilkanDashboard(
        { user: { idPemilik, namaUsaha: 'Dapur Uji' } },
        res
    );

    assert.equal(hasil.data.pesanError, null);
    assert.equal(hasil.data.hasilPrediksi.length, 1);
    assert.equal(hasil.data.progres.terisi, 7);
    assert.equal(hasil.data.grafik.length, 7);
    assert.ok(hasil.data.grafik.some((item) => item.hariIni));
});
