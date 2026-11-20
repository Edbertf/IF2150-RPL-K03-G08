const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const folderUji = fs.mkdtempSync(path.join(os.tmpdir(), 'foodlink-kontroler-'));
process.env.DB_PATH = path.join(folderUji, 'uji.db');
process.env.STORAGE_DIR = path.join(folderUji, 'storage');

require('../database/init')();
const db = require('../config/db');

const AuthController = require('../controllers/AuthController');
const VerifikasiController = require('../controllers/VerifikasiController');
const PenjualanController = require('../controllers/PenjualanController');
const CatatSurplusController = require('../controllers/CatatSurplusController');
const DistribusiSurplusController = require('../controllers/DistribusiSurplusController');
const KlaimController = require('../controllers/KlaimController');
const AkunPengguna = require('../models/AkunPengguna');
const PemilikFnB = require('../models/PemilikFnB');
const PerwakilanNGO = require('../models/PerwakilanNGO');
const Pendaftaran = require('../models/Pendaftaran');
const ProdukSurplus = require('../models/ProdukSurplus');
const DokumenPendukung = require('../models/DokumenPendukung');
const DokumenKlaim = require('../models/DokumenKlaim');
const MetodeDistribusiSurplus = require('../models/MetodeDistribusiSurplus');
const GeolocationAdapter = require('../models/GeolocationAdapter');
const DataPenjualan = require('../models/DataPenjualan');

let urut = 0;

function resPalsu() {
    return {
        statusCode: 200,
        vista: null,
        data: null,
        lokasi: null,
        teks: null,
        status(kode) {
            this.statusCode = kode;
            return this;
        },
        render(vista, data) {
            this.vista = vista;
            this.data = data;
            return this;
        },
        redirect(jalur) {
            this.statusCode = 302;
            this.lokasi = jalur;
            return this;
        },
        send(teks) {
            this.teks = teks;
            return this;
        },
        sendFile(berkas, cb) {
            this.berkas = berkas;
            this.statusCode = 200;
            if (cb) cb(null);
            return this;
        },
        clearCookie() {
            this.cookieDibersihkan = true;
        }
    };
}

function berkasUji(nama = 'dokumen.pdf') {
    urut += 1;
    const lokasi = path.join(folderUji, `berkas-${urut}-${nama}`);
    fs.writeFileSync(lokasi, '%PDF-1.4\nuji\n');
    return { originalname: nama, mimetype: 'application/pdf', size: 12, path: lokasi };
}

function pemilikBaru(nama = 'Bakery Kontroler') {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `kontroler-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: nama,
        alamatUsaha: '-6.9147,107.6098',
        jamOperasional: '08.00-20.00'
    });
    const { idPemilik } = db
        .prepare('SELECT id_pemilik AS idPemilik FROM pemilik_fnb WHERE id_akun = ?')
        .get(idAkun);
    return { idAkun, idPemilik };
}

function ngoBaru(nama = 'Yayasan Kontroler') {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `ngo-kontroler-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'perwakilan_ngo'
    });
    PerwakilanNGO.simpanProfil(idAkun, {
        namaOrganisasi: nama,
        nomorLegalitas: `AHU-${urut}`,
        lokasi: '-6.9175,107.6191'
    });
    return { idAkun };
}

function surplusBaru(idPemilik, idProduk, jumlah = 4) {
    const dasar = new Date();
    dasar.setDate(dasar.getDate() + 2);
    const tanggal = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(dasar);
    return ProdukSurplus.simpanProdukSurplus({
        idProduk,
        idPemilik,
        jumlah,
        batasWaktu: `${tanggal} 20:00`
    });
}

after(() => {
    db.close();
    fs.rmSync(folderUji, { recursive: true, force: true });
});

// ---------- AuthController ----------

