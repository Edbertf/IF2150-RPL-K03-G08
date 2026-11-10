const bcrypt = require('bcryptjs');
const db = require('../config/db');
require('./init')();

const jumlahPemilik = db.prepare('SELECT COUNT(*) AS c FROM pemilik_fnb').get().c;

if (jumlahPemilik > 0) {
    console.log('Seed dilewati: data sudah ada.');
    db.close();
    process.exit(0);
}

const akun = db.prepare(
    'INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun) VALUES (?, ?, ?)'
).run('demo@foodlink.test', bcrypt.hashSync('password123', 10), 'pemilik_fnb');

const pemilik = db.prepare(
    'INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha) VALUES (?, ?, ?)'
).run(akun.lastInsertRowid, 'Bakery Sinar Pagi', 'Jl. Contoh No. 1, Bandung');

// Akun admin dan NGO dipakai halaman log aktivitas (UC12) serta verifikasi (UC02)
// dan klaim surplus (UC10). Sandi admin disamakan dengan seedAdmin.js milik UC02.
const insertAkun = db.prepare(
    'INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun) VALUES (?, ?, ?)'
);

const akunAdmin = insertAkun.run('admin@foodlink.test', bcrypt.hashSync('admin123', 10), 'admin_sistem');
const akunNgo = insertAkun.run('ngo@foodlink.test', bcrypt.hashSync('password123', 10), 'perwakilan_ngo');

db.prepare(`
    INSERT INTO perwakilan_ngo (id_akun, nama_organisasi, nomor_legalitas, lokasi)
    VALUES (?, ?, ?, ?)
`).run(
    akunNgo.lastInsertRowid,
    'Yayasan Nurani Berbagi',
    'AHU-0001234.AH.01.01.TAHUN 2026',
    'Jl. Dago No. 10, Bandung'
);

const produk = [
    { nama: 'Roti Tawar', terjual: 42, tersisa: 8 },
    { nama: 'Roti Manis', terjual: 55, tersisa: 3 },
    { nama: 'Donat Gula', terjual: 31, tersisa: 1 },
    { nama: 'Croissant', terjual: 20, tersisa: 0 }
];

const insertProduk = db.prepare(
    'INSERT INTO produk (id_pemilik, nama_produk, kategori) VALUES (?, ?, ?)'
);

const idProduk = produk.map((item) =>
    insertProduk.run(pemilik.lastInsertRowid, item.nama, 'Makanan').lastInsertRowid
);

const insertPenjualan = db.prepare(`
    INSERT INTO data_penjualan (id_produk, tanggal, jumlah_terjual, jumlah_tersisa)
    VALUES (?, ?, ?, ?)
`);

function tanggalMundur(hari) {
    const dasar = new Date();
    dasar.setDate(dasar.getDate() - hari);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(dasar);
}

const simpan = db.transaction(() => {
    for (let i = 0; i < 6; i += 1) {
        const tanggal = tanggalMundur(i);

        produk.forEach((item, index) => {
            const terjual = i === 0 ? item.terjual : Math.max(0, item.terjual - i * 3);
            const tersisa = i === 0 ? item.tersisa : item.tersisa + i;
            insertPenjualan.run(idProduk[index], tanggal, terjual, tersisa);
        });
    }
});

simpan();

// --- Log aktivitas (UC12) -----------------------------------------------------
function waktuLog(menitMundur) {
    const bagian = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    })
        .formatToParts(new Date(Date.now() - menitMundur * 60000))
        .reduce((hasil, item) => ({ ...hasil, [item.type]: item.value }), {});

    return `${bagian.year}-${bagian.month}-${bagian.day} ${bagian.hour}:${bagian.minute}:${bagian.second}`;
}

const insertLog = db.prepare(`
    INSERT INTO log_aktivitas (id_akun, aktivitas, waktu)
    VALUES (?, ?, ?)
`);

// Filter UC12 memakai kata kunci pada uraian aktivitas (Q-C11-02), sehingga
// teks log Verifikasi/Surplus/Klaim harus memuat kata kuncinya.
const logAwal = [
    [akun.lastInsertRowid, 'Mencatat penjualan harian hari ini', 20],
    [akunNgo.lastInsertRowid, 'Mengklaim Roti Manis (3 porsi)', 55],
    [akunAdmin.lastInsertRowid, 'Verifikasi pendaftaran Bakery Sinar Pagi disetujui', 120],
    [akun.lastInsertRowid, 'Mencatat surplus Roti Tawar (8 porsi)', 180],
    [akunAdmin.lastInsertRowid, 'Verifikasi pendaftaran Warung Uji ditolak', 260],
    [akunNgo.lastInsertRowid, 'Mengklaim Donat Gula (1 porsi)', 320],
    [akun.lastInsertRowid, 'Mendaftarkan akun Bakery Sinar Pagi', 480]
];

for (const [idAkun, aktivitas, menit] of logAwal) {
    insertLog.run(idAkun, aktivitas, waktuLog(menit));
}

console.log('Seed selesai. id_pemilik =', pemilik.lastInsertRowid);
db.close();