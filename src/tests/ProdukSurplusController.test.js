const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c26-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const CatatSurplusController = require('../controllers/CatatSurplusController');
const DistribusiSurplusController = require('../controllers/DistribusiSurplusController');
const ProdukSurplus = require('../models/ProdukSurplus');
const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');

const BATAS_DEPAN = '2099-01-01T12:00';
const BATAS_DEPAN_DB = '2099-01-01 12:00';
const BATAS_LEWAT = '2020-01-01T12:00';

let urut = 0;
let nomorProduk = 0;

function buatPemilik() {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c26-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });

    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: `Usaha C26 ${urut}`,
        alamatUsaha: 'Jl. C26 No. 1, Bandung',
        jamOperasional: '08.00-20.00'
    });

    const idPemilik = PemilikFnB.cariBerdasarkanAkun(idAkun).idPemilik;
    return { idAkun, idPemilik };
}

function buatProduk(idPemilik, nama, kategori = 'Makanan') {
    nomorProduk += 1;
    return Number(db.prepare(`
        INSERT INTO produk (id_pemilik, nama_produk, kategori)
        VALUES (?, ?, ?)
    `).run(
        idPemilik,
        nama || `Produk C26 ${nomorProduk}`,
        kategori
    ).lastInsertRowid);
}

function buatSurplus({
    idPemilik,
    idProduk,
    jumlah = 3,
    batasWaktu = BATAS_DEPAN_DB,
    status = 'tersedia'
}) {
    const idSurplus = ProdukSurplus.simpanProdukSurplus({
        idProduk,
        idPemilik,
        jumlah,
        batasWaktu
    });

    if (status !== 'tersedia') {
        db.prepare(
            'UPDATE produk_surplus SET status = ? WHERE id_surplus = ?'
        ).run(status, idSurplus);
    }

    return idSurplus;
}

function ambilSurplus(idSurplus) {
    return db.prepare(
        'SELECT * FROM produk_surplus WHERE id_surplus = ?'
    ).get(idSurplus);
}

function ambilMetode(idProduk) {
    return db.prepare(
        'SELECT * FROM metode_distribusi_surplus WHERE id_produk = ?'
    ).get(idProduk);
}

function hitungSurplus() {
    return db.prepare('SELECT COUNT(*) AS jumlah FROM produk_surplus').get().jumlah;
}

function hitungMetode() {
    return db.prepare('SELECT COUNT(*) AS jumlah FROM metode_distribusi_surplus').get().jumlah;
}

function hitungLog(idAkun) {
    return db.prepare(
        'SELECT COUNT(*) AS jumlah FROM log_aktivitas WHERE id_akun = ?'
    ).get(idAkun).jumlah;
}

function logTerakhir(idAkun) {
    return db.prepare(`
        SELECT aktivitas FROM log_aktivitas
        WHERE id_akun = ?
        ORDER BY id_log DESC
        LIMIT 1
    `).get(idAkun);
}

function formatBatas(nilai) {
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(`${nilai.replace(' ', 'T')}+07:00`));
}

function reqPalsu({
    user = null,
    body = {},
    query = {},
    params = {},
    session = {}
} = {}) {
    return { user, body, query, params, session };
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

function jalankanSimpanData(user, body) {
    const res = resPalsu();
    CatatSurplusController.simpanDataSurplus(
        reqPalsu({ user, body }),
        res
    );
    return res;
}

function jalankanSimpanDistribusi(user, idSurplus, body) {
    const sesi = {};
    const res = resPalsu();

    DistribusiSurplusController.simpanDistribusi(reqPalsu({
        user,
        params: { id: String(idSurplus) },
        body,
        session: sesi
    }), res);

    return { res, sesi };
}

function idSurplusDari(res) {
    return Number(res.redirectUrl.split('/')[2]);
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C26-UT01 validasiDataSurplus() menerima data surplus valid', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C26');

    const res = jalankanSimpanData(
        { idAkun, idPemilik },
        {
            idProduk: String(idProduk),
            jumlah: '5',
            batasWaktu: BATAS_DEPAN
        }
    );

    assert.match(res.redirectUrl, /^\/surplus\/\d+\/donasi$/);

    const baris = ambilSurplus(idSurplusDari(res));
    assert.ok(baris);
    assert.equal(baris.id_produk, idProduk);
    assert.equal(baris.jumlah, 5);
});