test('AuthController: validasi dokumen menolak berkas kosong, besar, dan tipe tidak cocok', () => {
    assert.equal(AuthController.validasiFormatDokumen(null), false);
    assert.equal(AuthController.validasiFormatDokumen(berkasUji('gambar.gif')), false);
    assert.equal(AuthController.validasiFormatDokumen({ originalname: 'a.pdf', size: 0 }), false);
    assert.equal(AuthController.validasiFormatDokumen({
        originalname: 'a.pdf', size: 6 * 1024 * 1024
    }), false);
    assert.equal(AuthController.validasiFormatDokumen({
        originalname: 'a.pdf', size: 10, mimetype: 'text/plain'
    }), false);
    assert.equal(AuthController.validasiFormatDokumen(berkasUji()), true);
});

test('AuthController: normalisasi dan kelengkapan formulir per tipe akun', () => {
    const data = AuthController.normalisasiFormulir({ email: '  UJI@FoodLink.Test ', namaUsaha: '  Toko ' });
    assert.equal(data.email, 'uji@foodlink.test');
    assert.equal(data.namaUsaha, 'Toko');

    const salahTipe = AuthController.daftarErrorKelengkapan({ tipeAkun: 'admin_sistem' });
    assert.equal(salahTipe[0].field, 'tipeAkun');

    const salahEmail = AuthController.daftarErrorKelengkapan({ tipeAkun: 'pemilik_fnb', email: 'bukan-email' });
    assert.ok(salahEmail.some((item) => item.field === 'email'));

    const pendek = AuthController.daftarErrorKelengkapan({
        tipeAkun: 'pemilik_fnb', email: 'a@b.c', kataSandi: '123'
    });
    assert.ok(pendek.some((item) => /minimal 8/.test(item.pesan)));

    const panjang = AuthController.daftarErrorKelengkapan({
        tipeAkun: 'perwakilan_ngo', email: 'a@b.c', kataSandi: 'x'.repeat(80)
    });
    assert.ok(panjang.some((item) => /maksimal 72/.test(item.pesan)));

    const ngoLengkap = AuthController.daftarErrorKelengkapan({
        tipeAkun: 'perwakilan_ngo',
        email: 'a@b.c',
        kataSandi: 'rahasia123',
        namaOrganisasi: 'Yayasan',
        nomorLegalitas: 'AHU-1',
        lokasi: 'Jl. Uji'
    });
    assert.equal(ngoLengkap.length, 0);
    assert.equal(AuthController.validasiKelengkapanData({
        tipeAkun: 'perwakilan_ngo', email: 'a@b.c', kataSandi: 'rahasia123',
        namaOrganisasi: 'Yayasan', nomorLegalitas: 'AHU-1', lokasi: 'Jl. Uji'
    }), true);
});

