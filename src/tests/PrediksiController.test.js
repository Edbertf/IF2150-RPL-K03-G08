const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c25-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const PrediksiController = require('../controllers/PrediksiController');
const PrediksiProduksi = require('../models/PrediksiProduksi');
const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');

let urut = 0;
let nomorProduk = 0;

const formatTanggal = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta'
});

function tanggalJakarta(offsetHari = 0) {
    const dasar = new Date(`${formatTanggal.format(new Date())}T00:00:00+07:00`);
    dasar.setDate(dasar.getDate() + offsetHari);
    return formatTanggal.format(dasar);
}

function buatPemilik() {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c25-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C25 ${urut}`,
        alamatUsaha: 'Jl. C25 No. 1, Bandung',
        jamOperasional: '08.00-20.00'
    });

    const idPemilik = db.prepare(
        'SELECT id_pemilik AS idPemilik FROM pemilik_fnb WHERE id_akun = ?'
    ).get(idAkun).idPemilik;

    return { idAkun, idPemilik };
}

function buatProduk(idPemilik, nama) {
    nomorProduk += 1;
    return db.prepare(`
        INSERT INTO produk (id_pemilik, nama_produk, kategori)
        VALUES (?, ?, ?)
    `).run(
        idPemilik,
        nama || `Produk C25 ${nomorProduk}`,
        'Makanan'
    ).lastInsertRowid;
}

function simpanPenjualan(idProduk, tanggal, jumlahTerjual, jumlahTersisa) {
    db.prepare(`
        INSERT INTO data_penjualan (id_produk, tanggal, jumlah_terjual, jumlah_tersisa)
        VALUES (?, ?, ?, ?)
    `).run(idProduk, tanggal, jumlahTerjual, jumlahTersisa);
}

function isiHari(idProduk, jumlahHari, jumlahTerjual, jumlahTersisa) {
    for (let i = 0; i < jumlahHari; i += 1) {
        simpanPenjualan(idProduk, tanggalJakarta(-i), jumlahTerjual, jumlahTersisa);
    }
}

function ambilPrediksi(idProduk) {
    return db.prepare(`
        SELECT * FROM prediksi_produksi
        WHERE id_produk = ? AND tanggal_prediksi = ?
    `).get(idProduk, PrediksiProduksi.tanggalBesok());
}

function hitungPrediksi() {
    return db.prepare('SELECT COUNT(*) AS jumlah FROM prediksi_produksi').get().jumlah;
}

function reqPalsu({ user = null } = {}) {
    return { user };
}

function resPalsu() {
    return {
        rendered: null,
        render(view, data) {
            this.rendered = { view, data };
            return this;
        }
    };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C25-UT01 cekKecukupanData menerima tujuh tanggal unik', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik, 'Nasi C25');
    const p2 = buatProduk(idPemilik, 'Ayam C25');

    isiHari(p1, 7, 10, 2);
    isiHari(p2, 7, 4, 1);

    assert.equal(PrediksiController.cekKecukupanData(idPemilik), true);
});

test('C25-UT02 cekKecukupanData membedakan enam dan tujuh tanggal unik', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik);
    const p2 = buatProduk(idPemilik);

    isiHari(p1, 6, 5, 1);
    simpanPenjualan(p2, tanggalJakarta(), 1, 0);

    assert.equal(PrediksiController.cekKecukupanData(idPemilik), false);

    simpanPenjualan(p2, tanggalJakarta(-6), 1, 0);

    assert.equal(PrediksiController.cekKecukupanData(idPemilik), true);
});

test('C25-UT03 cekKecukupanData menolak data kosong, data lama, dan pemilik tidak ada', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik);

    for (let i = 7; i <= 13; i += 1) {
        simpanPenjualan(p1, tanggalJakarta(-i), 10, 0);
    }

    assert.equal(PrediksiController.cekKecukupanData(idPemilik), false);
    assert.equal(PrediksiController.cekKecukupanData(999999), false);

    const kosong = buatPemilik();
    assert.equal(PrediksiController.cekKecukupanData(kosong.idPemilik), false);
});

test('C25-UT04 jalankanPrediksi menyimpan dan mengembalikan hasil untuk tujuh hari', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik, 'Nasi C25');
    const p2 = buatProduk(idPemilik, 'Ayam C25');

    isiHari(p1, 7, 10, 2);
    isiHari(p2, 7, 4, 3);

    const hasil = PrediksiController.jalankanPrediksi(idPemilik);

    assert.equal(hasil.length, 2);
    assert.deepEqual(hasil.map((item) => item.idProduk), [p1, p2]);
    assert.equal(hasil[0].namaProduk, 'Nasi C25');
    assert.equal(hasil[0].tanggalPrediksi, PrediksiProduksi.tanggalBesok());
    assert.equal(hasil[0].jumlahRekomendasi, 11);
    assert.equal(hasil[0].terjualTerakhir, 10);
    assert.equal(hasil[0].tren, 1);
    assert.equal(hasil[1].jumlahRekomendasi, 6);
    assert.equal(hasil[1].terjualTerakhir, 4);
    assert.equal(hasil[1].tren, 2);
    assert.equal(ambilPrediksi(p1).jumlah_rekomendasi, 11);
    assert.equal(ambilPrediksi(p2).jumlah_rekomendasi, 6);
});

test('C25-UT05 jalankanPrediksi menerima tepat tujuh hari tanpa penjualan dan tidak menduplikasi hasil', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik);

    isiHari(p1, 7, 0, 0);

    const pertama = PrediksiController.jalankanPrediksi(idPemilik);
    const kedua = PrediksiController.jalankanPrediksi(idPemilik);

    assert.equal(pertama.length, 1);
    assert.equal(pertama[0].jumlahRekomendasi, 0);
    assert.equal(pertama[0].terjualTerakhir, 0);
    assert.equal(pertama[0].tren, 0);
    assert.equal(kedua.length, 1);
    assert.equal(kedua[0].jumlahRekomendasi, 0);

    const rows = db.prepare(
        'SELECT * FROM prediksi_produksi WHERE id_produk = ?'
    ).all(p1);

    assert.equal(rows.length, 1);
    assert.equal(rows[0].jumlah_rekomendasi, 0);
});

test('C25-UT06 jalankanPrediksi menolak data kurang dari tujuh hari tanpa menyimpan hasil', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik);
    const p2 = buatProduk(idPemilik);

    isiHari(p1, 6, 10, 0);
    simpanPenjualan(p2, tanggalJakarta(), 1, 0);

    const sebelum = hitungPrediksi();

    assert.throws(
        () => PrediksiController.jalankanPrediksi(idPemilik),
        /Data historis belum memenuhi syarat minimal 7 hari\./
    );
    assert.throws(
        () => PrediksiController.jalankanPrediksi(999999),
        /Data historis belum memenuhi syarat minimal 7 hari\./
    );

    assert.equal(hitungPrediksi(), sebelum);
    assert.equal(ambilPrediksi(p1), undefined);
    assert.equal(ambilPrediksi(p2), undefined);
});

test('C25-UT07 tampilkanDashboard() merender hasil prediksi atau pesan error sesuai kecukupan data', () => {
    const lengkap = buatPemilik();
    const p1 = buatProduk(lengkap.idPemilik, 'Nasi C25');

    isiHari(p1, 7, 10, 2);

    const resLengkap = resPalsu();
    PrediksiController.tampilkanDashboard(
        reqPalsu({ user: { idPemilik: lengkap.idPemilik, namaUsaha: 'Usaha C25' } }),
        resLengkap
    );

    assert.equal(resLengkap.rendered.view, 'fnb/I05-DashboardF&B');
    assert.equal(resLengkap.rendered.data.namaUsaha, 'Usaha C25');
    assert.match(resLengkap.rendered.data.sapaan, /^Selamat (pagi|siang|sore|malam),$/);
    assert.equal(resLengkap.rendered.data.hasilPrediksi.length, 1);
    assert.equal(resLengkap.rendered.data.hasilPrediksi[0].jumlahRekomendasi, 11);
    assert.equal(resLengkap.rendered.data.pesanError, null);
    assert.equal(resLengkap.rendered.data.progres.terisi, 7);
    assert.equal(resLengkap.rendered.data.progres.target, 7);
    assert.equal(resLengkap.rendered.data.persen, 100);
    assert.deepEqual(resLengkap.rendered.data.ringkasan, { terjual: 10, tersisa: 2 });
    assert.equal(resLengkap.rendered.data.grafik.length, 7);
    assert.equal(resLengkap.rendered.data.grafik[6].hariIni, true);
    assert.equal(resLengkap.rendered.data.grafik[6].terjual, 10);
    assert.equal(resLengkap.rendered.data.grafik[6].persen, 100);

    const kurang = buatPemilik();
    const p2 = buatProduk(kurang.idPemilik);

    isiHari(p2, 6, 5, 1);

    const resKurang = resPalsu();
    PrediksiController.tampilkanDashboard(
        reqPalsu({ user: { idPemilik: kurang.idPemilik, namaUsaha: 'Usaha Kurang C25' } }),
        resKurang
    );

    assert.equal(resKurang.rendered.view, 'fnb/I05-DashboardF&B');
    assert.deepEqual(resKurang.rendered.data.hasilPrediksi, []);
    assert.equal(
        resKurang.rendered.data.pesanError,
        'Data historis belum memenuhi syarat minimal 7 hari.'
    );
    assert.equal(resKurang.rendered.data.progres.terisi, 6);
    assert.equal(resKurang.rendered.data.persen, 86);
});