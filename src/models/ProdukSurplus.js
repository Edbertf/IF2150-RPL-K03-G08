const db = require('../config/db');

// Mengambil detail satu produk surplus
exports.getDetailSurplus = (idSurplus) => {
    const detailSurplus = db.prepare(`
        SELECT
            id_surplus AS idSurplus,
            id_produk AS idProduk,
            id_pemilik AS idPemilik,
            jumlah,
            batas_waktu_pengambilan AS batasWaktuPengambilan,
            status
        FROM produk_surplus
        WHERE id_surplus = ?
    `).get(idSurplus);

    if (!detailSurplus) {
        throw new Error('Produk surplus tidak ditemukan.');
    }

    return detailSurplus;
};

// Mengambil status produk surplus
exports.getStatus = (idSurplus) => {
    const data = db.prepare(`
        SELECT status
        FROM produk_surplus
        WHERE id_surplus = ?
    `).get(idSurplus);

    if (!data) {
        throw new Error('Produk surplus tidak ditemukan.');
    }

    return data.status;
};

// Memperbarui status produk surplus
exports.setStatus = (idSurplus, status) => {
    const statusValid = ['tersedia', 'terklaim', 'selesai'];

    if (!statusValid.includes(status)) {
        throw new Error('Status produk surplus tidak valid.');
    }

    const result = db.prepare(`
        UPDATE produk_surplus
        SET status = ?
        WHERE id_surplus = ?
    `).run(status, idSurplus);

    if (result.changes === 0) {
        throw new Error('Produk surplus tidak ditemukan.');
    }
};