test('AuthController: registrasi akun NGO menyimpan profil dan pendaftaran', () => {
    urut += 1;
    const hasil = AuthController.registrasiAkun({
        tipeAkun: 'perwakilan_ngo',
        email: `ngo-daftar-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        namaOrganisasi: 'Yayasan Uji',
        nomorLegalitas: 'AHU-99',
        lokasi: 'Jl. Braga No. 1',
        berkas: berkasUji()
    });

    assert.equal(hasil.status, 'menunggu verifikasi');
    assert.ok(PerwakilanNGO.cariBerdasarkanAkun(hasil.idAkun));
});

test('AuthController: registrasi dengan data tidak lengkap melempar daftar error', () => {
    assert.throws(
        () => AuthController.registrasiAkun({ tipeAkun: 'pemilik_fnb', email: '' }),
        (galat) => galat instanceof AuthController.GalatRegistrasi && galat.daftarError.length > 0
    );
});

test('AuthController: masuk menolak isian kosong dan kredensial salah', () => {
    const kosong = resPalsu();
    AuthController.masuk({ body: {} }, kosong);
    assert.equal(kosong.statusCode, 400);

    const salah = resPalsu();
    AuthController.masuk({
        body: { email: 'tidak-ada@foodlink.test', kataSandi: 'rahasia123' }
    }, salah);
    assert.equal(salah.statusCode, 400);
    assert.match(salah.data.error, /salah/);
});

test('AuthController: masuk berhasil mengisi sesi dan mengarahkan sesuai peran', () => {
    const { idAkun } = pemilikBaru();
    const pendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
    Pendaftaran.updateStatus(pendaftaran, 'diterima');
    const email = db.prepare('SELECT email FROM akun_pengguna WHERE id_akun = ?').get(idAkun).email;

    const hasil = resPalsu();
    const req = { body: { email, kataSandi: 'rahasia123' }, session: {} };
    AuthController.masuk(req, hasil);

    assert.equal(hasil.statusCode, 302);
    assert.equal(hasil.lokasi, '/fnb/penjualan');
    assert.equal(req.session.pengguna.role, 'pemilik_fnb');

    const halaman = resPalsu();
    AuthController.tampilkanHalamanMasuk({ user: req.session.pengguna }, halaman);
    assert.equal(halaman.lokasi, '/');
});

test('AuthController: keluar menghancurkan sesi dan mengalihkan ke beranda', () => {
    const hasil = resPalsu();
    let dihancurkan = false;
    AuthController.keluar({
        session: {
            destroy(cb) {
                dihancurkan = true;
                cb();
            }
        }
    }, hasil);

    assert.equal(dihancurkan, true);
    assert.equal(hasil.cookieDibersihkan, true);
    assert.equal(hasil.lokasi, '/');
});

test('AuthController: status pendaftaran menampilkan empat keadaan', () => {
    const tanpa = resPalsu();
    AuthController.tampilkanStatusPendaftaran({ user: { idAkun: 999999 } }, tanpa);
    assert.equal(tanpa.statusCode, 404);

    const { idAkun } = pemilikBaru();
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);

    const menunggu = resPalsu();
    AuthController.tampilkanStatusPendaftaran({ user: { idAkun } }, menunggu);
    assert.equal(menunggu.data.status, 'menunggu verifikasi');

    Pendaftaran.updateStatus(idPendaftaran, 'ditolak');
    const ditolak = resPalsu();
    AuthController.tampilkanStatusPendaftaran({ user: { idAkun } }, ditolak);
    assert.equal(ditolak.data.status, 'ditolak');

    const berhasil = resPalsu();
    AuthController.tampilkanHalamanBerhasil({}, berhasil);
    assert.equal(berhasil.data.status, 'menunggu verifikasi');
});

test('AuthController: handler formulir meneruskan error validasi ke view', () => {
    const galat = resPalsu();
    AuthController.kirimFormulirRegistrasi({
        body: { tipeAkun: 'pemilik_fnb', email: 'a@b.c' },
        file: null
    }, galat);
    assert.equal(galat.statusCode, 400);
    assert.ok(galat.data.errorField.email || galat.data.errorField.namaUsaha);

    const sukses = resPalsu();
    urut += 1;
    AuthController.kirimFormulirRegistrasi({
        body: {
            tipeAkun: 'pemilik_fnb',
            email: `handler-${urut}@foodlink.test`,
            kataSandi: 'rahasia123',
            namaUsaha: 'Toko Handler',
            alamatUsaha: 'Jl. Handler',
            jamOperasional: '08.00-20.00'
        },
        file: berkasUji()
    }, sukses);
    assert.equal(sukses.lokasi, '/daftar/berhasil');
});

// ---------- VerifikasiController ----------

test('VerifikasiController: daftar, detail, dokumen, dan keputusan verifikasi', () => {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `verif-kontroler-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: 'Toko Verifikasi',
        alamatUsaha: '-6.9,107.6',
        jamOperasional: '08.00-20.00'
    });
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);
    const idDokumen = DokumenPendukung.unggahDokumen(idPendaftaran, berkasUji());

    const daftar = resPalsu();
    VerifikasiController.tampilkanDaftarPendaftar({ query: {} }, daftar);
    assert.equal(daftar.vista, 'admin/I19-VerifikasiPendaftar');
    assert.ok(daftar.data.daftar.some((item) => item.idPendaftaran === idPendaftaran));

    const detail = resPalsu();
    VerifikasiController.ambilDetailPendaftar({ params: { idPendaftaran }, query: {} }, detail);
    assert.equal(detail.data.dokumen.length, 1);
    assert.equal(detail.data.dokumen[0].tersedia, true);

    const tidakAda = resPalsu();
    VerifikasiController.ambilDetailPendaftar({ params: { idPendaftaran: 999999 }, query: {} }, tidakAda);
    assert.equal(tidakAda.statusCode, 404);

    const berkas = resPalsu();
    VerifikasiController.sajikanDokumen({ params: { idPendaftaran, idDokumen } }, berkas);
    assert.equal(berkas.statusCode, 200);

    const dokumenHilang = resPalsu();
    VerifikasiController.sajikanDokumen({ params: { idPendaftaran, idDokumen: 999999 } }, dokumenHilang);
    assert.equal(dokumenHilang.statusCode, 404);

    fs.rmSync(DokumenPendukung.ambilPathBerkas(idPendaftaran, detail.data.dokumen[0].namaFile));
    const berkasHilang = resPalsu();
    VerifikasiController.sajikanDokumen({ params: { idPendaftaran, idDokumen } }, berkasHilang);
    assert.equal(berkasHilang.statusCode, 404);

    const keputusanAneh = resPalsu();
    VerifikasiController.prosesVerifikasi({
        params: { idPendaftaran },
        body: { keputusan: 'ragu' },
        user: { idAkun: 1 }
    }, keputusanAneh);
    assert.match(keputusanAneh.lokasi, /pesan=/);

    const terima = resPalsu();
    VerifikasiController.prosesVerifikasi({
        params: { idPendaftaran },
        body: { keputusan: 'terima' },
        user: { idAkun: 1 }
    }, terima);
    assert.equal(terima.lokasi, `/admin/verifikasi/${idPendaftaran}/hasil`);

    const hasil = resPalsu();
    VerifikasiController.tampilkanHasilVerifikasi({ params: { idPendaftaran } }, hasil);
    assert.equal(hasil.data.diterima, true);

    const ulang = resPalsu();
    VerifikasiController.prosesVerifikasi({
        params: { idPendaftaran },
        body: { keputusan: 'tolak' },
        user: { idAkun: 1 }
    }, ulang);
    assert.match(ulang.lokasi, /pesan=/);

    const hasilHilang = resPalsu();
    VerifikasiController.tampilkanHasilVerifikasi({ params: { idPendaftaran: 999999 } }, hasilHilang);
    assert.equal(hasilHilang.statusCode, 404);
});

