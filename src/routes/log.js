const router = require('express').Router();
const LogController = require('../controllers/LogController');

// Guard sementara sampai UC01-UC03 menyediakan login dan sesi.
router.use((req, res, next) => {
    if (!req.user || req.user.role !== 'admin_sistem') {
        return res.status(403).send('Hanya admin sistem yang dapat mengakses halaman ini.');
    }
    next();
});

router.get('/', (req, res) => {
    if (req.query.kategori) {
        return LogController.saringLog(req, res);
    }

    return LogController.tampilkanLog(req, res);
});

module.exports = router;
