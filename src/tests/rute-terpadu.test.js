const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('node:child_process');

// Pengujian integrasi HTTP: server Express dijalankan sebagai proses terpisah
// dengan database sementara, lalu skenario use case dieksekusi lewat fetch.
const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-http-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

require('../database/init')();
const db = require('../config/db');

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const PerwakilanNGO = require('../models/PerwakilanNGO');
const Pendaftaran = require('../models/Pendaftaran');
const ProdukSurplus = require('../models/ProdukSurplus');
const DataPenjualan = require('../models/DataPenjualan');

const PORT = 3400 + Math.floor(Math.random() * 200);
const BASE = `http://127.0.0.1:${PORT}`;
let server;
let logServer = '';

function tanggalMundur(hari) {
    const dasar = new Date(`${DataPenjualan.tanggalHariIni()}T00:00:00+07:00`);
    dasar.setDate(dasar.getDate() - hari);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(dasar);
}

function duaHariLagi(jam = 20) {
    const dasar = new Date();
    dasar.setDate(dasar.getDate() + 2);
    const tanggal = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(dasar);
    return `${tanggal} ${String(jam).padStart(2, '0')}:00`;
}

function buatAkun(email, tipeAkun) {
    return AkunPengguna.registrasi({ email, kataSandi: 'rahasia123', tipeAkun });
}

const dataUji = {};

before(async () => {
    const akunAdmin = buatAkun('admin-http@foodlink.test', 'admin_sistem');

    const akunPemilik = buatAkun('pemilik-http@foodlink.test', 'pemilik_fnb');
    PemilikFnB.simpanProfil(akunPemilik, {
        namaUsaha: 'Bakery HTTP',
        alamatUsaha: '-6.9147,107.6098',
        jamOperasional: '08.00-20.00'
    });
    Pendaftaran.ajukanPendaftaran(akunPemilik);
    Pendaftaran.updateStatus(
        db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?').get(akunPemilik).id,
        'diterima'
    );
    const { idPemilik } = db
        .prepare('SELECT id_pemilik AS idPemilik FROM pemilik_fnb WHERE id_akun = ?')
        .get(akunPemilik);
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Roti HTTP', 'Makanan');
    const idProdukMinuman = ProdukSurplus.tambahProduk(idPemilik, 'Susu HTTP', 'Minuman');
    for (let i = 0; i < 7; i += 1) {
        db.prepare(`
            INSERT INTO data_penjualan (id_produk, tanggal, jumlah_terjual, jumlah_tersisa)
            VALUES (?, ?, ?, ?)
        `).run(idProduk, tanggalMundur(i), 10, 2);
    }

    const akunPemilikBaru = buatAkun('pemilik-baru-http@foodlink.test', 'pemilik_fnb');
    PemilikFnB.simpanProfil(akunPemilikBaru, {
        namaUsaha: 'Warung HTTP',
        alamatUsaha: '-6.92,107.61',
        jamOperasional: '09.00-21.00'
    });
    Pendaftaran.ajukanPendaftaran(akunPemilikBaru);
    Pendaftaran.updateStatus(
        db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?').get(akunPemilikBaru).id,
        'diterima'
    );

    const akunNgo = buatAkun('ngo-http@foodlink.test', 'perwakilan_ngo');
    PerwakilanNGO.simpanProfil(akunNgo, {
        namaOrganisasi: 'Yayasan HTTP',
        nomorLegalitas: 'AHU-HTTP-01',
        lokasi: '-6.9175,107.6191'
    });
    Pendaftaran.ajukanPendaftaran(akunNgo);
    Pendaftaran.updateStatus(
        db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?').get(akunNgo).id,
        'diterima'
    );

    const akunNgo2 = buatAkun('ngo2-http@foodlink.test', 'perwakilan_ngo');
    PerwakilanNGO.simpanProfil(akunNgo2, {
        namaOrganisasi: 'Yayasan HTTP Dua',
        nomorLegalitas: 'AHU-HTTP-02',
        lokasi: '-6.93,107.63'
    });
    Pendaftaran.ajukanPendaftaran(akunNgo2);
    Pendaftaran.updateStatus(
        db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?').get(akunNgo2).id,
        'diterima'
    );

    const akunNgoTanpaLokasi = buatAkun('ngo3-http@foodlink.test', 'perwakilan_ngo');
    PerwakilanNGO.simpanProfil(akunNgoTanpaLokasi, {
        namaOrganisasi: 'Yayasan Tanpa Lokasi',
        nomorLegalitas: 'AHU-HTTP-03',
        lokasi: ''
    });
    Pendaftaran.ajukanPendaftaran(akunNgoTanpaLokasi);
    Pendaftaran.updateStatus(
        db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?').get(akunNgoTanpaLokasi).id,
        'diterima'
    );

    Object.assign(dataUji, {
        akunAdmin,
        akunPemilik,
        idPemilik,
        idProduk,
        idProdukMinuman,
        akunPemilikBaru
    });

    server = spawn(process.execPath, ['app.js'], {
        cwd: path.resolve(__dirname, '..'),
        env: {
            ...process.env,
            PORT: String(PORT),
            DB_PATH: process.env.DB_PATH,
            STORAGE_DIR: process.env.STORAGE_DIR
        },
        stdio: ['ignore', 'pipe', 'pipe']
    });
    server.stdout.on('data', (bagian) => { logServer += bagian.toString(); });
    server.stderr.on('data', (bagian) => { logServer += bagian.toString(); });

    const batas = Date.now() + 15000;
    for (;;) {
        try {
            const respons = await fetch(`${BASE}/`);
            if (respons.ok) break;
        } catch (galat) {
            if (Date.now() > batas) throw galat;
        }
        if (Date.now() > batas) throw new Error('Server uji tidak siap dalam 15 detik.');
        await new Promise((lanjut) => setTimeout(lanjut, 150));
    }
});

