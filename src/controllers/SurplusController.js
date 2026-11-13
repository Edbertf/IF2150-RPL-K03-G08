// C27 SurplusController
const ProdukSurplus = require('../models/ProdukSurplus');
const Produk = require('../models/Produk');
const PemilikFnB = require('../models/PemilikFnB');
const MetodeDistribusiSurplus = require('../models/MetodeDistribusiSurplus');
const GeolocationAdapter = require('../models/GeolocationAdapter');

const ZONA_WAKTU = 'Asia/Jakarta';

function teks(nilai) {
    return String(nilai ?? '').trim();
}

function parseWaktu(nilai) {
    const isi = teks(nilai);
    if (!isi) return NaN;

    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(isi)) {
        return new Date(`${isi.replace(' ', 'T')}+07:00`).getTime();
    }

    return new Date(isi).getTime();
}

function belumLewat(nilai) {
    const waktu = parseWaktu(nilai);
    return Number.isFinite(waktu) && waktu > Date.now();
}

function bagianTanggal(waktu) {
    const bagian = new Intl.DateTimeFormat('en-CA', {
        timeZone: ZONA_WAKTU,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).formatToParts(waktu);

    const ambil = (jenis) => bagian.find((item) => item.type === jenis).value;
    return `${ambil('year')}-${ambil('month')}-${ambil('day')}`;
}

function jamJakarta(waktu) {
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: ZONA_WAKTU,
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    }).format(waktu);
}

function formatBatasWaktu(nilai) {
    const waktu = parseWaktu(nilai);
    if (!Number.isFinite(waktu)) return '-';

    const sekarang = Date.now();
    const tanggal = bagianTanggal(waktu);

    if (tanggal === bagianTanggal(sekarang)) return `Hari ini, ${jamJakarta(waktu)}`;
    if (tanggal === bagianTanggal(sekarang + 24 * 60 * 60 * 1000)) {
        return `Besok, ${jamJakarta(waktu)}`;
    }

    return new Intl.DateTimeFormat('id-ID', {
        timeZone: ZONA_WAKTU,
        day: 'numeric',
        month: 'short'
    }).format(waktu) + `, ${jamJakarta(waktu)}`;
}

function formatSisaWaktu(nilai) {
    const waktu = parseWaktu(nilai);
    if (!Number.isFinite(waktu)) return '';

    const selisihMenit = Math.floor((waktu - Date.now()) / 60000);
    if (selisihMenit <= 0) return 'sudah lewat';

    const hari = Math.floor(selisihMenit / 1440);
    const jam = Math.floor((selisihMenit % 1440) / 60);
    const menit = selisihMenit % 60;

    if (hari > 0) return `${hari} hari ${jam} jam`;
    if (jam > 0 && menit > 0) return `${jam} jam ${menit} menit`;
    if (jam > 0) return `${jam} jam`;
    return `${menit} menit`;
}

function formatJarak(jarak) {
    if (jarak === null || jarak === undefined || !Number.isFinite(jarak)) {
        return 'Jarak belum tersedia';
    }

    return `${jarak.toFixed(1).replace('.', ',')} km`;
}

function formatRupiah(harga) {
    return `Rp ${Number(harga).toLocaleString('id-ID')}`;
}

function satuan(kategori) {
    if (kategori === 'Minuman') return 'gelas';
    if (kategori === 'Makanan') return 'porsi';
    return 'item';
}

function urutkanBerdasarkanJarak(daftarSurplus) {
    return [...daftarSurplus].sort((a, b) => {
        const jarakA = a.jarakProduk;
        const jarakB = b.jarakProduk;

        if (jarakA === null && jarakB === null) return a.idSurplus - b.idSurplus;
        if (jarakA === null) return 1;
        if (jarakB === null) return -1;

        return jarakA - jarakB || a.idSurplus - b.idSurplus;
    });
}

