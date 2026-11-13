const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Database dan storage diarahkan ke folder sementara agar data pengembangan aman.
const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-uji-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const AuthController = require('../controllers/AuthController');
const db = require('../config/db');
const DokumenPendukung = require('../models/DokumenPendukung');

require('../database/init')();

let nomor = 0;

function berkasUji() {
    nomor += 1;
    const lokasi = path.join(folderUji, `nib-${nomor}.pdf`);
    fs.writeFileSync(lokasi, '%PDF-1.4\nuji\n');
    return { originalname: `NIB Uji ${nomor}.pdf`, mimetype: 'application/pdf', size: 12, path: lokasi };
}

function formulirFnb(email) {
    return {
        tipeAkun: 'pemilik_fnb',
        email,
        kataSandi: 'rahasia123',
        namaUsaha: 'Bakery Uji',
        alamatUsaha: 'Jl. Uji No. 1, Bandung',
        jamOperasional: '08.00-20.00',
        berkas: berkasUji()
    };
}

function formulirNgo(email) {
    return {
        tipeAkun: 'perwakilan_ngo',
        email,
        kataSandi: 'rahasia123',
        namaOrganisasi: 'Yayasan Uji',
        nomorLegalitas: 'AHU-0000001.AH.01.01.TAHUN 2026',
        lokasi: 'Jl. Braga No. 12, Bandung',
        berkas: berkasUji()
    };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('registrasi Pemilik F&B menyimpan akun, profil, pendaftaran, dan dokumen', () => {
    const hasil = AuthController.registrasiAkun(formulirFnb('fnb@foodlink.test'));

    assert.equal(hasil.status, 'menunggu verifikasi');
    assert.ok(hasil.idAkun > 0);
    assert.ok(hasil.idPendaftaran > 0);

    const akun = db.prepare('SELECT * FROM akun_pengguna WHERE id_akun = ?').get(hasil.idAkun);
    assert.equal(akun.email, 'fnb@foodlink.test');
    assert.equal(akun.tipe_akun, 'pemilik_fnb');
    assert.match(akun.kata_sandi, /^\$2[aby]\$/);
    assert.notEqual(akun.kata_sandi, 'rahasia123');

    const profil = db.prepare('SELECT * FROM pemilik_fnb WHERE id_akun = ?').get(hasil.idAkun);
    assert.equal(profil.nama_usaha, 'Bakery Uji');
    assert.equal(profil.jam_operasional, '08.00-20.00');

    const pendaftaran = db.prepare('SELECT * FROM pendaftaran WHERE id_pendaftaran = ?').get(hasil.idPendaftaran);
    assert.equal(pendaftaran.status_verifikasi, 'menunggu verifikasi');

    const dokumen = DokumenPendukung.getDokumen(hasil.idPendaftaran);
    assert.equal(dokumen.length, 1);
    assert.equal(dokumen[0].tipeDokumen, 'PDF');
});

test('registrasi Perwakilan NGO mengisi tabel perwakilan_ngo', () => {
    const hasil = AuthController.registrasiAkun(formulirNgo('ngo@foodlink.test'));

    const profil = db.prepare('SELECT * FROM perwakilan_ngo WHERE id_akun = ?').get(hasil.idAkun);
    assert.equal(profil.nama_organisasi, 'Yayasan Uji');
    assert.equal(profil.nomor_legalitas, 'AHU-0000001.AH.01.01.TAHUN 2026');

    const salahTabel = db.prepare('SELECT COUNT(*) AS c FROM pemilik_fnb WHERE id_akun = ?').get(hasil.idAkun).c;
    assert.equal(salahTabel, 0);
});

test('email duplikat ditolak tanpa menambah data', () => {
    AuthController.registrasiAkun(formulirFnb('dobel@foodlink.test'));
    const sebelum = db.prepare('SELECT COUNT(*) AS c FROM akun_pengguna').get().c;

    assert.throws(
        () => AuthController.registrasiAkun(formulirFnb('dobel@foodlink.test')),
        (err) => {
            assert.equal(err.name, 'GalatRegistrasi');
            assert.equal(err.daftarError[0].field, 'email');
            return true;
        }
    );

    const sesudah = db.prepare('SELECT COUNT(*) AS c FROM akun_pengguna').get().c;
    assert.equal(sesudah, sebelum);
});

test('validasi gagal tidak menyisakan akun maupun berkas sementara', () => {
    const formulir = formulirFnb('gagal@foodlink.test');
    formulir.jamOperasional = '';

    assert.throws(
        () => AuthController.registrasiAkun(formulir),
        (err) => {
            assert.equal(err.name, 'GalatRegistrasi');
            assert.equal(err.daftarError[0].field, 'jamOperasional');
            return true;
        }
    );

    const jumlah = db.prepare('SELECT COUNT(*) AS c FROM akun_pengguna WHERE email = ?').get('gagal@foodlink.test').c;
    assert.equal(jumlah, 0);
    assert.equal(fs.existsSync(formulir.berkas.path), false);
});

test('dokumen tidak diunggah ditolak', () => {
    const formulir = formulirFnb('tanpa-dokumen@foodlink.test');
    delete formulir.berkas;

    assert.throws(
        () => AuthController.registrasiAkun(formulir),
        (err) => {
            assert.equal(err.name, 'GalatRegistrasi');
            assert.ok(err.daftarError.some((e) => e.field === 'dokumen'));
            return true;
        }
    );
});