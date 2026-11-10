const db = require('../config/db');

class ProdukSurplusModel {
    static simpanProdukSurplus(data) {
        const stmt = db.prepare(`
            INSERT INTO produk_surplus (id_produk, id_pemilik, jumlah, batas_waktu, lokasi_pengambilan, status)
            VALUES (?, ?, ?, ?, ?, 'tersedia')
        `);
        const info = stmt.run(data.idProduk, data.idPemilik, data.jumlah, data.batasWaktu, data.lokasi);
        return info.lastInsertRowid; 
    }
}
module.exports = ProdukSurplusModel;