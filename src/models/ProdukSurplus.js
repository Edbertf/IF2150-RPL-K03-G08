const db = require('../config/db');

const KOLOM = `
    id_surplus                AS idSurplus,
    id_produk                 AS idProduk,
    id_pemilik                AS idPemilik,
    jumlah,
    batas_waktu_pengambilan   AS batasWaktuPengambilan,
    status
`;

// C08 getProdukSurplusTersedia()
exports.getProdukSurplusTersedia = () =>
    db.prepare(`
        SELECT ${KOLOM}
        FROM produk_surplus
        WHERE status = 'tersedia'
        ORDER BY id_surplus
    `).all();

// C08 getDetailSurplus(idSurplus)
exports.getDetailSurplus = (idSurplus) =>
    db.prepare(`
        SELECT ${KOLOM}
        FROM produk_surplus
        WHERE id_surplus = ?
    `).get(idSurplus) ?? null;

// C08 getStatus()
exports.getStatus = (idSurplus) => {
    const baris = db.prepare(`
        SELECT status
        FROM produk_surplus
        WHERE id_surplus = ?
    `).get(idSurplus);

    return baris ? baris.status : null;
};

// UC10 memperbarui status dalam transaksi bersama pencatatan dokumen klaim.
exports.setStatus = (idSurplus, status) => {
    if (!['tersedia', 'terklaim', 'selesai'].includes(status)) {
        throw new Error('Status produk surplus tidak valid.');
    }

    const hasil = db.prepare(`
        UPDATE produk_surplus
        SET status = ?
        WHERE id_surplus = ?
    `).run(status, idSurplus);

    if (hasil.changes === 0) {
        throw new Error('Produk surplus tidak ditemukan.');
    }
};