test('C26-UT02 validasiDataSurplus() menerima jumlah minimum dan batas waktu depan', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Es Teh C26', 'Minuman');

    const res = jalankanSimpanData(
        { idAkun, idPemilik },
        {
            idProduk: String(idProduk),
            jumlah: '1',
            batasWaktu: BATAS_DEPAN
        }
    );

    assert.match(res.redirectUrl, /^\/surplus\/\d+\/donasi$/);
    assert.equal(ambilSurplus(idSurplusDari(res)).jumlah, 1);
    assert.equal(
        logTerakhir(idAkun).aktivitas,
        'Mencatat surplus Es Teh C26 (1 gelas)'
    );
});

test('C26-UT03 validasiDataSurplus() menolak isian kosong, jumlah tidak valid, tanggal lampau, dan produk tidak ditemukan', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const user = { idAkun, idPemilik };
    const sebelum = hitungSurplus();

    const kasus = [
        [{}, 'Semua isian wajib diisi.'],
        [{ idProduk: String(idProduk), jumlah: '', batasWaktu: BATAS_DEPAN }, 'Semua isian wajib diisi.'],
        [{ idProduk: String(idProduk), jumlah: '0', batasWaktu: BATAS_DEPAN }, 'Jumlah surplus harus lebih dari 0.'],
        [{ idProduk: String(idProduk), jumlah: '1.5', batasWaktu: BATAS_DEPAN }, 'Jumlah surplus harus lebih dari 0.'],
        [{ idProduk: String(idProduk), jumlah: '5', batasWaktu: BATAS_LEWAT }, 'Batas waktu tidak boleh di masa lalu.'],
        [{ idProduk: String(idProduk), jumlah: '5', batasWaktu: 'bukan-tanggal' }, 'Semua isian wajib diisi.'],
        [{ idProduk: String(idProduk), jumlah: '5', batasWaktu: '2020-99-99T12:00' }, 'Semua isian wajib diisi.'],
        [{ idProduk: '999999', jumlah: '5', batasWaktu: BATAS_DEPAN }, 'Produk tidak ditemukan.']
    ];

    for (const [body, pesan] of kasus) {
        const res = jalankanSimpanData(user, body);

        assert.equal(res.statusCode, 400);
        assert.equal(res.rendered.view, 'surplus/I08-CatatSurplus');
        assert.equal(res.rendered.data.error, pesan);
    }

    assert.equal(hitungSurplus(), sebelum);
});

test('C26-UT04 simpanDataSurplus() menyimpan surplus dan mencatat log porsi', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C26');

    const res = jalankanSimpanData(
        { idAkun, idPemilik },
        {
            idProduk: String(idProduk),
            jumlah: '5',
            batasWaktu: BATAS_DEPAN
        }
    );

    assert.match(res.redirectUrl, /^\/surplus\/\d+\/donasi$/);

    const baris = ambilSurplus(idSurplusDari(res));
    assert.equal(baris.id_pemilik, idPemilik);
    assert.equal(baris.batas_waktu_pengambilan, BATAS_DEPAN_DB);
    assert.equal(baris.status, 'tersedia');
    assert.equal(
        logTerakhir(idAkun).aktivitas,
        'Mencatat surplus Nasi C26 (5 porsi)'
    );
});

