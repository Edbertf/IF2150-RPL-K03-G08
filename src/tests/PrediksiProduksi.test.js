const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c07-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const PrediksiProduksi = require('../models/PrediksiProduksi');

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
        email: `c07-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C07 ${urut}`,
        alamatUsaha: 'Jl. C07 No. 1, Bandung',
        jamOperasional: '08.00-20.00'
    });

    return db.prepare(
        'SELECT id_pemilik AS idPemilik FROM pemilik_fnb WHERE id_akun = ?'
    ).get(idAkun).idPemilik;
}

function buatProduk(idPemilik, nama) {
    nomorProduk += 1;
    return db.prepare(`
        INSERT INTO produk (id_pemilik, nama_produk, kategori)
        VALUES (?, ?, ?)
    `).run(
        idPemilik,
        nama || `Produk C07 ${nomorProduk}`,
        'Makanan'
    ).lastInsertRowid;
}

function simpanPenjualan(idProduk, tanggal, jumlahTerjual, jumlahTersisa) {
    db.prepare(`
        INSERT INTO data_penjualan (id_produk, tanggal, jumlah_terjual, jumlah_tersisa)
        VALUES (?, ?, ?, ?)
    `).run(idProduk, tanggal, jumlahTerjual, jumlahTersisa);
}

function ambilPrediksi(idProduk, tanggal = PrediksiProduksi.tanggalBesok()) {
    return db.prepare(`
        SELECT * FROM prediksi_produksi
        WHERE id_produk = ? AND tanggal_prediksi = ?
    `).get(idProduk, tanggal);
}

function hitungPrediksi() {
    return db.prepare('SELECT COUNT(*) AS jumlah FROM prediksi_produksi').get().jumlah;
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C07-UT01 simpanPrediksi menghitung rata-rata dan menyimpan prediksi besok', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C07');
    const besok = PrediksiProduksi.tanggalBesok();

    assert.equal(PrediksiProduksi.simpanPrediksi([
        { idProduk, jumlahTerjual: 10, jumlahTersisa: 4 },
        { idProduk, jumlahTerjual: 20, jumlahTersisa: 0 }
    ]), true);

    const baris = ambilPrediksi(idProduk, besok);

    assert.ok(baris);
    assert.equal(baris.tanggal_prediksi, besok);
    assert.equal(baris.jumlah_rekomendasi, 16);
});

test('C07-UT02 simpanPrediksi mengelompokkan produk dan memperbarui prediksi yang sama', () => {
    const idPemilik = buatPemilik();
    const idA = buatProduk(idPemilik, 'Produk A C07');
    const idB = buatProduk(idPemilik, 'Produk B C07');
    const besok = PrediksiProduksi.tanggalBesok();

    PrediksiProduksi.simpanPrediksi([
        { idProduk: idA, jumlahTerjual: 10, jumlahTersisa: 0 },
        { idProduk: idB, jumlahTerjual: 0, jumlahTersisa: 2 }
    ]);

    const awalA = ambilPrediksi(idA, besok);
    const barisB = ambilPrediksi(idB, besok);

    assert.equal(awalA.jumlah_rekomendasi, 10);
    assert.equal(barisB.jumlah_rekomendasi, 1);

    PrediksiProduksi.simpanPrediksi([
        { idProduk: idA, jumlahTerjual: 20, jumlahTersisa: 2 }
    ]);

    const daftarA = db.prepare(
        'SELECT * FROM prediksi_produksi WHERE id_produk = ?'
    ).all(idA);

    assert.equal(daftarA.length, 1);
    assert.equal(daftarA[0].id_prediksi, awalA.id_prediksi);
    assert.equal(daftarA[0].jumlah_rekomendasi, 21);
});

test('C07-UT03 simpanPrediksi menolak input kosong dan membatalkan transaksi tidak valid', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const sebelum = hitungPrediksi();

    assert.throws(
        () => PrediksiProduksi.simpanPrediksi([]),
        /Data penjualan tidak boleh kosong\./
    );
    assert.throws(
        () => PrediksiProduksi.simpanPrediksi(null),
        /Data penjualan tidak boleh kosong\./
    );
    assert.throws(
        () => PrediksiProduksi.simpanPrediksi('bukan array'),
        /Data penjualan tidak boleh kosong\./
    );

    assert.throws(
        () => PrediksiProduksi.simpanPrediksi([
            { idProduk, jumlahTerjual: 4, jumlahTersisa: 1 },
            { idProduk: 999999, jumlahTerjual: 2, jumlahTersisa: 0 }
        ]),
        /FOREIGN KEY constraint failed/
    );

    assert.equal(hitungPrediksi(), sebelum);
    assert.equal(ambilPrediksi(idProduk), undefined);
});

