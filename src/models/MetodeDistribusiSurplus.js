const db = require('../config/db');

// Mengambil informasi distribusi berdasarkan produk
exports.getInfoDistribusi = (idProduk) => {

    if (!idProduk) {
        throw new Error('idProduk harus diisi.');
    }

    const infoDistribusi = db.prepare(`
        SELECT
            jenis_distribusi AS jenisDistribusi,
            harga
        FROM metode_distribusi_surplus
        WHERE id_produk = ?
    `).get(idProduk);

    if (!infoDistribusi) {
        throw new Error('Informasi distribusi tidak ditemukan.');
    }

    return infoDistribusi;
};
