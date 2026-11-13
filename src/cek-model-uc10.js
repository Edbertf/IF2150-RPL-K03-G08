const db = require('./config/db');

const ProdukSurplus = require('./models/ProdukSurplus');
const DokumenKlaim = require('./models/DokumenKlaim');

const testModel = db.transaction(() => {
    const suffix = Date.now();

    // 1. Membuat akun Pemilik F&B
    const akunPemilik = db.prepare(`
        INSERT INTO akun_pengguna
            (email, kata_sandi, tipe_akun)
        VALUES (?, ?, ?)
    `).run(`pemilik${suffix}@test.com`, 'dummy', 'Pemilik FnB');

    const idPemilik = Number(
        db.prepare(`
            INSERT INTO pemilik_fnb
                (id_akun, nama_usaha, alamat_usaha)
            VALUES (?, ?, ?)
        `).run(
            akunPemilik.lastInsertRowid,
            'Bakery Test',
            'Bandung'
        ).lastInsertRowid
    );

    // 2. Membuat akun Perwakilan NGO
    const akunNgo = db.prepare(`
        INSERT INTO akun_pengguna
            (email, kata_sandi, tipe_akun)
        VALUES (?, ?, ?)
    `).run(`ngo${suffix}@test.com`, 'dummy', 'Perwakilan NGO');

    const idNgo = Number(akunNgo.lastInsertRowid);

    db.prepare(`
        INSERT INTO perwakilan_ngo
            (id_akun, nama_organisasi, nomor_legalitas, lokasi)
        VALUES (?, ?, ?, ?)
    `).run(idNgo, 'NGO Test', 'LEGAL-001', 'Bandung');

    // 3. Membuat produk
    const idProduk = Number(
        db.prepare(`
            INSERT INTO produk
                (id_pemilik, nama_produk, kategori)
            VALUES (?, ?, ?)
        `).run(idPemilik, 'Roti Test', 'Makanan')
        .lastInsertRowid
    );

    // 4. Membuat produk surplus
    const idSurplus = Number(
        db.prepare(`
            INSERT INTO produk_surplus
                (id_produk, id_pemilik, jumlah,
                 batas_waktu_pengambilan, status)
            VALUES (?, ?, ?, ?, 'tersedia')
        `).run(
            idProduk,
            idPemilik,
            12,
            '2026-11-10 20:00:00'
        ).lastInsertRowid
    );

    console.log('\n=== PENGUJIAN PRODUKSURPLUS ===');

    // 5. Mengambil detail surplus
    console.log(
        'Detail surplus:',
        ProdukSurplus.getDetailSurplus(idSurplus)
    );

    // 6. Memeriksa status awal
    console.log(
        'Status awal:',
        ProdukSurplus.getStatus(idSurplus)
    );

    // 7. Memperbarui status
    ProdukSurplus.setStatus(idSurplus, 'terklaim');

    console.log(
        'Status setelah diperbarui:',
        ProdukSurplus.getStatus(idSurplus)
    );

    console.log('\n=== PENGUJIAN DOKUMENKLAIM ===');

    // 8. Mencatat klaim
    const idKlaim = DokumenKlaim.catatKlaim(
        idNgo,
        idSurplus
    );

    console.log('ID klaim:', idKlaim);

    // 9. Mengambil detail klaim
    console.log(
        'Detail klaim:',
        DokumenKlaim.getDetailKlaim(idKlaim)
    );

    // Melempar error khusus agar seluruh data uji di-rollback
    throw new Error('TEST_ROLLBACK');
});

try {
    testModel();
} catch (error) {
    if (error.message === 'TEST_ROLLBACK') {
        console.log('\nSeluruh data pengujian berhasil di-rollback.');
    } else {
        console.error('\nPengujian gagal:', error.message);
        process.exitCode = 1;
    }
} finally {
    db.close();
}