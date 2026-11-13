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

// Mengambil riwayat klaim untuk satu NGO, terbaru lebih dulu.
exports.getDaftarKlaim = (idNgo) => db.prepare(`
    SELECT
        dk.id_klaim AS idKlaim,
        dk.id_ngo AS idNgo,
        dk.id_surplus AS idSurplus,
        dk.waktu_klaim AS waktuKlaim,
        dk.status_klaim AS statusKlaim,
        ps.status AS statusSurplus,
        ps.jumlah AS jumlah,
        ps.batas_waktu_pengambilan AS batasWaktuPengambilan,
        p.nama_produk AS namaProduk,
        p.kategori AS kategori,
        pf.nama_usaha AS namaUsaha
    FROM dokumen_klaim dk
    JOIN produk_surplus ps ON ps.id_surplus = dk.id_surplus
    JOIN produk p ON p.id_produk = ps.id_produk
    JOIN pemilik_fnb pf ON pf.id_pemilik = ps.id_pemilik
    WHERE dk.id_ngo = ?
    ORDER BY dk.waktu_klaim DESC, dk.id_klaim DESC
`).all(idNgo);
