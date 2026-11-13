const bcrypt = require('bcryptjs');
const db = require('../config/db');

const BIAYA_HASH = 10;

exports.registrasi = (dataForm) => {
    const kataSandiHash = bcrypt.hashSync(dataForm.kataSandi, BIAYA_HASH);

    const hasil = db.prepare(`
        INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun)
        VALUES (?, ?, ?)
    `).run(dataForm.email, kataSandiHash, dataForm.tipeAkun);

    return Number(hasil.lastInsertRowid);
};

// Dipakai AuthController untuk memeriksa email duplikat sebelum INSERT.
exports.cariBerdasarkanEmail = (email) =>
    db.prepare(`
        SELECT id_akun  AS idAkun,
               email,
               tipe_akun AS tipeAkun
        FROM akun_pengguna
        WHERE email = ?
    `).get(email) ?? null;

// Dipakai login untuk memverifikasi kata sandi
exports.cariKredensial = (email) =>
    db.prepare(`
        SELECT id_akun    AS idAkun,
               email,
               kata_sandi AS kataSandi,
               tipe_akun  AS tipeAkun
        FROM akun_pengguna
        WHERE email = ?
    `).get(email) ?? null;