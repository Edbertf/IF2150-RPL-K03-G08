module.exports = (req, res, next) => {
    req.user = req.session && req.session.pengguna ? req.session.pengguna : null;
    res.locals.pengguna = req.user;
    next();
};