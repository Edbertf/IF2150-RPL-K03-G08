const router = require('express').Router();
const { butuhPeran } = require('../middleware/peran');
const AuthController = require('../controllers/AuthController');

// Hanya pemilik F&B dan perwakilan NGO yang punya status pendaftaran.
router.get(
    '/',
    butuhPeran('pemilik_fnb', 'perwakilan_ngo'),
    AuthController.tampilkanStatusPendaftaran
);

module.exports = router;