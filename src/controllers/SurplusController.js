const MetodeDistribusi = require('../models/MetodeDistribusi');

class SurplusController {
    static tampilFormDonasi(req, res) {
        res.render('surplus/I09-DonasiGratis', { user: req.user, idSurplus: req.params.id, error: null });
    }

    static simpanDonasi(req, res) {
        try {
            const idSurplus = req.params.id;
            MetodeDistribusi.pilihMetodeDistribusi({ idSurplus, jenisDistribusi: "Donasi", harga: 0 });
            res.redirect('/surplus/sukses');
        } catch (error) {
            console.error(error);
            res.render('surplus/I09-DonasiGratis', { user: req.user, idSurplus: req.params.id, error: "Terjadi kesalahan server." });
        }
    }

    //UC07 (Jual Diskon)
    static tampilFormJual(req, res) {
        res.render('surplus/I10-JualDiskon', { user: req.user, idSurplus: req.params.id, error: null });
    }

    static simpanJual(req, res) {
        try {
            const idSurplus = req.params.id;
            const harga = req.body.harga;

            if (!harga || harga <= 0) {
                return res.render('surplus/I10-JualDiskon', { user: req.user, idSurplus, error: "Harga jual diskon harus lebih dari 0." });
            }

            MetodeDistribusi.pilihMetodeDistribusi({ idSurplus, jenisDistribusi: "Jual Diskon", harga: harga });
            res.redirect('/surplus/sukses');
        } catch (error) {
            console.error(error);
            res.render('surplus/I10-JualDiskon', { user: req.user, idSurplus: req.params.id, error: "Terjadi kesalahan server." });
        }
    }
    static tampilSukses(req, res) {
        res.render('surplus/I11-SuksesPublikasi', { user: req.user });
    }
}
module.exports = SurplusController;