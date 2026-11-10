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

module.exports = { butuhPeran };