test('C26-UT05 simpanDataSurplus() menyimpan jumlah satu dengan status tersedia', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Roti C26');

    const res = jalankanSimpanData(
        { idAkun, idPemilik },
        {
            idProduk: String(idProduk),
            jumlah: '1',
            batasWaktu: BATAS_DEPAN
        }
    );

    const baris = ambilSurplus(idSurplusDari(res));
    assert.equal(baris.jumlah, 1);
    assert.equal(baris.status, 'tersedia');
    assert.equal(baris.batas_waktu_pengambilan, BATAS_DEPAN_DB);
});

test('C26-UT06 simpanDataSurplus() menolak produk milik pemilik lain', () => {
    const pemilikA = buatPemilik();
    const pemilikB = buatPemilik();
    const produkB = buatProduk(pemilikB.idPemilik, 'Produk B C26');
    const sebelum = hitungSurplus();

    const res = jalankanSimpanData(
        {
            idAkun: pemilikA.idAkun,
            idPemilik: pemilikA.idPemilik
        },
        {
            idProduk: String(produkB),
            jumlah: '2',
            batasWaktu: BATAS_DEPAN
        }
    );

    assert.equal(res.statusCode, 400);
    assert.equal(res.rendered.data.error, 'Produk tidak ditemukan.');
    assert.equal(hitungSurplus(), sebelum);
});

test('C26-UT07 tampilkanFormDistribusi() merender ringkasan surplus milik pemilik', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C26');
    const idSurplus = buatSurplus({ idPemilik, idProduk, jumlah: 4 });
    const res = resPalsu();

    DistribusiSurplusController.tampilFormDistribusi(reqPalsu({
        user: { idAkun, idPemilik },
        params: { id: String(idSurplus) }
    }), res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.rendered.view, 'surplus/I09-AturDistribusi');
    assert.equal(res.rendered.data.idSurplus, String(idSurplus));
    assert.equal(res.rendered.data.error, null);
    assert.deepEqual(res.rendered.data.data, {
        namaProduk: 'Nasi C26',
        jumlah: 4,
        ambilSebelum: formatBatas(BATAS_DEPAN_DB)
    });
});

test('C26-UT08 tampilkanFormDistribusi() menangani id nol dan batas waktu kosong/tidak valid', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C26');

    const resNol = resPalsu();
    DistribusiSurplusController.tampilFormDistribusi(reqPalsu({
        user: { idAkun, idPemilik },
        params: { id: '0' }
    }), resNol);

    assert.equal(resNol.statusCode, 404);
    assert.equal(resNol.rendered.data.error, 'Produk surplus tidak ditemukan.');

    const idKosong = buatSurplus({
        idPemilik,
        idProduk,
        batasWaktu: ''
    });
    const resKosong = resPalsu();
    DistribusiSurplusController.tampilFormDistribusi(reqPalsu({
        user: { idAkun, idPemilik },
        params: { id: String(idKosong) }
    }), resKosong);

    assert.equal(resKosong.statusCode, 200);
    assert.equal(resKosong.rendered.data.data.ambilSebelum, '-');

    const idAneh = buatSurplus({
        idPemilik,
        idProduk,
        batasWaktu: 'bukan tanggal'
    });
    const resAneh = resPalsu();
    DistribusiSurplusController.tampilFormDistribusi(reqPalsu({
        user: { idAkun, idPemilik },
        params: { id: String(idAneh) }
    }), resAneh);

    assert.equal(resAneh.statusCode, 200);
    assert.equal(resAneh.rendered.data.data.ambilSebelum, 'bukan tanggal');
});

