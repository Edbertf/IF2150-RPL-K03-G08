const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c29-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');

const db = require('../config/db');
require('../database/init')();

const LogAktivitas = require('../models/LogAktivitas');
const LogController = require('../controllers/LogController');

const idAkunAdmin = Number(
    db.prepare(`
        INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun)
        VALUES (?, ?, ?)
    `).run('c29-admin@foodlink.test', 'x', 'admin_sistem')
        .lastInsertRowid
);

const insertLog = db.prepare(`
    INSERT INTO log_aktivitas (id_akun, aktivitas, waktu)
    VALUES (?, ?, ?)
`);

insertLog.run(
    idAkunAdmin,
    'Mengklaim Roti Manis (3 porsi)',
    '2026-11-10 10:00:00'
);
insertLog.run(
    idAkunAdmin,
    'Mencatat surplus Roti Tawar (8 porsi)',
    '2026-11-10 09:00:00'
);
insertLog.run(
    idAkunAdmin,
    'Masuk ke aplikasi',
    '2026-11-10 08:00:00'
);

function buatRes() {
    return {
        statusCode: null,
        viewName: null,
        data: null,
        status(kode) {
            this.statusCode = kode;
            return this;
        },
        render(nama, data) {
            this.viewName = nama;
            this.data = data;
            return this;
        }
    };
}

function buatReq(kategori) {
    return {
        query: kategori === undefined ? {} : { kategori }
    };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C29-UT01 tampilkanLog() menampilkan seluruh log dan format waktu', () => {
    const res = buatRes();

    LogController.tampilkanLog({}, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.viewName, 'admin/I23-LogAktivitas');
    assert.equal(res.data.daftar.length, 3);
    assert.equal(
        res.data.daftar[0].aktivitas,
        'Mengklaim Roti Manis (3 porsi)'
    );
    assert.equal(res.data.daftar[0].waktuTampil, '10.00');
    assert.equal(res.data.daftar[2].waktuTampil, '08.00');
    assert.deepEqual(
        res.data.pilihanFilter,
        ['Semua', 'Klaim', 'Surplus', 'Verifikasi']
    );
    assert.equal(res.data.filterAktif, 'Semua');
    assert.equal(res.data.adaLogKeseluruhan, true);
    assert.equal(res.data.pesanError, null);
});

test('C29-UT02 tampilkanLog() menangani basis data log kosong', () => {
    const kosongkan = db.transaction(() => {
        db.prepare('DELETE FROM log_aktivitas').run();

        const res = buatRes();
        LogController.tampilkanLog({}, res);

        assert.equal(res.statusCode, 200);
        assert.deepEqual(res.data.daftar, []);
        assert.equal(res.data.adaLogKeseluruhan, false);
        assert.equal(res.data.filterAktif, 'Semua');

        throw new Error('batalkan');
    });

    assert.throws(() => kosongkan(), /batalkan/);
    assert.equal(LogAktivitas.getDaftarLog().length, 3);
});

test('C29-UT03 tampilkanLog() menampilkan waktu "-" untuk data waktu tidak valid', () => {
    const ujiWaktu = db.transaction(() => {
        insertLog.run(
            idAkunAdmin,
            'Aktivitas tanpa jam',
            'tanpa-jam'
        );

        const res = buatRes();
        LogController.tampilkanLog({}, res);

        const baris = res.data.daftar.find(
            (item) => item.aktivitas === 'Aktivitas tanpa jam'
        );

        assert.ok(baris);
        assert.equal(baris.waktuTampil, '-');

        throw new Error('batalkan');
    });

    assert.throws(() => ujiWaktu(), /batalkan/);
});

test('C29-UT04 saringLog() menyaring log berdasarkan kategori Klaim', () => {
    const res = buatRes();

    LogController.saringLog(buatReq('Klaim'), res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.viewName, 'admin/I23-LogAktivitas');
    assert.equal(res.data.daftar.length, 1);
    assert.equal(
        res.data.daftar[0].aktivitas,
        'Mengklaim Roti Manis (3 porsi)'
    );
    assert.equal(res.data.daftar[0].waktuTampil, '10.00');
    assert.equal(res.data.filterAktif, 'Klaim');
    assert.equal(res.data.adaLogKeseluruhan, true);
    assert.equal(res.data.pesanError, null);
});

test('C29-UT05 saringLog() menangani huruf besar/kecil, spasi, Semua, dan hasil kosong', () => {
    const resTrim = buatRes();
    LogController.saringLog(buatReq('  kLaIm  '), resTrim);

    assert.equal(resTrim.data.filterAktif, 'Klaim');
    assert.equal(resTrim.data.daftar.length, 1);

    const resSemua = buatRes();
    LogController.saringLog(buatReq('Semua'), resSemua);

    assert.equal(resSemua.statusCode, 200);
    assert.equal(resSemua.data.filterAktif, 'Semua');
    assert.equal(resSemua.data.daftar.length, 3);
    assert.equal(resSemua.data.adaLogKeseluruhan, true);

    const resVerifikasi = buatRes();
    LogController.saringLog(buatReq('Verifikasi'), resVerifikasi);

    assert.equal(resVerifikasi.statusCode, 200);
    assert.equal(resVerifikasi.data.filterAktif, 'Verifikasi');
    assert.equal(resVerifikasi.data.daftar.length, 0);
    assert.equal(resVerifikasi.data.adaLogKeseluruhan, true);
});

test('C29-UT06 saringLog() menolak kategori tidak valid dan bukan string', () => {
    const resTidakValid = buatRes();
    LogController.saringLog(buatReq('Akun'), resTidakValid);

    assert.equal(resTidakValid.statusCode, 400);
    assert.equal(resTidakValid.viewName, 'admin/I23-LogAktivitas');
    assert.equal(
        resTidakValid.data.pesanError,
        'Kriteria penyaringan tidak valid.'
    );
    assert.equal(resTidakValid.data.filterAktif, 'Semua');
    assert.equal(resTidakValid.data.daftar.length, 3);
    assert.equal(resTidakValid.data.adaLogKeseluruhan, true);

    const resBukanString = buatRes();
    LogController.saringLog(buatReq(['Klaim']), resBukanString);

    assert.equal(resBukanString.statusCode, 400);
    assert.equal(
        resBukanString.data.pesanError,
        'Kriteria penyaringan tidak valid.'
    );
});