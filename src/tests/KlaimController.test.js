const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c28-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const ProdukSurplus = require('../models/ProdukSurplus');
const DokumenKlaim = require('../models/DokumenKlaim');
const KlaimController = require('../controllers/KlaimController');

let urut = 0;
let urutSurplus = 0;

function buatAkun(tipeAkun, label) {
    urut += 1;

    return Number(
        db.prepare(`
            INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun)
            VALUES (?, ?, ?)
        `).run(`c28-${label}-${urut}@foodlink.test`, 'x', tipeAkun)
            .lastInsertRowid
    );
}

function buatPemilik() {
    const idAkun = buatAkun('pemilik_fnb', 'pemilik');
    const namaUsaha = `Usaha C28 ${urut}`;
    const alamatUsaha = `Jl. C28 No. ${urut}, Bandung`;
    const jamOperasional = '08.00-20.00';

    const idPemilik = Number(
        db.prepare(`
            INSERT INTO pemilik_fnb (
                id_akun, nama_usaha, alamat_usaha, jam_operasional
            )
            VALUES (?, ?, ?, ?)
        `).run(idAkun, namaUsaha, alamatUsaha, jamOperasional)
            .lastInsertRowid
    );

    return {
        idAkun,
        idPemilik,
        namaUsaha,
        alamatUsaha,
        jamOperasional
    };
}

function buatNgo() {
    const idAkun = buatAkun('perwakilan_ngo', 'ngo');
    const namaOrganisasi = `NGO C28 ${urut}`;
    const nomorLegalitas = `LEGAL-C28-${urut}`;
    const lokasi = '-6.9,107.61';

    db.prepare(`
        INSERT INTO perwakilan_ngo (
            id_akun, nama_organisasi, nomor_legalitas, lokasi
        )
        VALUES (?, ?, ?, ?)
    `).run(idAkun, namaOrganisasi, nomorLegalitas, lokasi);

    return {
        idAkun,
        namaOrganisasi,
        nomorLegalitas,
        lokasi
    };
}

function buatSurplus(idPemilik, opsi = {}) {
    const {
        nama = 'Produk C28',
        kategori = 'Makanan',
        jumlah = 5,
        status = 'tersedia'
    } = opsi;

    urutSurplus += 1;

    const idProduk = Number(
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(idPemilik, `${nama} ${urutSurplus}`, kategori)
            .lastInsertRowid
    );

    const idSurplus = Number(
        db.prepare(`
            INSERT INTO produk_surplus (
                id_produk,
                id_pemilik,
                jumlah,
                batas_waktu_pengambilan,
                status
            )
            VALUES (?, ?, ?, ?, ?)
        `).run(
            idProduk,
            idPemilik,
            jumlah,
            '2099-01-01 12:00',
            status
        ).lastInsertRowid
    );

    return { idProduk, idSurplus };
}

function statusSurplus(idSurplus) {
    return ProdukSurplus.getStatus(idSurplus);
}

function jumlahKlaim(idSurplus) {
    return db.prepare(`
        SELECT COUNT(*) AS jumlah
        FROM dokumen_klaim
        WHERE id_surplus = ?
    `).get(idSurplus).jumlah;
}

function logAkun(idAkun) {
    return db.prepare(`
        SELECT *
        FROM log_aktivitas
        WHERE id_akun = ?
        ORDER BY id_log
    `).all(idAkun);
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C28-UT01 cekKetersediaan() mengembalikan true untuk surplus tersedia', () => {
    const pemilik = buatPemilik();
    const { idSurplus } = buatSurplus(pemilik.idPemilik);

    assert.equal(KlaimController.cekKetersediaan(idSurplus), true);
});

test('C28-UT02 cekKetersediaan() mengembalikan false untuk status tidak tersedia dan ID tidak ditemukan', () => {
    const pemilik = buatPemilik();
    const surplusTerklaim = buatSurplus(pemilik.idPemilik, {
        status: 'terklaim'
    });
    const surplusSelesai = buatSurplus(pemilik.idPemilik, {
        status: 'selesai'
    });

    assert.equal(
        KlaimController.cekKetersediaan(surplusTerklaim.idSurplus),
        false
    );
    assert.equal(
        KlaimController.cekKetersediaan(surplusSelesai.idSurplus),
        false
    );
    assert.equal(KlaimController.cekKetersediaan(999999), false);
});

test('C28-UT03 cekKetersediaan() menolak ID surplus tidak valid', () => {
    assert.throws(
        () => KlaimController.cekKetersediaan(0),
        /ID surplus tidak valid\./
    );
    assert.throws(
        () => KlaimController.cekKetersediaan(-1),
        /ID surplus tidak valid\./
    );
    assert.throws(
        () => KlaimController.cekKetersediaan(1.5),
        /ID surplus tidak valid\./
    );
    assert.throws(
        () => KlaimController.cekKetersediaan('abc'),
        /ID surplus tidak valid\./
    );
});

