-- C03 DokumenPendukung
-- Metadata dokumen pendukung yang diunggah saat registrasi. Tabel ini menyimpan nama berkasnya.
CREATE TABLE IF NOT EXISTS dokumen_pendukung (
    id_dokumen INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pendaftaran INTEGER NOT NULL REFERENCES pendaftaran(id_pendaftaran),
    nama_file TEXT NOT NULL,
    tipe_dokumen TEXT NOT NULL
        CHECK (tipe_dokumen IN ('PDF', 'JPG', 'PNG'))
);