test('C26-UT09 tampilkanFormDistribusi() mengembalikan 404 untuk surplus tidak ada atau milik pemilik lain', () => {
    const pemilikA = buatPemilik();
    const pemilikB = buatPemilik();
    const idProdukB = buatProduk(pemilikB.idPemilik, 'Produk B C26');
    const idSurplusB = buatSurplus({
        idPemilik: pemilikB.idPemilik,
        idProduk: idProdukB
    });

    const resTidakAda = resPalsu();
    DistribusiSurplusController.tampilFormDistribusi(reqPalsu({
        user: { idAkun: pemilikA.idAkun, idPemilik: pemilikA.idPemilik },
        params: { id: '999999' }
    }), resTidakAda);

    assert.equal(resTidakAda.statusCode, 404);
    assert.equal(resTidakAda.rendered.data.error, 'Produk surplus tidak ditemukan.');

    const resMilikLain = resPalsu();
    DistribusiSurplusController.tampilFormDistribusi(reqPalsu({
        user: { idAkun: pemilikA.idAkun, idPemilik: pemilikA.idPemilik },
        params: { id: String(idSurplusB) }
    }), resMilikLain);

    assert.equal(resMilikLain.statusCode, 404);
    assert.equal(resMilikLain.rendered.data.error, 'Produk surplus tidak ditemukan.');
});

test('C26-UT10 validasiMetodeDistribusi() menerima Donasi tanpa harga', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C26');
    const idSurplus = buatSurplus({ idPemilik, idProduk });

    const { res } = jalankanSimpanDistribusi(
        { idAkun, idPemilik },
        idSurplus,
        { metode: 'donasi' }
    );

    assert.equal(res.redirectUrl, '/surplus/sukses');
    assert.equal(ambilMetode(idProduk).jenis_distribusi, 'Donasi');
    assert.equal(ambilMetode(idProduk).harga, 0);
});

test('C26-UT11 validasiMetodeDistribusi() menerima Jual Diskon dengan harga minimum satu', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Ayam C26');
    const idSurplus = buatSurplus({ idPemilik, idProduk });

    const { res } = jalankanSimpanDistribusi(
        { idAkun, idPemilik },
        idSurplus,
        { metode: 'diskon', hargaJual: '1' }
    );

    assert.equal(res.redirectUrl, '/surplus/sukses');
    assert.equal(ambilMetode(idProduk).jenis_distribusi, 'Jual Diskon');
    assert.equal(ambilMetode(idProduk).harga, 1);
});

test('C26-UT12 validasiMetodeDistribusi() menolak diskon tanpa harga dan surplus tidak tersedia', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik);
    const idSurplus = buatSurplus({ idPemilik, idProduk });
    const user = { idAkun, idPemilik };
    const sebelumMetode = hitungMetode();
    const sebelumLog = hitungLog(idAkun);

    const nol = jalankanSimpanDistribusi(
        user,
        idSurplus,
        { metode: 'diskon', hargaJual: '0' }
    );
    assert.equal(nol.res.statusCode, 400);
    assert.equal(nol.res.rendered.data.error, 'Harga jual diskon harus lebih dari 0.');

    const kosong = jalankanSimpanDistribusi(
        user,
        idSurplus,
        { metode: 'diskon', hargaJual: '' }
    );
    assert.equal(kosong.res.statusCode, 400);
    assert.equal(kosong.res.rendered.data.error, 'Harga jual diskon harus lebih dari 0.');

    db.prepare(
        'UPDATE produk_surplus SET status = ? WHERE id_surplus = ?'
    ).run('terklaim', idSurplus);

    const terklaim = jalankanSimpanDistribusi(
        user,
        idSurplus,
        { metode: 'donasi' }
    );
    assert.equal(terklaim.res.statusCode, 400);
    assert.equal(terklaim.res.rendered.data.error, 'Surplus sudah tidak tersedia.');

    assert.equal(hitungMetode(), sebelumMetode);
    assert.equal(hitungLog(idAkun), sebelumLog);
});

