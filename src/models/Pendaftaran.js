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