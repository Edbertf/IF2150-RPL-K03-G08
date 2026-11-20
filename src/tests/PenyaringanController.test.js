const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c34-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const SurplusController = require('../controllers/SurplusController');

const LOKASI_PENGGUNA = '-6.9,107.61';
const LOKASI_DEKAT = '-6.9001,107.6101';
const LOKASI_JAUH = '-6.95,107.65';

let urut = 0;

function batasHari(offsetHari) {
    const bagian = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
        .formatToParts(Date.now() + offsetHari * 24 * 60 * 60 * 1000)
        .reduce((hasil, item) => ({ ...hasil, [item.type]: item.value }), {});

    return `${bagian.year}-${bagian.month}-${bagian.day} 23:59:59`;
}

function buatPemilik(alamat) {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c34-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C34 ${urut}`,
        alamatUsaha: alamat,
        jamOperasional: '08.00-20.00'
    });

    return PemilikFnB.cariBerdasarkanAkun(idAkun).idPemilik;
}

function buatSurplus({
    idPemilik,
    nama,
    kategori = 'Makanan',
    batasWaktu = batasHari(0)
}) {
    const idProduk = Number(
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(idPemilik, nama, kategori).lastInsertRowid
    );

    db.prepare(`
        INSERT INTO metode_distribusi_surplus (id_produk, jenis_distribusi, harga)
        VALUES (?, 'Donasi', 0)
    `).run(idProduk);

    db.prepare(`
        INSERT INTO produk_surplus
            (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status)
        VALUES (?, ?, 3, ?, 'tersedia')
    `).run(idProduk, idPemilik, batasWaktu);
}

function kosongkanSurplus() {
    db.prepare('DELETE FROM produk_surplus').run();
}

function resPalsu() {
    const hasil = { status: 200, view: null, data: null };

    const res = {
        status(kode) {
            hasil.status = kode;
            return res;
        },
        render(view, data) {
            hasil.view = view;
            hasil.data = data;
            return res;
        }
    };

    return { hasil, res };
}

async function jalankanDaftar(query) {
    const { hasil, res } = resPalsu();

    await SurplusController.tampilkanDaftarSurplus(
        { user: { lokasi: LOKASI_PENGGUNA }, query },
        res
    );

    return hasil;
}

const idDekat = buatPemilik(LOKASI_DEKAT);
const idJauh = buatPemilik(LOKASI_JAUH);

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

// C34 diimplementasikan sebagai helper privat di SurplusController.js;
// pengujian dilakukan melalui handler tampilkanDaftarSurplus().
test('C34-UT01 saringProdukSurplus() menerapkan kata kunci, jenis, jarak, dan waktu secara AND', async () => {
    kosongkanSurplus();

    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Nasi Rendang',
        kategori: 'Makanan',
        batasWaktu: batasHari(0)
    });
    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Es Teh',
        kategori: 'Minuman',
        batasWaktu: batasHari(0)
    });
    buatSurplus({
        idPemilik: idJauh,
        nama: 'C34 Nasi Jauh',
        kategori: 'Makanan',
        batasWaktu: batasHari(1)
    });

    const hasil = await jalankanDaftar({
        q: '  c34 NASI  ',
        jenis: 'Makanan',
        jarak: '2',
        waktu: 'hari-ini'
    });

    assert.equal(hasil.status, 200);
    assert.equal(hasil.data.totalTersedia, 3);
    assert.deepEqual(
        hasil.data.daftar.map((item) => item.namaProduk),
        ['C34 Nasi Rendang']
    );
    assert.equal(hasil.data.jenisAktif, 'Makanan');
    assert.equal(hasil.data.jarakAktif, 2);
    assert.equal(hasil.data.waktuAktif, 'hari-ini');
    assert.equal(hasil.data.totalDitampilkan, 1);
    assert.equal(hasil.data.adaFilter, true);
});

test('C34-UT02 saringProdukSurplus() mengembalikan semua saat kriteria kosong serta mendukung batas jarak 10 km dan waktu besok', async () => {
    kosongkanSurplus();

    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Hari Ini',
        batasWaktu: batasHari(0)
    });
    buatSurplus({
        idPemilik: idJauh,
        nama: 'C34 Besok',
        batasWaktu: batasHari(1)
    });

    const semua = await jalankanDaftar({});

    assert.equal(semua.data.totalTersedia, 2);
    assert.equal(semua.data.totalDitampilkan, 2);
    assert.equal(semua.data.adaFilter, false);

    const spasi = await jalankanDaftar({ q: '   ' });

    assert.equal(spasi.data.kataKunci, '');
    assert.equal(spasi.data.totalDitampilkan, 2);
    assert.equal(spasi.data.adaFilter, false);

    const batas = await jalankanDaftar({ jarak: '10', waktu: 'besok' });

    assert.deepEqual(
        batas.data.daftar.map((item) => item.namaProduk),
        ['C34 Besok']
    );
    assert.equal(batas.data.jarakAktif, 10);
    assert.equal(batas.data.waktuAktif, 'besok');
    assert.equal(batas.data.totalDitampilkan, 1);
});

test('C34-UT03 saringProdukSurplus() mengabaikan kriteria tidak valid dan menangani hasil kosong', async () => {
    kosongkanSurplus();

    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Produk Valid',
        batasWaktu: batasHari(0)
    });

    const tidakValid = await jalankanDaftar({
        jenis: 'Lainnya',
        jarak: '3',
        waktu: 'kemarin'
    });

    assert.equal(tidakValid.data.jenisAktif, '');
    assert.equal(tidakValid.data.jarakAktif, null);
    assert.equal(tidakValid.data.waktuAktif, '');
    assert.equal(tidakValid.data.adaFilter, false);
    assert.equal(tidakValid.data.galat, null);
    assert.deepEqual(
        tidakValid.data.daftar.map((item) => item.namaProduk),
        ['C34 Produk Valid']
    );

    const kosong = await jalankanDaftar({ q: 'zzz-tidak-ada' });

    assert.equal(kosong.data.totalTersedia, 1);
    assert.equal(kosong.data.totalDitampilkan, 0);
    assert.deepEqual(kosong.data.daftar, []);
    assert.equal(kosong.data.galat, null);
});

test('C34-UT04 cariProdukSurplus() mencocokkan kata kunci tanpa membedakan huruf besar/kecil', async () => {
    kosongkanSurplus();

    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Ayam Geprek',
        kategori: 'Makanan',
        batasWaktu: batasHari(0)
    });
    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Kopi Susu',
        kategori: 'Minuman',
        batasWaktu: batasHari(0)
    });

    const hasil = await jalankanDaftar({ q: 'ayam GEPREK' });

    assert.equal(hasil.data.totalTersedia, 2);
    assert.equal(hasil.data.totalDitampilkan, 1);
    assert.deepEqual(
        hasil.data.daftar.map((item) => item.namaProduk),
        ['C34 Ayam Geprek']
    );
});

test('C34-UT05 cariProdukSurplus() mengembalikan seluruh daftar untuk kata kunci kosong atau spasi', async () => {
    kosongkanSurplus();

    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Ayam Geprek',
        kategori: 'Makanan',
        batasWaktu: batasHari(0)
    });
    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Kopi Susu',
        kategori: 'Minuman',
        batasWaktu: batasHari(0)
    });

    const kosong = await jalankanDaftar({ q: '' });

    assert.equal(kosong.data.kataKunci, '');
    assert.equal(kosong.data.daftar.length, 2);

    const spasi = await jalankanDaftar({ q: '    ' });

    assert.equal(spasi.data.kataKunci, '');
    assert.equal(spasi.data.daftar.length, 2);

    const trim = await jalankanDaftar({ q: '  ayam  ' });

    assert.deepEqual(
        trim.data.daftar.map((item) => item.namaProduk),
        ['C34 Ayam Geprek']
    );
});

test('C34-UT06 cariProdukSurplus() mengembalikan array kosong saat kata kunci tidak cocok', async () => {
    kosongkanSurplus();

    buatSurplus({
        idPemilik: idDekat,
        nama: 'C34 Produk Satu',
        batasWaktu: batasHari(0)
    });

    const hasil = await jalankanDaftar({ q: 'tidak-ada-produk-ini' });

    assert.equal(hasil.data.totalTersedia, 1);
    assert.equal(hasil.data.totalDitampilkan, 0);
    assert.deepEqual(hasil.data.daftar, []);
    assert.equal(hasil.data.galat, null);
});