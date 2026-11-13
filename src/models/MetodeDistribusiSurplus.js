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

// UC07 menyimpan metode distribusi; satu produk hanya punya satu metode.
exports.simpanMetode = (idProduk, jenisDistribusi, harga = 0) => {
    if (!['Donasi', 'Jual Diskon'].includes(jenisDistribusi)) {
        throw new Error('Metode distribusi tidak valid.');
    }

    db.prepare(`
        INSERT INTO metode_distribusi_surplus (id_produk, jenis_distribusi, harga)
        VALUES (?, ?, ?)
        ON CONFLICT(id_produk) DO UPDATE SET
            jenis_distribusi = excluded.jenis_distribusi,
            harga = excluded.harga
    `).run(idProduk, jenisDistribusi, harga);
};
