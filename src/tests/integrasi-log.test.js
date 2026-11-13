const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Database dan penyimpanan uji terpisah agar data pengembangan tidak tersentuh.
const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-integrasi-log-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'dokumen');

const db = require('../config/db');
require('../database/init')();

const AuthController = require('../controllers/AuthController');
const VerifikasiController = require('../controllers/VerifikasiController');
const PenjualanController = require('../controllers/PenjualanController');
const KlaimController = require('../controllers/KlaimController');
const CatatSurplusController = require('../controllers/CatatSurplusController');
const DistribusiSurplusController = require('../controllers/DistribusiSurplusController');

const insertAkun = db.prepare(
    'INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun) VALUES (?, ?, ?)'
);

const idAdmin = Number(
    insertAkun.run('admin@integrasi.test', 'x', 'admin_sistem').lastInsertRowid
);
const idNgo = Number(
    insertAkun.run('ngo@integrasi.test', 'x', 'perwakilan_ngo').lastInsertRowid
);

db.prepare(`
    INSERT INTO perwakilan_ngo (id_akun, nama_organisasi, lokasi)
    VALUES (?, ?, ?)
`).run(idNgo, 'Yayasan Integrasi', 'Jl. Braga No. 1, Bandung');

function ambilLogTerakhir(idAkun) {
    return db.prepare(`
        SELECT id_akun AS idAkun, aktivitas, waktu
        FROM log_aktivitas
        WHERE id_akun = ?
        ORDER BY id_log DESC
        LIMIT 1
    `).get(idAkun);
}

