const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c23-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AuthController = require('../controllers/AuthController');
const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');
const PemilikFnB = require('../models/PemilikFnB');
const PerwakilanNGO = require('../models/PerwakilanNGO');
const DokumenPendukung = require('../models/DokumenPendukung');

let urut = 0;
let nomorBerkas = 0;

function berkasUji(nama = 'NIB C23.pdf', mime = 'application/pdf', isi = '%PDF-1.4\nuji\n') {
    nomorBerkas += 1;
    const lokasi = path.join(folderUji, `berkas-${nomorBerkas}.bin`);
    fs.writeFileSync(lokasi, isi);

    return {
        originalname: nama,
        mimetype: mime,
        size: Buffer.byteLength(isi),
        path: lokasi
    };
}

function formulirFnb(email, denganBerkas = true) {
    const form = {
        tipeAkun: 'pemilik_fnb',
        email,
        kataSandi: 'rahasia123',
        namaUsaha: 'Bakery C23',
        alamatUsaha: 'Jl. C23 No. 1, Bandung',
        jamOperasional: '08.00-20.00'
    };

    if (denganBerkas) form.berkas = berkasUji();
    return form;
}

function formulirNgo(email, denganBerkas = true) {
    const form = {
        tipeAkun: 'perwakilan_ngo',
        email,
        kataSandi: 'rahasia123',
        namaOrganisasi: 'Yayasan C23',
        nomorLegalitas: 'AHU-C23-0001',
        lokasi: 'Jl. C23 No. 2, Bandung'
    };

    if (denganBerkas) form.berkas = berkasUji();
    return form;
}

function buatAkun(tipeAkun, status = 'diterima') {
    urut += 1;
    const email = `c23-${urut}@foodlink.test`;
    const idAkun = AkunPengguna.registrasi({
        email,
        kataSandi: 'rahasia123',
        tipeAkun
    });

    if (tipeAkun === 'pemilik_fnb') {
        PemilikFnB.simpanProfil(idAkun, {
            namaUsaha: `Usaha C23 ${urut}`,
            alamatUsaha: 'Jl. C23 No. 1, Bandung',
            jamOperasional: '08.00-20.00'
        });
    } else if (tipeAkun === 'perwakilan_ngo') {
        PerwakilanNGO.simpanProfil(idAkun, {
            namaOrganisasi: `Yayasan C23 ${urut}`,
            nomorLegalitas: `AHU-C23-${urut}`,
            lokasi: 'Jl. C23 No. 2, Bandung'
        });
    }

    let idPendaftaran = null;
    if (status !== null) {
        idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
        if (status !== 'menunggu verifikasi') {
            Pendaftaran.updateStatus(idPendaftaran, status);
        }
    }

    return { idAkun, email, idPendaftaran };
}

function sesiPalsu() {
    return {
        pengguna: null,
        dihancurkan: false,
        destroy(cb) {
            this.dihancurkan = true;
            cb();
        }
    };
}

function reqPalsu({
    params = {},
    body = {},
    query = {},
    user = null,
    session = {},
    file = null
} = {}) {
    return { params, body, query, user, session, file };
}

