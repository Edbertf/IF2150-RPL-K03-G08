const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c02-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');
const PemilikFnB = require('../models/PemilikFnB');
const PerwakilanNGO = require('../models/PerwakilanNGO');

let urut = 0;

function tanggalJakarta() {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta'
    }).format(new Date());
}

function buatAkun(tipeAkun = 'pemilik_fnb') {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c02-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun
    });

    if (tipeAkun === 'pemilik_fnb') {
        PemilikFnB.simpanProfil(idAkun, {
            namaUsaha: `Usaha C02 ${urut}`,
            alamatUsaha: 'Jl. Uji No. 2, Bandung',
            jamOperasional: '08.00-20.00'
        });
    } else {
        PerwakilanNGO.simpanProfil(idAkun, {
            namaOrganisasi: `Yayasan C02 ${urut}`,
            nomorLegalitas: `AHU-C02-${urut}`,
            lokasi: 'Jl. Braga No. 12, Bandung'
        });
    }

    return idAkun;
}

function buatPendaftar(tipeAkun = 'pemilik_fnb') {
    const idAkun = buatAkun(tipeAkun);
    return {
        idAkun,
        idPendaftaran: Pendaftaran.ajukanPendaftaran(idAkun)
    };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C02-UT01 ajukanPendaftaran menyimpan status awal dan tanggal hari ini', () => {
    const idAkun = buatAkun();
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
    const baris = db.prepare(
        'SELECT * FROM pendaftaran WHERE id_pendaftaran = ?'
    ).get(idPendaftaran);

    assert.ok(idPendaftaran > 0);
    assert.equal(baris.id_akun, idAkun);
    assert.equal(baris.status_verifikasi, 'menunggu verifikasi');
    assert.equal(baris.tanggal_daftar, tanggalJakarta());
});

test('C02-UT02 ajukanPendaftaran menolak pendaftaran ganda untuk akun yang sama', () => {
    const { idAkun } = buatPendaftar();
    const sebelum = db.prepare('SELECT COUNT(*) AS c FROM pendaftaran').get().c;

    assert.throws(
        () => Pendaftaran.ajukanPendaftaran(idAkun),
        /UNIQUE constraint failed: pendaftaran\.id_akun/
    );

    const sesudah = db.prepare('SELECT COUNT(*) AS c FROM pendaftaran').get().c;
    assert.equal(sesudah, sebelum);
});

test('C02-UT03 ajukanPendaftaran menolak idAkun yang tidak terdaftar', () => {
    const sebelum = db.prepare('SELECT COUNT(*) AS c FROM pendaftaran').get().c;

    assert.throws(
        () => Pendaftaran.ajukanPendaftaran(999999),
        /FOREIGN KEY constraint failed/
    );

    const sesudah = db.prepare('SELECT COUNT(*) AS c FROM pendaftaran').get().c;
    assert.equal(sesudah, sebelum);
});

test('C02-UT04 getDaftarMenungguVerifikasi memuat pendaftar F&B dan NGO', () => {
    const fnb = buatPendaftar('pemilik_fnb');
    const ngo = buatPendaftar('perwakilan_ngo');
    const daftar = Pendaftaran.getDaftarMenungguVerifikasi();

    const barisFnb = daftar.find((p) => p.idPendaftaran === fnb.idPendaftaran);
    const barisNgo = daftar.find((p) => p.idPendaftaran === ngo.idPendaftaran);

    assert.ok(barisFnb);
    assert.equal(barisFnb.tipeAkun, 'pemilik_fnb');
    assert.match(barisFnb.nama, /^Usaha C02 /);

    assert.ok(barisNgo);
    assert.equal(barisNgo.tipeAkun, 'perwakilan_ngo');
    assert.match(barisNgo.nama, /^Yayasan C02 /);

    assert.ok(daftar.every((p) => p.statusVerifikasi === 'menunggu verifikasi'));
});

test('C02-UT05 getDaftarMenungguVerifikasi tidak memuat pendaftaran yang sudah diputuskan', () => {
    const diterima = buatPendaftar();
    const ditolak = buatPendaftar();

    Pendaftaran.updateStatus(diterima.idPendaftaran, 'diterima');
    Pendaftaran.updateStatus(ditolak.idPendaftaran, 'ditolak');

    const daftar = Pendaftaran.getDaftarMenungguVerifikasi();

    assert.equal(
        daftar.some((p) => p.idPendaftaran === diterima.idPendaftaran),
        false
    );
    assert.equal(
        daftar.some((p) => p.idPendaftaran === ditolak.idPendaftaran),
        false
    );
});

