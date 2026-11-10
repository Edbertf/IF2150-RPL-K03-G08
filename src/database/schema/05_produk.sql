-- C05 Produk
-- Produk milik satu pemilik F&B.
CREATE TABLE IF NOT EXISTS produk (
    id_produk INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pemilik INTEGER NOT NULL REFERENCES pemilik_fnb(id_pemilik),
    nama_produk TEXT NOT NULL,
    kategori TEXT
);
