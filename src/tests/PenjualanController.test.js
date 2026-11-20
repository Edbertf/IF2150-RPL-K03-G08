const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c24-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const PenjualanController = require('../controllers/PenjualanController');
const DataPenjualan = require('../models/DataPenjualan');
const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');

let urut = 0;
let nomorProduk = 0;

function buatPemilik() {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c24-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C24 ${urut}`,
        alamatUsaha: 'Jl. C24 No. 1, Bandung',
        jamOperasional: '08.00-20.00'
    });

    const idPemilik = db.prepare(
        'SELECT id_pemilik AS idPemilik FROM pemilik_fnb WHERE id_akun = ?'
    ).get(idAkun).idPemilik;

    return { idAkun, idPemilik };
}

function buatProduk(idPemilik, nama) {
    nomorProduk += 1;
    return db.prepare(`
        INSERT INTO produk (id_pemilik, nama_produk, kategori)
        VALUES (?, ?, ?)
    `).run(
        idPemilik,
        nama || `Produk C24 ${nomorProduk}`,
        'Makanan'
    ).lastInsertRowid;
}

function hitungBaris() {
    return db.prepare('SELECT COUNT(*) AS jumlah FROM data_penjualan').get().jumlah;
}

function ambilBaris(idProduk) {
    return db.prepare(`
        SELECT * FROM data_penjualan
        WHERE id_produk = ? AND tanggal = ?
    `).get(idProduk, DataPenjualan.tanggalHariIni());
}

function reqPalsu({ user = null, body = {} } = {}) {
    return { user, body };
}

function resPalsu() {
    return {
        statusCode: 200,
        rendered: null,
        redirectUrl: null,
        status(kode) {
            this.statusCode = kode;
            return this;
        },
        render(view, data) {
            this.rendered = { view, data };
            return this;
        },
        redirect(url) {
            this.redirectUrl = url;
            return this;
        }
    };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C24-UT01 validasiInputPenjualan menerima data penjualan valid', () => {
    assert.equal(
        PenjualanController.validasiInputPenjualan([
            { idProduk: 1, namaProduk: 'Nasi C24', jumlahTerjual: 10, jumlahTersisa: 2 },
            { idProduk: 2, namaProduk: 'Ayam C24', jumlahTerjual: 0, jumlahTersisa: 5 }
        ]),
        true
    );
});

test('C24-UT02 validasiInputPenjualan menerima batas 0 dan 1000 serta menolak 1001', () => {
    assert.equal(
        PenjualanController.validasiInputPenjualan([
            { idProduk: 1, jumlahTerjual: 0, jumlahTersisa: 0 }
        ]),
        true
    );
    assert.equal(
        PenjualanController.validasiInputPenjualan([
            { idProduk: 1, jumlahTerjual: 1000, jumlahTersisa: 1000 }
        ]),
        true
    );
    assert.equal(
        PenjualanController.validasiInputPenjualan([
            { idProduk: 1, jumlahTerjual: 1001, jumlahTersisa: 0 }
        ]),
        false
    );
    assert.equal(
        PenjualanController.validasiInputPenjualan([
            { idProduk: 1, jumlahTerjual: 0, jumlahTersisa: 1001 }
        ]),
        false
    );
});

test('C24-UT03 validasiInputPenjualan menolak data kosong, id tidak ada, dan angka tidak valid', () => {
    const valid = { idProduk: 1, jumlahTerjual: 1, jumlahTersisa: 0 };

    assert.equal(PenjualanController.validasiInputPenjualan([]), false);
    assert.equal(PenjualanController.validasiInputPenjualan('bukan array'), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ ...valid, idProduk: null }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ ...valid, idProduk: undefined }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ ...valid, jumlahTerjual: 1.5 }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ ...valid, jumlahTerjual: -1 }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ ...valid, jumlahTerjual: NaN }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ ...valid, jumlahTersisa: 1.5 }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ ...valid, jumlahTersisa: -1 }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ ...valid, jumlahTersisa: NaN }]), false);
});

test('C24-UT04 simpanDataPenjualan menyimpan beberapa produk hari ini', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik, 'Nasi C24');
    const p2 = buatProduk(idPemilik, 'Ayam C24');

    PenjualanController.simpanDataPenjualan([
        { idProduk: p1, jumlahTerjual: 10, jumlahTersisa: 2 },
        { idProduk: p2, jumlahTerjual: 0, jumlahTersisa: 5 }
    ]);

    const a = ambilBaris(p1);
    const b = ambilBaris(p2);

    assert.ok(a);
    assert.ok(b);
    assert.equal(a.jumlah_terjual, 10);
    assert.equal(a.jumlah_tersisa, 2);
    assert.equal(b.jumlah_terjual, 0);
    assert.equal(b.jumlah_tersisa, 5);
});

test('C24-UT05 simpanDataPenjualan menerima nilai batas dan memperbarui baris yang sama', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik);

    PenjualanController.simpanDataPenjualan([
        { idProduk: p1, jumlahTerjual: 0, jumlahTersisa: 0 }
    ]);
    PenjualanController.simpanDataPenjualan([
        { idProduk: p1, jumlahTerjual: 1000, jumlahTersisa: 1000 }
    ]);

    const rows = db.prepare(
        'SELECT * FROM data_penjualan WHERE id_produk = ?'
    ).all(p1);

    assert.equal(rows.length, 1);
    assert.equal(rows[0].jumlah_terjual, 1000);
    assert.equal(rows[0].jumlah_tersisa, 1000);
});

test('C24-UT06 simpanDataPenjualan menolak data tidak valid tanpa menyimpan baris', () => {
    const { idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik);
    const sebelum = hitungBaris();

    assert.throws(
        () => PenjualanController.simpanDataPenjualan([]),
        /Format isian penjualan tidak valid\./
    );
    assert.throws(
        () => PenjualanController.simpanDataPenjualan([
            { idProduk: p1, jumlahTerjual: -1, jumlahTersisa: 0 }
        ]),
        /Format isian penjualan tidak valid\./
    );
    assert.throws(
        () => PenjualanController.simpanDataPenjualan([
            { idProduk: 999999, jumlahTerjual: 1, jumlahTersisa: 0 }
        ]),
        /FOREIGN KEY constraint failed/
    );

    assert.equal(hitungBaris(), sebelum);
});

test('C24-UT07 handler form, halaman tersimpan, dan submit penjualan memberi respons sesuai', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const p1 = buatProduk(idPemilik, 'Nasi C24');
    const p2 = buatProduk(idPemilik, 'Ayam C24');

    DataPenjualan.catatPenjualan([
        { idProduk: p1, jumlahTerjual: 4, jumlahTersisa: 2 }
    ]);

    const resForm = resPalsu();
    PenjualanController.tampilkanFormPenjualan(
        reqPalsu({ user: { idPemilik } }),
        resForm
    );

    assert.equal(resForm.rendered.view, 'fnb/I06-PenjualanHarian');
    assert.equal(resForm.rendered.data.daftarProduk.length, 2);
    assert.equal(resForm.rendered.data.daftarProduk[0].jumlahTerjual, 4);
    assert.equal(resForm.rendered.data.daftarProduk[1].jumlahTerjual, null);
    assert.equal(resForm.rendered.data.error, null);
    assert.equal(resForm.rendered.data.progres.terisi, 1);
    assert.equal(resForm.rendered.data.progres.target, 7);
    assert.equal(resForm.rendered.data.persen, 14);
    assert.ok(resForm.rendered.data.tanggalTampil);

    const resTersimpan = resPalsu();
    PenjualanController.tampilkanPenjualanTersimpan(
        reqPalsu({ user: { idPemilik } }),
        resTersimpan
    );

    assert.equal(resTersimpan.rendered.view, 'fnb/I07-PenjualanTersimpan');
    assert.equal(resTersimpan.rendered.data.progres.terisi, 1);

    const resInvalid = resPalsu();
    PenjualanController.kirimDataPenjualan(
        reqPalsu({
            user: { idAkun, idPemilik },
            body: {
                [`terjual_${p1}`]: '4',
                [`tersisa_${p1}`]: ''
            }
        }),
        resInvalid
    );

    assert.equal(resInvalid.statusCode, 400);
    assert.equal(resInvalid.rendered.view, 'fnb/I06-PenjualanHarian');
    assert.match(resInvalid.rendered.data.error, /Jumlah tersisa untuk Nasi C24/);
    assert.equal(resInvalid.rendered.data.old[`terjual_${p1}`], '4');

    const resValid = resPalsu();
    PenjualanController.kirimDataPenjualan(
        reqPalsu({
            user: { idAkun, idPemilik },
            body: {
                [`terjual_${p1}`]: '4',
                [`tersisa_${p1}`]: '2',
                [`terjual_${p2}`]: '0',
                [`tersisa_${p2}`]: '1000'
            }
        }),
        resValid
    );

    assert.equal(resValid.redirectUrl, '/fnb/penjualan/tersimpan');
    assert.equal(ambilBaris(p1).jumlah_terjual, 4);
    assert.equal(ambilBaris(p2).jumlah_tersisa, 1000);

    const log = db.prepare(
        'SELECT aktivitas FROM log_aktivitas WHERE id_akun = ? ORDER BY id_log DESC LIMIT 1'
    ).get(idAkun);
    assert.equal(log.aktivitas, 'Mencatat penjualan harian hari ini');
});