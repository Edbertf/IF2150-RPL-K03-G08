-- C10 DokumenKlaim
-- Menyimpan informasi klaim yang diajukan oleh NGO.

CREATE TABLE IF NOT EXISTS dokumen_klaim (
    id_klaim INTEGER PRIMARY KEY AUTOINCREMENT,
    id_ngo INTEGER NOT NULL,
    id_surplus INTEGER NOT NULL UNIQUE,
    waktu_klaim TEXT NOT NULL,
    status_klaim TEXT NOT NULL DEFAULT 'terklaim',

    FOREIGN KEY (id_ngo)
        REFERENCES perwakilan_ngo(id_akun),

    FOREIGN KEY (id_surplus)
        REFERENCES produk_surplus(id_surplus)
);