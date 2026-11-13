const db = require('../config/db');

// Query dasar C11. Join ke tabel profil diperlukan hanya untuk menampilkan
// "nama pengguna" pada I-23; pengambilan data tetap terpusat di model ini.
const KOLOM_LOG = `
    SELECT log.id_log     AS idLog,
           log.aktivitas  AS aktivitas,
           log.waktu      AS waktu,
           CASE
               WHEN akun.tipe_akun = 'admin_sistem' THEN 'Admin Sistem'
               WHEN akun.tipe_akun = 'pemilik_fnb' THEN pemilik.nama_usaha
               ELSE ngo.nama_organisasi
           END            AS pengguna
`;

// Baris dibatasi lebih dulu lewat CTE, baru di-JOIN. Tanpa pemisahan ini
// pengurutan "waktu DESC, id_log DESC" pada hasil JOIN menyortir seluruh tabel
// (EXPLAIN: USE TEMP B-TREE FOR ORDER BY) sehingga LIMIT tidak banyak menolong.
const DARI_LOG = `
    FROM terbaru
    JOIN log_aktivitas AS log ON log.id_log = terbaru.id_log
    JOIN akun_pengguna AS akun ON akun.id_akun = log.id_akun
    LEFT JOIN pemilik_fnb AS pemilik ON pemilik.id_akun = akun.id_akun
    LEFT JOIN perwakilan_ngo AS ngo ON ngo.id_akun = akun.id_akun
`;

const URUTAN_LOG = 'ORDER BY log.waktu DESC, log.id_log DESC';
const URUTAN_CTE = 'ORDER BY waktu DESC';

const BATAS_LOG = 100;

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
 * C11 getDaftarLog(): 100 log terbaru.
 * Batas 100 baris menjaga halaman I-23 tetap ringan.
 */
exports.getDaftarLog = () =>
    db.prepare(`
        WITH terbaru AS MATERIALIZED (
            SELECT id_log FROM log_aktivitas
            ${URUTAN_CTE}
            LIMIT ${BATAS_LOG}
        )
        ${KOLOM_LOG}
        ${DARI_LOG}
        ${URUTAN_LOG}
    `).all();

/**
 * C11 adaLog(): memeriksa keberadaan log tanpa memuat barisnya.
 * Dipakai I-23 untuk membedakan "belum ada log" dari "filter tidak cocok".
 */
exports.adaLog = () =>
    db.prepare('SELECT 1 FROM log_aktivitas LIMIT 1').get() !== undefined;

/**
 * C11 cariLog(kriteria): menyaring 100 log terbaru berdasarkan kata kunci pada
 * uraian aktivitas. Perilaku ini mengikuti Q-C11-02 (ILIKE '%kriteria%').
 */
exports.cariLog = (kriteria) =>
    db.prepare(`
        WITH terbaru AS MATERIALIZED (
            SELECT id_log FROM log_aktivitas
            WHERE aktivitas LIKE ?
            ${URUTAN_CTE}
            LIMIT ${BATAS_LOG}
        )
        ${KOLOM_LOG}
        ${DARI_LOG}
        ${URUTAN_LOG}
    `).all(`%${kriteria}%`);