test('C26-UT13 simpanMetodeDistribusi() menyimpan Donasi dan mengisi sesi sukses', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C26');
    const idSurplus = buatSurplus({ idPemilik, idProduk, jumlah: 4 });

    const { res, sesi } = jalankanSimpanDistribusi(
        { idAkun, idPemilik },
        idSurplus,
        { metode: 'donasi' }
    );

    assert.equal(res.redirectUrl, '/surplus/sukses');
    assert.deepEqual(sesi.suksesDistribusi, {
        namaProduk: 'Nasi C26',
        jumlah: 4,
        ambilSebelum: formatBatas(BATAS_DEPAN_DB),
        metode: 'donasi'
    });
    assert.equal(
        logTerakhir(idAkun).aktivitas,
        'Menetapkan distribusi surplus Nasi C26 sebagai Donasi'
    );
});

test('C26-UT14 simpanMetodeDistribusi() menyimpan harga diskon berformat ribuan', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Ayam C26');
    const idSurplus = buatSurplus({ idPemilik, idProduk });

    const { res } = jalankanSimpanDistribusi(
        { idAkun, idPemilik },
        idSurplus,
        { metode: 'diskon', hargaJual: 'Rp 8.000' }
    );

    assert.equal(res.redirectUrl, '/surplus/sukses');
    assert.equal(ambilMetode(idProduk).jenis_distribusi, 'Jual Diskon');
    assert.equal(ambilMetode(idProduk).harga, 8000);
    assert.equal(
        logTerakhir(idAkun).aktivitas,
        'Menetapkan distribusi surplus Ayam C26 sebagai Jual Diskon Rp 8.000'
    );
});

test('C26-UT15 simpanMetodeDistribusi() menolak id tidak ada dan surplus milik pemilik lain', () => {
    const pemilikA = buatPemilik();
    const pemilikB = buatPemilik();
    const idProdukA = buatProduk(pemilikA.idPemilik, 'Produk A C26');
    const idProdukB = buatProduk(pemilikB.idPemilik, 'Produk B C26');
    const idSurplusB = buatSurplus({
        idPemilik: pemilikB.idPemilik,
        idProduk: idProdukB
    });
    const userA = {
        idAkun: pemilikA.idAkun,
        idPemilik: pemilikA.idPemilik
    };
    const sebelumMetode = hitungMetode();
    const sebelumLog = hitungLog(pemilikA.idAkun);

    const tidakAda = jalankanSimpanDistribusi(
        userA,
        999999,
        { metode: 'donasi' }
    );
    assert.equal(tidakAda.res.statusCode, 404);
    assert.equal(tidakAda.res.rendered.data.error, 'Produk surplus tidak ditemukan.');

    const milikLain = jalankanSimpanDistribusi(
        userA,
        idSurplusB,
        { metode: 'donasi' }
    );
    assert.equal(milikLain.res.statusCode, 404);
    assert.equal(milikLain.res.rendered.data.error, 'Produk surplus tidak ditemukan.');

    assert.equal(ambilMetode(idProdukA), undefined);
    assert.equal(hitungMetode(), sebelumMetode);
    assert.equal(hitungLog(pemilikA.idAkun), sebelumLog);
});

