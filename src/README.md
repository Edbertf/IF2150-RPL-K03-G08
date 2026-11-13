# FoodLink

Aplikasi web untuk mengurangi food waste dengan menghubungkan **Pemilik F&B** yang memiliki produk surplus dengan **Perwakilan NGO** yang membutuhkan, di bawah pengawasan **Admin Sistem**.

Repository ini berisi implementasi Tugas Besar IF2150 Rekayasa Perangkat Lunak, Kelas 03, Kelompok 08.

> **Status:** tahap implementasi (Milestone 9). Sebagian use case sudah berjalan, sebagian masih dalam proses. Lihat [Status Implementasi](#status-implementasi).

---

## 1. Deskripsi

FoodLink memungkinkan Pemilik F&B mencatat penjualan harian dan produk surplus, lalu menawarkannya sebagai donasi atau penjualan diskon. Perwakilan NGO dapat melihat daftar surplus, menyaringnya, dan mengajukan klaim. Admin Sistem memverifikasi pendaftaran akun serta memantau aktivitas pengguna melalui halaman log.

Fitur yang sudah berjalan di repository saat ini:

1. **Registrasi akun** Pemilik F&B dan Perwakilan NGO beserta unggah dokumen pendukung (UC01) — sudah merge ke `develop`.
2. **Login, logout, dan pembatasan peran** berbasis sesi; halaman yang dilindungi memakai `butuhPeran(...)` (UC01–UC03).
3. **Verifikasi pendaftaran** oleh Admin Sistem dan **status pendaftaran** bagi pendaftar (UC02, UC03) — sudah merge ke `develop`.
4. **Pencatatan penjualan harian** per produk (UC04) — sudah merge ke `develop`.
5. **Klaim produk surplus** oleh Perwakilan NGO (UC10) — sudah merge ke `develop`.
6. **Log aktivitas pengguna** untuk Admin Sistem, dengan filter Semua, Klaim, Surplus, dan Verifikasi (UC12) — ada di branch `feat/UC12-Mengecek-Log-Aktivitas-Pengguna`. Log ditulis otomatis oleh UC01, UC02, UC04, dan UC10, lalu dilengkapi data contoh dari seed.

---

## 2. Status Implementasi

| Use Case | Keterangan | Status |
| :--- | :--- | :--- |
| UC01 Registrasi Akun | Form registrasi, validasi, unggah dokumen | Sudah merge ke `develop` |
| UC02 Verifikasi Pendaftaran | Daftar dan detail pendaftar untuk admin | Sudah merge ke `develop` |
| UC03 Status Pendaftaran | Halaman status bagi pendaftar | Sudah merge ke `develop` |
| UC04 Mencatat Penjualan Harian | Form dan rekap penjualan | Sudah merge ke `develop` |
| UC05 Melihat Hasil Prediksi | Prediksi produksi dari data historis | Pull request terbuka |
| UC06 Mencatat Produk Surplus | Form surplus | Ada di branch, belum merge |
| UC07 Mengatur Metode Distribusi | Donasi / penjualan diskon | Ada di branch, belum merge |
| UC08 Melihat Informasi Surplus | Daftar surplus untuk NGO | Ada di branch UC08, belum merge |
| UC09 Menyaring Produk Surplus | Filter kategori, jarak, waktu | Belum ada implementasi |
| UC10 Mengklaim Produk Surplus | Pengajuan klaim | Sudah merge ke `develop` |
| UC11 Mengonfirmasi Pengambilan | Konfirmasi serah terima | Belum ada implementasi |
| UC12 Mengecek Log Aktivitas | Halaman log dan filter untuk admin | Selesai di branch; log dari UC01, UC02, UC04, UC10 dan seed |

Fitur **Kelola Produk (F8)** tidak diimplementasikan karena tidak termasuk 12 use case pada DPPL.

> **Autentikasi.** Login tersedia di `/masuk` dan memakai `express-session` dengan kata sandi ter-hash bcrypt. Sesi disimpan pada cookie `foodlink.sid`, dan `middleware/pengguna.js` mengisi `req.user` dari sesi tersebut. Halaman terlindungi memakai `butuhPeran(...)`; pengguna yang belum diverifikasi diarahkan ke `/status` oleh `butuhDiverifikasi`. Logout memakai `POST /keluar` yang menghancurkan sesi.

---

## 3. Teknologi

| Komponen | Teknologi | Versi |
| :--- | :--- | :--- |
| Runtime | Node.js | 20+ (diuji pada 24.16.0) |
| Web framework | Express | ^5.3.0 |
| Template engine | EJS | ^7.0.2 |
| Database | SQLite melalui better-sqlite3 | ^13.0.3 |
| Hash kata sandi | bcryptjs | ^3.0.3 |
| Unggah berkas | multer | ^2.5.0 |
| Konfigurasi | dotenv | ^18.0.9 |
| Pengujian | `node:test` (bawaan Node.js) | — |
| Auto-reload (dev) | nodemon | ^3.1.14 |
| Gaya antarmuka | CSS inline per halaman, font Nunito | — |

Tidak ada framework frontend terpisah; halaman dirender server-side dengan EJS.

---

## 4. Struktur Folder

```
src/
├── app.js                     # Titik masuk aplikasi, pemasangan route
├── config/
│   └── db.js                  # Koneksi SQLite (better-sqlite3)
├── controllers/               # Logika permintaan
├── database/
│   ├── init.js                # Menjalankan semua schema/*.sql
│   ├── seed.js                # Data contoh
│   └── schema/                # Definisi tabel (01–11)
├── models/                    # Query dan akses data
├── public/assets/             # Logo
├── routes/                    # Definisi route Express
├── tests/                     # Pengujian otomatis (node:test)
├── views/                     # Template EJS
├── .env.example               # Contoh konfigurasi
└── package.json
```

---

## 5. Prasyarat dan Instalasi

**Prasyarat:**

- Node.js 20 atau lebih baru
- npm (disertakan bersama Node.js)
- Git

**Langkah instalasi:**

```bash
git clone https://github.com/Edbertf/IF2150-RPL-K03-G08.git
cd IF2150-RPL-K03-G08/src
npm install
```

**Jika `npm install` gagal saat membangun `better-sqlite3`** (muncul `gyp ERR! Could not find any Visual Studio installation`), pilih salah satu:

```bash
# Opsi 1: pakai versi yang punya binary siap pakai (API sama)
npm install better-sqlite3@12.11.1 --no-save

# Opsi 2: pasang Visual Studio Build Tools + Python, lalu ulangi npm install
```

`node_modules`, berkas `*.db`, dan `.env` tidak disimpan di repository.

---

## 6. Konfigurasi

Konfigurasi bersifat opsional. Salin contoh berikut jika ingin mengubah nilai default:

```bash
cp .env.example .env      # Windows: copy .env.example .env
```

| Variabel | Default | Keterangan |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port server HTTP |
| `DB_PATH` | `./database/foodlink.db` | Lokasi berkas SQLite |
| `STORAGE_DIR` | `./storage/dokumen` | Folder penyimpanan dokumen pendukung |

Berkas `.env` diabaikan oleh Git (`.gitignore`), jadi konfigurasi lokal tidak ikut ter-commit.

---

## 7. Database dan Seed

Skema dibuat otomatis saat aplikasi pertama kali dijalankan: `database/init.js` membaca semua berkas `database/schema/*.sql` secara berurutan dan mengeksekusinya dengan `CREATE TABLE IF NOT EXISTS`.

Isi data contoh:

```bash
npm run db:seed
```

Seed akan **dilewati** jika tabel `pemilik_fnb` sudah berisi data. Untuk mengulang dari nol:

```bash
# PowerShell (Windows)
Remove-Item database\foodlink.db* -Force
npm run db:seed

# Bash / Git Bash
rm -f database/foodlink.db*
npm run db:seed
```

Data yang dibuat seed:

- 3 akun (pemilik, admin, NGO) beserta profilnya
- 1 pemilik F&B: **Bakery Sinar Pagi**
- 1 organisasi: **Yayasan Nurani Berbagi**
- 4 produk
- 6 hari data penjualan
- 7 baris log aktivitas (sebagian uraiannya memuat kata Klaim, Surplus, atau Verifikasi)

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
| Halaman registrasi berhasil | `/daftar/berhasil` | Publik |
| Status pendaftaran | `/status` | Pemilik F&B, Perwakilan NGO |
| Form penjualan harian | `/fnb/penjualan` | Pemilik F&B terverifikasi |
| Penjualan tersimpan | `/fnb/penjualan/tersimpan` | Pemilik F&B terverifikasi |
| Detail produk surplus | `/ngo/surplus/:idSurplus` | Perwakilan NGO |
| Klaim berhasil | `/ngo/klaim/:idKlaim/berhasil` | Perwakilan NGO |
| Verifikasi pendaftar | `/admin/verifikasi` | Admin Sistem |
| Log aktivitas | `/admin/log` | Admin Sistem |

Filter log memakai query string, misalnya `/admin/log?kategori=Klaim`.

---

## 9. Akun dan Data Uji

Akun hasil seed:

| Peran | Email | Kata sandi |
| :--- | :--- | :--- |
| Pemilik F&B | `demo@foodlink.test` | `password123` |
| Admin Sistem | `admin@foodlink.test` | `admin123` |
| Perwakilan NGO | `ngo@foodlink.test` | `password123` |

> **Catatan:** masuk melalui `/masuk`. Admin langsung diarahkan ke `/admin/verifikasi`; pemilik F&B dan NGO yang sudah diverifikasi diarahkan ke halaman utamanya, sedangkan yang masih menunggu verifikasi diarahkan ke `/status`.

---

## 10. Ringkasan Route

| Method | Path | Akses | Keterangan |
| :--- | :--- | :--- | :--- |
| GET | `/` | Publik | Halaman selamat datang |
| GET | `/masuk` | Publik | Form login |
| POST | `/masuk` | Publik | Proses login, membuat sesi |
| POST | `/keluar` | Pengguna login | Hancurkan sesi dan kembali ke beranda |
| GET | `/daftar` | Publik | Form registrasi akun |
| POST | `/daftar` | Publik | Kirim registrasi (multipart, dokumen maks. 5 MB: PDF/JPG/PNG) |
| GET | `/daftar/berhasil` | Publik | Konfirmasi pengajuan |
| GET | `/status` | Pemilik F&B, NGO | Status verifikasi pendaftaran |
| GET | `/fnb/penjualan` | Pemilik F&B terverifikasi | Form penjualan harian |
| POST | `/fnb/penjualan` | Pemilik F&B terverifikasi | Simpan penjualan |
| GET | `/fnb/penjualan/tersimpan` | Pemilik F&B terverifikasi | Konfirmasi penjualan tersimpan |
| GET | `/ngo/surplus/:idSurplus` | Perwakilan NGO | Detail produk surplus |
| POST | `/ngo/surplus/:idSurplus/klaim` | Perwakilan NGO | Proses klaim surplus |
| GET | `/ngo/klaim/:idKlaim/berhasil` | Perwakilan NGO | Konfirmasi klaim berhasil |
| GET | `/admin/verifikasi` | Admin Sistem | Daftar pendaftar menunggu verifikasi |
| GET | `/admin/verifikasi/:idPendaftaran` | Admin Sistem | Detail pendaftar dan dokumen |
| POST | `/admin/verifikasi/:idPendaftaran` | Admin Sistem | Setujui/tolak pendaftaran |
| GET | `/admin/verifikasi/:idPendaftaran/hasil` | Admin Sistem | Hasil keputusan verifikasi |
| GET | `/admin/verifikasi/:idPendaftaran/dokumen/:idDokumen` | Admin Sistem | Unduh dokumen pendukung |
| GET | `/admin/log` | Admin Sistem | Daftar log aktivitas, filter `?kategori=` |

---

## 11. Pengujian

```bash
npm test
```

Pengujian memakai `node:test` dan database sementara di folder temp, sehingga data pengembangan tidak tersentuh.

| Berkas | Jumlah | Cakupan |
| :--- | :--- | :--- |
| `tests/validasi.test.js` | 20 | Validasi email, kata sandi, jam operasional, legalitas NGO, unggah dokumen (16 blok test; 4 di antaranya dihasilkan loop email tidak valid) |
| `tests/registrasi.test.js` | 5 | Registrasi UC01: penyimpanan akun/profil/pendaftaran/dokumen, email duplikat, rollback |
| `tests/verifikasi.test.js` | 8 | UC02: daftar tunggu, detail pendaftar, setujui/tolak, keputusan ganda, status tidak valid |
| `tests/akses.test.js` | 6 | Pembatasan peran dan pengalihan pengguna yang belum diverifikasi |
| `tests/status.test.js` | 5 | UC03: status pendaftaran untuk tiap keadaan |
| `tests/log.test.js` | 11 | UC12: urutan log, filter teks, empat chip, kriteria tidak valid (400), admin 200, non-admin 403, dua keadaan kosong |
| `tests/integrasi-log.test.js` | 4 | Penulisan log otomatis dari UC01 (registrasi), UC02 (verifikasi), UC04 (penjualan), UC10 (klaim) |

Total: **59 test**. Angka ini dihitung dari test case yang benar-benar dijalankan `node --test`, bukan jumlah baris `test(` di berkas.

Manual untuk UC12:

```bash
npm run db:seed
npm start
```

1. Buka `http://localhost:3000/admin/log` → daftar 7 log.
2. Buka `http://localhost:3000/admin/log?kategori=Klaim` → hanya log Klaim.
3. Buka `http://localhost:3000/admin/log?kategori=Akun` → status 400 dan pesan “Kriteria penyaringan tidak valid.” (hanya empat pilihan DPPL yang diterima).

---

## 12. Skema Database

| Tabel | Kolom penting | Keterangan |
| :--- | :--- | :--- |
| `akun_pengguna` | `id_akun`, `email` (unik), `kata_sandi`, `tipe_akun` | Akun semua peran: `pemilik_fnb`, `perwakilan_ngo`, `admin_sistem` |
| `pendaftaran` | `id_pendaftaran`, `id_akun` (unik), `tanggal_daftar`, `status_verifikasi` | Pengajuan akun: `menunggu verifikasi`, `diterima`, `ditolak` |
| `dokumen_pendukung` | `id_dokumen`, `id_pendaftaran`, `nama_file`, `tipe_dokumen` | Berkas PDF/JPG/PNG yang diunggah saat registrasi |
| `pemilik_fnb` | `id_pemilik`, `id_akun` (unik), `nama_usaha`, `alamat_usaha`, `jam_operasional` | Profil pemilik usaha |
| `produk` | `id_produk`, `id_pemilik`, `nama_produk`, `kategori` | Produk milik pemilik |
| `data_penjualan` | `id_penjualan`, `id_produk`, `tanggal`, `jumlah_terjual`, `jumlah_tersisa` | Satu baris per produk per tanggal |
| `perwakilan_ngo` | `id_akun` (PK/FK), `nama_organisasi`, `nomor_legalitas`, `lokasi` | Profil perwakilan NGO |
| `metode_distribusi_surplus` | `id_distribusi`, `id_produk` (unik), `jenis_distribusi`, `harga` | Metode `Donasi` atau `Jual Diskon` per produk |
| `produk_surplus` | `id_surplus`, `id_produk`, `id_pemilik`, `jumlah`, `batas_waktu_pengambilan`, `status` | Stok surplus: `tersedia`, `terklaim`, `selesai` |
| `dokumen_klaim` | `id_klaim`, `id_ngo`, `id_surplus` (unik), `waktu_klaim`, `status_klaim` | Klaim yang diajukan NGO |
| `log_aktivitas` | `id_log`, `id_akun`, `aktivitas`, `waktu` | Uraian aktivitas; filter memakai kata kunci pada `aktivitas` |

Indeks pada `log_aktivitas`: `idx_log_waktu (waktu DESC)` untuk mempercepat urutan log terbaru.

Relasi utama:

```
akun_pengguna 1—1 pemilik_fnb 1—N produk 1—N data_penjualan
akun_pengguna 1—1 perwakilan_ngo
akun_pengguna 1—1 pendaftaran 1—N dokumen_pendukung
produk 1—1 metode_distribusi_surplus
produk 1—N produk_surplus 1—1 dokumen_klaim
akun_pengguna 1—N log_aktivitas
```

---

## 13. Modul dan Pembagian Tugas

Pembagian per use case. Nama mengikuti akun GitHub yang tercatat pada commit.

| Modul | Use Case | Penanggung jawab | Status |
| :--- | :--- | :--- | :--- |
| Autentikasi dan verifikasi | UC01, UC02, UC03 | `nesinezz` | UC01–UC03 sudah merge ke `develop` |
| Penjualan dan prediksi | UC04, UC05 | `Edbertf` | UC04 selesai; UC05 dalam review |
| Produk surplus | UC06, UC07 | `ExcellActIV` | Ada di branch, belum merge |
| Informasi dan penyaringan surplus | UC08, UC09 | — | UC08 di branch; UC09 belum |
| Klaim dan pengambilan | UC10, UC11 | `RauufFawaaz1` | UC10 sudah merge; UC11 belum |
| Log aktivitas | UC12 | `Dylan1252` | Selesai; log otomatis terintegrasi dengan UC01, UC02, UC04, UC10 |
| Dokumentasi dan pengujian | README, test, profiling | `Dylan1252` | Berjalan |

Tabel ini diperbarui setelah setiap use case merge ke `develop`.

---

## 14. Pemecahan Masalah

| Gejala | Penyebab | Solusi |
| :--- | :--- | :--- |
| `Seed dilewati: data sudah ada` | Database lama masih ada | Hapus `database/foodlink.db*`, lalu `npm run db:seed` |
| `gyp ERR! Could not find any Visual Studio` | better-sqlite3 perlu dibangun dari sumber | Lihat [bagian instalasi](#5-prasyarat-dan-instalasi) |
| `EADDRINUSE` | Port 3000 dipakai proses lain | Jalankan `PORT=3100 npm start` atau hentikan proses lama |
| `SQLITE_BUSY` | Dua proses membuka database yang sama | Hentikan server lain sebelum menjalankan seed/test |
| Dokumen ditolak | Format/ukuran tidak sesuai | Hanya PDF/JPG/PNG, maksimal 5 MB |
| Halaman `/admin/log` kosong | Belum ada log di database | Jalankan `npm run db:seed`, atau lakukan aksi yang tercatat (registrasi, verifikasi, penjualan, klaim) |
