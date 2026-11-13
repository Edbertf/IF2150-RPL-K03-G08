const db = require('../config/db');

// C09 getInfoDistribusi() untuk satu produk.
exports.getInfoDistribusi = (idProduk) =>
    db.prepare(`
        SELECT jenis_distribusi AS jenisDistribusi,
               harga
        FROM metode_distribusi_surplus
        WHERE id_produk = ?
    `).get(idProduk) ?? null;

// C09 getJenisDistribusi()
exports.getJenisDistribusi = (idProduk) => {
    const info = exports.getInfoDistribusi(idProduk);
    return info ? info.jenisDistribusi : null;
};
