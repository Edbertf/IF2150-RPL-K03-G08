const db = require('./config/db');

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
                throw new Error('Email dummy sudah digunakan oleh tipe akun lain.');
            }

            idNgo = akun.id_akun;
        } else {
            // 2. Buat akun NGO.
            const hasilAkun = db.prepare(`
                INSERT INTO akun_pengguna (
                    email,
                    kata_sandi,
                    tipe_akun
                )
                VALUES (?, ?, ?)
            `).run(email, 'password-dummy', 'perwakilan_ngo');

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