const ProdukSurplus = require('../models/ProdukSurplus');

const ZONA_WAKTU = '+07:00';

function teks(nilai) {
    return String(nilai ?? '').trim();
}

// datetime-local mengirim "YYYY-MM-DDTHH:mm"; simpan sebagai "YYYY-MM-DD HH:mm".
function normalisasiBatasWaktu(nilai) {
    const isi = teks(nilai).replace('T', ' ');

    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(isi)) {
        return null;
    }

    const waktu = new Date(`${isi.replace(' ', 'T')}${ZONA_WAKTU}`);
    return Number.isFinite(waktu.getTime()) ? isi : null;
}

class CatatSurplusController {
    static tampilFormCatat(req, res) {
        const idPemilik = req.user.idPemilik;
        const produkList = ProdukSurplus.getSemuaProduk(idPemilik);
        const produkEdit = req.query.edit
            ? ProdukSurplus.getProdukById(req.query.edit, idPemilik)
            : null;

        return res.render('surplus/I08-CatatSurplus', {
            user: req.user,
            produkList,
            produkEdit,
            error: null
        });
    }

    static simpanDataSurplus(req, res) {
        const idPemilik = req.user.idPemilik;
        const { idProduk, jumlah, batasWaktu } = req.body;
        const produkList = ProdukSurplus.getSemuaProduk(idPemilik);

        const tampilkanGalat = (error) =>
            res.status(400).render('surplus/I08-CatatSurplus', {
                user: req.user,
                produkList,
                produkEdit: null,
                error
            });

        const batas = normalisasiBatasWaktu(batasWaktu);
        if (!idProduk || !jumlah || !batas) {
            return tampilkanGalat('Semua isian wajib diisi.');
        }

        const jumlahAngka = Number(jumlah);
        if (!Number.isInteger(jumlahAngka) || jumlahAngka <= 0) {
            return tampilkanGalat('Jumlah surplus harus lebih dari 0.');
        }

        if (new Date(`${batas.replace(' ', 'T')}${ZONA_WAKTU}`) < new Date()) {
            return tampilkanGalat('Batas waktu tidak boleh di masa lalu.');
        }

        const produk = ProdukSurplus.getProdukById(idProduk, idPemilik);
        if (!produk) {
            return tampilkanGalat('Produk tidak ditemukan.');
        }

        const idSurplus = ProdukSurplus.simpanProdukSurplus({
            idProduk: produk.id_produk,
            idPemilik,
            jumlah: jumlahAngka,
            batasWaktu: batas
        });

        return res.redirect(`/surplus/${idSurplus}/donasi`);
    }

    static simpanProdukBaru(req, res) {
        const idPemilik = req.user.idPemilik;
        const namaProduk = teks(req.body.namaProduk);
        const kategori = req.body.kategori === 'Minuman' ? 'Minuman' : 'Makanan';

        if (namaProduk) {
            ProdukSurplus.tambahProduk(idPemilik, namaProduk, kategori);
        }

        return res.redirect('/surplus/catat');
    }

    static tampilEditProduk(req, res) {
        const idPemilik = req.user.idPemilik;
        const produkList = ProdukSurplus.getSemuaProduk(idPemilik);
        const produkEdit = ProdukSurplus.getProdukById(req.params.id, idPemilik);

        return res.render('surplus/I08-CatatSurplus', {
            user: req.user,
            produkList,
            produkEdit,
            error: null
        });
    }

    static simpanEditProduk(req, res) {
        const idPemilik = req.user.idPemilik;
        const namaProduk = teks(req.body.namaProduk);
        const kategori = req.body.kategori === 'Minuman' ? 'Minuman' : 'Makanan';

        if (namaProduk) {
            ProdukSurplus.updateProduk(
                req.params.id,
                idPemilik,
                namaProduk,
                kategori
            );
        }

        return res.redirect('/surplus/catat');
    }
}

module.exports = CatatSurplusController;