async function susunSurplus(surplus, lokasi) {
    const produk = Produk.getProduk(surplus.idProduk);
    if (!produk) return null;

    const infoDistribusi = MetodeDistribusiSurplus.getInfoDistribusi(produk.idProduk);
    const namaUsaha = PemilikFnB.getNamaUsaha(surplus.idPemilik) || 'Pemilik F&B';
    const lokasiPengambilan = PemilikFnB.getLokasiUsaha(surplus.idPemilik) || '';

    let jarakProduk = null;

    if (teks(lokasi) && teks(lokasiPengambilan)) {
        try {
            jarakProduk = await GeolocationAdapter.hitungJarak(lokasi, lokasiPengambilan);
        } catch {
            // Alamat yang tidak bisa di-geocode tetap ditampilkan tanpa jarak.
            jarakProduk = null;
        }
    }

    const kategori = produk.kategori || 'Makanan';
    const jumlah = Number(surplus.jumlah);
    const jenisDistribusi = infoDistribusi ? infoDistribusi.jenisDistribusi : null;
    const harga = infoDistribusi ? Number(infoDistribusi.harga) : 0;

    let badgeTeks = 'Metode belum diatur';
    let badgeKelas = 'netral';

    if (jenisDistribusi === 'Donasi') {
        badgeTeks = 'Donasi';
        badgeKelas = 'donasi';
    } else if (jenisDistribusi === 'Jual Diskon') {
        badgeTeks = formatRupiah(harga);
        badgeKelas = 'harga';
    }

    return {
        idSurplus: surplus.idSurplus,
        namaProduk: produk.namaProduk,
        kategori,
        jumlah,
        jumlahTampil: `${jumlah} ${satuan(kategori)}`,
        namaUsaha,
        lokasiPengambilan,
        jarakProduk,
        jarakTampil: formatJarak(jarakProduk),
        batasWaktuPengambilan: surplus.batasWaktuPengambilan,
        batasWaktuTampil: formatBatasWaktu(surplus.batasWaktuPengambilan),
        sisaWaktuTampil: formatSisaWaktu(surplus.batasWaktuPengambilan),
        jenisDistribusi,
        harga,
        badgeTeks,
        badgeKelas,
        status: surplus.status
    };
}

// C27 ambilDaftarSurplus(lokasi)
async function ambilDaftarSurplus(lokasi) {
    const daftar = ProdukSurplus.getProdukSurplusTersedia();
    const hasil = [];

    for (const surplus of daftar) {
        if (!belumLewat(surplus.batasWaktuPengambilan)) continue;

        const item = await susunSurplus(surplus, lokasi);
        if (item) hasil.push(item);
    }

    return urutkanBerdasarkanJarak(hasil);
}

// C27 ambilDetailSurplus(idSurplus, lokasi)
async function ambilDetailSurplus(idSurplus, lokasi) {
    const id = Number(idSurplus);

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error('ID produk surplus tidak valid.');
    }

    const surplus = ProdukSurplus.getDetailSurplus(id);

    if (!surplus) {
        throw new Error('Produk surplus tidak ditemukan.');
    }

    return susunSurplus(surplus, lokasi);
}

function saringKataKunci(daftar, kataKunci) {
    const kunci = teks(kataKunci).toLowerCase();
    if (!kunci) return daftar;

    return daftar.filter((item) =>
        teks(item.namaProduk).toLowerCase().includes(kunci)
    );
}

function saringJenis(daftar, jenisProduk) {
    if (!jenisProduk) return daftar;
    return daftar.filter((item) => item.kategori === jenisProduk);
}

const PILIHAN_JARAK = [1, 2, 5, 10];
const PILIHAN_WAKTU = ['hari-ini', 'besok'];

function saringJarak(daftar, jarakMaks) {
    if (!jarakMaks) return daftar;

    return daftar.filter(
        (item) => item.jarakProduk !== null && item.jarakProduk <= jarakMaks
    );
}

function tanggalJakarta(nilai) {
    const waktu = parseWaktu(nilai);
    return Number.isFinite(waktu) ? bagianTanggal(waktu) : null;
}

function saringWaktu(daftar, waktu) {
    if (!waktu) return daftar;

    const selisihHari = waktu === 'besok' ? 1 : 0;
    const tanggalTarget = bagianTanggal(
        Date.now() + selisihHari * 24 * 60 * 60 * 1000
    );

    return daftar.filter(
        (item) => tanggalJakarta(item.batasWaktuPengambilan) === tanggalTarget
    );
}

