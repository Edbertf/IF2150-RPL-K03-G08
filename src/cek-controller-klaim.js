const assert = require('node:assert/strict');

const db = require('./config/db');

const KlaimController = require('./controllers/KlaimController');
const ProdukSurplus = require('./models/ProdukSurplus');
const DokumenKlaim = require('./models/DokumenKlaim');

let ids = null;

try {
    // ==========================================
    // 1. MEMBUAT DATA PENGUJIAN
    // ==========================================

    const buatDataPengujian = db.transaction(() => {
        const identitas = Date.now();

        // Membuat akun pemilik FnB.
        const akunPemilik = db.prepare(`
            INSERT INTO akun_pengguna (
                email, kata_sandi, tipe_akun
            )
            VALUES (?, ?, ?)
        `).run(
            `test-pemilik-${identitas}@foodlink.test`,
            'password-test',
            'pemilik_fnb'
        );

        const idAkunPemilik = Number(akunPemilik.lastInsertRowid);

        // Membuat akun NGO.
        const akunNgo = db.prepare(`
            INSERT INTO akun_pengguna (
                email, kata_sandi, tipe_akun
            )
            VALUES (?, ?, ?)
        `).run(
            `test-ngo-${identitas}@foodlink.test`,
            'password-test',
            'perwakilan_ngo'
        );

        const idNgo = Number(akunNgo.lastInsertRowid);

        // Membuat data pemilik FnB.
        const pemilik = db.prepare(`
            INSERT INTO pemilik_fnb (
                id_akun, nama_usaha, alamat_usaha
            )
            VALUES (?, ?, ?)
        `).run(
            idAkunPemilik,
            'Usaha Pengujian',
            'Jl. Juanda, Bandung'
        );

        const idPemilik = Number(pemilik.lastInsertRowid);

        // Membuat data perwakilan NGO.
        db.prepare(`
            INSERT INTO perwakilan_ngo (
                id_akun, nama_organisasi, nomor_legalitas, lokasi
            )
            VALUES (?, ?, ?, ?)
        `).run(
            idNgo,
            'NGO Pengujian',
            `LEGAL-${identitas}`,
            'Jl. Dipatiukur, Bandung'
        );

        // Membuat produk.
        const produk = db.prepare(`
            INSERT INTO produk (
                id_pemilik, nama_produk, kategori
            )
            VALUES (?, ?, ?)
        `).run(
            idPemilik,
            'Roti Pengujian',
            'Makanan'
        );

        const idProduk = Number(produk.lastInsertRowid);

        // Membuat dua produk surplus untuk dua skenario pengujian.
        const buatSurplus = db.prepare(`
            INSERT INTO produk_surplus (
                id_produk,
                id_pemilik,
                jumlah,
                batas_waktu_pengambilan,
                status
            )
            VALUES (?, ?, ?, ?, 'tersedia')
        `);

        const surplusBerhasil = buatSurplus.run(
            idProduk,
            idPemilik,
            12,
            '2026-11-10 20:00:00'
        );

        const surplusRollback = buatSurplus.run(
            idProduk,
            idPemilik,
            8,
            '2026-11-10 20:00:00'
        );

        return {
            idAkunPemilik,
            idNgo,
            idPemilik,
            idProduk,
            idSurplus: Number(surplusBerhasil.lastInsertRowid),
            idSurplusRollback: Number(surplusRollback.lastInsertRowid),
        };
    });

    ids = buatDataPengujian();

    console.log('Data pengujian berhasil dibuat.');

    // ==========================================
    // 2. SKENARIO PERTAMA: KLAIM BERHASIL
    // ==========================================

    console.log('\n=== SKENARIO 1: KLAIM BERHASIL ===');

    const idKlaim = KlaimController.setujuiKlaim(
        ids.idSurplus,
        ids.idNgo
    );

    const statusSetelahKlaim = ProdukSurplus.getStatus(ids.idSurplus);
    const detailKlaim = DokumenKlaim.getDetailKlaim(idKlaim);

    assert.equal(statusSetelahKlaim, 'terklaim');
    assert.ok(detailKlaim);
    assert.equal(Number(detailKlaim.idNgo), ids.idNgo);
    assert.equal(Number(detailKlaim.idSurplus), ids.idSurplus);

    console.log('ID klaim:', idKlaim);
    console.log('Status surplus:', statusSetelahKlaim);
    console.log('Detail klaim:', detailKlaim);

    console.log('Skenario 1 berhasil.');

    // ==========================================
    // 3. SKENARIO KEDUA: PRODUK SUDAH DIKLAIM
    // ==========================================

    console.log('\n=== SKENARIO 2: KLAIM KEDUA DITOLAK ===');

    let pesanPenolakan = '';

    try {
        KlaimController.setujuiKlaim(
            ids.idSurplus,
            ids.idNgo
        );
    } catch (error) {
        pesanPenolakan = error.message;
    }

    assert.ok(pesanPenolakan);
    assert.equal(
        ProdukSurplus.getStatus(ids.idSurplus),
        'terklaim'
    );

    console.log('Pesan penolakan:', pesanPenolakan);
    console.log('Status surplus tetap terklaim.');
    console.log('Skenario 2 berhasil.');

    // ==========================================
    // 4. SKENARIO KETIGA: PENGUJIAN ROLLBACK
    // ==========================================

    console.log('\n=== SKENARIO 3: ROLLBACK KETIKA KLAIM GAGAL ===');

    let pesanError = '';

    try {
        // Menggunakan ID NGO yang tidak terdaftar.
        KlaimController.setujuiKlaim(
            ids.idSurplusRollback,
            Number.MAX_SAFE_INTEGER
        );
    } catch (error) {
        pesanError = error.message;
    }

    const statusSetelahGagal = ProdukSurplus.getStatus(
        ids.idSurplusRollback
    );

    const jumlahKlaim = db.prepare(`
        SELECT COUNT(*) AS jumlah
        FROM dokumen_klaim
        WHERE id_surplus = ?
    `).get(ids.idSurplusRollback).jumlah;

    assert.ok(pesanError);
    assert.equal(statusSetelahGagal, 'tersedia');
    assert.equal(jumlahKlaim, 0);

    console.log('Pesan error:', pesanError);
    console.log('Status surplus setelah gagal:', statusSetelahGagal);
    console.log('Jumlah dokumen klaim:', jumlahKlaim);
    console.log('Skenario 3 berhasil.');

    console.log('\nSeluruh skenario pengujian berhasil.');

} catch (error) {
    console.error('\nPengujian gagal:', error);
    process.exitCode = 1;

} finally {
    // ==========================================
    // 5. MEMBERSIHKAN DATA PENGUJIAN
    // ==========================================

    if (ids) {
        try {
            db.transaction(() => {
                db.prepare(`
                    DELETE FROM dokumen_klaim
                    WHERE id_surplus IN (?, ?)
                `).run(ids.idSurplus, ids.idSurplusRollback);

                db.prepare(`
                    DELETE FROM produk_surplus
                    WHERE id_surplus IN (?, ?)
                `).run(ids.idSurplus, ids.idSurplusRollback);

                db.prepare(`
                    DELETE FROM produk
                    WHERE id_produk = ?
                `).run(ids.idProduk);

                db.prepare(`
                    DELETE FROM pemilik_fnb
                    WHERE id_pemilik = ?
                `).run(ids.idPemilik);

                db.prepare(`
                    DELETE FROM perwakilan_ngo
                    WHERE id_akun = ?
                `).run(ids.idNgo);

                db.prepare(`
                    DELETE FROM akun_pengguna
                    WHERE id_akun IN (?, ?)
                `).run(ids.idAkunPemilik, ids.idNgo);
            })();

            console.log('\nSeluruh data pengujian berhasil dibersihkan.');

        } catch (error) {
            console.error('\nGagal membersihkan data pengujian:', error);
            process.exitCode = 1;
        }
    }

    db.close();
}