const express = require('express');
const router = express.Router();
const SurplusController = require('../controllers/SurplusController');

router.get('/:id/donasi', SurplusController.tampilFormDonasi);
router.post('/:id/donasi', SurplusController.simpanDonasi);

router.get('/:id/jual', SurplusController.tampilFormJual);
router.post('/:id/jual', SurplusController.simpanJual);

router.get('/sukses', SurplusController.tampilSukses);

module.exports = router;