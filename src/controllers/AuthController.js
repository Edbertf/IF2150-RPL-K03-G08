// C23 AuthController

const bcrypt = require('bcryptjs');
const fs = require('fs');
const db = require('../config/db');
const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');
const PemilikFnB = require('../models/PemilikFnB');
const PerwakilanNGO = require('../models/PerwakilanNGO');
const DokumenPendukung = require('../models/DokumenPendukung');
const PANJANG_MIN_SANDI = 8;
const PANJANG_MAKS_SANDI = 72; // bcrypt memotong kata sandi setelah 72 byte
const BATAS_MAKS_DOKUMEN = 5 * 1024 * 1024;
const MAKS_NAMA = 120;
const MAKS_ALAMAT = 255;
const MAKS_JAM = 60;
const MAKS_LEGALITAS = 120;

const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIPE_DIIZINKAN = ['pemilik_fnb', 'perwakilan_ngo'];

// Ekstensi -> MIME yang harus cocok. maks 5 MB.
const MIME_DARI_EKSTENSI = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png'
};

const teks = (nilai) => (typeof nilai === 'string' ? nilai.trim() : '');

// Menyeragamkan isian form sebelum divalidasi: email dihuruf-kecilkan dan seluruh teks dipangkas spasinya.
exports.normalisasiFormulir = (body = {}) => ({
    tipeAkun: teks(body.tipeAkun),
    email: teks(body.email).toLowerCase(),
    kataSandi: typeof body.kataSandi === 'string' ? body.kataSandi : '',
    namaUsaha: teks(body.namaUsaha),
    alamatUsaha: teks(body.alamatUsaha),
    jamOperasional: teks(body.jamOperasional),
    namaOrganisasi: teks(body.namaOrganisasi),
    nomorLegalitas: teks(body.nomorLegalitas),
    lokasi: teks(body.lokasi)
});

function periksaWajib(daftarError, nilai, field, label, panjangMaks) {
    if (!nilai) {
        daftarError.push({ field, pesan: `${label} wajib diisi.` });
        return;
    }
    if (panjangMaks && nilai.length > panjangMaks) {
        daftarError.push({ field, pesan: `${label} maksimal ${panjangMaks} karakter.` });
    }
}

// Mengembalikan daftar error per field agar RegistrasiPage bisa menandai isian yang bermasalah, lalu validasi kelengkapan
exports.daftarErrorKelengkapan = (dataForm) => {
    const error = [];

    if (!TIPE_DIIZINKAN.includes(dataForm.tipeAkun)) {
        error.push({ field: 'tipeAkun', pesan: 'Pilih tipe akun: Pemilik F&B atau Perwakilan NGO.' });
        return error;
    }

    if (!dataForm.email) {
        error.push({ field: 'email', pesan: 'Email wajib diisi.' });
    } else if (dataForm.email.length > 254 || !POLA_EMAIL.test(dataForm.email)) {
        error.push({ field: 'email', pesan: 'Format email tidak valid.' });
    }

    if (!dataForm.kataSandi) {
        error.push({ field: 'kataSandi', pesan: 'Kata sandi wajib diisi.' });
    } else if (dataForm.kataSandi.length < PANJANG_MIN_SANDI) {
        error.push({ field: 'kataSandi', pesan: `Kata sandi minimal ${PANJANG_MIN_SANDI} karakter.` });
    } else if (dataForm.kataSandi.length > PANJANG_MAKS_SANDI) {
        error.push({ field: 'kataSandi', pesan: `Kata sandi maksimal ${PANJANG_MAKS_SANDI} karakter.` });
    }

    if (dataForm.tipeAkun === 'pemilik_fnb') {
        periksaWajib(error, dataForm.namaUsaha, 'namaUsaha', 'Nama usaha', MAKS_NAMA);
        periksaWajib(error, dataForm.alamatUsaha, 'alamatUsaha', 'Alamat usaha', MAKS_ALAMAT);
        periksaWajib(error, dataForm.jamOperasional, 'jamOperasional', 'Jam operasional', MAKS_JAM);
    } else {
        periksaWajib(error, dataForm.namaOrganisasi, 'namaOrganisasi', 'Nama organisasi', MAKS_NAMA);
        periksaWajib(error, dataForm.nomorLegalitas, 'nomorLegalitas', 'Nomor legalitas', MAKS_LEGALITAS);
        periksaWajib(error, dataForm.lokasi, 'lokasi', 'Alamat kantor', MAKS_ALAMAT);
    }

    return error;
};

exports.validasiKelengkapanData = (dataForm) =>
    exports.daftarErrorKelengkapan(dataForm).length === 0;

