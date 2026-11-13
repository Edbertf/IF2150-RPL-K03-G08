const db = require('./config/db');

const bcrypt = require('bcryptjs');

const passwordHash = bcrypt.hashSync('password-dummy', 10);

try {
    const buatSurplusDummy = db.transaction(() => {

        // ======================================
        // 1. MEMBUAT AKUN PEMILIK FNB
        // ======================================

        const email = 'pemilik-dummy@foodlink.test';

        let akun = db.prepare(`
            SELECT id_akun, tipe_akun
            FROM akun_pengguna
            WHERE email = ?
        `).get(email);

        let idAkun;

        if (akun) {
            if (akun.tipe_akun !== 'pemilik_fnb') {
                throw new Error(
                    'Email dummy sudah digunakan oleh tipe akun lain.'
                );
            }

            idAkun = akun.id_akun;

            db.prepare(`
                UPDATE akun_pengguna
                SET kata_sandi = ?
                WHERE id_akun = ?
            `).run(passwordHash, idAkun);

        } else {
            const hasilAkun = db.prepare(`
                INSERT INTO akun_pengguna (
                    email,
                    kata_sandi,
                    tipe_akun
                )
                VALUES (?, ?, ?)
            `).run(email, passwordHash, 'pemilik_fnb');

            idAkun = Number(hasilAkun.lastInsertRowid);
        }

        // ======================================
        // 2. MEMBUAT DATA PEMILIK FNB
        // ======================================

        let pemilik = db.prepare(`
            SELECT id_pemilik
            FROM pemilik_fnb
            WHERE id_akun = ?
        `).get(idAkun);

        let idPemilik;

        if (pemilik) {
            idPemilik = pemilik.id_pemilik;
        } else {
            const hasilPemilik = db.prepare(`
                INSERT INTO pemilik_fnb (
                    id_akun, nama_usaha, alamat_usaha
                )
                VALUES (?, ?, ?)
            `).run(
                idAkun,
                'Bakery Sinar Pagi',
                'Jl. Ir. H. Juanda No. 45, Bandung'
            );

            idPemilik = Number(hasilPemilik.lastInsertRowid);
        }

        // ======================================
        // 3. MEMBUAT PRODUK
        // ======================================

        let produk = db.prepare(`
            SELECT id_produk
            FROM produk
            WHERE id_pemilik = ?
              AND nama_produk = ?
        `).get(idPemilik, 'Roti Tawar & Manis Campur');

        let idProduk;

        if (produk) {
            idProduk = produk.id_produk;
        } else {
            const hasilProduk = db.prepare(`
                INSERT INTO produk (
                    id_pemilik, nama_produk, kategori
                )
                VALUES (?, ?, ?)
            `).run(
                idPemilik,
                'Roti Tawar & Manis Campur',
                'Makanan'
            );

            idProduk = Number(hasilProduk.lastInsertRowid);
        }

        // ======================================
        // 4. MEMBUAT METODE DISTRIBUSI
        // ======================================

        const distribusi = db.prepare(`
            SELECT id_distribusi
            FROM metode_distribusi_surplus
            WHERE id_produk = ?
        `).get(idProduk);

        if (!distribusi) {
            db.prepare(`
                INSERT INTO metode_distribusi_surplus (
                    id_produk, jenis_distribusi, harga
                )
                VALUES (?, ?, ?)
            `).run(idProduk, 'Donasi', 0);
        }

        // ======================================
        // 5. MEMBUAT PRODUK SURPLUS
        // ======================================

        // Gunakan surplus yang masih tersedia jika sudah ada.
        let surplus = db.prepare(`
            SELECT id_surplus, status
            FROM produk_surplus
            WHERE id_produk = ?
              AND id_pemilik = ?
              AND status = 'tersedia'
            ORDER BY id_surplus DESC
            LIMIT 1
        `).get(idProduk, idPemilik);

        let idSurplus;

        if (surplus) {
            idSurplus = surplus.id_surplus;

            // Perbarui batas waktu surplus yang masih tersedia.
            db.prepare(`
                UPDATE produk_surplus
                SET batas_waktu_pengambilan =
                    datetime('now', '+2 days', 'localtime')
                WHERE id_surplus = ?
                AND status = 'tersedia'
            `).run(idSurplus);
        } else {
            const hasilSurplus = db.prepare(`
                INSERT INTO produk_surplus (
                    id_produk,
                    id_pemilik,
                    jumlah,
                    batas_waktu_pengambilan,
                    status
                )
                VALUES (?, ?, ?, datetime('now', '+2 days', 'localtime'), ?)
            `).run(
                idProduk,
                idPemilik,
                12,
                'tersedia'
            );

            idSurplus = Number(hasilSurplus.lastInsertRowid);
        }

        return {
            idPemilik,
            idProduk,
            idSurplus
        };
    });

    // Jalankan transaksi.
    const hasil = buatSurplusDummy();

    // Tampilkan data lengkap.
    const detail = db.prepare(`
        SELECT
            ps.id_surplus AS idSurplus,
            ps.jumlah,
            ps.batas_waktu_pengambilan AS batasWaktu,
            ps.status,

            p.nama_produk AS namaProduk,
            p.kategori,

            pf.nama_usaha AS namaUsaha,
            pf.alamat_usaha AS alamatUsaha,

            md.jenis_distribusi AS jenisDistribusi,
            md.harga

        FROM produk_surplus ps

        JOIN produk p
            ON ps.id_produk = p.id_produk

        JOIN pemilik_fnb pf
            ON ps.id_pemilik = pf.id_pemilik

        LEFT JOIN metode_distribusi_surplus md
            ON p.id_produk = md.id_produk

        WHERE ps.id_surplus = ?
    `).get(hasil.idSurplus);

    console.log('\nData surplus dummy berhasil disiapkan:');
    console.log(detail);

    console.log(
        `\nBuka halaman N4: http://localhost:3000/ngo/surplus/${hasil.idSurplus}`
    );

} catch (error) {
    console.error('\nGagal membuat data surplus dummy:', error);
    process.exitCode = 1;

} finally {
    db.close();
}