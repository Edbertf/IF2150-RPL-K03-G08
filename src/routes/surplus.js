const express = require('express');
const router = express.Router();
const CatatSurplusController = require('../controllers/CatatSurplusController');
const DistribusiSurplusController = require('../controllers/DistribusiSurplusController');
const { butuhPeran, butuhDiverifikasi } = require('../middleware/peran');

router.use(butuhPeran('pemilik_fnb'), butuhDiverifikasi);

router.get('/catat', CatatSurplusController.tampilFormCatat);
router.post('/catat', CatatSurplusController.simpanDataSurplus);
router.post('/produk/tambah', CatatSurplusController.simpanProdukBaru);
router.get('/produk/:id/edit', CatatSurplusController.tampilEditProduk);
router.post('/produk/:id/edit', CatatSurplusController.simpanEditProduk);

router.get('/sukses', DistribusiSurplusController.tampilSukses);
router.get('/:id/donasi', DistribusiSurplusController.tampilFormDistribusi);
router.post('/:id/distribusi', DistribusiSurplusController.simpanDistribusi);

module.exports = router;
