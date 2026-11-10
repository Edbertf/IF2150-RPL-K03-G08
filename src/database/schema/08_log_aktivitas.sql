-- C11 LogAktivitas
-- Menyimpan aktivitas pengguna yang ditampilkan pada halaman M5 (I-23).
--
-- Catatan: DPPL C11 hanya mencantumkan idLog, aktivitas, dan waktu.
-- Kolom id_akun ditambahkan karena I-23 meminta kolom "nama pengguna";
-- tanpa relasi ke akun, nama pelaku tidak bisa ditampilkan.
CREATE TABLE IF NOT EXISTS log_aktivitas (
    id_log INTEGER PRIMARY KEY AUTOINCREMENT,
    id_akun INTEGER NOT NULL REFERENCES akun_pengguna(id_akun),
    aktivitas TEXT NOT NULL,
    waktu TEXT NOT NULL
);

-- Mempercepat pengurutan log terbaru. Index ini adalah optimasi implementasi,
-- bukan bagian dari skema yang dirancang di DPPL.
CREATE INDEX IF NOT EXISTS idx_log_waktu ON log_aktivitas (waktu DESC);