test('C07-UT04 getHasilPrediksi mengembalikan prediksi pemilik beserta tren', () => {
    const idPemilik = buatPemilik();
    const idA = buatProduk(idPemilik, 'Nasi C07');
    const idB = buatProduk(idPemilik, 'Ayam C07');
    const besok = PrediksiProduksi.tanggalBesok();

    simpanPenjualan(idA, tanggalJakarta(), 10, 0);
    simpanPenjualan(idA, tanggalJakarta(-1), 8, 0);

    PrediksiProduksi.simpanPrediksi([
        { idProduk: idA, jumlahTerjual: 10, jumlahTersisa: 4 },
        { idProduk: idB, jumlahTerjual: 7, jumlahTersisa: 2 }
    ]);

    const hasil = PrediksiProduksi.getHasilPrediksi(idPemilik);

    assert.equal(hasil.length, 2);
    assert.deepEqual(hasil.map((item) => item.idProduk), [idA, idB]);
    assert.equal(hasil[0].namaProduk, 'Nasi C07');
    assert.equal(hasil[0].tanggalPrediksi, besok);
    assert.equal(hasil[0].jumlahRekomendasi, 12);
    assert.equal(hasil[0].terjualTerakhir, 10);
    assert.equal(hasil[0].tren, 2);
});

test('C07-UT05 getHasilPrediksi menghasilkan tren null saat belum ada penjualan', () => {
    const idPemilik = buatPemilik();
    const idPemilikLain = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Produk Tanpa Penjualan C07');
    const idLain = buatProduk(idPemilikLain, 'Produk Pemilik Lain C07');
    const besok = PrediksiProduksi.tanggalBesok();

    db.prepare(`
        INSERT INTO prediksi_produksi (tanggal_prediksi, id_produk, jumlah_rekomendasi)
        VALUES (?, ?, ?)
    `).run(besok, idProduk, 9);

    db.prepare(`
        INSERT INTO prediksi_produksi (tanggal_prediksi, id_produk, jumlah_rekomendasi)
        VALUES (?, ?, ?)
    `).run(besok, idLain, 5);

    const hasil = PrediksiProduksi.getHasilPrediksi(idPemilik);

    assert.equal(hasil.length, 1);
    assert.equal(hasil[0].idProduk, idProduk);
    assert.equal(hasil[0].jumlahRekomendasi, 9);
    assert.equal(hasil[0].terjualTerakhir, null);
    assert.equal(hasil[0].tren, null);
});

test('C07-UT06 getHasilPrediksi mengembalikan array kosong untuk tanggal atau pemilik lain', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);

    db.prepare(`
        INSERT INTO prediksi_produksi (tanggal_prediksi, id_produk, jumlah_rekomendasi)
        VALUES (?, ?, ?)
    `).run(tanggalJakarta(), idProduk, 5);

    assert.deepEqual(PrediksiProduksi.getHasilPrediksi(idPemilik), []);
    assert.deepEqual(PrediksiProduksi.getHasilPrediksi(999999), []);
});

test('C07-UT07 hitungRekomendasi membulatkan, membatasi nol, dan menangani nilai tidak valid', () => {
    assert.equal(PrediksiProduksi.hitungRekomendasi(10, 4), 12);
    assert.equal(PrediksiProduksi.hitungRekomendasi(10.4, 0), 10);
    assert.equal(PrediksiProduksi.hitungRekomendasi(10.5, 0), 11);
    assert.equal(PrediksiProduksi.hitungRekomendasi(-10, 0), 0);
    assert.equal(PrediksiProduksi.hitungRekomendasi(Infinity, 0), 0);
    assert.equal(PrediksiProduksi.hitungRekomendasi(NaN, 0), 0);
});

test('C07-UT08 tanggalBesok mengembalikan tanggal Jakarta satu hari setelah hari ini', () => {
    const besok = PrediksiProduksi.tanggalBesok();

    assert.match(besok, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(besok, tanggalJakarta(1));
});