after(async () => {
    if (server) {
        server.kill();
        await new Promise((lanjut) => {
            server.once('exit', lanjut);
            setTimeout(lanjut, 2000);
        });
    }
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

function sesiBaru() {
    let cookie = '';
    return {
        async minta(jalur, opsi = {}) {
            const headers = { ...(opsi.headers || {}) };
            if (cookie) headers.cookie = cookie;
            const respons = await fetch(`${BASE}${jalur}`, { ...opsi, headers, redirect: 'manual' });
            const setCookie = typeof respons.headers.getSetCookie === 'function'
                ? respons.headers.getSetCookie()
                : [];
            for (const item of setCookie) {
                const pasangan = item.split(';')[0];
                if (pasangan.startsWith('foodlink.sid=')) cookie = pasangan;
            }
            return respons;
        },
        async masuk(email, kataSandi = 'rahasia123') {
            return this.minta('/masuk', {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ email, kataSandi })
            });
        },
        ambilTeks(respons) {
            return respons.text();
        }
    };
}

function formDaftar(fields, namaBerkas = 'dokumen.pdf', tipe = 'application/pdf') {
    const form = new FormData();
    for (const [kunci, nilai] of Object.entries(fields)) form.append(kunci, nilai);
    form.append('dokumen', new Blob([Buffer.from('%PDF-1.4 dokumen uji')], { type: tipe }), namaBerkas);
    return form;
}

const formFnb = (email) => ({
    tipeAkun: 'pemilik_fnb',
    email,
    kataSandi: 'rahasia123',
    namaUsaha: 'Usaha Daftar HTTP',
    alamatUsaha: 'Jl. Uji HTTP No. 5',
    jamOperasional: '08.00-20.00'
});

test('UC01-TC01: registrasi Pemilik F&B valid tersimpan menunggu verifikasi', async () => {
    const sesi = sesiBaru();
    const respons = await sesi.minta('/daftar', { method: 'POST', body: formDaftar(formFnb('daftar-http@foodlink.test')) });

    assert.equal(respons.status, 302);
    assert.equal(respons.headers.get('location'), '/daftar/berhasil');

    const akun = db.prepare('SELECT id_akun AS idAkun FROM akun_pengguna WHERE email = ?')
        .get('daftar-http@foodlink.test');
    const pendaftaran = db.prepare('SELECT status_verifikasi AS status FROM pendaftaran WHERE id_akun = ?')
        .get(akun.idAkun);
    assert.equal(pendaftaran.status, 'menunggu verifikasi');
});