function ekstensiDari(namaFile) {
    const nama = String(namaFile ?? '');
    const titik = nama.lastIndexOf('.');
    return titik === -1 ? '' : nama.slice(titik).toLowerCase();
}

// Mengembalikan pesan error pertama, atau null kalau dokumen valid.
exports.pesanErrorDokumen = (berkas) => {
    if (!berkas || !berkas.originalname) {
        return 'Dokumen pendukung wajib diunggah.';
    }

    const ekstensi = ekstensiDari(berkas.originalname);
    const mimeDiharapkan = MIME_DARI_EKSTENSI[ekstensi];

    if (!mimeDiharapkan) {
        return 'Format dokumen harus PDF, JPG, atau PNG.';
    }
    if (typeof berkas.size === 'number' && berkas.size <= 0) {
        return 'Berkas dokumen kosong.';
    }
    if (typeof berkas.size === 'number' && berkas.size > BATAS_MAKS_DOKUMEN) {
        return 'Ukuran dokumen maksimal 5 MB.';
    }
    if (berkas.mimetype && berkas.mimetype !== mimeDiharapkan) {
        return 'Tipe berkas tidak sesuai dengan ekstensinya.';
    }

    return null;
};

exports.validasiFormatDokumen = (berkas) => exports.pesanErrorDokumen(berkas) === null;

// Dipakai routes/auth.js agar batas multer dan pesan validasi memakai angka sama.
exports.BATAS_MAKS_DOKUMEN = BATAS_MAKS_DOKUMEN;
exports.PANJANG_MIN_SANDI = PANJANG_MIN_SANDI;

// Membawa daftar error per field
class GalatRegistrasi extends Error {
    constructor(daftarError) {
        super(daftarError[0] ? daftarError[0].pesan : 'Registrasi gagal.');
        this.name = 'GalatRegistrasi';
        this.daftarError = daftarError;
    }
}

exports.GalatRegistrasi = GalatRegistrasi;

function hapusBerkasSementara(berkas) {
    if (berkas && berkas.path) {
        fs.rmSync(berkas.path, { force: true });
    }
}

const simpanRegistrasi = db.transaction((formulir, berkas) => {
    const idAkun = AkunPengguna.registrasi({
        email: formulir.email,
        kataSandi: formulir.kataSandi,
        tipeAkun: formulir.tipeAkun
    });

    if (formulir.tipeAkun === 'pemilik_fnb') {
        PemilikFnB.simpanProfil(idAkun, formulir);
    } else {
        PerwakilanNGO.simpanProfil(idAkun, formulir);
    }

    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);

    DokumenPendukung.unggahDokumen(idPendaftaran, berkas);

    return { idAkun, idPendaftaran };
});

exports.registrasiAkun = (dataForm) => {
    const berkas = dataForm.berkas ?? null;
    const formulir = exports.normalisasiFormulir(dataForm);

    try {
        const daftarError = exports.daftarErrorKelengkapan(formulir);
        const pesanDokumen = exports.pesanErrorDokumen(berkas);

        if (pesanDokumen) {
            daftarError.push({ field: 'dokumen', pesan: pesanDokumen });
        }
        if (daftarError.length > 0) {
            throw new GalatRegistrasi(daftarError);
        }

        if (AkunPengguna.cariBerdasarkanEmail(formulir.email)) {
            throw new GalatRegistrasi([{ field: 'email', pesan: 'Email sudah terdaftar.' }]);
        }

        const { idAkun, idPendaftaran } = simpanRegistrasi(formulir, berkas);

        return { idAkun, idPendaftaran, status: 'menunggu verifikasi' };
    } catch (err) {
        hapusBerkasSementara(berkas);

        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            throw new GalatRegistrasi([{ field: 'email', pesan: 'Email sudah terdaftar.' }]);
        }
        throw err;
    }
};

// ---------- Handler HTTP  ----------

const LABEL_TIPE = {
    fnb: 'pemilik_fnb',
    ngo: 'perwakilan_ngo'
};

function tipeDari(req) {
    if (req.body && req.body.tipeAkun === LABEL_TIPE.ngo) return 'ngo';
    if (req.query && req.query.tipe === 'ngo') return 'ngo';
    return 'fnb';
}

function renderForm(req, res, status, errorField) {
    const old = { ...(req.body || {}) };
    delete old.kataSandi; // jangan pernah mengirim balik kata sandi ke halaman

    res.status(status).render('auth/I02-I03-Registrasi', {
        tipe: tipeDari(req),
        old,
        errorField: errorField || {}
    });
}

exports.tampilkanFormRegistrasi = (req, res) => {
    renderForm(req, res, 200, {});
};

