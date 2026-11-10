-- C06 DataPenjualan
-- Penjualan dan sisa per produk per tanggal. Satu produk hanya satu baris per hari.
CREATE TABLE IF NOT EXISTS data_penjualan (
    id_penjualan INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produk INTEGER NOT NULL REFERENCES produk(id_produk),
    tanggal TEXT NOT NULL,
    jumlah_terjual INTEGER NOT NULL CHECK (jumlah_terjual >= 0),
    jumlah_tersisa INTEGER NOT NULL CHECK (jumlah_tersisa >= 0),
    UNIQUE (id_produk, tanggal)
);