test('VerifikasiController: hasil verifikasi menunggu dialihkan ke detail', () => {
    urut += 1;
    const idAkun = AkunPengguna.registrasi({
        email: `menunggu-kontroler-${urut}@foodlink.test`,
        kataSandi: 'rahasia123',
        tipeAkun: 'pemilik_fnb'
    });
    PemilikFnB.simpanProfil(idAkun, {
        namaUsaha: 'Toko Menunggu',
        alamatUsaha: '-6.9,107.6',
        jamOperasional: '08.00-20.00'
    });
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);

    const hasil = resPalsu();
    VerifikasiController.tampilkanHasilVerifikasi({ params: { idPendaftaran } }, hasil);
    assert.equal(hasil.lokasi, `/admin/verifikasi/${idPendaftaran}`);
});

// ---------- PenjualanController ----------

test('PenjualanController: validasi input dan penyimpanan penjualan', () => {
    assert.equal(PenjualanController.validasiInputPenjualan([]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ idProduk: 1, jumlahTerjual: 1, jumlahTersisa: 0 }]), true);
    assert.equal(PenjualanController.validasiInputPenjualan([{ idProduk: 1, jumlahTerjual: -1, jumlahTersisa: 0 }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ idProduk: 1, jumlahTerjual: 1, jumlahTersisa: 1001 }]), false);
    assert.equal(PenjualanController.validasiInputPenjualan([{ jumlahTerjual: 1, jumlahTersisa: 0 }]), false);
    assert.throws(() => PenjualanController.simpanDataPenjualan([]), /tidak valid/);

    const { idAkun, idPemilik } = pemilikBaru();
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Roti Jual', 'Makanan');

    PenjualanController.simpanDataPenjualan([{ idProduk, jumlahTerjual: 4, jumlahTersisa: 1 }]);
    assert.equal(DataPenjualan.getPenjualanHarian(idPemilik, DataPenjualan.tanggalHariIni()).length, 1);

    const form = resPalsu();
    PenjualanController.tampilkanFormPenjualan({ user: { idPemilik } }, form);
    assert.equal(form.vista, 'fnb/I06-PenjualanHarian');

    const kosong = resPalsu();
    PenjualanController.kirimDataPenjualan({ user: { idAkun, idPemilik }, body: {} }, kosong);
    assert.equal(kosong.statusCode, 400);

    const salah = resPalsu();
    PenjualanController.kirimDataPenjualan({
        user: { idAkun, idPemilik },
        body: { [`terjual_${idProduk}`]: 'abc', [`tersisa_${idProduk}`]: '1' }
    }, salah);
    assert.equal(salah.statusCode, 400);
    assert.match(salah.data.error, /bilangan bulat/);

    const sukses = resPalsu();
    PenjualanController.kirimDataPenjualan({
        user: { idAkun, idPemilik },
        body: { [`terjual_${idProduk}`]: '3', [`tersisa_${idProduk}`]: '2' }
    }, sukses);
    assert.equal(sukses.lokasi, '/fnb/penjualan/tersimpan');

    const tersimpan = resPalsu();
    PenjualanController.tampilkanPenjualanTersimpan({ user: { idPemilik } }, tersimpan);
    assert.equal(tersimpan.vista, 'fnb/I07-PenjualanTersimpan');
});

