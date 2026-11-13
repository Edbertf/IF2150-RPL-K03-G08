const db = require('../config/db');

const Produk = require('../models/Produk');
const ProdukSurplus = require('../models/ProdukSurplus');
const DokumenKlaim = require('../models/DokumenKlaim');
const LogAktivitas = require('../models/LogAktivitas');
const PemilikFnB = require('../models/PemilikFnB');
const PerwakilanNGO = require('../models/PerwakilanNGO');

// Memvalidasi ID agar berupa bilangan bulat positif.
function validasiId(id, namaId) {
  const nilai = Number(id);

  if (!Number.isSafeInteger(nilai) || nilai <= 0) {
    throw new Error(`${namaId} tidak valid.`);
  }

  return nilai;
}

const KlaimController = {
  /**
   * Memeriksa apakah produk surplus masih tersedia.
   *
   * @param {number} idSurplus
   * @returns {boolean}
   */
  cekKetersediaan(idSurplus) {
    const id = validasiId(idSurplus, 'ID surplus');

    const status = ProdukSurplus.getStatus(id);

    return status === 'tersedia';
  },

  /**
   * Mengubah status produk surplus menjadi terklaim.
   *
   * @param {number} idSurplus
   * @returns {boolean}
   */
  kunciProduk(idSurplus) {
    const id = validasiId(idSurplus, 'ID surplus');

    if (!KlaimController.cekKetersediaan(id)) {
      throw new Error('Produk surplus sudah tidak tersedia.');
    }

    ProdukSurplus.setStatus(id, 'terklaim');

    return true;
  },

  /**
   * Menyetujui klaim dan mencatat dokumen klaim.
   *
   * Pengubahan status produk dan pencatatan klaim
   * dilakukan dalam satu transaksi database.
   *
   * @param {number} idSurplus
   * @param {number} idNgo
   * @returns {number} ID klaim yang berhasil dibuat.
   */
  setujuiKlaim(idSurplus, idNgo) {
    const id = validasiId(idSurplus, 'ID surplus');
    const ngo = validasiId(idNgo, 'ID NGO');

    const prosesKlaim = db.transaction(() => {
      // Memeriksa ketersediaan sebelum mengunci produk.
      if (!KlaimController.cekKetersediaan(id)) {
        throw new Error(
          KlaimController.tolakKlaim(id)
        );
      }

      // Mengunci produk dengan mengubah statusnya.
      KlaimController.kunciProduk(id);

      // Mencatat klaim dan memperoleh ID klaim.
      const idKlaim = DokumenKlaim.catatKlaim(ngo, id);

      if (!Number.isSafeInteger(Number(idKlaim)) || Number(idKlaim) <= 0) {
        throw new Error('Dokumen klaim gagal dibuat.');
      }

      const detailSurplus = ProdukSurplus.getDetailSurplus(id);
      const produk = Produk.getProduk(detailSurplus.idProduk);
      const satuan = produk.kategori === 'Minuman' ? 'gelas' : 'porsi';

      LogAktivitas.catatLog(
        ngo,
        `Mengklaim ${produk.namaProduk} (${detailSurplus.jumlah} ${satuan})`
      );

      return Number(idKlaim);
    });

    // Menggunakan transaksi IMMEDIATE untuk memulai transaksi tulis.
    return prosesKlaim.immediate();
  },

  /**
   * Menghasilkan pesan ketika klaim tidak dapat diproses.
   *
   * @param {number} idSurplus
   * @returns {string}
   */
  tolakKlaim(idSurplus) {
    const id = validasiId(idSurplus, 'ID surplus');

    const status = ProdukSurplus.getStatus(id);

    if (status === null || status === undefined) {
      return 'Produk surplus tidak ditemukan.';
    }

    return `Klaim tidak dapat diproses karena produk surplus berstatus "${status}".`;
  },

  /**
   * Mengambil seluruh detail pengambilan berdasarkan ID klaim.
   *
   * @param {number} idKlaim
   * @returns {Object} Detail klaim, surplus, usaha, dan NGO.
   */
  ambilDetailPengambilan(idKlaim) {
      const id = validasiId(idKlaim, 'ID klaim');

      // 1. Mengambil detail dokumen klaim.
      const detailKlaim = DokumenKlaim.getDetailKlaim(id);

      if (!detailKlaim) {
          throw new Error('Dokumen klaim tidak ditemukan.');
      }

      // 2. Mengambil detail produk surplus.
      const detailSurplus = ProdukSurplus.getDetailSurplus(
          detailKlaim.idSurplus
      );

      if (!detailSurplus) {
          throw new Error('Detail produk surplus tidak ditemukan.');
      }

      // 3. Mengambil data pemilik usaha.
      const dataUsaha = PemilikFnB.getDataUsaha(
          detailSurplus.idPemilik
      );

      // 4. Mengambil data organisasi NGO.
      const dataNgo = PerwakilanNGO.getDataNgo(
          detailKlaim.idNgo
      );

      // 5. Menggabungkan seluruh informasi.
      return {
          detailKlaim,
          detailSurplus,
          dataUsaha,
          dataNgo
      };
  },

  /**
   * Mengonfirmasi bahwa produk surplus telah diambil.
   *
   * @param {number} idKlaim
   * @returns {string} Pesan keberhasilan.
   */
  konfirmasiPengambilan(idKlaim) {
      const id = validasiId(idKlaim, 'ID klaim');

      // Memproses perubahan status dalam satu transaksi.
      const prosesKonfirmasi = db.transaction(() => {
          // 1. Mengambil detail klaim.
          const detailKlaim = DokumenKlaim.getDetailKlaim(id);

          if (!detailKlaim) {
              throw new Error('Dokumen klaim tidak ditemukan.');
          }

          // 2. Memeriksa status produk surplus.
          const statusSurplus = ProdukSurplus.getStatus(
              detailKlaim.idSurplus
          );

          if (statusSurplus === null || statusSurplus === undefined) {
              throw new Error('Status produk surplus tidak ditemukan.');
          }

          // 3. Mencegah konfirmasi berulang.
          if (statusSurplus === 'selesai') {
              throw new Error(
                  'Pengambilan produk surplus sudah dikonfirmasi.'
              );
          }

          // 4. Mengubah status surplus menjadi selesai.
          ProdukSurplus.setStatus(
              detailKlaim.idSurplus,
              'selesai'
          );

          // 5. Mencatat aktivitas konfirmasi pengambilan.
          const detailSurplus = ProdukSurplus.getDetailSurplus(
              detailKlaim.idSurplus
          );
          const produk = Produk.getProduk(detailSurplus.idProduk);
          const satuan = produk.kategori === 'Minuman' ? 'gelas' : 'porsi';

          LogAktivitas.catatLog(
              detailKlaim.idNgo,
              `Mengonfirmasi pengambilan klaim ${produk.namaProduk} (${detailSurplus.jumlah} ${satuan})`
          );

          // 6. Mengembalikan pesan keberhasilan.
          return 'Pengambilan produk surplus berhasil dikonfirmasi.';
      });

      return prosesKonfirmasi.immediate();
  },
};

module.exports = KlaimController;