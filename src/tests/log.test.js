const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const express = require('express');
const ejs = require('ejs');

// Database uji terpisah agar data pengembangan tidak tersentuh.
const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-log-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');

const db = require('../config/db');
const LogAktivitas = require('../models/LogAktivitas');

require('../database/init')();

const insertAkun = db.prepare(
    'INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun) VALUES (?, ?, ?)'
);

const idAkunAdmin = Number(insertAkun.run('admin@uji.test', 'x', 'admin_sistem').lastInsertRowid);
const idAkunPemilik = Number(insertAkun.run('pemilik@uji.test', 'x', 'pemilik_fnb').lastInsertRowid);
const idAkunNgo = Number(insertAkun.run('ngo@uji.test', 'x', 'perwakilan_ngo').lastInsertRowid);

db.prepare('INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha) VALUES (?, ?, ?)')
    .run(idAkunPemilik, 'Bakery Uji', 'Jl. Uji No. 1, Bandung');

db.prepare('INSERT INTO perwakilan_ngo (id_akun, nama_organisasi, lokasi) VALUES (?, ?, ?)')
    .run(idAkunNgo, 'Yayasan Uji', 'Jl. Braga No. 12, Bandung');

// Data log sengaja memuat kata kunci filter pada uraian aktivitas,
// sesuai perilaku Q-C11-02.
const logAwal = [
    { idAkun: idAkunPemilik, aktivitas: 'Mendaftarkan akun Bakery Uji', waktu: '2026-11-10 07:00:00' },
    { idAkun: idAkunPemilik, aktivitas: 'Mencatat penjualan harian', waktu: '2026-11-10 08:00:00' },
    { idAkun: idAkunPemilik, aktivitas: 'Mencatat surplus Roti Tawar (8 porsi)', waktu: '2026-11-10 09:00:00' },
    { idAkun: idAkunNgo, aktivitas: 'Mengklaim Roti Manis (3 porsi)', waktu: '2026-11-10 10:00:00' },
    { idAkun: idAkunAdmin, aktivitas: 'Verifikasi pendaftaran Kedai Uji disetujui', waktu: '2026-11-10 11:00:00' },
    { idAkun: idAkunAdmin, aktivitas: 'Verifikasi pendaftaran Warung Uji ditolak', waktu: '2026-11-10 12:00:00' }
];

const insertLog = db.prepare(
    'INSERT INTO log_aktivitas (id_akun, aktivitas, waktu) VALUES (?, ?, ?)'
);

for (const baris of logAwal) {
    insertLog.run(baris.idAkun, baris.aktivitas, baris.waktu);
}

// --- Aplikasi HTTP kecil untuk menguji route + view tanpa menjalankan app.js ---
const serverAktif = [];

function buatApp(peran) {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'views'));

    app.use((req, res, next) => {
        req.user = peran === 'admin'
            ? { idAkun: idAkunAdmin, role: 'admin_sistem' }
            : { idAkun: idAkunPemilik, idPemilik: 1, role: 'pemilik_fnb' };
        next();
    });

    app.use('/admin/log', require('../routes/log'));
    return app;
}

function mulai(peran) {
    return new Promise((resolve) => {
        const server = buatApp(peran).listen(0, '127.0.0.1', () => {
            serverAktif.push(server);
            resolve(`http://127.0.0.1:${server.address().port}`);
        });
    });
}

