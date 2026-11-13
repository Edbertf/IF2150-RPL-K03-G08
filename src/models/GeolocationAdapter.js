const TITIK_DIKENAL = [
  { kata: 'juanda', lat: -6.8975, lng: 107.6135 },
  { kata: 'dipatiukur', lat: -6.893, lng: 107.618 },
  { kata: 'cihampelas', lat: -6.8955, lng: 107.6045 },
  { kata: 'braga', lat: -6.9175, lng: 107.6098 },
  { kata: 'setiabudi', lat: -6.8725, lng: 107.5935 },
  { kata: 'dago', lat: -6.8915, lng: 107.6107 },
  { kata: 'riau', lat: -6.9045, lng: 107.6185 },
  { kata: 'sukajadi', lat: -6.8875, lng: 107.5935 },
  { kata: 'pasteur', lat: -6.8935, lng: 107.5875 },
  { kata: 'buahbatu', lat: -6.9405, lng: 107.6305 },
];

const PUSAT_BANDUNG = { lat: -6.9, lng: 107.61 };

function hashString(text) {
  let hash = 2166136261;

  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

const toRadians = (degree) => (degree * Math.PI) / 180;

const geolocationAdapter = {
  geocode(alamat) {
    const text = String(alamat || '').toLowerCase();

    const match = TITIK_DIKENAL.find((titik) =>
      text.includes(titik.kata)
    );

    if (match) {
      return {
        latitude: match.lat,
        longitude: match.lng,
      };
    }

    const hash = hashString(text || 'foodlink');
    const offsetLat = ((hash % 200) - 100) / 10000;
    const offsetLng = (((hash >>> 8) % 200) - 100) / 10000;

    return {
      latitude: Number((PUSAT_BANDUNG.lat + offsetLat).toFixed(6)),
      longitude: Number((PUSAT_BANDUNG.lng + offsetLng).toFixed(6)),
    };
  },

  hitungJarak(lat1, lng1, lat2, lng2) {
    if (
      [lat1, lng1, lat2, lng2].some(
        (value) =>
          value === null ||
          value === undefined ||
          Number.isNaN(Number(value))
      )
    ) {
      return null;
    }

    const R = 6371;
    const dLat = toRadians(Number(lat2) - Number(lat1));
    const dLng = toRadians(Number(lng2) - Number(lng1));

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(Number(lat1))) *
        Math.cos(toRadians(Number(lat2))) *
        Math.sin(dLng / 2) ** 2;

    const distance = 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));

    return Math.round(distance * 10) / 10;
  },
};

module.exports = geolocationAdapter;