test('C28-UT04 kunciProduk() mengubah status surplus tersedia menjadi terklaim', () => {
    const pemilik = buatPemilik();
    const { idSurplus } = buatSurplus(pemilik.idPemilik);

    assert.equal(KlaimController.kunciProduk(idSurplus), true);
    assert.equal(statusSurplus(idSurplus), 'terklaim');
});

test('C28-UT05 kunciProduk() menolak surplus yang sudah tidak tersedia', () => {
    const pemilik = buatPemilik();
    const { idSurplus } = buatSurplus(pemilik.idPemilik, {
        status: 'terklaim'
    });

    assert.throws(
        () => KlaimController.kunciProduk(idSurplus),
        /Produk surplus sudah tidak tersedia\./
    );
    assert.equal(statusSurplus(idSurplus), 'terklaim');
});

test('C28-UT06 kunciProduk() menolak ID tidak valid dan ID yang tidak ditemukan', () => {
    assert.throws(
        () => KlaimController.kunciProduk(0),
        /ID surplus tidak valid\./
    );
    assert.throws(
        () => KlaimController.kunciProduk(999999),
        /Produk surplus sudah tidak tersedia\./
    );
});

test('C28-UT07 setujuiKlaim() mencatat klaim, mengunci surplus, dan menulis log', () => {
    const pemilik = buatPemilik();
    const ngo = buatNgo();
    const { idSurplus } = buatSurplus(pemilik.idPemilik, {
        kategori: 'Minuman',
        jumlah: 3
    });

    const idKlaim = KlaimController.setujuiKlaim(
        idSurplus,
        ngo.idAkun
    );

    assert.ok(Number.isSafeInteger(idKlaim) && idKlaim > 0);
    assert.equal(statusSurplus(idSurplus), 'terklaim');

    const detailKlaim = DokumenKlaim.getDetailKlaim(idKlaim);

    assert.equal(detailKlaim.idNgo, ngo.idAkun);
    assert.equal(detailKlaim.idSurplus, idSurplus);
    assert.equal(detailKlaim.statusKlaim, 'terklaim');

    const log = logAkun(ngo.idAkun);

    assert.equal(log.length, 1);
    assert.match(log[0].aktivitas, /^Mengklaim .+ \(3 gelas\)$/);
});

test('C28-UT08 setujuiKlaim() menolak klaim kedua pada surplus yang sama', () => {
    const pemilik = buatPemilik();
    const ngo = buatNgo();
    const { idSurplus } = buatSurplus(pemilik.idPemilik);

    KlaimController.setujuiKlaim(idSurplus, ngo.idAkun);

    const log = logAkun(ngo.idAkun);

    assert.equal(log.length, 1);
    assert.match(log[0].aktivitas, /^Mengklaim .+ \(5 porsi\)$/);

    assert.throws(
        () => KlaimController.setujuiKlaim(idSurplus, ngo.idAkun),
        /Klaim tidak dapat diproses karena produk surplus berstatus "terklaim"\./
    );

    assert.equal(statusSurplus(idSurplus), 'terklaim');
    assert.equal(jumlahKlaim(idSurplus), 1);
    assert.equal(logAkun(ngo.idAkun).length, 1);
});

test('C28-UT09 setujuiKlaim() memvalidasi ID dan melakukan rollback saat pencatatan gagal', () => {
    const pemilik = buatPemilik();
    const ngo = buatNgo();
    const { idSurplus } = buatSurplus(pemilik.idPemilik);

    assert.throws(
        () => KlaimController.setujuiKlaim(0, ngo.idAkun),
        /ID surplus tidak valid\./
    );
    assert.throws(
        () => KlaimController.setujuiKlaim(idSurplus, 0),
        /ID NGO tidak valid\./
    );
    assert.throws(
        () => KlaimController.setujuiKlaim(999999, ngo.idAkun),
        /Produk surplus tidak ditemukan\./
    );
    assert.throws(
        () => KlaimController.setujuiKlaim(idSurplus, 999999),
        /FOREIGN KEY constraint failed/
    );

    assert.equal(statusSurplus(idSurplus), 'tersedia');
    assert.equal(jumlahKlaim(idSurplus), 0);
    assert.equal(logAkun(ngo.idAkun).length, 0);
});

test('C28-UT10 tolakKlaim() mengembalikan pesan status surplus terklaim', () => {
    const pemilik = buatPemilik();
    const { idSurplus } = buatSurplus(pemilik.idPemilik, {
        status: 'terklaim'
    });

    assert.equal(
        KlaimController.tolakKlaim(idSurplus),
        'Klaim tidak dapat diproses karena produk surplus berstatus "terklaim".'
    );
});

test('C28-UT11 tolakKlaim() menangani status selesai dan surplus yang tidak ditemukan', () => {
    const pemilik = buatPemilik();
    const { idSurplus } = buatSurplus(pemilik.idPemilik, {
        status: 'selesai'
    });

    assert.equal(
        KlaimController.tolakKlaim(idSurplus),
        'Klaim tidak dapat diproses karena produk surplus berstatus "selesai".'
    );
    assert.equal(
        KlaimController.tolakKlaim(999999),
        'Produk surplus tidak ditemukan.'
    );
});

