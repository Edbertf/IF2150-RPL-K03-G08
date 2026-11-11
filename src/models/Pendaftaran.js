const db = require('../config/db');

function tanggalHariIni() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());
}

exports.ajukanPendaftaran = (idAkun) => {
    const hasil = db.prepare(`
        INSERT INTO pendaftaran (id_akun, tanggal_daftar, status_verifikasi)
        VALUES (?, ?, 'menunggu verifikasi')
    `).run(idAkun, tanggalHariIni());

    return Number(hasil.lastInsertRowid);
};

// dipakai UC03
exports.getStatus = (idPendaftaran) => {
    const baris = db.prepare(`
        SELECT status_verifikasi AS statusVerifikasi
        FROM pendaftaran
        WHERE id_pendaftaran = ?
    `).get(idPendaftaran);

    return baris ? baris.statusVerifikasi : null;
};

exports.getDaftarMenungguVerifikasi = () =>
    db.prepare(`
        SELECT pd.id_pendaftaran     AS idPendaftaran,
               pd.id_akun           AS idAkun,
               pd.tanggal_daftar    AS tanggalDaftar,
               pd.status_verifikasi AS statusVerifikasi,
               a.email              AS email,
               a.tipe_akun          AS tipeAkun,
               COALESCE(p.nama_usaha, n.nama_organisasi) AS nama
        FROM pendaftaran pd
        JOIN akun_pengguna a      ON a.id_akun = pd.id_akun
        LEFT JOIN pemilik_fnb p   ON p.id_akun = a.id_akun
        LEFT JOIN perwakilan_ngo n ON n.id_akun = a.id_akun
        WHERE pd.status_verifikasi = 'menunggu verifikasi'
        ORDER BY pd.tanggal_daftar ASC, pd.id_pendaftaran ASC
    `).all();

exports.getDetailPendaftar = (idPendaftaran) =>
    db.prepare(`
        SELECT pd.id_pendaftaran     AS idPendaftaran,
               pd.id_akun           AS idAkun,
               pd.tanggal_daftar    AS tanggalDaftar,
               pd.status_verifikasi AS statusVerifikasi,
               a.email              AS email,
               a.tipe_akun          AS tipeAkun,
               p.nama_usaha         AS namaUsaha,
               p.alamat_usaha       AS alamatUsaha,
               p.jam_operasional    AS jamOperasional,
               n.nama_organisasi    AS namaOrganisasi,
               n.nomor_legalitas    AS nomorLegalitas,
               n.lokasi             AS lokasi
        FROM pendaftaran pd
        JOIN akun_pengguna a       ON a.id_akun = pd.id_akun
        LEFT JOIN pemilik_fnb p    ON p.id_akun = a.id_akun
        LEFT JOIN perwakilan_ngo n ON n.id_akun = a.id_akun
        WHERE pd.id_pendaftaran = ?
    `).get(idPendaftaran) ?? null;

exports.updateStatus = (idPendaftaran, status) => {
    if (status !== 'diterima' && status !== 'ditolak') {
        return false;
    }

    const hasil = db.prepare(`
        UPDATE pendaftaran
        SET status_verifikasi = ?
        WHERE id_pendaftaran = ?
          AND status_verifikasi = 'menunggu verifikasi'
    `).run(status, idPendaftaran);

    return hasil.changes > 0;
};

// mengambil pendaftaran milik satu akun (satu akun satu pendaftaran).
exports.cariBerdasarkanAkun = (idAkun) =>
    db.prepare(`
        SELECT id_pendaftaran     AS idPendaftaran,
               tanggal_daftar     AS tanggalDaftar,
               status_verifikasi  AS statusVerifikasi
        FROM pendaftaran
        WHERE id_akun = ?
    `).get(idAkun) ?? null;