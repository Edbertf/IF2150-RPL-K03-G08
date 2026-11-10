const fs = require('fs');
const path = require('path');
const db = require('../config/db');

// Satu pendaftaran punya satu subfolder, sehingga nama berkas asli boleh dipakai apa adanya.
const AKAR_STORAGE = path.resolve(__dirname, '..', 'storage', 'dokumen');

const TIPE_DARI_EKSTENSI = {
    '.pdf': 'PDF',
    '.jpg': 'JPG',
    '.jpeg': 'JPG',
    '.png': 'PNG'
};

function tipeDokumenDari(namaFile) {
    return TIPE_DARI_EKSTENSI[path.extname(namaFile).toLowerCase()] ?? null;
}

// Membuang direktori dari nama berkas (mencegah path traversal) dan mengganti
// karakter aneh agar aman disimpan di berbagai sistem berkas.
function bersihkanNamaFile(namaFile) {
    const ekstensi = path.extname(namaFile).toLowerCase();
    const dasar = path
        .basename(namaFile, path.extname(namaFile))
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .slice(0, 80);

    return `${dasar || 'dokumen'}${ekstensi}`;
}

// Jika nama berkas sudah dipakai di folder yang sama, tambahkan akhiran -1, -2, dst.
function tentukanNamaUnik(folder, namaFile) {
    const ekstensi = path.extname(namaFile);
    const dasar = path.basename(namaFile, ekstensi);
    let kandidat = namaFile;
    let nomor = 1;

    while (fs.existsSync(path.join(folder, kandidat))) {
        kandidat = `${dasar}-${nomor}${ekstensi}`;
        nomor += 1;
    }

    return kandidat;
}

exports.unggahDokumen = (idPendaftaran, berkas) => {
    const tipeDokumen = tipeDokumenDari(berkas.originalname);
    if (!tipeDokumen) {
        throw new Error('Ekstensi dokumen tidak didukung.');
    }

    const folder = path.join(AKAR_STORAGE, String(idPendaftaran));
    const namaFile = tentukanNamaUnik(folder, bersihkanNamaFile(berkas.originalname));
    const tujuan = path.join(folder, namaFile);

    fs.mkdirSync(folder, { recursive: true });

    fs.copyFileSync(berkas.path, tujuan);
    fs.rmSync(berkas.path, { force: true });

    try {
        const hasil = db.prepare(`
            INSERT INTO dokumen_pendukung (id_pendaftaran, nama_file, tipe_dokumen)
            VALUES (?, ?, ?)
        `).run(idPendaftaran, namaFile, tipeDokumen);

        return Number(hasil.lastInsertRowid);
    } catch (err) {
        fs.rmSync(tujuan, { force: true });
        throw err;
    }
};

// dipakai UC02 untuk menampilkan dokumen pendaftar
exports.getDokumen = (idPendaftaran) =>
    db.prepare(`
        SELECT id_dokumen   AS idDokumen,
               nama_file    AS namaFile,
               tipe_dokumen AS tipeDokumen
        FROM dokumen_pendukung
        WHERE id_pendaftaran = ?
        ORDER BY id_dokumen
    `).all(idPendaftaran);

// Path fisik berkas; dipakai UC02
exports.ambilPathBerkas = (idPendaftaran, namaFile) =>
    path.join(AKAR_STORAGE, String(idPendaftaran), path.basename(namaFile));

exports.AKAR_STORAGE = AKAR_STORAGE;