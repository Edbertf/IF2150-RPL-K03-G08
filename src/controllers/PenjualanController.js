const Produk = require('../models/Produk');
const DataPenjualan = require('../models/DataPenjualan');
const LogAktivitas = require('../models/LogAktivitas');

const TARGET_HARI = 7;
const BATAS_MAKS = 1000;

function formatTanggal(tanggal) {
    const dasar = new Date(`${tanggal}T00:00:00+07:00`);
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(dasar);
}

function infoHalaman(idPemilik) {
    const tanggal = DataPenjualan.tanggalHariIni();
    const terisi = DataPenjualan.hitungHariTerkumpul(idPemilik, TARGET_HARI);

    return {
        tanggal,
        tanggalTampil: formatTanggal(tanggal),
        progres: { terisi, target: TARGET_HARI },
        persen: Math.min(100, Math.round((terisi / TARGET_HARI) * 100))
    };
}

function daftarProdukHariIni(idPemilik, tanggal) {
    const daftarProduk = Produk.getDetailProduk(idPemilik);
    const tersimpan = DataPenjualan.getPenjualanHarian(idPemilik, tanggal);
    const peta = new Map(tersimpan.map((item) => [item.idProduk, item]));

    return daftarProduk.map((produk) => ({
        ...produk,
        jumlahTerjual: peta.get(produk.idProduk)?.jumlahTerjual ?? null,
        jumlahTersisa: peta.get(produk.idProduk)?.jumlahTersisa ?? null
    }));
}

function ambilDataPenjualan(req, daftarProduk) {
    const data = [];

    for (const produk of daftarProduk) {
        const rawTerjual = String(req.body[`terjual_${produk.idProduk}`] ?? '').trim();
        const rawTersisa = String(req.body[`tersisa_${produk.idProduk}`] ?? '').trim();

        if (rawTerjual === '' && rawTersisa === '') continue;

        data.push({
            idProduk: produk.idProduk,
            namaProduk: produk.namaProduk,
            jumlahTerjual: rawTerjual === '' ? NaN : Number(rawTerjual),
            jumlahTersisa: rawTersisa === '' ? NaN : Number(rawTersisa)
        });
    }

    return data;
}

function pesanValidasi(dataPenjualan) {
    if (!Array.isArray(dataPenjualan) || dataPenjualan.length === 0) {
        return 'Isi minimal satu produk.';
    }

    for (const produk of dataPenjualan) {
        const nama = produk.namaProduk || `produk #${produk.idProduk}`;

        if (produk.idProduk === undefined || produk.idProduk === null) {
            return 'Produk tidak dikenal.';
        }
        if (
            !Number.isInteger(produk.jumlahTerjual) ||
            produk.jumlahTerjual < 0 ||
            produk.jumlahTerjual > BATAS_MAKS
        ) {
            return `Jumlah terjual untuk ${nama} harus bilangan bulat 0–${BATAS_MAKS}.`;
        }
        if (
            !Number.isInteger(produk.jumlahTersisa) ||
            produk.jumlahTersisa < 0 ||
            produk.jumlahTersisa > BATAS_MAKS
        ) {
            return `Jumlah tersisa untuk ${nama} harus bilangan bulat 0–${BATAS_MAKS}.`;
        }
    }

    return null;
}


exports.validasiInputPenjualan = (dataPenjualan) => pesanValidasi(dataPenjualan) === null;

exports.simpanDataPenjualan = (dataPenjualan) => {
    if (!exports.validasiInputPenjualan(dataPenjualan)) {
        throw new Error('Format isian penjualan tidak valid.');
    }
    DataPenjualan.catatPenjualan(dataPenjualan);
};

exports.tampilkanFormPenjualan = (req, res) => {
    const info = infoHalaman(req.user.idPemilik);

    res.render('fnb/I06-PenjualanHarian', {
        daftarProduk: daftarProdukHariIni(req.user.idPemilik, info.tanggal),
        error: null,
        old: {},
        ...info
    });
};

exports.kirimDataPenjualan = (req, res) => {
    const info = infoHalaman(req.user.idPemilik);
    const daftarProduk = daftarProdukHariIni(req.user.idPemilik, info.tanggal);
    const dataPenjualan = ambilDataPenjualan(req, daftarProduk);
    const pesan = pesanValidasi(dataPenjualan);

    if (pesan) {
        return res.status(400).render('fnb/I06-PenjualanHarian', {
            daftarProduk,
            error: pesan,
            old: req.body,
            ...info
        });
    }

    exports.simpanDataPenjualan(dataPenjualan);
    LogAktivitas.catatLog(req.user.idAkun, 'Mencatat penjualan harian hari ini');
    res.redirect('/fnb/penjualan/tersimpan');
};

exports.tampilkanPenjualanTersimpan = (req, res) => {
    res.render('fnb/I07-PenjualanTersimpan', infoHalaman(req.user.idPemilik));
};