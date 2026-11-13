const express = require('express');
const router = express.Router();

const { butuhPeran } = require('../middleware/peran');

router.use(butuhPeran('perwakilan_ngo'));

const SurplusController = require('../controllers/SurplusController');
const KlaimController = require('../controllers/KlaimController');
const DokumenKlaim = require('../models/DokumenKlaim');


// ==========================================
// HELPER
// ==========================================

// Mengubah batas waktu dari database menjadi format tampilan.
function formatBatasWaktu(nilaiTanggal) {
    if (!nilaiTanggal) {
        return '-';
    }

    const tanggal = new Date(
        String(nilaiTanggal).replace(' ', 'T')
    );

    if (Number.isNaN(tanggal.getTime())) {
        return String(nilaiTanggal);
    }

    const jam = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    }).format(tanggal);

    const hariIni = new Date();
    const tanggalHariIni = new Date(
        hariIni.getFullYear(),
        hariIni.getMonth(),
        hariIni.getDate()
    );

    const tanggalTarget = new Date(
        tanggal.getFullYear(),
        tanggal.getMonth(),
        tanggal.getDate()
    );

    const selisihHari = Math.round(
        (tanggalTarget - tanggalHariIni) / (1000 * 60 * 60 * 24)
    );

    let labelTanggal;

    if (selisihHari === 0) {
        labelTanggal = 'Hari ini';
    } else if (selisihHari === 1) {
        labelTanggal = 'Besok';
    } else {
        labelTanggal = new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(tanggal);
    }

    return `${labelTanggal}, ${jam}`;
}

// Mengubah hasil SurplusController menjadi objek yang digunakan EJS.
function buatDataSurplus(detail, namaOrganisasi) {
    const batasWaktu = formatBatasWaktu(
        detail.detailSurplus.batasWaktuPengambilan
    );

    const jarak = Number(detail.jarak)
        .toFixed(1)
        .replace('.', ',');

    return {
        idSurplus: detail.detailSurplus.idSurplus,

        kategori: detail.detailProduk.kategori,
        jenisDistribusi: detail.infoDistribusi.jenisDistribusi,

        namaProduk: detail.detailProduk.namaProduk,
        namaUsaha: detail.namaUsaha,

        jumlah: detail.detailSurplus.jumlah,
        satuan: 'porsi',

        alamatUsaha: detail.lokasiPemilik,
        jarak: `${jarak} km`,

        batasWaktuTampil: batasWaktu,
        batasWaktuSingkat: batasWaktu,

        namaOrganisasi
    };
}

// ==========================================
// N4 - DETAIL PRODUK
// ==========================================

router.get('/surplus/:idSurplus', (req, res) => {
    try {
        const detail = SurplusController.ambilDetailSurplus(
            req.params.idSurplus,
            req.user.lokasi
        );

        // N4 hanya dapat dibuka jika surplus masih tersedia.
        if (detail.detailSurplus.status !== 'tersedia') {
            return res.status(409).send(
                'Produk surplus sudah tidak tersedia.'
            );
        }

        const surplus = buatDataSurplus(detail, req.user.nama);

        return res.render('ngo/N4-DetailProduk', {
            surplus
        });

    } catch (error) {
        console.error('Gagal menampilkan detail surplus:', error);

        return res.status(404).send(error.message);
    }
});

// ==========================================
// N5 - PROSES KONFIRMASI KLAIM
// ==========================================

router.post('/surplus/:idSurplus/klaim', (req, res) => {
    try {
        const idNgo = req.user.idNgo ?? req.user.idAkun;

        const idKlaim = KlaimController.setujuiKlaim(
            req.params.idSurplus,
            idNgo
        );

        // Jika berhasil, arahkan NGO ke halaman N6.
        return res.redirect(
            `/ngo/klaim/${idKlaim}/berhasil`
        );

    } catch (error) {
        console.error('Gagal memproses klaim:', error);

        // Produk mungkin sudah diklaim oleh NGO lain.
        return res.status(409).send(error.message);
    }
});

// ==========================================
// N6 - KLAIM BERHASIL
// ==========================================

router.get('/klaim/:idKlaim/berhasil', (req, res) => {
    try {
        const idKlaim = Number(req.params.idKlaim);

        if (!Number.isSafeInteger(idKlaim) || idKlaim <= 0) {
            return res.status(400).send('ID klaim tidak valid.');
        }

        // Mengambil dokumen klaim dari database.
        const detailKlaim = DokumenKlaim.getDetailKlaim(idKlaim);

        if (!detailKlaim) {
            return res.status(404).send('Dokumen klaim tidak ditemukan.');
        }

        // Memastikan klaim tersebut milik NGO dummy yang sedang digunakan.
        const idNgo = req.user.idNgo ?? req.user.idAkun;

        if (Number(detailKlaim.idNgo) !== Number(idNgo)) {
            return res.status(403).send(
                'Anda tidak memiliki akses ke dokumen klaim ini.'
            );
        }

        // Mengambil kembali detail surplus untuk kebutuhan N6.
        const detail = SurplusController.ambilDetailSurplus(
            detailKlaim.idSurplus,
            req.user.lokasi
        );

        const surplus = {
            namaOrganisasi: req.user.nama,
            namaProduk: detail.detailProduk.namaProduk,
            jumlah: detail.detailSurplus.jumlah,
            satuan: 'porsi',
            batasWaktuSingkat: formatBatasWaktu(
                detail.detailSurplus.batasWaktuPengambilan
            )
        };

        const hasilKlaim = {
            idKlaim: detailKlaim.idKlaim,

            // Kode tampilan sementara, belum disimpan sebagai kolom database.
            kodeKlaim: `FL-${String(idKlaim).padStart(5, '0')}`
        };

        return res.render('ngo/N6-KlaimBerhasil', {
            surplus,
            hasilKlaim
        });

    } catch (error) {
        console.error('Gagal menampilkan halaman klaim:', error);

        return res.status(500).send(error.message);
    }
});

module.exports = router;