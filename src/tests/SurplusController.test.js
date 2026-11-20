const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c27-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const SurplusController = require('../controllers/SurplusController');

const BATAS_DEPAN = '2099-01-01 12:00';
const BATAS_LEWAT = '2020-01-01 12:00';

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
        email: `c27-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C27 ${urut}`,
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
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(idPemilik, nama, kategori).lastInsertRowid
    );

    if (jenisDistribusi) {
        db.prepare(`
            INSERT INTO metode_distribusi_surplus
                (id_produk, jenis_distribusi, harga)
            VALUES (?, ?, ?)
        `).run(idProduk, jenisDistribusi, harga);
    }

    const idSurplus = Number(
        db.prepare(`
            INSERT INTO produk_surplus
                (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status)
            VALUES (?, ?, ?, ?, ?)
        `).run(idProduk, idPemilik, jumlah, batasWaktu, status).lastInsertRowid
    );

    return { idSurplus, idProduk };
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

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C27-UT01 ambilDaftarSurplus() mengembalikan surplus tersedia yang belum lewat dan urut jarak', async () => {
    const dekat = buatPemilik('-6.9001,107.6101');
    const jauh = buatPemilik('-6.95,107.65');

    const surplusDekat = buatSurplus({
        idPemilik: dekat,
        nama: 'C27 Roti Dekat',
        jumlah: 4,
        jenisDistribusi: 'Donasi'
    });
    const surplusJauh = buatSurplus({
        idPemilik: jauh,
        nama: 'C27 Kopi Jauh',
        kategori: 'Minuman',
        jumlah: 6,
        jenisDistribusi: 'Jual Diskon',
        harga: 8000
    });
    const surplusLewat = buatSurplus({
        idPemilik: dekat,
        nama: 'C27 Surplus Lewat',
        batasWaktu: BATAS_LEWAT
    });
    const surplusTerklaim = buatSurplus({
        idPemilik: dekat,
        nama: 'C27 Surplus Terklaim',
        status: 'terklaim'
    });

    const daftar = await SurplusController.ambilDaftarSurplus('-6.9,107.61');
    const indeksDekat = daftar.findIndex((item) => item.idSurplus === surplusDekat.idSurplus);
    const indeksJauh = daftar.findIndex((item) => item.idSurplus === surplusJauh.idSurplus);

    assert.ok(indeksDekat >= 0 && indeksJauh >= 0);
    assert.ok(indeksDekat < indeksJauh);
    assert.ok(!daftar.some((item) => item.idSurplus === surplusLewat.idSurplus));
    assert.ok(!daftar.some((item) => item.idSurplus === surplusTerklaim.idSurplus));

    assert.equal(daftar[indeksDekat].badgeTeks, 'Donasi');
    assert.equal(daftar[indeksDekat].jumlahTampil, '4 porsi');
    assert.equal(daftar[indeksJauh].badgeTeks, 'Rp 8.000');
    assert.equal(daftar[indeksJauh].jumlahTampil, '6 gelas');
    assert.ok(daftar[indeksDekat].jarakProduk <= daftar[indeksJauh].jarakProduk);
});

test('C27-UT02 ambilDaftarSurplus() menangani lokasi kosong dan usaha tanpa alamat', async () => {
    const tanpaAlamat = buatPemilik('');
    const denganAlamat = buatPemilik('-6.9001,107.6101');

    const surplusTanpaAlamat = buatSurplus({
        idPemilik: tanpaAlamat,
        nama: 'C27 Tanpa Alamat',
        kategori: 'Lainnya',
        jenisDistribusi: null
    });
    const surplusDenganAlamat = buatSurplus({
        idPemilik: denganAlamat,
        nama: 'C27 Dengan Alamat',
        jenisDistribusi: 'Donasi'
    });

    const daftar = await SurplusController.ambilDaftarSurplus('-6.9,107.61');
    const itemTanpa = daftar.find((item) => item.idSurplus === surplusTanpaAlamat.idSurplus);
    const itemDengan = daftar.find((item) => item.idSurplus === surplusDenganAlamat.idSurplus);

    assert.ok(itemTanpa && itemDengan);
    assert.equal(itemTanpa.jarakProduk, null);
    assert.equal(itemTanpa.jarakTampil, 'Jarak belum tersedia');
    assert.equal(itemTanpa.jumlahTampil, '3 item');
    assert.equal(itemTanpa.badgeTeks, 'Metode belum diatur');
    assert.equal(daftar[daftar.length - 1].idSurplus, surplusTanpaAlamat.idSurplus);
    assert.ok(itemDengan.jarakProduk !== null);

    const daftarTanpaLokasi = await SurplusController.ambilDaftarSurplus('');
    const itemTanpaLokasi = daftarTanpaLokasi.find(
        (item) => item.idSurplus === surplusDenganAlamat.idSurplus
    );

    assert.equal(itemTanpaLokasi.jarakProduk, null);
    assert.equal(itemTanpaLokasi.jarakTampil, 'Jarak belum tersedia');
});