test('C28-UT12 tolakKlaim() menolak ID surplus tidak valid', () => {
    assert.throws(
        () => KlaimController.tolakKlaim(0),
        /ID surplus tidak valid\./
    );
    assert.throws(
        () => KlaimController.tolakKlaim('abc'),
        /ID surplus tidak valid\./
    );
});

test('C28-UT13 ambilDetailPengambilan() mengembalikan detail klaim, surplus, usaha, dan NGO', () => {
    const pemilik = buatPemilik();
    const ngo = buatNgo();
    const { idSurplus } = buatSurplus(pemilik.idPemilik, {
        kategori: 'Minuman',
        jumlah: 3
    });

    ProdukSurplus.setStatus(idSurplus, 'terklaim');
    const idKlaim = DokumenKlaim.catatKlaim(ngo.idAkun, idSurplus);

    const detail = KlaimController.ambilDetailPengambilan(idKlaim);

    assert.equal(detail.detailKlaim.idKlaim, idKlaim);
    assert.equal(detail.detailKlaim.idNgo, ngo.idAkun);
    assert.equal(detail.detailKlaim.idSurplus, idSurplus);
    assert.equal(detail.detailSurplus.idSurplus, idSurplus);
    assert.equal(detail.detailSurplus.jumlah, 3);
    assert.equal(detail.dataUsaha.namaUsaha, pemilik.namaUsaha);
    assert.equal(detail.dataUsaha.alamatUsaha, pemilik.alamatUsaha);
    assert.equal(detail.dataUsaha.jamOperasional, pemilik.jamOperasional);
    assert.equal(detail.dataNgo.namaOrganisasi, ngo.namaOrganisasi);
    assert.equal(detail.dataNgo.nomorLegalitas, ngo.nomorLegalitas);
    assert.equal(detail.dataNgo.lokasi, ngo.lokasi);
});

test('C28-UT14 ambilDetailPengambilan() menolak ID klaim yang tidak ditemukan', () => {
    assert.throws(
        () => KlaimController.ambilDetailPengambilan(999999),
        /Dokumen klaim tidak ditemukan\./
    );
});

test('C28-UT15 ambilDetailPengambilan() menolak ID klaim tidak valid', () => {
    assert.throws(
        () => KlaimController.ambilDetailPengambilan(0),
        /ID klaim tidak valid\./
    );
    assert.throws(
        () => KlaimController.ambilDetailPengambilan(-1),
        /ID klaim tidak valid\./
    );
    assert.throws(
        () => KlaimController.ambilDetailPengambilan(1.5),
        /ID klaim tidak valid\./
    );
    assert.throws(
        () => KlaimController.ambilDetailPengambilan('abc'),
        /ID klaim tidak valid\./
    );
});

test('C28-UT16 konfirmasiPengambilan() mengubah status menjadi selesai dan menulis log', () => {
    const pemilik = buatPemilik();
    const ngo = buatNgo();
    const { idSurplus } = buatSurplus(pemilik.idPemilik, {
        kategori: 'Makanan',
        jumlah: 4
    });

    ProdukSurplus.setStatus(idSurplus, 'terklaim');
    const idKlaim = DokumenKlaim.catatKlaim(ngo.idAkun, idSurplus);

    const pesan = KlaimController.konfirmasiPengambilan(idKlaim);

    assert.equal(
        pesan,
        'Pengambilan produk surplus berhasil dikonfirmasi.'
    );
    assert.equal(statusSurplus(idSurplus), 'selesai');

    const log = logAkun(ngo.idAkun);

    assert.equal(log.length, 1);
    assert.match(
        log[0].aktivitas,
        /^Mengonfirmasi pengambilan klaim .+ \(4 porsi\)$/
    );
});

test('C28-UT17 konfirmasiPengambilan() menolak konfirmasi berulang', () => {
    const pemilik = buatPemilik();
    const ngo = buatNgo();
    const { idSurplus } = buatSurplus(pemilik.idPemilik, {
        kategori: 'Minuman',
        jumlah: 2
    });

    ProdukSurplus.setStatus(idSurplus, 'terklaim');
    const idKlaim = DokumenKlaim.catatKlaim(ngo.idAkun, idSurplus);

    KlaimController.konfirmasiPengambilan(idKlaim);

    const log = logAkun(ngo.idAkun);

    assert.equal(log.length, 1);
    assert.match(
        log[0].aktivitas,
        /^Mengonfirmasi pengambilan klaim .+ \(2 gelas\)$/
    );

    assert.throws(
        () => KlaimController.konfirmasiPengambilan(idKlaim),
        /Pengambilan produk surplus sudah dikonfirmasi\./
    );
    assert.equal(statusSurplus(idSurplus), 'selesai');
    assert.equal(logAkun(ngo.idAkun).length, 1);
});

test('C28-UT18 konfirmasiPengambilan() menolak ID tidak valid dan klaim yang tidak ditemukan', () => {
    assert.throws(
        () => KlaimController.konfirmasiPengambilan(0),
        /ID klaim tidak valid\./
    );
    assert.throws(
        () => KlaimController.konfirmasiPengambilan(999999),
        /Dokumen klaim tidak ditemukan\./
    );
});