test('C26-UT16 tampilFormCatat(), simpanProdukBaru(), tampilEditProduk(), simpanEditProduk(), dan tampilSukses() memberi respons sesuai', () => {
    const { idAkun, idPemilik } = buatPemilik();
    const idProduk = buatProduk(idPemilik, 'Nasi C26');
    const user = { idAkun, idPemilik };

    const resForm = resPalsu();
    CatatSurplusController.tampilFormCatat(
        reqPalsu({ user, query: {} }),
        resForm
    );

    assert.equal(resForm.rendered.view, 'surplus/I08-CatatSurplus');
    assert.equal(resForm.rendered.data.error, null);
    assert.equal(resForm.rendered.data.produkEdit, null);
    assert.ok(
        resForm.rendered.data.produkList.some(
            (item) => item.id_produk === idProduk
        )
    );

    const resEditForm = resPalsu();
    CatatSurplusController.tampilFormCatat(
        reqPalsu({ user, query: { edit: String(idProduk) } }),
        resEditForm
    );

    assert.equal(resEditForm.rendered.data.produkEdit.id_produk, idProduk);

    const jumlahProduk = () =>
        db.prepare(
            'SELECT COUNT(*) AS jumlah FROM produk WHERE id_pemilik = ?'
        ).get(idPemilik).jumlah;

    const sebelum = jumlahProduk();

    const resTambah = resPalsu();
    CatatSurplusController.simpanProdukBaru(reqPalsu({
        user,
        body: { namaProduk: 'Es Jeruk C26', kategori: 'Minuman' }
    }), resTambah);

    assert.equal(resTambah.redirectUrl, '/surplus/catat');
    assert.equal(jumlahProduk(), sebelum + 1);
    assert.equal(
        logTerakhir(idAkun).aktivitas,
        'Menambahkan produk Es Jeruk C26'
    );

    const resTambahKosong = resPalsu();
    CatatSurplusController.simpanProdukBaru(
        reqPalsu({ user, body: {} }),
        resTambahKosong
    );

    assert.equal(resTambahKosong.redirectUrl, '/surplus/catat');
    assert.equal(jumlahProduk(), sebelum + 1);

    const resEdit = resPalsu();
    CatatSurplusController.tampilEditProduk(reqPalsu({
        user,
        params: { id: String(idProduk) }
    }), resEdit);

    assert.equal(resEdit.rendered.data.produkEdit.id_produk, idProduk);

    const resEditTidakAda = resPalsu();
    CatatSurplusController.tampilEditProduk(reqPalsu({
        user,
        params: { id: '999999' }
    }), resEditTidakAda);

    assert.equal(resEditTidakAda.rendered.data.produkEdit, null);

    const resSimpanEdit = resPalsu();
    CatatSurplusController.simpanEditProduk(reqPalsu({
        user,
        params: { id: String(idProduk) },
        body: { namaProduk: 'Nasi Baru C26', kategori: 'Minuman' }
    }), resSimpanEdit);

    assert.equal(resSimpanEdit.redirectUrl, '/surplus/catat');

    const produk = db.prepare(
        'SELECT nama_produk, kategori FROM produk WHERE id_produk = ?'
    ).get(idProduk);

    assert.equal(produk.nama_produk, 'Nasi Baru C26');
    assert.equal(produk.kategori, 'Minuman');
    assert.equal(
        logTerakhir(idAkun).aktivitas,
        'Memperbarui produk Nasi Baru C26'
    );

    const resSimpanKosong = resPalsu();
    CatatSurplusController.simpanEditProduk(reqPalsu({
        user,
        params: { id: String(idProduk) },
        body: {}
    }), resSimpanKosong);

    assert.equal(resSimpanKosong.redirectUrl, '/surplus/catat');
    assert.equal(
        db.prepare(
            'SELECT nama_produk FROM produk WHERE id_produk = ?'
        ).get(idProduk).nama_produk,
        'Nasi Baru C26'
    );

    const resSuksesKosong = resPalsu();
    DistribusiSurplusController.tampilSukses(reqPalsu({
        user,
        session: {}
    }), resSuksesKosong);

    assert.equal(resSuksesKosong.redirectUrl, '/surplus/catat');

    const hasil = {
        namaProduk: 'Nasi C26',
        jumlah: 4,
        ambilSebelum: '1 Jan 2099 12.00',
        metode: 'donasi'
    };
    const sesi = { suksesDistribusi: hasil };
    const resSukses = resPalsu();

    DistribusiSurplusController.tampilSukses(reqPalsu({
        user,
        session: sesi
    }), resSukses);

    assert.equal(resSukses.rendered.view, 'surplus/I11-SuksesPublikasi');
    assert.deepEqual(resSukses.rendered.data.result, hasil);
    assert.equal(sesi.suksesDistribusi, undefined);
});