<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 9
<br>
IMPLEMENTASI PERANGKAT LUNAK
</h1>
<br>

## *FoodLink*
<p align="center">
<img alt="Logo FoodLink" src="./assets/Logo FoodLink.png" width="50%">

### Untuk: *Angel*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *03* |
| Kelompok | *08*  |

| NIM | Nama |
|---|---|
| *13524123* | *Yuhan Fanzuri Nizar* |
| *13525024* | *Excell Timothy Josua Tarigan* |
| *13525036* | *Dylan Frederico Ketaren* |
| *13525111* | *Edbert Fernando* |
| *13525114* | *Ernest Clarence Gunawan* |
| *13525117* | *Abdur Rauuf Fawaaz* |

---

# BAGIAN B: Laporan Implementasi

## B.1 Perubahan dari DPPL

Tabel B.1. Perubahan dari DPPL

| No | Bagian DPPL | Rancangan Awal | Implementasi Akhir | Alasan |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Lingkungan Implementasi (DBMS) | PostgreSQL 15 | SQLite (`better-sqlite3` 13.0.3) | Mempermudah asisten dan anggota tim menjalankan aplikasi tanpa instalasi server basis data lokal (*zero-configuration*) |
| 2 | Operasi C30 dan C31 | Tidak ada operasi penyimpanan profil | `simpanProfil()` pada `models/PemilikFnB.js` dan `models/PerwakilanNGO.js` | Algo-C23-01 menetapkan "simpan data profil sesuai tipe akun", tetapi operasinya belum didefinisikan di DPPL |
| 3 | I-02 dan I-03 | Tidak ada input Jam Operasional dan Nomor Legalitas | Ditambahkan pada formulir F&B dan NGO | Diwajibkan Algo-C23-02 serta merupakan atribut C30 (`jamOperasional`) dan C31 (`nomorLegalitas`) |
| 4 | Realisasi Use Case | Tidak ada use case khusus Login/Logout dan manajemen sesi | Halaman masuk `/masuk`, `express-session`, dan middleware pembatasan akses berbasis peran | Penunjang (*enabler*) yang wajib ada agar UC02 dan UC03 dapat berjalan dengan benar |
| 5 | C04 VerifikasiController | Tiga operasi utama | Ditambah `tampilkanHasilVerifikasi()` dan `sajikanDokumen()` | Diperlukan untuk merender halaman konfirmasi (I-21/I-22) dan menyajikan dokumen pendukung ke Admin |
| 6 | C32 AdminSistem | Kelas dengan operasi `verifikasiPendaftaran()` | Tidak dibuat kelas terpisah; kewenangan divalidasi middleware `butuhPeran('admin_sistem')` dan prosesnya ada di `VerifikasiController` | Menyederhanakan struktur; kewenangan lebih efektif diperiksa di lapisan routing sebelum proses verifikasi |
| 7 | I-04 | Satu keadaan "Menunggu Verifikasi" | Empat keadaan dalam satu view: menunggu, diterima, ditolak, dan data tidak ditemukan | Menampung skenario alternatif UC03 beserta acceptance criteria "jika data pendaftaran tidak ditemukan" |
| 8 | Q-C02-01 (`tanggal_daftar`) | Diisi `CURRENT_DATE` | Dihitung di aplikasi dengan zona `Asia/Jakarta` | `CURRENT_DATE` pada SQLite memakai UTC, sehingga pendaftaran pukul 00.00–06.59 WIB tercatat sehari sebelumnya |
| 9 | Operasi C01 dan C02 | C01 hanya `registrasi()`; C02 lima operasi | C01 ditambah `cariBerdasarkanEmail()` dan `cariKredensial()`; C02 ditambah `cariBerdasarkanAkun()` | Dibutuhkan untuk pemeriksaan email duplikat, verifikasi kata sandi saat masuk, dan pembacaan status berdasarkan akun pada UC03 |
| 10 | C23 `validasiFormatDokumen(berkas: Array)` | Menerima array berkas | Menerima satu objek berkas (`req.file`) | Formulir I-02 dan I-03 hanya memiliki satu slot unggah |
| 11 | C05, C08, C17 (UC06) | Hanya `simpanProdukSurplus()`, tanpa pengelolaan data induk produk | Ditambah `getSemuaProduk()`, `getProdukById()`, `tambahProduk()`, dan `updateProduk()` pada `models/ProdukSurplus.js`, beserta route `/surplus/produk/tambah` dan `/surplus/produk/:id/edit` | Formulir I-08 membutuhkan daftar produk yang bisa dipilih dan dikelola pemilik; tanpa operasi ini pemilik tidak dapat menambah produk baru |
| 12 | C07, C25, C16 (UC05) | `simpanPrediksi()` dan `getHasilPrediksi()` | Ditambah `cekKecukupanData()`, `jalankanPrediksi()`, serta perhitungan rekomendasi `rataTerjual + 0,5 × rataTersisa` dari 7 hari data | Menentukan syarat minimal data (7 hari berbeda), menyimpan hasil prediksi, dan menampilkan dashboard beserta grafik 7 hari |
| 13 | C09 (UC07) | Metode distribusi disimpan per `idDistribusi` | `simpanMetode(idProduk, jenisDistribusi, harga)` menyimpan metode per produk dengan `INSERT ... ON CONFLICT` | Satu produk hanya memiliki satu metode distribusi aktif, sehingga pendekatan *upsert* lebih sederhana dan mencegah data ganda |
| 14 | C27 dan C34 (UC09) | C34 `PenyaringanController` berdiri sendiri | C34 tidak dibuat sebagai kelas terpisah; fungsi `saringKataKunci()`, `saringJenis()`, `saringJarak()`, dan `saringWaktu()` berada di `controllers/SurplusController.js` dan menerima parameter query `q`, `jenis`, `jarak`, `waktu` | Penyaringan dan pengambilan daftar selalu dipakai bersama pada satu halaman (I-12); memisahkannya menjadi dua kelas hanya menambah lapisan tanpa manfaat |
| 15 | C28 dan C10 (UC10/UC11) | `setujuiKlaim()` dan `catatKlaim()` saja | Ditambah `cekKetersediaan()`, `kunciProduk()`, `ambilDetailPengambilan()`, `konfirmasiPengambilan()`, serta `getDaftarKlaim()` pada `models/DokumenKlaim.js` | Halaman N6/N7 membutuhkan daftar klaim milik NGO dan alur konfirmasi pengambilan; klaim disetujui dalam satu transaksi agar surplus terkunci |
| 16 | C21 PengambilanPage | Popup konfirmasi dengan `tampilkanPopupKonfirmasi()`, `pilihYes()`, `pilihNo()` | Diwujudkan sebagai halaman detail pengambilan (`views/ngo/N7-KlaimSaya.ejs`, partial `N5-KonfirmasiKlaim.ejs`) dan `POST /ngo/klaim/:idKlaim/konfirmasi-pengambilan`, lalu halaman hasil `N7-PengambilanSelesai.ejs` | Aplikasi dirender di server (EJS) tanpa kerangka JavaScript; popup diganti halaman konfirmasi agar tetap dapat diakses dan diuji tanpa JavaScript |
| 17 | C11 dan tabel `log_aktivitas` | Kolom `idLog`, `aktivitas`, `waktu`; operasi `getDaftarLog()`, `cariLog()` | Ditambah kolom `id_akun` (FK ke `akun_pengguna`) serta operasi `catatLog()` dan `adaLog()`; daftar dibatasi 100 baris terbaru dan diambil lewat CTE sebelum JOIN | I-23 meminta kolom "nama pengguna", sehingga log harus terhubung ke akun. Pembatasan 100 baris dan CTE adalah hasil profiling (B.2.1) |
| 18 | C22 LogAktivitasPage | Atribut state `daftarLogTampil` dan filter di sisi halaman | Filter diwujudkan sebagai tautan query `?kategori=Semua|Klaim|Surplus|Verifikasi`; server mengirim daftar yang sudah tersaring | Halaman dirender server; state di URL membuat hasil filter dapat dibagikan dan diuji langsung lewat HTTP |
| 19 | C29 LogController | `tampilkanLog()` dan `saringLog()` | Ditambah validasi kriteria; nilai di luar empat pilihan mengembalikan status HTTP 400 | DPPL belum mengatur perilaku untuk kriteria tidak dikenal; status 400 menjaga API tetap eksplisit |
| 20 | Realisasi UC12 | Tidak ada pencatatan log otomatis | Log ditulis otomatis oleh aksi UC01, UC02, UC04, UC06, UC07, UC10, dan UC11 | Acceptance criteria UC12 membutuhkan riwayat aktivitas pengguna; tanpa penulisan otomatis halaman I-23 tidak akan terisi |
| 21 | C33 GeolocationAdapter | `hitungJarak()` | Ditambah `ambilKoordinat()` dengan dukungan format "lat,lng", geocoding Nominatim (batas 4 detik) dan cache, lalu jarak dihitung dengan formula Haversine | Lokasi pemilik/NGO berupa alamat teks, bukan koordinat; jarak harus tetap dapat ditampilkan dan diurutkan |
| 22 | Data uji dan akun demo | Tidak dirancang pada DPPL | Skrip `db:seed`, `db:seed:admin`, `db:seed:surplus` membuat akun dan data fiktif untuk tiga peran | Memudahkan asisten mencoba setiap peran dan memenuhi ketentuan A.3 (data uji fiktif, tanpa kredensial asli) |

## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | [Daftar branch](https://github.com/Edbertf/IF2150-RPL-K03-G08/branches) | Satu branch per pekerjaan dengan format `<tipe>/<nama-fitur>`: `feat/UC01-Registrasi` … `feat/UC12-Mengecek-Log-Aktivitas-Pengguna`, `fix/ui-pemilik`, `fix/akses-status-pendaftaran`. Setiap branch digabungkan ke `develop` melalui Pull Request; `main` disiapkan untuk sinkronisasi dengan repositori asisten dan pembuatan tag rilis |
| Semantic commit | [Riwayat commit `develop`](https://github.com/Edbertf/IF2150-RPL-K03-G08/commits/develop) | Format `tipe(scope): deskripsi`, misalnya `feat(UC01)`, `feat(model)`, `feat(akses)`, `fix(app)`, `fix(ui)`, `test(akses)`, `chore(deps)`, `refactor(config)`, dan `docs`. Setiap commit dibatasi pada satu tujuan |
| Track tasks | [Daftar issue](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues?q=is%3Aissue) | Setiap use case memiliki issue dengan acceptance criteria: [#1 UC01](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/1), [#2 UC02](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/2), [#3 UC03](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/3), [#6 UC12](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/6), [#11 UC09](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/11). Pekerjaan penunjang juga dibuatkan issue: [#13 autentikasi](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/13), [#23 perbaikan UI](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/23), [#24 pembatasan akses](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/24). Issue diberi label `priority`/`status` dan ditutup melalui `Closes #<nomor>` pada Pull Request |
| Pull request dan review | [PR #12 UC01](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/12), [PR #20 UC02](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/20), [PR #21 UC03](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/21), [PR #27 UC11](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/27), [PR #28 UC08](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/28), [PR #29 UC09](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/29), [PR #30 UC06](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/30), [PR #31 UC07](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/31), [PR #17 UC12](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/17), [PR #25 perbaikan UI](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/25), [PR #26 pembatasan akses](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/26) | Setiap PR memuat ringkasan, daftar perubahan, langkah pengujian, tangkapan layar, dan hasil `npm test`. PR direview minimal satu anggota lain; catatan reviewer ditindaklanjuti, antara lain `idNgo` pada sesi, `SESSION_SECRET` di `.env.example`, dan pembatasan akses berdasarkan status pendaftaran. Seluruh PR di atas berstatus *merged* |
| Pengujian | [Folder `src/tests/`](https://github.com/Edbertf/IF2150-RPL-K03-G08/tree/develop/src/tests) | Delapan berkas tes dengan total **78 tes**, dijalankan melalui `npm test` (`node --test`). Rincian: `validasi.test.js` (20), `registrasi.test.js` (5), `verifikasi.test.js` (8), `akses.test.js` (6), `status.test.js` (5), `informasiSurplus.test.js` (14), `log.test.js` (13), dan `integrasi-log.test.js` (7). Tes integrasi memakai `DB_PATH` dan `STORAGE_DIR` sementara sehingga tidak menyentuh data pengembangan. Selain itu tersedia `tools/uji-manual-uc11.js` (uji manual dengan *rollback*) dan `tools/profil-log.js` (profiling) |
| Keamanan repositori | [`.env.example`](https://github.com/Edbertf/IF2150-RPL-K03-G08/blob/develop/src/.env.example), `.gitignore` | `.env` diabaikan, `.env.example` hanya berisi nama variabel (`SESSION_SECRET`, `PORT`, `DB_PATH`, `STORAGE_DIR`), dan seluruh data seed bersifat fiktif (akun `@foodlink.test` dengan kata sandi demo). Tidak ada kredensial asli pada repositori |

### B.2.1 Profiling dan Optimasi

| Informasi | Keterangan |
| :--- | :--- |
| Fitur / proses yang diprofil | UC12 — daftar dan filter log aktivitas pada I-23 (`GET /admin/log`), termasuk pemeriksaan keberadaan log untuk membedakan "belum ada log" dan "filter tidak cocok" |
| Alat | `EXPLAIN QUERY PLAN` SQLite melalui `better-sqlite3`, serta skrip pengukuran waktu `src/tools/profil-log.js` (`npm run profil:log`). Skrip mengisi database sementara dengan 20.000 log, lalu mengukur 30 iterasi (3 pemanasan) dan mencetak rencana eksekusi |
| Temuan (sebelum) | Dengan 20.000 baris, query daftar lama memuat **20.000 baris** (median **12,229 ms**). Menambahkan `LIMIT 100` tidak menolong: median tetap **12,066 ms** karena rencana eksekusi menunjukkan `USE TEMP B-TREE FOR ORDER BY`, yaitu SQLite menyortir seluruh tabel lebih dulu. Index `idx_log_waktu` juga tidak dipakai selama JOIN ikut diurutkan. Pemeriksaan keberadaan log dengan memuat 100 baris memakan **0,147 ms** per permintaan filter |
| Perbaikan | 1) Baris dibatasi lebih dulu melalui `WITH terbaru AS MATERIALIZED (SELECT id_log ... ORDER BY waktu DESC LIMIT 100)`, baru di-JOIN ke tabel akun/profil. 2) Pemeriksaan keberadaan diganti `SELECT 1 FROM log_aktivitas LIMIT 1` (`LogAktivitas.adaLog()`), sehingga controller tidak lagi memuat 100 baris hanya untuk mengecek apakah tabel kosong. 3) Daftar di UI tetap dibatasi 100 baris. Index komposit `(waktu DESC, id_log DESC)` sempat diuji, tetapi tidak memberi perbedaan (0,101 ms vs 0,098 ms), sehingga index lama dipertahankan |
| Hasil (sesudah) | Daftar 100 log: **0,176 ms** (median) untuk 100 baris — sekitar **69× lebih cepat** dibanding query lama dengan `LIMIT`. Filter `Klaim`: **0,253 ms**. Pemeriksaan keberadaan: **0,038 ms** (sekitar 4× lebih cepat). Rencana eksekusi berubah menjadi `SCAN log_aktivitas USING COVERING INDEX idx_log_waktu` |

Ringkasan pengukuran (20.000 log, mesin pengembangan):

| Skenario | Baris | Median | Rata-rata | Min | Maks |
| :--- | ---: | ---: | ---: | ---: | ---: |
| Query lama tanpa `LIMIT` | 20.000 | 12,229 ms | 14,310 ms | 11,352 ms | 28,129 ms |
| Query lama + `LIMIT 100` | 100 | 12,066 ms | 12,497 ms | 11,584 ms | 14,987 ms |
| CTE + `LIMIT 100` (sekarang) | 100 | **0,176 ms** | 0,196 ms | 0,136 ms | 0,424 ms |
| Filter "Klaim" (CTE) | 100 | 0,253 ms | 0,254 ms | 0,228 ms | 0,333 ms |
| Cek keberadaan via 100 baris | 100 | 0,147 ms | 0,158 ms | 0,136 ms | 0,268 ms |
| Cek keberadaan via `SELECT 1` (sekarang) | 1 | **0,038 ms** | 0,040 ms | 0,032 ms | 0,071 ms |

Cuplikan `EXPLAIN QUERY PLAN`:

```
-- query lama + LIMIT 100
SCAN log
SEARCH akun USING INTEGER PRIMARY KEY (rowid=?)
SCAN pemilik LEFT-JOIN
SCAN ngo LEFT-JOIN
USE TEMP B-TREE FOR ORDER BY

-- CTE + LIMIT 100
MATERIALIZE terbaru
SCAN log_aktivitas USING COVERING INDEX idx_log_waktu
SCAN terbaru
SEARCH log USING INTEGER PRIMARY KEY (rowid=?)
SEARCH akun USING INTEGER PRIMARY KEY (rowid=?)
SCAN pemilik LEFT-JOIN
SCAN ngo LEFT-JOIN
USE TEMP B-TREE FOR ORDER BY   -- hanya 100 baris
```

Catatan hasil: filter memakai `LIKE '%kata%'`. Pola dengan *wildcard* di awal tidak dapat memakai index, sehingga filter tetap memindai index sampai 100 kecocokan ditemukan. Dengan batas 100 baris dampaknya kecil (0,253 ms); jika volume log tumbuh jauh lebih besar, alternatif berikutnya adalah tabel FTS5.

## B.3 Kendala dan Catatan Penting

1. **Build `better-sqlite3` di Windows.** Instalasi gagal (`gyp ERR! Could not find any Visual Studio`) bila Visual Studio Build Tools belum terpasang. Solusi sudah dicatat pada `src/README.md` bagian prasyarat.
2. **Tanggal UTC vs WIB.** `CURRENT_DATE`/`CURRENT_TIMESTAMP` SQLite memakai UTC. Tanggal pendaftaran dan waktu log dihitung di aplikasi dengan zona `Asia/Jakarta` agar tidak bergeser sehari pada pukul 00.00–06.59 WIB.
3. **Merge bertahap dan *squash merge*.** UC05 dan UC11 baru masuk ke `develop` setelah UC12. Akibatnya penulisan log untuk UC11 harus ditambahkan pasca-merge, dan branch UC12 perlu beberapa kali menyinkronkan `develop`. Konflik berulang muncul pada `KlaimController`, `README.md`, dan `seed.js`.
4. **Berkas uji manual yang terbaca `node --test`.** `test-controller-uc11.js` semula berada di akar `src/`, sehingga otomatis dijalankan `npm test` dan bergantung pada database pengembangan (gagal bila tidak ada klaim berstatus `terklaim`). Berkas dipindahkan ke `tools/uji-manual-uc11.js` agar `npm test` tetap mandiri dan deterministik.
5. **Filter log memakai pencarian teks.** Sesuai Q-C11-02, penyaringan memakai `LIKE '%kriteria%'`; index tidak dapat dipakai untuk *wildcard* di awal. Dampaknya dibatasi dengan 100 baris terbaru.
6. **Seed bertahap.** `db:seed` sudah membuat akun demo F&B, Admin Sistem, dan NGO; `db:seed:admin` hanya memverifikasi akun demo, sedangkan `db:seed:surplus` menerima pendaftaran NGO dan menambahkan surplus. Seed dilewati bila data sudah ada; untuk mengulang, hapus `database/foodlink.db*` lalu jalankan seed berurutan.
7. **`SQLITE_BUSY`.** Server dan proses seed/uji yang membuka database yang sama secara bersamaan dapat memicu `SQLITE_BUSY`. Hentikan server sebelum menjalankan seed atau `npm test`.
8. **Geocoding membutuhkan jaringan.** `GeolocationAdapter` memakai Nominatim (batas 4 detik, hasil di-cache). Jika alamat gagal di-geocode, produk tetap tampil tanpa jarak dan diurutkan di akhir; filter jarak akan mengeluarkannya.
9. **Prediksi membutuhkan 7 hari berbeda.** Sesuai UC05, dashboard menampilkan pesan data belum cukup bila riwayat kurang dari 7 hari. Seed kini menyediakan 7 hari agar dashboard demo langsung berfungsi.
10. **Otomasi GitHub terbatas.** Lingkungan pengembangan tidak memiliki `gh` CLI maupun `GITHUB_TOKEN`, sehingga status checkbox pada issue #6 (UC12) diperbarui manual melalui web GitHub, bukan dari skrip.
11. **Akun demo.** Pemilik: `demo@foodlink.test` / `password123` (jalankan `db:seed` lalu `db:seed:admin`); Admin: `admin@foodlink.test` / `admin123`; NGO: `ngo@foodlink.test` / `password123` (jalankan `db:seed` lalu `db:seed:surplus`). Urutan ini perlu diikuti agar halaman peran dapat diakses.
12. **Kontribusi atas nama Yuhan Fanzuri Nizar.** Roster tugas mencantumkan NIM 13524123, tetapi hingga laporan ini tidak ditemukan commit kode atas nama tersebut pada branch `develop`; kontribusi yang tercatat berupa dokumentasi DPPL (commit `e936153`). Mohon dikonfirmasi bila ada yang terlewat.

## B.4 Kontribusi Anggota

Tabel B.4. Kontribusi Anggota

| NIM | Nama | Modul / Fitur yang Dikerjakan | Persentase Kontribusi |
| :--- | :--- | :--- | :--- |
| *13525114* | *Ernest Clarence Gunawan* | UC01 Registrasi Akun, UC02 Verifikasi Pendaftaran, UC03 Status Pendaftaran; login, manajemen sesi, middleware peran; pemisahan skema SQL | 26% |
| *13525036* | *Dylan Frederico Ketaren* | UC08 Informasi Produk Surplus, UC12 Log Aktivitas Pengguna; profil & optimasi query log; README, laporan implementasi, integrasi lintas UC | 23% |
| *13525111* | *Edbert Fernando* | UC04 Penjualan Harian, UC05 Prediksi Produksi, UC09 Penyaringan Produk Surplus | 21% |
| *13525117* | *Abdur Rauuf Fawaaz* | UC10 Klaim Produk Surplus, UC11 Konfirmasi Pengambilan Produk Surplus | 17% |
| *13525024* | *Excell Timothy Josua Tarigan* | UC06 Catat Produk Surplus, UC07 Atur Distribusi Surplus | 13% |
| *13524123* | *Yuhan Fanzuri Nizar* | Dokumentasi DPPL (bagian 3.11–3.12, commit `e936153`) | — (lihat B.3 butir 12) |

Persentase dihitung dari proporsi commit kode pada branch `develop` (Dylan 80, Edbert 71, Ernest 65, Rauuf 52, Excell 43) dan dibulatkan. Pembagian modul mengikuti *assignee* issue GitHub masing-masing use case. Pada `main` sebelumnya, Abdur Rauuf Fawaaz juga mencantumkan kontribusi per use case (UC10 90%, UC11 100%); tabel di atas menggabungkan kedua UC tersebut ke dalam satu baris rekap.

## B.5 Traceability Kelas Perancangan ke Implementasi

Tabel B.5. Traceability Kelas Perancangan ke Implementasi

| ID Kelas | Nama Kelas Perancangan | Bentuk Implementasi | Lokasi (File dan Nama) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| C01 | AkunPengguna | Model (modul fungsi) | `src/models/AkunPengguna.js` — `registrasi()`, `cariBerdasarkanEmail()`, `cariKredensial()` | Atribut menjadi kolom tabel `akun_pengguna`; penambahan operasi pencarian dicatat pada B.1 no. 9 |
| C02 | Pendaftaran | Model (modul fungsi) | `src/models/Pendaftaran.js` — `ajukanPendaftaran()`, `getStatus()`, `getDaftarMenungguVerifikasi()`, `getDetailPendaftar()`, `updateStatus()`, `cariBerdasarkanAkun()` | Tabel `pendaftaran`; `tanggalDaftar` diisi dari tanggal Jakarta |
| C03 | DokumenPendukung | Model (modul fungsi) | `src/models/DokumenPendukung.js` — `unggahDokumen()`, `getDokumen()`, `ambilPathBerkas()` | Berkas disimpan di `STORAGE_DIR`, metadata di tabel `dokumen_pendukung` |
| C04 | VerifikasiController | Controller + route | `src/controllers/VerifikasiController.js`; `src/routes/admin.js` (`GET/POST /admin/verifikasi/...`) | Tiga operasi DPPL + `tampilkanHasilVerifikasi()` dan `sajikanDokumen()` |
| C05 | Produk | Model (modul fungsi) | `src/models/Produk.js` — `getProduk()`, `getDetailProduk()` | Tabel `produk`; operasi `tambahProduk()`/`updateProduk()` berada di `models/ProdukSurplus.js` (B.1 no. 11) |
| C06 | DataPenjualan | Model (modul fungsi) | `src/models/DataPenjualan.js` — `catatPenjualan()`, `getDataHistoris()`, `getPenjualanHarian()`, `hitungHariTerkumpul()` | Tabel `data_penjualan`; satu baris per produk per tanggal |
| C07 | PrediksiProduksi | Model (modul fungsi) | `src/models/PrediksiProduksi.js` — `simpanPrediksi()`, `getHasilPrediksi()`, `hitungRekomendasi()` | Tabel `prediksi_produksi`; rekomendasi = rata-terjual + 0,5 × rata-tersisa |
| C08 | ProdukSurplus | Model (modul fungsi) | `src/models/ProdukSurplus.js` — `simpanProdukSurplus()`, `setStatus()`, `getDetailSurplus()`, `getProdukSurplusTersedia()`, `getStatus()` | Tabel `produk_surplus`; status `tersedia` → `terklaim` → `selesai` |
| C09 | MetodeDistribusiSurplus | Model (modul fungsi) | `src/models/MetodeDistribusiSurplus.js` — `simpanMetode()`, `getInfoDistribusi()`, `getJenisDistribusi()` | Tabel `metode_distribusi_surplus`; `getHarga()` dibaca melalui `getInfoDistribusi()` |
| C10 | DokumenKlaim | Model (modul fungsi) | `src/models/DokumenKlaim.js` — `catatKlaim()`, `getDetailKlaim()`, `getDaftarKlaim()` | Tabel `dokumen_klaim`; `waktuKlaim`/`statusKlaim` menjadi kolom |
| C11 | LogAktivitas | Model (modul fungsi) | `src/models/LogAktivitas.js` — `catatLog()`, `getDaftarLog()`, `cariLog()`, `adaLog()` | Tabel `log_aktivitas` + `idx_log_waktu`; `getDaftarLog()`/`cariLog()` dibatasi 100 baris |
| C12 | RegistrasiPage | View EJS + route | `src/views/auth/I02-I03-Registrasi.ejs`; `src/routes/auth.js` (`GET/POST /daftar`) | Operasi halaman menjadi tautan, form HTML, dan render pesan berhasil/galat |
| C13 | VerifikasiPage | View EJS + route | `src/views/admin/I19-VerifikasiPendaftar.ejs`, `I20-DetailPendaftar.ejs`, `I21-I22-HasilVerifikasi.ejs`; `src/routes/admin.js` | `pilihPendaftar()` menjadi tautan detail; `kirimKeputusan()` menjadi form POST |
| C14 | StatusPendaftaranPage | View EJS + route | `src/views/auth/I04-StatusPendaftaran.ejs`; `src/routes/status.js` (`GET /status`) | Satu view menangani empat keadaan (B.1 no. 7) |
| C15 | PenjualanPage | View EJS + route | `src/views/fnb/I06-PenjualanHarian.ejs`, `I07-PenjualanTersimpan.ejs`; `src/routes/fnb.js` | Form input per produk; halaman konfirmasi setelah simpan |
| C16 | PrediksiPage | View EJS + controller | `src/views/fnb/I05-DashboardF&B.ejs`; `PrediksiController.tampilkanDashboard()` | Grafik 7 hari dirender sebagai elemen HTML/CSS dari data server |
| C17 | ProdukSurplusPage | View EJS + controller | `src/views/surplus/I08-CatatSurplus.ejs`; `src/controllers/CatatSurplusController.js` | Form surplus sekaligus pengelolaan produk (tambah/ubah) |
| C18 | DistribusiSurplusPage | View EJS + controller | `src/views/surplus/I09-AturDistribusi.ejs`, `I11-SuksesPublikasi.ejs`; `src/controllers/DistribusiSurplusController.js` | Opsi donasi/diskon; kolom harga muncul untuk diskon |
| C19 | DaftarSurplusPage | View EJS + controller | `src/views/ngo/I12-DaftarSurplus.ejs`; `SurplusController.tampilkanDaftarSurplus()` | Atribut `lokasiPengguna`, `daftarSurplus`, `kataKunci`, `kriteriaFilter` menjadi data render dan parameter query |
| C20 | KlaimPage | View EJS + route | `src/views/ngo/I15-DetailProduk.ejs`, `N6-KlaimBerhasil.ejs`; `src/routes/ngo.js` (`POST /ngo/surplus/:idSurplus/klaim`) | `idSurplusTerpilih` menjadi parameter URL; `pesanError` menjadi data view |
| C21 | PengambilanPage | View EJS + route | `src/views/ngo/N7-KlaimSaya.ejs`, `N7-PengambilanSelesai.ejs`, `partials/N5-KonfirmasiKlaim.ejs`; `src/routes/ngo.js` | Popup diganti halaman konfirmasi (B.1 no. 16) |
| C22 | LogAktivitasPage | View EJS | `src/views/admin/I23-LogAktivitas.ejs` | Empat chip filter, tabel log, dan dua pesan keadaan kosong; state filter ada di URL |
| C23 | AuthController | Controller | `src/controllers/AuthController.js` — `registrasiAkun()`, `validasiKelengkapanData()`, `validasiFormatDokumen()`, `cekStatusPendaftaran()`, ditambah `masuk()`/`keluar()` | `validasiKelengkapanData()` mengembalikan daftar error; `validasiFormatDokumen()` menerima satu berkas |
| C24 | PenjualanController | Controller | `src/controllers/PenjualanController.js` — `validasiInputPenjualan()`, `simpanDataPenjualan()`, `tampilkanFormPenjualan()`, `kirimDataPenjualan()` | Validasi angka dan tanggal sebelum menyimpan |
| C25 | PrediksiController | Controller | `src/controllers/PrediksiController.js` — `cekKecukupanData()`, `jalankanPrediksi()`, `tampilkanDashboard()` | Menjalankan prediksi saat dashboard dibuka; error ditampilkan sebagai pesan |
| C26 | ProdukSurplusController | Dua controller | `src/controllers/CatatSurplusController.js` (`tampilFormCatat()`, `simpanDataSurplus()`, `simpanProdukBaru()`, `simpanEditProduk()`) dan `src/controllers/DistribusiSurplusController.js` (`tampilFormDistribusi()`, `simpanDistribusi()`, `tampilSukses()`) | Kelas dipecah menjadi dua controller sesuai dua halaman (I-08 dan I-09); alasannya pada B.1 no. 11–13 |
| C27 | SurplusController | Controller | `src/controllers/SurplusController.js` — `ambilDaftarSurplus()`, `ambilDetailSurplus()`, `urutkanBerdasarkanJarak()` | Sekaligus menampung fungsi penyaringan (lihat C34) |
| C28 | KlaimController | Controller | `src/controllers/KlaimController.js` — `setujuiKlaim()`, `tolakKlaim()`, `cekKetersediaan()`, `kunciProduk()`, `ambilDetailPengambilan()`, `konfirmasiPengambilan()` | Persetujuan klaim mengunci surplus dalam transaksi database |
| C29 | LogController | Controller + route | `src/controllers/LogController.js` — `tampilkanLog()`, `saringLog()`; `src/routes/log.js`; dipasang di `src/app.js` (`/admin/log`) | Kriteria tidak valid → status 400; route dijaga `butuhPeran('admin_sistem')` |
| C30 | PemilikFnB | Model (modul fungsi) | `src/models/PemilikFnB.js` — `simpanProfil()`, `getLokasiUsaha()`, `getNamaUsaha()`, `getDataUsaha()`, `cariBerdasarkanAkun()` | Operasi `catatProdukSurplus()`, `aturDistribusiSurplus()`, `resetFormulir()` diwujudkan sebagai aksi pada controller I-08/I-09, bukan pada model profil |
| C31 | PerwakilanNGO | Model (modul fungsi) | `src/models/PerwakilanNGO.js` — `simpanProfil()`, `cariBerdasarkanAkun()`, `getDataNgo()` | `lihatDaftarSurplus()` dan `ajukanKlaim()` diwujudkan oleh `SurplusController` dan `KlaimController` |
| C32 | AdminSistem | Middleware guard | `src/middleware/peran.js` — `butuhPeran('admin_sistem')`, dipakai di `src/routes/admin.js` dan `src/routes/log.js` | Tidak ada kelas terpisah; alasan pada B.1 no. 6 |
| C33 | GeolocationAdapter | Adapter (modul fungsi) | `src/models/GeolocationAdapter.js` — `ambilKoordinat()`, `hitungJarak()` | Koordinat dari format teks atau Nominatim; jarak Haversine dalam km dengan 2 desimal |
| C34 | PenyaringanController | Fungsi dalam controller | `src/controllers/SurplusController.js` — `saringKataKunci()`, `saringJenis()`, `saringJarak()`, `saringWaktu()`, `validasiKriteria` (implisit pada penanganan parameter) | Digabung ke C27; alasan pada B.1 no. 14 |

Catatan:
- Seluruh kelas perancangan C01–C34 pada Tabel 4.1 DPPL dapat ditelusuri ke kode. Kelas yang dipecah atau digabung (C26, C32, C34) beserta alasannya tercatat pada Tabel B.1.
- Tabel basis data dan kolomnya didefinisikan di `src/database/schema/` (12 berkas SQL); daftar tabel beserta atributnya juga tersedia pada `src/README.md` bagian 12.
