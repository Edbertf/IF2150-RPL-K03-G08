const db = require('../config/db');

function tanggalHariIni() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());
}

function tanggalMundur(hari) {
    const dasar = new Date(`${tanggalHariIni()}T00:00:00+07:00`);
    dasar.setDate(dasar.getDate() - hari);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(dasar);
}

exports.tanggalHariIni = tanggalHariIni;

exports.catatPenjualan = (dataPenjualan) => {
    const tanggal = tanggalHariIni();
    const stmt = db.prepare(`
        INSERT INTO data_penjualan (id_produk, tanggal, jumlah_terjual, jumlah_tersisa)
        VALUES (?, ?, ?, ?)
        ON CONFLICT (id_produk, tanggal) DO UPDATE SET
            jumlah_terjual = excluded.jumlah_terjual,
            jumlah_tersisa = excluded.jumlah_tersisa
    `);

    const simpan = db.transaction((data) => {
        for (const item of data) {
            stmt.run(item.idProduk, tanggal, item.jumlahTerjual, item.jumlahTersisa);
        }
    });

    simpan(dataPenjualan);
    return tanggal;
};

exports.getDataHistoris = (idPemilik, batasHari = 7) =>
    db.prepare(`
        SELECT d.tanggal         AS tanggal,
               d.id_produk       AS idProduk,
               p.nama_produk     AS namaProduk,
               d.jumlah_terjual  AS jumlahTerjual,
               d.jumlah_tersisa  AS jumlahTersisa
        FROM data_penjualan d
        JOIN produk p ON p.id_produk = d.id_produk
        WHERE p.id_pemilik = ?
          AND d.tanggal >= ?
        ORDER BY d.tanggal ASC, p.id_produk ASC
    `).all(idPemilik, tanggalMundur(batasHari - 1));

exports.getPenjualanHarian = (idPemilik, tanggal) =>
    db.prepare(`
        SELECT d.id_produk       AS idProduk,
               p.nama_produk     AS namaProduk,
               d.jumlah_terjual  AS jumlahTerjual,
               d.jumlah_tersisa  AS jumlahTersisa
        FROM data_penjualan d
        JOIN produk p ON p.id_produk = d.id_produk
        WHERE p.id_pemilik = ? AND d.tanggal = ?
        ORDER BY p.id_produk
    `).all(idPemilik, tanggal);

exports.hitungHariTerkumpul = (idPemilik, batasHari = 7) =>
    db.prepare(`
        SELECT COUNT(DISTINCT d.tanggal) AS jumlah
        FROM data_penjualan d
        JOIN produk p ON p.id_produk = d.id_produk
        WHERE p.id_pemilik = ? AND d.tanggal >= ?
    `).get(idPemilik, tanggalMundur(batasHari - 1)).jumlah;