// ---------- CatatSurplusController ----------

test('CatatSurplusController: formulir, validasi surplus, dan pengelolaan produk', () => {
    const { idAkun, idPemilik } = pemilikBaru();
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Roti Surplus', 'Makanan');

    const form = resPalsu();
    CatatSurplusController.tampilFormCatat({ user: { idPemilik }, query: {} }, form);
    assert.equal(form.vista, 'surplus/I08-CatatSurplus');
    assert.equal(form.data.produkList.length, 1);

    const formEdit = resPalsu();
    CatatSurplusController.tampilEditProduk({ user: { idPemilik }, params: { id: idProduk } }, formEdit);
    assert.equal(formEdit.data.produkEdit.id_produk, idProduk);

    const kurang = resPalsu();
    CatatSurplusController.simpanDataSurplus({ user: { idPemilik, idAkun }, body: {} }, kurang);
    assert.equal(kurang.statusCode, 400);

    const nol = resPalsu();
    CatatSurplusController.simpanDataSurplus({
        user: { idPemilik, idAkun },
        body: { idProduk, jumlah: '0', batasWaktu: '2030-01-01T10:00' }
    }, nol);
    assert.equal(nol.statusCode, 400);

    const lampau = resPalsu();
    CatatSurplusController.simpanDataSurplus({
        user: { idPemilik, idAkun },
        body: { idProduk, jumlah: '2', batasWaktu: '2020-01-01T10:00' }
    }, lampau);
    assert.match(lampau.data.error, /masa lalu/);

    const formatSalah = resPalsu();
    CatatSurplusController.simpanDataSurplus({
        user: { idPemilik, idAkun },
        body: { idProduk, jumlah: '2', batasWaktu: 'besok' }
    }, formatSalah);
    assert.equal(formatSalah.statusCode, 400);

    const bukanMilik = resPalsu();
    CatatSurplusController.simpanDataSurplus({
        user: { idPemilik, idAkun },
        body: { idProduk: 999999, jumlah: '2', batasWaktu: '2030-01-01T10:00' }
    }, bukanMilik);
    assert.match(bukanMilik.data.error, /tidak ditemukan/);

    const sukses = resPalsu();
    CatatSurplusController.simpanDataSurplus({
        user: { idPemilik, idAkun },
        body: { idProduk, jumlah: '2', batasWaktu: '2030-01-01T10:00' }
    }, sukses);
    assert.match(sukses.lokasi, /^\/surplus\/\d+\/donasi$/);

    const tambah = resPalsu();
    CatatSurplusController.simpanProdukBaru({
        user: { idPemilik, idAkun },
        body: { namaProduk: 'Produk Baru', kategori: 'Minuman' }
    }, tambah);
    assert.equal(tambah.lokasi, '/surplus/catat');
    assert.equal(ProdukSurplus.getSemuaProduk(idPemilik).length, 2);

    const edit = resPalsu();
    CatatSurplusController.simpanEditProduk({
        user: { idPemilik, idAkun },
        params: { id: idProduk },
        body: { namaProduk: 'Roti Diubah', kategori: 'Makanan' }
    }, edit);
    assert.equal(edit.lokasi, '/surplus/catat');
    assert.throws(() => ProdukSurplus.updateProduk(999999, idPemilik, 'X', 'Makanan'), /tidak ditemukan/);
});

