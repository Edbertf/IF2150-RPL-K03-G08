const db = require('../config/db');

exports.getDetailProduk = (idPemilik) =>
    db.prepare(`
        SELECT id_produk   AS idProduk,
               nama_produk AS namaProduk,
               kategori
        FROM produk
        WHERE id_pemilik = ?
        ORDER BY id_produk
    `).all(idPemilik);