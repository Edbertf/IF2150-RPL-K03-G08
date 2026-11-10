const ProdukSurplus = require('../models/ProdukSurplus');
const MetodeDistribusi = require('../models/MetodeDistribusi');

class SurplusController {
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

            const idSurplus = ProdukSurplus.simpanProdukSurplus({
                idProduk, idPemilik, jumlah, batasWaktu, lokasi
            });
            res.redirect(`/surplus/${idSurplus}/donasi`);
        } catch (error) {
            console.error(error);
            res.render('surplus/I08-CatatSurplus', { user: req.user, error: "Terjadi kesalahan server." });
        }
    }
}
module.exports = SurplusController;