// ---------- DistribusiSurplusController ----------

test('DistribusiSurplusController: validasi dan penyimpanan metode distribusi', () => {
    const { idAkun, idPemilik } = pemilikBaru();
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Susu Distribusi', 'Minuman');
    const idSurplus = surplusBaru(idPemilik, idProduk);

    const tidakAda = resPalsu();
    DistribusiSurplusController.tampilFormDistribusi({ user: { idPemilik }, params: { id: 999999 } }, tidakAda);
    assert.equal(tidakAda.statusCode, 404);

    const salahFormat = resPalsu();
    DistribusiSurplusController.tampilFormDistribusi({ user: { idPemilik }, params: { id: 'x' } }, salahFormat);
    assert.equal(salahFormat.statusCode, 404);

    const form = resPalsu();
    DistribusiSurplusController.tampilFormDistribusi({ user: { idPemilik }, params: { id: idSurplus } }, form);
    assert.equal(form.vista, 'surplus/I09-AturDistribusi');

    const diskonNol = resPalsu();
    DistribusiSurplusController.simpanDistribusi({
        user: { idPemilik, idAkun },
        params: { id: idSurplus },
        body: { metode: 'diskon', hargaJual: '0' }
    }, diskonNol);
    assert.equal(diskonNol.statusCode, 400);

    const diskon = resPalsu();
    const reqDiskon = { user: { idPemilik, idAkun }, params: { id: idSurplus }, body: { metode: 'diskon', hargaJual: '15.000' }, session: {} };
    DistribusiSurplusController.simpanDistribusi(reqDiskon, diskon);
    assert.equal(diskon.lokasi, '/surplus/sukses');
    assert.equal(MetodeDistribusiSurplus.getInfoDistribusi(idProduk).harga, 15000);

    const sukses = resPalsu();
    DistribusiSurplusController.tampilSukses({ session: reqDiskon.session }, sukses);
    assert.equal(sukses.vista, 'surplus/I11-SuksesPublikasi');

    const ulang = resPalsu();
    DistribusiSurplusController.tampilSukses({ session: {} }, ulang);
    assert.equal(ulang.lokasi, '/surplus/catat');
});

test('DistribusiSurplusController: surplus yang sudah terklaim tidak bisa diatur ulang', () => {
    const { idAkun, idPemilik } = pemilikBaru();
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Roti Terklaim', 'Makanan');
    const idSurplus = surplusBaru(idPemilik, idProduk);
    ProdukSurplus.setStatus(idSurplus, 'terklaim');

    const hasil = resPalsu();
    DistribusiSurplusController.simpanDistribusi({
        user: { idPemilik, idAkun },
        params: { id: idSurplus },
        body: { metode: 'donasi' }
    }, hasil);
    assert.equal(hasil.statusCode, 400);
    assert.match(hasil.data.error, /tidak tersedia/);
});

// ---------- KlaimController ----------

test('KlaimController: validasi ID dan penolakan klaim', () => {
    assert.throws(() => KlaimController.cekKetersediaan(0), /tidak valid/);
    assert.throws(() => KlaimController.setujuiKlaim('x', 1), /tidak valid/);
    assert.match(KlaimController.tolakKlaim(999999), /tidak ditemukan/);

    const { idPemilik } = pemilikBaru();
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Roti Tolak', 'Makanan');
    const idSurplus = surplusBaru(idPemilik, idProduk);
    assert.match(KlaimController.tolakKlaim(idSurplus), /tersedia/);

    ProdukSurplus.setStatus(idSurplus, 'terklaim');
    assert.match(KlaimController.tolakKlaim(idSurplus), /terklaim/);
    assert.equal(KlaimController.cekKetersediaan(idSurplus), false);
    assert.throws(() => KlaimController.kunciProduk(idSurplus), /tidak tersedia/);
});

