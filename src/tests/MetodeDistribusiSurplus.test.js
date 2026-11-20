const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c09-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const MetodeDistribusiSurplus = require('../models/MetodeDistribusiSurplus');

let urut = 0;
let nomorProduk = 0;

function buatPemilik() {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c09-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C09 ${urut}`,
        alamatUsaha: `Jl. C09 No. ${urut}, Bandung`,
        jamOperasional: '08.00-20.00'
    });

    return PemilikFnB.cariBerdasarkanAkun(idAkun).idPemilik;
}

function buatProduk(idPemilik, nama) {
    nomorProduk += 1;
    return Number(
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(
            idPemilik,
            nama || `Produk C09 ${nomorProduk}`,
            'Makanan'
        ).lastInsertRowid
    );
}

function ambilMetode(idProduk) {
    return db.prepare(`
        SELECT * FROM metode_distribusi_surplus
        WHERE id_produk = ?
    `).get(idProduk);
}

function hitungMetode() {
    return db.prepare(
        'SELECT COUNT(*) AS jumlah FROM metode_distribusi_surplus'
    ).get().jumlah;
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C09-UT01 simpanMetode menyimpan metode Donasi untuk produk', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C09');

    assert.equal(
        MetodeDistribusiSurplus.simpanMetode(idProduk, 'Donasi', 0),
        undefined
    );

    const baris = ambilMetode(idProduk);

    assert.equal(baris.id_produk, idProduk);
    assert.equal(baris.jenis_distribusi, 'Donasi');
    assert.equal(baris.harga, 0);
});

test('C09-UT02 simpanMetode memperbarui metode produk tanpa duplikasi', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);

    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Donasi', 0);
    const awal = ambilMetode(idProduk);

    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Jual Diskon', 8000);

    const daftar = db.prepare(`
        SELECT * FROM metode_distribusi_surplus
        WHERE id_produk = ?
    `).all(idProduk);

    assert.equal(daftar.length, 1);
    assert.equal(daftar[0].id_distribusi, awal.id_distribusi);
    assert.equal(daftar[0].jenis_distribusi, 'Jual Diskon');
    assert.equal(daftar[0].harga, 8000);
});

test('C09-UT03 simpanMetode menolak jenis, relasi, dan harga yang tidak valid', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const sebelum = hitungMetode();

    assert.throws(
        () => MetodeDistribusiSurplus.simpanMetode(idProduk, 'Gratis', 0),
        /Metode distribusi tidak valid\./
    );

    assert.throws(
        () => MetodeDistribusiSurplus.simpanMetode(999999, 'Donasi', 0),
        /FOREIGN KEY constraint failed/
    );

    assert.throws(
        () => MetodeDistribusiSurplus.simpanMetode(idProduk, 'Jual Diskon', -1),
        /CHECK constraint failed/
    );

    assert.equal(hitungMetode(), sebelum);
});

test('C09-UT04 getInfoDistribusi mengembalikan jenis dan harga', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);

    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Donasi', 0);

    assert.deepEqual(
        MetodeDistribusiSurplus.getInfoDistribusi(idProduk),
        { jenisDistribusi: 'Donasi', harga: 0 }
    );
});

test('C09-UT05 getInfoDistribusi membaca metode terbaru setelah diperbarui', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);

    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Donasi', 0);
    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Jual Diskon', 12000);

    assert.deepEqual(
        MetodeDistribusiSurplus.getInfoDistribusi(idProduk),
        { jenisDistribusi: 'Jual Diskon', harga: 12000 }
    );
});

test('C09-UT06 getInfoDistribusi mengembalikan null tanpa data', () => {
    assert.equal(MetodeDistribusiSurplus.getInfoDistribusi(999999), null);
    assert.equal(MetodeDistribusiSurplus.getInfoDistribusi(0), null);
});

test('C09-UT07 getJenisDistribusi mengembalikan Donasi', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);

    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Donasi', 0);

    assert.equal(
        MetodeDistribusiSurplus.getJenisDistribusi(idProduk),
        'Donasi'
    );
});

test('C09-UT08 getJenisDistribusi mengembalikan jenis terbaru', () => {
    const idPemilik = buatPemilik();
    const idProduk = buatProduk(idPemilik);

    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Donasi', 0);
    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Jual Diskon', 9000);

    assert.equal(
        MetodeDistribusiSurplus.getJenisDistribusi(idProduk),
        'Jual Diskon'
    );
});

test('C09-UT09 getJenisDistribusi mengembalikan null tanpa data', () => {
    assert.equal(MetodeDistribusiSurplus.getJenisDistribusi(999999), null);
    assert.equal(MetodeDistribusiSurplus.getJenisDistribusi(0), null);
});