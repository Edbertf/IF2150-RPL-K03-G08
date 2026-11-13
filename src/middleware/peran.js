const Pendaftaran = require('../models/Pendaftaran');

// Membatasi route hanya untuk peran tertentu (guard).
function butuhPeran(...daftarPeran) {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/masuk');
        }
        if (!daftarPeran.includes(req.user.role)) {
            return res.status(403).send('Halaman ini tidak tersedia untuk peran Anda.');
        }
        next();
    };
}

// Hanya akun yang pendaftarannya sudah diterima yang boleh memakai halaman kerja.
// Admin Sistem dikecualikan karena tidak memiliki baris pendaftaran.
function butuhDiverifikasi(req, res, next) {
    if (!req.user) {
        return res.redirect('/masuk');
    }

    if (req.user.role === 'admin_sistem') {
        return next();
    }

    const pendaftaran = Pendaftaran.cariBerdasarkanAkun(req.user.idAkun);

    if (!pendaftaran || pendaftaran.statusVerifikasi !== 'diterima') {
        return res.redirect('/status');
    }

    next();
}

module.exports = { butuhPeran, butuhDiverifikasi };