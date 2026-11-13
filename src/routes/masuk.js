const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

router.get('/masuk', AuthController.tampilkanHalamanMasuk);
router.post('/masuk', AuthController.masuk);
router.post('/keluar', AuthController.keluar);

module.exports = router;