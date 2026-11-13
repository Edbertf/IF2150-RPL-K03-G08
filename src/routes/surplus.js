const express = require('express');
const router = express.Router();
const CatatSurplusController = require('../controllers/CatatSurplusController');
const { butuhPeran, butuhDiverifikasi } = require('../middleware/peran');

router.use(butuhPeran('pemilik_fnb'), butuhDiverifikasi);

router.get('/catat', CatatSurplusController.tampilFormCatat);
router.post('/catat', CatatSurplusController.simpanDataSurplus);
router.post('/produk/tambah', CatatSurplusController.simpanProdukBaru);
router.get('/produk/:id/edit', CatatSurplusController.tampilEditProduk);
router.post('/produk/:id/edit', CatatSurplusController.simpanEditProduk);

module.exports = router;
