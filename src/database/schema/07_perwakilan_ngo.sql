-- C31 PerwakilanNGO
-- Profil perwakilan NGO, terhubung satu-satu dengan akun_pengguna.
CREATE TABLE IF NOT EXISTS perwakilan_ngo (
    id_akun INTEGER PRIMARY KEY REFERENCES akun_pengguna(id_akun),
    nama_organisasi TEXT NOT NULL,
    nomor_legalitas TEXT,
    lokasi TEXT NOT NULL
);
