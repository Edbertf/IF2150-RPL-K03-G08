const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c06-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const DataPenjualan = require('../models/DataPenjualan');

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
        email: `c06-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C06 ${urut}`,
        alamatUsaha: 'Jl. C06 No. 1, Bandung',
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
        nama || `Produk C06 ${nomorProduk}`,
        'Makanan'
    ).lastInsertRowid;
}

function simpanBaris(idProduk, tanggal, jumlahTerjual, jumlahTersisa) {
    db.prepare(`
        INSERT INTO data_penjualan (id_produk, tanggal, jumlah_terjual, jumlah_tersisa)
        VALUES (?, ?, ?, ?)
    `).run(idProduk, tanggal, jumlahTerjual, jumlahTersisa);
}

function ambilBaris(idProduk, tanggal) {
    return db.prepare(`
        SELECT * FROM data_penjualan
        WHERE id_produk = ? AND tanggal = ?
    `).get(idProduk, tanggal);
}

function hitungBaris() {
    return db.prepare('SELECT COUNT(*) AS jumlah FROM data_penjualan').get().jumlah;
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C06-UT01 catatPenjualan menyimpan satu produk pada tanggal hari ini', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi Goreng C06');

    const tanggal = DataPenjualan.catatPenjualan([
        { idProduk, jumlahTerjual: 12, jumlahTersisa: 3 }
    ]);

    assert.equal(tanggal, tanggalJakarta());

    const baris = ambilBaris(idProduk, tanggal);
    assert.ok(baris);
    assert.equal(baris.jumlah_terjual, 12);
    assert.equal(baris.jumlah_tersisa, 3);
});

test('C06-UT02 catatPenjualan menangani array kosong, nilai nol, dan pencatatan ulang', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const sebelum = hitungBaris();

    assert.equal(DataPenjualan.catatPenjualan([]), tanggalJakarta());
    assert.equal(hitungBaris(), sebelum);

    const tanggal = DataPenjualan.catatPenjualan([
        { idProduk, jumlahTerjual: 0, jumlahTersisa: 0 }
    ]);
    const pertama = ambilBaris(idProduk, tanggal);

    assert.equal(pertama.jumlah_terjual, 0);
    assert.equal(pertama.jumlah_tersisa, 0);

    DataPenjualan.catatPenjualan([
        { idProduk, jumlahTerjual: 7, jumlahTersisa: 8 }
    ]);

    const daftar = db.prepare(
        'SELECT * FROM data_penjualan WHERE id_produk = ?'
    ).all(idProduk);

    assert.equal(daftar.length, 1);
    assert.equal(daftar[0].id_penjualan, pertama.id_penjualan);
    assert.equal(daftar[0].jumlah_terjual, 7);
    assert.equal(daftar[0].jumlah_tersisa, 8);
});

test('C06-UT03 catatPenjualan menolak data negatif dan membatalkan transaksi', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const sebelum = hitungBaris();

    assert.throws(
        () => DataPenjualan.catatPenjualan([
            { idProduk, jumlahTerjual: -1, jumlahTersisa: 0 }
        ]),
        /CHECK constraint failed/
    );

    assert.throws(
        () => DataPenjualan.catatPenjualan([
            { idProduk, jumlahTerjual: 0, jumlahTersisa: -1 }
        ]),
        /CHECK constraint failed/
    );

    assert.throws(
        () => DataPenjualan.catatPenjualan([
            { idProduk, jumlahTerjual: 4, jumlahTersisa: 1 },
            { idProduk: 999999, jumlahTerjual: 2, jumlahTersisa: 0 }
        ]),
        /FOREIGN KEY constraint failed/
    );

    assert.equal(hitungBaris(), sebelum);
    assert.equal(ambilBaris(idProduk, tanggalJakarta()), undefined);
});