after(() => {
    for (const server of serverAktif) {
        server.close();
    }
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('getDaftarLog mengurutkan log terbaru dan menyertakan nama pengguna', () => {
    const daftar = LogAktivitas.getDaftarLog();

    assert.equal(daftar.length, logAwal.length);
    assert.equal(daftar[0].aktivitas, 'Verifikasi pendaftaran Warung Uji ditolak');
    assert.equal(daftar[0].pengguna, 'Admin Sistem');

    const pengguna = new Map(daftar.map((baris) => [baris.aktivitas, baris.pengguna]));
    assert.equal(pengguna.get('Mendaftarkan akun Bakery Uji'), 'Bakery Uji');
    assert.equal(pengguna.get('Mengklaim Roti Manis (3 porsi)'), 'Yayasan Uji');
});

test('cariLog menyaring berdasarkan kata kunci aktivitas', () => {
    const klaim = LogAktivitas.cariLog('Klaim');
    assert.equal(klaim.length, 1);
    assert.equal(klaim[0].aktivitas, 'Mengklaim Roti Manis (3 porsi)');

    const surplus = LogAktivitas.cariLog('Surplus');
    assert.equal(surplus.length, 1);
    assert.equal(surplus[0].aktivitas, 'Mencatat surplus Roti Tawar (8 porsi)');

    const verifikasi = LogAktivitas.cariLog('Verifikasi');
    assert.equal(verifikasi.length, 2);
});

test('cariLog tidak membedakan huruf besar dan kecil', () => {
    assert.equal(LogAktivitas.cariLog('klaim').length, 1);
    assert.equal(LogAktivitas.cariLog('SURPLUS').length, 1);
});

test('cariLog mengembalikan array kosong bila kata kunci tidak ditemukan', () => {
    assert.deepEqual(LogAktivitas.cariLog('TidakAda'), []);
});

test('admin sistem melihat halaman M5 berisi seluruh log dan empat chip', async () => {
    const baseUrl = await mulai('admin');
    const respons = await fetch(`${baseUrl}/admin/log`);

    assert.equal(respons.status, 200);

    const html = await respons.text();
    assert.match(html, /<h1>Log Aktivitas<\/h1>/);
    assert.match(html, />Semua</);
    assert.match(html, />Klaim</);
    assert.match(html, />Surplus</);
    assert.match(html, />Verifikasi</);
    assert.match(html, /Bakery Uji/);
    assert.match(html, /Yayasan Uji/);
    assert.match(html, /Admin Sistem/);
    assert.match(html, /Mengklaim Roti Manis \(3 porsi\)/);
});

test('filter Klaim hanya menampilkan aktivitas yang memuat kata Klaim', async () => {
    const baseUrl = await mulai('admin');
    const respons = await fetch(`${baseUrl}/admin/log?kategori=Klaim`);

    assert.equal(respons.status, 200);

    const html = await respons.text();
    assert.match(html, /Mengklaim Roti Manis \(3 porsi\)/);
    assert.doesNotMatch(html, /Mencatat surplus Roti Tawar/);
    assert.doesNotMatch(html, /Verifikasi pendaftaran/);
});

test('filter Verifikasi hanya menampilkan aktivitas yang memuat kata Verifikasi', async () => {
    const baseUrl = await mulai('admin');
    const respons = await fetch(`${baseUrl}/admin/log?kategori=Verifikasi`);

    assert.equal(respons.status, 200);

    const html = await respons.text();
    assert.match(html, /Verifikasi pendaftaran Kedai Uji disetujui/);
    assert.match(html, /Verifikasi pendaftaran Warung Uji ditolak/);
    assert.doesNotMatch(html, /Mengklaim Roti Manis/);
});

test('kriteria di luar empat pilihan ditolak dengan status 400', async () => {
    const baseUrl = await mulai('admin');
    const respons = await fetch(`${baseUrl}/admin/log?kategori=Akun`);

    assert.equal(respons.status, 400);
    assert.match(await respons.text(), /Kriteria penyaringan tidak valid\./);
});

test('pengguna selain admin sistem ditolak 403', async () => {
    const baseUrl = await mulai('pemilik');
    const respons = await fetch(`${baseUrl}/admin/log`);

    assert.equal(respons.status, 403);
    assert.match(await respons.text(), /Halaman ini tidak tersedia untuk peran Anda\./);
});

test('halaman kosong menampilkan pesan belum ada log', async () => {
    const html = await ejs.renderFile(
        path.join(__dirname, '..', 'views', 'admin', 'I23-LogAktivitas.ejs'),
        {
            daftar: [],
            pilihanFilter: ['Semua', 'Klaim', 'Surplus', 'Verifikasi'],
            filterAktif: 'Semua',
            adaLogKeseluruhan: false,
            pesanError: null
        }
    );

    assert.match(html, /Belum ada log aktivitas\./);
});

test('filter tanpa hasil menampilkan pesan filter tidak cocok', async () => {
    const html = await ejs.renderFile(
        path.join(__dirname, '..', 'views', 'admin', 'I23-LogAktivitas.ejs'),
        {
            daftar: [],
            pilihanFilter: ['Semua', 'Klaim', 'Surplus', 'Verifikasi'],
            filterAktif: 'Klaim',
            adaLogKeseluruhan: true,
            pesanError: null
        }
    );

    assert.match(html, /Tidak ada log aktivitas yang sesuai dengan filter\./);
});

test('daftar log dibatasi 100 baris terbaru', () => {
    for (let i = 0; i < 120; i += 1) {
        const jam = String(10 + Math.floor(i / 60)).padStart(2, '0');
        const menit = String(i % 60).padStart(2, '0');
        insertLog.run(
            idAkunPemilik,
            `Aktivitas tambahan ${i}`,
            `2026-11-11 ${jam}:${menit}:00`
        );
    }

    const daftar = LogAktivitas.getDaftarLog();

    assert.equal(daftar.length, 100);
    assert.equal(daftar[0].aktivitas, 'Aktivitas tambahan 119');
});

test('adaLog benar saat ada log dan salah saat tabel kosong', () => {
    assert.equal(LogAktivitas.adaLog(), true);

    // Transaksi dibatalkan agar data log milik tes lain tidak berubah.
    const kosongkanSementara = db.transaction(() => {
        db.prepare('DELETE FROM log_aktivitas').run();
        assert.equal(LogAktivitas.adaLog(), false);
        throw new Error('batalkan');
    });

    assert.throws(() => kosongkanSementara(), /batalkan/);
    assert.equal(LogAktivitas.adaLog(), true);
});
