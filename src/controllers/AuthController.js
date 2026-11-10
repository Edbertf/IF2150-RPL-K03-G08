// C23 AuthController

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