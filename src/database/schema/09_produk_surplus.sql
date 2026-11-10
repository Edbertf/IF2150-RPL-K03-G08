-- C08 ProdukSurplus
-- Menyimpan informasi produk surplus yang tersedia untuk diklaim.

CREATE TABLE IF NOT EXISTS produk_surplus (
    id_surplus INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produk INTEGER NOT NULL,
    id_pemilik INTEGER NOT NULL,
    jumlah INTEGER NOT NULL,
    batas_waktu_pengambilan TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'tersedia',

    CHECK (jumlah > 0),
    CHECK (status IN ('tersedia', 'terklaim', 'selesai')),

    FOREIGN KEY (id_produk)
        REFERENCES produk(id_produk),

    FOREIGN KEY (id_pemilik)
        REFERENCES pemilik_fnb(id_pemilik)
);