function resPalsu() {
    return {
        statusCode: 200,
        rendered: null,
        redirectUrl: null,
        cookieDihapus: null,
        status(kode) {
            this.statusCode = kode;
            return this;
        },
        render(view, data) {
            this.rendered = { view, data };
            return this;
        },
        redirect(url) {
            this.redirectUrl = url;
            return this;
        },
        clearCookie(nama) {
            this.cookieDihapus = nama;
            return this;
        }
    };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C23-UT01 registrasiAkun menyimpan akun F&B, profil, pendaftaran, dokumen, dan log', () => {
    const form = formulirFnb('fnb-c23@foodlink.test');
    const hasil = AuthController.registrasiAkun(form);

    assert.equal(hasil.status, 'menunggu verifikasi');
    assert.ok(hasil.idAkun > 0);
    assert.ok(hasil.idPendaftaran > 0);

    const akun = db.prepare('SELECT * FROM akun_pengguna WHERE id_akun = ?').get(hasil.idAkun);
    assert.equal(akun.email, 'fnb-c23@foodlink.test');
    assert.equal(akun.tipe_akun, 'pemilik_fnb');
    assert.match(akun.kata_sandi, /^\$2[aby]\$/);
    assert.notEqual(akun.kata_sandi, 'rahasia123');

    const profil = db.prepare('SELECT * FROM pemilik_fnb WHERE id_akun = ?').get(hasil.idAkun);
    assert.equal(profil.nama_usaha, 'Bakery C23');
    assert.equal(Pendaftaran.getStatus(hasil.idPendaftaran), 'menunggu verifikasi');

    const dokumen = DokumenPendukung.getDokumen(hasil.idPendaftaran);
    assert.equal(dokumen.length, 1);
    assert.equal(dokumen[0].tipeDokumen, 'PDF');

    const log = db.prepare(
        'SELECT aktivitas FROM log_aktivitas WHERE id_akun = ? ORDER BY id_log DESC LIMIT 1'
    ).get(hasil.idAkun);
    assert.equal(log.aktivitas, 'Mendaftarkan akun Bakery C23');
    assert.equal(fs.existsSync(form.berkas.path), false);
});

test('C23-UT02 registrasiAkun menerima nilai batas pada profil NGO', () => {
    const form = formulirNgo('ngo-c23@foodlink.test');
    const namaOrganisasi = 'n'.repeat(120);
    const nomorLegalitas = 'l'.repeat(120);

    form.kataSandi = 'x'.repeat(72);
    form.namaOrganisasi = namaOrganisasi;
    form.nomorLegalitas = nomorLegalitas;
    form.lokasi = 'a'.repeat(255);

    const hasil = AuthController.registrasiAkun(form);

    const profil = db.prepare('SELECT * FROM perwakilan_ngo WHERE id_akun = ?').get(hasil.idAkun);
    assert.equal(profil.nama_organisasi, namaOrganisasi);
    assert.equal(profil.nomor_legalitas, nomorLegalitas);

    const salahTabel = db.prepare(
        'SELECT COUNT(*) AS c FROM pemilik_fnb WHERE id_akun = ?'
    ).get(hasil.idAkun).c;
    assert.equal(salahTabel, 0);

    const log = db.prepare(
        'SELECT aktivitas FROM log_aktivitas WHERE id_akun = ? ORDER BY id_log DESC LIMIT 1'
    ).get(hasil.idAkun);
    assert.equal(log.aktivitas, `Mendaftarkan akun ${namaOrganisasi}`);
    assert.equal(fs.existsSync(form.berkas.path), false);
});

test('C23-UT03 registrasiAkun menolak data/dokumen tidak valid dan email duplikat', () => {
    const tanpaJam = formulirFnb('gagal-jam-c23@foodlink.test');
    tanpaJam.jamOperasional = '   ';

    assert.throws(
        () => AuthController.registrasiAkun(tanpaJam),
        (err) => err.name === 'GalatRegistrasi'
            && err.daftarError.some((item) => item.field === 'jamOperasional')
    );
    assert.equal(fs.existsSync(tanpaJam.berkas.path), false);
    assert.equal(
        db.prepare('SELECT COUNT(*) AS c FROM akun_pengguna WHERE email = ?').get(tanpaJam.email).c,
        0
    );

    const tanpaDokumen = formulirFnb('tanpa-dokumen-c23@foodlink.test', false);
    assert.throws(
        () => AuthController.registrasiAkun(tanpaDokumen),
        (err) => err.name === 'GalatRegistrasi'
            && err.daftarError.some((item) => item.field === 'dokumen')
    );

    const dokumenSalah = formulirFnb('dokumen-salah-c23@foodlink.test');
    dokumenSalah.berkas = berkasUji('virus.exe', 'application/octet-stream', 'x');
    assert.throws(
        () => AuthController.registrasiAkun(dokumenSalah),
        (err) => err.name === 'GalatRegistrasi'
            && err.daftarError.some((item) => item.field === 'dokumen')
    );
    assert.equal(fs.existsSync(dokumenSalah.berkas.path), false);

    AuthController.registrasiAkun(formulirFnb('dobel-c23@foodlink.test'));
    const sebelum = db.prepare('SELECT COUNT(*) AS c FROM akun_pengguna').get().c;

    const duplikat = formulirFnb('dobel-c23@foodlink.test');
    assert.throws(
        () => AuthController.registrasiAkun(duplikat),
        (err) => err.name === 'GalatRegistrasi'
            && err.daftarError[0].field === 'email'
    );
    assert.equal(db.prepare('SELECT COUNT(*) AS c FROM akun_pengguna').get().c, sebelum);
    assert.equal(fs.existsSync(duplikat.berkas.path), false);
});

