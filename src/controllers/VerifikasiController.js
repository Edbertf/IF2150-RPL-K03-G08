// C04 VerifikasiController
const fs = require('fs');

const Pendaftaran = require('../models/Pendaftaran');
const DokumenPendukung = require('../models/DokumenPendukung');
const LogAktivitas = require('../models/LogAktivitas');

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

    const dokumen = DokumenPendukung.getDokumen(idPendaftaran).map((d) => ({
        ...d,
        tersedia: fs.existsSync(DokumenPendukung.ambilPathBerkas(idPendaftaran, d.namaFile))
    }));

    res.render('admin/I20-DetailPendaftar', {
        detail: perkaya(detail),
        dokumen,
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

    const berkas = DokumenPendukung.ambilPathBerkas(idPendaftaran, dokumen.namaFile);

    if (!fs.existsSync(berkas)) {
        return res.status(404).send('Berkas dokumen tidak ditemukan di server.');
    }

    res.sendFile(berkas, (err) => {
        if (err && !res.headersSent) {
            res.status(404).send('Berkas dokumen tidak tersedia.');
        }
    });
};

exports.prosesVerifikasi = (req, res) => {
    const idPendaftaran = Number(req.params.idPendaftaran);
    const keputusan = req.body.keputusan;
    const status = keputusan === 'terima' ? 'diterima' : (keputusan === 'tolak' ? 'ditolak' : null);

    if (!status) {
        const pesan = encodeURIComponent('Keputusan tidak dikenal.');
        return res.redirect(`/admin/verifikasi/${idPendaftaran}?pesan=${pesan}`);
    }

    const berubah = Pendaftaran.updateStatus(idPendaftaran, status);

    if (!berubah) {
        const pesan = encodeURIComponent('Pendaftaran tidak ditemukan atau sudah pernah diverifikasi.');
        return res.redirect(`/admin/verifikasi/${idPendaftaran}?pesan=${pesan}`);
    }

    const detail = Pendaftaran.getDetailPendaftar(idPendaftaran);
    const nama = detail.namaUsaha || detail.namaOrganisasi || detail.email;
    const labelKeputusan = status === 'diterima' ? 'disetujui' : 'ditolak';

    LogAktivitas.catatLog(
        req.user.idAkun,
        `Verifikasi pendaftaran ${nama} ${labelKeputusan}`
    );

    return res.redirect(`/admin/verifikasi/${idPendaftaran}/hasil`);
};

exports.tampilkanHasilVerifikasi = (req, res) => {
    const idPendaftaran = Number(req.params.idPendaftaran);
    const detail = Pendaftaran.getDetailPendaftar(idPendaftaran);

    if (!detail) {
        return res.status(404).send('Pendaftaran tidak ditemukan.');
    }

    if (detail.statusVerifikasi === 'menunggu verifikasi') {
        return res.redirect(`/admin/verifikasi/${idPendaftaran}`);
    }

    const diterima = detail.statusVerifikasi === 'diterima';
    const nama = detail.namaUsaha || detail.namaOrganisasi || detail.email;

    res.render('admin/I21-I22-HasilVerifikasi', {
        diterima,
        detail: perkaya(detail),
        nama,
        pesan: diterima
            ? `Status ${nama} diperbarui menjadi diterima dan pendaftar dapat langsung menggunakan FoodLink.`
            : `Status ${nama} diperbarui menjadi ditolak. Pendaftar disarankan memperbaiki dokumennya lalu mendaftar ulang.`
    });
};