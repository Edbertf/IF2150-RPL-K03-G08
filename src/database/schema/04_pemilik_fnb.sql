-- C30 PemilikFnB
-- Profil pemilik usaha F&B, terhubung satu-satu dengan akun_pengguna.
CREATE TABLE IF NOT EXISTS pemilik_fnb (
    id_pemilik INTEGER PRIMARY KEY AUTOINCREMENT,
    id_akun INTEGER NOT NULL UNIQUE REFERENCES akun_pengguna(id_akun),
    nama_usaha TEXT NOT NULL,
    alamat_usaha TEXT NOT NULL,
    jam_operasional TEXT
);