test('UC01-TC02: isian wajib kosong ditolak dengan pesan per field', async () => {
    const sesi = sesiBaru();
    const form = formDaftar({ ...formFnb('kosong-http@foodlink.test'), namaUsaha: '' });
    const respons = await sesi.minta('/daftar', { method: 'POST', body: form });
    const teks = await respons.text();

    assert.equal(respons.status, 400);
    assert.match(teks, /Nama usaha wajib diisi/);
});

test('UC01-TC03: format dokumen di luar PDF/JPG/PNG ditolak', async () => {
    const sesi = sesiBaru();
    const form = formDaftar(formFnb('format-http@foodlink.test'), 'dokumen.docx', 'application/msword');
    const respons = await sesi.minta('/daftar', { method: 'POST', body: form });
    const teks = await respons.text();

    assert.equal(respons.status, 400);
    assert.match(teks, /Format dokumen harus PDF, JPG, atau PNG/);
});

test('UC01-TC04: email yang sudah terdaftar ditolak', async () => {
    const sesi = sesiBaru();
    const respons = await sesi.minta('/daftar', { method: 'POST', body: formDaftar(formFnb('pemilik-http@foodlink.test')) });
    const teks = await respons.text();

    assert.equal(respons.status, 400);
    assert.match(teks, /Email sudah terdaftar/);
});

test('UC02-TC01: admin melihat daftar, detail, dan menyetujui pendaftar', async () => {
    const sesi = sesiBaru();
    const masuk = await sesi.masuk('admin-http@foodlink.test', 'admin123x');
    assert.equal(masuk.status, 400, 'kata sandi admin pada seed uji berbeda');

    const masukBenar = await sesi.masuk('admin-http@foodlink.test', 'rahasia123');
    assert.equal(masukBenar.status, 302);
    assert.equal(masukBenar.headers.get('location'), '/admin/verifikasi');

    const daftar = await sesi.minta('/admin/verifikasi');
    const teksDaftar = await daftar.text();
    assert.equal(daftar.status, 200);
    assert.match(teksDaftar, /Usaha Daftar HTTP/);

    const akun = db.prepare('SELECT id_akun AS idAkun FROM akun_pengguna WHERE email = ?')
        .get('daftar-http@foodlink.test');
    const { id } = db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?')
        .get(akun.idAkun);

    const detail = await sesi.minta(`/admin/verifikasi/${id}`);
    assert.equal(detail.status, 200);
    assert.match(await detail.text(), /Usaha Daftar HTTP/);

    const dokumen = db.prepare('SELECT id_dokumen AS idDokumen FROM dokumen_pendukung WHERE id_pendaftaran = ?').get(id);
    const berkas = await sesi.minta(`/admin/verifikasi/${id}/dokumen/${dokumen.idDokumen}`);
    assert.equal(berkas.status, 200);

    const putus = await sesi.minta(`/admin/verifikasi/${id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ keputusan: 'terima' })
    });
    assert.equal(putus.status, 302);
    assert.equal(putus.headers.get('location'), `/admin/verifikasi/${id}/hasil`);

    const hasil = await sesi.minta(`/admin/verifikasi/${id}/hasil`);
    assert.equal(hasil.status, 200);
    assert.match(await hasil.text(), /diterima/);

    const status = db.prepare('SELECT status_verifikasi AS status FROM pendaftaran WHERE id_pendaftaran = ?').get(id);
    assert.equal(status.status, 'diterima');
});

test('UC02-TC02: admin menolak pendaftar dan status tersimpan', async () => {
    const sesiDaftar = sesiBaru();
    await sesiDaftar.minta('/daftar', { method: 'POST', body: formDaftar(formFnb('ditolak-http@foodlink.test')) });

    const akun = db.prepare('SELECT id_akun AS idAkun FROM akun_pengguna WHERE email = ?')
        .get('ditolak-http@foodlink.test');
    const { id } = db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?')
        .get(akun.idAkun);

    const admin = sesiBaru();
    await admin.masuk('admin-http@foodlink.test');
    const putus = await admin.minta(`/admin/verifikasi/${id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ keputusan: 'tolak' })
    });
    assert.equal(putus.status, 302);

    const hasil = await admin.minta(`/admin/verifikasi/${id}/hasil`);
    assert.match(await hasil.text(), /ditolak/);
});

