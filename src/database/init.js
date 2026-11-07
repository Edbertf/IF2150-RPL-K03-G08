const db = require('../config/db');

const initDatabase = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS akun_pengguna (
            id_akun INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            kata_sandi TEXT NOT NULL,
            tipe_akun TEXT NOT NULL
        );
        
        -- Tambahkan tabel lain sesuai DPPL kamu di sini (Pendaftaran, ProdukSurplus, dll)
    `);
    
    console.log('Tabel database berhasil diinisialisasi.');
};

module.exports = initDatabase;