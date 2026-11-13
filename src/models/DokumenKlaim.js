const db = require('../config/db');

// Mencatat klaim baru
exports.catatKlaim = (idNgo, idSurplus) => {
    const waktuKlaim = new Date().toISOString();

    const result = db.prepare(`
        INSERT INTO dokumen_klaim (
            id_ngo,
            id_surplus,
            waktu_klaim,
            status_klaim
        )
        VALUES (?, ?, ?, 'terklaim')
        RETURNING id_klaim AS idKlaim
    `).get(idNgo, idSurplus, waktuKlaim);

    if (!result) {
        throw new Error('Gagal mencatat klaim.');
    }

    return result.idKlaim;
};

// Mengambil detail klaim
exports.getDetailKlaim = (idKlaim) => {
    const detailKlaim = db.prepare(`
        SELECT
            id_klaim AS idKlaim,
            id_ngo AS idNgo,
            id_surplus AS idSurplus,
            waktu_klaim AS waktuKlaim,
            status_klaim AS statusKlaim
        FROM dokumen_klaim
        WHERE id_klaim = ?
    `).get(idKlaim);

    if (!detailKlaim) {
        throw new Error('Dokumen klaim tidak ditemukan.');
    }

    return detailKlaim;
};
