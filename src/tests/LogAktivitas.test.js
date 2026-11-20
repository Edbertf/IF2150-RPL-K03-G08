const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c11-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const LogAktivitas = require('../models/LogAktivitas');

const insertAkun = db.prepare(`
    INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun)
    VALUES (?, ?, ?)
`);

const idAkunAdmin = Number(
    insertAkun.run('admin-c11@foodlink.test', 'x', 'admin_sistem').lastInsertRowid
);
const idAkunPemilik = Number(
    insertAkun.run('pemilik-c11@foodlink.test', 'x', 'pemilik_fnb').lastInsertRowid
);
const idAkunNgo = Number(
    insertAkun.run('ngo-c11@foodlink.test', 'x', 'perwakilan_ngo').lastInsertRowid
);

db.prepare(`
    INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha)
    VALUES (?, ?, ?)
`).run(idAkunPemilik, 'Bakery C11', 'Jl. C11 No. 1, Bandung');

db.prepare(`
    INSERT INTO perwakilan_ngo (id_akun, nama_organisasi, lokasi)
    VALUES (?, ?, ?)
`).run(idAkunNgo, 'NGO C11', '-6.9,107.61');

const simpanLog = db.prepare(`
    INSERT INTO log_aktivitas (id_akun, aktivitas, waktu)
    VALUES (?, ?, ?)
`);

function kosongkanLog() {
    db.prepare('DELETE FROM log_aktivitas').run();
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C11-UT01 catatLog menyimpan aktivitas dengan waktu Jakarta', () => {
    const hasil = LogAktivitas.catatLog(
        idAkunPemilik,
        'Mencatat penjualan C11'
    );

    assert.equal(hasil, undefined);

    const baris = db.prepare(`
        SELECT * FROM log_aktivitas
        WHERE id_akun = ?
        ORDER BY id_log DESC
        LIMIT 1
    `).get(idAkunPemilik);

    assert.equal(baris.aktivitas, 'Mencatat penjualan C11');
    assert.match(baris.waktu, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
});

test('C11-UT02 catatLog menolak idAkun yang tidak terdaftar', () => {
    const sebelum = db.prepare(
        'SELECT COUNT(*) AS jumlah FROM log_aktivitas'
    ).get().jumlah;

    assert.throws(
        () => LogAktivitas.catatLog(999999, 'Aktivitas tidak valid'),
        /FOREIGN KEY constraint failed/
    );

    assert.equal(
        db.prepare('SELECT COUNT(*) AS jumlah FROM log_aktivitas').get().jumlah,
        sebelum
    );
});

test('C11-UT03 getDaftarLog mengurutkan terbaru dan mengisi nama pengguna', () => {
    kosongkanLog();

    simpanLog.run(idAkunAdmin, 'Verifikasi C11', '2026-11-10 10:00:00');
    simpanLog.run(idAkunPemilik, 'Surplus C11', '2026-11-10 11:00:00');
    simpanLog.run(idAkunNgo, 'Klaim C11', '2026-11-10 12:00:00');

    const daftar = LogAktivitas.getDaftarLog();

    assert.deepEqual(
        daftar.map((item) => item.aktivitas),
        ['Klaim C11', 'Surplus C11', 'Verifikasi C11']
    );
    assert.equal(daftar[0].pengguna, 'NGO C11');
    assert.equal(daftar[1].pengguna, 'Bakery C11');
    assert.equal(daftar[2].pengguna, 'Admin Sistem');
});

test('C11-UT04 getDaftarLog membatasi hasil pada 100 log terbaru', () => {
    kosongkanLog();

    for (let i = 0; i < 105; i += 1) {
        const jam = String(Math.floor(i / 60)).padStart(2, '0');
        const menit = String(i % 60).padStart(2, '0');

        simpanLog.run(
            idAkunPemilik,
            `Aktivitas ${i}`,
            `2026-11-11 ${jam}:${menit}:00`
        );
    }

    const daftar = LogAktivitas.getDaftarLog();

    assert.equal(daftar.length, 100);
    assert.equal(daftar[0].aktivitas, 'Aktivitas 104');
    assert.equal(daftar[99].aktivitas, 'Aktivitas 5');
});

test('C11-UT05 getDaftarLog mengembalikan array kosong tanpa log', () => {
    kosongkanLog();

    assert.deepEqual(LogAktivitas.getDaftarLog(), []);
});

test('C11-UT06 cariLog menyaring berdasarkan kata kunci aktivitas', () => {
    kosongkanLog();

    simpanLog.run(idAkunPemilik, 'Mencatat surplus Roti C11', '2026-11-12 08:00:00');
    simpanLog.run(idAkunNgo, 'Mengklaim Roti C11', '2026-11-12 09:00:00');
    simpanLog.run(idAkunAdmin, 'Verifikasi pendaftaran C11', '2026-11-12 10:00:00');
    simpanLog.run(idAkunPemilik, 'Mendaftarkan akun C11', '2026-11-12 11:00:00');

    const klaim = LogAktivitas.cariLog('Klaim');
    assert.equal(klaim.length, 1);
    assert.equal(klaim[0].aktivitas, 'Mengklaim Roti C11');
    assert.equal(klaim[0].pengguna, 'NGO C11');

    const surplus = LogAktivitas.cariLog('Surplus');
    assert.equal(surplus.length, 1);
    assert.equal(surplus[0].aktivitas, 'Mencatat surplus Roti C11');

    const verifikasi = LogAktivitas.cariLog('Verifikasi');
    assert.equal(verifikasi.length, 1);
    assert.equal(verifikasi[0].pengguna, 'Admin Sistem');
});

test('C11-UT07 cariLog tidak membedakan huruf besar dan kecil', () => {
    assert.equal(LogAktivitas.cariLog('klaim').length, 1);
    assert.equal(LogAktivitas.cariLog('SURPLUS').length, 1);
    assert.equal(LogAktivitas.cariLog('verifikasi').length, 1);
});

test('C11-UT08 cariLog mengembalikan array kosong tanpa hasil', () => {
    assert.deepEqual(LogAktivitas.cariLog('TidakAda'), []);
});

test('C11-UT09 adaLog membedakan tabel berisi dan kosong', () => {
    assert.equal(LogAktivitas.adaLog(), true);

    const kosongkanSementara = db.transaction(() => {
        db.prepare('DELETE FROM log_aktivitas').run();
        assert.equal(LogAktivitas.adaLog(), false);
        throw new Error('batalkan');
    });

    assert.throws(() => kosongkanSementara(), /batalkan/);
    assert.equal(LogAktivitas.adaLog(), true);
});