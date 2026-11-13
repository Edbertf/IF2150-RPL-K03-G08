const db = require('../config/db');
require('./init')();

const AkunPengguna = require('../models/AkunPengguna');
const PerwakilanNGO = require('../models/PerwakilanNGO');

const EMAIL_NGO = 'ngo@foodlink.test';
const SANDI_NGO = 'password123';
const LOKASI_NGO = 'Dago, Bandung';

const pemilik = db.prepare(`
    SELECT id_pemilik AS idPemilik,
           nama_usaha  AS namaUsaha,
           alamat_usaha AS alamatUsaha
    FROM pemilik_fnb
    ORDER BY id_pemilik
    LIMIT 1
`).get();

if (!pemilik) {
    console.log('Seed surplus dilewati: jalankan "npm run db:seed" terlebih dahulu.');
    db.close();
    process.exit(0);
}

function tanggalJakarta(selisihHari) {
    const waktu = new Date(Date.now() + selisihHari * 24 * 60 * 60 * 1000);

    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(waktu);
}

// Alamat contoh bawaan seed.js tidak bisa di-geocode, jadi diganti ke alamat Bandung.
if (/jl\. contoh/i.test(pemilik.alamatUsaha || '')) {
    db.prepare('UPDATE pemilik_fnb SET alamat_usaha = ? WHERE id_pemilik = ?')
        .run('Jl. Dipatiukur, Bandung', pemilik.idPemilik);
    console.log('Alamat demo diperbarui menjadi Jl. Dipatiukur, Bandung.');
}

const akunNgo = db.prepare('SELECT id_akun FROM akun_pengguna WHERE email = ?').get(EMAIL_NGO);

if (akunNgo) {
    console.log('Akun NGO sudah ada:', EMAIL_NGO);
} else {
    const idAkun = AkunPengguna.registrasi({
        email: EMAIL_NGO,
        kataSandi: SANDI_NGO,
        tipeAkun: 'perwakilan_ngo'
    });

    PerwakilanNGO.simpanProfil(idAkun, {
        namaOrganisasi: 'NGO Pangan Peduli',
        nomorLegalitas: 'AHU-0000001.AH.01.07.TAHUN 2026',
        lokasi: LOKASI_NGO
    });

    console.log('Akun NGO dibuat:', EMAIL_NGO, '/', SANDI_NGO);
}

const produkContoh = [
    {
        nama: 'Nasi Goreng Spesial',
        kategori: 'Makanan',
        jumlah: 5,
        jenisDistribusi: 'Donasi',
        harga: 0,
        batasWaktu: `${tanggalJakarta(0)} 23:59`
    },
    {
        nama: 'Es Teh Manis',
        kategori: 'Minuman',
        jumlah: 10,
        jenisDistribusi: 'Jual Diskon',
        harga: 5000,
        batasWaktu: `${tanggalJakarta(1)} 12:00`
    }
];

// Tambahkan surplus untuk produk demo yang sudah ada (Roti Tawar) bila belum punya.
const produkDariSeed = db.prepare(`
    SELECT id_produk AS idProduk
    FROM produk
    WHERE id_pemilik = ? AND nama_produk = 'Roti Tawar'
`).get(pemilik.idPemilik);

if (produkDariSeed) {
    produkContoh.push({
        idProduk: produkDariSeed.idProduk,
        nama: 'Roti Tawar',
        kategori: 'Makanan',
        jumlah: 8,
        jenisDistribusi: 'Donasi',
        harga: 0,
        batasWaktu: `${tanggalJakarta(2)} 18:00`
    });
}

const cariProduk = db.prepare(`
    SELECT id_produk AS idProduk
    FROM produk
    WHERE id_pemilik = ? AND nama_produk = ?
`);

const tambahProduk = db.prepare(`
    INSERT INTO produk (id_pemilik, nama_produk, kategori)
    VALUES (?, ?, ?)
`);

const cariMetode = db.prepare(
    'SELECT id_distribusi FROM metode_distribusi_surplus WHERE id_produk = ?'
);

const tambahMetode = db.prepare(`
    INSERT INTO metode_distribusi_surplus (id_produk, jenis_distribusi, harga)
    VALUES (?, ?, ?)
`);

const cariSurplus = db.prepare(`
    SELECT id_surplus
    FROM produk_surplus
    WHERE id_produk = ? AND status = 'tersedia'
`);

const tambahSurplus = db.prepare(`
    INSERT INTO produk_surplus (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status)
    VALUES (?, ?, ?, ?, 'tersedia')
`);

const simpan = db.transaction(() => {
    for (const item of produkContoh) {
        let idProduk = item.idProduk;

        if (!idProduk) {
            const produk = cariProduk.get(pemilik.idPemilik, item.nama);

            if (produk) {
                idProduk = produk.idProduk;
            } else {
                idProduk = Number(
                    tambahProduk.run(pemilik.idPemilik, item.nama, item.kategori).lastInsertRowid
                );
            }
        }

        if (!cariMetode.get(idProduk)) {
            tambahMetode.run(idProduk, item.jenisDistribusi, item.harga);
        }

        if (!cariSurplus.get(idProduk)) {
            tambahSurplus.run(
                idProduk,
                pemilik.idPemilik,
                item.jumlah,
                item.batasWaktu
            );
        }
    }
});

simpan();

console.log('Seed surplus selesai. Akun NGO:', EMAIL_NGO, '/', SANDI_NGO);
db.close();