test('UC02-TC03: keputusan tidak dikenal tidak mengubah status', async () => {
    const admin = sesiBaru();
    await admin.masuk('admin-http@foodlink.test');

    const sesiDaftar = sesiBaru();
    await sesiDaftar.minta('/daftar', { method: 'POST', body: formDaftar(formFnb('keputusan-http@foodlink.test')) });
    const akun = db.prepare('SELECT id_akun AS idAkun FROM akun_pengguna WHERE email = ?')
        .get('keputusan-http@foodlink.test');
    const { id } = db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?')
        .get(akun.idAkun);

    const respons = await admin.minta(`/admin/verifikasi/${id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ keputusan: 'entahlah' })
    });
    assert.equal(respons.status, 302);
    assert.match(respons.headers.get('location'), /pesan=/);

    const status = db.prepare('SELECT status_verifikasi AS status FROM pendaftaran WHERE id_pendaftaran = ?').get(id);
    assert.equal(status.status, 'menunggu verifikasi');
});

test('UC02-TC04: pemilik F&B tidak boleh membuka halaman admin', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');
    const respons = await sesi.minta('/admin/verifikasi');
    assert.equal(respons.status, 403);
});

test('UC03-TC01: pendaftar melihat status menunggu verifikasi lalu ditolak', async () => {
    await sesiBaru().minta('/daftar', { method: 'POST', body: formDaftar(formFnb('status-http@foodlink.test')) });

    const sesi = sesiBaru();
    const masuk = await sesi.masuk('status-http@foodlink.test');
    assert.equal(masuk.headers.get('location'), '/status');

    const status = await sesi.minta('/status');
    assert.equal(status.status, 200);
    assert.match(await status.text(), /Menunggu Verifikasi/);

    const admin = sesiBaru();
    await admin.masuk('admin-http@foodlink.test');
    const akun = db.prepare('SELECT id_akun AS idAkun FROM akun_pengguna WHERE email = ?')
        .get('status-http@foodlink.test');
    const { id } = db.prepare('SELECT id_pendaftaran AS id FROM pendaftaran WHERE id_akun = ?')
        .get(akun.idAkun);
    await admin.minta(`/admin/verifikasi/${id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ keputusan: 'tolak' })
    });

    const statusBaru = await sesi.minta('/status');
    assert.match(await statusBaru.text(), /Ditolak/);
});

test('UC04-TC01: pencatatan penjualan valid tersimpan', async () => {
    const sesi = sesiBaru();
    const masuk = await sesi.masuk('pemilik-http@foodlink.test');
    assert.equal(masuk.headers.get('location'), '/fnb/penjualan');

    const form = await sesi.minta('/fnb/penjualan');
    assert.equal(form.status, 200);
    assert.match(await form.text(), /Roti HTTP/);

    const simpan = await sesi.minta('/fnb/penjualan', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            [`terjual_${dataUji.idProduk}`]: '12',
            [`tersisa_${dataUji.idProduk}`]: '3'
        })
    });
    assert.equal(simpan.status, 302);
    assert.equal(simpan.headers.get('location'), '/fnb/penjualan/tersimpan');

    const baris = db.prepare('SELECT jumlah_terjual AS terjual FROM data_penjualan WHERE id_produk = ? AND tanggal = ?')
        .get(dataUji.idProduk, DataPenjualan.tanggalHariIni());
    assert.equal(baris.terjual, 12);
});

