const router = require('express').Router();
const PenjualanController = require('../controllers/PenjualanController');

// guard sementara sambil nunggu UC01-03
router.use((req, res, next) => {
    if (!req.user || req.user.role !== 'pemilik_fnb') {
        return res.status(403).send('Hanya pemilik F&B yang dapat mengakses halaman ini.');
    }
    next();
});

router.get('/penjualan', PenjualanController.tampilkanFormPenjualan);
router.post('/penjualan', PenjualanController.kirimDataPenjualan);
router.get('/penjualan/tersimpan', PenjualanController.tampilkanPenjualanTersimpan);

module.exports = router;