test('KlaimController: klaim, detail pengambilan, dan konfirmasi pengambilan', () => {
    const { idPemilik, idAkun: idAkunPemilik } = pemilikBaru();
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Roti Ambil', 'Makanan');
    const idSurplus = surplusBaru(idPemilik, idProduk, 3);
    const { idAkun: idNgo } = ngoBaru();

    const idKlaim = KlaimController.setujuiKlaim(idSurplus, idNgo);
    assert.ok(idKlaim > 0);
    assert.equal(ProdukSurplus.getStatus(idSurplus), 'terklaim');
    assert.throws(() => KlaimController.setujuiKlaim(idSurplus, idNgo), /tidak dapat diproses/);

    const detail = KlaimController.ambilDetailPengambilan(idKlaim);
    assert.equal(detail.detailKlaim.idSurplus, idSurplus);
    assert.equal(detail.dataNgo.namaOrganisasi, 'Yayasan Kontroler');
    assert.throws(() => KlaimController.ambilDetailPengambilan(999999), /tidak ditemukan/);
    assert.throws(() => KlaimController.ambilDetailPengambilan(-1), /tidak valid/);

    const pesan = KlaimController.konfirmasiPengambilan(idKlaim);
    assert.match(pesan, /berhasil dikonfirmasi/);
    assert.equal(ProdukSurplus.getStatus(idSurplus), 'selesai');
    assert.throws(() => KlaimController.konfirmasiPengambilan(idKlaim), /sudah dikonfirmasi/);

    const daftar = DokumenKlaim.getDaftarKlaim(idNgo);
    assert.equal(daftar.length, 1);
    assert.throws(() => DokumenKlaim.getDetailKlaim(999999), /tidak ditemukan/);
});

// ---------- Model pendukung ----------

test('ProdukSurplus: status tidak valid dan data tidak ditemukan ditolak', () => {
    assert.throws(() => ProdukSurplus.setStatus(1, 'hangus'), /tidak valid/);
    assert.throws(() => ProdukSurplus.setStatus(999999, 'tersedia'), /tidak ditemukan/);

    const { idPemilik } = pemilikBaru();
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Roti Status', 'Makanan');
    const idSurplus = surplusBaru(idPemilik, idProduk);
    assert.ok(ProdukSurplus.getProdukSurplusTersedia().some((item) => item.idSurplus === idSurplus));
    assert.equal(ProdukSurplus.getStatus(idSurplus), 'tersedia');
    assert.equal(ProdukSurplus.getStatus(999999), null);
    assert.equal(ProdukSurplus.getDetailSurplus(999999), null);
});

test('MetodeDistribusiSurplus: simpan, ubah, dan baca metode', () => {
    const { idPemilik } = pemilikBaru();
    const idProduk = ProdukSurplus.tambahProduk(idPemilik, 'Roti Metode', 'Makanan');

    assert.equal(MetodeDistribusiSurplus.getInfoDistribusi(idProduk), null);
    assert.equal(MetodeDistribusiSurplus.getJenisDistribusi(idProduk), null);
    assert.throws(() => MetodeDistribusiSurplus.simpanMetode(idProduk, 'Gratis', 0), /tidak valid/);

    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Donasi', 0);
    assert.equal(MetodeDistribusiSurplus.getJenisDistribusi(idProduk), 'Donasi');

    MetodeDistribusiSurplus.simpanMetode(idProduk, 'Jual Diskon', 5000);
    assert.equal(MetodeDistribusiSurplus.getInfoDistribusi(idProduk).harga, 5000);
});

