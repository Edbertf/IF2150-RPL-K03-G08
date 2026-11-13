const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-akses-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

require('../database/init')();
const db = require('../config/db');

const { butuhDiverifikasi } = require('../middleware/peran');
const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');

let urut = 0;

function akunBaru() {
    urut += 1;
    return AkunPengguna.registrasi({
        email: `akses-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
}

function jalankan(pengguna) {
    const hasil = { redirect: null, lanjut: false };
    const res = { redirect: (tujuan) => { hasil.redirect = tujuan; } };
    const next = () => { hasil.lanjut = true; };

    butuhDiverifikasi({ user: pengguna }, res, next);
    return hasil;
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('akun menunggu verifikasi dialihkan ke halaman status', () => {
    const idAkun = akunBaru();
    Pendaftaran.ajukanPendaftaran(idAkun);

    const hasil = jalankan({ idAkun, role: 'pemilik_fnb' });
    assert.equal(hasil.redirect, '/status');
    assert.equal(hasil.lanjut, false);
});

test('akun ditolak dialihkan ke halaman status', () => {
    const idAkun = akunBaru();
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
    Pendaftaran.updateStatus(idPendaftaran, 'ditolak');

    assert.equal(jalankan({ idAkun, role: 'pemilik_fnb' }).redirect, '/status');
});

test('akun diterima boleh melanjutkan', () => {
    const idAkun = akunBaru();
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
    Pendaftaran.updateStatus(idPendaftaran, 'diterima');

    const hasil = jalankan({ idAkun, role: 'pemilik_fnb' });
    assert.equal(hasil.lanjut, true);
    assert.equal(hasil.redirect, null);
});

test('akun tanpa pendaftaran dialihkan ke halaman status', () => {
    assert.equal(jalankan({ idAkun: akunBaru(), role: 'pemilik_fnb' }).redirect, '/status');
});

test('admin tidak terpengaruh pembatasan', () => {
    assert.equal(jalankan({ idAkun: 1, role: 'admin_sistem' }).lanjut, true);
});

test('pengguna belum masuk dialihkan ke halaman masuk', () => {
    assert.equal(jalankan(null).redirect, '/masuk');
});