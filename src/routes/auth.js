const path = require('path');
const os = require('os');
const multer = require('multer');
const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

const upload = multer({
    dest: path.join(os.tmpdir(), 'foodlink-unggah'),
    limits: { fileSize: AuthController.BATAS_MAKS_DOKUMEN }
});

router.get('/', AuthController.tampilkanFormRegistrasi);
router.post('/', upload.single('dokumen'), AuthController.kirimFormulirRegistrasi);
router.get('/berhasil', AuthController.tampilkanHalamanBerhasil);

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        const pesan = err.code === 'LIMIT_FILE_SIZE'
            ? 'Ukuran dokumen maksimal 5 MB.'
            : 'Dokumen gagal diunggah. Silakan coba lagi.';

        return AuthController.tampilkanFormRegistrasiDenganError(req, res, 400, { dokumen: pesan });
    }

    next(err);
});

module.exports = router;