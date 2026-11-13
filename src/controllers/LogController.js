const LogAktivitas = require('../models/LogAktivitas');

// C29: pilihan penyaringan sesuai DPPL.
const PILIHAN_FILTER = ['Semua', 'Klaim', 'Surplus', 'Verifikasi'];

// I-23 hanya menampilkan jam, mis. "19.42".
function formatWaktu(waktu) {
    const cocok = String(waktu ?? '').match(/\b(\d{2}):(\d{2})\b/);
    return cocok ? `${cocok[1]}.${cocok[2]}` : '-';
}

function renderHalaman(res, { daftar, filterAktif, adaLogKeseluruhan, pesanError = null, status = 200 }) {
    res.status(status).render('admin/I23-LogAktivitas', {
        daftar: daftar.map((baris) => ({
            ...baris,
            waktuTampil: formatWaktu(baris.waktu)
        })),
        pilihanFilter: PILIHAN_FILTER,
        filterAktif,
        adaLogKeseluruhan,
        pesanError
    });
}

/**
 * C29 tampilkanLog(): mengambil seluruh log dan menampilkan dashboard awal.
 */
exports.tampilkanLog = (req, res) => {
    const daftar = LogAktivitas.getDaftarLog();

    renderHalaman(res, {
        daftar,
        filterAktif: 'Semua',
        adaLogKeseluruhan: daftar.length > 0
    });
};

/**
 * C29 saringLog(kriteria): memvalidasi kriteria lalu meminta C11 mencari log.
 * Kriteria di luar empat pilihan DPPL menghasilkan status 400.
 */
exports.saringLog = (req, res) => {
    const teks = typeof req.query.kategori === 'string' ? req.query.kategori.trim() : '';
    const kriteria = PILIHAN_FILTER.find((item) => item.toLowerCase() === teks.toLowerCase());

    if (!kriteria) {
        const daftar = LogAktivitas.getDaftarLog();

        return renderHalaman(res, {
            daftar,
            filterAktif: 'Semua',
            adaLogKeseluruhan: daftar.length > 0,
            pesanError: 'Kriteria penyaringan tidak valid.',
            status: 400
        });
    }

    if (kriteria === 'Semua') {
        return exports.tampilkanLog(req, res);
    }

    const daftar = LogAktivitas.cariLog(kriteria);

    renderHalaman(res, {
        daftar,
        filterAktif: kriteria,
        adaLogKeseluruhan: LogAktivitas.adaLog()
    });
};

exports.PILIHAN_FILTER = PILIHAN_FILTER;
exports.formatWaktu = formatWaktu;
