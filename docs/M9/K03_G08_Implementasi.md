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

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini adalah **spesifikasi sekaligus template laporan singkat** Tugas 9. Bagian **Ketentuan Implementasi** (Bagian A) adalah aturan yang harus kalian ikuti, boleh dihapus dari laporan akhir. Bagian **Laporan Implementasi** (Bagian B) adalah yang **wajib kalian isi**. Gunakan nama, ID, kebutuhan, use case, dan kelas yang konsisten dengan SKPL, APL, dan DPPL.

---

**Deadline:** Rabu, 11 November 2026, 21.50 WIB
**Asistensi akbar:** *[Hari, DD Bulan YYYY, HH.MM WIB, lokasi/link]*

---

# BAGIAN A: Ketentuan Implementasi

## A.1 Deskripsi Tugas

Pada tugas ini, kalian mengimplementasikan perangkat lunak yang telah dirancang pada tugas-tugas sebelumnya (SKPL, APL, DPPL) menjadi aplikasi yang **dapat dijalankan**. Platform bebas (web, desktop, atau mobile) selama aplikasi dapat dijalankan ulang oleh asisten mengikuti petunjuk kalian.

Ketentuan umum:
- Setiap anggota bertanggung jawab atas **minimal satu fitur atau modul** dan harus terlihat jelas di riwayat commit/PR.
- Implementasi harus **mengacu pada DPPL**. Jika ada yang berubah (kelas, layar, basis data, dsb.), catat di Bagian B.1. Perubahan itu wajar, tetapi harus tercatat dan beralasan.
- Implementasi **tidak harus berupa kelas** (misalnya fungsi, komponen, *route/handler*, *stored procedure*, atau skrip). Namun, setiap kelas perancangan pada DPPL **wajib dapat ditelusuri** ke implementasinya, dan penelusuran ini dicatat di Bagian B.5.
- Seluruh use case pada SKPL **diprioritaskan** untuk diimplementasikan. Status tiap use case akan dilaporkan pada HIUPL (Tugas 10).
- Seluruh mahasiswa **wajib** mengikuti asistensi akbar.

## A.2 Platform, Bahasa, dan Teknologi

Kalian **bebas** memilih bahasa, framework, library, dan basis data, dengan syarat:

1. **Dapat dijalankan ulang** oleh asisten pada mesin biasa dengan mengikuti README. Versi bahasa/runtime dan seluruh dependensi harus tertulis jelas.
2. **Dependensi dikelola lewat file standar**, misalnya `package.json` + lockfile, `requirements.txt`/`pyproject.toml`, `pom.xml`/`build.gradle`, `composer.json`, `pubspec.yaml`, dan sejenisnya. Jangan meng-commit folder hasil instalasi (`node_modules/`, `venv/`, `build/`, dll.).
3. **Jika memakai layanan eksternal** (basis data cloud, API pihak ketiga, auth, dll.), sediakan cara menjalankan tanpa akun pribadi kalian, atau sediakan data/akun uji pada README. Basis data **sangat disarankan** dapat dijalankan lokal (SQLite, atau Docker Compose untuk PostgreSQL/MySQL/MongoDB).
4. **Arsitektur sesuai DPPL.** Pola arsitektur yang kalian pilih di APL/DPPL (MVC, layered, client-server, dll.) harus terlihat pada struktur kode.

Ketentuan tambahan per platform:

| Platform | Ketentuan |
| :--- | :--- |
| **Web** | Berjalan lokal lewat satu-dua perintah yang terdokumentasi. Boleh juga di-*deploy*; jika ya, cantumkan URL, tetapi **tetap wajib bisa dijalankan lokal** (URL deploy bisa mati). |
| **Desktop** | Berjalan dari source lewat perintah yang terdokumentasi. Build/installer opsional. |
| **Mobile** | Berjalan di emulator/simulator atau perangkat. Sertakan langkah menjalankan, dan **sangat disarankan** melampirkan APK/build di Release. |

## A.3 Keamanan Repository

Repo fork kelompok bersifat **public**, sehingga:

- **Dilarang** meng-commit password, API key, token, `.env` asli, sertifikat/private key, atau data pribadi. Hal ini dapat mengurangi nilai.
- Sediakan `.env.example` berisi nama variabel tanpa nilai rahasia, dan masukkan `.env` ke `.gitignore`.
- Jika sudah terlanjur ter-commit, **cabut/ganti** kredensial tersebut. Menghapus commit saja tidak cukup.
- Data uji/seed harus berupa data fiktif.