test('C02-UT06 getDaftarMenungguVerifikasi mengembalikan array kosong saat tabel kosong', () => {
    const kosongkanSementara = db.transaction(() => {
        db.prepare('DELETE FROM dokumen_pendukung').run();
        db.prepare('DELETE FROM pendaftaran').run();

        assert.deepEqual(Pendaftaran.getDaftarMenungguVerifikasi(), []);
        throw new Error('batalkan');
    });

    assert.throws(() => kosongkanSementara(), /batalkan/);
});

test('C02-UT07 getDetailPendaftar mengembalikan data lengkap pemilik F&B', () => {
    const { idPendaftaran, idAkun } = buatPendaftar('pemilik_fnb');
    const detail = Pendaftaran.getDetailPendaftar(idPendaftaran);

    assert.equal(detail.idPendaftaran, idPendaftaran);
    assert.equal(detail.idAkun, idAkun);
    assert.equal(detail.tipeAkun, 'pemilik_fnb');
    assert.equal(detail.statusVerifikasi, 'menunggu verifikasi');
    assert.match(detail.tanggalDaftar, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(detail.namaUsaha, /^Usaha C02 /);
    assert.equal(detail.alamatUsaha, 'Jl. Uji No. 2, Bandung');
    assert.equal(detail.jamOperasional, '08.00-20.00');
    assert.equal(detail.namaOrganisasi, null);
});

test('C02-UT08 getDetailPendaftar mengembalikan data lengkap perwakilan NGO', () => {
    const { idPendaftaran, idAkun } = buatPendaftar('perwakilan_ngo');
    const detail = Pendaftaran.getDetailPendaftar(idPendaftaran);

    assert.equal(detail.idPendaftaran, idPendaftaran);
    assert.equal(detail.idAkun, idAkun);
    assert.equal(detail.tipeAkun, 'perwakilan_ngo');
    assert.equal(detail.statusVerifikasi, 'menunggu verifikasi');
    assert.match(detail.tanggalDaftar, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(detail.namaOrganisasi, /^Yayasan C02 /);
    assert.match(detail.nomorLegalitas, /^AHU-C02-/);
    assert.equal(detail.lokasi, 'Jl. Braga No. 12, Bandung');
    assert.equal(detail.namaUsaha, null);
});

test('C02-UT09 getDetailPendaftar mengembalikan null untuk ID yang tidak ada', () => {
    assert.equal(Pendaftaran.getDetailPendaftar(999999), null);
});

test('C02-UT10 updateStatus menerima pendaftaran yang masih menunggu', () => {
    const { idPendaftaran } = buatPendaftar();

    assert.equal(Pendaftaran.updateStatus(idPendaftaran, 'diterima'), true);
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'diterima');
});

test('C02-UT11 updateStatus menolak pendaftaran yang masih menunggu', () => {
    const { idPendaftaran } = buatPendaftar();

    assert.equal(Pendaftaran.updateStatus(idPendaftaran, 'ditolak'), true);
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'ditolak');
});

test('C02-UT12 updateStatus tidak menimpa keputusan pertama', () => {
    const { idPendaftaran } = buatPendaftar();

    Pendaftaran.updateStatus(idPendaftaran, 'diterima');

    assert.equal(Pendaftaran.updateStatus(idPendaftaran, 'ditolak'), false);
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'diterima');
});

test('C02-UT13 updateStatus menolak status tidak valid dan ID yang tidak ada', () => {
    const { idPendaftaran } = buatPendaftar();

    assert.equal(Pendaftaran.updateStatus(idPendaftaran, 'pending'), false);
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'menunggu verifikasi');
    assert.equal(Pendaftaran.updateStatus(999999, 'diterima'), false);
});

test('C02-UT14 getStatus mengembalikan status menunggu verifikasi', () => {
    const { idPendaftaran } = buatPendaftar();

    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'menunggu verifikasi');
});

test('C02-UT15 getStatus mengembalikan status setelah keputusan', () => {
    const { idPendaftaran } = buatPendaftar();

    Pendaftaran.updateStatus(idPendaftaran, 'diterima');

    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'diterima');
});

test('C02-UT16 getStatus mengembalikan null untuk ID yang tidak ada', () => {
    assert.equal(Pendaftaran.getStatus(999999), null);
});

test('C02-UT17 cariBerdasarkanAkun mengembalikan pendaftaran milik akun', () => {
    const { idAkun, idPendaftaran } = buatPendaftar();
    const data = Pendaftaran.cariBerdasarkanAkun(idAkun);

    assert.equal(data.idPendaftaran, idPendaftaran);
    assert.match(data.tanggalDaftar, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(data.statusVerifikasi, 'menunggu verifikasi');
});

test('C02-UT18 cariBerdasarkanAkun mengembalikan null untuk akun tanpa pendaftaran', () => {
    assert.equal(Pendaftaran.cariBerdasarkanAkun(999999), null);
});