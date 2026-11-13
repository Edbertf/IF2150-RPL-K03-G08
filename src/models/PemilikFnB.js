
const db = require('../config/db');

exports.simpanProfil = (idAkun, dataForm) => {
    db.prepare(`
        INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha, jam_operasional)
        VALUES (?, ?, ?, ?)
    `).run(idAkun, dataForm.namaUsaha, dataForm.alamatUsaha, dataForm.jamOperasional);
};

// C30 getLokasiUsaha(idPemilik)
exports.getLokasiUsaha = (idPemilik) => {
    const baris = db.prepare(`
        SELECT alamat_usaha AS alamatUsaha
        FROM pemilik_fnb
        WHERE id_pemilik = ?
    `).get(idPemilik);

    return baris ? baris.alamatUsaha : null;
};

// C30 getNamaUsaha(idPemilik)
exports.getNamaUsaha = (idPemilik) => {
    const baris = db.prepare(`
        SELECT nama_usaha AS namaUsaha
        FROM pemilik_fnb
        WHERE id_pemilik = ?
    `).get(idPemilik);

    return baris ? baris.namaUsaha : null;
};

// Mengambil seluruh data usaha berdasarkan ID pemilik.
exports.getDataUsaha = (idPemilik) => {
    const dataUsaha = db.prepare(`
        SELECT
            nama_usaha AS namaUsaha,
            alamat_usaha AS alamatUsaha,
            jam_operasional AS jamOperasional
        FROM pemilik_fnb
        WHERE id_pemilik = ?
    `).get(idPemilik);

    if (!dataUsaha) {
        throw new Error('Data Pemilik F&B tidak ditemukan.');
    }

    return dataUsaha;
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