## A.4 Struktur Folder

Seluruh kode ditempatkan di `src/` pada repo fork. Jangan mengubah folder milestone lama.

```
src/                              # SELURUH kode implementasi
	README.md                     # dokumentasi utama aplikasi (lihat A.5)
	.env.example                  # jika memakai environment variable
	<struktur kode kalian>        # bebas, mengikuti pola arsitektur DPPL
	tests/                        # test case (jika ada)
docs/
	M9/
		KXX_GYY_Implementasi.md   # laporan ini (Bagian B)
		KXX_GYY_Form-Asistensi.md
```

Catatan:
- `README.md` aplikasi diletakkan di **`src/README.md`**, bukan di root repo.
- Jika kerangka kerja kalian mewajibkan struktur tertentu (misalnya Maven `src/main/java`, Flutter `lib/`, monorepo `frontend/` dan `backend/`), letakkan semuanya **di dalam `src/`**.
- Nama file dan folder pada `docs/M9/` mengikuti aturan penamaan milestone sebelumnya (`KXX_GYY_...`).

## A.5 Isi Minimal `src/README.md`

README harus cukup bagi orang yang belum pernah melihat proyek kalian untuk menjalankan aplikasi dari nol. Minimal berisi:

1. **Deskripsi singkat** aplikasi.
2. **Teknologi yang digunakan** beserta versi (bahasa, framework, basis data).
3. **Prasyarat dan instalasi** (software yang harus ada, perintah instalasi dependensi).
4. **Konfigurasi** (environment variable, setup basis data, migrasi/seed) dan langkah demi langkah menjalankannya.
5. **Cara menjalankan aplikasi** (dan cara menjalankan test, jika ada).
6. **Akun/data uji** untuk mencoba tiap peran pengguna (jika ada login).
7. **Daftar modul/fitur yang diimplementasi** beserta pembagian anggota.
8. **Daftar tabel/koleksi basis data** beserta atributnya (atau tautan ke skema/ERD).

## A.6 Best Practices

Kalian dianjurkan menerapkan praktik berikut. Bukti penerapannya dirangkum pada Bagian B.2.

### 1. Branching
Sesuai aturan umum di README repository, `main` fork kelompok dijaga agar tetap bisa menerima sync dari asisten. Pada tugas ini **sangat disarankan** memakai branch per fitur dengan format `<tipe>/<nama-fitur>` (contoh: `feat/login-page`, `fix/null-cart`), lalu digabungkan ke `main` melalui Pull Request. Skema Gitflow penuh (dengan `develop`) boleh dipakai, tetapi tidak diwajibkan.

### 2. Semantic Commit
Gunakan format `<tipe>(<scope>): <deskripsi>`, misalnya `feat(auth): tambah validasi email`.

| Tipe | Kegunaan |
| :--- | :--- |
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `docs` | Mengubah dokumentasi |
| `style` | Perubahan format/spasi, tanpa mengubah logika |
| `refactor` | Perubahan kode yang tidak menambah fitur atau memperbaiki bug |
| `test` | Menambah/memperbaiki pengujian |
| `chore` | Tugas rutin (build, dependensi, konfigurasi) |

### 3. Track Tasks
Gunakan **GitHub Issues** (dan opsional GitHub Projects) untuk membagi tugas dan melacak progres.
- Pecah fitur besar menjadi issue yang lebih kecil dan tetapkan penanggung jawabnya.
- Hubungkan PR dengan issue (`Closes #12`) dan tutup issue ketika selesai.

### 4. Pull Request dan Code Review
- Setiap PR berisi penjelasan deskriptif tentang apa yang dikerjakan, beserta bukti (tangkapan layar/rekaman/hasil test).
- Setiap PR di-*review* minimal **1 anggota lain**, dengan komentar konstruktif atau approval.

### 5. Pengujian dan Optimasi Performa
- Tulis pengujian untuk logika inti (unit test dan/atau pengujian alur utama). Cakupan penuh tidak diwajibkan, tetapi pengujian pada logika utama dinilai.
- Lakukan **profiling** pada setidaknya satu fitur yang berat (query besar, proses pengolahan data, render list panjang, dsb.), lalu catat temuan dan perbaikannya. Contoh alat:

