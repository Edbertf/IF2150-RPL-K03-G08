const express = require('express');
const router = express.Router();
const SurplusController = require('../controllers/SurplusController');

router.get('/catat', SurplusController.tampilFormCatat);
router.post('/catat', SurplusController.simpanDataSurplus);
router.get('/produk', SurplusController.tampilKelolaProduk);
router.post('/produk/tambah', SurplusController.simpanProdukBaru);
router.get('/produk/:id/edit', SurplusController.tampilEditProduk);
router.post('/produk/:id/edit', SurplusController.simpanEditProduk);

module.exports = router;