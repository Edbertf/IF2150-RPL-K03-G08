
const db = require('../config/db');

// Mengambil seluruh produk milik pemilik FnB.
exports.getDetailProduk = (idPemilik) =>
    db.prepare(`
        SELECT
            id_produk AS idProduk,
            nama_produk AS namaProduk,
            kategori
        FROM produk
        WHERE id_pemilik = ?
        ORDER BY id_produk
    `).all(idPemilik);

// Mengambil detail satu produk berdasarkan ID produk.
exports.getProduk = (idProduk) => {
    const produk = db.prepare(`
        SELECT
            id_produk AS idProduk,
            nama_produk AS namaProduk,
            kategori
        FROM produk
        WHERE id_produk = ?
    `).get(idProduk);

    if (!produk) {
        throw new Error('Produk tidak ditemukan.');
    }

    return produk;
};
