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

console.log('Seed selesai. id_pemilik =', pemilik.lastInsertRowid);
db.close();