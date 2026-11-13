const db = require('../config/db');
const DataPenjualan = require('./DataPenjualan');

function tanggalBesok() {
    const dasar = new Date(`${DataPenjualan.tanggalHariIni()}T00:00:00+07:00`);
    dasar.setDate(dasar.getDate() + 1);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(dasar);
}

function hitungRekomendasi(rataTerjual, rataTersisa) {
    const hasil = rataTerjual + (0.5 * rataTersisa);
    if (!Number.isFinite(hasil)) return 0;
    return Math.max(0, Math.round(hasil));
}

function kelompokkanPerProduk(dataPenjualan) {
    const peta = new Map();

    for (const data of dataPenjualan) {
        if (!peta.has(data.idProduk)) {
            peta.set(data.idProduk, {
                idProduk: data.idProduk,
                totalTerjual: 0,
                totalTersisa: 0,
                jumlahData: 0
            });
        }

        const item = peta.get(data.idProduk);
        item.totalTerjual += Number(data.jumlahTerjual) || 0;
        item.totalTersisa += Number(data.jumlahTersisa) || 0;
        item.jumlahData += 1;
    }

    return Array.from(peta.values());
}

exports.tanggalBesok = tanggalBesok;
exports.hitungRekomendasi = hitungRekomendasi;

exports.simpanPrediksi = (dataPenjualan) => {
    if (!Array.isArray(dataPenjualan) || dataPenjualan.length === 0) {
        throw new Error('Data penjualan tidak boleh kosong.');
    }

    const tanggalPrediksi = tanggalBesok();
    const daftarProduk = kelompokkanPerProduk(dataPenjualan);

    const stmt = db.prepare(`
        INSERT INTO prediksi_produksi (tanggal_prediksi, id_produk, jumlah_rekomendasi)
        VALUES (?, ?, ?)
        ON CONFLICT (tanggal_prediksi, id_produk) DO UPDATE SET
            jumlah_rekomendasi = excluded.jumlah_rekomendasi
    `);

    const simpan = db.transaction((daftar) => {
        for (const produk of daftar) {
            const rataTerjual = produk.totalTerjual / produk.jumlahData;
            const rataTersisa = produk.totalTersisa / produk.jumlahData;
            stmt.run(tanggalPrediksi, produk.idProduk, hitungRekomendasi(rataTerjual, rataTersisa));
        }
    });

    simpan(daftarProduk);
    return true;
};

exports.getHasilPrediksi = (idPemilik) =>
    db.prepare(`
        SELECT pr.id_prediksi        AS idPrediksi,
               pr.tanggal_prediksi   AS tanggalPrediksi,
               pr.id_produk          AS idProduk,
               p.nama_produk         AS namaProduk,
               pr.jumlah_rekomendasi AS jumlahRekomendasi,
               (SELECT d.jumlah_terjual
                  FROM data_penjualan d
                 WHERE d.id_produk = pr.id_produk
                 ORDER BY d.tanggal DESC
                 LIMIT 1)            AS terjualTerakhir
        FROM prediksi_produksi pr
        JOIN produk p ON p.id_produk = pr.id_produk
        WHERE p.id_pemilik = ?
          AND pr.tanggal_prediksi = ?
        ORDER BY pr.id_produk ASC
    `).all(idPemilik, tanggalBesok()).map((item) => ({
        ...item,
        tren: item.terjualTerakhir === null
            ? null
            : item.jumlahRekomendasi - item.terjualTerakhir
    }));