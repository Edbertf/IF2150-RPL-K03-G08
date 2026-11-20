const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-c04-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

const db = require('../config/db');
require('../database/init')();

const AkunPengguna = require('../models/AkunPengguna');
const Pendaftaran = require('../models/Pendaftaran');
const PemilikFnB = require('../models/PemilikFnB');
const PerwakilanNGO = require('../models/PerwakilanNGO');
const DokumenPendukung = require('../models/DokumenPendukung');
const VerifikasiController = require('../controllers/VerifikasiController');

let urut = 0;
let nomorBerkas = 0;

const idAdmin = AkunPengguna.registrasi({
    email: 'admin-c04@foodlink.test',
    kataSandi: 'rahasia123',
    tipeAkun: 'admin_sistem'
});

const admin = { idAkun: idAdmin, role: 'admin_sistem' };

function buatPendaftar(tipeAkun) {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `c04-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun
    });

    if (tipeAkun === 'pemilik_fnb') {
        PemilikFnB.simpanProfil(idAkun, {
            namaUsaha: `Usaha C04 ${urut}`,
            alamatUsaha: 'Jl. C04 No. 1, Bandung',
            jamOperasional: '08.00-20.00'
        });
    } else {
        PerwakilanNGO.simpanProfil(idAkun, {
            namaOrganisasi: `Yayasan C04 ${urut}`,
            nomorLegalitas: `AHU-C04-${urut}`,
            lokasi: 'Jl. C04 No. 2, Bandung'
        });
    }

    return {
        idAkun,
        idPendaftaran: Pendaftaran.ajukanPendaftaran(idAkun)
    };
}

function buatBerkas(namaAsli, isi = '%PDF-1.4\nuji\n') {
    nomorBerkas += 1;
    const lokasi = path.join(folderUji, `sumber-${nomorBerkas}.bin`);
    fs.writeFileSync(lokasi, isi);
    return {
        originalname: namaAsli,
        mimetype: 'application/pdf',
        size: Buffer.byteLength(isi),
        path: lokasi
    };
}

function reqPalsu({ params = {}, body = {}, query = {}, user = {} } = {}) {
    return { params, body, query, user };
}

function resPalsu() {
    return {
        statusCode: 200,
        rendered: null,
        body: null,
        redirectUrl: null,
        status(kode) {
            this.statusCode = kode;
            return this;
        },
        render(view, data) {
            this.rendered = { view, data };
            return this;
        },
        send(isi) {
            this.body = isi;
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

test('C04-UT01 tampilkanDaftarPendaftar menampilkan pendaftar yang menunggu', () => {
    const fnb = buatPendaftar('pemilik_fnb');
    const ngo = buatPendaftar('perwakilan_ngo');
    const res = resPalsu();

    VerifikasiController.tampilkanDaftarPendaftar(
        reqPalsu({ query: { pesan: 'Periksa data pendaftar.' } }),
        res
    );

    assert.equal(res.rendered.view, 'admin/I19-VerifikasiPendaftar');
    assert.equal(res.rendered.data.pesan, 'Periksa data pendaftar.');

    const daftar = res.rendered.data.daftar;
    const barisFnb = daftar.find((p) => p.idPendaftaran === fnb.idPendaftaran);
    const barisNgo = daftar.find((p) => p.idPendaftaran === ngo.idPendaftaran);

    assert.ok(barisFnb);
    assert.equal(barisFnb.labelTipe, 'Pemilik F&B');
    assert.match(barisFnb.namaTampil, /^Usaha C04 /);
    assert.ok(barisFnb.tanggalTampil.length > 0);

    assert.ok(barisNgo);
    assert.equal(barisNgo.labelTipe, 'Perwakilan NGO');
    assert.match(barisNgo.namaTampil, /^Yayasan C04 /);
});

test('C04-UT02 tampilkanDaftarPendaftar menampilkan daftar kosong saat tidak ada yang menunggu', () => {
    const kosongkanSementara = db.transaction(() => {
        db.prepare('DELETE FROM dokumen_pendukung').run();
        db.prepare('DELETE FROM pendaftaran').run();

        const res = resPalsu();
        VerifikasiController.tampilkanDaftarPendaftar(reqPalsu(), res);

        assert.equal(res.rendered.view, 'admin/I19-VerifikasiPendaftar');
        assert.deepEqual(res.rendered.data.daftar, []);
        throw new Error('batalkan');
    });

    assert.throws(() => kosongkanSementara(), /batalkan/);
});

test('C04-UT03 ambilDetailPendaftar menampilkan detail dan ketersediaan dokumen', () => {
    const { idPendaftaran } = buatPendaftar('pemilik_fnb');

    DokumenPendukung.unggahDokumen(idPendaftaran, buatBerkas('NIB.pdf'));

    const res = resPalsu();
    VerifikasiController.ambilDetailPendaftar(
        reqPalsu({
            params: { idPendaftaran: String(idPendaftaran) },
            query: { pesan: 'Cek dokumen.' }
        }),
        res
    );

    assert.equal(res.rendered.view, 'admin/I20-DetailPendaftar');
    assert.equal(res.rendered.data.pesan, 'Cek dokumen.');
    assert.match(res.rendered.data.detail.namaTampil, /^Usaha C04 /);
    assert.equal(res.rendered.data.detail.labelTipe, 'Pemilik F&B');
    assert.equal(res.rendered.data.dokumen.length, 1);
    assert.equal(res.rendered.data.dokumen[0].namaFile, 'NIB.pdf');
    assert.equal(res.rendered.data.dokumen[0].tersedia, true);
});

test('C04-UT04 ambilDetailPendaftar mengembalikan 404 untuk ID yang tidak ada', () => {
    const res = resPalsu();

    VerifikasiController.ambilDetailPendaftar(
        reqPalsu({ params: { idPendaftaran: '999999' } }),
        res
    );

    assert.equal(res.statusCode, 404);
    assert.equal(res.body, 'Pendaftaran tidak ditemukan.');
});

test('C04-UT05 prosesVerifikasi menyetujui pendaftaran dan mencatat log', () => {
    const { idPendaftaran } = buatPendaftar('pemilik_fnb');
    const res = resPalsu();

    VerifikasiController.prosesVerifikasi(
        reqPalsu({
            params: { idPendaftaran: String(idPendaftaran) },
            body: { keputusan: 'terima' },
            user: admin
        }),
        res
    );

    assert.equal(
        res.redirectUrl,
        `/admin/verifikasi/${idPendaftaran}/hasil`
    );
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'diterima');

    const log = db.prepare(
        'SELECT aktivitas FROM log_aktivitas WHERE id_akun = ? ORDER BY id_log DESC LIMIT 1'
    ).get(idAdmin);

    assert.match(log.aktivitas, /^Verifikasi pendaftaran Usaha C04 /);
    assert.match(log.aktivitas, /disetujui$/);
});

test('C04-UT06 prosesVerifikasi menolak pendaftaran dan mencatat log', () => {
    const { idPendaftaran } = buatPendaftar('perwakilan_ngo');
    const res = resPalsu();

    VerifikasiController.prosesVerifikasi(
        reqPalsu({
            params: { idPendaftaran: String(idPendaftaran) },
            body: { keputusan: 'tolak' },
            user: admin
        }),
        res
    );

    assert.equal(
        res.redirectUrl,
        `/admin/verifikasi/${idPendaftaran}/hasil`
    );
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'ditolak');

    const log = db.prepare(
        'SELECT aktivitas FROM log_aktivitas WHERE id_akun = ? ORDER BY id_log DESC LIMIT 1'
    ).get(idAdmin);

    assert.match(log.aktivitas, /^Verifikasi pendaftaran Yayasan C04 /);
    assert.match(log.aktivitas, /ditolak$/);
});

test('C04-UT07 prosesVerifikasi menolak keputusan tidak dikenal tanpa mengubah status', () => {
    const { idPendaftaran } = buatPendaftar('pemilik_fnb');
    const jumlahLog = db.prepare('SELECT COUNT(*) AS c FROM log_aktivitas').get().c;
    const res = resPalsu();

    VerifikasiController.prosesVerifikasi(
        reqPalsu({
            params: { idPendaftaran: String(idPendaftaran) },
            body: { keputusan: 'ubah' },
            user: admin
        }),
        res
    );

    assert.equal(
        res.redirectUrl,
        `/admin/verifikasi/${idPendaftaran}?pesan=Keputusan%20tidak%20dikenal.`
    );
    assert.equal(Pendaftaran.getStatus(idPendaftaran), 'menunggu verifikasi');
    assert.equal(
        db.prepare('SELECT COUNT(*) AS c FROM log_aktivitas').get().c,
        jumlahLog
    );
});