test('C23-UT04 validasiKelengkapanData menerima F&B/NGO dan menormalkan isian', () => {
    assert.equal(
        AuthController.validasiKelengkapanData(formulirFnb('valid-fnb-c23@foodlink.test', false)),
        true
    );
    assert.equal(
        AuthController.validasiKelengkapanData(formulirNgo('valid-ngo-c23@foodlink.test', false)),
        true
    );

    const hasil = AuthController.normalisasiFormulir({
        tipeAkun: ' pemilik_fnb ',
        email: '  C23@Foodlink.Test ',
        kataSandi: 123,
        namaUsaha: '  Bakery C23  '
    });

    assert.equal(hasil.tipeAkun, 'pemilik_fnb');
    assert.equal(hasil.email, 'c23@foodlink.test');
    assert.equal(hasil.kataSandi, '');
    assert.equal(hasil.namaUsaha, 'Bakery C23');
});

test('C23-UT05 validasiKelengkapanData menolak panjang email, sandi, alamat, dan lokasi di atas batas', () => {
    const fnb = formulirFnb('invalid-c23@foodlink.test', false);
    const ngo = formulirNgo('invalid-ngo-c23@foodlink.test', false);

    assert.equal(
        AuthController.validasiKelengkapanData({
            ...fnb,
            email: `${'a'.repeat(250)}@x.test`
        }),
        false
    );
    assert.equal(
        AuthController.validasiKelengkapanData({ ...fnb, kataSandi: 'x'.repeat(73) }),
        false
    );
    assert.equal(
        AuthController.validasiKelengkapanData({ ...fnb, alamatUsaha: 'x'.repeat(256) }),
        false
    );
    assert.equal(
        AuthController.validasiKelengkapanData({ ...ngo, lokasi: 'x'.repeat(256) }),
        false
    );
});

test('C23-UT06 validasiKelengkapanData menolak tipe, email, sandi, dan field wajib tidak valid', () => {
    const fnb = formulirFnb('invalid-c23@foodlink.test', false);
    const ngo = formulirNgo('invalid-ngo-c23@foodlink.test', false);

    assert.equal(AuthController.validasiKelengkapanData({ ...fnb, tipeAkun: 'admin_sistem' }), false);
    assert.equal(AuthController.validasiKelengkapanData({ ...fnb, email: '' }), false);
    assert.equal(AuthController.validasiKelengkapanData({ ...fnb, email: 'bukan-email' }), false);
    assert.equal(AuthController.validasiKelengkapanData({ ...fnb, kataSandi: '' }), false);
    assert.equal(AuthController.validasiKelengkapanData({ ...fnb, kataSandi: 'pendek' }), false);
    assert.equal(AuthController.validasiKelengkapanData({ ...fnb, namaUsaha: '' }), false);
    assert.equal(AuthController.validasiKelengkapanData({ ...ngo, nomorLegalitas: '' }), false);

    const error = AuthController.daftarErrorKelengkapan({ ...fnb, jamOperasional: '' });
    assert.equal(error[0].field, 'jamOperasional');
});

test('C23-UT07 validasiFormatDokumen menerima PDF, JPG, dan PNG', () => {
    assert.equal(AuthController.validasiFormatDokumen(berkasUji('NIB.pdf')), true);
    assert.equal(
        AuthController.validasiFormatDokumen({
            originalname: 'FOTO.JPEG',
            mimetype: 'image/jpeg',
            size: 2048
        }),
        true
    );
    assert.equal(
        AuthController.validasiFormatDokumen({
            originalname: 'logo.png',
            mimetype: 'image/png',
            size: 1
        }),
        true
    );
});

