-- C02 Pendaftaran
-- Pengajuan akun yang menunggu verifikasi admin. Satu akun satu pendaftaran.
CREATE TABLE IF NOT EXISTS pendaftaran (
    id_pendaftaran INTEGER PRIMARY KEY AUTOINCREMENT,
    id_akun INTEGER NOT NULL UNIQUE REFERENCES akun_pengguna(id_akun),
    tanggal_daftar TEXT NOT NULL,
    status_verifikasi TEXT NOT NULL DEFAULT 'menunggu verifikasi'
        CHECK (status_verifikasi IN ('menunggu verifikasi', 'diterima', 'ditolak'))
);