function ambilQuery(req, nama) {
    const nilai = req.query ? req.query[nama] : undefined;
    return Array.isArray(nilai) ? teks(nilai[0]) : teks(nilai);
}

function tautanDaftar({ q, jenis, jarak, waktu } = {}) {
    const parameter = new URLSearchParams();

    if (q) parameter.set('q', q);
    if (jenis) parameter.set('jenis', jenis);
    if (jarak) parameter.set('jarak', String(jarak));
    if (waktu) parameter.set('waktu', waktu);

    const query = parameter.toString();
    return query ? `/ngo/surplus?${query}` : '/ngo/surplus';
}

// Handler halaman I-12 (daftar surplus).
exports.tampilkanDaftarSurplus = async (req, res) => {
    const pengguna = req.user || {};
    const lokasi = teks(pengguna.lokasi);
    const kataKunci = ambilQuery(req, 'q');
    const jenisDiminta = ambilQuery(req, 'jenis');
    const jenisAktif = ['Makanan', 'Minuman'].includes(jenisDiminta) ? jenisDiminta : '';

    const jarakDiminta = Number(ambilQuery(req, 'jarak'));
    const jarakAktif = PILIHAN_JARAK.includes(jarakDiminta) ? jarakDiminta : null;

    const waktuDiminta = ambilQuery(req, 'waktu');
    const waktuAktif = PILIHAN_WAKTU.includes(waktuDiminta) ? waktuDiminta : '';

    let daftar = [];
    let galat = null;

    try {
        daftar = await ambilDaftarSurplus(lokasi);
    } catch (kesalahan) {
        galat = 'Daftar produk surplus gagal dimuat. Silakan coba lagi.';
    }

    const totalTersedia = daftar.length;

    daftar = saringWaktu(
        saringJarak(
            saringJenis(saringKataKunci(daftar, kataKunci), jenisAktif),
            jarakAktif
        ),
        waktuAktif
    );

    return res.render('ngo/I12-DaftarSurplus', {
        pengguna,
        lokasi,
        lokasiTersedia: Boolean(lokasi),
        daftar,
        totalTersedia,
        totalDitampilkan: daftar.length,
        kataKunci,
        jenisAktif,
        jarakAktif,
        waktuAktif,
        pilihanJarak: PILIHAN_JARAK,
        adaFilter: Boolean(kataKunci || jenisAktif || jarakAktif || waktuAktif),
        galat,
        tautan: {
            semua: tautanDaftar({ q: kataKunci, waktu: waktuAktif }),
            hapus: '/ngo/surplus',
            makanan: tautanDaftar({
                q: kataKunci,
                jenis: 'Makanan',
                jarak: jarakAktif,
                waktu: waktuAktif
            }),
            minuman: tautanDaftar({
                q: kataKunci,
                jenis: 'Minuman',
                jarak: jarakAktif,
                waktu: waktuAktif
            }),
            dekat: tautanDaftar({
                q: kataKunci,
                jenis: jenisAktif,
                jarak: jarakAktif ? null : 2,
                waktu: waktuAktif
            })
        }
    });
};

// Handler halaman I-15 (detail produk).
exports.tampilkanDetailSurplus = async (req, res) => {
    const pengguna = req.user || {};
    const lokasi = teks(pengguna.lokasi);

    try {
        const detail = await ambilDetailSurplus(req.params.idSurplus, lokasi);

        return res.render('ngo/I15-DetailProduk', {
            pengguna,
            detail,
            tidakDitemukan: false,
            pesan: null
        });
    } catch (kesalahan) {
        return res.status(404).render('ngo/I15-DetailProduk', {
            pengguna,
            detail: null,
            tidakDitemukan: true,
            pesan: kesalahan.message
        });
    }
};

exports.ambilDaftarSurplus = ambilDaftarSurplus;
exports.ambilDetailSurplus = ambilDetailSurplus;
exports.urutkanBerdasarkanJarak = urutkanBerdasarkanJarak;
