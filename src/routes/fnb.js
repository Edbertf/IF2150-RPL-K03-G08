const router = require('express').Router();
const PenjualanController = require('../controllers/PenjualanController');

const { butuhPeran } = require('../middleware/peran');

router.use(butuhPeran('pemilik_fnb'));

router.get('/penjualan', PenjualanController.tampilkanFormPenjualan);
router.post('/penjualan', PenjualanController.kirimDataPenjualan);
router.get('/penjualan/tersimpan', PenjualanController.tampilkanPenjualanTersimpan);

module.exports = router;