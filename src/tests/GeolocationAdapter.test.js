const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
    ambilKoordinat,
    hitungJarak
} = require('../models/GeolocationAdapter');

async function denganFetch(palsu, aksi) {
    const fetchAsli = global.fetch;
    global.fetch = palsu;

    try {
        return await aksi();
    } finally {
        global.fetch = fetchAsli;
    }
}

test('C33-UT01 hitungJarak() menghitung jarak dua koordinat', async () => {
    const jarak = await hitungJarak('0,0', '0,1');

    assert.equal(jarak, 111.19);
});

test('C33-UT02 hitungJarak() menangani spasi dan koordinat batas', async () => {
    const jarakSama = await hitungJarak(
        ' -6.9175, 107.6191 ',
        '-6.9175,107.6191'
    );

    assert.equal(jarakSama, 0);

    const jarakAntipodal = await hitungJarak('-90,-180', '90,180');

    assert.equal(jarakAntipodal, 20015.09);
});

test('C33-UT03 hitungJarak() menolak lokasi kosong dan geocoding gagal', async () => {
    await assert.rejects(
        () => hitungJarak('', '0,0'),
        /Lokasi harus diisi\./
    );
    await assert.rejects(
        () => hitungJarak('0,0', '   '),
        /Lokasi harus diisi\./
    );

    await denganFetch(
        async () => ({ ok: false }),
        async () => {
            await assert.rejects(
                () => hitungJarak('Alamat Tidak Ada C33', '0,0'),
                /Lokasi tidak ditemukan: Alamat Tidak Ada C33/
            );
        }
    );
});

test('C33-UT04 ambilKoordinat() membaca koordinat langsung', async () => {
    const koordinat = await ambilKoordinat(
        ' -6.9175, 107.6191 '
    );

    assert.deepEqual(koordinat, {
        lat: -6.9175,
        lng: 107.6191
    });
});

test('C33-UT05 ambilKoordinat() memakai cache untuk alamat yang sama', async () => {
    let jumlahPanggilan = 0;
    const alamat = 'Jl. Cache C33';

    await denganFetch(
        async () => {
            jumlahPanggilan += 1;

            return {
                ok: true,
                json: async () => [
                    { lat: '-6.9', lon: '107.61' }
                ]
            };
        },
        async () => {
            const pertama = await ambilKoordinat(alamat);
            const kedua = await ambilKoordinat(
                'jl. cache c33'
            );

            assert.deepEqual(pertama, {
                lat: -6.9,
                lng: 107.61
            });
            assert.deepEqual(kedua, pertama);
            assert.equal(jumlahPanggilan, 1);
        }
    );
});

test('C33-UT06 ambilKoordinat() menolak input kosong dan respons geocoding tidak valid', async () => {
    await assert.rejects(
        () => ambilKoordinat(null),
        /Lokasi harus diisi\./
    );
    await assert.rejects(
        () => ambilKoordinat('   '),
        /Lokasi harus diisi\./
    );

    await denganFetch(
        async () => ({ ok: false }),
        async () => {
            await assert.rejects(
                () => ambilKoordinat('Alamat Gagal C33'),
                /Lokasi tidak ditemukan: Alamat Gagal C33/
            );
        }
    );

    await denganFetch(
        async () => ({
            ok: true,
            json: async () => []
        }),
        async () => {
            await assert.rejects(
                () => ambilKoordinat('Alamat Kosong C33'),
                /Lokasi tidak ditemukan: Alamat Kosong C33/
            );
        }
    );

    await denganFetch(
        async () => ({
            ok: true,
            json: async () => [
                { lat: 'x', lon: 'y' }
            ]
        }),
        async () => {
            await assert.rejects(
                () => ambilKoordinat('Alamat Invalid C33'),
                /Lokasi tidak ditemukan: Alamat Invalid C33/
            );
        }
    );

    await denganFetch(
        async () => ({ ok: false }),
        async () => {
            const diLuarBatas = [
                '91,0',
                '-91,0',
                '0,181',
                '0,-181'
            ];

            for (const lokasi of diLuarBatas) {
                await assert.rejects(
                    () => ambilKoordinat(lokasi),
                    new RegExp(
                        `Lokasi tidak ditemukan: ${lokasi}`
                    )
                );
            }
        }
    );

    await denganFetch(
        async () => {
            const galat = new Error('aborted');
            galat.name = 'AbortError';
            throw galat;
        },
        async () => {
            await assert.rejects(
                () => ambilKoordinat('Alamat Timeout C33'),
                /Lokasi tidak ditemukan: Alamat Timeout C33/
            );
        }
    );

    await denganFetch(
        async () => {
            throw new Error('jaringan gagal');
        },
        async () => {
            await assert.rejects(
                () => ambilKoordinat('Alamat Jaringan C33'),
                /jaringan gagal/
            );
        }
    );
});