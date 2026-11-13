const db = require('./config/db');

const SurplusController = require('./controllers/SurplusController');
const Produk = require('./models/Produk');
const PemilikFnB = require('./models/PemilikFnB');
const MetodeDistribusiSurplus =
    require('./models/MetodeDistribusiSurplus');

const test = db.transaction(() => {
    const suffix = Date.now();

    // Membuat data pemilik
    const akun = db.prepare(`
        INSERT INTO akun_pengguna
            (email, kata_sandi, tipe_akun)
        VALUES (?, ?, ?)
    `).run(`pemilik${suffix}@test.com`, 'dummy', 'Pemilik FnB');

    const idPemilik = Number(db.prepare(`
        INSERT INTO pemilik_fnb
            (id_akun, nama_usaha, alamat_usaha)
        VALUES (?, ?, ?)
    `).run(
        akun.lastInsertRowid,
        'Bakery Test',
        'Jl. Juanda, Bandung'
    ).lastInsertRowid);

    // Membuat produk
    const idProduk = Number(db.prepare(`
        INSERT INTO produk
            (id_pemilik, nama_produk, kategori)
        VALUES (?, ?, ?)
    `).run(
        idPemilik,
        'Roti Test',
        'Makanan'
    ).lastInsertRowid);

    // Membuat metode distribusi
    db.prepare(`
        INSERT INTO metode_distribusi_surplus
            (id_produk, jenis_distribusi, harga)
        VALUES (?, ?, ?)
    `).run(idProduk, 'Donasi', 0);

    // Membuat satu data produk surplus untuk pengujian.
    const hasilSurplus = db.prepare(`
    INSERT INTO produk_surplus (
        id_produk,
        id_pemilik,
        jumlah,
        batas_waktu_pengambilan,
        status
    )
    VALUES (?, ?, ?, ?, 'tersedia')
    `).run(
    idProduk,
    idPemilik,
    12,
    '2026-11-10 20:00:00'
    );

    const idSurplus = Number(hasilSurplus.lastInsertRowid);

    // Menguji pengambilan detail surplus secara keseluruhan.
    const detailLengkap = SurplusController.ambilDetailSurplus(
    idSurplus,
    'Jl. Dipatiukur, Bandung'
    );

    console.log('\nDetail lengkap produk surplus:');
    console.dir(detailLengkap, { depth: null });

    console.log('Data produk:');
    console.log(Produk.getProduk(idProduk));

    console.log('\nLokasi usaha:');
    console.log(PemilikFnB.getLokasiUsaha(idPemilik));

    console.log('\nInformasi distribusi:');
    console.log(MetodeDistribusiSurplus.getInfoDistribusi(idProduk));

    throw new Error('TEST_ROLLBACK');
});

try {
    test();
} catch (error) {
    if (error.message === 'TEST_ROLLBACK') {
        console.log('\nSeluruh data pengujian berhasil di-rollback.');
    } else {
        console.error('Pengujian gagal:', error.message);
        process.exitCode = 1;
    }
} finally {
    db.close();
}
