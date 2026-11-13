/**
 * Skrip profiling untuk fitur UC12 (I-23 Log Aktivitas).
 *
 * Mengisi database sementara dengan ribuan log, lalu membandingkan:
 *   1. query lama tanpa LIMIT (seluruh log dimuat);
 *   2. query lama dengan LIMIT 100 (tetap menyortir seluruh tabel);
 *   3. getDaftarLog() yang membatasi baris lewat CTE sebelum JOIN;
 *   4. pemeriksaan keberadaan log: memuat 100 baris vs SELECT 1.
 *
 * Jalankan: node tools/profil-log.js
 * Variabel opsional: JUMLAH_LOG (default 20000).
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-profil-log-'));
process.env.DB_PATH = path.join(folderUji, 'profil.db');

require('../database/init')();
const db = require('../config/db');
const LogAktivitas = require('../models/LogAktivitas');

const JUMLAH_LOG = Number(process.env.JUMLAH_LOG || 20000);
const ULANGAN = 30;

db.pragma('journal_mode = MEMORY');

const insertAkun = db.prepare(
    'INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun) VALUES (?, ?, ?)'
);
const idAdmin = Number(insertAkun.run('admin@profil.test', 'x', 'admin_sistem').lastInsertRowid);
const idPemilik = Number(insertAkun.run('pemilik@profil.test', 'x', 'pemilik_fnb').lastInsertRowid);
const idNgo = Number(insertAkun.run('ngo@profil.test', 'x', 'perwakilan_ngo').lastInsertRowid);

db.prepare('INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha) VALUES (?, ?, ?)')
    .run(idPemilik, 'Bakery Profil', 'Jl. Profil No. 1, Bandung');
db.prepare('INSERT INTO perwakilan_ngo (id_akun, nama_organisasi, lokasi) VALUES (?, ?, ?)')
    .run(idNgo, 'Yayasan Profil', 'Jl. Dago No. 10, Bandung');

const contohAktivitas = [
    { idAkun: idPemilik, teks: 'Mencatat penjualan harian hari ini' },
    { idAkun: idPemilik, teks: 'Mencatat surplus Roti Tawar (8 porsi)' },
    { idAkun: idNgo, teks: 'Mengklaim Roti Manis (3 porsi)' },
    { idAkun: idAdmin, teks: 'Verifikasi pendaftaran Kedai Profil disetujui' },
    { idAkun: idPemilik, teks: 'Menetapkan distribusi surplus Donat Gula sebagai Donasi' }
];

const insertLog = db.prepare(
    'INSERT INTO log_aktivitas (id_akun, aktivitas, waktu) VALUES (?, ?, ?)'
);

const awal = Date.UTC(2026, 0, 1, 0, 0, 0);
db.transaction(() => {
    for (let i = 0; i < JUMLAH_LOG; i += 1) {
        const baris = contohAktivitas[i % contohAktivitas.length];
        const waktu = new Date(awal + i * 60000).toISOString().slice(0, 19).replace('T', ' ');
        insertLog.run(baris.idAkun, `${baris.teks} #${i}`, waktu);
    }
})();

db.prepare('ANALYZE').run();

function ukur(fungsi, ulangan = ULANGAN) {
    for (let i = 0; i < 3; i += 1) fungsi();

    const sampel = [];
    for (let i = 0; i < ulangan; i += 1) {
        const mulai = process.hrtime.bigint();
        fungsi();
        sampel.push(Number(process.hrtime.bigint() - mulai) / 1e6);
    }

    sampel.sort((a, b) => a - b);
    const total = sampel.reduce((jumlah, nilai) => jumlah + nilai, 0);

    return {
        min: sampel[0],
        median: sampel[Math.floor(sampel.length / 2)],
        rata: total / sampel.length,
        max: sampel[sampel.length - 1]
    };
}

function ms(nilai) {
    return `${nilai.toFixed(3)} ms`;
}

function rencana(sql, parameter = []) {
    return db
        .prepare(`EXPLAIN QUERY PLAN ${sql}`)
        .all(...parameter)
        .map((baris) => `  ${baris.detail}`);
}

// Replika query sebelum optimasi: JOIN seluruh log lebih dulu, baru diurutkan.
const SQL_LAMA = `
    SELECT log.id_log, log.aktivitas, log.waktu,
           CASE
               WHEN akun.tipe_akun = 'admin_sistem' THEN 'Admin Sistem'
               WHEN akun.tipe_akun = 'pemilik_fnb' THEN pemilik.nama_usaha
               ELSE ngo.nama_organisasi
           END AS pengguna
    FROM log_aktivitas AS log
    JOIN akun_pengguna AS akun ON akun.id_akun = log.id_akun
    LEFT JOIN pemilik_fnb AS pemilik ON pemilik.id_akun = akun.id_akun
    LEFT JOIN perwakilan_ngo AS ngo ON ngo.id_akun = akun.id_akun
    ORDER BY log.waktu DESC, log.id_log DESC
`;

// Implementasi sekarang: 100 baris dipilih lebih dulu lewat CTE, baru di-JOIN.
const SQL_CTE = `
    WITH terbaru AS MATERIALIZED (
        SELECT id_log FROM log_aktivitas
        ORDER BY waktu DESC
        LIMIT 100
    )
    SELECT log.id_log, log.aktivitas, log.waktu,
           CASE
               WHEN akun.tipe_akun = 'admin_sistem' THEN 'Admin Sistem'
               WHEN akun.tipe_akun = 'pemilik_fnb' THEN pemilik.nama_usaha
               ELSE ngo.nama_organisasi
           END AS pengguna
    FROM terbaru
    JOIN log_aktivitas AS log ON log.id_log = terbaru.id_log
    JOIN akun_pengguna AS akun ON akun.id_akun = log.id_akun
    LEFT JOIN pemilik_fnb AS pemilik ON pemilik.id_akun = akun.id_akun
    LEFT JOIN perwakilan_ngo AS ngo ON ngo.id_akun = akun.id_akun
    ORDER BY log.waktu DESC, log.id_log DESC
`;

const queryTanpaBatas = db.prepare(SQL_LAMA);
const queryLamaTerbatas = db.prepare(`${SQL_LAMA} LIMIT 100`);

const hasil = {
    tanpaBatas: ukur(() => queryTanpaBatas.all()),
    lamaTerbatas: ukur(() => queryLamaTerbatas.all()),
    sesudah: ukur(() => LogAktivitas.getDaftarLog()),
    cari: ukur(() => LogAktivitas.cariLog('Klaim')),
    keberadaanLama: ukur(() => LogAktivitas.getDaftarLog().length > 0),
    keberadaanBaru: ukur(() => LogAktivitas.adaLog())
};

const jumlahTanpaBatas = queryTanpaBatas.all().length;
const jumlahTerbatas = LogAktivitas.getDaftarLog().length;
const jumlahCari = LogAktivitas.cariLog('Klaim').length;

console.log(`\nJumlah log uji: ${JUMLAH_LOG.toLocaleString('id-ID')} baris`);
console.log(`Pengulangan pengukuran: ${ULANGAN}x (3 pemanasan)\n`);

const tabel = [
    ['Skenario', 'Baris', 'Median', 'Rata-rata', 'Min', 'Maks'],
    [
        'Query lama tanpa LIMIT',
        jumlahTanpaBatas,
        ms(hasil.tanpaBatas.median),
        ms(hasil.tanpaBatas.rata),
        ms(hasil.tanpaBatas.min),
        ms(hasil.tanpaBatas.max)
    ],
    [
        'Query lama + LIMIT 100',
        jumlahTerbatas,
        ms(hasil.lamaTerbatas.median),
        ms(hasil.lamaTerbatas.rata),
        ms(hasil.lamaTerbatas.min),
        ms(hasil.lamaTerbatas.max)
    ],
    [
        'CTE + LIMIT 100 (sekarang)',
        jumlahTerbatas,
        ms(hasil.sesudah.median),
        ms(hasil.sesudah.rata),
        ms(hasil.sesudah.min),
        ms(hasil.sesudah.max)
    ],
    [
        'Filter "Klaim" (CTE)',
        jumlahCari,
        ms(hasil.cari.median),
        ms(hasil.cari.rata),
        ms(hasil.cari.min),
        ms(hasil.cari.max)
    ],
    [
        'Cek keberadaan via 100 baris',
        jumlahTerbatas,
        ms(hasil.keberadaanLama.median),
        ms(hasil.keberadaanLama.rata),
        ms(hasil.keberadaanLama.min),
        ms(hasil.keberadaanLama.max)
    ],
    [
        'Cek keberadaan via SELECT 1 (sekarang)',
        1,
        ms(hasil.keberadaanBaru.median),
        ms(hasil.keberadaanBaru.rata),
        ms(hasil.keberadaanBaru.min),
        ms(hasil.keberadaanBaru.max)
    ]
];

for (const baris of tabel) {
    console.log(baris.map((sel) => String(sel)).join(' | '));
}

console.log('\nEXPLAIN QUERY PLAN — query lama + LIMIT 100:');
console.log(rencana(`${SQL_LAMA} LIMIT 100`).join('\n'));

console.log('\nEXPLAIN QUERY PLAN — CTE + LIMIT 100:');
console.log(rencana(SQL_CTE).join('\n'));

console.log('\nEXPLAIN QUERY PLAN — filter LIKE pada aktivitas:');
console.log(
    rencana(
        SQL_CTE.replace(
            'SELECT id_log FROM log_aktivitas',
            'SELECT id_log FROM log_aktivitas WHERE aktivitas LIKE ?'
        ),
        ['%Klaim%']
    ).join('\n')
);

const rasio = hasil.lamaTerbatas.median / hasil.sesudah.median;
console.log(`\nQuery lama + LIMIT vs CTE: ${rasio.toFixed(1)}x lebih lambat.`);

db.close();
fs.rmSync(folderUji, { recursive: true, force: true });