test('DokumenPendukung: nama berkas unik dan metadata tersimpan', () => {
    const { idAkun } = pemilikBaru();
    const idPendaftaran = Pendaftaran.ajukanPendaftaran(idAkun);

    DokumenPendukung.unggahDokumen(idPendaftaran, berkasUji('dokumen sama.pdf'));
    DokumenPendukung.unggahDokumen(idPendaftaran, berkasUji('dokumen sama.pdf'));

    const daftar = DokumenPendukung.getDokumen(idPendaftaran);
    assert.equal(daftar.length, 2);
    assert.notEqual(daftar[0].namaFile, daftar[1].namaFile);
    assert.ok(fs.existsSync(DokumenPendukung.ambilPathBerkas(idPendaftaran, daftar[0].namaFile)));
    assert.throws(
        () => DokumenPendukung.unggahDokumen(idPendaftaran, berkasUji('dokumen.doc')),
        /tidak didukung/
    );
});

test('PemilikFnB dan PerwakilanNGO: pencarian dan data profil', () => {
    const { idAkun, idPemilik } = pemilikBaru('Toko Profil');
    assert.equal(PemilikFnB.getNamaUsaha(idPemilik), 'Toko Profil');
    assert.equal(PemilikFnB.getLokasiUsaha(idPemilik), '-6.9147,107.6098');
    assert.equal(PemilikFnB.getDataUsaha(idPemilik).jamOperasional, '08.00-20.00');
    assert.throws(() => PemilikFnB.getDataUsaha(999999), /tidak ditemukan/);
    assert.equal(PemilikFnB.cariBerdasarkanAkun(999999), null);
    assert.ok(idAkun > 0);

    const { idAkun: idNgo } = ngoBaru('Yayasan Profil');
    assert.equal(PerwakilanNGO.getDataNgo(idNgo).namaOrganisasi, 'Yayasan Profil');
    assert.throws(() => PerwakilanNGO.getDataNgo(999999), /tidak ditemukan/);
    assert.equal(PerwakilanNGO.cariBerdasarkanAkun(999999), null);
});

// ---------- GeolocationAdapter ----------

test('GeolocationAdapter: jarak Haversine dari koordinat teks', async () => {
    const jarak = await GeolocationAdapter.hitungJarak('0,0', '0,1');
    assert.ok(jarak > 111 && jarak < 112);
    await assert.rejects(() => GeolocationAdapter.ambilKoordinat(''), /harus diisi/);
});

test('GeolocationAdapter: jalur Nominatim memakai cache dan menangani kegagalan', async () => {
    const asli = global.fetch;
    let panggilan = 0;

    try {
        global.fetch = async () => {
            panggilan += 1;
            return { ok: true, json: async () => [{ lat: '-6.9', lon: '107.6' }] };
        };
        const pertama = await GeolocationAdapter.ambilKoordinat('Jl. Cache Uji');
        const kedua = await GeolocationAdapter.ambilKoordinat('jl. cache uji');
        assert.deepEqual(pertama, kedua);
        assert.equal(panggilan, 1);

        global.fetch = async () => ({ ok: false });
        await assert.rejects(() => GeolocationAdapter.ambilKoordinat('Jl. Gagal Uji'), /tidak ditemukan/);

        global.fetch = async () => ({ ok: true, json: async () => [] });
        await assert.rejects(() => GeolocationAdapter.ambilKoordinat('Jl. Kosong Uji'), /tidak ditemukan/);

        global.fetch = async () => ({ ok: true, json: async () => [{ lat: 'x', lon: 'y' }] });
        await assert.rejects(() => GeolocationAdapter.ambilKoordinat('Jl. Aneh Uji'), /tidak ditemukan/);

        global.fetch = async () => {
            const galat = new Error('abort');
            galat.name = 'AbortError';
            throw galat;
        };
        await assert.rejects(() => GeolocationAdapter.ambilKoordinat('Jl. Batal Uji'), /tidak ditemukan/);

        global.fetch = async () => {
            throw new Error('jaringan mati');
        };
        await assert.rejects(() => GeolocationAdapter.ambilKoordinat('Jl. Putus Uji'), /jaringan mati/);
    } finally {
        global.fetch = asli;
    }
});
