const CACHE_KOORDINAT = new Map();
const BATAS_WAKTU_GEOCODING = 4000;

function teksLokasi(nilai) {
    return String(nilai ?? '').trim();
}

function parseKoordinat(nilai) {
    const cocok = /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/.exec(nilai);

    if (!cocok) return null;

    const lat = Number(cocok[1]);
    const lng = Number(cocok[2]);

    if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lng) ||
        lat < -90 ||
        lat > 90 ||
        lng < -180 ||
        lng > 180
    ) {
        return null;
    }

    return { lat, lng };
}

function keRadian(derajat) {
    return (derajat * Math.PI) / 180;
}

// C33 ambilKoordinat(alamat): menerima "lat,lng" atau alamat teks.
async function ambilKoordinat(alamat) {
    const lokasi = teksLokasi(alamat);

    if (!lokasi) {
        throw new Error('Lokasi harus diisi.');
    }

    const koordinatLangsung = parseKoordinat(lokasi);
    if (koordinatLangsung) return koordinatLangsung;

    const kunci = lokasi.toLowerCase();
    if (CACHE_KOORDINAT.has(kunci)) return CACHE_KOORDINAT.get(kunci);

    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('limit', '1');
    url.searchParams.set('countrycodes', 'id');
    url.searchParams.set('q', lokasi);

    const pengendali = new AbortController();
    const penjaga = setTimeout(() => pengendali.abort(), BATAS_WAKTU_GEOCODING);

    try {
        const respons = await fetch(url, {
            headers: {
                'User-Agent': 'FoodLink/1.0 (proyek IF2150)',
                'Accept-Language': 'id'
            },
            signal: pengendali.signal
        });

        if (!respons.ok) {
            throw new Error(`Lokasi tidak ditemukan: ${lokasi}`);
        }

        const hasil = await respons.json();
        const pertama = Array.isArray(hasil) ? hasil[0] : null;

        if (!pertama) {
            throw new Error(`Lokasi tidak ditemukan: ${lokasi}`);
        }

        const koordinat = {
            lat: Number(pertama.lat),
            lng: Number(pertama.lon)
        };

        if (!Number.isFinite(koordinat.lat) || !Number.isFinite(koordinat.lng)) {
            throw new Error(`Lokasi tidak ditemukan: ${lokasi}`);
        }

        CACHE_KOORDINAT.set(kunci, koordinat);
        return koordinat;
    } catch (galat) {
        if (galat.name === 'AbortError') {
            throw new Error(`Lokasi tidak ditemukan: ${lokasi}`);
        }

        throw galat;
    } finally {
        clearTimeout(penjaga);
    }
}

// C33 hitungJarak(lokasiPengguna, lokasiPemilik): jarak km (2 desimal).
async function hitungJarak(lokasiPengguna, lokasiPemilik) {
    const pengguna = await ambilKoordinat(lokasiPengguna);
    const pemilik = await ambilKoordinat(lokasiPemilik);

    const R = 6371;
    const dLat = keRadian(pemilik.lat - pengguna.lat);
    const dLng = keRadian(pemilik.lng - pengguna.lng);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(keRadian(pengguna.lat)) *
            Math.cos(keRadian(pemilik.lat)) *
            Math.sin(dLng / 2) ** 2;

    const jarak = 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));

    return Math.round(jarak * 100) / 100;
}

module.exports = { ambilKoordinat, hitungJarak };
