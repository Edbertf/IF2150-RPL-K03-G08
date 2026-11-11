const express = require('express');
const router = express.Router();
const SurplusController = require('../controllers/SurplusController');

router.get('/catat', SurplusController.tampilFormCatat);
router.post('/catat', SurplusController.simpanDataSurplus);

module.exports = router;