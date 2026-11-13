const ProdukSurplus = require('../models/ProdukSurplus');
const Produk = require('../models/Produk');
const MetodeDistribusiSurplus = require('../models/MetodeDistribusiSurplus');
const LogAktivitas = require('../models/LogAktivitas');

const ZONA_WAKTU = 'Asia/Jakarta';

function ambilSurplus(idSurplus, idPemilik) {
    const id = Number(idSurplus);
    if (!Number.isInteger(id) || id <= 0) return null;

    const surplus = ProdukSurplus.getDetailSurplus(id);
    if (!surplus || surplus.idPemilik !== idPemilik) return null;

    const produk = Produk.getProduk(surplus.idProduk);

    return {
        ...surplus,
        namaProduk: produk ? produk.namaProduk : 'Produk surplus'
    };
}

function formatBatasWaktu(nilai) {
    const isi = String(nilai ?? '').trim();
    if (!isi) return '-';

    const waktu = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(isi)
        ? new Date(`${isi.replace(' ', 'T')}+07:00`)
        : new Date(isi);

    if (!Number.isFinite(waktu.getTime())) return isi;

    return new Intl.DateTimeFormat('id-ID', {
        timeZone: ZONA_WAKTU,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(waktu);
}

function dataRingkasan(surplus) {
    return {
        namaProduk: surplus.namaProduk,
        jumlah: surplus.jumlah,
        ambilSebelum: formatBatasWaktu(surplus.batasWaktuPengambilan)
    };
}

function renderForm(req, res, surplus, error, status = 200) {
    return res.status(status).render('surplus/I09-AturDistribusi', {
        user: req.user,
        idSurplus: req.params.id,
        data: surplus ? dataRingkasan(surplus) : null,
        error
    });
}

class DistribusiSurplusController {
    static tampilFormDistribusi(req, res) {
        const surplus = ambilSurplus(req.params.id, req.user.idPemilik);

        if (!surplus) {
            return renderForm(req, res, null, 'Produk surplus tidak ditemukan.', 404);
        }

        return renderForm(req, res, surplus, null);
    }

    static simpanDistribusi(req, res) {
        const surplus = ambilSurplus(req.params.id, req.user.idPemilik);

        if (!surplus) {
            return renderForm(req, res, null, 'Produk surplus tidak ditemukan.', 404);
        }

        if (surplus.status !== 'tersedia') {
            return renderForm(req, res, surplus, 'Surplus sudah tidak tersedia.', 400);
        }

        const diskon = req.body.metode === 'diskon';
        const harga = Number(String(req.body.hargaJual ?? '').replace(/\D/g, '')) || 0;

        if (diskon && harga <= 0) {
            return renderForm(req, res, surplus, 'Harga jual diskon harus lebih dari 0.', 400);
        }

        MetodeDistribusiSurplus.simpanMetode(
            surplus.idProduk,
            diskon ? 'Jual Diskon' : 'Donasi',
            diskon ? harga : 0
        );

        LogAktivitas.catatLog(
            req.user.idAkun,
            `Menetapkan distribusi surplus ${surplus.namaProduk} sebagai ${diskon ? `Jual Diskon Rp ${harga.toLocaleString('id-ID')}` : 'Donasi'}`
        );

        req.session.suksesDistribusi = {
            ...dataRingkasan(surplus),
            metode: diskon ? 'diskon' : 'donasi'
        };

        return res.redirect('/surplus/sukses');
    }

    static tampilSukses(req, res) {
        const result = req.session.suksesDistribusi;

        if (!result) {
            return res.redirect('/surplus/catat');
        }

        delete req.session.suksesDistribusi;

        return res.render('surplus/I11-SuksesPublikasi', {
            user: req.user,
            result
        });
    }
}

module.exports = DistribusiSurplusController;