exports.tampilkanFormRegistrasiDenganError = (req, res, status, errorField) => {
    renderForm(req, res, status, errorField);
};

exports.kirimFormulirRegistrasi = (req, res) => {
    const dataForm = { ...req.body, berkas: req.file ?? null };

    try {
        exports.registrasiAkun(dataForm);
        return res.redirect('/daftar/berhasil');
    } catch (err) {
        if (!(err instanceof exports.GalatRegistrasi)) {
            throw err;
        }

        const errorField = {};
        for (const item of err.daftarError) {
            if (!errorField[item.field]) {
                errorField[item.field] = item.pesan;
            }
        }

        return renderForm(req, res, 400, errorField);
    }
};

// ---------- Autentikasi ----------

function bangunIdentitas(akun) {
    if (akun.tipeAkun === 'admin_sistem') {
        return { idAkun: akun.idAkun, role: 'admin_sistem', email: akun.email, nama: 'Admin Sistem' };
    }

    if (akun.tipeAkun === 'pemilik_fnb') {
        const profil = PemilikFnB.cariBerdasarkanAkun(akun.idAkun);
        return {
            idAkun: akun.idAkun,
            role: 'pemilik_fnb',
            email: akun.email,
            idPemilik: profil ? profil.idPemilik : null,
            nama: profil ? profil.namaUsaha : akun.email
        };
    }

    const profil = PerwakilanNGO.cariBerdasarkanAkun(akun.idAkun);
    return {
        idAkun: akun.idAkun,
        idNgo: akun.idAkun,
        role: 'perwakilan_ngo',
        email: akun.email,
        nama: profil ? profil.namaOrganisasi : akun.email,
        lokasi: profil ? profil.lokasi : null
    };
}

function tujuanSetelahMasuk(pengguna) {
    if (pengguna.role === 'admin_sistem') {
        return '/admin/verifikasi';
    }

    // Sudah diverifikasi: pemilik langsung ke halaman kerjanya.
    const pendaftaran = Pendaftaran.cariBerdasarkanAkun(pengguna.idAkun);
    if (
        pendaftaran &&
        pendaftaran.statusVerifikasi === 'diterima' &&
        pengguna.role === 'pemilik_fnb'
    ) {
        return '/fnb/penjualan';
    }

    return '/status';
}
exports.tampilkanHalamanMasuk = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('auth/I00-Masuk', { error: null, old: {} });
};

exports.masuk = (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    const kataSandi = String(req.body.kataSandi || '');

    const tampilkanGagal = (pesan) =>
        res.status(400).render('auth/I00-Masuk', { error: pesan, old: { email } });

    if (!email || !kataSandi) {
        return tampilkanGagal('Email dan kata sandi wajib diisi.');
    }

    const akun = AkunPengguna.cariKredensial(email);

    // Pesan disengaja sama untuk email tidak dikenal maupun kata sandi salah.
    if (!akun || !bcrypt.compareSync(kataSandi, akun.kataSandi)) {
        return tampilkanGagal('Email atau kata sandi salah.');
    }

    const pengguna = bangunIdentitas(akun);
    req.session.pengguna = pengguna;

    return res.redirect(tujuanSetelahMasuk(pengguna));
};

exports.keluar = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('foodlink.sid');
        res.redirect('/');
    });
};

// ---------- Status pendaftaran (UC03) ----------

exports.cekStatusPendaftaran = (idAkun) => {
    const pendaftaran = Pendaftaran.cariBerdasarkanAkun(idAkun);

    if (!pendaftaran) {
        return { ditemukan: false, pesan: 'Pendaftaran belum tersedia.' };
    }

    return {
        ditemukan: true,
        status: pendaftaran.statusVerifikasi,
        tanggalDaftar: pendaftaran.tanggalDaftar
    };
};

exports.tampilkanStatusPendaftaran = (req, res) => {
    const hasil = exports.cekStatusPendaftaran(req.user.idAkun);

    if (!hasil.ditemukan) {
        return res.status(404).render('auth/I04-StatusPendaftaran', {
            status: 'tidak ditemukan',
            judul: 'Status Tidak Ditemukan'
        });
    }

    const judul = {
        'menunggu verifikasi': 'Menunggu Verifikasi',
        diterima: 'Pendaftaran Diterima',
        ditolak: 'Pendaftaran Ditolak'
    }[hasil.status] || 'Status Pendaftaran';

    return res.render('auth/I04-StatusPendaftaran', {
        status: hasil.status,
        judul
    });
};

exports.tampilkanHalamanBerhasil = (req, res) => {
    res.render('auth/I04-StatusPendaftaran', {
        status: 'menunggu verifikasi',
        judul: 'Pendaftaran Dikirim'
    });
};