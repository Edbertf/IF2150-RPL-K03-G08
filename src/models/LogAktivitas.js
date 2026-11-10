const db = require('../config/db');

// Query dasar C11. Join ke tabel profil diperlukan hanya untuk menampilkan
// "nama pengguna" pada I-23; pengambilan data tetap terpusat di model ini.
const PILIH_LOG = `
    SELECT log.id_log    AS idLog,
           log.aktivitas AS aktivitas,
           log.waktu     AS waktu,
           CASE
               WHEN akun.tipe_akun = 'admin_sistem' THEN 'Admin Sistem'
               WHEN akun.tipe_akun = 'pemilik_fnb' THEN pemilik.nama_usaha
               ELSE ngo.nama_organisasi
           END           AS pengguna
    FROM log_aktivitas AS log
    JOIN akun_pengguna AS akun ON akun.id_akun = log.id_akun
    LEFT JOIN pemilik_fnb AS pemilik ON pemilik.id_akun = akun.id_akun
    LEFT JOIN perwakilan_ngo AS ngo ON ngo.id_akun = akun.id_akun
`;

/**
 * C11 getDaftarLog(): seluruh log, terbaru di atas.
 * Tidak memakai LIMIT karena DPPL tidak membatasi jumlah baris.
 */
exports.getDaftarLog = () =>
    db.prepare(`
        ${PILIH_LOG}
        ORDER BY log.waktu DESC, log.id_log DESC
    `).all();

/**
 * C11 cariLog(kriteria): menyaring log berdasarkan kata kunci pada uraian
 * aktivitas. Perilaku ini mengikuti Q-C11-02 (ILIKE '%kriteria%').
 */
exports.cariLog = (kriteria) =>
    db.prepare(`
        ${PILIH_LOG}
        WHERE log.aktivitas LIKE ?
        ORDER BY log.waktu DESC, log.id_log DESC
    `).all(`%${kriteria}%`);
