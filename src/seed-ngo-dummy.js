const db = require('./config/db');
const bcrypt = require('bcryptjs');
const passwordHash = bcrypt.hashSync('password-dummy', 10);

try {
    const buatNgoDummy = db.transaction(() => {
        const email = 'ngo-dummy@foodlink.test';

        // 1. Periksa apakah akun dummy sudah tersedia.
        let akun = db.prepare(`
            SELECT id_akun, tipe_akun
            FROM akun_pengguna
            WHERE email = ?
        `).get(email);

        let idNgo;

        if (akun) {
            if (akun.tipe_akun !== 'perwakilan_ngo') {
                throw new Error(
                    'Email dummy sudah digunakan oleh tipe akun lain.'
                );
            }

            idNgo = akun.id_akun;

            // Memastikan akun dummy menggunakan password hash.
            db.prepare(`
                UPDATE akun_pengguna
                SET kata_sandi = ?
                WHERE id_akun = ?
            `).run(passwordHash, idNgo);

        } else {
            const hasilAkun = db.prepare(`
                INSERT INTO akun_pengguna (
                    email,
                    kata_sandi,
                    tipe_akun
                )
                VALUES (?, ?, ?)
            `).run(email, passwordHash, 'perwakilan_ngo');

            idNgo = Number(hasilAkun.lastInsertRowid);
        }

        // 3. Periksa apakah profil NGO sudah tersedia.
        const profilNgo = db.prepare(`
            SELECT id_akun
            FROM perwakilan_ngo
            WHERE id_akun = ?
        `).get(idNgo);

        if (!profilNgo) {
            db.prepare(`
                INSERT INTO perwakilan_ngo (
                    id_akun,
                    nama_organisasi,
                    nomor_legalitas,
                    lokasi
                )
                VALUES (?, ?, ?, ?)
            `).run(
                idNgo,
                'Yayasan Berbagi Kasih',
                `DUMMY-${idNgo}`,
                'Jl. Dipatiukur, Bandung'
            );
        }

        // 4. Memastikan NGO dummy memiliki pendaftaran yang sudah diterima.
        const pendaftaran = db.prepare(`
            SELECT id_pendaftaran, status_verifikasi
            FROM pendaftaran
            WHERE id_akun = ?
        `).get(idNgo);

        if (!pendaftaran) {
            // Buat pendaftaran baru dengan status sudah diterima.
            const tanggalHariIni = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'Asia/Jakarta'
            }).format(new Date());

            db.prepare(`
                INSERT INTO pendaftaran (
                    id_akun,
                    tanggal_daftar,
                    status_verifikasi
                )
                VALUES (?, ?, 'diterima')
            `).run(idNgo, tanggalHariIni);

        } else if (pendaftaran.status_verifikasi !== 'diterima') {
            // Pastikan pendaftaran NGO dummy sudah diterima.
            db.prepare(`
                UPDATE pendaftaran
                SET status_verifikasi = 'diterima'
                WHERE id_pendaftaran = ?
            `).run(pendaftaran.id_pendaftaran);
        }

        return idNgo;
    });

    const idNgo = buatNgoDummy();

    // 4. Tampilkan data NGO yang berhasil dibuat.
    const dataNgo = db.prepare(`
        SELECT
            id_akun AS idNgo,
            nama_organisasi,
            lokasi
        FROM perwakilan_ngo
        WHERE id_akun = ?
    `).get(idNgo);

    console.log('\nData NGO dummy berhasil disiapkan:');
    console.log(dataNgo);

} catch (error) {
    console.error('Gagal membuat NGO dummy:', error);
    process.exitCode = 1;

} finally {
    db.close();
}