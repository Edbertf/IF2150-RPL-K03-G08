const router = require('express').Router();
const PenjualanController = require('../controllers/PenjualanController');
const PrediksiController = require('../controllers/PrediksiController');

const { butuhPeran, butuhDiverifikasi } = require('../middleware/peran');

// Urutan penting: periksa peran dulu (admin dapat 403), baru status pendaftaran.
router.use(butuhPeran('pemilik_fnb'), butuhDiverifikasi);

router.get('/dashboard', PrediksiController.tampilkanDashboard);
router.get('/penjualan', PenjualanController.tampilkanFormPenjualan);
router.post('/penjualan', PenjualanController.kirimDataPenjualan);
router.get('/penjualan/tersimpan', PenjualanController.tampilkanPenjualanTersimpan);

module.exports = router;