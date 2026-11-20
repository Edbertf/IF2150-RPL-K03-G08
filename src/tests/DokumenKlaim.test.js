const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c10-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const PerwakilanNGO = require('../models/PerwakilanNGO');
const DokumenKlaim = require('../models/DokumenKlaim');

// Dipakai agar urutan getDaftarKlaim dapat diuji secara deterministik.
const WAKTU_AWAL = '2026-01-01T10:00:00.000Z';
const WAKTU_AKHIR = '2026-01-02T10:00:00.000Z';

let urut = 0;

function buatPemilik() {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c10-pemilik-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C10 ${urut}`,
        alamatUsaha: `Jl. C10 No. ${urut}, Bandung`,
        jamOperasional: '08.00-20.00'
    });

    return PemilikFnB.cariBerdasarkanAkun(idAkun).idPemilik;
}

function buatNgo() {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c10-ngo-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'perwakilan_ngo'
    });

    PerwakilanNGO.simpanProfil(idAkun, {
        namaOrganisasi: `NGO C10 ${urut}`,
        nomorLegalitas: `LEGAL-C10-${urut}`,
        lokasi: '-6.9,107.61'
    });

    return idAkun;
}

function buatSurplus(idPemilik, namaProduk, kategori = 'Makanan') {
    const idProduk = Number(
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(idPemilik, namaProduk, kategori).lastInsertRowid
    );

    return Number(
        db.prepare(`
            INSERT INTO produk_surplus
                (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status)
            VALUES (?, ?, ?, ?, 'tersedia')
        `).run(idProduk, idPemilik, 5, '2099-01-01 12:00').lastInsertRowid
    );
}

function ambilKlaim(idKlaim) {
    return db.prepare(`
        SELECT * FROM dokumen_klaim WHERE id_klaim = ?
    `).get(idKlaim);
}

function ubahWaktuKlaim(idKlaim, waktu) {
    db.prepare(`
        UPDATE dokumen_klaim SET waktu_klaim = ? WHERE id_klaim = ?
    `).run(waktu, idKlaim);
}

function hitungKlaim() {
    return db.prepare('SELECT COUNT(*) AS jumlah FROM dokumen_klaim').get().jumlah;
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C10-UT01 catatKlaim menyimpan klaim dengan status terklaim', () => {
    const idPemilik = buatPemilik();
    const idNgo = buatNgo();
    const idSurplus = buatSurplus(idPemilik, 'Nasi C10');

    const idKlaim = DokumenKlaim.catatKlaim(idNgo, idSurplus);

    assert.ok(Number.isInteger(idKlaim) && idKlaim > 0);

    const baris = ambilKlaim(idKlaim);

    assert.equal(baris.id_ngo, idNgo);
    assert.equal(baris.id_surplus, idSurplus);
    assert.equal(baris.status_klaim, 'terklaim');
    assert.ok(!Number.isNaN(Date.parse(baris.waktu_klaim)));
});

test('C10-UT02 catatKlaim menerima beberapa surplus berbeda untuk satu NGO', () => {
    const idPemilik = buatPemilik();
    const idNgo = buatNgo();
    const surplusA = buatSurplus(idPemilik, 'Roti C10');
    const surplusB = buatSurplus(idPemilik, 'Es C10', 'Minuman');

    const klaimA = DokumenKlaim.catatKlaim(idNgo, surplusA);
    const klaimB = DokumenKlaim.catatKlaim(idNgo, surplusB);

    assert.notEqual(klaimA, klaimB);
    assert.equal(ambilKlaim(klaimA).status_klaim, 'terklaim');
    assert.equal(ambilKlaim(klaimB).status_klaim, 'terklaim');
});

test('C10-UT03 catatKlaim menolak surplus yang sudah diklaim dan relasi tidak valid', () => {
    const idPemilik = buatPemilik();
    const idNgo = buatNgo();
    const idSurplus = buatSurplus(idPemilik, 'Produk Klaim Ganda C10');
    const idSurplusLain = buatSurplus(idPemilik, 'Produk Cadangan C10');

    const idKlaim = DokumenKlaim.catatKlaim(idNgo, idSurplus);
    const sebelum = hitungKlaim();

    assert.throws(
        () => DokumenKlaim.catatKlaim(idNgo, idSurplus),
        /UNIQUE constraint failed/
    );

    assert.throws(
        () => DokumenKlaim.catatKlaim(999999, idSurplusLain),
        /FOREIGN KEY constraint failed/
    );

    assert.throws(
        () => DokumenKlaim.catatKlaim(idNgo, 999999),
        /FOREIGN KEY constraint failed/
    );

    assert.equal(hitungKlaim(), sebelum);
    assert.ok(ambilKlaim(idKlaim));
});

test('C10-UT04 getDetailKlaim mengembalikan seluruh atribut klaim', () => {
    const idPemilik = buatPemilik();
    const idNgo = buatNgo();
    const idSurplus = buatSurplus(idPemilik, 'Mie C10');
    const idKlaim = DokumenKlaim.catatKlaim(idNgo, idSurplus);

    const detail = DokumenKlaim.getDetailKlaim(idKlaim);

    assert.equal(detail.idKlaim, idKlaim);
    assert.equal(detail.idNgo, idNgo);
    assert.equal(detail.idSurplus, idSurplus);
    assert.equal(detail.statusKlaim, 'terklaim');
    assert.ok(!Number.isNaN(Date.parse(detail.waktuKlaim)));
});

test('C10-UT05 getDetailKlaim memilih dokumen yang benar saat ada beberapa klaim', () => {
    const idPemilik = buatPemilik();
    const idNgo = buatNgo();
    const surplusA = buatSurplus(idPemilik, 'Produk A C10');
    const surplusB = buatSurplus(idPemilik, 'Produk B C10');

    const klaimA = DokumenKlaim.catatKlaim(idNgo, surplusA);
    const klaimB = DokumenKlaim.catatKlaim(idNgo, surplusB);

    const detailB = DokumenKlaim.getDetailKlaim(klaimB);

    assert.equal(detailB.idKlaim, klaimB);
    assert.equal(detailB.idSurplus, surplusB);
    assert.notEqual(detailB.idKlaim, klaimA);
});

test('C10-UT06 getDetailKlaim menolak id klaim yang tidak ada', () => {
    assert.throws(
        () => DokumenKlaim.getDetailKlaim(999999),
        /Dokumen klaim tidak ditemukan\./
    );
    assert.throws(
        () => DokumenKlaim.getDetailKlaim(0),
        /Dokumen klaim tidak ditemukan\./
    );
});

test('C10-UT07 getDaftarKlaim mengembalikan klaim NGO terbaru lebih dulu', () => {
    const idPemilik = buatPemilik();
    const idNgo = buatNgo();
    const surplusA = buatSurplus(idPemilik, 'Nasi C10');
    const surplusB = buatSurplus(idPemilik, 'Kopi C10', 'Minuman');

    const klaimA = DokumenKlaim.catatKlaim(idNgo, surplusA);
    const klaimB = DokumenKlaim.catatKlaim(idNgo, surplusB);

    ubahWaktuKlaim(klaimA, WAKTU_AWAL);
    ubahWaktuKlaim(klaimB, WAKTU_AKHIR);

    const daftar = DokumenKlaim.getDaftarKlaim(idNgo);

    assert.deepEqual(
        daftar.map((item) => item.idKlaim),
        [klaimB, klaimA]
    );

    assert.equal(daftar[0].namaProduk, 'Kopi C10');
    assert.equal(daftar[0].kategori, 'Minuman');
    assert.equal(daftar[0].statusSurplus, 'tersedia');
    assert.equal(daftar[0].jumlah, 5);
    assert.ok(daftar[0].namaUsaha);
});

test('C10-UT08 getDaftarKlaim memisahkan klaim per NGO dan memakai id sebagai pemecah waktu sama', () => {
    const idPemilik = buatPemilik();
    const idNgo = buatNgo();
    const idNgoLain = buatNgo();

    const surplusA = buatSurplus(idPemilik, 'Produk Urut A C10');
    const surplusB = buatSurplus(idPemilik, 'Produk Urut B C10');
    const surplusC = buatSurplus(idPemilik, 'Produk NGO Lain C10');

    const klaimA = DokumenKlaim.catatKlaim(idNgo, surplusA);
    const klaimB = DokumenKlaim.catatKlaim(idNgo, surplusB);
    const klaimLain = DokumenKlaim.catatKlaim(idNgoLain, surplusC);

    ubahWaktuKlaim(klaimA, WAKTU_AWAL);
    ubahWaktuKlaim(klaimB, WAKTU_AWAL);
    ubahWaktuKlaim(klaimLain, WAKTU_AKHIR);

    const daftar = DokumenKlaim.getDaftarKlaim(idNgo);

    assert.deepEqual(
        daftar.map((item) => item.idKlaim),
        [klaimB, klaimA]
    );
    assert.ok(!daftar.some((item) => item.idKlaim === klaimLain));
});

test('C10-UT09 getDaftarKlaim mengembalikan array kosong tanpa klaim', () => {
    assert.deepEqual(DokumenKlaim.getDaftarKlaim(999999), []);

    const idNgo = buatNgo();
    assert.deepEqual(DokumenKlaim.getDaftarKlaim(idNgo), []);
});