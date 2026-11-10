const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-verif-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');
const PemilikFnB = require('../models/PemilikFnB');

let urut = 0;

function buatPendaftar() {
    urut += 1;
    const email = `verif-${urut}@foodlink.test`;
    const idAkun = AkunPengguna.registrasi({
        email,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha Uji ${urut}`,
        alamatUsaha: 'Jl. Uji No. 3, Bandung',
        jamOperasional: '08.00-20.00'
    });
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
    return { idAkun, idPendaftaran, email };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('pendaftaran baru masuk daftar menunggu verifikasi', () => {
    const { idPendaftaran } = buatPendaftar();
    const daftar = Pendaftaran.getDaftarMenungguVerifikasi();

    assert.ok(daftar.some((p) => p.idPendaftaran === idPendaftaran));
    assert.ok(daftar.every((p) => p.statusVerifikasi === 'menunggu verifikasi'));
});

test('detail pendaftar memuat data profil pemilik', () => {
    const { idPendaftaran, email } = buatPendaftar();
    const detail = Pendaftaran.getDetailPendaftar(idPendaftaran);

    assert.equal(detail.email, email);
    assert.equal(detail.tipeAkun, 'pemilik_fnb');
    assert.equal(detail.jamOperasional, '08.00-20.00');
    assert.ok(detail.namaUsaha.startsWith('Usaha Uji'));
});

test('detail pendaftar yang tidak ada mengembalikan null', () => {
    assert.equal(Pendaftaran.getDetailPendaftar(999999), null);
});

test('menyetujui pendaftaran mengubah status menjadi diterima', () => {
    const { idPendaftaran } = buatPendaftar();

    assert.equal(Pendaftaran.updateStatus(idPendaftaran, 'diterima'), true);
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'diterima');
});

test('menolak pendaftaran mengubah status menjadi ditolak', () => {
    const { idPendaftaran } = buatPendaftar();

    assert.equal(Pendaftaran.updateStatus(idPendaftaran, 'ditolak'), true);
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'ditolak');
});

test('keputusan kedua tidak menimpa keputusan pertama', () => {
    const { idPendaftaran } = buatPendaftar();

    Pendaftaran.updateStatus(idPendaftaran, 'diterima');

    assert.equal(Pendaftaran.updateStatus(idPendaftaran, 'ditolak'), false);
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'diterima');
});

test('status di luar daftar ditolak tanpa mengubah data', () => {
    const { idPendaftaran } = buatPendaftar();

    assert.equal(Pendaftaran.updateStatus(idPendaftaran, 'pending'), false);
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'menunggu verifikasi');
});

test('pendaftaran yang sudah diverifikasi hilang dari daftar menunggu', () => {
    const { idPendaftaran } = buatPendaftar();

    Pendaftaran.updateStatus(idPendaftaran, 'diterima');

    const daftar = Pendaftaran.getDaftarMenungguVerifikasi();
    assert.equal(daftar.some((p) => p.idPendaftaran === idPendaftaran), false);
});