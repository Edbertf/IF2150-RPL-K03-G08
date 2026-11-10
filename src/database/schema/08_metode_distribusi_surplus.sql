-- C09 MetodeDistribusiSurplus
-- Menyimpan metode distribusi surplus untuk setiap produk.

CREATE TABLE IF NOT EXISTS metode_distribusi_surplus (
    id_distribusi INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produk INTEGER NOT NULL UNIQUE,
    jenis_distribusi TEXT NOT NULL,
    harga REAL NOT NULL DEFAULT 0,

    CHECK (jenis_distribusi IN ('Donasi', 'Jual Diskon')),
    CHECK (harga >= 0),

    FOREIGN KEY (id_produk)
        REFERENCES produk(id_produk)
);