const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c08-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const ProdukSurplus = require('../models/ProdukSurplus');

const BATAS_DEPAN = '2099-01-01 12:00';
const BATAS_LEWAT = '2020-01-01 12:00';

let urut = 0;
let nomorProduk = 0;

function buatPemilik() {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c08-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C08 ${urut}`,
        alamatUsaha: `Jl. C08 No. ${urut}, Bandung`,
        jamOperasional: '08.00-20.00'
    });

    return PemilikFnB.cariBerdasarkanAkun(idAkun).idPemilik;
}

function buatProduk(idPemilik, nama, kategori = 'Makanan') {
    nomorProduk += 1;
    return Number(
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(
            idPemilik,
            nama || `Produk C08 ${nomorProduk}`,
            kategori
        ).lastInsertRowid
    );
}

function buatSurplus({
    idPemilik,
    idProduk,
    jumlah = 3,
    batasWaktu = BATAS_DEPAN,
    status = 'tersedia'
}) {
    return Number(
        db.prepare(`
            INSERT INTO produk_surplus
                (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status)
            VALUES (?, ?, ?, ?, ?)
        `).run(idProduk, idPemilik, jumlah, batasWaktu, status).lastInsertRowid
    );
}

function ambilSurplus(idSurplus) {
    return db.prepare(`
        SELECT * FROM produk_surplus WHERE id_surplus = ?
    `).get(idSurplus);
}

function hitungSurplus() {
    return db.prepare('SELECT COUNT(*) AS jumlah FROM produk_surplus').get().jumlah;
}

function kosongkanSurplus() {
    db.prepare('DELETE FROM produk_surplus').run();
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C08-UT01 simpanProdukSurplus menyimpan status tersedia dan mengembalikan id', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C08');

    const idSurplus = ProdukSurplus.simpanProdukSurplus({
        idProduk,
        idPemilik,
        jumlah: 3,
        batasWaktu: BATAS_DEPAN
    });

    assert.ok(Number.isInteger(idSurplus) && idSurplus > 0);

    const baris = ambilSurplus(idSurplus);

    assert.equal(baris.id_produk, idProduk);
    assert.equal(baris.id_pemilik, idPemilik);
    assert.equal(baris.jumlah, 3);
    assert.equal(baris.batas_waktu_pengambilan, BATAS_DEPAN);
    assert.equal(baris.status, 'tersedia');
});

test('C08-UT02 simpanProdukSurplus menerima jumlah minimum satu', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Produk Jumlah Satu C08');

    const idSurplus = ProdukSurplus.simpanProdukSurplus({
        idProduk,
        idPemilik,
        jumlah: 1,
        batasWaktu: BATAS_DEPAN
    });

    const baris = ambilSurplus(idSurplus);

    assert.equal(baris.jumlah, 1);
    assert.equal(baris.status, 'tersedia');
});

test('C08-UT03 simpanProdukSurplus menolak jumlah tidak positif dan relasi tidak valid', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const sebelum = hitungSurplus();

    assert.throws(
        () => ProdukSurplus.simpanProdukSurplus({
            idProduk,
            idPemilik,
            jumlah: 0,
            batasWaktu: BATAS_DEPAN
        }),
        /CHECK constraint failed/
    );

    assert.throws(
        () => ProdukSurplus.simpanProdukSurplus({
            idProduk,
            idPemilik,
            jumlah: -1,
            batasWaktu: BATAS_DEPAN
        }),
        /CHECK constraint failed/
    );

    assert.throws(
        () => ProdukSurplus.simpanProdukSurplus({
            idProduk: 999999,
            idPemilik,
            jumlah: 1,
            batasWaktu: BATAS_DEPAN
        }),
        /FOREIGN KEY constraint failed/
    );

    assert.equal(hitungSurplus(), sebelum);
});

test('C08-UT04 setStatus mengubah status tersedia menjadi terklaim', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const idSurplus = buatSurplus({ idPemilik, idProduk });

    assert.equal(ProdukSurplus.setStatus(idSurplus, 'terklaim'), undefined);
    assert.equal(ProdukSurplus.getStatus(idSurplus), 'terklaim');
});

test('C08-UT05 setStatus mengubah status menjadi selesai', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const idSurplus = buatSurplus({
        idPemilik,
        idProduk,
        status: 'terklaim'
    });

    ProdukSurplus.setStatus(idSurplus, 'selesai');

    const baris = ambilSurplus(idSurplus);
    assert.equal(baris.status, 'selesai');
});

test('C08-UT06 setStatus menolak status tidak valid dan id yang tidak ada', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const idSurplus = buatSurplus({ idPemilik, idProduk });

    assert.throws(
        () => ProdukSurplus.setStatus(idSurplus, 'diproses'),
        /Status produk surplus tidak valid\./
    );
    assert.equal(ProdukSurplus.getStatus(idSurplus), 'tersedia');

    assert.throws(
        () => ProdukSurplus.setStatus(999999, 'selesai'),
        /Produk surplus tidak ditemukan\./
    );
});

test('C08-UT07 getDetailSurplus mengembalikan seluruh atribut surplus', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Roti C08');
    const idSurplus = buatSurplus({
        idPemilik,
        idProduk,
        jumlah: 5
    });

    const detail = ProdukSurplus.getDetailSurplus(idSurplus);

    assert.equal(detail.idSurplus, idSurplus);
    assert.equal(detail.idProduk, idProduk);
    assert.equal(detail.idPemilik, idPemilik);
    assert.equal(detail.jumlah, 5);
    assert.equal(detail.batasWaktuPengambilan, BATAS_DEPAN);
    assert.equal(detail.status, 'tersedia');
});

test('C08-UT08 getDetailSurplus tetap mengembalikan surplus yang batas waktunya lewat', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const idSurplus = buatSurplus({
        idPemilik,
        idProduk,
        batasWaktu: BATAS_LEWAT
    });

    const detail = ProdukSurplus.getDetailSurplus(idSurplus);

    assert.ok(detail);
    assert.equal(detail.idSurplus, idSurplus);
    assert.equal(detail.batasWaktuPengambilan, BATAS_LEWAT);
});

test('C08-UT09 getDetailSurplus mengembalikan null untuk id yang tidak ada', () => {
    assert.equal(ProdukSurplus.getDetailSurplus(999999), null);
    assert.equal(ProdukSurplus.getDetailSurplus(0), null);
});

test('C08-UT10 getProdukSurplusTersedia hanya mengambil status tersedia dan urut id', () => {
    kosongkanSurplus();

    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);

    const tersediaA = buatSurplus({ idPemilik, idProduk });
    const tersediaB = buatSurplus({ idPemilik, idProduk });
    buatSurplus({ idPemilik, idProduk, status: 'terklaim' });
    buatSurplus({ idPemilik, idProduk, status: 'selesai' });

    const hasil = ProdukSurplus.getProdukSurplusTersedia();

    assert.deepEqual(
        hasil.map((item) => item.idSurplus),
        [tersediaA, tersediaB]
    );
    assert.ok(hasil.every((item) => item.status === 'tersedia'));
});

test('C08-UT11 getProdukSurplusTersedia belum menyaring batas waktu', () => {
    kosongkanSurplus();

    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const expired = buatSurplus({
        idPemilik,
        idProduk,
        batasWaktu: BATAS_LEWAT
    });

    const hasil = ProdukSurplus.getProdukSurplusTersedia();

    assert.deepEqual(
        hasil.map((item) => item.idSurplus),
        [expired]
    );
    assert.equal(hasil[0].batasWaktuPengambilan, BATAS_LEWAT);
});

test('C08-UT12 getProdukSurplusTersedia mengembalikan array kosong tanpa data', () => {
    kosongkanSurplus();

    assert.deepEqual(ProdukSurplus.getProdukSurplusTersedia(), []);
});

test('C08-UT13 getStatus mengembalikan status tersedia', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const idSurplus = buatSurplus({ idPemilik, idProduk });

    assert.equal(ProdukSurplus.getStatus(idSurplus), 'tersedia');
});

test('C08-UT14 getStatus mengembalikan status setelah diperbarui', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const idSurplus = buatSurplus({ idPemilik, idProduk });

    ProdukSurplus.setStatus(idSurplus, 'selesai');

    assert.equal(ProdukSurplus.getStatus(idSurplus), 'selesai');
});

test('C08-UT15 getStatus mengembalikan null untuk id yang tidak ada', () => {
    assert.equal(ProdukSurplus.getStatus(999999), null);
    assert.equal(ProdukSurplus.getStatus(0), null);
});

test('C08-UT16 operasi produk mendukung tambah, daftar, detail, dan ubah produk', () => {
    const idPemilik = buatPemilik();

    const idProduk = ProdukSurplus.tambahProduk(
        idPemilik,
        'Produk Pendukung C08',
        'Makanan'
    );

    assert.ok(Number.isInteger(idProduk) && idProduk > 0);

    const daftar = ProdukSurplus.getSemuaProduk(idPemilik);
    assert.ok(daftar.some((item) => item.id_produk === idProduk));

    const detail = ProdukSurplus.getProdukById(idProduk, idPemilik);
    assert.equal(detail.nama_produk, 'Produk Pendukung C08');
    assert.equal(detail.kategori, 'Makanan');

    ProdukSurplus.updateProduk(
        idProduk,
        idPemilik,
        'Produk Diperbarui C08',
        'Minuman'
    );

    const setelah = ProdukSurplus.getProdukById(idProduk, idPemilik);
    assert.equal(setelah.nama_produk, 'Produk Diperbarui C08');
    assert.equal(setelah.kategori, 'Minuman');

    assert.equal(ProdukSurplus.getProdukById(999999, idPemilik), null);
    assert.throws(
        () => ProdukSurplus.updateProduk(
            999999,
            idPemilik,
            'Tidak Ada',
            'Makanan'
        ),
        /Produk tidak ditemukan\./
    );
});