test('C27-UT03 ambilDaftarSurplus() mengembalikan array kosong tanpa surplus layak', async () => {
    kosongkanSurplus();

    const idPemilik = buatPemilik('-6.9,107.61');
    buatSurplus({
        idPemilik,
        nama: 'C27 Lewat',
        batasWaktu: BATAS_LEWAT
    });
    buatSurplus({
        idPemilik,
        nama: 'C27 Terklaim',
        status: 'terklaim'
    });

    const hasil = await SurplusController.ambilDaftarSurplus('-6.9,107.61');

    assert.deepEqual(hasil, []);
});

test('C27-UT04 ambilDetailSurplus() mengembalikan detail lengkap dengan jarak dan harga', async () => {
    const idPemilik = buatPemilik('-6.9001,107.6101');
    const surplus = buatSurplus({
        idPemilik,
        nama: 'C27 Mie Goreng',
        jumlah: 3,
        jenisDistribusi: 'Jual Diskon',
        harga: 12000
    });

    const detail = await SurplusController.ambilDetailSurplus(
        surplus.idSurplus,
        '-6.9,107.61'
    );

    assert.equal(detail.idSurplus, surplus.idSurplus);
    assert.equal(detail.namaProduk, 'C27 Mie Goreng');
    assert.equal(detail.jumlahTampil, '3 porsi');
    assert.equal(detail.badgeTeks, 'Rp 12.000');
    assert.equal(detail.badgeKelas, 'harga');
    assert.ok(detail.jarakProduk !== null);
    assert.match(detail.jarakTampil, /km$/);
});

test('C27-UT05 ambilDetailSurplus() menangani batas waktu kosong, tanpa metode, dan surplus lewat', async () => {
    const idPemilik = buatPemilik('');

    const tanpaData = buatSurplus({
        idPemilik,
        nama: 'C27 Tanpa Data',
        kategori: 'Lainnya',
        batasWaktu: '',
        jenisDistribusi: null
    });
    const lewat = buatSurplus({
        idPemilik,
        nama: 'C27 Detail Lewat',
        batasWaktu: BATAS_LEWAT,
        jenisDistribusi: 'Donasi'
    });

    const detail = await SurplusController.ambilDetailSurplus(tanpaData.idSurplus, '');

    assert.equal(detail.jarakProduk, null);
    assert.equal(detail.jarakTampil, 'Jarak belum tersedia');
    assert.equal(detail.batasWaktuTampil, '-');
    assert.equal(detail.sisaWaktuTampil, '');
    assert.equal(detail.badgeTeks, 'Metode belum diatur');
    assert.equal(detail.jumlahTampil, '3 item');

    const detailLewat = await SurplusController.ambilDetailSurplus(lewat.idSurplus, '');

    assert.equal(detailLewat.sisaWaktuTampil, 'sudah lewat');
});

test('C27-UT06 ambilDetailSurplus() menolak id tidak valid dan id tidak ditemukan', async () => {
    await assert.rejects(
        () => SurplusController.ambilDetailSurplus(0, '-6.9,107.61'),
        /ID produk surplus tidak valid\./
    );

    await assert.rejects(
        () => SurplusController.ambilDetailSurplus('abc', '-6.9,107.61'),
        /ID produk surplus tidak valid\./
    );

    await assert.rejects(
        () => SurplusController.ambilDetailSurplus(999999, '-6.9,107.61'),
        /Produk surplus tidak ditemukan\./
    );
});

test('C27-UT07 urutkanBerdasarkanJarak() mengurutkan dari jarak terdekat', () => {
    const hasil = SurplusController.urutkanBerdasarkanJarak([
        { idSurplus: 1, jarakProduk: 5 },
        { idSurplus: 2, jarakProduk: 1 },
        { idSurplus: 3, jarakProduk: 3 }
    ]);

    assert.deepEqual(
        hasil.map((item) => item.idSurplus),
        [2, 3, 1]
    );
});

