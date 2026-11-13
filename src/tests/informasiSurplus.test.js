const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-surplus-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const SurplusController = require('../controllers/SurplusController');

const BATAS_DEPAN = '2099-01-01 12:00';
const BATAS_LEWAT = '2020-01-01 12:00';

let urut = 0;

function buatPemilik(alamat) {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `surplus-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha Surplus ${urut}`,
        alamatUsaha: alamat,
        jamOperasional: '08.00-20.00'
    });

    return PemilikFnB.cariBerdasarkanAkun(idAkun).idPemilik;
}

function buatSurplus({
    idPemilik,
    nama,
    kategori = 'Makanan',
    jumlah = 3,
    batasWaktu = BATAS_DEPAN,
    status = 'tersedia',
    jenisDistribusi = 'Donasi',
    harga = 0
}) {
    const idProduk = Number(
        db.prepare('INSERT INTO produk (id_pemilik, nama_produk, kategori) VALUES (?, ?, ?)')
            .run(idPemilik, nama, kategori).lastInsertRowid
    );

    db.prepare(`
        INSERT INTO metode_distribusi_surplus (id_produk, jenis_distribusi, harga)
        VALUES (?, ?, ?)
    `).run(idProduk, jenisDistribusi, harga);

    const idSurplus = Number(
        db.prepare(`
            INSERT INTO produk_surplus
                (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status)
            VALUES (?, ?, ?, ?, ?)
        `).run(idProduk, idPemilik, jumlah, batasWaktu, status).lastInsertRowid
    );

    return { idSurplus, idProduk };
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

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('daftar hanya memuat surplus tersedia yang belum lewat batas waktu', async () => {
    const idPemilik = buatPemilik('-6.9,107.61');
    const tersedia = buatSurplus({ idPemilik, nama: 'Nasi Goreng' });
    buatSurplus({ idPemilik, nama: 'Ayam Terklaim', status: 'terklaim' });
    buatSurplus({ idPemilik, nama: 'Soto Lewat', batasWaktu: BATAS_LEWAT });

    const daftar = await SurplusController.ambilDaftarSurplus('-6.9,107.61');

    assert.ok(daftar.some((item) => item.idSurplus === tersedia.idSurplus));
    assert.ok(!daftar.some((item) => item.namaProduk === 'Ayam Terklaim'));
    assert.ok(!daftar.some((item) => item.namaProduk === 'Soto Lewat'));
});

test('daftar diurutkan dari jarak terdekat dan memuat info distribusi', async () => {
    const dekat = buatPemilik('-6.9001,107.6101');
    const jauh = buatPemilik('-6.95,107.65');

    const surplusDekat = buatSurplus({
        idPemilik: dekat,
        nama: 'Roti Dekat',
        jumlah: 4,
        jenisDistribusi: 'Donasi'
    });
    const surplusJauh = buatSurplus({
        idPemilik: jauh,
        nama: 'Kopi Jauh',
        kategori: 'Minuman',
        jumlah: 6,
        jenisDistribusi: 'Jual Diskon',
        harga: 8000
    });

    const daftar = await SurplusController.ambilDaftarSurplus('-6.9,107.61');
    const indeksDekat = daftar.findIndex((item) => item.idSurplus === surplusDekat.idSurplus);
    const indeksJauh = daftar.findIndex((item) => item.idSurplus === surplusJauh.idSurplus);

    assert.ok(indeksDekat >= 0 && indeksJauh >= 0);
    assert.ok(indeksDekat < indeksJauh);
    assert.ok(daftar[indeksDekat].jarakProduk <= daftar[indeksJauh].jarakProduk);

    const roti = daftar[indeksDekat];
    assert.equal(roti.badgeTeks, 'Donasi');
    assert.equal(roti.jumlahTampil, '4 porsi');

    const kopi = daftar[indeksJauh];
    assert.equal(kopi.badgeTeks, 'Rp 8.000');
    assert.equal(kopi.jumlahTampil, '6 gelas');
});

test('produk tanpa alamat yang bisa dihitung tampil terakhir tanpa jarak', async () => {
    const idPemilik = buatPemilik('');
    const surplus = buatSurplus({ idPemilik, nama: 'Produk Tanpa Jarak' });

    const daftar = await SurplusController.ambilDaftarSurplus('-6.9,107.61');
    const item = daftar.find((baris) => baris.idSurplus === surplus.idSurplus);

    assert.ok(item);
    assert.equal(item.jarakProduk, null);
    assert.equal(item.jarakTampil, 'Jarak belum tersedia');
    assert.equal(daftar[daftar.length - 1].idSurplus, surplus.idSurplus);
});

test('pencarian kata kunci menyaring daftar pada halaman I-12', async () => {
    const idPemilik = buatPemilik('-6.9,107.61');
    buatSurplus({ idPemilik, nama: 'Nasi Uduk' });
    buatSurplus({ idPemilik, nama: 'Es Jeruk', kategori: 'Minuman' });

    const { hasil, res } = resPalsu();

    await SurplusController.tampilkanDaftarSurplus(
        { user: { lokasi: '-6.9,107.61' }, query: { q: 'nasi' } },
        res
    );

    assert.equal(hasil.view, 'ngo/I12-DaftarSurplus');
    assert.ok(hasil.data.daftar.length > 0);
    assert.ok(hasil.data.daftar.every((item) => item.namaProduk.toLowerCase().includes('nasi')));
});

test('detail surplus memuat metode distribusi, harga, dan jarak', async () => {
    const idPemilik = buatPemilik('-6.9001,107.6101');
    const surplus = buatSurplus({
        idPemilik,
        nama: 'Mie Goreng',
        jenisDistribusi: 'Jual Diskon',
        harga: 12000
    });

    const { hasil, res } = resPalsu();

    await SurplusController.tampilkanDetailSurplus(
        { user: { lokasi: '-6.9,107.61' }, params: { idSurplus: String(surplus.idSurplus) } },
        res
    );

    assert.equal(hasil.status, 200);
    assert.equal(hasil.view, 'ngo/I15-DetailProduk');
    assert.equal(hasil.data.tidakDitemukan, false);
    assert.equal(hasil.data.detail.badgeTeks, 'Rp 12.000');
    assert.ok(hasil.data.detail.jarakProduk !== null);
});

test('detail surplus yang tidak ada mengembalikan halaman 404', async () => {
    const { hasil, res } = resPalsu();

    await SurplusController.tampilkanDetailSurplus(
        { user: { lokasi: '-6.9,107.61' }, params: { idSurplus: '999999' } },
        res
    );

    assert.equal(hasil.status, 404);
    assert.equal(hasil.data.tidakDitemukan, true);
});