test('C06-UT04 getDataHistoris mengambil data 7 hari milik pemilik dengan urutan benar', () => {
    const idPemilik = buatPemilik();
    const idPemilikLain = buatPemilik();
    const idA = buatProduk(idPemilik, 'Nasi C06');
    const idB = buatProduk(idPemilik, 'Ayam C06');
    const idLain = buatProduk(idPemilikLain, 'Produk Pemilik Lain C06');

    const hariIni = tanggalJakarta();
    const duaHariLalu = tanggalJakarta(-2);
    const enamHariLalu = tanggalJakarta(-6);

    simpanBaris(idA, hariIni, 5, 2);
    simpanBaris(idB, hariIni, 7, 1);
    simpanBaris(idA, duaHariLalu, 4, 3);
    simpanBaris(idB, duaHariLalu, 6, 2);
    simpanBaris(idA, enamHariLalu, 3, 4);
    simpanBaris(idA, tanggalJakarta(-7), 2, 5);
    simpanBaris(idLain, hariIni, 9, 0);

    const hasil = DataPenjualan.getDataHistoris(idPemilik);

    assert.equal(hasil.length, 5);
    assert.deepEqual(
        hasil.map((item) => item.tanggal),
        [enamHariLalu, duaHariLalu, duaHariLalu, hariIni, hariIni]
    );
    assert.deepEqual(
        hasil.map((item) => item.idProduk),
        [idA, idA, idB, idA, idB]
    );
    assert.equal(hasil[0].namaProduk, 'Nasi C06');
    assert.equal(hasil[4].namaProduk, 'Ayam C06');
});

test('C06-UT05 getDataHistoris menghormati batasHari yang diberikan', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);

    const hariIni = tanggalJakarta();
    const kemarin = tanggalJakarta(-1);

    simpanBaris(idProduk, hariIni, 1, 0);
    simpanBaris(idProduk, kemarin, 2, 0);
    simpanBaris(idProduk, tanggalJakarta(-2), 3, 0);

    assert.deepEqual(
        DataPenjualan.getDataHistoris(idPemilik, 1).map((item) => item.tanggal),
        [hariIni]
    );
    assert.deepEqual(
        DataPenjualan.getDataHistoris(idPemilik, 2).map((item) => item.tanggal),
        [kemarin, hariIni]
    );
});

test('C06-UT06 getDataHistoris mengembalikan array kosong tanpa data', () => {
    const idPemilik = buatPemilik();

    assert.deepEqual(DataPenjualan.getDataHistoris(idPemilik), []);
    assert.deepEqual(DataPenjualan.getDataHistoris(999999), []);
});

test('C06-UT07 getPenjualanHarian mengambil satu tanggal dan array kosong tanpa data', () => {
    const idPemilik = buatPemilik();
    const idPemilikLain = buatPemilik();
    const idA = buatProduk(idPemilik, 'Produk A C06');
    const idB = buatProduk(idPemilik, 'Produk B C06');
    const idLain = buatProduk(idPemilikLain, 'Produk C C06');

    const hariIni = tanggalJakarta();

    simpanBaris(idA, hariIni, 4, 1);
    simpanBaris(idB, hariIni, 5, 2);
    simpanBaris(idA, tanggalJakarta(-1), 6, 0);
    simpanBaris(idLain, hariIni, 7, 0);

    const hasil = DataPenjualan.getPenjualanHarian(idPemilik, hariIni);

    assert.equal(hasil.length, 2);
    assert.deepEqual(hasil.map((item) => item.idProduk), [idA, idB]);
    assert.equal(hasil[0].namaProduk, 'Produk A C06');
    assert.equal(hasil[0].jumlahTerjual, 4);
    assert.equal(hasil[0].jumlahTersisa, 1);
    assert.equal(hasil[1].jumlahTerjual, 5);

    assert.deepEqual(
        DataPenjualan.getPenjualanHarian(idPemilik, tanggalJakarta(-3)),
        []
    );
    assert.deepEqual(
        DataPenjualan.getPenjualanHarian(999999, hariIni),
        []
    );
});

test('C06-UT08 hitungHariTerkumpul menghitung hari unik dan mengembalikan nol tanpa data', () => {
    const idPemilik = buatPemilik();
    const idPemilikLain = buatPemilik();
    const idA = buatProduk(idPemilik);
    const idB = buatProduk(idPemilik);
    const idLain = buatProduk(idPemilikLain);

    const hariIni = tanggalJakarta();
    const kemarin = tanggalJakarta(-1);
    const duaHariLalu = tanggalJakarta(-2);

    simpanBaris(idA, hariIni, 1, 0);
    simpanBaris(idB, hariIni, 2, 0);
    simpanBaris(idA, kemarin, 3, 0);
    simpanBaris(idB, duaHariLalu, 4, 0);
    simpanBaris(idA, tanggalJakarta(-7), 5, 0);
    simpanBaris(idLain, hariIni, 6, 0);

    assert.equal(DataPenjualan.hitungHariTerkumpul(idPemilik), 3);
    assert.equal(DataPenjualan.hitungHariTerkumpul(idPemilik, 2), 2);

    const idKosong = buatPemilik();
    assert.equal(DataPenjualan.hitungHariTerkumpul(idKosong), 0);
    assert.equal(DataPenjualan.hitungHariTerkumpul(999999), 0);
});