const fs = require('fs');
const os = require('os');
const path = require('path');
const { fork } = require('child_process');
const { performance } = require('perf_hooks');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const jeda = (ms) => new Promise((r) => setTimeout(r, ms));
const statistik = (arr) => {
    const urut = [...arr].sort((a, b) => a - b);
    const p = (q) => urut[Math.min(urut.length - 1, Math.ceil(q * urut.length) - 1)];
    const rata = urut.reduce((s, x) => s + x, 0) / urut.length;
    return { n: urut.length, min: +urut[0].toFixed(2), rata: +rata.toFixed(2), p95: +p(0.95).toFixed(2), maks: +urut[urut.length - 1].toFixed(2) };
};

async function masuk(email, kataSandi) {
    const res = await fetch(`${BASE_URL}/masuk`, {
        method: 'POST',
        redirect: 'manual',
        body: new URLSearchParams({ email, kataSandi })
    });
    const setCookie = res.headers.get('set-cookie') || '';
    return { status: res.status, lokasi: res.headers.get('location'), setCookie, cookie: setCookie.split(';')[0] };
}

async function knf07() {
    const durasi = Number(process.env.DURASI_DETIK || 1800);
    const { cookie } = await masuk('admin@foodlink.test', 'admin123');
    const target = ['/', '/masuk', '/admin'];
    let total = 0;
    let gagal = 0;
    const galat = [];
    const waktu = [];
    const mulai = Date.now();

    while (Date.now() - mulai < durasi * 1000) {
        for (const url of target) {
            total += 1;
            const t0 = performance.now();
            try {
                const res = await fetch(BASE_URL + url, { headers: { cookie }, redirect: 'manual' });
                await res.arrayBuffer();
                waktu.push(performance.now() - t0);
                if (res.status >= 500) {
                    gagal += 1;
                    galat.push({ t: new Date().toISOString(), url, status: res.status });
                }
            } catch (e) {
                gagal += 1;
                galat.push({ t: new Date().toISOString(), url, galat: e.cause?.code || e.message });
            }
        }
        await jeda(1000);
    }

    return {
        knf: 'KNF07',
        durasiDetik: durasi,
        totalPermintaan: total,
        permintaanGagal: gagal,
        ketersediaanPersen: +((1 - gagal / total) * 100).toFixed(3),
        waktuResponsMs: statistik(waktu),
        galat: galat.slice(0, 20)
    };
}

async function knf08() {
    const MB = 1024 * 1024;
    const kasus = [
        { id: 'a', berkas: 'dokumen-4.9MB.pdf', tipe: 'application/pdf', ukuran: Math.floor(4.9 * MB), harap: 'diterima' },
        { id: 'b', berkas: 'dokumen-5MB-pas.pdf', tipe: 'application/pdf', ukuran: 5 * MB, harap: 'diterima' },
        { id: 'c', berkas: 'dokumen-5MB+1B.pdf', tipe: 'application/pdf', ukuran: 5 * MB + 1, harap: 'ditolak' },
        { id: 'd', berkas: 'dokumen-8MB.png', tipe: 'image/png', ukuran: 8 * MB, harap: 'ditolak' },
        { id: 'e', berkas: 'dokumen.jpg', tipe: 'image/jpeg', ukuran: 200 * 1024, harap: 'diterima' },
        { id: 'f', berkas: 'dokumen.png', tipe: 'image/png', ukuran: 200 * 1024, harap: 'diterima' },
        { id: 'g', berkas: 'dokumen.docx', tipe: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ukuran: 200 * 1024, harap: 'ditolak' },
        { id: 'h', berkas: 'dokumen.exe', tipe: 'application/x-msdownload', ukuran: 200 * 1024, harap: 'ditolak' },
        { id: 'i', berkas: 'dokumen.pdf', tipe: 'image/png', ukuran: 200 * 1024, harap: 'ditolak' }
    ];
    const hasil = [];
    const stempel = Date.now();

    for (const k of kasus) {
        const form = new FormData();
        form.set('tipeAkun', 'perwakilan_ngo');
        form.set('namaOrganisasi', `Uji KNF08 ${k.id}`);
        form.set('nomorLegalitas', 'AHU-UJI-KNF08');
        form.set('lokasi', 'Jl. Ganesha No. 10, Bandung');
        form.set('email', `knf08-${k.id}-${stempel}@foodlink.test`);
        form.set('kataSandi', 'sandiUji123');
        form.set('dokumen', new Blob([Buffer.alloc(k.ukuran, 0x25)], { type: k.tipe }), k.berkas);

        const res = await fetch(`${BASE_URL}/daftar`, { method: 'POST', body: form, redirect: 'manual' });
        const html = await res.text();
        const lokasi = res.headers.get('location');
        const aktual = res.status === 302 && lokasi === '/daftar/berhasil' ? 'diterima' : 'ditolak';
        const pesan = (html.match(/(Ukuran dokumen maksimal 5 MB\.|Format dokumen harus PDF, JPG, atau PNG\.|Tipe berkas tidak sesuai dengan ekstensinya\.)/) || [])[1] || null;
        hasil.push({ ...k, ukuranByte: k.ukuran, status: res.status, aktual, pesan, sesuai: aktual === k.harap });
    }

    return { knf: 'KNF08', kasus: hasil.map(({ ukuran, ...r }) => r), sesuai: hasil.filter((h) => h.sesuai).length, total: hasil.length };
}

