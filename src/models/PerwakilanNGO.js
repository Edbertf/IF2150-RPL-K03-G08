const db = require('../config/db');

exports.simpanProfil = (idAkun, dataForm) => {
    db.prepare(`
        INSERT INTO perwakilan_ngo (id_akun, nama_organisasi, nomor_legalitas, lokasi)
        VALUES (?, ?, ?, ?)
    `).run(idAkun, dataForm.namaOrganisasi, dataForm.nomorLegalitas, dataForm.lokasi);
};

exports.cariBerdasarkanAkun = (idAkun) =>
    db.prepare(`
        SELECT nama_organisasi AS namaOrganisasi,
               nomor_legalitas AS nomorLegalitas,
               lokasi
        FROM perwakilan_ngo
        WHERE id_akun = ?
    `).get(idAkun) ?? null;