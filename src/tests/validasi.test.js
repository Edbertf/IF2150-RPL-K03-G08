const test = require('node:test');
const assert = require('node:assert/strict');

const AuthController = require('../controllers/AuthController');

const formulirFnb = {
    tipeAkun: 'pemilik_fnb',
    email: 'budi@contoh.test',
    kataSandi: 'rahasia123',
    namaUsaha: 'Bakery Sinar Pagi',
    alamatUsaha: 'Jl. Contoh No. 1, Bandung',
    jamOperasional: '08.00-20.00'
};

const formulirNgo = {
    tipeAkun: 'perwakilan_ngo',
    email: 'kontak@yayasan.test',
    kataSandi: 'rahasia123',
    namaOrganisasi: 'Yayasan Berbagi Kasih',
    nomorLegalitas: 'AHU-0000001.AH.01.01.TAHUN 2026',
    lokasi: 'Jl. Braga No. 12, Bandung'
};

const berkasPdf = { originalname: 'NIB.pdf', mimetype: 'application/pdf', size: 1024 };

test('formulir F&B lengkap lolos validasi', () => {
    assert.equal(AuthController.validasiKelengkapanData(formulirFnb), true);
    assert.deepEqual(AuthController.daftarErrorKelengkapan(formulirFnb), []);
});

test('formulir NGO lengkap lolos validasi', () => {
    assert.equal(AuthController.validasiKelengkapanData(formulirNgo), true);
});

test('tipe akun di luar daftar ditolak', () => {
    const error = AuthController.daftarErrorKelengkapan({ ...formulirFnb, tipeAkun: 'admin_sistem' });
    assert.equal(error.length, 1);
    assert.equal(error[0].field, 'tipeAkun');
});

test('email kosong ditolak', () => {
    const error = AuthController.daftarErrorKelengkapan({ ...formulirFnb, email: '' });
    assert.equal(error[0].field, 'email');
});

for (const emailSalah of ['budi@', 'budi.contoh.test', '@contoh.test', 'budi @contoh.test']) {
    test(`email tidak valid ditolak: ${emailSalah}`, () => {
        assert.equal(
            AuthController.validasiKelengkapanData({ ...formulirFnb, email: emailSalah }),
            false
        );
    });
}

test('kata sandi kurang dari 8 karakter ditolak', () => {
    const error = AuthController.daftarErrorKelengkapan({ ...formulirFnb, kataSandi: 'rahasia' });
    assert.equal(error[0].field, 'kataSandi');
});

test('kata sandi lebih dari 72 karakter ditolak', () => {
    assert.equal(
        AuthController.validasiKelengkapanData({ ...formulirFnb, kataSandi: 'x'.repeat(73) }),
        false
    );
});

test('Pemilik F&B tanpa jam operasional ditolak', () => {
    const error = AuthController.daftarErrorKelengkapan({ ...formulirFnb, jamOperasional: '' });
    assert.equal(error[0].field, 'jamOperasional');
});

test('NGO tanpa nomor legalitas ditolak', () => {
    const error = AuthController.daftarErrorKelengkapan({ ...formulirNgo, nomorLegalitas: '' });
    assert.equal(error[0].field, 'nomorLegalitas');
});

test('normalisasi memangkas spasi dan menghuruf-kecilkan email', () => {
    const hasil = AuthController.normalisasiFormulir({
        tipeAkun: ' pemilik_fnb ',
        email: '  Budi@Contoh.Test  ',
        kataSandi: 123
    });

    assert.equal(hasil.tipeAkun, 'pemilik_fnb');
    assert.equal(hasil.email, 'budi@contoh.test');
    assert.equal(hasil.kataSandi, '');
});

test('dokumen PDF valid', () => {
    assert.equal(AuthController.validasiFormatDokumen(berkasPdf), true);
});

test('ekstensi huruf besar tetap diterima', () => {
    assert.equal(
        AuthController.validasiFormatDokumen({ originalname: 'FOTO.JPEG', mimetype: 'image/jpeg', size: 2048 }),
        true
    );
});

test('dokumen kosong ditolak', () => {
    assert.equal(AuthController.validasiFormatDokumen(undefined), false);
});

test('ekstensi tidak diizinkan ditolak', () => {
    assert.equal(
        AuthController.validasiFormatDokumen({ originalname: 'virus.exe', mimetype: 'application/octet-stream', size: 10 }),
        false
    );
});

test('mimetype tidak sesuai ekstensi ditolak', () => {
    assert.equal(
        AuthController.validasiFormatDokumen({ originalname: 'nib.pdf', mimetype: 'image/png', size: 10 }),
        false
    );
});

test('dokumen lebih dari 5 MB ditolak', () => {
    assert.equal(
        AuthController.validasiFormatDokumen({ ...berkasPdf, size: 6 * 1024 * 1024 }),
        false
    );
});

test('berkas berukuran nol ditolak', () => {
    assert.equal(AuthController.validasiFormatDokumen({ ...berkasPdf, size: 0 }), false);
});