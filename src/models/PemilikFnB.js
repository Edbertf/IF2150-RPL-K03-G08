const db = require('../config/db');

exports.simpanProfil = (idAkun, dataForm) => {
    db.prepare(`
        INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha, jam_operasional)
        VALUES (?, ?, ?, ?)
    `).run(idAkun, dataForm.namaUsaha, dataForm.alamatUsaha, dataForm.jamOperasional);
};