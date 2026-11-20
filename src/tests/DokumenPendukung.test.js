const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c03-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');
const DokumenPendukung = require('../models/DokumenPendukung');

let urut = 0;
let nomorBerkas = 0;

function buatPendaftaran() {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c03-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
    return Pendaftaran.ajukanPendaftaran(idAkun);
}

function buatBerkas(namaAsli, isi = '%PDF-1.4\nuji\n') {
    nomorBerkas += 1;
    const lokasi = path.join(folderUji, `sumber-${nomorBerkas}.bin`);
    fs.writeFileSync(lokasi, isi);
    return {
        originalname: namaAsli,
        mimetype: 'application/octet-stream',
        size: Buffer.byteLength(isi),
        path: lokasi
    };
}

function folderDokumen(idPendaftaran) {
    return path.join(DokumenPendukung.AKAR_STORAGE, String(idPendaftaran));
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('C03-UT01 unggahDokumen menyimpan PDF ke storage dan database', () => {
    const idPendaftaran = buatPendaftaran();
    const berkas = buatBerkas('NIB.pdf');
    const isi = fs.readFileSync(berkas.path);

    const idDokumen = DokumenPendukung.unggahDokumen(idPendaftaran, berkas);

    assert.ok(idDokumen > 0);

    const baris = db.prepare(
        'SELECT * FROM dokumen_pendukung WHERE id_dokumen = ?'
    ).get(idDokumen);

    assert.equal(baris.id_pendaftaran, idPendaftaran);
    assert.equal(baris.nama_file, 'NIB.pdf');
    assert.equal(baris.tipe_dokumen, 'PDF');

    const tujuan = path.join(folderDokumen(idPendaftaran), 'NIB.pdf');
    assert.equal(fs.existsSync(tujuan), true);
    assert.deepEqual(fs.readFileSync(tujuan), isi);
    assert.equal(fs.existsSync(berkas.path), false);
});

test('C03-UT02 unggahDokumen menormalkan ekstensi dan nama berkas', () => {
    const idPendaftaran = buatPendaftaran();
    const berkas = buatBerkas('Laporan NIB (Final).PDF');

    const idDokumen = DokumenPendukung.unggahDokumen(idPendaftaran, berkas);
    const baris = db.prepare(
        'SELECT * FROM dokumen_pendukung WHERE id_dokumen = ?'
    ).get(idDokumen);

    assert.equal(baris.tipe_dokumen, 'PDF');
    assert.equal(baris.nama_file, 'Laporan_NIB__Final_.pdf');
    assert.equal(
        fs.existsSync(path.join(folderDokumen(idPendaftaran), baris.nama_file)),
        true
    );
});

test('C03-UT03 unggahDokumen menolak ekstensi yang tidak didukung', () => {
    const idPendaftaran = buatPendaftaran();
    const sebelum = db.prepare('SELECT COUNT(*) AS c FROM dokumen_pendukung').get().c;
    const berkas = buatBerkas('virus.exe', 'MZ');

    assert.throws(
        () => DokumenPendukung.unggahDokumen(idPendaftaran, berkas),
        /Ekstensi dokumen tidak didukung\./
    );

    const sesudah = db.prepare('SELECT COUNT(*) AS c FROM dokumen_pendukung').get().c;
    assert.equal(sesudah, sebelum);
    assert.equal(fs.existsSync(folderDokumen(idPendaftaran)), false);
});

test('C03-UT04 unggahDokumen menambahkan akhiran unik untuk nama berkas yang sama', () => {
    const idPendaftaran = buatPendaftaran();

    const idPertama = DokumenPendukung.unggahDokumen(
        idPendaftaran,
        buatBerkas('NIB.pdf')
    );
    const idKedua = DokumenPendukung.unggahDokumen(
        idPendaftaran,
        buatBerkas('NIB.pdf')
    );

    const barisPertama = db.prepare(
        'SELECT nama_file FROM dokumen_pendukung WHERE id_dokumen = ?'
    ).get(idPertama);
    const barisKedua = db.prepare(
        'SELECT nama_file FROM dokumen_pendukung WHERE id_dokumen = ?'
    ).get(idKedua);

    assert.equal(barisPertama.nama_file, 'NIB.pdf');
    assert.equal(barisKedua.nama_file, 'NIB-1.pdf');
});

test('C03-UT05 unggahDokumen membersihkan berkas saat idPendaftaran tidak ada', () => {
    const berkas = buatBerkas('NIB.pdf');

    assert.throws(
        () => DokumenPendukung.unggahDokumen(999999, berkas),
        /FOREIGN KEY constraint failed/
    );

    const folder = folderDokumen(999999);
    assert.equal(fs.existsSync(folder), true);
    assert.deepEqual(fs.readdirSync(folder), []);
    assert.equal(fs.existsSync(berkas.path), false);
});

test('C03-UT06 getDokumen mengembalikan dokumen sesuai urutan upload', () => {
    const idPendaftaran = buatPendaftaran();

    const idPdf = DokumenPendukung.unggahDokumen(
        idPendaftaran,
        buatBerkas('NIB.pdf')
    );
    const idPng = DokumenPendukung.unggahDokumen(
        idPendaftaran,
        buatBerkas('Foto.png')
    );

    const daftar = DokumenPendukung.getDokumen(idPendaftaran);

    assert.deepEqual(daftar.map((d) => d.idDokumen), [idPdf, idPng]);
    assert.deepEqual(
        daftar.map((d) => [d.namaFile, d.tipeDokumen]),
        [['NIB.pdf', 'PDF'], ['Foto.png', 'PNG']]
    );
});

test('C03-UT07 getDokumen hanya mengembalikan dokumen milik pendaftaran yang diminta', () => {
    const idA = buatPendaftaran();
    const idB = buatPendaftaran();

    DokumenPendukung.unggahDokumen(idA, buatBerkas('A.pdf'));

    const daftarA = DokumenPendukung.getDokumen(idA);
    const daftarB = DokumenPendukung.getDokumen(idB);

    assert.equal(daftarA.length, 1);
    assert.equal(daftarA[0].namaFile, 'A.pdf');
    assert.deepEqual(daftarB, []);
});

test('C03-UT08 getDokumen mengembalikan array kosong untuk idPendaftaran yang tidak ada', () => {
    assert.deepEqual(DokumenPendukung.getDokumen(999999), []);
});

test('C03-UT09 ambilPathBerkas membentuk path di dalam folder pendaftaran', () => {
    const hasil = DokumenPendukung.ambilPathBerkas(12, 'NIB.pdf');

    assert.equal(
        hasil,
        path.join(DokumenPendukung.AKAR_STORAGE, '12', 'NIB.pdf')
    );
});

test('C03-UT10 ambilPathBerkas membuang komponen path traversal', () => {
    const hasil = DokumenPendukung.ambilPathBerkas(12, '../../evil.pdf');

    assert.equal(
        hasil,
        path.join(DokumenPendukung.AKAR_STORAGE, '12', 'evil.pdf')
    );
});