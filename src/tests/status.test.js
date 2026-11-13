const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-status-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

require('../database/init')();
const db = require('../config/db');

const AuthController = require('../controllers/AuthController');
const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');

let urut = 0;

function akunBaru() {
    urut += 1;
    return AkunPengguna.registrasi({
        email: `status-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('akun tanpa pendaftaran tidak ditemukan', () => {
    const hasil = AuthController.cekStatusPendaftaran(akunBaru());
    assert.equal(hasil.ditemukan, false);
});

test('status menunggu verifikasi terbaca', () => {
    const idAkun = akunBaru();
    Pendaftaran.ajukanPendaftaran(idAkun);

    const hasil = AuthController.cekStatusPendaftaran(idAkun);
    assert.equal(hasil.ditemukan, true);
    assert.equal(hasil.status, 'menunggu verifikasi');
});

test('status diterima terbaca setelah keputusan', () => {
    const idAkun = akunBaru();
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
    Pendaftaran.updateStatus(idPendaftaran, 'diterima');

    assert.equal(AuthController.cekStatusPendaftaran(idAkun).status, 'diterima');
});

test('status ditolak terbaca setelah keputusan', () => {
    const idAkun = akunBaru();
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
    Pendaftaran.updateStatus(idPendaftaran, 'ditolak');

    assert.equal(AuthController.cekStatusPendaftaran(idAkun).status, 'ditolak');
});

test('status hanya membaca milik akun sendiri', () => {
    const akunA = akunBaru();
    const akunB = akunBaru();

    Pendaftaran.ajukanPendaftaran(akunA);
    const pendaftaranB = Pendaftaran.ajukanPendaftaran(akunB);
    Pendaftaran.updateStatus(pendaftaranB, 'diterima');

    assert.equal(AuthController.cekStatusPendaftaran(akunA).status, 'menunggu verifikasi');
    assert.equal(AuthController.cekStatusPendaftaran(akunB).status, 'diterima');
});