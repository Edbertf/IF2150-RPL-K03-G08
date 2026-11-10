const ProdukSurplusModel = require('../models/ProdukSurplusModel');
const MetodeDistribusiModel = require('../models/MetodeDistribusiModel');

class SurplusController {
    
    //UC06
    static tampilFormCatat(req, res) {
        res.render('surplus/I08-CatatSurplus', { user: req.user, error: null });
    }

    static simpanDataSurplus(req, res) {
        try {
            const { idProduk, jumlah, batasWaktu, lokasi } = req.body;
            const idPemilik = req.user.idPemilik; 

            if (!idProduk || !jumlah || !batasWaktu || !lokasi) {
                return res.render('surplus/I08-CatatSurplus', { user: req.user, error: "Semua isian wajib diisi." });
            }
            if (jumlah <= 0) {
                return res.render('surplus/I08-CatatSurplus', { user: req.user, error: "Jumlah surplus harus lebih dari 0." });
            }
            if (new Date(batasWaktu) < new Date()) {
                return res.render('surplus/I08-CatatSurplus', { user: req.user, error: "Batas waktu tidak boleh di masa lalu." });
            }

            const idSurplus = ProdukSurplusModel.simpanProdukSurplus({
                idProduk, idPemilik, jumlah, batasWaktu, lokasi
            });
            res.redirect(`/surplus/${idSurplus}/donasi`);
        } catch (error) {
            console.error(error);
            res.render('surplus/I08-CatatSurplus', { user: req.user, error: "Terjadi kesalahan server." });
        }
    }

    //UC07 (Donasi)
    static tampilFormDonasi(req, res) {
        res.render('surplus/I09-DonasiGratis', { user: req.user, idSurplus: req.params.id, error: null });
    }

    static simpanDonasi(req, res) {
        try {
            const idSurplus = req.params.id;
            MetodeDistribusiModel.pilihMetodeDistribusi({ idSurplus, jenisDistribusi: "Donasi", harga: 0 });
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

            MetodeDistribusiModel.pilihMetodeDistribusi({ idSurplus, jenisDistribusi: "Jual Diskon", harga: harga });
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