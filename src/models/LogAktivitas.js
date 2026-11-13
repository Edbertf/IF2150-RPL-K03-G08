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
 * C11 catatLog(idAkun, aktivitas): menulis satu baris log aktivitas.
 * Waktu disimpan dalam format SQLite "YYYY-MM-DD HH:mm:ss" zona Asia/Jakarta.
 */
function waktuSekarang() {
    const bagian = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    })
        .formatToParts(new Date())
        .reduce((hasil, item) => ({ ...hasil, [item.type]: item.value }), {});

    return `${bagian.year}-${bagian.month}-${bagian.day} ${bagian.hour}:${bagian.minute}:${bagian.second}`;
}

exports.catatLog = (idAkun, aktivitas) => {
    db.prepare(`
        INSERT INTO log_aktivitas (id_akun, aktivitas, waktu)
        VALUES (?, ?, ?)
    `).run(idAkun, aktivitas, waktuSekarang());
};

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
