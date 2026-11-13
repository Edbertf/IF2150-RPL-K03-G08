# FoodLink

Aplikasi web untuk mengurangi *food waste* dengan menghubungkan **Pemilik F&B** yang memiliki produk surplus dengan **Perwakilan NGO** yang membutuhkan, di bawah pengawasan **Admin Sistem**.

Repository ini berisi implementasi Tugas Besar IF2150 Rekayasa Perangkat Lunak, Kelas 03, Kelompok 08 (**The Dragon Warrior**).

> **Status:** Milestone 9 (implementasi). Seluruh dua belas use case sudah diimplementasikan di branch `develop`. Lihat [Status Implementasi](#2-status-implementasi).

---

## 1. Deskripsi

FoodLink memungkinkan Pemilik F&B mencatat penjualan harian, melihat prediksi produksi, mencatat produk surplus, lalu menawarkan surplus tersebut sebagai **donasi** atau **penjualan diskon**. Perwakilan NGO dapat melihat daftar surplus, menyaringnya berdasarkan kata kunci/kategori/jarak/waktu, dan mengajukan klaim. Admin Sistem memverifikasi pendaftaran akun.

Alur utama:

1. Pemilik F&B **registrasi** dan mengunggah dokumen pendukung.
2. Admin Sistem **memverifikasi** pendaftaran.
3. Pemilik F&B mencatat **penjualan harian**; dashboard menampilkan **prediksi produksi** untuk hari berikutnya.
4. Pemilik F&B mencatat **produk surplus** dan memilih **metode distribusi** (Donasi atau Jual Diskon).
5. Perwakilan NGO melihat, **menyaring**, dan **mengklaim** produk surplus.
6. Pemilik F&B dan NGO menyelesaikan serah terima, lalu Admin Sistem dapat memantau **log aktivitas** pengguna.

Arsitektur mengikuti pola **MVC**: `routes/` → `controllers/` → `models/` → SQLite, dengan tampilan server-side EJS di `views/`.

---

## 2. Status Implementasi

| Use Case | Fitur | Status |
| :--- | :--- | :--- |
| UC01 Registrasi Akun | Form registrasi, validasi, unggah dokumen pendukung | Sudah di `develop` |
| UC02 Verifikasi Pendaftaran | Daftar, detail, dan keputusan verifikasi untuk admin | Sudah di `develop` |
| UC03 Status Pendaftaran | Halaman status bagi pendaftar | Sudah di `develop` |
| UC04 Mencatat Data Penjualan Harian | Form dan rekap penjualan per produk | Sudah di `develop` |
| UC05 Melihat Hasil Prediksi Produksi | Prediksi produksi dari data historis 7 hari | Sudah di `develop` (PR #14) |
| UC06 Mencatat Produk Surplus | Form surplus dan kelola produk | Sudah di `develop` (PR #30) |
| UC07 Mengatur Metode Distribusi Surplus | Pilihan Donasi / Jual Diskon dan publikasi | Sudah di `develop` (PR #31) |
| UC08 Informasi Produk Surplus | Daftar dan detail surplus untuk NGO | Sudah di `develop` (PR #28) |
| UC09 Menyaring Produk Surplus | Filter kata kunci, jenis, jarak, dan waktu | Sudah di `develop` (PR #29) |
| UC10 Mengklaim Produk Surplus | Pengajuan klaim oleh NGO | Sudah di `develop` (PR #19) |
| UC11 Mengonfirmasi Pengambilan Produk Surplus | Konfirmasi serah terima dan status selesai | Sudah di `develop` (PR #27) |
| UC12 Mengecek Log Aktivitas Pengguna | Halaman log dan filter untuk admin | Sudah di `develop` (PR #17) |

Login dan manajemen sesi (pendukung UC01–UC03) sudah berjalan di `develop`. Fitur **Kelola Produk (F8)** tidak diimplementasikan karena tidak termasuk 12 use case pada DPPL.

---

## 3. Teknologi

| Komponen | Teknologi | Versi |
| :--- | :--- | :--- |
| Runtime | Node.js | 20+ (diuji pada Node.js 24) |
| Web framework | Express | ^5.3.0 |
| Template engine | EJS | ^7.0.2 |
| Database | SQLite melalui better-sqlite3 | ^13.0.3 |
| Sesi | express-session | ^1.19.0 |
| Hash kata sandi | bcryptjs | ^3.0.3 |
| Unggah berkas | multer | ^2.5.0 |
| Konfigurasi | dotenv | ^18.0.9 |
| Pengujian | `node:test` (bawaan Node.js) | — |
| Auto-reload (dev) | nodemon | ^3.1.14 |
| Antarmuka | CSS inline per halaman, font Nunito | — |

Tidak ada framework frontend terpisah; seluruh halaman dirender server-side dengan EJS. Waktu ditampilkan dalam zona **Asia/Jakarta**.

---

## 4. Struktur Folder

```
src/
├── app.js                     # Titik masuk aplikasi dan pemasangan route
├── config/
│   ├── db.js                  # Koneksi SQLite (WAL, foreign key aktif)
│   └── sesi.js                # Konfigurasi express-session
├── controllers/               # Logika permintaan per fitur
├── database/
│   ├── init.js                # Menjalankan semua schema/*.sql saat start
│   ├── schema/                # Definisi tabel (01–10)
│   ├── seed.js                # Seed pemilik F&B, produk, penjualan
│   ├── seedAdmin.js           # Seed Admin Sistem
│   └── seedSurplus.js         # Seed akun NGO dan produk surplus
├── middleware/
│   ├── pengguna.js            # Mengisi req.user dari sesi
│   └── peran.js               # Guard butuhPeran dan butuhDiverifikasi
├── models/                    # Query dan akses data
├── public/assets/             # Logo dan aset statis
├── routes/                    # admin, auth, fnb, masuk, ngo, status, surplus
├── tests/                     # Pengujian otomatis (node:test)
├── views/                     # Template EJS per layar (I-xx, N-x)
├── .env.example               # Contoh konfigurasi
└── package.json
```

---

## 5. Prasyarat dan Instalasi

**Prasyarat:**

- Node.js 20 atau lebih baru beserta npm
- Git

**Langkah instalasi:**

```bash
git clone https://github.com/Edbertf/IF2150-RPL-K03-G08.git
cd IF2150-RPL-K03-G08/src
npm install
```

**Jika `npm install` gagal saat membangun `better-sqlite3`** (misalnya `gyp ERR! Could not find any Visual Studio installation`), pilih salah satu:

```bash
# Opsi 1: pakai versi yang memiliki binary siap pakai (API sama)
npm install better-sqlite3@12.11.1 --no-save

# Opsi 2: pasang Visual Studio Build Tools + Python, lalu ulangi npm install
```

Folder `node_modules`, berkas `*.db`, dan `.env` tidak disimpan di repository.

---

## 6. Konfigurasi

Konfigurasi bersifat opsional. Salin contoh berikut bila ingin mengubah nilai default:

```bash
cp .env.example .env      # Windows: copy .env.example .env
```

| Variabel | Default | Keterangan |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port server HTTP |
| `DB_PATH` | `./database/foodlink.db` | Lokasi berkas SQLite |
| `SESSION_SECRET` | acak saat start | Kunci cookie sesi. Bila kosong, sesi lama tidak berlaku setelah server di-restart |
| `STORAGE_DIR` | `./storage/dokumen` | Dicantumkan di `.env.example`; unggahan dokumen saat ini memakai folder sementara sistem operasi |

Nilai `.env` diabaikan Git (`.gitignore`), sehingga konfigurasi lokal tidak ikut ter-commit.

---

## 7. Database dan Seed

Skema dibuat otomatis saat aplikasi pertama kali dijalankan: `database/init.js` membaca semua `database/schema/*.sql` secara berurutan dan mengeksekusinya dengan `CREATE TABLE IF NOT EXISTS`. Berkas database default berada di `src/database/foodlink.db` dan **tidak** ikut di-commit.

Perintah seed:

```bash
npm run db:seed          # pemilik demo, 4 produk, 6 hari data penjualan
npm run db:seed:admin    # Admin Sistem + menerima pendaftaran akun demo
npm run db:seed:surplus  # akun NGO, 3 produk surplus, metode distribusi
```

Urutan yang disarankan: `db:seed` → `db:seed:admin` → `db:seed:surplus`.

Seed bersifat idempoten: `db:seed` dilewati bila `pemilik_fnb` sudah berisi data, dan seed surplus tidak menggandakan produk/surplus yang sudah ada. Untuk mengulang dari nol:

```bash
# PowerShell (Windows)
Remove-Item database\foodlink.db* -Force

# Bash / Git Bash
rm -f database/foodlink.db*
```

Data yang dibuat seed:

- 1 Pemilik F&B: **Bakery Sinar Pagi** (`Jl. Dipatiukur, Bandung` setelah seed surplus)
- 1 Perwakilan NGO: **Yayasan Nurani Berbagi** (`Jl. Dago No. 10, Bandung`)
- 1 Admin Sistem
- 6 produk dan 24 baris penjualan (4 produk × 6 hari)
- 3 produk surplus dengan metode **Donasi** atau **Jual Diskon** (Nasi Goreng Spesial, Es Teh Manis, Roti Tawar)
- 7 baris log aktivitas contoh untuk halaman `/admin/log`

`db:seed` membuat ketiga akun beserta data contoh dan log. `db:seed:admin` memastikan akun Admin Sistem ada dan menerima pendaftaran akun demo; `db:seed:surplus` menerima pendaftaran NGO serta menambahkan produk surplus.

---

## 8. Menjalankan Aplikasi

```bash
npm start        # mode biasa
npm run dev      # dengan nodemon (auto-reload)
```

Server berjalan di `http://localhost:3000`.

| Halaman | URL | Peran |
| :--- | :--- | :--- |
| Halaman selamat datang | `/` | Publik |
| Login | `/masuk` | Publik |
| Form registrasi | `/daftar` | Publik |
| Registrasi berhasil | `/daftar/berhasil` | Publik |
| Status pendaftaran | `/status` | Pemilik F&B, Perwakilan NGO |
| Dashboard dan prediksi | `/fnb/dashboard` | Pemilik F&B terverifikasi |
| Form penjualan harian | `/fnb/penjualan` | Pemilik F&B terverifikasi |
| Penjualan tersimpan | `/fnb/penjualan/tersimpan` | Pemilik F&B terverifikasi |
| Catat produk surplus | `/surplus/catat` | Pemilik F&B terverifikasi |
| Atur distribusi surplus | `/surplus/:id/donasi` | Pemilik F&B terverifikasi |
| Publikasi berhasil | `/surplus/sukses` | Pemilik F&B terverifikasi |
| Daftar surplus (dengan filter) | `/ngo/surplus?q=&jenis=&jarak=&waktu=` | Perwakilan NGO |
| Detail produk surplus | `/ngo/surplus/:idSurplus` | Perwakilan NGO |
| Klaim saya | `/ngo/klaim` | Perwakilan NGO |
| Klaim berhasil | `/ngo/klaim/:idKlaim/berhasil` | Perwakilan NGO |
| Verifikasi pendaftar | `/admin/verifikasi` | Admin Sistem |
| Log aktivitas | `/admin/log` | Admin Sistem |

Nilai filter UC09: `jenis` = `Makanan` atau `Minuman`; `jarak` = `1`, `2`, `5`, atau `10` (km); `waktu` = `hari-ini` atau `besok`; `q` = kata kunci bebas. Contoh: `/ngo/surplus?jenis=Makanan&jarak=5&waktu=besok`.

Autentikasi memakai `express-session` dengan cookie `foodlink.sid` (httpOnly, sameSite `lax`, berlaku 8 jam). `middleware/pengguna.js` mengisi `req.user`; halaman terlindungi memakai `butuhPeran(...)`, dan `butuhDiverifikasi` mengalihkan akun yang belum diterima ke `/status`. Logout memakai `POST /keluar`.

---

## 9. Akun dan Data Uji

| Peran | Email | Kata sandi | Seed yang diperlukan |
| :--- | :--- | :--- | :--- |
| Pemilik F&B | `demo@foodlink.test` | `password123` | `db:seed` + `db:seed:admin` |
| Admin Sistem | `admin@foodlink.test` | `admin123` | `db:seed` |
| Perwakilan NGO | `ngo@foodlink.test` | `password123` | `db:seed` + `db:seed:surplus` |

Catatan:

- Masuk melalui `/masuk`. Admin diarahkan ke `/admin/verifikasi`; pemilik F&B dan NGO yang sudah diterima diarahkan ke halaman kerjanya, sedangkan yang belum diterima diarahkan ke `/status`.
- `db:seed:admin` membuat baris pendaftaran akun demo dengan status `diterima`, sehingga akun demo bisa langsung memakai halaman Pemilik F&B.
- Seluruh data uji bersifat fiktif.

---

## 10. Ringkasan Route

| Method | Path | Akses | Keterangan |
| :--- | :--- | :--- | :--- |
| GET | `/` | Publik | Halaman selamat datang |
| GET | `/masuk` | Publik | Form login |
| POST | `/masuk` | Publik | Proses login |
| POST | `/keluar` | Pengguna login | Hancurkan sesi |
| GET | `/daftar` | Publik | Form registrasi |
| POST | `/daftar` | Publik | Kirim registrasi (multipart, dokumen PDF/JPG/PNG maks. 5 MB) |
| GET | `/daftar/berhasil` | Publik | Konfirmasi pengajuan |
| GET | `/status` | Pemilik F&B, NGO | Status verifikasi |
| GET | `/fnb/dashboard` | Pemilik F&B terverifikasi | Prediksi produksi |
| GET | `/fnb/penjualan` | Pemilik F&B terverifikasi | Form penjualan harian |
| POST | `/fnb/penjualan` | Pemilik F&B terverifikasi | Simpan penjualan |
| GET | `/fnb/penjualan/tersimpan` | Pemilik F&B terverifikasi | Konfirmasi penjualan tersimpan |
| GET | `/surplus/catat` | Pemilik F&B terverifikasi | Form catat surplus dan daftar produk |
| POST | `/surplus/catat` | Pemilik F&B terverifikasi | Simpan surplus baru |
| POST | `/surplus/produk/tambah` | Pemilik F&B terverifikasi | Tambah produk |
| GET | `/surplus/produk/:id/edit` | Pemilik F&B terverifikasi | Form edit produk |
| POST | `/surplus/produk/:id/edit` | Pemilik F&B terverifikasi | Simpan perubahan produk |
| GET | `/surplus/:id/donasi` | Pemilik F&B terverifikasi | Form atur distribusi |
| POST | `/surplus/:id/distribusi` | Pemilik F&B terverifikasi | Simpan metode distribusi |
| GET | `/surplus/sukses` | Pemilik F&B terverifikasi | Halaman publikasi berhasil |
| GET | `/ngo/surplus` | Perwakilan NGO | Daftar surplus + filter `q`, `jenis`, `jarak`, `waktu` |
| GET | `/ngo/surplus/:idSurplus` | Perwakilan NGO | Detail produk surplus |
| POST | `/ngo/surplus/:idSurplus/klaim` | Perwakilan NGO | Proses klaim |
| GET | `/ngo/klaim` | Perwakilan NGO | Daftar klaim saya |
| GET | `/ngo/klaim/:idKlaim/berhasil` | Perwakilan NGO | Konfirmasi klaim |
| POST | `/ngo/klaim/:idKlaim/konfirmasi-pengambilan` | Perwakilan NGO | Konfirmasi serah terima |
| GET | `/ngo/klaim/:idKlaim/pengambilan-selesai` | Perwakilan NGO | Halaman pengambilan selesai |
| GET | `/admin/verifikasi` | Admin Sistem | Daftar pendaftar |
| GET | `/admin/verifikasi/:idPendaftaran` | Admin Sistem | Detail pendaftar |
| POST | `/admin/verifikasi/:idPendaftaran` | Admin Sistem | Setujui/tolak pendaftaran |
| GET | `/admin/verifikasi/:idPendaftaran/hasil` | Admin Sistem | Hasil keputusan |
| GET | `/admin/verifikasi/:idPendaftaran/dokumen/:idDokumen` | Admin Sistem | Unduh dokumen pendukung |
| GET | `/admin/log` | Admin Sistem | Log aktivitas 100 terbaru, filter `?kategori=` |

---

## 11. Pengujian

```bash
npm test
```

Pengujian memakai `node:test` dengan database sementara di folder temp, sehingga data pengembangan tidak tersentuh.

| Berkas | Jumlah | Cakupan |
| :--- | :--- | :--- |
| `tests/validasi.test.js` | 20 | Validasi email, kata sandi, jam operasional, legalitas NGO, unggah dokumen (16 blok test; 4 di antaranya dihasilkan loop email tidak valid) |
| `tests/registrasi.test.js` | 5 | UC01: penyimpanan akun/profil/pendaftaran/dokumen, email duplikat, rollback |
| `tests/verifikasi.test.js` | 8 | UC02: daftar tunggu, detail pendaftar, setujui/tolak, keputusan ganda |
| `tests/akses.test.js` | 6 | Pembatasan peran dan pengalihan pengguna yang belum diverifikasi |
| `tests/status.test.js` | 5 | UC03: status pendaftaran untuk tiap keadaan |
| `tests/informasiSurplus.test.js` | 14 | UC08: daftar/detail surplus dan jarak; UC09: filter jenis, jarak, waktu, kombinasi, nilai tidak valid |
| `tests/log.test.js` | 12 | UC12: urutan log, filter teks, empat chip, kriteria tidak valid (400), admin 200, non-admin 403, dua keadaan kosong, batas 100 baris |
| `tests/integrasi-log.test.js` | 7 | Penulisan log otomatis dari UC01 registrasi, UC02 verifikasi, UC04 penjualan, UC06 surplus/pengelolaan produk, UC07 distribusi, UC10 klaim, UC11 pengambilan |

Total: **78 test**, seluruhnya lulus (`npm test`).

Contoh verifikasi manual UC12:

```bash
npm run db:seed
npm start
```

1. Masuk sebagai `admin@foodlink.test` / `admin123`, buka `http://localhost:3000/admin/log` → daftar log dengan nama pengguna.
2. Klik chip **Klaim**, **Surplus**, atau **Verifikasi** → daftar tersaring berdasarkan kata kunci.
3. Buka `/admin/log?kategori=Akun` → status 400 dan pesan "Kriteria penyaringan tidak valid."

---

## 12. Skema Database

| Tabel | Kolom penting | Keterangan |
| :--- | :--- | :--- |
| `akun_pengguna` | `id_akun`, `email` (unik), `kata_sandi`, `tipe_akun` | Akun semua peran: `pemilik_fnb`, `perwakilan_ngo`, `admin_sistem` |
| `pendaftaran` | `id_pendaftaran`, `id_akun` (unik), `tanggal_daftar`, `status_verifikasi` | `menunggu verifikasi`, `diterima`, `ditolak` |
| `dokumen_pendukung` | `id_dokumen`, `id_pendaftaran`, `nama_file`, `tipe_dokumen` | Berkas PDF/JPG/PNG saat registrasi |
| `pemilik_fnb` | `id_pemilik`, `id_akun` (unik), `nama_usaha`, `alamat_usaha`, `jam_operasional` | Profil pemilik usaha |
| `produk` | `id_produk`, `id_pemilik`, `nama_produk`, `kategori` | Produk milik pemilik |
| `data_penjualan` | `id_penjualan`, `id_produk`, `tanggal`, `jumlah_terjual`, `jumlah_tersisa` | Satu baris per produk per tanggal (unik) |
| `prediksi_produksi` | `id_prediksi`, `tanggal_prediksi`, `id_produk`, `jumlah_rekomendasi` | Hasil prediksi per produk per tanggal (unik) |
| `perwakilan_ngo` | `id_akun` (PK/FK), `nama_organisasi`, `nomor_legalitas`, `lokasi` | Profil perwakilan NGO |
| `metode_distribusi_surplus` | `id_distribusi`, `id_produk` (unik), `jenis_distribusi`, `harga` | `Donasi` atau `Jual Diskon` per produk |
| `produk_surplus` | `id_surplus`, `id_produk`, `id_pemilik`, `jumlah`, `batas_waktu_pengambilan`, `status` | `tersedia`, `terklaim`, `selesai` |
| `dokumen_klaim` | `id_klaim`, `id_ngo`, `id_surplus` (unik), `waktu_klaim`, `status_klaim` | Klaim yang diajukan NGO |
| `log_aktivitas` | `id_log`, `id_akun`, `aktivitas`, `waktu` | Riwayat aktivitas pengguna; filter memakai kata kunci pada `aktivitas`, indeks `idx_log_waktu (waktu DESC)` |

Tabel `log_aktivitas` diisi otomatis oleh aksi UC01, UC02, UC04, UC06, UC07, UC10, dan UC11.

Relasi utama:

```
akun_pengguna 1—1 pemilik_fnb 1—N produk 1—N data_penjualan
akun_pengguna 1—1 perwakilan_ngo
akun_pengguna 1—1 pendaftaran 1—N dokumen_pendukung
produk 1—1 metode_distribusi_surplus
produk 1—N produk_surplus 1—1 dokumen_klaim
produk 1—N prediksi_produksi
akun_pengguna 1—N log_aktivitas
```

Seluruh definisi tabel terdapat di `database/schema/`.

---

## 13. Modul dan Pembagian Tugas

| Anggota | NIM | Modul |
| :--- | :--- | :--- |
| Ernest Clarence Gunawan | 13525114 | UC01 Registrasi Akun, UC02 Verifikasi Pendaftaran, UC03 Status Pendaftaran, login dan manajemen sesi, pemisahan skema SQL |
| Dylan Frederico Ketaren | 13525036 | UC08 Informasi Produk Surplus, UC12 Log Aktivitas Pengguna, README dan dokumentasi |
| Edbert Fernando | 13525111 | UC04 Penjualan Harian, UC05 Prediksi Produksi, UC09 Penyaringan Produk Surplus |
| Excell Timothy Josua Tarigan | 13525024 | UC06 Catat Produk Surplus, UC07 Atur Distribusi Surplus |
| Abdur Rauuf Fawaaz | 13525117 | UC10 Klaim Produk Surplus, UC11 Konfirmasi Pengambilan Produk Surplus |

Pembagian mengikuti *assignee* pada issue GitHub masing-masing use case.

---

## 14. Pemecahan Masalah

| Gejala | Penyebab | Solusi |
| :--- | :--- | :--- |
| `Seed dilewati: data sudah ada` | Database lama masih ada | Hapus `database/foodlink.db*`, lalu ulangi urutan seed |
| `gyp ERR! Could not find any Visual Studio` | `better-sqlite3` perlu dibangun dari sumber | Lihat [bagian instalasi](#5-prasyarat-dan-instalasi) |
| `EADDRINUSE` | Port 3000 dipakai proses lain | Jalankan `PORT=3100 npm start` atau hentikan proses lama |
| `SQLITE_BUSY` | Dua proses membuka database yang sama | Hentikan server lain sebelum menjalankan seed/test |
| Akun demo tidak bisa masuk halaman kerja | Pendaftaran belum diterima | Jalankan `npm run db:seed:admin` (pemilik) atau `npm run db:seed:surplus` (NGO) |
| Dokumen registrasi ditolak | Format/ukuran tidak sesuai | Hanya PDF/JPG/PNG, maksimal 5 MB |
| Daftar surplus kosong | Belum ada surplus tersedia atau filter terlalu sempit | Jalankan `npm run db:seed:surplus`, atau longgarkan filter |
| Halaman `/admin/log` kosong | Belum ada log di database | Jalankan `npm run db:seed`, atau lakukan aksi yang tercatat (registrasi, verifikasi, penjualan, surplus, distribusi, klaim, pengambilan) |
| Filter log menampilkan "Kriteria penyaringan tidak valid" | Nilai `kategori` di luar pilihan | Gunakan `Semua`, `Klaim`, `Surplus`, atau `Verifikasi` |