test('UC04-TC02: nilai negatif ditolak tanpa menyimpan', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');

    const respons = await sesi.minta('/fnb/penjualan', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            [`terjual_${dataUji.idProduk}`]: '-5',
            [`tersisa_${dataUji.idProduk}`]: '2'
        })
    });
    const teks = await respons.text();

    assert.equal(respons.status, 400);
    assert.match(teks, /bilangan bulat/);
});

test('UC04-TC03: batas nilai 0 diterima', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');
    const respons = await sesi.minta('/fnb/penjualan', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            [`terjual_${dataUji.idProduk}`]: '0',
            [`tersisa_${dataUji.idProduk}`]: '0'
        })
    });
    assert.equal(respons.status, 302);
});

test('UC05-TC01: dashboard menampilkan rekomendasi saat tujuh hari tersedia', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');
    const respons = await sesi.minta('/fnb/dashboard');
    const teks = await respons.text();

    assert.equal(respons.status, 200);
    assert.match(teks, /Prediksi aktif/);
    assert.match(teks, /Roti HTTP/);
});

test('UC05-TC02: dashboard terkunci saat data historis kurang', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-baru-http@foodlink.test');
    const respons = await sesi.minta('/fnb/dashboard');
    const teks = await respons.text();

    assert.equal(respons.status, 200);
    assert.match(teks, /Belum aktif/);
    assert.match(teks, /minimal 7 hari/);
});

test('guard: halaman kerja menolak pengguna yang belum masuk', async () => {
    const sesi = sesiBaru();
    const respons = await sesi.minta('/fnb/penjualan');
    assert.equal(respons.status, 302);
    assert.equal(respons.headers.get('location'), '/masuk');
});

test('UC06-TC01: pencatatan surplus valid mengarah ke pengaturan distribusi', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');

    const form = await sesi.minta('/surplus/catat');
    assert.equal(form.status, 200);

    const simpan = await sesi.minta('/surplus/catat', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            idProduk: String(dataUji.idProduk),
            jumlah: '5',
            batasWaktu: duaHariLagi()
        })
    });
    assert.equal(simpan.status, 302);
    const cocok = /^\/surplus\/(\d+)\/donasi$/.exec(simpan.headers.get('location'));
    assert.ok(cocok, 'redirect harus menuju halaman distribusi');
    dataUji.idSurplus = Number(cocok[1]);

    const detail = db.prepare('SELECT status, jumlah FROM produk_surplus WHERE id_surplus = ?')
        .get(dataUji.idSurplus);
    assert.equal(detail.status, 'tersedia');
    assert.equal(detail.jumlah, 5);
});

test('UC06-TC02: jumlah nol dan batas waktu lampau ditolak', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');

    const nol = await sesi.minta('/surplus/catat', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            idProduk: String(dataUji.idProduk),
            jumlah: '0',
            batasWaktu: duaHariLagi()
        })
    });
    assert.equal(nol.status, 400);
    assert.match(await nol.text(), /lebih dari 0/);

    const lampau = await sesi.minta('/surplus/catat', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            idProduk: String(dataUji.idProduk),
            jumlah: '3',
            batasWaktu: '2020-01-01 10:00'
        })
    });
    assert.equal(lampau.status, 400);
    assert.match(await lampau.text(), /masa lalu/);
});

test('UC06-TC03: isian tidak lengkap ditolak', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');
    const respons = await sesi.minta('/surplus/catat', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ jumlah: '3' })
    });
    assert.equal(respons.status, 400);
    assert.match(await respons.text(), /wajib diisi/);
});

