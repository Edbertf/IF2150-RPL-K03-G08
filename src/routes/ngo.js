const router = require('express').Router();
const { butuhPeran } = require('../middleware/peran');
const SurplusController = require('../controllers/SurplusController');
const KlaimController = require('../controllers/KlaimController');
const DokumenKlaim = require('../models/DokumenKlaim');

// Seluruh fitur NGO hanya untuk Perwakilan NGO yang sudah masuk.
router.use(butuhPeran('perwakilan_ngo'));

// UC08: daftar dan detail produk surplus.
router.get('/surplus', SurplusController.tampilkanDaftarSurplus);

router.get('/surplus/:idSurplus', async (req, res) => {
    const pengguna = req.user || {};

    try {
        const detail = await SurplusController.ambilDetailSurplus(
            req.params.idSurplus,
            pengguna.lokasi
        );

        return res.render('ngo/I15-DetailProduk', {
            pengguna,
            detail,
            surplus: {
                idSurplus: detail.idSurplus,
                namaProduk: detail.namaProduk,
                namaUsaha: detail.namaUsaha,
                jumlah: detail.jumlah,
                satuan: detail.kategori === 'Minuman' ? 'gelas' : 'porsi',
                batasWaktuSingkat: detail.batasWaktuTampil
            },
            tidakDitemukan: false,
            pesan: null
        });
    } catch (error) {
        return res.status(404).render('ngo/I15-DetailProduk', {
            pengguna,
            detail: null,
            surplus: null,
            tidakDitemukan: true,
            pesan: error.message
        });
    }
});

router.get('/klaim', (req, res) => {
    const idNgo = req.user.idNgo ?? req.user.idAkun;

    const daftarKlaim = DokumenKlaim.getDaftarKlaim(idNgo).map((klaim) => {
        const pengambilanSelesai = klaim.statusSurplus === 'selesai';

        return {
            ...klaim,
            kodeKlaim: `FL-${String(klaim.idKlaim).padStart(5, '0')}`,

            waktuKlaimTampil: new Intl.DateTimeFormat('id-ID', {
                dateStyle: 'long',
                timeStyle: 'short',
                timeZone: 'Asia/Jakarta'
            }).format(new Date(klaim.waktuKlaim)),

            statusTampil: pengambilanSelesai
                ? 'Selesai diambil'
                : 'Menunggu pengambilan',

            urlDetail: pengambilanSelesai
                ? `/ngo/klaim/${klaim.idKlaim}/pengambilan-selesai`
                : `/ngo/klaim/${klaim.idKlaim}/berhasil`
        };
    });

    return res.render('ngo/N7-KlaimSaya', {
        pengguna: req.user,
        daftarKlaim
    });
});

router.post('/surplus/:idSurplus/klaim', (req, res) => {
    try {
        const idNgo = req.user.idNgo ?? req.user.idAkun;
        const idKlaim = KlaimController.setujuiKlaim(req.params.idSurplus, idNgo);
        return res.redirect(`/ngo/klaim/${idKlaim}/berhasil`);
    } catch (error) {
        return res.status(409).send(error.message);
    }
});

// N6 - KLAIM BERHASIL
router.get('/klaim/:idKlaim/berhasil', async (req, res) => {
    const pengguna = req.user || {};
    const idKlaim = Number(req.params.idKlaim);

    if (!Number.isSafeInteger(idKlaim) || idKlaim <= 0) {
        return res.status(400).send('ID klaim tidak valid.');
    }

    try {
        const klaim = DokumenKlaim.getDetailKlaim(idKlaim);
        const idNgo = pengguna.idNgo ?? pengguna.idAkun;

        if (Number(klaim.idNgo) !== Number(idNgo)) {
            return res.status(403).send('Anda tidak memiliki akses ke dokumen klaim ini.');
        }

        const surplus = await SurplusController.ambilDetailSurplus(
            klaim.idSurplus,
            pengguna.lokasi
        );

        return res.render('ngo/N6-KlaimBerhasil', {
            pengguna,
            detail: surplus,
            hasilKlaim: {
                idKlaim: klaim.idKlaim,
                kodeKlaim: `FL-${String(klaim.idKlaim).padStart(5, '0')}`
            }
        });
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

// ==========================================
// UC11 - MEMPROSES KONFIRMASI PENGAMBILAN
// ==========================================

router.post('/klaim/:idKlaim/konfirmasi-pengambilan', (req, res) => {
    const pengguna = req.user || {};
    const idKlaim = Number(req.params.idKlaim);
    const idNgo = pengguna.idNgo ?? pengguna.idAkun;

    if (!Number.isSafeInteger(idKlaim) || idKlaim <= 0) {
        return res.status(400).send('ID klaim tidak valid.');
    }

    try {
        const detailPengambilan =
            KlaimController.ambilDetailPengambilan(idKlaim);

        if (
            Number(detailPengambilan.detailKlaim.idNgo) !==
            Number(idNgo)
        ) {
            return res.status(403).send(
                'Anda tidak memiliki akses ke klaim ini.'
            );
        }

        const pesan = KlaimController.konfirmasiPengambilan(idKlaim);

        console.log(pesan);

        return res.redirect(
            `/ngo/klaim/${idKlaim}/pengambilan-selesai`
        );
    } catch (error) {
        console.error('Gagal mengonfirmasi pengambilan:', error);

        if (
            error.message ===
            'Pengambilan produk surplus sudah dikonfirmasi.'
        ) {
            return res.status(409).send(error.message);
        }

        return res.status(500).send(
            'Terjadi kesalahan saat mengonfirmasi pengambilan.'
        );
    }
});

// ==========================================
// N7 - PENGAMBILAN SELESAI
// ==========================================

router.get('/klaim/:idKlaim/pengambilan-selesai', (req, res) => {
    const pengguna = req.user || {};
    const idKlaim = Number(req.params.idKlaim);
    const idNgo = pengguna.idNgo ?? pengguna.idAkun;

    if (!Number.isSafeInteger(idKlaim) || idKlaim <= 0) {
        return res.status(400).send('ID klaim tidak valid.');
    }

    try {
        const pengambilan =
            KlaimController.ambilDetailPengambilan(idKlaim);

        if (
            Number(pengambilan.detailKlaim.idNgo) !==
            Number(idNgo)
        ) {
            return res.status(403).send(
                'Anda tidak memiliki akses ke klaim ini.'
            );
        }

        if (pengambilan.detailSurplus.status !== 'selesai') {
            return res.status(409).send(
                'Pengambilan produk belum dikonfirmasi.'
            );
        }

        return res.render('ngo/N7-PengambilanSelesai', {
            pengguna,
            pengambilan
        });
    } catch (error) {
        console.error('Gagal menampilkan halaman N7:', error);
        return res.status(404).send(error.message);
    }
});

module.exports = router;