| Platform | Contoh alat |
| :--- | :--- |
| Web (frontend) | Chrome DevTools (Performance/Network), Lighthouse |
| Web (backend) | Profiler bawaan bahasa, `EXPLAIN` pada query basis data, logging waktu respons |
| Python | `cProfile`, `PyInstrument` |
| Java | VisualVM, JProfiler |
| Mobile | Android Studio Profiler, Flutter DevTools, Xcode Instruments |

### 6. Penggunaan AI
Penggunaan AI **tetap harus dicatat** pada `docs/KXX_GYY_AI-Usage.md` sesuai ketentuan yang sudah berlaku.

## A.7 Pengumpulan

Pengumpulan dinilai dari **tag release**, bukan commit terakhir.

1. Pastikan seluruh pekerjaan sudah di-*commit* dan di-*push* ke `main` fork kelompok.
2. Buat release dengan tag **`v9.0`** (revisi berikutnya `v9.1`, `v9.2`, dst.) dengan target branch `main`.
3. Yang dinilai adalah **tag terakhir yang dibuat sebelum deadline**.

## A.8 Aturan Tanya Jawab

Agar semua kelompok mendapat jawaban yang sama, pertanyaan dibagi menjadi dua jalur:

| Jenis Pertanyaan | Jalur |
| :--- | :--- |
| **Ketentuan tugas**, misalnya teknologi yang diperbolehkan, struktur folder, format pengumpulan, dan penilaian | **Sheets QnA:** *[tautan sheets QnA]* |
| **Kendala teknis kelompok sendiri**, misalnya error, setup, dan penggunaan git | Grup kelompok bersama asisten masing-masing |

Ketentuan:
1. Pertanyaan tentang ketentuan tugas **wajib** diajukan melalui Sheets QnA. Periksa terlebih dahulu apakah pertanyaan serupa sudah dijawab.
2. Jika pertanyaan tentang ketentuan tugas tetap diajukan langsung kepada asisten kelompok, asisten **berhak menolak menjawab** dan meminta kelompok memasukkan pertanyaannya ke Sheets QnA.
3. Jika pertanyaan di Sheets QnA **belum dijawab dalam 24 jam**, kelompok boleh menghubungi asisten kelompok masing-masing. Cantumkan pertanyaan yang sudah diajukan di sheets tersebut.
4. Jawaban pada Sheets QnA berlaku untuk **seluruh kelompok** dan menjadi acuan jika terjadi perbedaan pemahaman.

---

# BAGIAN B: Laporan Implementasi

## B.1 Perubahan dari DPPL

Catat semua perbedaan antara perancangan (DPPL) dan implementasi akhir. Jika tidak ada perubahan, tuliskan "Tidak ada perubahan".

Tabel B.1. Perubahan dari DPPL

