const router = require('express').Router();
const { butuhPeran } = require('../middleware/peran');
const VerifikasiController = require('../controllers/VerifikasiController');

router.use(butuhPeran('admin_sistem'));

router.get('/verifikasi', VerifikasiController.tampilkanDaftarPendaftar);
router.get('/verifikasi/:idPendaftaran', VerifikasiController.ambilDetailPendaftar);
router.get('/verifikasi/:idPendaftaran/dokumen/:idDokumen', VerifikasiController.sajikanDokumen);

module.exports = router;