const assert = require('node:assert/strict');

const db = require('./config/db');
const KlaimController = require('./controllers/KlaimController');
const ProdukSurplus = require('./models/ProdukSurplus');

const ID_KLAIM = 1;
const ID_SURPLUS = 1;
const PENANDA_ROLLBACK = 'ROLLBACK_UJI_UC11';

try {
    // Memastikan kondisi awal sesuai.
    const statusAwal = ProdukSurplus.getStatus(ID_SURPLUS);

    assert.equal(
        statusAwal,
        'terklaim',
        'Status awal surplus seharusnya terklaim.'
    );

    console.log('Status awal:', statusAwal);

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

        // Sengaja menggagalkan transaksi luar agar seluruh
        // perubahan pengujian dikembalikan.
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