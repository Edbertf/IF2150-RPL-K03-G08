const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const bcrypt = require('bcryptjs');
 
const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c01-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');
 
require('../database/init')();
const db = require('../config/db');
const AkunPengguna = require('../models/AkunPengguna');
 
let urut = 0;
 
function emailBaru() {
    urut += 1;
    return `c01-${urut}@foodlink.test`;
}
 
function daftar(email, kataSandi = 'rahasia123', tipeAkun = 'pemilik_fnb') {
    return AkunPengguna.registrasi({ email, kataSandi, tipeAkun });
}
 
after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});
 
test('C01-UT01 registrasi menyimpan akun dan hash kata sandi', () => {
    const email = emailBaru();
    const idAkun = daftar(email);
 
    assert.ok(Number.isSafeInteger(idAkun) && idAkun > 0);
 
    const akun = db.prepare(
        'SELECT email, kata_sandi, tipe_akun FROM akun_pengguna WHERE id_akun = ?'
    ).get(idAkun);
 
    assert.equal(akun.email, email);
    assert.equal(akun.tipe_akun, 'pemilik_fnb');
    assert.match(akun.kata_sandi, /^\$2[aby]\$/);
    assert.notEqual(akun.kata_sandi, 'rahasia123');
    assert.equal(bcrypt.compareSync('rahasia123', akun.kata_sandi), true);
});
 
test('C01-UT02 registrasi menerima kata sandi tepat 72 karakter', () => {
    const email = emailBaru();
    const kataSandi = 'x'.repeat(72);
    const idAkun = daftar(email, kataSandi);
 
    const akun = db.prepare(
        'SELECT kata_sandi FROM akun_pengguna WHERE id_akun = ?'
    ).get(idAkun);
 
    assert.equal(bcrypt.compareSync(kataSandi, akun.kata_sandi), true);
});
 
test('C01-UT03 registrasi email duplikat ditolak tanpa menambah akun', () => {
    const email = emailBaru();
    daftar(email);
 
    const sebelum = db.prepare(
        'SELECT COUNT(*) AS jumlah FROM akun_pengguna'
    ).get().jumlah;
 
    assert.throws(
        () => daftar(email),
        /UNIQUE constraint failed/
    );
 
    const sesudah = db.prepare(
        'SELECT COUNT(*) AS jumlah FROM akun_pengguna'
    ).get().jumlah;
 
    assert.equal(sesudah, sebelum);
});
 
test('C01-UT04 cariBerdasarkanEmail mengembalikan akun yang ada dan null jika tidak ada', () => {
    const email = emailBaru();
    const idAkun = daftar(email, 'rahasia123', 'perwakilan_ngo');
 
    const akun = AkunPengguna.cariBerdasarkanEmail(email);
 
    assert.equal(akun.idAkun, idAkun);
    assert.equal(akun.email, email);
    assert.equal(akun.tipeAkun, 'perwakilan_ngo');
    assert.equal(AkunPengguna.cariBerdasarkanEmail('tidak-ada@foodlink.test'), null);
});
 
test('C01-UT05 cariKredensial mengembalikan hash yang cocok dan null jika tidak ada', () => {
    const email = emailBaru();
    const idAkun = daftar(email);
 
    const kredensial = AkunPengguna.cariKredensial(email);
 
    assert.equal(kredensial.idAkun, idAkun);
    assert.equal(kredensial.email, email);
    assert.equal(bcrypt.compareSync('rahasia123', kredensial.kataSandi), true);
    assert.equal(AkunPengguna.cariKredensial('tidak-ada@foodlink.test'), null);
});