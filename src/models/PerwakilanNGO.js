const db = require('../config/db');

exports.simpanProfil = (idAkun, dataForm) => {
    db.prepare(`
        INSERT INTO perwakilan_ngo (id_akun, nama_organisasi, nomor_legalitas, lokasi)
        VALUES (?, ?, ?, ?)
    `).run(idAkun, dataForm.namaOrganisasi, dataForm.nomorLegalitas, dataForm.lokasi);
};