test('C27-UT08 urutkanBerdasarkanJarak() menempatkan jarak kosong terakhir dan memakai id untuk nilai sama', () => {
    const hasil = SurplusController.urutkanBerdasarkanJarak([
        { idSurplus: 1, jarakProduk: null },
        { idSurplus: 2, jarakProduk: 2 },
        { idSurplus: 3, jarakProduk: 2 },
        { idSurplus: 4, jarakProduk: null }
    ]);

    assert.deepEqual(
        hasil.map((item) => item.idSurplus),
        [2, 3, 1, 4]
    );
});

test('C27-UT09 urutkanBerdasarkanJarak() mengembalikan array kosong dan tidak mengubah input', () => {
    assert.deepEqual(SurplusController.urutkanBerdasarkanJarak([]), []);

    const awal = [
        { idSurplus: 1, jarakProduk: null },
        { idSurplus: 2, jarakProduk: 1 }
    ];
    const salinan = [...awal];
    const hasil = SurplusController.urutkanBerdasarkanJarak(awal);

    assert.deepEqual(awal, salinan);
    assert.notEqual(hasil, awal);
    assert.deepEqual(
        hasil.map((item) => item.idSurplus),
        [2, 1]
    );
});

test('C27-UT10 tampilkanDaftarSurplus() menerapkan filter dan menangani hasil kosong', async () => {
    const idPemilik = buatPemilik('-6.9001,107.6101');

    buatSurplus({
        idPemilik,
        nama: 'C27 Uji Roti',
        kategori: 'Makanan',
        batasWaktu: batasHari(0)
    });
    buatSurplus({
        idPemilik,
        nama: 'C27 Uji Kopi',
        kategori: 'Minuman',
        batasWaktu: batasHari(1)
    });

    let { hasil, res } = resPalsu();
    await SurplusController.tampilkanDaftarSurplus(
        {
            user: { lokasi: '-6.9,107.61' },
            query: {
                q: 'C27 Uji',
                jenis: 'Makanan',
                jarak: '2',
                waktu: 'hari-ini'
            }
        },
        res
    );

    assert.equal(hasil.view, 'ngo/I12-DaftarSurplus');
    assert.deepEqual(
        hasil.data.daftar.map((item) => item.namaProduk),
        ['C27 Uji Roti']
    );
    assert.equal(hasil.data.adaFilter, true);
    assert.equal(hasil.data.tautan.hapus, '/ngo/surplus');

    ({ hasil, res } = resPalsu());
    await SurplusController.tampilkanDaftarSurplus(
        {
            user: { lokasi: '-6.9,107.61' },
            query: { q: 'zzz-tidak-ada' }
        },
        res
    );

    assert.equal(hasil.data.daftar.length, 0);
    assert.equal(hasil.data.totalDitampilkan, 0);
    assert.equal(hasil.data.galat, null);

    ({ hasil, res } = resPalsu());
    await SurplusController.tampilkanDaftarSurplus(
        {
            user: { lokasi: '-6.9,107.61' },
            query: { jenis: 'Lainnya', jarak: '3', waktu: 'kemarin' }
        },
        res
    );

    assert.equal(hasil.data.jenisAktif, '');
    assert.equal(hasil.data.jarakAktif, null);
    assert.equal(hasil.data.waktuAktif, '');
    assert.equal(hasil.data.adaFilter, false);
});

test('C27-UT11 tampilkanDetailSurplus() merender detail dan menangani 404', async () => {
    const idPemilik = buatPemilik('-6.9001,107.6101');
    const surplus = buatSurplus({
        idPemilik,
        nama: 'C27 Detail Handler',
        jenisDistribusi: 'Jual Diskon',
        harga: 12000
    });

    let { hasil, res } = resPalsu();
    await SurplusController.tampilkanDetailSurplus(
        {
            user: { lokasi: '-6.9,107.61' },
            params: { idSurplus: String(surplus.idSurplus) }
        },
        res
    );

    assert.equal(hasil.status, 200);
    assert.equal(hasil.view, 'ngo/I15-DetailProduk');
    assert.equal(hasil.data.tidakDitemukan, false);
    assert.equal(hasil.data.detail.badgeTeks, 'Rp 12.000');

    ({ hasil, res } = resPalsu());
    await SurplusController.tampilkanDetailSurplus(
        {
            user: { lokasi: '-6.9,107.61' },
            params: { idSurplus: '999999' }
        },
        res
    );

    assert.equal(hasil.status, 404);
    assert.equal(hasil.view, 'ngo/I15-DetailProduk');
    assert.equal(hasil.data.tidakDitemukan, true);
    assert.ok(hasil.data.pesan);
});