const assert = require('node:assert/strict');

const db = require('../config/db');
const KlaimController = require('../controllers/KlaimController');
const ProdukSurplus = require('../models/ProdukSurplus');

const PENANDA_ROLLBACK = 'ROLLBACK_UJI_UC11';

try {
    // Cari klaim yang masih dapat digunakan untuk pengujian.
    const dataUji = db.prepare(`
        SELECT
            dk.id_klaim AS idKlaim,
            dk.id_surplus AS idSurplus
        FROM dokumen_klaim dk
        JOIN produk_surplus ps
            ON ps.id_surplus = dk.id_surplus
        WHERE dk.status_klaim = 'terklaim'
          AND ps.status = 'terklaim'
        ORDER BY dk.id_klaim DESC
        LIMIT 1
    `).get();

    if (!dataUji) {
        throw new Error(
            'Tidak ditemukan klaim dengan status surplus terklaim. ' +
            'Siapkan data klaim terlebih dahulu.'
        );
    }

    const ID_KLAIM = dataUji.idKlaim;
    const ID_SURPLUS = dataUji.idSurplus;

    console.log('Menggunakan data pengujian:');
    console.log({
        idKlaim: ID_KLAIM,
        idSurplus: ID_SURPLUS
    });

    // Memastikan kondisi awal sesuai.
    const statusAwal = ProdukSurplus.getStatus(ID_SURPLUS);

    assert.equal(
        statusAwal,
        'terklaim',
        'Status awal surplus seharusnya terklaim.'
    );

    console.log('\nStatus awal:', statusAwal);

    // Transaksi luar untuk mengembalikan kondisi database.
    const jalankanPengujian = db.transaction(() => {

        // ======================================
        // SKENARIO 1: KONFIRMASI BERHASIL
        // ======================================

        console.log('\n=== SKENARIO 1: KONFIRMASI BERHASIL ===');

        const pesan = KlaimController.konfirmasiPengambilan(ID_KLAIM);

        const statusSetelahKonfirmasi =
            ProdukSurplus.getStatus(ID_SURPLUS);

        assert.equal(statusSetelahKonfirmasi, 'selesai');

        console.log('Pesan:', pesan);
        console.log('Status setelah konfirmasi:', statusSetelahKonfirmasi);
        console.log('Skenario 1 berhasil.');

        // ======================================
        // SKENARIO 2: KONFIRMASI BERULANG
        // ======================================

        console.log('\n=== SKENARIO 2: KONFIRMASI BERULANG ===');

        assert.throws(
            () => KlaimController.konfirmasiPengambilan(ID_KLAIM),
            /Pengambilan produk surplus sudah dikonfirmasi/
        );

        console.log(
            'Konfirmasi kedua ditolak karena status sudah selesai.'
        );
        console.log('Skenario 2 berhasil.');

        // Sengaja menggagalkan transaksi luar agar
        // seluruh perubahan pengujian dikembalikan.
        throw new Error(PENANDA_ROLLBACK);
    });

    try {
        jalankanPengujian.immediate();
    } catch (error) {
        if (error.message !== PENANDA_ROLLBACK) {
            throw error;
        }

        console.log('\nPerubahan pengujian berhasil di-rollback.');
    }

    // ======================================
    // VERIFIKASI SETELAH ROLLBACK
    // ======================================

    const statusAkhir = ProdukSurplus.getStatus(ID_SURPLUS);

    assert.equal(statusAkhir, 'terklaim');

    console.log('Status akhir setelah rollback:', statusAkhir);
    console.log('\nSeluruh skenario pengujian UC11 berhasil.');

} catch (error) {
    console.error('\nPengujian UC11 gagal:', error);
    process.exitCode = 1;

} finally {
    db.close();
}