test('UC07-TC01: penjualan diskon menyimpan harga', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');

    const form = await sesi.minta(`/surplus/${dataUji.idSurplus}/donasi`);
    assert.equal(form.status, 200);

    const simpan = await sesi.minta(`/surplus/${dataUji.idSurplus}/distribusi`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ metode: 'diskon', hargaJual: '15000' })
    });
    assert.equal(simpan.status, 302);
    assert.equal(simpan.headers.get('location'), '/surplus/sukses');

    const sukses = await sesi.minta('/surplus/sukses');
    assert.equal(sukses.status, 200);

    const metode = db.prepare('SELECT jenis_distribusi AS jenis, harga FROM metode_distribusi_surplus WHERE id_produk = ?')
        .get(dataUji.idProduk);
    assert.equal(metode.jenis, 'Jual Diskon');
    assert.equal(metode.harga, 15000);
});

test('UC07-TC02: donasi tersimpan tanpa harga', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');

    const catat = await sesi.minta('/surplus/catat', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            idProduk: String(dataUji.idProdukMinuman),
            jumlah: '2',
            batasWaktu: duaHariLagi()
        })
    });
    const idSurplus = Number(/^\/surplus\/(\d+)\/donasi$/.exec(catat.headers.get('location'))[1]);

    const simpan = await sesi.minta(`/surplus/${idSurplus}/distribusi`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ metode: 'donasi' })
    });
    assert.equal(simpan.status, 302);

    const metode = db.prepare('SELECT jenis_distribusi AS jenis, harga FROM metode_distribusi_surplus WHERE id_produk = ?')
        .get(dataUji.idProdukMinuman);
    assert.equal(metode.jenis, 'Donasi');
    assert.equal(metode.harga, 0);
});

test('UC07-TC03: harga diskon nol ditolak dan sukses tanpa data dialihkan', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');

    const tolak = await sesi.minta(`/surplus/${dataUji.idSurplus}/distribusi`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ metode: 'diskon', hargaJual: '0' })
    });
    assert.equal(tolak.status, 400);
    assert.match(await tolak.text(), /lebih dari 0/);

    const tanpaData = sesiBaru();
    await tanpaData.masuk('pemilik-http@foodlink.test');
    const sukses = await tanpaData.minta('/surplus/sukses');
    assert.equal(sukses.status, 302);
    assert.equal(sukses.headers.get('location'), '/surplus/catat');
});

test('UC08-TC01: NGO melihat daftar dan detail surplus terurut jarak', async () => {
    const sesi = sesiBaru();
    const masuk = await sesi.masuk('ngo-http@foodlink.test');
    assert.equal(masuk.headers.get('location'), '/ngo/surplus');

    const daftar = await sesi.minta('/ngo/surplus');
    const teks = await daftar.text();
    assert.equal(daftar.status, 200);
    assert.match(teks, /Roti HTTP/);
    assert.match(teks, /Susu HTTP/);

    const detail = await sesi.minta(`/ngo/surplus/${dataUji.idSurplus}`);
    assert.equal(detail.status, 200);
    assert.match(await detail.text(), /Roti HTTP/);
});

test('UC08-TC02: NGO tanpa lokasi diminta mengisi lokasi', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('ngo3-http@foodlink.test');
    const respons = await sesi.minta('/ngo/surplus');
    const teks = await respons.text();

    assert.equal(respons.status, 200);
    assert.match(teks, /info-lokasi/);
});

test('UC09-TC01: pencarian dan filter jenis menyaring daftar', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('ngo-http@foodlink.test');

    const cari = await sesi.minta('/ngo/surplus?q=Roti');
    const teksCari = await cari.text();
    assert.match(teksCari, /Roti HTTP/);
    assert.doesNotMatch(teksCari, /Susu HTTP/);

    const jenis = await sesi.minta('/ngo/surplus?jenis=Minuman');
    const teksJenis = await jenis.text();
    assert.match(teksJenis, /Susu HTTP/);
    assert.doesNotMatch(teksJenis, /Roti HTTP/);
});

test('UC09-TC02: kriteria tanpa hasil menampilkan pesan kosong', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('ngo-http@foodlink.test');
    const respons = await sesi.minta('/ngo/surplus?q=tidakadayangcocok');
    const teks = await respons.text();

    assert.equal(respons.status, 200);
    assert.match(teks, /Tidak ada produk surplus yang sesuai filter/);
});

