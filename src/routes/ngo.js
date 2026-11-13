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
    const daftarKlaim = DokumenKlaim.getDaftarKlaim(idNgo).map((klaim) => ({
        ...klaim,
        kodeKlaim: `FL-${String(klaim.idKlaim).padStart(5, '0')}`,
        waktuKlaimTampil: new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'Asia/Jakarta'
        }).format(new Date(klaim.waktuKlaim)),
        statusTampil: klaim.statusKlaim === 'selesai' ? 'Selesai diambil' : 'Menunggu pengambilan'
    }));

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

module.exports = router;
