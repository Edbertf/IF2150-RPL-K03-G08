const db = require('../config/db');

class ProdukSurplusModel {
    static getSemuaProduk() {
        return db.prepare("SELECT * FROM produk").all();
    }
    
    static simpanProdukSurplus(data) {
        const stmt = db.prepare(`
            INSERT INTO produk_surplus (id_produk, id_pemilik, jumlah, batas_waktu, lokasi_pengambilan, status)
            VALUES (?, ?, ?, ?, ?, 'tersedia')
        `);
        const info = stmt.run(data.idProduk, data.idPemilik, data.jumlah, data.batasWaktu, data.lokasi);
        return info.lastInsertRowid; 
    }

    static tambahProduk(namaProduk, kategori = 'Makanan') {
        const stmt = db.prepare("INSERT INTO produk (nama_produk, kategori) VALUES (?, ?)");
        stmt.run(namaProduk, kategori);
    }

    static getProdukById(idProduk) {
        return db.prepare("SELECT * FROM produk WHERE id_produk = ?").get(idProduk);
    }

    static updateProduk(idProduk, namaProduk, kategori) {
        const stmt = db.prepare("UPDATE produk SET nama_produk = ?, kategori = ? WHERE id_produk = ?");
        stmt.run(namaProduk, kategori, idProduk);
    }
}
module.exports = ProdukSurplusModel;