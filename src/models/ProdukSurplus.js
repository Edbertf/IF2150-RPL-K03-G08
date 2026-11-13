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

// UC06 mencatat surplus baru milik Pemilik F&B.
exports.simpanProdukSurplus = ({ idProduk, idPemilik, jumlah, batasWaktu }) => {
    const info = db.prepare(`
        INSERT INTO produk_surplus (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status)
        VALUES (?, ?, ?, ?, 'tersedia')
    `).run(idProduk, idPemilik, jumlah, batasWaktu);

    return Number(info.lastInsertRowid);
};

exports.getSemuaProduk = (idPemilik) =>
    db.prepare(`
        SELECT id_produk, id_pemilik, nama_produk, kategori
        FROM produk
        WHERE id_pemilik = ?
        ORDER BY nama_produk
    `).all(idPemilik);

exports.getProdukById = (idProduk, idPemilik) =>
    db.prepare(`
        SELECT id_produk, id_pemilik, nama_produk, kategori
        FROM produk
        WHERE id_produk = ? AND id_pemilik = ?
    `).get(idProduk, idPemilik) ?? null;

exports.tambahProduk = (idPemilik, namaProduk, kategori) => {
    const info = db.prepare(`
        INSERT INTO produk (id_pemilik, nama_produk, kategori)
        VALUES (?, ?, ?)
    `).run(idPemilik, namaProduk, kategori);

    return Number(info.lastInsertRowid);
};

exports.updateProduk = (idProduk, idPemilik, namaProduk, kategori) => {
    const hasil = db.prepare(`
        UPDATE produk
        SET nama_produk = ?, kategori = ?
        WHERE id_produk = ? AND id_pemilik = ?
    `).run(namaProduk, kategori, idProduk, idPemilik);

    if (hasil.changes === 0) {
        throw new Error('Produk tidak ditemukan.');
    }
};
