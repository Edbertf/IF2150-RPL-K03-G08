const db = require('../config/db');

// Menyimpan data profil organisasi NGO.
function simpanProfil(idAkun, dataForm) {
    db.prepare(`
        INSERT INTO perwakilan_ngo (
            id_akun,
            nama_organisasi,
            nomor_legalitas,
            lokasi
        )
        VALUES (?, ?, ?, ?)
    `).run(
        idAkun,
        dataForm.namaOrganisasi,
        dataForm.nomorLegalitas,
        dataForm.lokasi
    );
}

// Mencari data NGO berdasarkan akun.
function cariBerdasarkanAkun(idAkun) {
    return db.prepare(`
        SELECT
            nama_organisasi AS namaOrganisasi,
            nomor_legalitas AS nomorLegalitas,
            lokasi
        FROM perwakilan_ngo
        WHERE id_akun = ?
    `).get(idAkun) ?? null;
}

// Mengambil data organisasi berdasarkan ID akun NGO.
function getDataNgo(idAkun) {
    const dataNgo = db.prepare(`
        SELECT
            nama_organisasi AS namaOrganisasi,
            nomor_legalitas AS nomorLegalitas,
            lokasi
        FROM perwakilan_ngo
        WHERE id_akun = ?
    `).get(idAkun);

    if (!dataNgo) {
        throw new Error('Data Perwakilan NGO tidak ditemukan.');
    }

    return dataNgo;
}

module.exports = {
    simpanProfil,
    cariBerdasarkanAkun,
    getDataNgo
};