function buatRes() {
    return {
        statusCode: 200,
        status(kode) {
            this.statusCode = kode;
            return this;
        },
        render(tampilan, data) {
            this.tampilan = tampilan;
            this.data = data;
            return this;
        },
        redirect(tujuan) {
            this.tujuan = tujuan;
            return this;
        },
        send(teks) {
            this.body = teks;
            return this;
        }
    };
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

test('UC01: registrasi akun menulis log pendaftaran', () => {
    const berkasPath = path.join(folderUji, 'legalitas.pdf');
    fs.writeFileSync(berkasPath, 'dokumen uji');

    const hasil = AuthController.registrasiAkun({
        tipeAkun: 'pemilik_fnb',
        email: 'baru@integrasi.test',
        kataSandi: 'rahasia123',
        namaUsaha: 'Bakery Integrasi',
        alamatUsaha: 'Jl. Integrasi No. 1, Bandung',
        jamOperasional: '08.00-20.00',
        berkas: {
            originalname: 'legalitas.pdf',
            mimetype: 'application/pdf',
            size: 11,
            path: berkasPath
        }
    });

    const log = ambilLogTerakhir(hasil.idAkun);
    assert.equal(log.aktivitas, 'Mendaftarkan akun Bakery Integrasi');
    assert.match(log.waktu, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
});

test('UC02: keputusan verifikasi menulis log dengan pelaku admin', () => {
    const idPemilikAkun = Number(
        insertAkun.run('verifikasi@integrasi.test', 'x', 'pemilik_fnb').lastInsertRowid
    );

    db.prepare(`
        INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha)
        VALUES (?, ?, ?)
    `).run(idPemilikAkun, 'Warung Verifikasi', 'Jl. Verifikasi No. 1');

    const idPendaftaran = Number(
        db.prepare(`
            INSERT INTO pendaftaran (id_akun, tanggal_daftar, status_verifikasi)
            VALUES (?, '2026-11-12', 'menunggu verifikasi')
        `).run(idPemilikAkun).lastInsertRowid
    );

    const res = buatRes();

    VerifikasiController.prosesVerifikasi(
        {
            params: { idPendaftaran },
            body: { keputusan: 'terima' },
            user: { idAkun: idAdmin, role: 'admin_sistem' }
        },
        res
    );

    assert.equal(res.tujuan, `/admin/verifikasi/${idPendaftaran}/hasil`);

    const log = ambilLogTerakhir(idAdmin);
    assert.equal(log.aktivitas, 'Verifikasi pendaftaran Warung Verifikasi disetujui');
});

test('UC04: penyimpanan penjualan menulis log pemilik F&B', () => {
    const idAkunPemilik = Number(
        insertAkun.run('penjualan@integrasi.test', 'x', 'pemilik_fnb').lastInsertRowid
    );

    const idPemilik = Number(
        db.prepare(`
            INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha)
            VALUES (?, ?, ?)
        `).run(idAkunPemilik, 'Toko Penjualan', 'Jl. Penjualan No. 1').lastInsertRowid
    );

    const idProduk = Number(
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(idPemilik, 'Roti Penjualan', 'Makanan').lastInsertRowid
    );

    const res = buatRes();

    PenjualanController.kirimDataPenjualan(
        {
            user: { idAkun: idAkunPemilik, idPemilik, role: 'pemilik_fnb' },
            body: {
                [`terjual_${idProduk}`]: '12',
                [`tersisa_${idProduk}`]: '3'
            }
        },
        res
    );

    assert.equal(res.tujuan, '/fnb/penjualan/tersimpan');

    const log = ambilLogTerakhir(idAkunPemilik);
    assert.equal(log.aktivitas, 'Mencatat penjualan harian hari ini');
});

test('UC10: klaim surplus menulis log NGO beserta jumlah porsi', () => {
    const idAkunPemilik = Number(
        insertAkun.run('surplus@integrasi.test', 'x', 'pemilik_fnb').lastInsertRowid
    );

    const idPemilik = Number(
        db.prepare(`
            INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha)
            VALUES (?, ?, ?)
        `).run(idAkunPemilik, 'Toko Surplus', 'Jl. Surplus No. 1').lastInsertRowid
    );

    const idProduk = Number(
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(idPemilik, 'Roti Sisa', 'Makanan').lastInsertRowid
    );

    const idSurplus = Number(
        db.prepare(`
            INSERT INTO produk_surplus (
                id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status
            )
            VALUES (?, ?, ?, ?, 'tersedia')
        `).run(idProduk, idPemilik, 8, '2026-11-14 18:00:00').lastInsertRowid
    );

    const idKlaim = KlaimController.setujuiKlaim(idSurplus, idNgo);

    assert.ok(Number.isSafeInteger(idKlaim) && idKlaim > 0);

    const log = ambilLogTerakhir(idNgo);
    assert.equal(log.aktivitas, 'Mengklaim Roti Sisa (8 porsi)');
});

function buatPemilik(email, namaUsaha) {
    const idAkunPemilik = Number(
        insertAkun.run(email, 'x', 'pemilik_fnb').lastInsertRowid
    );

    const idPemilik = Number(
        db.prepare(`
            INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha)
            VALUES (?, ?, ?)
        `).run(idAkunPemilik, namaUsaha, 'Jl. Integrasi No. 2').lastInsertRowid
    );

    return { idAkunPemilik, idPemilik };
}

function buatProduk(idPemilik, namaProduk, kategori = 'Makanan') {
    return Number(
        db.prepare(`
            INSERT INTO produk (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(idPemilik, namaProduk, kategori).lastInsertRowid
    );
}

function batasWaktuBesok() {
    const tanggal = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date(Date.now() + 24 * 60 * 60 * 1000));

    return `${tanggal} 23:59`;
}

test('UC06: pencatatan surplus dan pengelolaan produk menulis log pemilik', () => {
    const { idAkunPemilik, idPemilik } = buatPemilik('uc06@integrasi.test', 'Toko UC06');
    const idProduk = buatProduk(idPemilik, 'Roti Baru');
    const user = { idAkun: idAkunPemilik, idPemilik, role: 'pemilik_fnb' };
    const res = buatRes();

    CatatSurplusController.simpanDataSurplus(
        {
            user,
            body: {
                idProduk: String(idProduk),
                jumlah: '4',
                batasWaktu: batasWaktuBesok().replace(' ', 'T')
            }
        },
        res
    );

    assert.match(res.tujuan, /^\/surplus\/\d+\/donasi$/);
    assert.equal(
        ambilLogTerakhir(idAkunPemilik).aktivitas,
        'Mencatat surplus Roti Baru (4 porsi)'
    );

    CatatSurplusController.simpanProdukBaru(
        { user, body: { namaProduk: 'Kue Baru', kategori: 'Makanan' } },
        buatRes()
    );
    assert.equal(
        ambilLogTerakhir(idAkunPemilik).aktivitas,
        'Menambahkan produk Kue Baru'
    );

    CatatSurplusController.simpanEditProduk(
        {
            user,
            params: { id: String(idProduk) },
            body: { namaProduk: 'Roti Baru Edit', kategori: 'Makanan' }
        },
        buatRes()
    );
    assert.equal(
        ambilLogTerakhir(idAkunPemilik).aktivitas,
        'Memperbarui produk Roti Baru Edit'
    );
});

test('UC07: penetapan distribusi surplus menulis log pemilik', () => {
    const { idAkunPemilik, idPemilik } = buatPemilik('uc07@integrasi.test', 'Toko UC07');
    const idProduk = buatProduk(idPemilik, 'Roti Diskon');
    const idSurplus = Number(
        db.prepare(`
            INSERT INTO produk_surplus (
                id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status
            )
            VALUES (?, ?, ?, ?, 'tersedia')
        `).run(idProduk, idPemilik, 3, '2026-11-15 18:00:00').lastInsertRowid
    );

    const sesi = {};
    const res = buatRes();

    DistribusiSurplusController.simpanDistribusi(
        {
            user: { idAkun: idAkunPemilik, idPemilik, role: 'pemilik_fnb' },
            params: { id: String(idSurplus) },
            body: { metode: 'diskon', hargaJual: '4000' },
            session: sesi
        },
        res
    );

    assert.equal(res.tujuan, '/surplus/sukses');
    assert.equal(sesi.suksesDistribusi.metode, 'diskon');
    assert.equal(
        ambilLogTerakhir(idAkunPemilik).aktivitas,
        'Menetapkan distribusi surplus Roti Diskon sebagai Jual Diskon Rp 4.000'
    );
});

test('UC11: konfirmasi pengambilan menulis log NGO', () => {
    const { idPemilik } = buatPemilik('uc11@integrasi.test', 'Toko UC11');
    const idProduk = buatProduk(idPemilik, 'Roti Ambil');
    const idSurplus = Number(
        db.prepare(`
            INSERT INTO produk_surplus (
                id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status
            )
            VALUES (?, ?, ?, ?, 'tersedia')
        `).run(idProduk, idPemilik, 5, '2026-11-16 18:00:00').lastInsertRowid
    );

    const idKlaim = KlaimController.setujuiKlaim(idSurplus, idNgo);

    const pesan = KlaimController.konfirmasiPengambilan(idKlaim);

    assert.equal(pesan, 'Pengambilan produk surplus berhasil dikonfirmasi.');
    assert.equal(
        ambilLogTerakhir(idNgo).aktivitas,
        'Mengonfirmasi pengambilan klaim Roti Ambil (5 porsi)'
    );
});
