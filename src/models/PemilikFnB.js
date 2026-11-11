const db = require('../config/db');

exports.simpanProfil = (idAkun, dataForm) => {
    db.prepare(`
        INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha, jam_operasional)
        VALUES (?, ?, ?, ?)
    `).run(idAkun, dataForm.namaUsaha, dataForm.alamatUsaha, dataForm.jamOperasional);
};

exports.cariBerdasarkanAkun = (idAkun) =>
    db.prepare(`
        SELECT id_pemilik      AS idPemilik,
               nama_usaha      AS namaUsaha,
               alamat_usaha    AS alamatUsaha,
               jam_operasional AS jamOperasional
        FROM pemilik_fnb
        WHERE id_akun = ?
    `).get(idAkun) ?? null;