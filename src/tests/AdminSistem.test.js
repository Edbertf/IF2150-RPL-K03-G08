const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c32-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const { butuhPeran, butuhDiverifikasi } = require('../middleware/peran');
const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');

let urut = 0;

function akunBaru(tipeAkun = 'pemilik_fnb') {
    urut += 1;

    return AkunPengguna.registrasi({
        email: `c32-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun
    });
}

function buatRes() {
    return {
        statusCode: null,
        body: null,
        redirectTo: null,
        status(kode) {
            this.statusCode = kode;
            return this;
        },
        send(body) {
            this.body = body;
            return this;
        },
        redirect(tujuan) {
            this.redirectTo = tujuan;
            return this;
        }
    };
}

function jalankanPeran(daftarPeran, user) {
    const res = buatRes();
    let lanjut = false;

    butuhPeran(...daftarPeran)({ user }, res, () => {
        lanjut = true;
    });

    return { res, lanjut };
}

function jalankanDiverifikasi(user) {
    const res = buatRes();
    let lanjut = false;

    butuhDiverifikasi({ user }, res, () => {
        lanjut = true;
    });

    return { res, lanjut };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C32-UT01 butuhPeran() mengizinkan peran admin_sistem', () => {
    const hasil = jalankanPeran(
        ['admin_sistem'],
        { idAkun: 1, role: 'admin_sistem' }
    );

    assert.equal(hasil.lanjut, true);
    assert.equal(hasil.res.statusCode, null);
    assert.equal(hasil.res.redirectTo, null);
});

test('C32-UT02 butuhPeran() mengizinkan salah satu dari beberapa peran', () => {
    const hasil = jalankanPeran(
        ['pemilik_fnb', 'perwakilan_ngo'],
        { idAkun: 2, role: 'perwakilan_ngo' }
    );

    assert.equal(hasil.lanjut, true);
    assert.equal(hasil.res.statusCode, null);
    assert.equal(hasil.res.redirectTo, null);
});

test('C32-UT03 butuhPeran() mengalihkan pengguna belum masuk dan menolak peran salah', () => {
    const belumMasuk = jalankanPeran(['admin_sistem'], null);

    assert.equal(belumMasuk.res.redirectTo, '/masuk');
    assert.equal(belumMasuk.lanjut, false);

    const salahPeran = jalankanPeran(
        ['admin_sistem'],
        { idAkun: 3, role: 'pemilik_fnb' }
    );

    assert.equal(salahPeran.res.statusCode, 403);
    assert.equal(
        salahPeran.res.body,
        'Halaman ini tidak tersedia untuk peran Anda.'
    );
    assert.equal(salahPeran.lanjut, false);
});

test('C32-UT04 butuhDiverifikasi() mengizinkan akun diterima dan admin_sistem', () => {
    const idAkun = akunBaru();
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);

    Pendaftaran.updateStatus(idPendaftaran, 'diterima');

    const diterima = jalankanDiverifikasi({
        idAkun,
        role: 'pemilik_fnb'
    });

    assert.equal(diterima.lanjut, true);
    assert.equal(diterima.res.redirectTo, null);

    const admin = jalankanDiverifikasi({
        idAkun: 1,
        role: 'admin_sistem'
    });

    assert.equal(admin.lanjut, true);
    assert.equal(admin.res.redirectTo, null);
});

test('C32-UT05 butuhDiverifikasi() mengalihkan akun belum diterima ke /status', () => {
    const idMenunggu = akunBaru();
    Pendaftaran.ajukanPendaftaran(idMenunggu);

    const menunggu = jalankanDiverifikasi({
        idAkun: idMenunggu,
        role: 'pemilik_fnb'
    });

    assert.equal(menunggu.res.redirectTo, '/status');
    assert.equal(menunggu.lanjut, false);

    const idDitolak = akunBaru();
    const idPendaftaranDitolak = Pendaftaran.ajukanPendaftaran(idDitolak);

    Pendaftaran.updateStatus(idPendaftaranDitolak, 'ditolak');

    const ditolak = jalankanDiverifikasi({
        idAkun: idDitolak,
        role: 'pemilik_fnb'
    });

    assert.equal(ditolak.res.redirectTo, '/status');
    assert.equal(ditolak.lanjut, false);

    const idTanpaPendaftaran = akunBaru();

    const tanpaPendaftaran = jalankanDiverifikasi({
        idAkun: idTanpaPendaftaran,
        role: 'pemilik_fnb'
    });

    assert.equal(tanpaPendaftaran.res.redirectTo, '/status');
    assert.equal(tanpaPendaftaran.lanjut, false);
});

test('C32-UT06 butuhDiverifikasi() mengalihkan pengguna belum masuk ke /masuk', () => {
    const hasil = jalankanDiverifikasi(null);

    assert.equal(hasil.res.redirectTo, '/masuk');
    assert.equal(hasil.lanjut, false);
});