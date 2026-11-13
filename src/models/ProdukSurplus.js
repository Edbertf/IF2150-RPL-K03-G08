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
