
const db = require('../config/db');

// Menyimpan profil pemilik FnB.
function simpanProfil(idAkun, dataForm) {
    db.prepare(`
        INSERT INTO pemilik_fnb (
            id_akun,
            nama_usaha,
            alamat_usaha,
            jam_operasional
        )
        VALUES (?, ?, ?, ?)
    `).run(
        idAkun,
        dataForm.namaUsaha,
        dataForm.alamatUsaha,
        dataForm.jamOperasional
    );
}

// Mencari pemilik FnB berdasarkan akun.
function cariBerdasarkanAkun(idAkun) {
    return db.prepare(`
        SELECT
            id_pemilik AS idPemilik,
            nama_usaha AS namaUsaha,
            alamat_usaha AS alamatUsaha,
            jam_operasional AS jamOperasional
        FROM pemilik_fnb
        WHERE id_akun = ?
    `).get(idAkun) ?? null;
}

// Mengambil alamat usaha berdasarkan ID pemilik.
function getLokasiUsaha(idPemilik) {
    const usaha = db.prepare(`
        SELECT alamat_usaha AS alamatUsaha
        FROM pemilik_fnb
        WHERE id_pemilik = ?
    `).get(idPemilik);

    return usaha ? usaha.alamatUsaha : null;
}

// Mengambil nama usaha berdasarkan ID pemilik.
function getNamaUsaha(idPemilik) {
    const usaha = db.prepare(`
        SELECT nama_usaha AS namaUsaha
        FROM pemilik_fnb
        WHERE id_pemilik = ?
    `).get(idPemilik);

    return usaha ? usaha.namaUsaha : null;
}

module.exports = {
    simpanProfil,
    cariBerdasarkanAkun,
    getLokasiUsaha,
    getNamaUsaha
};
