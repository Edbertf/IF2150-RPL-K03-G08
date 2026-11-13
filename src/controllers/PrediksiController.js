const DataPenjualan = require('../models/DataPenjualan');
const PrediksiProduksi = require('../models/PrediksiProduksi');

const TARGET_HARI = 7;

function labelHari(tanggal) {
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        weekday: 'short'
    }).format(new Date(`${tanggal}T00:00:00+07:00`));
}

function daftarTanggalTerakhir(jumlahHari) {
    const hasil = [];
    const dasar = new Date(`${DataPenjualan.tanggalHariIni()}T00:00:00+07:00`);

    for (let i = jumlahHari - 1; i >= 0; i -= 1) {
        const tanggal = new Date(dasar);
        tanggal.setDate(tanggal.getDate() - i);
        hasil.push(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(tanggal));
    }

    return hasil;
}

function sapaan() {
    const jam = Number(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        hour12: false
    }).format(new Date()));

    if (jam < 11) return 'Selamat pagi,';
    if (jam < 15) return 'Selamat siang,';
    if (jam < 19) return 'Selamat sore,';
    return 'Selamat malam,';
}

function ringkasanHariIni(idPemilik) {
    const penjualan = DataPenjualan.getPenjualanHarian(idPemilik, DataPenjualan.tanggalHariIni());

    return {
        terjual: penjualan.reduce((total, item) => total + item.jumlahTerjual, 0),
        tersisa: penjualan.reduce((total, item) => total + item.jumlahTersisa, 0)
    };
}

function grafikPenjualan(idPemilik) {
    const dataHistoris = DataPenjualan.getDataHistoris(idPemilik, TARGET_HARI);
    const totalPerTanggal = new Map();

    for (const data of dataHistoris) {
        totalPerTanggal.set(data.tanggal, (totalPerTanggal.get(data.tanggal) || 0) + data.jumlahTerjual);
    }

    const hariIni = DataPenjualan.tanggalHariIni();
    const daftar = daftarTanggalTerakhir(TARGET_HARI).map((tanggal) => ({
        tanggal,
        label: labelHari(tanggal),
        terjual: totalPerTanggal.get(tanggal) || 0,
        hariIni: tanggal === hariIni
    }));

    const maksimal = Math.max(1, ...daftar.map((item) => item.terjual));

    return daftar.map((item) => ({
        ...item,
        persen: Math.round((item.terjual / maksimal) * 100)
    }));
}

exports.cekKecukupanData = (idPemilik) => {
    const dataHistoris = DataPenjualan.getDataHistoris(idPemilik, TARGET_HARI);
    const tanggalUnik = new Set(dataHistoris.map((item) => item.tanggal));

    return tanggalUnik.size >= TARGET_HARI;
};

exports.jalankanPrediksi = (idPemilik) => {
    if (!exports.cekKecukupanData(idPemilik)) {
        throw new Error('Data historis belum memenuhi syarat minimal 7 hari.');
    }

    const dataHistoris = DataPenjualan.getDataHistoris(idPemilik, TARGET_HARI);
    PrediksiProduksi.simpanPrediksi(dataHistoris);

    return PrediksiProduksi.getHasilPrediksi(idPemilik);
};

exports.tampilkanDashboard = (req, res) => {
    const idPemilik = req.user.idPemilik;
    const terisi = DataPenjualan.hitungHariTerkumpul(idPemilik, TARGET_HARI);

    let hasilPrediksi = [];
    let pesanError = null;

    try {
        hasilPrediksi = exports.jalankanPrediksi(idPemilik);
    } catch (error) {
        pesanError = error.message;
    }

    res.render('fnb/I05-DashboardF&B', {
        sapaan: sapaan(),
        namaUsaha: req.user.namaUsaha,
        ringkasan: ringkasanHariIni(idPemilik),
        grafik: grafikPenjualan(idPemilik),
        progres: { terisi, target: TARGET_HARI },
        persen: Math.min(100, Math.round((terisi / TARGET_HARI) * 100)),
        hasilPrediksi,
        pesanError
    });
};