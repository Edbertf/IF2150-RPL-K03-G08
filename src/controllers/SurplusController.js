const ProdukSurplus = require('../models/ProdukSurplus');

class SurplusController {
    static tampilFormCatat(req, res) {
        const produkList = ProdukSurplus.getSemuaProduk();
        let produkEdit = null;
        if (req.query.edit) {
            produkEdit = ProdukSurplus.getProdukById(req.query.edit);
        }
        res.render('surplus/I08-CatatSurplus', { 
            user: req.user, 
            produkList, 
            produkEdit, 
            error: null 
        });
    }

    static simpanDataSurplus(req, res) {
        try {
            const { idProduk, jumlah, batasWaktu, lokasi } = req.body;
            const idPemilik = req.user.idPemilik; 
            const produkList = ProdukSurplus.getSemuaProduk();

            if (!idProduk || !jumlah || !batasWaktu || !lokasi) {
                return res.render('surplus/I08-CatatSurplus', { user: req.user, produkList, produkEdit: null, error: "Semua isian wajib diisi." });
            }
            if (jumlah <= 0) {
                return res.render('surplus/I08-CatatSurplus', { user: req.user, produkList, produkEdit: null, error: "Jumlah surplus harus lebih dari 0." });
            }
            if (new Date(batasWaktu) < new Date()) {
                return res.render('surplus/I08-CatatSurplus', { user: req.user, produkList, produkEdit: null, error: "Batas waktu tidak boleh di masa lalu." });
            }

            const idSurplus = ProdukSurplus.simpanProdukSurplus({
                idProduk, idPemilik, jumlah, batasWaktu, lokasi
            });
            res.redirect(`/surplus/${idSurplus}/donasi`);
        } catch (error) {
            console.error(error);
            res.render('surplus/I08-CatatSurplus', { user: req.user, produkList, produkEdit: null, error: "Terjadi kesalahan server." });
        }
    }

    static tampilKelolaProduk(req, res) {
        const produkList = ProdukSurplus.getSemuaProduk();
        res.render('surplus/KelolaProduk', { user: req.user, produkList, produkEdit: null });
    }

    static simpanProdukBaru(req, res) {
        const { namaProduk, kategori } = req.body;
        if (namaProduk) {
            ProdukSurplus.tambahProduk(namaProduk, kategori);
        }
        res.redirect('/surplus/catat');
    }

    static tampilEditProduk(req, res) {
        const produkList = ProdukSurplus.getSemuaProduk();
        const produkEdit = ProdukSurplus.getProdukById(req.params.id);
        res.render('surplus/KelolaProduk', { user: req.user, produkList, produkEdit });
    }

    static simpanEditProduk(req, res) {
        const { namaProduk, kategori } = req.body;
        if (namaProduk) {
            ProdukSurplus.updateProduk(req.params.id, namaProduk, kategori);
        }
        res.redirect('/surplus/catat');
    }
}
module.exports = SurplusController;