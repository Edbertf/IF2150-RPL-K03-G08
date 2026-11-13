const db = require('../config/db');

// C05 getProduk(idProduk): detail satu produk untuk halaman NGO.
exports.getProduk = (idProduk) =>
    db.prepare(`
        SELECT id_produk   AS idProduk,
               id_pemilik  AS idPemilik,
               nama_produk AS namaProduk,
               kategori
        FROM produk
        WHERE id_produk = ?
    `).get(idProduk) ?? null;

exports.getDetailProduk = (idPemilik) =>
    db.prepare(`
        SELECT id_produk   AS idProduk,
               nama_produk AS namaProduk,
               kategori
        FROM produk
        WHERE id_pemilik = ?
        ORDER BY id_produk
    `).all(idPemilik);