test('C23-UT08 validasiFormatDokumen menolak berkas kosong dan melebihi 5 MB', () => {
    assert.equal(
        AuthController.validasiFormatDokumen({
            originalname: 'kosong.pdf',
            mimetype: 'application/pdf',
            size: 0
        }),
        false
    );
    assert.equal(
        AuthController.validasiFormatDokumen({
            originalname: 'besar.pdf',
            mimetype: 'application/pdf',
            size: 5 * 1024 * 1024 + 1
        }),
        false
    );
});

test('C23-UT09 validasiFormatDokumen menolak berkas tidak ada, ekstensi salah, dan MIME tidak cocok', () => {
    assert.equal(AuthController.validasiFormatDokumen(undefined), false);
    assert.equal(
        AuthController.validasiFormatDokumen({
            originalname: 'virus.exe',
            mimetype: 'application/octet-stream',
            size: 10
        }),
        false
    );
    assert.equal(
        AuthController.validasiFormatDokumen({
            originalname: 'nib.pdf',
            mimetype: 'image/png',
            size: 10
        }),
        false
    );
    assert.equal(
        AuthController.validasiFormatDokumen({
            originalname: 'tanpa-ekstensi',
            mimetype: 'application/pdf',
            size: 10
        }),
        false
    );
});

test('C23-UT10 cekStatusPendaftaran mengembalikan status menunggu verifikasi dan tanggal daftar', () => {
    const menunggu = buatAkun('pemilik_fnb', 'menunggu verifikasi');
    const hasil = AuthController.cekStatusPendaftaran(menunggu.idAkun);

    assert.equal(hasil.status, 'menunggu verifikasi');
    assert.match(hasil.tanggalDaftar, /^\d{4}-\d{2}-\d{2}$/);
});

test('C23-UT11 cekStatusPendaftaran mengembalikan status diterima dan ditolak', () => {
    const diterima = buatAkun('perwakilan_ngo', 'diterima');
    const ditolak = buatAkun('pemilik_fnb', 'ditolak');

    assert.equal(AuthController.cekStatusPendaftaran(diterima.idAkun).status, 'diterima');
    assert.equal(AuthController.cekStatusPendaftaran(ditolak.idAkun).status, 'ditolak');
});

test('C23-UT12 cekStatusPendaftaran mengembalikan pesan saat pendaftaran tidak ada', () => {
    const tanpaPendaftaran = buatAkun('pemilik_fnb', null);

    assert.deepEqual(
        AuthController.cekStatusPendaftaran(tanpaPendaftaran.idAkun),
        { ditemukan: false, pesan: 'Pendaftaran belum tersedia.' }
    );
});

