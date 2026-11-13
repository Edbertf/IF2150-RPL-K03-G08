const ProdukSurplus = require('../models/ProdukSurplus');
const Produk = require('../models/Produk');
const MetodeDistribusiSurplus = require('../models/MetodeDistribusiSurplus');
const PemilikFnB = require('../models/PemilikFnB');
const geolocationAdapter = require('../models/GeolocationAdapter');

/**
 * Mengubah alamat atau koordinat lokasi menjadi format koordinat.
 *
 * lokasi dapat berupa:
 * 1. String alamat, misalnya "Jl. Juanda, Bandung".
 * 2. Objek koordinat, misalnya { latitude: -6.89, longitude: 107.61 }.
 */
function ubahLokasiKeKoordinat(lokasi) {
  // Jika lokasi berupa alamat.
  if (typeof lokasi === 'string' && lokasi.trim() !== '') {
    return geolocationAdapter.geocode(lokasi);
  }

  // Jika lokasi sudah berupa koordinat.
  if (lokasi && typeof lokasi === 'object') {
    const latitude = lokasi.latitude ?? lokasi.lat;
    const longitude = lokasi.longitude ?? lokasi.lng;

    if (
      latitude === undefined ||
      longitude === undefined ||
      latitude === null ||
      longitude === null ||
      latitude === '' ||
      longitude === ''
    ) {
      throw new Error('Koordinat lokasi tidak lengkap.');
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      throw new Error('Koordinat lokasi tidak valid.');
    }

    return {
      latitude: lat,
      longitude: lng,
    };
  }

  throw new Error('Lokasi NGO tidak valid.');
}

const SurplusController = {
  /**
   * Mengambil detail produk surplus beserta informasi pendukungnya.
   *
   * @param {number} idSurplus ID produk surplus.
   * @param {string|Object} lokasi Lokasi NGO.
   * @returns {Object} Informasi lengkap produk surplus.
   */
  ambilDetailSurplus(idSurplus, lokasi) {
    const id = Number(idSurplus);

    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('ID produk surplus tidak valid.');
    }

    // 1. Mengambil detail produk surplus.
    const detailSurplus = ProdukSurplus.getDetailSurplus(id);

    if (!detailSurplus) {
      throw new Error('Produk surplus tidak ditemukan.');
    }

    // 2. Mengambil detail produk berdasarkan ID produk.
    const detailProduk = Produk.getProduk(detailSurplus.idProduk);

    if (!detailProduk) {
      throw new Error('Data produk tidak ditemukan.');
    }

    // 3. Mengambil informasi metode distribusi.
    const infoDistribusi =
      MetodeDistribusiSurplus.getInfoDistribusi(detailSurplus.idProduk);

    if (!infoDistribusi) {
      throw new Error('Informasi distribusi produk tidak ditemukan.');
    }

    // 4. Mengambil alamat usaha pemilik surplus.
    const lokasiPemilik = PemilikFnB.getLokasiUsaha(
      detailSurplus.idPemilik
    );

    const namaUsaha = PemilikFnB.getNamaUsaha(
        detailSurplus.idPemilik
    );

    if (!namaUsaha || !namaUsaha.trim()) {
        throw new Error('Nama usaha pemilik tidak ditemukan.');
    }

    if (!lokasiPemilik || !lokasiPemilik.trim()) {
      throw new Error('Lokasi usaha pemilik tidak ditemukan.');
    }

    // 5. Menghitung jarak lokasi NGO dengan lokasi usaha pemilik.
    const koordinatNgo = ubahLokasiKeKoordinat(lokasi);
    const koordinatPemilik =
      geolocationAdapter.geocode(lokasiPemilik);

    const jarak = geolocationAdapter.hitungJarak(
      koordinatNgo.latitude,
      koordinatNgo.longitude,
      koordinatPemilik.latitude,
      koordinatPemilik.longitude
    );

    if (jarak === null) {
      throw new Error('Jarak antara lokasi NGO dan pemilik gagal dihitung.');
    }

    // 6. Mengembalikan seluruh informasi.
    return {
      detailSurplus,
      detailProduk,
      infoDistribusi,
      lokasiPemilik,
      namaUsaha,
      jarak,
    };
  },
};

module.exports = SurplusController;