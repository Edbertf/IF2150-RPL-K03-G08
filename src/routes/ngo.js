const router = require('express').Router();
const { butuhPeran } = require('../middleware/peran');
const SurplusController = require('../controllers/SurplusController');

// Seluruh fitur NGO hanya untuk Perwakilan NGO yang sudah masuk.
router.use(butuhPeran('perwakilan_ngo'));

// UC08: daftar dan detail produk surplus.
router.get('/surplus', SurplusController.tampilkanDaftarSurplus);
router.get('/surplus/:idSurplus', SurplusController.tampilkanDetailSurplus);

module.exports = router;