test('C23-UT13 tampilkanFormRegistrasi()/tampilkanFormRegistrasiDenganError()/kirimFormulirRegistrasi() merender form, meneruskan error, dan mengalihkan saat sukses', () => {
    const resDefault = resPalsu();
    AuthController.tampilkanFormRegistrasi(reqPalsu(), resDefault);
    assert.equal(resDefault.statusCode, 200);
    assert.equal(resDefault.rendered.view, 'auth/I02-I03-Registrasi');
    assert.equal(resDefault.rendered.data.tipe, 'fnb');

    const resNgo = resPalsu();
    AuthController.tampilkanFormRegistrasi(
        reqPalsu({
            body: {
                tipeAkun: 'perwakilan_ngo',
                email: 'ngo-form@foodlink.test',
                kataSandi: 'rahasia123'
            }
        }),
        resNgo
    );
    assert.equal(resNgo.rendered.data.tipe, 'ngo');
    assert.equal(resNgo.rendered.data.old.email, 'ngo-form@foodlink.test');
    assert.equal('kataSandi' in resNgo.rendered.data.old, false);

    const resQuery = resPalsu();
    AuthController.tampilkanFormRegistrasi(reqPalsu({ query: { tipe: 'ngo' } }), resQuery);
    assert.equal(resQuery.rendered.data.tipe, 'ngo');

    const resError = resPalsu();
    AuthController.tampilkanFormRegistrasiDenganError(
        reqPalsu({ body: { email: 'error-form@foodlink.test' } }),
        resError,
        400,
        { email: 'Email sudah terdaftar.' }
    );
    assert.equal(resError.statusCode, 400);
    assert.equal(resError.rendered.data.errorField.email, 'Email sudah terdaftar.');

    const sukses = formulirFnb('handler-sukses-c23@foodlink.test');
    const resSukses = resPalsu();
    AuthController.kirimFormulirRegistrasi(
        reqPalsu({ body: sukses, file: sukses.berkas }),
        resSukses
    );
    assert.equal(resSukses.redirectUrl, '/daftar/berhasil');
    assert.equal(
        db.prepare('SELECT COUNT(*) AS c FROM akun_pengguna WHERE email = ?').get(sukses.email).c,
        1
    );

    const gagal = formulirFnb('handler-gagal-c23@foodlink.test');
    gagal.jamOperasional = '';
    const resGagal = resPalsu();
    AuthController.kirimFormulirRegistrasi(
        reqPalsu({ body: gagal, file: gagal.berkas }),
        resGagal
    );
    assert.equal(resGagal.statusCode, 400);
    assert.equal(resGagal.rendered.view, 'auth/I02-I03-Registrasi');
    assert.equal(
        resGagal.rendered.data.errorField.jamOperasional,
        'Jam operasional wajib diisi.'
    );
    assert.equal(fs.existsSync(gagal.berkas.path), false);
});

