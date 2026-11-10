// C04 VerifikasiController
const Pendaftaran = require('../models/Pendaftaran');
const DokumenPendukung = require('../models/DokumenPendukung');

const LABEL_TIPE = {
    pemilik_fnb: 'Pemilik F&B',
    perwakilan_ngo: 'Perwakilan NGO'
};

function formatTanggal(tanggal) {
    const dasar = new Date(`${tanggal}T00:00:00+07:00`);
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(dasar);
}

function perkaya(data) {
    return {
        ...data,
        labelTipe: LABEL_TIPE[data.tipeAkun] || data.tipeAkun,
        tanggalTampil: formatTanggal(data.tanggalDaftar),
        namaTampil: data.nama || data.namaUsaha || data.namaOrganisasi || data.email
    };
}

exports.tampilkanDaftarPendaftar = (req, res) => {
    const daftar = Pendaftaran.getDaftarMenungguVerifikasi().map(perkaya);

    res.render('admin/I19-VerifikasiPendaftar', {
        daftar,
        pesan: req.query.pesan || null
    });
};

exports.ambilDetailPendaftar = (req, res) => {
    const idPendaftaran = Number(req.params.idPendaftaran);
    const detail = Pendaftaran.getDetailPendaftar(idPendaftaran);

    if (!detail) {
        return res.status(404).send('Pendaftaran tidak ditemukan.');
    }

    res.render('admin/I20-DetailPendaftar', {
        detail: perkaya(detail),
        dokumen: DokumenPendukung.getDokumen(idPendaftaran),
        pesan: req.query.pesan || null
    });
};

// Menyajikan berkas dokumen, hanya bisa diakses admin yang sudah login.
exports.sajikanDokumen = (req, res) => {
    const idPendaftaran = Number(req.params.idPendaftaran);
    const idDokumen = Number(req.params.idDokumen);

    const dokumen = DokumenPendukung.getDokumen(idPendaftaran)
        .find((d) => d.idDokumen === idDokumen);

    if (!dokumen) {
        return res.status(404).send('Dokumen tidak ditemukan.');
    }

    res.sendFile(
        DokumenPendukung.ambilPathBerkas(idPendaftaran, dokumen.namaFile),
        (err) => {
            if (err && !res.headersSent) {
                res.status(404).send('Berkas dokumen tidak tersedia.');
            }
        }
    );
};