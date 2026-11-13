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

const demo = db.prepare('SELECT id_akun FROM akun_pengguna WHERE email = ?')
    .get('demo@foodlink.test');

if (demo) {
    const pendaftaran = db.prepare(
        'SELECT id_pendaftaran, status_verifikasi FROM pendaftaran WHERE id_akun = ?'
    ).get(demo.id_akun);

    if (!pendaftaran) {
        const tanggal = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' })
            .format(new Date());
        db.prepare(`
            INSERT INTO pendaftaran (id_akun, tanggal_daftar, status_verifikasi)
            VALUES (?, ?, 'diterima')
        `).run(demo.id_akun, tanggal);
        console.log('Pendaftaran demo dibuat: diterima');
    } else if (pendaftaran.status_verifikasi !== 'diterima') {
        db.prepare('UPDATE pendaftaran SET status_verifikasi = ? WHERE id_pendaftaran = ?')
            .run('diterima', pendaftaran.id_pendaftaran);
        console.log('Pendaftaran demo diperbarui: diterima');
    }
}

db.close();