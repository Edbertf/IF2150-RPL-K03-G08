const bcrypt = require('bcryptjs');
const db = require('../config/db');
require('./init')();

const EMAIL = 'admin@foodlink.test';
const SANDI = 'admin123';

const akun = db.prepare('SELECT id_akun FROM akun_pengguna WHERE email = ?').get(EMAIL);

if (akun) {
    console.log('Akun admin sudah ada:', EMAIL);
} else {
    db.prepare('INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun) VALUES (?, ?, ?)')
        .run(EMAIL, bcrypt.hashSync(SANDI, 10), 'admin_sistem');
    console.log('Akun admin dibuat:', EMAIL, '/', SANDI);
}

db.close();