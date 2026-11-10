const db = require('../config/db');

const initDatabase = () => {
    try {
        db.exec(`
            CREATE TABLE IF NOT EXISTS akun_pengguna (
                id_akun INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                kata_sandi TEXT NOT NULL,
                tipe_akun TEXT NOT NULL
            );
        `);

        db.exec(`
            CREATE TABLE IF NOT EXISTS produk (
                id_produk INTEGER PRIMARY KEY AUTOINCREMENT,
                nama_produk TEXT NOT NULL,
                kategori TEXT NOT NULL
            );
        `);

        // UC06
        db.exec(`
            CREATE TABLE IF NOT EXISTS produk_surplus (
                id_surplus INTEGER PRIMARY KEY AUTOINCREMENT,
                id_produk INTEGER NOT NULL,
                id_pemilik INTEGER NOT NULL,
                jumlah INTEGER NOT NULL,
                batas_waktu TEXT NOT NULL,
                lokasi_pengambilan TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'tersedia',
                FOREIGN KEY (id_produk) REFERENCES produk(id_produk)
            );
        `);

        // UC07
        db.exec(`
            CREATE TABLE IF NOT EXISTS metode_distribusi_surplus (
                id_distribusi INTEGER PRIMARY KEY AUTOINCREMENT,
                id_surplus INTEGER NOT NULL,
                jenis_distribusi TEXT NOT NULL,
                harga INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY (id_surplus) REFERENCES produk_surplus(id_surplus)
            );
        `);

        const cekProduk = db.prepare("SELECT COUNT(*) AS count FROM produk").get();
        if (cekProduk.count === 0) {
            db.exec(`
                INSERT INTO produk (nama_produk, kategori) VALUES 
                ('Roti Tawar Gandum', 'Makanan'),
                ('Nasi Goreng Spesial', 'Makanan'),
                ('Es Kopi Susu', 'Minuman');
            `);
        }

        console.log("Tabel database berhasil diinisialisasi secara keseluruhan!");
    } catch (error) {
        console.error("Gagal melakukan inisialisasi database:", error);
    }
};

module.exports = initDatabase;