| No | Bagian DPPL | Rancangan Awal | Implementasi Akhir | Alasan |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *DBMS (Lingkungan Implementasi)* | *PostgreSQL 15* | *SQLite (better-sqlite3)* | *Mempermudah asisten dan anggota tim menjalankan aplikasi tanpa perlu instalasi server database lokal (zero-configuration)* |
| 2 | *operasi C30 & C31* | *Tidak ada operasi penyimpanan profil* | *Menambah operasi simpanProfil() di models/PemilikFnB.js dan models/PerwakilanNGO.js* | *Algo-C23-01 menetapkan "simpan data profil sesuai tipe akun", tetapi operasinya belum didefinisikan di DPPL* |
| 3 | *I-02 & I-03* | *Tidak ada input Jam Operasional dan Nomor Legalitas* | *Ditambahkan pada form F&B dan NGO* | *Diwajibkan Algo-C23-02 serta merupakan atribut C30 (jamOperasional) dan C31 (nomorLegalitas)* |
| 4 | *Realisasi Use Case* | *Tidak ada Use Case (UC) khusus untuk Login/Logout dan manajemen sesi* | *Menambahkan Halaman Login (/masuk), manajemen sesi (express-session), dan Middleware pembatasan akses (Role-Based Access Control)* | *Ditambahkan sebagai penunjang (enabler) yang wajib ada agar UC02 (Verifikasi oleh Admin) dan UC03 (Cek Status oleh Pendaftar) dapat berjalan dengan benar.* |
| 5 | *C04 Verifikasi Controller* | *Memiliki 3 operasi utama (tampilkanDaftarPendaftar, ambilDetailPendaftar, prosesVerifikasi)* | *Ditambah tampilkanHasilVerifikasi() dan sajikanDokumen()* | *Diperlukan untuk merender halaman konfirmasi (I-21/I-22) dan menangani proses penyajian berkas dokumen pendukung ke Admin* |
| 6 | *C32 AdminSistem* | *Kelas dengan operasi verifikasiPendaftaran()* | *Tidak dibuat sebagai kelas terpisah; fungsinya diintegrasikan ke dalam middleware pengecekan peran (guard) dan VerifikasiController* | *Menyederhanakan struktur kode. Kewenangan Admin dinilai lebih efektif jika divalidasi di tingkat pembatasan akses (routing) sebelum proses verifikasi dijalankan* |
| 7 | *I-04* | *Satu keadaan: "Pendaftaran Dikirim" dengan badge "Menunggu Verifikasi"* | *Empat keadaan dalam satu view: menunggu, diterima, ditolak, dan data tidak ditemukan* | *Menampung skenario alternatif UC03 beserta acceptance criteria "jika data pendaftaran tidak ditemukan"* |
| 8 | *Q-C02-01 (`tanggal_daftar`)* | *Diisi `CURRENT_DATE`* | *Dihitung di aplikasi dengan zona `Asia/Jakarta`* | *`CURRENT_DATE` pada SQLite memakai UTC, sehingga pendaftaran pukul 00.00–06.59 WIB tercatat sehari sebelumnya* |
| 9 | *Operasi C01 dan C02* | *C01 hanya `registrasi()`; C02 lima operasi* | *C01 ditambah `cariBerdasarkanEmail()` dan `cariKredensial()`; C02 ditambah `cariBerdasarkanAkun()`* | *Dibutuhkan untuk pemeriksaan email duplikat, verifikasi kata sandi saat masuk, dan pembacaan status berdasarkan akun pada UC03* |
| 10 | *C23 `validasiFormatDokumen(berkas: Array)`* | *Menerima array berkas* | *Menerima satu objek berkas (`req.file`)* | *Formulir I-02 dan I-03 hanya memiliki satu slot unggah* |
| 11 | *UC10 – Proses mengklaim produk surplus* | *Proses klaim mengikuti operasi kelas yang dirancang pada DPPL.* | *Proses klaim direalisasikan melalui route Express yang memanggil `KlaimController` dan model `DokumenKlaim`. Setelah klaim berhasil, pengguna diarahkan ke halaman konfirmasi keberhasilan klaim dengan kode klaim dinamis.* | *Menyesuaikan rancangan kelas dengan implementasi MVC.* |
| 12 | *UC11 – Konfirmasi pengambilan produk surplus* | *NGO melakukan konfirmasi bahwa produk surplus telah diambil.* | *Konfirmasi direalisasikan melalui route dan `KlaimController.konfirmasiPengambilan()` dengan transaksi database. Status `produk_surplus` diubah menjadi `selesai`, sedangkan `dokumen_klaim.status_klaim` tetap `terklaim`.* | *Memisahkan status klaim dan status pengambilan produk.* |
| 13 | *UC11 – Tampilan hasil konfirmasi pengambilan* | *Hasil konfirmasi ditampilkan kepada NGO setelah pengambilan produk.* | *Ditambahkan halaman khusus Pengambilan Selesai (N7) yang ditampilkan setelah konfirmasi berhasil. Daftar klaim juga menampilkan status pengambilan secara dinamis dan menyediakan tautan menuju detail klaim.* | *Memberikan informasi hasil pengambilan dan status klaim secara aktual.* |
| *...* | *...* | *...* | *...* | *...* |

## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | [Daftar branch](https://github.com/Edbertf/IF2150-RPL-K03-G08/branches) | Menerapkan satu branch per pekerjaan dengan format `<tipe>/<nama-fitur>`, misalnya `feat/UC01-Registrasi` sampai `feat/UC12-Mengecek-Log-Aktivitas-Pengguna`, serta `fix/ui-pemilik` dan `fix/akses-status-pendaftaran`. Setiap branch digabungkan ke `develop` melalui Pull Request; `main` hanya menerima hasil akhir untuk pembuatan tag rilis |
| Semantic commit | [Riwayat commit `develop`](https://github.com/Edbertf/IF2150-RPL-K03-G08/commits/develop) | Commit memakai format `tipe(scope): deskripsi`, antara lain `feat(UC01)`, `feat(model)`, `feat(akses)`, `fix(app)`, `fix(ui)`, `test(akses)`, `chore(deps)`, `refactor(config)`, dan `docs`. Setiap commit dibatasi pada satu tujuan agar mudah ditelusuri |
| Track tasks | [Daftar issue](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues?q=is%3Aissue) | Setiap use case memiliki issue tersendiri dengan acceptance criteria, misalnya [#1 UC01](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/1), [#2 UC02](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/2), dan [#3 UC03](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/3). Pekerjaan penunjang juga dibuatkan issue tersendiri, seperti [#13 autentikasi](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/13), [#23 perbaikan UI](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/23), dan [#24 pembatasan akses](https://github.com/Edbertf/IF2150-RPL-K03-G08/issues/24). Issue diberi label `priority` dan `status`, lalu ditutup otomatis melalui `Closes #<nomor>` pada Pull Request |
| Pull request dan review | [PR #12 UC01](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/12), [PR #20 UC02](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/20), [PR #21 UC03](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/21), [PR #25 perbaikan UI](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/25), [PR #26 pembatasan akses](https://github.com/Edbertf/IF2150-RPL-K03-G08/pull/26) | Setiap PR memuat ringkasan, daftar perubahan, langkah pengujian, tangkapan layar, dan hasil `npm test`. PR direview minimal oleh satu anggota lain. Catatan reviewer ditindaklanjuti melalui PR lanjutan, misalnya `idNgo` pada sesi, `SESSION_SECRET` pada `.env.example`, dan pembatasan akses berdasarkan status pendaftaran |
| Pengujian | [Folder `src/tests/`](https://github.com/Edbertf/IF2150-RPL-K03-G08/tree/develop/src/tests) | Terdapat lima berkas tes dengan total **44 tes** dan dijalankan melalui `npm test` (`node --test tests/`). Cakupannya: unit test validasi formulir dan dokumen (`validasi.test.js`), integrasi alur registrasi dengan basis data dan penyimpanan sementara (`registrasi.test.js`), transisi status verifikasi (`verifikasi.test.js`), pembacaan status pendaftaran (`status.test.js`), serta pembatasan akses berdasarkan peran dan status (`akses.test.js`). Tes integrasi memakai `DB_PATH` dan `STORAGE_DIR` sementara sehingga tidak mengganggu data pengembangan |

### B.2.1 Profiling dan Optimasi

Pilih minimal satu fitur yang diprofil.

| Informasi | Keterangan |
| :--- | :--- |
| Fitur / proses yang diprofil | *[Nama fitur]* |
| Alat | *[mis. Chrome DevTools, cProfile, EXPLAIN]* |
| Temuan (sebelum) | *[Bottleneck yang ditemukan, sertakan angka/tangkapan layar]* |
| Perbaikan | *[Yang diubah]* |
| Hasil (sesudah) | *[Perbandingan dengan sebelumnya]* |

Jika tidak ada perbaikan yang perlu dilakukan, jelaskan hasil profiling dan alasan kenapa fitur tersebut sudah memadai.

## B.3 Kendala dan Catatan Penting

Tuliskan kendala yang ditemui, fitur yang belum sempurna (*known issues*), serta hal yang perlu diketahui asisten saat menjalankan atau menilai aplikasi (misalnya akun uji khusus, urutan menjalankan, atau batasan).

## B.4 Kontribusi Anggota

Tabel B.4. Kontribusi Anggota

| NIM | Nama | Modul / Fitur yang Dikerjakan | Persentase Kontribusi |
| :--- | :--- | :--- | :--- |
| *13525117* | *Abdur Rauuf Fawaaz* | *Use Case 10* | *90%* |
| *13525117* | *Abdur Rauuf Fawaaz* | *Use Case 11* | *100%* |
| *...* | *...* | *...* | *...* |

## B.5 Traceability Kelas Perancangan ke Implementasi

Pemetaan dari **setiap kelas perancangan** pada DPPL (Tabel 4.1) ke wujud implementasinya. Bentuk implementasi bebas (kelas, fungsi, komponen, *route/handler*, *stored procedure*, skrip, dsb.), tetapi tiap kelas perancangan harus muncul pada tabel ini. Jika implementasi berupa kelas dengan nama yang sama, tetap dicantumkan.

Tabel B.5. Traceability Kelas Perancangan ke Implementasi

| ID Kelas | Nama Kelas Perancangan | Bentuk Implementasi | Lokasi (File dan Nama) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| *[C01]* | *AkunPengguna* | *Modul model dan middleware autentikasi* | *`src/models/AkunPengguna.js`; `src/middleware/pengguna.js`; `src/middleware/peran.js`* | *Menyediakan identitas pengguna yang sedang login melalui `req.user` dan membatasi akses fitur NGO. Digunakan sebagai pendukung validasi akses pada UC11.* |
| *[C05]* | *Produk* | *Modul model* | *`src/models/Produk.js`* | *Mengambil informasi produk yang terkait dengan produk surplus, seperti nama produk dan kategori. Digunakan pada UC10.* |
| *[C08]* | *ProdukSurplus* | *Modul model* | *`src/models/ProdukSurplus.js`* | *Mengambil detail produk surplus dan memperbarui statusnya, termasuk dari `tersedia` menjadi `terklaim` pada UC10 dan `selesai` pada UC11.* |
| *[C09]* | *MetodeDistribusiSurplus* | *Modul model* | *`src/models/MetodeDistribusiSurplus.js`* | *Mengambil informasi metode distribusi dan harga produk surplus untuk ditampilkan pada detail produk. Digunakan pada UC10.* |
| *[C10]* | *DokumenKlaim* | *Modul model* | *`src/models/DokumenKlaim.js`* | *Mencatat klaim baru serta mengambil detail dan daftar klaim berdasarkan NGO. Digunakan pada UC10 dan UC11.* |
| *[C20]* | *KlaimPage* | *Halaman EJS dan route Express* | *`src/views/ngo/I15-DetailProduk.ejs`; `src/views/ngo/N6-KlaimBerhasil.ejs`; `src/views/ngo/N7-KlaimSaya.ejs`; `src/routes/ngo.js`* | *Menampilkan detail produk, meneruskan pengajuan klaim, menampilkan hasil klaim beserta kode klaim, dan menampilkan daftar klaim NGO. Halaman daftar klaim merupakan tampilan pendukung yang ditambahkan pada implementasi. Digunakan pada UC10.* |
| *[C21]* | *PengambilanPage* | *Halaman EJS, JavaScript sisi klien, dan route Express* | *`src/views/ngo/N6-KlaimBerhasil.ejs`; `src/views/ngo/N7-PengambilanSelesai.ejs`; `src/routes/ngo.js`* | *Menampilkan modal konfirmasi pengambilan, mengirim pilihan konfirmasi ke server, dan menampilkan hasil ketika pengambilan berhasil. Digunakan pada UC11.* |
| *[C27]* | *SurplusController* | *Modul controller* | *`src/controllers/SurplusController.js`; `src/routes/ngo.js`* | *Mengambil daftar dan detail produk surplus, termasuk menggabungkan informasi produk, metode distribusi, dan pemilik usaha untuk ditampilkan pada halaman NGO. Digunakan pada UC10.* |
| *[C28]* | *KlaimController* | *Modul controller* | *`src/controllers/KlaimController.js`; `src/routes/ngo.js`* | *Menangani pemeriksaan ketersediaan produk, proses persetujuan/penolakan klaim, pengambilan detail pengambilan, serta konfirmasi pengambilan. Digunakan pada UC10 dan UC11.* |
| *[C30]* | *PemilikFnB* | *Modul model* | *`src/models/PemilikFnB.js`* | *Mengambil informasi usaha dan lokasi pemilik F&B yang terkait dengan produk surplus untuk ditampilkan pada detail produk dan detail pengambilan. Digunakan pada UC10 dan UC11.* |
| *[C31]* | *PerwakilanNGO* | *Modul model dan data pengguna pada sesi* | *`src/models/PerwakilanNGO.js`; `src/middleware/pengguna.js`; `src/routes/ngo.js`* | *Menyediakan informasi NGO dan identitas NGO yang sedang login untuk proses klaim serta pemeriksaan kepemilikan klaim. Digunakan pada UC10 dan UC11.* |
| *...* | *...* | *...* | *...* | *...* |

Catatan:
- Satu kelas perancangan boleh diwujudkan oleh beberapa file/unit, dan satu file/unit boleh mewujudkan beberapa kelas perancangan. Tuliskan semuanya.
- Kelas perancangan yang **tidak diimplementasikan** atau **digabung/dipecah** tetap dicantumkan, dan alasannya dicatat di Bagian B.1.
