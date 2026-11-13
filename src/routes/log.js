const router = require('express').Router();
const LogController = require('../controllers/LogController');
const { butuhPeran } = require('../middleware/peran');

router.use(butuhPeran('admin_sistem'));

router.get('/', (req, res) => {
    if (req.query.kategori) {
        return LogController.saringLog(req, res);
    }

    return LogController.tampilkanLog(req, res);
});

module.exports = router;