test('C23-UT14 masuk() menolak kredensial salah dan mengarahkan pengguna sesuai status', () => {
    const resKosong = resPalsu();
    AuthController.masuk(reqPalsu({ body: {}, session: sesiPalsu() }), resKosong);
    assert.equal(resKosong.statusCode, 400);
    assert.equal(resKosong.rendered.data.error, 'Email dan kata sandi wajib diisi.');

    const resTidakDikenal = resPalsu();
    AuthController.masuk(
        reqPalsu({
            body: { email: 'tidakada@foodlink.test', kataSandi: 'rahasia123' },
            session: sesiPalsu()
        }),
        resTidakDikenal
    );
    assert.equal(resTidakDikenal.statusCode, 400);
    assert.equal(resTidakDikenal.rendered.data.error, 'Email atau kata sandi salah.');

    const pemilik = buatAkun('pemilik_fnb', 'diterima');
    const resSandiSalah = resPalsu();
    AuthController.masuk(
        reqPalsu({
            body: { email: pemilik.email, kataSandi: 'salah' },
            session: sesiPalsu()
        }),
        resSandiSalah
    );
    assert.equal(resSandiSalah.statusCode, 400);

    const admin = buatAkun('admin_sistem', null);
    const sesiAdmin = sesiPalsu();
    const resAdmin = resPalsu();
    AuthController.masuk(
        reqPalsu({ body: { email: admin.email, kataSandi: 'rahasia123' }, session: sesiAdmin }),
        resAdmin
    );
    assert.equal(resAdmin.redirectUrl, '/admin/verifikasi');
    assert.equal(sesiAdmin.pengguna.role, 'admin_sistem');

    const belum = buatAkun('pemilik_fnb', 'menunggu verifikasi');
    const resBelum = resPalsu();
    AuthController.masuk(
        reqPalsu({ body: { email: belum.email, kataSandi: 'rahasia123' }, session: sesiPalsu() }),
        resBelum
    );
    assert.equal(resBelum.redirectUrl, '/status');

    const fnb = buatAkun('pemilik_fnb', 'diterima');
    const sesiFnb = sesiPalsu();
    const resFnb = resPalsu();
    AuthController.masuk(
        reqPalsu({ body: { email: fnb.email, kataSandi: 'rahasia123' }, session: sesiFnb }),
        resFnb
    );
    assert.equal(resFnb.redirectUrl, '/fnb/penjualan');
    assert.ok(sesiFnb.pengguna.idPemilik > 0);

    const ngo = buatAkun('perwakilan_ngo', 'diterima');
    const sesiNgo = sesiPalsu();
    const resNgo = resPalsu();
    AuthController.masuk(
        reqPalsu({ body: { email: ngo.email, kataSandi: 'rahasia123' }, session: sesiNgo }),
        resNgo
    );
    assert.equal(resNgo.redirectUrl, '/ngo/surplus');
    assert.equal(sesiNgo.pengguna.idNgo, ngo.idAkun);

    const idTanpaProfil = AkunPengguna.registrasi({
        email: 'tanpa-profil-c23@foodlink.test',
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
    const sesiTanpaProfil = sesiPalsu();
    const resTanpaProfil = resPalsu();
    AuthController.masuk(
        reqPalsu({
            body: { email: 'tanpa-profil-c23@foodlink.test', kataSandi: 'rahasia123' },
            session: sesiTanpaProfil
        }),
        resTanpaProfil
    );
    assert.equal(resTanpaProfil.redirectUrl, '/status');
    assert.equal(sesiTanpaProfil.pengguna.idPemilik, null);
    assert.equal(sesiTanpaProfil.pengguna.nama, 'tanpa-profil-c23@foodlink.test');

    AkunPengguna.registrasi({
        email: 'ngo-tanpa-profil-c23@foodlink.test',
        kataSandi: 'rahasia123',
        tipeAkun: 'perwakilan_ngo'
    });
    const sesiNgoTanpaProfil = sesiPalsu();
    const resNgoTanpaProfil = resPalsu();
    AuthController.masuk(
        reqPalsu({
            body: { email: 'ngo-tanpa-profil-c23@foodlink.test', kataSandi: 'rahasia123' },
            session: sesiNgoTanpaProfil
        }),
        resNgoTanpaProfil
    );
    assert.equal(resNgoTanpaProfil.redirectUrl, '/status');
    assert.equal(sesiNgoTanpaProfil.pengguna.nama, 'ngo-tanpa-profil-c23@foodlink.test');
    assert.equal(sesiNgoTanpaProfil.pengguna.lokasi, null);
});

test('C23-UT15 keluar()/tampilkanHalamanMasuk()/tampilkanStatusPendaftaran()/tampilkanHalamanBerhasil() memberi respons sesuai', () => {
    const sesi = sesiPalsu();
    const resKeluar = resPalsu();
    AuthController.keluar(reqPalsu({ session: sesi }), resKeluar);
    assert.equal(sesi.dihancurkan, true);
    assert.equal(resKeluar.cookieDihapus, 'foodlink.sid');
    assert.equal(resKeluar.redirectUrl, '/');

    const resMasuk = resPalsu();
    AuthController.tampilkanHalamanMasuk(reqPalsu(), resMasuk);
    assert.equal(resMasuk.rendered.view, 'auth/I00-Masuk');
    assert.equal(resMasuk.rendered.data.error, null);

    const resSudahMasuk = resPalsu();
    AuthController.tampilkanHalamanMasuk(reqPalsu({ user: { idAkun: 1 } }), resSudahMasuk);
    assert.equal(resSudahMasuk.redirectUrl, '/');

    const menunggu = buatAkun('pemilik_fnb', 'menunggu verifikasi');
    const resStatus = resPalsu();
    AuthController.tampilkanStatusPendaftaran(
        reqPalsu({ user: { idAkun: menunggu.idAkun } }),
        resStatus
    );
    assert.equal(resStatus.rendered.view, 'auth/I04-StatusPendaftaran');
    assert.equal(resStatus.rendered.data.status, 'menunggu verifikasi');
    assert.equal(resStatus.rendered.data.judul, 'Menunggu Verifikasi');

    const resTidakAda = resPalsu();
    AuthController.tampilkanStatusPendaftaran(
        reqPalsu({ user: { idAkun: 999999 } }),
        resTidakAda
    );
    assert.equal(resTidakAda.statusCode, 404);
    assert.equal(resTidakAda.rendered.data.status, 'tidak ditemukan');

    const resBerhasil = resPalsu();
    AuthController.tampilkanHalamanBerhasil(reqPalsu(), resBerhasil);
    assert.equal(resBerhasil.rendered.data.status, 'menunggu verifikasi');
    assert.equal(resBerhasil.rendered.data.judul, 'Pendaftaran Dikirim');
});