const db = require('../config/db');

const initDatabase = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS akun_pengguna (
            id_akun INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            kata_sandi TEXT NOT NULL,
            tipe_akun TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS pemilik_fnb (
            id_pemilik INTEGER PRIMARY KEY AUTOINCREMENT,
            id_akun INTEGER REFERENCES akun_pengguna(id_akun),
            nama_usaha TEXT NOT NULL,
            alamat_usaha TEXT
        );

        CREATE TABLE IF NOT EXISTS produk (
            id_produk INTEGER PRIMARY KEY AUTOINCREMENT,
            id_pemilik INTEGER NOT NULL REFERENCES pemilik_fnb(id_pemilik),
            nama_produk TEXT NOT NULL,
            kategori TEXT
        );

        CREATE TABLE IF NOT EXISTS data_penjualan (
            id_penjualan INTEGER PRIMARY KEY AUTOINCREMENT,
            id_produk INTEGER NOT NULL REFERENCES produk(id_produk),
            tanggal TEXT NOT NULL,
            jumlah_terjual INTEGER NOT NULL CHECK (jumlah_terjual >= 0),
            jumlah_tersisa INTEGER NOT NULL CHECK (jumlah_tersisa >= 0),
            UNIQUE (id_produk, tanggal)
        );
    `);
    
    console.log('Tabel database berhasil diinisialisasi.');
};

module.exports = initDatabase;