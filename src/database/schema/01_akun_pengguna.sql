-- C01 AkunPengguna
-- Menyimpan data login untuk semua peran.
CREATE TABLE IF NOT EXISTS akun_pengguna (
    id_akun INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    kata_sandi TEXT NOT NULL,
    tipe_akun TEXT NOT NULL
        CHECK (tipe_akun IN ('pemilik_fnb', 'perwakilan_ngo', 'admin_sistem'))
);