async function knf09() {
    const menit = Number(process.env.MENIT_IDLE || 31);
    const login = await masuk('admin@foodlink.test', 'admin123');
    const cekSesi = async () => {
        const res = await fetch(`${BASE_URL}/admin/verifikasi`, { headers: { cookie: login.cookie }, redirect: 'manual' });
        return { status: res.status, lokasi: res.headers.get('location') };
    };

    const awal = await cekSesi();
    const tMulai = new Date().toISOString();
    await jeda(menit * 60 * 1000);
    const akhir = await cekSesi();

    return {
        knf: 'KNF09',
        setCookieSaatMasuk: login.setCookie.replace(/foodlink\.sid=[^;]+/, 'foodlink.sid=<disamarkan>'),
        aksesAwal: { waktu: tMulai, ...awal },
        menitTidakAktif: menit,
        aksesSetelahIdle: { waktu: new Date().toISOString(), ...akhir },
        sesiBerakhir: akhir.status === 302 && akhir.lokasi === '/masuk'
    };
}

// Proses anak knf10: menunggu perintah lalu memanggil setujuiKlaim pada waktu mulai yang sama.
function pekerjaKnf10() {
    const KlaimController = require('../controllers/KlaimController');
    const idNgo = Number(process.env.ID_NGO);
    process.on('message', ({ idSurplus, mulaiPada }) => {
        while (Date.now() < mulaiPada) { /* sinkronisasi start */ }
        const t0 = performance.now();
        let ok = true;
        try { KlaimController.setujuiKlaim(idSurplus, idNgo); } catch { ok = false; }
        process.send({ idSurplus, ok, ms: performance.now() - t0 });
    });
    process.send({ siap: true });
}

async function knf10() {
    const putaran = Number(process.env.PUTARAN || 50);
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-knf10-'));
    process.env.DB_PATH = path.join(folder, 'uji.db');
    require('../database/init')();
    const db = require('../config/db');

    const akun = (email, tipe) => Number(db.prepare('INSERT INTO akun_pengguna (email, kata_sandi, tipe_akun) VALUES (?, ?, ?)').run(email, 'x', tipe).lastInsertRowid);
    const idPemilik = akun('pemilik@knf10.test', 'pemilik_fnb');
    db.prepare('INSERT INTO pemilik_fnb (id_akun, nama_usaha, alamat_usaha, jam_operasional) VALUES (?, ?, ?, ?)').run(idPemilik, 'Usaha Uji', 'Jl. Uji', '08.00-20.00');
    const ngo = ['a', 'b'].map((x) => {
        const id = akun(`ngo-${x}@knf10.test`, 'perwakilan_ngo');
        db.prepare('INSERT INTO perwakilan_ngo (id_akun, nama_organisasi, lokasi) VALUES (?, ?, ?)').run(id, `NGO ${x}`, 'Bandung');
        return id;
    });
    const pemilik = db.prepare('SELECT id_pemilik FROM pemilik_fnb WHERE id_akun = ?').get(idPemilik).id_pemilik;
    const idProduk = Number(db.prepare('INSERT INTO produk (id_pemilik, nama_produk, kategori) VALUES (?, ?, ?)').run(pemilik, 'Roti Uji', 'Makanan').lastInsertRowid);
    const tambahSurplus = db.prepare("INSERT INTO produk_surplus (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan) VALUES (?, ?, 5, '2099-12-31 23:59')");

    const pekerja = ngo.map((idNgo) => fork(__filename, ['pekerja-knf10'], { env: { ...process.env, ID_NGO: String(idNgo) } }));
    await Promise.all(pekerja.map((p) => new Promise((r) => p.once('message', r))));

    const semua = [];
    const perPutaran = [];
    for (let i = 0; i < putaran; i += 1) {
        const idSurplus = Number(tambahSurplus.run(idProduk, pemilik).lastInsertRowid);
        const mulaiPada = Date.now() + 50;
        const hasil = await Promise.all(pekerja.map((p) => new Promise((r) => {
            p.once('message', r);
            p.send({ idSurplus, mulaiPada });
        })));
        const jumlahKlaim = db.prepare('SELECT COUNT(*) AS n FROM dokumen_klaim WHERE id_surplus = ?').get(idSurplus).n;
        semua.push(...hasil.map((h) => h.ms));
        perPutaran.push({ idSurplus, berhasil: hasil.filter((h) => h.ok).length, ditolak: hasil.filter((h) => !h.ok).length, recordKlaim: jumlahKlaim, maksMs: Math.max(...hasil.map((h) => h.ms)) });
    }
    pekerja.forEach((p) => p.kill());

    const melebihi100 = semua.filter((ms) => ms >= 100).length;
    return {
        knf: 'KNF10',
        putaran,
        prosesBersamaan: pekerja.length,
        durasiKlaimMs: statistik(semua),
        permintaanMelebihi100ms: melebihi100,
        putaranTepatSatuBerhasil: perPutaran.filter((p) => p.berhasil === 1 && p.recordKlaim === 1).length,
        contohPutaran: perPutaran.slice(0, 5)
    };
}

const perintah = { knf07, knf08, knf09, knf10 };
const pilihan = process.argv[2];

if (pilihan === 'pekerja-knf10') {
    pekerjaKnf10();
} else if (perintah[pilihan]) {
    perintah[pilihan]().then((hasil) => {
        console.log(JSON.stringify(hasil, null, 2));
        process.exit(0);
    });
} else {
    console.log('Pemakaian: node tools/uji-knf7-knf10.js <knf07|knf08|knf09|knf10>');
}
