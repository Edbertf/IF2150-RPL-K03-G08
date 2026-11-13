CREATE TABLE IF NOT EXISTS prediksi_produksi (
    id_prediksi INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal_prediksi TEXT NOT NULL,
    id_produk INTEGER NOT NULL REFERENCES produk(id_produk),
    jumlah_rekomendasi INTEGER NOT NULL CHECK (jumlah_rekomendasi >= 0),
    UNIQUE (tanggal_prediksi, id_produk)
);