test('UC10-TC01: klaim produk tersedia disetujui dan status terklaim', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('ngo-http@foodlink.test');

    const klaim = await sesi.minta(`/ngo/surplus/${dataUji.idSurplus}/klaim`, { method: 'POST' });
    assert.equal(klaim.status, 302);
    const cocok = /^\/ngo\/klaim\/(\d+)\/berhasil$/.exec(klaim.headers.get('location'));
    assert.ok(cocok);
    dataUji.idKlaim = Number(cocok[1]);

    const berhasil = await sesi.minta(`/ngo/klaim/${dataUji.idKlaim}/berhasil`);
    assert.equal(berhasil.status, 200);
    assert.match(await berhasil.text(), /Klaim berhasil/);

    const status = db.prepare('SELECT status FROM produk_surplus WHERE id_surplus = ?').get(dataUji.idSurplus);
    assert.equal(status.status, 'terklaim');
});

test('UC10-TC02: NGO kedua ditolak karena produk sudah terklaim', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('ngo2-http@foodlink.test');
    const respons = await sesi.minta(`/ngo/surplus/${dataUji.idSurplus}/klaim`, { method: 'POST' });
    const teks = await respons.text();

    assert.equal(respons.status, 409);
    assert.match(teks, /Klaim tidak dapat diproses/);
});

test('UC11-TC01: konfirmasi pengambilan mengubah status menjadi selesai', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('ngo-http@foodlink.test');

    const konfirmasi = await sesi.minta(`/ngo/klaim/${dataUji.idKlaim}/konfirmasi-pengambilan`, { method: 'POST' });
    assert.equal(konfirmasi.status, 302);
    assert.equal(konfirmasi.headers.get('location'), `/ngo/klaim/${dataUji.idKlaim}/pengambilan-selesai`);

    const selesai = await sesi.minta(`/ngo/klaim/${dataUji.idKlaim}/pengambilan-selesai`);
    assert.equal(selesai.status, 200);
    assert.match(await selesai.text(), /Pengambilan Selesai/);

    const status = db.prepare('SELECT status FROM produk_surplus WHERE id_surplus = ?').get(dataUji.idSurplus);
    assert.equal(status.status, 'selesai');
});

test('UC11-TC02: konfirmasi ganda ditolak dan NGO lain tidak boleh mengakses', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('ngo-http@foodlink.test');
    const ganda = await sesi.minta(`/ngo/klaim/${dataUji.idKlaim}/konfirmasi-pengambilan`, { method: 'POST' });
    assert.equal(ganda.status, 409);

    const lain = sesiBaru();
    await lain.masuk('ngo2-http@foodlink.test');
    const akses = await lain.minta(`/ngo/klaim/${dataUji.idKlaim}/konfirmasi-pengambilan`, { method: 'POST' });
    assert.equal(akses.status, 403);
});

test('UC12-TC01: admin melihat log dan menyaringnya', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('admin-http@foodlink.test');

    const log = await sesi.minta('/admin/log');
    const teks = await log.text();
    assert.equal(log.status, 200);
    assert.match(teks, /Roti HTTP/);

    const klaim = await sesi.minta('/admin/log?kategori=Klaim');
    assert.equal(klaim.status, 200);
    assert.match(await klaim.text(), /Mengklaim/);

    const verifikasi = await sesi.minta('/admin/log?kategori=Verifikasi');
    assert.equal(verifikasi.status, 200);
    assert.match(await verifikasi.text(), /Verifikasi pendaftaran/);
});

test('UC12-TC02: kriteria filter tidak valid menghasilkan status 400', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('admin-http@foodlink.test');
    const respons = await sesi.minta('/admin/log?kategori=Ngawur');
    assert.equal(respons.status, 400);
    assert.match(await respons.text(), /Kriteria penyaringan tidak valid/);
});

test('UC12-TC03: non-admin tidak boleh membuka log', async () => {
    const sesi = sesiBaru();
    await sesi.masuk('pemilik-http@foodlink.test');
    const respons = await sesi.minta('/admin/log');
    assert.equal(respons.status, 403);
});
