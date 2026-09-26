<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 5
<br>
SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK (SKPL)
</h1>
<br>

## *FoodLink*

### Untuk: *Angel*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *03* |
| Kelompok | *08*  |

| NIM | Nama |
|---|---|
| *13525024* | *Excell Timothy Josua Tarigan* |
| *13525036* | *Dylan Frederico Ketaren* |
| *13525111* | *Edbert Fernando* |
| *13525114* | *Ernest Clarence Gunawan* |
| *13525117* | *Abdur Rauuf Fawaaz* |
---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Merubah diagram per kelas UC02.* |
| *B* |  |
| *C* |  |
| ... |  |

<br>

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Tuliskan dengan ringkas tujuan dokumen SKPL ini dibuat dan siapa saja yang akan menggunakan dokumen ini.

## 1.2 Lingkup Masalah
Tuliskan dengan ringkas nama aplikasi dan deskripsi singkatnya. Bagian ini maksimal berisi satu paragraf, dapat diringkas dari BAB 1 *Analisis Permasalahan* pada dokumen *Topic Brainstorming*.

## 1.3 Definisi, Istilah, dan Singkatan
Semua definisi dan singkatan yang digunakan dalam dokumen ini beserta penjelasannya.

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| *P/L* | *Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu.* |
| *SKPL* | *Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya.* |
| *KF* | *Singkatan dari Kebutuhan Fungsional.* |
| *KNF* | *Singkatan dari Kebutuhan Non-Fungsional.* |
| *UC* | *Singkatan dari Use Case.* |
| *EARS* | *Easy Approach to Requirements Syntax, yaitu pola penulisan kebutuhan agar konsisten dan mudah diuji.* |
| *NGO* | *Non-Governmental Organization, organisasi non-pemerintah yang menerima dan mendistribusikan makanan surplus kepada pihak yang membutuhkan.* |
| *F&B* | *Food and Beverage, sebutan untuk usaha yang bergerak di bidang makanan dan minuman.* |
| *Surplus* | *Produk makanan/minuman layak konsumsi yang tidak terjual dan berpotensi terbuang apabila tidak segera didistribusikan.* |

## 1.4 Aturan Penomoran

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| *Kebutuhan Fungsional* | *KFXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Kebutuhan Non-Fungsional* | *KNFXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Aktor* | *AXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Use Case* | *UCXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Kelas* | *CXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |


## 1.5 Referensi
Dokumentasi P/L yang dirujuk oleh dokumen ini. Referensi dapat berupa buku, panduan, ataupun dokumentasi lain yang dipakai dalam pengembangan P/L ini.

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Tuliskan sistematika pembahasan dokumen SKPL ini secara runut (misalnya: BAB 2 membahas deskripsi umum P/L, BAB 3 membahas kebutuhan fungsional dan non-fungsional, dst).

---

# BAB 2: Deskripsi Perangkat Lunak

## 2.1 Deskripsi Umum Sistem
Bagian ini dapat disalin dari BAB 1.1 *Deskripsi Umum Sistem* pada dokumen *Requirement Gathering*, disesuaikan bila ada perubahan alur bisnis. Lengkapi dengan gambaran proses bisnis dalam bentuk *Activity Diagram* (boleh disalin dan diperbarui dari 3.3 *Model Proses Bisnis* pada dokumen *Topic Brainstorming*).

<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/diagram-act-1.avif" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Activity Diagram Proses Bisnis</i>
</p>

## 2.2 Deskripsi Umum Perangkat Lunak
Diisi dengan deskripsi umum perangkat lunak untuk mendukung proses bisnis yang telah diuraikan pada sub-bab sebelumnya. Uraian harus menunjukkan lingkup perangkat lunak, mencakup keterkaitan perangkat lunak dengan sistem lain di luar (misalnya *Payment Gateway* atau layanan pihak ketiga lain yang dipakai).

*Contoh narasi:* "*[Nama P/L]* merupakan aplikasi *[deskripsi singkat]* yang berinteraksi dengan *Payment Gateway (dummy)* untuk memproses otorisasi pembayaran. Sistem menerima input dari *Pelanggan* melalui antarmuka aplikasi dan mengirimkan permintaan transaksi ke *Payment Gateway* setiap kali pelanggan melakukan checkout."

## 2.3 Pengguna dan Kebutuhan Pengguna Perangkat Lunak
Tuliskan seluruh jenis pengguna (*role*/aktor) yang terlibat dalam perangkat lunak (P/L), beserta kebutuhannya secara umum. Bagian ini dapat disalin dari 1.2 *Deskripsi Pengguna Perangkat Lunak* (dokumen Requirement Gathering) atau 3.1 *Identifikasi Aktor* (dokumen Use Case), pastikan sudah konsisten dengan aktor final yang dipakai di BAB 4.

| Pengguna | Kebutuhan |
| :--- | :--- |
| 1 | *Pengguna membuka halaman registrasi dan memilih tipe akun (Pemilik F&B atau Perwakilan NGO).* | *Sistem menampilkan formulir sesuai tipe akun beserta fasilitas unggah dokumen pendukung.* |
| 2 | *Pengguna mengisi seluruh kolom wajib pada formulir dan mengunggah dokumen pendukung, lalu menekan tombol daftar.* | *Sistem memvalidasi kelengkapan data dan format dokumen.* |
| 3 | *Pengguna menunggu proses pendaftaran.* | *Sistem menyimpan data pendaftar dengan status awal "menunggu verifikasi", lalu menampilkan pesan pendaftaran berhasil dikirim.* |

## 2.4 Batasan Perangkat Lunak
Batasan yang harus dituliskan, di antaranya:
1. *P/L harus memakai file data/API dari sistem lain (sebutkan, misal Payment Gateway dummy).*
2. *P/L harus memakai format data yang sama dengan sistem lain.*
3. *P/L harus berfungsi pada platform tertentu (misal: web browser modern, atau desktop Windows dan Linux).*
4. *...*

## 2.5 Lingkungan Operasi Perangkat Lunak
Spesifikasi *operating system* atau lingkungan yang dibutuhkan P/L untuk beroperasi. Bagian ini digunakan untuk memastikan pengguna memiliki spesifikasi yang cukup untuk menjalankan P/L. Misalnya mencakup komponen server, client, OS, DBMS, tetapi tidak menutupi kemungkinan komponen lain.

| Komponen | Spesifikasi |
| :--- | :--- |
| *Server* | *[contoh: Node.js v20, dijalankan pada layanan cloud]* |
| *Client* | *[contoh: Web Browser modern (Chrome, Firefox terbaru)]* |
| *DBMS* | *[contoh: PostgreSQL 15]* |
| *OS* | *[contoh: Cross-platform (Windows/Linux/MacOS) melalui browser]* |
| *...* | *...* |

---

# BAB 3: Deskripsi Kebutuhan Perangkat Lunak

## 3.1 Kebutuhan Fungsional (KF)

Tabel 3.1. Kebutuhan Fungsional

| ID KF | ID Kebutuhan | Penjelasan |
| :--- | :--- | :--- |
| KF01 | R01 | Ketika pengguna membuka halaman registrasi, sistem menampilkan formulir sesuai tipe akun beserta fasilitas unggah dokumen pendukung. |
| KF02 | R05 | Ketika admin membuka daftar verifikasi, sistem menampilkan seluruh pendaftar berstatus "menunggu verifikasi" beserta data dan dokumennya. |
| KF03 | R05 | Ketika admin memutuskan hasil verifikasi, sistem memperbarui status pendaftaran sesuai keputusan admin. |
| KF04 | R08 | Ketika status pendaftaran berubah menjadi diterima/ditolak, sistem dapat menampilkan hasil kepada pendaftar. |
| KF05 | R09, R11 | Sistem harus menyediakan formulir pencatatan penjualan harian yang memuat jumlah produk terjual dan jumlah produk tersisa untuk setiap jenis produk, serta menyimpan data tersebut secara terstruktur per produk dan tanggal. |
| KF06 | R12 | Selama data penjualan minimal tujuh hari tersedia, sistem dapat menjalankan prediksi produksi. |
| KF07 | R13 | Selama hasil prediksi produksi tersedia, sistem harus menampilkan hasil tersebut pada dashboard Pemilik F&B dalam bentuk tabel atau grafik. |
| KF08 | R15 | Ketika Pemilik F&B menetapkan produk sebagai surplus, sistem harus mencatat jumlah produk surplus dan batas waktu pengambilannya. |
| KF09 | R16 | Selama Pemilik F&B mengatur distribusi produk surplus, sistem harus menyediakan pilihan donasi atau penjualan dengan harga diskon, serta kolom harga untuk pilihan penjualan. |
| KF10 | R18 | Sistem harus menyediakan daftar produk surplus pada halaman NGO/publik yang memuat jenis produk, jumlah tersedia, lokasi, dan batas waktu pengambilan. |
| KF11 | R20 | Ketika Perwakilan NGO membuka daftar produk surplus, sistem harus menampilkan produk yang diurutkan dari jarak terdekat dari lokasi pengguna. |
| KF12 | R20 | Sistem harus menyediakan fitur pencarian dan penyaringan produk surplus berdasarkan jenis makanan, jarak, dan batas waktu pengambilan. |
| KF13 | R21, R22 | Ketika NGO mengajukan klaim produk surplus, sistem menyetujui jika produk masih tersedia dan langsung mengubah status produk menjadi "terklaim". |
| KF14 | R24 | Ketika Pemilik F&B atau Perwakilan NGO mengonfirmasi pengambilan produk, sistem harus mengubah status pengambilan menjadi "selesai". |
| KF15 | R25 | Sistem menyediakan dashboard admin untuk melihat dan menyaring log aktivitas pengguna. |

## 3.2 Kebutuhan Non-Fungsional (KNF)

Tabel 3.2. Kebutuhan Non-Fungsional

| ID KNF | ID Kebutuhan | Parameter | Deskripsi Kebutuhan |
| :--- | :--- | :--- | :--- |
| *KNF01* | *R04* | *Security* | *Sistem harus mengencrypt data pribadi pengguna ketika dikirim dan disimpan* |
| *KNF02* | *R07* | *Interaction capability* | *Ketika admin memuat halaman data dan dokumen pendaftar, sistem harus menampilkan layout antarmuka maksimal 50 baris data per halaman dengan waktu kurang dari 2 detik* |
| *KNF03* | *R12* | *Response time* | *Ketika sistem berhasil memproses prediksi jumlah produksi harian, hasilnya harus ditampilkan dalam waktu kurang dari 3 detik* |
| *KNF04* | *R22* | *Reliability* | *Ketika dua atau lebih Perwakilan NGO mengajukan klaim atas produk surplus yang sama secara bersamaan, sistem harus memproses klaim secara atomik sehingga hanya satu klaim yang disetujui dan tidak terjadi lost update.* |
| *KNF05* | *R26* | *Reliability* | *Jika sistem gagal terhubung dengan database utama saat proses log aktivitas pengguna terjadi, sistem harus menyimpan log secara lokal di berkas sementara hingga ukuran maksimal 50 MB sebelum disinkronisasi ulang* |
| *KNF06* | *R20* | *Portability* | *Sistem harus dapat diakses dan menampilkan interface secara responsif pada web (Chrome, Firefox, Safari) di desktop maupun di mobile dengan ukuran layar minimal 4 inci* |
| *KNF07* | *R18* | *Availability* | *Sistem harus beroperasi dan dapat diakses oleh pengguna tanpa ada server error/down/crash minimal 99,5% per bulan (maksimal downtime 3,6 jam/bulan)* |
| *KNF08* | *R01* | *Capacity / Constraints* | *Selama pengguna mengunggah dokumen pendaftaran, sistem harus membatasi ukuran berkas maksimal 5 MB per dokumen dengan format yang diterima terbatas pada PDF, JPG, dan PNG* |
| *KNF09* | *R25* | *Security* | *Ketika akun Admin Sistem tidak aktif selama 30 menit, sistem harus secara otomatis mengakhiri sesi dan meminta autentikasi ulang* |
| *KNF10* | *R22* | *Reliability* | *Jika terjadi pengajuan klaim bersamaan atas produk surplus yang sama oleh lebih dari satu NGO, sistem harus melakukan mekanisme penguncian transaksi dalam waktu 100 ms* |
| *KNF11* | *R21* | *Ergonomy* | *Interface klaim makanan surplus harus didesain mobile-friendly agar tombol pengajuan klaim dapat ditekan dengan presisi pada layar perangkat berukuran minimal 4 inci* |
| *KNF12* | *R26* | *Maintainability* | *Sistem harus dibangun dengan arsitektur modular sehingga penambahan fitur baru atau perbaikan pada satu modul tidak memengaruhi fungsi modul lainnya* |
| *KNF13* | *R03* | *Legal* | *Sistem harus mengelola dan menyimpan data pribadi pengguna sesuai dengan ketentuan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi* |

---

# BAB 4: Pemodelan Use Case

## 4.1 Identifikasi Aktor

| ID Aktor | Aktor | Deskripsi |
| :--- | :--- | :--- |
| *A01* | *Pemilik F&B* | *Pengguna ini bertindak sebagai pihak perwakilan dari bisnis F&B. Karakteristik dari pengguna ini adalah ia butuh UI/UX yang bagus dan nyaman untuk memasukkan data harian juga mengumumkan makanan yang berlebih agar dapat diambil.* |
| *A02* | *Perwakilan NGO* | *Pengguna ini bertindak sebagai pihak penerima donasi yang telah terdaftar di FoodLink. Karakteristik dari pengguna ini adalah ia sering mengakses software, butuh informasi yang jelas terkait detail makanan, lokasi, dan batas waktu pengambilan makanan untuk segera diambil.* |
| *A03* | *Admin Sistem* | *Pengguna ini bertindak sebagai pihak yang mengelola software, mulai dari verifikasi akun baru hingga keamanan.* |

## 4.2 Identifikasi Use Case

| ID UC | Nama Use Case | Deskripsi Singkat | Aktor | ID KF |
| :--- | :--- | :--- | :--- | :--- |
| *UC01* | *Melakukan Registrasi Akun* | *Pendaftar dapat melakukan registrasi akun sesuai tipe akun (pemilik F&B atau perwakilan NGO).* | *A01, A02* | *KF01* |
| *UC02* | *Memverifikasi Pendaftaran Akun* | *Admin mengecek daftar pendaftar berstatus "menunggu verifikasi" beserta datanya, lalu memutuskan hasil verifikasi.* | *A03* | *KF02, KF03* |
| *UC03* | *Melihat Status Pendaftaran* | *Pemilik F&B atau perwakilan NGO dapat melihat status pendaftaran setelah verifikasi.* | *A01, A02* | *KF04* |
| *UC04* | *Mencatat Data Penjualan Harian* | *Pemilik F&B mencatat jumlah produk terjual dan tersisa per hari.* | *A01* | *KF05* |
| *UC05* | *Melihat Hasil Prediksi Produksi* | *Pemilik F&B melihat hasil prediksi produksi yang dihasilkan sistem, ditampilkan dalam tabel/grafik.* | *A01* | *KF06, KF07* |
| *UC06* | *Mencatat Produk Surplus* | *Pemilik F&B mencatat produk yang surplus beserta jumlah dan batas waktu pengambilan.* | *A01* | *KF08* |
| *UC07* | *Mengatur Metode Distribusi Surplus* | *Pemilik F&B memilih opsi donasi atau jual murah untuk produk surplus.* | *A01* | *KF09* |
| *UC08* | *Melihat Informasi Produk Surplus* | *Perwakilan NGO melihat informasi terkait produk surplus, yang telah diurutkan berdasarkan jarak terdekat.* | *A02* | *KF10, KF11* |
| *UC09* | *Menyaring Informasi Produk Surplus* | *Perwakilan NGO menyaring informasi produk surplus berdasarkan jenis makanan, jarak, dan batas waktu pengambilan.* | *A02* | *KF12* |
| *UC10* | *Mengklaim Produk Surplus* | *Perwakilan NGO mengajukan klaim atas suatu produk surplus dan mengecek status produk.* | *A02* | *KF13* |
| *UC11* | *Mengonfirmasi Pengambilan Produk Surplus* | *Pemilik F&B atau perwakilan NGO mengonfirmasi pengambilan produk surplus dan status pengambilan berubah menjadi "selesai".* | *A01, A02* | *KF14* |
| *UC12* | *Mengecek Log Aktivitas Pengguna* | *Admin sistem melihat dan menyaring log aktivitas seluruh pengguna.* | *A03* | *KF15* |

## 4.3 Use Case Diagram


<p align="center">
<img alt="Contoh Use Case Diagram" src="./assets/diagram/Use Case Diagram-Revisi.jpg" width="70%">
</p>
<p align="center">
<i>Gambar 2. Contoh Use Case Diagram</i>
</p>

## 4.4 Skenario Use Case


### 4.4.1 Skenario UC01

**Nama Use Case:** *Melakukan Registrasi Akun*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pengguna membuka halaman registrasi dan memilih tipe akun (Pemilik F&B atau Perwakilan NGO).* | *Sistem menampilkan formulir sesuai tipe akun beserta fasilitas unggah dokumen pendukung.* |
| 2 | *Pengguna mengisi seluruh kolom wajib pada formulir dan mengunggah dokumen pendukung, lalu menekan tombol daftar.* | *Sistem memvalidasi kelengkapan data dan format dokumen.* |
| 3 | *Pengguna menunggu proses pendaftaran.* | *Sistem menyimpan data pendaftar dengan status awal "menunggu verifikasi", lalu menampilkan pesan pendaftaran berhasil dikirim.* |

<br>

**Skenario Alternatif 1: Data Tidak Lengkap atau Dokumen Tidak Valid**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pengguna membuka halaman registrasi dan memilih tipe akun, yaitu Pemilik F&B atau Perwakilan NGO.* | *Sistem menampilkan formulir sesuai tipe akun beserta fasilitas unggah dokumen pendukung.* |
| 2 | *Pengguna mengisi formulir tetapi ada kolom wajib yang kosong atau format unggahan tidak sesuai, lalu menekan tombol daftar.* | *Sistem mendeteksi ketidaklengkapan data dan membatalkan pengiriman.* |
| 3 | *Pengguna melihat notifikasi kesalahan.* | *Sistem menampilkan pesan error pada bagian yang bermasalah dan meminta pengguna melengkapi data.* |

### 4.4.2 Skenario UC02

**Nama Use Case:** *Memverifikasi Pendaftaran Akun*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Admin Sistem membuka halaman daftar verifikasi pendaftaran.* | *Sistem menampilkan seluruh pendaftar berstatus "menunggu verifikasi" beserta data dan dokumennya.* |
| 2 | *Admin Sistem memilih salah satu pendaftar dan memeriksa dokumen pendukung.* | *Sistem menampilkan detail informasi dari pendaftar tersebut secara lengkap.* |
| 3 | *Admin Sistem menyetujui pendaftaran.* | *Sistem memperbarui status pendaftaran menjadi "diterima" dan menyimpannya ke database.* |

<br>

**Skenario Alternatif 1: Pendaftaran Ditolak**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Admin Sistem membuka halaman daftar verifikasi pendaftaran.* | *Sistem menampilkan seluruh pendaftar berstatus "menunggu verifikasi" beserta data dan dokumennya.* |
| 2 | *Admin Sistem memilih salah satu pendaftar dan mendapati bahwa dokumen yang dilampirkan palsu atau tidak relevan.* | *Sistem menampilkan detail informasi dari pendaftar tersebut secara lengkap.* |
| 3 | *Admin Sistem menolak pendaftaran.* | *Sistem memperbarui status pendaftaran menjadi "ditolak" dan menyimpannya ke database.* |

### 4.4.3 Skenario UC03

**Nama Use Case:** *Menampilkan Status Pendaftaran*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B atau Perwakilan NGO membuka halaman status pendaftaran atau masuk (login) ke aplikasi.* | *Sistem memuat informasi akun milik pengguna tersebut.* |
| 2 | *Pengguna melihat hasil evaluasi dari Admin.* | *Sistem menampilkan hasil kepada pendaftar bahwa status pendaftaran telah berubah menjadi diterima.* |

<br>

**Skenario Alternatif 1: Status Pendaftaran Ditolak**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B atau Perwakilan NGO membuka halaman status pendaftaran atau masuk (login) ke aplikasi.* | *Sistem memuat informasi akun milik pengguna tersebut.* |
| 2 | *Pengguna melihat hasil evaluasi dari Admin.* | *Sistem menampilkan hasil kepada pendaftar bahwa status pendaftaran berubah menjadi ditolak dan menyarankan pendaftar untuk memperbaiki dokumennya.* |

### 4.4.4 Skenario UC04

**Nama Use Case:** *Mencatat Data Penjualan Harian*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B mengakses fitur rekapitulasi penjualan.* | *Sistem menyediakan formulir pencatatan penjualan harian yang memuat jumlah produk terjual dan jumlah produk tersisa untuk setiap jenis produk.* |
| 2 | *Pemilik F&B menginput angka yang valid pada jumlah produk terjual dan sisa produk untuk hari itu.* | *Sistem memvalidasi kebenaran input.* |
| 3 | *Pemilik F&B menunggu proses pencatatan selesai.* | *Sistem menyimpan data tersebut secara terstruktur per produk dan tanggal ke dalam database, lalu memberikan notifikasi keberhasilan.* |

<br>

**Skenario Alternatif 1: Format Isian Tidak Valid**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B mengakses fitur rekapitulasi penjualan.* | *Sistem menyediakan formulir pencatatan penjualan harian yang memuat jumlah produk terjual dan jumlah produk tersisa untuk setiap jenis produk.* |
| 2 | *Pemilik F&B menginput nilai negatif (misal: -5) pada kolom jumlah terjual, lalu menekan tombol simpan.* | *Sistem mendeteksi format yang salah dan membatalkan penyimpanan.* |
| 3 | *Pemilik F&B melihat pesan peringatan dari aplikasi.* | *Sistem menampilkan pesan error yang menginstruksikan pengguna untuk memasukkan angka nol atau positif.* |

### 4.4.5 Skenario UC05

**Nama Use Case:** *Melihat Hasil Prediksi Produksi*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B mengakses halaman dashboard.* | *Sistem memeriksa jumlah hari dari rekapitulasi data penjualan historis.* |
| 2 | *Pemilik F&B menunggu aplikasi memuat halaman.* | *Karena data penjualan minimal tujuh hari tersedia, sistem menjalankan algoritma prediksi produksi.* |
| 3 | *Pemilik F&B melihat rekomendasi sistem.* | *Sistem menampilkan hasil prediksi produksi tersebut pada dashboard Pemilik F&B dalam bentuk tabel atau grafik.* |

<br>

**Skenario Alternatif 1: Data Historis Belum Memenuhi Syarat Minimal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B mengakses halaman dashboard.* | *Sistem memeriksa jumlah hari dari rekapitulasi data penjualan historis.* |
| 2 | *Pemilik F&B menunggu aplikasi memuat halaman.* | *Sistem mendeteksi bahwa data penjualan belum mencapai batasan minimal tujuh hari.* |
| 3 | *Pemilik F&B melihat halaman rekomendasi yang kosong atau terkunci.* | *Sistem menampilkan pesan informasi bahwa prediksi produksi belum dapat dilakukan hingga data penjualan tujuh hari terpenuhi.* |

### 4.4.6 Skenario UC06

**Nama Use Case:** *Mencatat Produk Surplus*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B masuk ke menu manajemen produk dan memilih fitur produk berlebih.* | *Sistem menampilkan formulir kosong yang meminta detail produk surplus.* |
| 2 | *Pemilik F&B menetapkan produk tertentu sebagai surplus, mengisi jumlah kuantitas, dan batas waktu pengambilannya, lalu menekan tombol "Simpan" (💾).* | *Sistem memvalidasi kecocokan data input (seperti jam/batas waktu yang tidak mungkin mundur di masa lalu).* |
| 3 | *Pemilik F&B menunggu respons pembaruan produk.* | *Sistem mencatat jumlah produk surplus dan batas waktu pengambilannya serta menampilkan notifikasi sukses.* |

**Skenario Alternatif 1: Mereset Isian Formulis**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B masuk ke menu manajemen produk dan memilih fitur produk berlebih.* | *Sistem menampilkan formulir kosong yang meminta detail produk surplus.* |
| 2 | *Pemilik F&B mengisi formulir dengan detail produk, kuantitas, dan batas waktu, tetapi kemudian menekan tombol "Reset" (🔄).* | *Sistem membatalkan proses dan menghapus seluruh isian yang ada di formulir.* |
| 3 | *Pemilik F&B melihat formulir kembali kosong.* | *Sistem mengembalikan formulir ke keadaan semula agar dapat diisi ulang oleh pengguna.* |

<br>


### 4.4.7 Skenario UC07

**Nama Use Case:** *Mengatur Metode Distribusi Surplus*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B memilih produk surplus yang telah dicatat untuk diatur metode distribusinya.* | *Sistem menampilkan opsi donasi atau jual dengan diskon untuk produk surplus.* |
| 2 | *Pemilik F&B memilih penjualan dengan diskon.* | *Sistem menampilkan kolom untuk memasukkan harga penjualan.* |
| 3 | *Pemilik F&B memasukkan harga penjualan dan memilih simpan.* | *Sistem memeriksa kelengkapan dan kevalidan harga, menyimpan metode distribusi beserta harga produk, lalu menampilkan pesan bahwa pengaturan berhasil disimpan.* |


<br>

**Skenario Alternatif 1: Pemilik F&B Memilih Donasi**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B memilih produk surplus yang telah dicatat untuk diatur metode distribusinya.* | *Sistem menampilkan opsi donasi atau jual dengan diskon untuk produk surplus.* |
| 2 | *Pemilik F&B memilih donasi.* | *Sistem tidak mewajibkan pengisian harga dan menampilkan keterangan bahwa produk akan didonasikan tanpa biaya.* |
| 3 | *Pemilik F&B memilih simpan.* | *Sistem menyimpan metode distribusi sebagai donasi tanpa biaya, lalu menampilkan pesan bahwa pengaturan berhasil disimpan.* |

<br>

**Skenario Alternatif 2: Harga Penjualan Tidak Valid**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B memilih produk surplus yang telah dicatat untuk diatur metode distribusinya.* | *Sistem menampilkan opsi donasi atau jual dengan diskon untuk produk surplus.* |
| 2 | *Pemilik F&B memilih simpan saat harga belum diisi, bukan angka, atau tidak lebih dari nol.* | *Sistem menolak penyimpanan dan meminta Pemilik F&B memasukkan harga berupa angka lebih dari nol.* |
| 3 | *Pemilik F&B memperbaiki harga dan memilih simpan kembali.* | *Sistem memeriksa ulang harga. Kalau valid, sistem menyimpan metode distribusi beserta harga produk dan menampilkan pesan keberhasilan.* |


### 4.4.8 Skenario UC08

**Nama Use Case:** *Melihat Informasi Produk Surplus*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Perwakilan NGO membuka halaman daftar produk surplus dengan lokasi pengguna tersedia.* | *Sistem menampilkan daftar produk surplus yang tersedia, diurutkan dari jarak terdekat terhadap lokasi pengguna. Menampilkan jenis produk(makanan/minuman), jumlah tersedia, lokasi, dan batas waktu pengambilan.* |
| 2 | *Perwakilan NGO memilih salah satu produk untuk melihat informasi lebih lanjut.* | *Sistem menampilkan detail produk yang dipilih, termasuk jenis produk, jumlah tersedia, lokasi, batas waktu pengambilan, metode distribusi, dan harga apabila produk dijual.* |

<br>

**Skenario Alternatif 1: Lokasi Pengguna Belum Tersedia**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Perwakilan NGO membuka halaman daftar produk surplus tanpa lokasi pengguna yang tersedia.* | *Sistem meminta Perwakilan NGO memberikan lokasi agar produk dapat diurutkan berdasarkan jarak terdekat.* |
| 2 | *Perwakilan NGO memberikan lokasi yang akan digunakan.* | *Sistem menampilkan daftar produk surplus beserta informasinya, diurutkan berdasarkan jarak terdekat dari lokasi tersebut.* |
| 3 | *Perwakilan NGO memilih salah satu produk.* | *Sistem menampilkan detail produk seperti pada langkah 2 skenario normal.* |


### 4.4.9 Skenario UC09

**Nama Use Case:** *Menyaring Informasi Produk Surplus*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Perwakilan NGO membuka fitur pencarian dan penyaringan pada halaman daftar produk surplus.* | *Sistem menyediakan kolom pencarian serta pilihan penyaringan berdasarkan jenis makanan, jarak, dan batas waktu pengambilan.* |
| 2 | *Perwakilan NGO memasukkan kata kunci dan/atau memilih kriteria penyaringan yang diperlukan, lalu menerapkannya.* | *Sistem menampilkan produk surplus yang sesuai dengan kata kunci dan seluruh kriteria yang diterapkan.* |
| 3 | *Perwakilan NGO memilih salah satu produk dari hasil pencarian atau penyaringan.* | *Sistem menampilkan detail produk yang dipilih.* |

<br>

**Skenario Alternatif 1: Tidak Ada Produk yang Sesuai**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Perwakilan NGO membuka fitur pencarian dan penyaringan pada halaman daftar produk surplus.* | *Sistem menyediakan kolom pencarian serta pilihan penyaringan berdasarkan jenis makanan, jarak, dan batas waktu pengambilan.* |
| 2 | *Perwakilan NGO menerapkan kata kunci atau kriteria penyaringan yang tidak cocok dengan produk mana pun.* | *Sistem menampilkan pesan bahwa tidak ada produk yang sesuai dan tetap menampilkan kata kunci serta kriteria yang digunakan.* |


### 4.4.10 Skenario UC10

**Nama Use Case:** *Mengklaim Produk Surplus*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Perwakilan NGO memilih produk surplus yang ingin diklaim. | Sistem menampilkan detail produk, status ketersediaan, dan pilihan untuk mengklaim. |
| 2 | Perwakilan NGO mengklaim atas produk tersebut. | Sistem memeriksa kembali ketersediaan produk. Jika masih tersedia, sistem langsung menyetujui klaim, mencatat NGO yang melakukan klaim, dan mengubah status produk menjadi "terklaim". |
| 3 | Perwakilan NGO melihat hasil pengajuan klaim. | Sistem menampilkan bahwa klaim berhasil beserta informasi produk, lokasi, dan batas waktu pengambilan. |

<br>

**Skenario Alternatif 1: Produk sudah diklaim NGO lain terlebih dahulu**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Perwakilan NGO memilih produk surplus yang ingin diklaim. | Sistem menampilkan detail produk, status ketersediaan, dan pilihan untuk mengklaim. |
| 2 | Perwakilan NGO mengklaim atas produk tersebut. | Sistem menolak pengajuan, menampilkan pesan bahwa produk sudah diklaim, dan mempertahankan klaim yang telah berhasil sebelumnya. |


### 4.4.11 Skenario UC11

**Nama Use Case:** *Mengonfirmasi Pengambilan Produk Surplus*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B atau Perwakilan NGO membuka detail pengambilan produk yang terkait dengan akunnya dan sudah berhasil diklaim.* | *Sistem menampilkan informasi produk, pihak yang terlibat, dan status pengambilan yang belum selesai.* |
| 2 | *Setelah penyerahan produk dilakukan, Pemilik F&B atau Perwakilan NGO memilih konfirmasi pengambilan.* | *Sistem menampilkan pop-up bertuliskan "Apakah Anda yakin ingin mengonfirmasi bahwa produk sudah diambil?" dengan pilihan "Yes" dan "No".* |
| 3 | *Setelah penyerahan produk dilakukan, Pemilik F&B atau Perwakilan NGO memilih konfirmasi pengambilan.* | *Sistem mengubah status pengambilan menjadi "selesai" dan menampilkan pesan bahwa pengambilan berhasil dikonfirmasi.* |
| 4 | *Pemilik F&B atau Perwakilan NGO melihat kembali detail pengambilan.* | *Sistem menampilkan status pengambilan "selesai" yang dapat dilihat oleh kedua pihak terkait.* |

<br>

**Skenario Alternatif 1: *Pemilik F&B atau Perwakilan NGO Ingin Membatalkan Pengonfirmasian Pengambilan Produk Surplus*

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pemilik F&B atau Perwakilan NGO membuka detail pengambilan produk yang terkait dengan akunnya dan sudah berhasil diklaim.* | *Sistem menampilkan informasi produk, pihak yang terlibat, dan status pengambilan yang belum selesai.* |
| 2 | *Pemilik F&B atau Perwakilan NGO memilih konfirmasi pengambilan.* | *Sistem menampilkan pop-up bertuliskan "Apakah Anda yakin ingin mengonfirmasi bahwa produk sudah diambil?" dengan pilihan "Yes" dan "No".* |
| 3 | *Pemilik F&B atau Perwakilan NGO memilih "No".* | *Sistem menutup pop-up dan kembali menampilkan detail pengambilan tanpa mengubah status pengambilan.* |



### 4.4.12 Skenario UC12

**Nama Use Case:** *Mengecek Log Aktivitas Pengguna*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Admin Sistem membuka dashboard admin dan memilih menu log aktivitas pengguna.* | *Sistem menampilkan daftar log aktivitas pengguna beserta pilihan penyaringan.* |
| 2 | *Admin Sistem menentukan kriteria penyaringan yang tersedia dan menerapkannya.* | *Sistem menampilkan log aktivitas yang sesuai dengan kriteria tersebut.* |
| 3 | *Admin Sistem memeriksa log yang ditampilkan.* | *Sistem menyajikan informasi pengguna, aktivitas yang dilakukan, dan waktu aktivitas pada daftar hasil penyaringan.* |

<br>

**Skenario Alternatif 1: Tidak Ada Log yang Sesuai dengan Penyaringan**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Admin Sistem membuka dashboard admin dan memilih menu log aktivitas pengguna.* | *Sistem menampilkan daftar log aktivitas pengguna beserta pilihan penyaringan.* |
| 2 | *Admin Sistem menerapkan kriteria penyaringan yang tidak cocok dengan log mana pun.* | *Sistem menampilkan pesan bahwa tidak ada log aktivitas yang sesuai dengan kriteria tersebut.* |
| 3 | *Admin Sistem mengubah kriteria penyaringan dan menerapkannya kembali.* | *Sistem memperbarui daftar log berdasarkan kriteria terbaru.* |

<br>

**Skenario Alternatif 2: Belum Ada Log Aktivitas**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Admin Sistem membuka menu log aktivitas ketika belum ada aktivitas pengguna yang tercatat.* | *Sistem menampilkan pesan bahwa belum ada log aktivitas pengguna yang tersedia.* |

---

# BAB 5: Pemodelan Kelas

## 5.1 Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas | ID Use Case |
| :--- | :--- | :--- | :--- |
| *C01* | *AkunPengguna* | *Menyimpan data akun & identitas pengguna (Pemilik F&B, Perwakilan NGO, Admin Sistem). (Entity Class)* | *UC01, UC02, UC03, UC04, UC05, UC06, UC07, UC08, UC09, UC10, UC11, UC12* |
| *C02* | *Pendaftaran* | *Menyimpan data registrasi & status verifikasi. (Entity Class)*| *UC01, UC02, UC03*|
| *C03* | *DokumenPendukung* | *Menyimpan dokumen yang diunggah pendaftar. (Entity Class)*| *UC01, UC02*|
| *C04* | *VerifikasiController* | *Menangani proses pemeriksaan & keputusan verifikasi oleh Admin. (Controller Class)*| *UC02*|
| *C05* | *Produk*| *Menyimpan jenis produk milik Pemilik F&B. (Entity Class)*| *UC04, UC05, UC06*|
| *C06* | *DataPenjualan* | *Menyimpan data penjualan & sisa produk harian. (Entity Class)*| *UC04, UC05*|
| *C07* | *PrediksiProduksi* | *Menyimpan hasil prediksi produksi. (Entity Class)*| *UC05*|
| *C08* | *ProdukSurplus* | *Menyimpan informasi dari produk surplus: jumlah, batas waktu, status. (Entity Class)*| *UC06, UC07, UC08, UC09, UC10, UC11*|
| *C09* | *MetodeDistribusiSurplus* | *Menyimpan pilihan distribusi surplus (donasi/jual) beserta harga. (Entity Class)*| *UC07, UC08, UC09*|
| *C10* | *DokumenKlaim* | *Mencatat NGO yang mengklaim produk surplus & waktu klaim. (Entity Class)*| *UC10, UC11*|
| *C11* | *LogAktivitas* | *Mencatat pengguna, aktivitas, dan waktu. (Entity Class)*| *UC12*|
| *C12* | *RegistrasiPage* | *Antarmuka formulir registrasi akun. (Boundary Class)*| *UC01*|
| *C13* | *VerifikasiPage* | *Antarmuka daftar & detail pendaftar untuk Admin. (Boundary Class)*| *UC02*|
| *C14* | *StatusPendaftaranPage* | *Antarmuka status pendaftaran. (Boundary Class)*| *UC03*|
| *C15* | *PenjualanPage* | *Antarmuka formulir input data penjualan harian. (Boundary Class)*| *UC04*|
| *C16* | *PrediksiPage* | *Antarmuka dashboard hasil prediksi produksi. (Boundary Class)*| *UC05*|
| *C17* | *ProdukSurplusPage* | *Antarmuka input produk surplus. (Boundary Class)*| *UC06*|
| *C18* | *DistribusiSurplusPage* | *Antarmuka pengaturan metode distribusi surplus. (Boundary Class)*| *UC07*|
| *C19* | *DaftarSurplusPage* | *Antarmuka daftar & pencarian/penyaringan produk surplus untuk NGO. (Boundary Class)*| *UC08, UC09*|
| *C20* | *KlaimPage* | *Antarmuka pengajuan klaim produk surplus. (Boundary Class)*| *UC10*|
| *C21* | *PengambilanPage* | *Antarmuka konfirmasi pengambilan produk. (Boundary Class)*| *UC11*|
| *C22* | *LogAktivitasPage* | *Antarmuka dashboard log aktivitas Admin. (Boundary Class)*| *UC12*|
| *C23* | *AuthController* | *Menangani registrasi akun & pengecekan status pendaftaran. (Controller CLass)*| *UC01, UC03*|
| *C24* | *PenjualanController* | *Memvalidasi & menyimpan data penjualan harian. (Controller Class)*| *UC04*|
| *C25* | *PrediksiController* | *Mengecek syarat data historis & menjalankan algoritma prediksi. (Controller Class)*| *UC05*|
| *C26* | *ProdukSurplusController* | *Memvalidasi & menyimpan data surplus serta metode distribusi. (Controller Class)*| *UC06, UC07*|
| *C27* | *SurplusController* | *Mengurutkan berdasarkan jarak & menyaring/mencari produk surplus. (Controller Class)*| *UC08, UC09*|
| *C28* | *KlaimController* | *Memvalidasi ketersediaan, menyetujui klaim, & konfirmasi pengambilan. (Controller Class)*| *UC10, UC11*|
| *C29* | *LogController* | *Menampilkan & menyaring log aktivitas. (Controller Class)*| *UC12*|
| *C30* | *PemilikFnB* | *Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Pemilik F&B (misal nama usaha, alamat usaha, jam operasional). (Entity Class)*| *UC01, UC02, UC03, UC04, UC05, UC06, UC07, UC11* |
| *C31* | *PerwakilanNGO* | *Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Perwakilan NGO (misal nama organisasi, nomor legalitas, lokasi). (Entity Class)*| *UC01, UC02, UC03, UC08, UC09, UC10, UC11* |
| *C32* | *AdminSistem* | *Subkelas dari AkunPengguna, dengan atribut/metode khusus Admin (misal kewenangan verifikasi dan pemantauan). (Entity Class)*| *UC02, UC12* |

## 5.2 Diagram Kelas per Use Case

### 5.2.1 Use Case UC01

**Nama Use Case:** *Melakukan Registrasi Akun*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C02 | Pendaftaran | Menyimpan data registrasi & status verifikasi. (Entity Class) |
| C03 | DokumenPendukung | Menyimpan dokumen yang diunggah pendaftar. (Entity Class) |
| C12 | RegistrasiPage | Antarmuka formulir registrasi akun. (Boundary Class) | 
| C23 | AuthController | Menangani registrasi akun & pengecekan status pendaftaran. (Controller CLass) |
| C30 | PemilikFnB | Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Pemilik F&B (misal nama usaha, alamat usaha, jam operasional). (Entity Class) |
| C31 | PerwakilanNGO | Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Perwakilan NGO (misal nama organisasi, nomor legalitas, lokasi). (Entity Class) |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC01" src="./assets/diagram/class diagram UC01.jpeg" height="90%" width="42%">
</p>
<p align="center">
<i>Gambar 2. Diagram Kelas Use Case UC01</i>
</p>
<br>

Pada diagram kelas, cukup tampilkan nama kelas saja. Atribut dan metode/operasi milik setiap kelas dapat dituliskan pada tabel di bawah ini. Pastikan hubungan antarkelas menggunakan jenis relasi yang sesuai (asosiasi, agregasi, komposisi, generalisasi, atau dependensi).

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C02 | Pendaftaran | idPendaftaran, tanggalDaftar, statusVerifikasi | ajukanPendaftaran(), updateStatus() |
| C03 | DokumenPendukung | idDokumen, namaFile, tipeDokumen | unggahDokumen(), getDokumen() |
| C12 | RegistrasiPage | *(tidak ada — hanya tampilan)* | tampilkanFormRegistrasi() |
| C23 | AuthController | *(tidak ada — hanya logika)* | registrasiAkun() |
| C30 | PemilikFnB | namaUsaha, alamatUsaha, jamOperasional | *(diwarisi dari AkunPengguna)* |
| C31 | PerwakilanNGO | namaOrganisasi, nomorLegalitas, lokasi | *(diwarisi dari AkunPengguna)* |


<br>

### 5.2.2 Use Case UC02

**Nama Use Case:** *Memverifikasi Pendaftaran Akun*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C02 | Pendaftaran | Menyimpan data registrasi & status verifikasi. (Entity Class) |
| C03 | DokumenPendukung | Menyimpan dokumen yang diunggah pendaftar. (Entity Class) |
| C04 | VerifikasiController | Menangani proses pemeriksaan & keputusan verifikasi oleh Admin. (Controller Class) | 
| C13 | VerifkasiPage |Antarmuka daftar & detail pendaftar untuk Admin. (Boundary Class) | 
| C32 | AdminSistem | Subkelas dari AkunPengguna, dengan atribut/metode khusus Admin (misal kewenangan verifikasi dan pemantauan). (Entity Class) | 

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC02" src="./assets/diagram/class diagram UC02.png" width="48%">
</p>
<p align="center">
<i>Gambar 3. Diagram Kelas Use Case UC02</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C02 | Pendaftaran | idPendaftaran, tanggalDaftar, statusVerifikasi | updateStatus() |
| C03 | DokumenPendukung | idDokumen, namaFile, tipeDokumen | getDokumen() |
| C04 | VerifikasiController | *(tidak ada — hanya logika)* | tampilkanDaftarPendaftar(), prosesVerifikasi() |
| C13 | VerifikasiPage | *(tidak ada — hanya tampilan)* | tampilkanDaftarVerifikasi(), tampilkanDetailPendaftar() |
| C32 | AdminSistem | kewenangan | verifikasiPendaftaran() |


<br>

### 5.2.3 Use Case UC03

**Nama Use Case:** *Melihat Status Pendaftaran*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| C02 | Pendaftaran | Menyimpan data registrasi & status verifikasi. (Entity Class) | 
| C14 | StatusPendaftaranPage | Antarmuka status pendaftaran. (Boundary Class) |
| C23 | AuthController | Menangani registrasi akun & pengecekan status pendaftaran. (Controller CLass) | 
| C30 | PemilikFnB | Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Pemilik F&B (misal nama usaha, alamat usaha, jam operasional). (Entity Class) |
| C31 | PerwakilanNGO | Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Perwakilan NGO (misal nama organisasi, nomor legalitas, lokasi). (Entity Class) | 

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC03" src="./assets/diagram/class diagram UC03.jpeg" height="550px" width="auto">
</p>
<p align="center">
<i>Gambar 4. Diagram Kelas Use Case UC03</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C02 | Pendaftaran | idPendaftaran, tanggalDaftar, statusVerifikasi | getStatus() |
| C14 | StatusPendaftaranPage | *(tidak ada — hanya tampilan)* | tampilkanStatusPendaftaran() |
| C23 | AuthController | *(tidak ada — hanya logika)* | cekStatusPendaftaran() |
| C30 | PemilikFnB | namaUsaha, alamatUsaha, jamOperasional | *(diwarisi)* |
| C31 | PerwakilanNGO | namaOrganisasi, nomorLegalitas, lokasi | *(diwarisi)* |
<br>

### 5.2.4 Use Case UC04

**Nama Use Case:** *Mencatat Data Penjualan Harian*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C30* | *PemilikFnB* | *Aktor pengguna yang mengakses fitur pencatatan rekapitulasi penjualan. (Entity Class)* |
| *C15* | *PenjualanPage* | *Antarmuka formulir pencatatan penjualan harian. (Boundary Class)* |
| *C24* | *PenjualanController* | *Menangani validasi input dan proses penyimpanan data penjualan. (Controller Class)* |
| *C06* | *DataPenjualan* | *Menyimpan data penjualan dan sisa produk harian per tanggal. (Entity Class)* |
| *C05* | *Produk* | *Menyimpan jenis produk F&B yang dicatat penjualannya. (Entity Class)* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC04" src="./assets/diagram/Class Diagram-UC04.jpeg" width="42%">
</p>
<p align="center">
<i>Gambar 5. Diagram Kelas Use Case UC04</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C30* | *PemilikFnB* | *namaUsaha, alamatUsaha, jamOperasional* | *inputPenjualan()* |
| *C15* | *PenjualanPage* | *-* | *tampilkanFormPenjualan(), kirimDataPenjualan()* |
| *C24* | *PenjualanController* | *-* | *validasiInputPenjualan(), simpanDataPenjualan()* |
| *C06* | *DataPenjualan* | *idPenjualan, tanggal, jumlahTerjual, jumlahTersisa* | *catatPenjualan(), getDataHistoris()* |
| *C05* | *Produk* | *idProduk, namaProduk, kategori* | *getDetailProduk()* |

<br>

### 5.2.5 Use Case UC05

**Nama Use Case:** *Melihat Hasil Prediksi Produksi*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C30* | *PemilikFnB* | *Aktor pengguna yang melihat rekomendasi prediksi produksi pada dashboard. (Entity Class)* |
| *C16* | *PrediksiPage* | *Antarmuka dashboard hasil prediksi produksi dalam bentuk tabel/grafik. (Boundary Class)* |
| *C25* | *PrediksiController* | *Memeriksa kecukupan data historis (minimal 7 hari) dan menjalankan algoritma prediksi. (Controller Class)* |
| *C07* | *PrediksiProduksi* | *Menyimpan dan merepresentasikan hasil perhitungan prediksi produksi. (Entity Class)* |
| *C06* | *DataPenjualan* | *Menyimpan data penjualan harian historis yang digunakan sebagai masukan prediksi. (Entity Class)* |
| *C05* | *Produk* | *Menyimpan jenis produk F&B yang diprediksi rekomendasinya. (Entity Class)* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC05" src="./assets/diagram/Class Diagram-UC05.jpeg" width="42%">
</p>
<p align="center">
<i>Gambar 6. Diagram Kelas Use Case UC05</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C30* | *PemilikFnB* | *namaUsaha, alamatUsaha, jamOperasional* | *lihatHasilPrediksi()* |
| *C16* | *PrediksiPage* | *-* | *tampilkanDashboardPrediksi(), tampilkanGrafik()* |
| *C25* | *PrediksiController* | *-* | *cekKecukupanData(), hitungPrediksiProduksi()* |
| *C07* | *PrediksiProduksi* | *idPrediksi, tanggalPrediksi, jumlahRekomendasi* | *generatePrediksi(), getHasilPrediksi()* |
| *C06* | *DataPenjualan* | *idPenjualan, tanggal, jumlahTerjual, jumlahTersisa* | *getDataHistoris()* |
| *C05* | *Produk* | *idProduk, namaProduk, kategori* | *getDetailProduk()* |

<br>

### 5.2.6 Use Case UC06

**Nama Use Case:** *Mencatat Produk Surplus*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C30* | *PemilikFnB* | *Aktor pengguna yang memasukkan data produk surplus beserta batas waktu pengambilan. (Entity Class)* |
| *C17* | *ProdukSurplusPage* | *Antarmuka formulir input dan manajemen produk surplus. (Boundary Class)* |
| *C26* | *ProdukSurplusController* | *Memvalidasi tanggal/batas waktu dan menyimpan data produk surplus. (Controller Class)* |
| *C08* | *ProdukSurplus* | *Menyimpan kuantitas produk surplus, batas waktu pengambilan, dan statusnya. (Entity Class)* |
| *C05* | *Produk* | *Menyimpan jenis produk F&B yang menjadi produk surplus. (Entity Class)* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC06" src="./assets/diagram/Class Diagram-UC06.jpeg" width="42%">
</p>
<p align="center">
<i>Gambar 7. Diagram Kelas Use Case UC06</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C30* | *PemilikFnB* | *namaUsaha, alamatUsaha, jamOperasional* | *catatProdukSurplus()* |
| *C17* | *ProdukSurplusPage* | *-* | *tampilkanFormSurplus(), kirimDataSurplus(), resetForm()* |
| *C26* | *ProdukSurplusController* | *-* | *validasiDataSurplus(), simpanProdukSurplus()* |
| *C08* | *ProdukSurplus* | *idSurplus, jumlah, batasWaktuPengambilan, status* | *catatProdukSurplus(), updateStatus()* |
| *C05* | *Produk* | *idProduk, namaProduk, kategori* | *getDetailProduk()* |

<br>

### 5.2.7 Use Case UC07

**Nama Use Case:** *Mengatur Metode Distribusi Surplus*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C30* | *PemilikFnB* | *Subkelas dari AkunPengguna, berisi informasi tentang Pemilik F&B (Entity Class)* |
| *C08* | *ProdukSurplus* | *Menyimpan informasi produk surplus yang akan ditentukan metode distribusinya. (Entity Class)* |
| *C09* | *MetodeDistribusiSurplus* | *Menyimpan pilihan distribusi surplus (donasi atau jual dengan harga diskon) beserta harga jika dijual. (Entity Class)* |
| *C18* | *DistribusiSurplusPage* | *Antarmuka bagi Pemilik F&B untuk memilih dan mengatur metode distribusi produk surplus. (Boundary Class)* |
| *C26* | *ProdukSurplusController* | *Memvalidasi dan menyimpan metode distribusi yang dipilih untuk produk surplus tertentu. (Controller Class)* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC07" src="./assets/diagram/Class Diagram-UC07.png" width="42%">
</p>
<p align="center">
<i>Gambar 8. Diagram Kelas Use Case UC07</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C30* | *PemilikFnB* | *namaUsaha, alamatUsaha, jamOperasional* | *aturDistribusiSurplus()* |
| *C08* | *ProdukSurplus* | *idSurplus, jumlah, batasWaktuPengambilan, status* | *updateStatus()* |
| *C09* | *MetodeDistribusiSurplus* | *idDistribusi, jenisDistribusi, harga* | *pilihMetodeDistribusi(), hitungHargaDiskon()* |
| *C18* | *DistribusiSurplusPage* | - | *tampilkanOpsiDistribusi()* |
| *C26* | *ProdukSurplusController* | - | *validasiMetodeDistribusi(), simpanMetodeDistribusi()* |

<br>

### 5.2.8 Use Case UC08

**Nama Use Case:** *Melihat Informasi Produk Surplus*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C31* | *PerwakilanNGO* | *Subkelas dari AkunPengguna, berisi informasi tentang Perwakilan NGO (Entity Class)* |
| *C08* | *ProdukSurplus* | *Menyimpan informasi produk surplus (jumlah, batas waktu, status) yang ditampilkan kepada NGO.* |
| *C09* | *MetodeDistribusiSurplus* | *Menyimpan informasi jenis distribusi dan harga produk surplus yang ditampilkan kepada NGO.* |
| *C19* | *DaftarSurplusPage* | *Antarmuka daftar produk surplus yang telah diurutkan berdasarkan jarak terdekat untuk NGO.* |
| *C27* | *SurplusController* | *Mengambil dan mengurutkan produk surplus berdasarkan jarak terdekat dari lokasi NGO.* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC08" src="./assets/diagram/Class Diagram-UC08.jpg" width="42%">
</p>
<p align="center">
<i>Gambar 9. Diagram Kelas Use Case UC08</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C31* | *PerwakilanNGO* | *namaOrganisasi, nomorLegalitas, lokasi* | *lihatDaftarSurplus()* |
| *C08* | *ProdukSurplus* | *idSurplus, jumlah, batasWaktuPengambilan, status* | *getDetailSurplus()* |
| *C09* | *MetodeDistribusiSurplus* | *idDistribusi, jenisDistribusi, harga* | *getInfoDistribusi()* |
| *C19* | *DaftarSurplusPage* | - | *tampilkanDaftarSurplus()* |
| *C27* | *SurplusController* | - | *urutkanBerdasarkanJarak(), ambilDaftarSurplus()* |

<br>

### 5.2.9 Use Case UC09

**Nama Use Case:** *Menyaring Informasi Produk Surplus*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C31* | *PerwakilanNGO* | *Subkelas dari AkunPengguna, berisi informasi tentang Perwakilan NGO (Entity Class)* |
| *C08* | *ProdukSurplus* | *Menyimpan informasi produk surplus yang menjadi target penyaringan.* |
| *C09* | *MetodeDistribusiSurplus* | *Menyimpan informasi jenis distribusi yang dapat menjadi salah satu kriteria penyaringan.* |
| *C19* | *DaftarSurplusPage* | *Antarmuka bagi NGO untuk memasukkan kriteria penyaringan (jenis makanan, jarak, batas waktu).* |
| *C27* | *SurplusController* | *Menyaring dan mencari produk surplus berdasarkan kriteria yang dimasukkan NGO.* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC09" src="./assets/diagram/Class Diagram-UC09.jpg" width="42%">
</p>
<p align="center">
<i>Gambar 10. Diagram Kelas Use Case UC09</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C31* | *PerwakilanNGO* | *namaOrganisasi, nomorLegalitas, lokasi* | *saringDaftarSurplus()* |
| *C08* | *ProdukSurplus* | *idSurplus, jumlah, batasWaktuPengambilan, status* | *getDetailSurplus()* |
| *C09* | *MetodeDistribusiSurplus* | *idDistribusi, jenisDistribusi, harga* | *getInfoDistribusi()* |
| *C19* | *DaftarSurplusPage* | - | *tampilkanFormFilter()* |
| *C27* | *SurplusController* | - | *saringProdukSurplus(), cariProdukSurplus()* |

<br>

### 5.2.10 Use Case UC10

**Nama Use Case:** *Mengklaim Produk Surplus*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C08* | *ProdukSurplus* | *Menyimpan produk yang ditetapkan surplus: jumlah, batas waktu pengambilan, dan status. (Entity Class)* |
| *C10* | *DokumenKlaim* | *Mencatat NGO yang mengklaim produk surplus & waktu klaim. (Entity Class)* |
| *C20* | *KlaimPage* | *Antarmuka pengajuan klaim produk surplus. (Boundary Class)* |
| *C28* | *KlaimController* | *Memvalidasi ketersediaan, menyetujui klaim, & konfirmasi pengambilan. (Controller Class)* |
| *C31* | *PerwakilanNGO* | *Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Perwakilan NGO (misal nama organisasi, nomor legalitas, lokasi). (Entity Class)* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC10" src="./assets/diagram/Class Diagram V2-UC10.jpg" height="510px" width="auto">
</p>
<p align="center">
<i>Gambar 11. Diagram Kelas Use Case UC10</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C08* | *ProdukSurplus* | *status* | *getStatus(), setStatus()* |
| *C10* | *DokumenKlaim* | *claimId, ngoId, claimTime* | *recordClaim(), getClaimTime()* |
| *C20* | *KlaimPage* | *selectedProduct* | *showPage(), submitClaim()* |
| *C28* | *KlaimController* | *-* | *checkAvailability(), approveClaim()* |
| *C31* | *PerwakilanNGO* | *accountId* | *getAccountId()* |

<br>

### 5.2.11 Use Case UC11

**Nama Use Case:** *Mengonfirmasi Pengambilan Produk Surplus*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C08* | *ProdukSurplus* | *Menyimpan produk yang ditetapkan surplus: jumlah, batas waktu pengambilan, dan status. (Entity Class)* |
| *C10* | *DokumenKlaim* | *Mencatat NGO yang mengklaim produk surplus & waktu klaim. (Entity Class)* |
| *C20* | *KlaimPage* | *Antarmuka pengajuan klaim produk surplus. (Boundary Class)* |
| *C28* | *KlaimController* | *Memvalidasi ketersediaan, menyetujui klaim, & konfirmasi pengambilan. (Controller Class)* |
| *C30* | *PemilikFnB* | *Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Pemilik F&B (misal nama usaha, alamat usaha, jam operasional). (Entity Class)* |
| *C31* | *PerwakilanNGO* | *Subkelas dari AkunPengguna, dengan atribut/metode khusus milik Perwakilan NGO (misal nama organisasi, nomor legalitas, lokasi). (Entity Class)* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC11" src="./assets/diagram/Class Diagram V2-UC11.jpg" width="42%">
</p>
<p align="center">
<i>Gambar 12. Diagram Kelas Use Case UC11</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C08* | *ProdukSurplus* | *status* | *getStatus(), setStatus()* |
| *C10* | *DokumenKlaim* | *claimId, ngoId, claimTime* | *recordClaim(), getClaimTime()* |
| *C20* | *KlaimPage* | *selectedProduct* | *showPage(), submitClaim()* |
| *C28* | *KlaimController* | *-* | *checkAvailability(), approveClaim()* |
| *C30* | *PemilikFnB* | *accountId* | *getAccountId()* |
| *C31* | *PerwakilanNGO* | *accountId* | *getAccountId()* |

<br>

### 5.2.12 Use Case UC12

**Nama Use Case:** *Mengecek Log Aktivitas Pengguna*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C11* | *LogAktivitas* | *Mencatat pengguna, aktivitas, dan waktu. (Entity Class)* |
| *C22* | *LogAktivitasPage* | *Antarmuka dashboard log aktivitas admin. (Boundary Class)* |
| *C29* | *LogController* | *Menampilkan dan menyaring log aktivitas. (Controller Class)* |
| *C32* | *AdminSistem* | *Subkelas dari AkunPengguna, dengan atribut/metode khusus Admin (misal kewenangan verifikasi dan pemantauan). (Entity Class)* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC12" src="./assets/diagram/Class Diagram V2-UC12.jpg" height="510px" width="auto">
</p>
<p align="center">
<i>Gambar 13. Diagram Kelas Use Case UC12</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C11* | *LogAktivitas* | *logId, activity, time* | *recordLog(), getActivity()* |
| *C22* | *LogAktivitasPage* | *displayedLogList, filterInput* | *showPage(), applyFilter()* |
| *C29* | *LogController* | *-* | *showLog(), filterLog()* |
| *C32* | *AdminSistem* | *accountId* | *getAccountId()* |

<br>

## 5.3 Diagram Kelas Keseluruhan

<p align="center">
<img alt="Class Diagram Keseluruhan" src="./assets/diagram/Diagram Kelas Keseluruhan.png" width="70%">
</p>
<p align="center">
<i>Gambar 14. Diagram Kelas Keseluruhan</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C01* | *AkunPengguna* | *accountId, email, password, tipeAkun* | *register(), login(), logout(), getAccountId()* |
| *C02* | *Pendaftaran* | *idPendaftaran, tanggalDaftar, statusVerifikasi* | *ajukanPendaftaran(), updateStatus(), getStatus()* |
| *C03* | *DokumenPendukung* | *idDokumen, namaFile, tipeDokumen* | *unggahDokumen(), getDokumen()* |
| *C04* | *VerifikasiController* | *-* | *tampilkanDaftarPendaftar(), prosesVerifikasi()* |
| *C05* | *Produk* | *idProduk, namaProduk, kategori* | *tambahProduk(), getProduk()* |
| *C06* | *DataPenjualan* | *idPenjualan, tanggal, jumlahTerjual, jumlahTersisa* | *catatPenjualan(), getDataHistoris()* |
| *C07* | *PrediksiProduksi* | *idPrediksi, tanggalPrediksi, jumlahPrediksi* | *hitungPrediksi(), getHasilPrediksi()* |
| *C08* | *ProdukSurplus* | *idSurplus, jumlah, batasWaktuPengambilan, status* | *updateStatus(), getDetailSurplus(), getStatus(), setStatus()* |
| *C09* | *MetodeDistribusiSurplus* | *idDistribusi, jenisDistribusi, harga* | *pilihMetodeDistribusi(), hitungHargaDiskon(), getInfoDistribusi()* |
| *C10* | *DokumenKlaim* | *claimId, ngoId, claimTime* | *recordClaim(), getClaimTime()* |
| *C11* | *LogAktivitas* | *logId, activity, time* | *recordLog(), getActivity()* |
| *C12* | *RegistrasiPage* | *-* | *tampilkanFormRegistrasi()* |
| *C13* | *VerifikasiPage* | *-* | *tampilkanDaftarVerifikasi(), tampilkanDetailPendaftar()* |
| *C14* | *StatusPendaftaranPage* | *-* | *tampilkanStatusPendaftaran()* |
| *C15* | *PenjualanPage* | *-* | *tampilkanFormPenjualan(), inputDataPenjualan()* |
| *C16* | *PrediksiPage* | *-* | *tampilkanHasilPrediksi()* |
| *C17* | *ProdukSurplusPage* | *-* | *tampilkanFormSurplus(), simpanSurplus(), resetForm()* |
| *C18* | *DistribusiSurplusPage* | *-* | *tampilkanOpsiDistribusi()* |
| *C19* | *DaftarSurplusPage* | *-* | *tampilkanDaftarSurplus(), tampilkanFormFilter()* |
| *C20* | *KlaimPage* | *selectedProduct* | *showPage(), submitClaim()* |
| *C21* | *PengambilanPage* | *-* | *tampilkanDetailPengambilan(), konfirmasiPengambilan()* |
| *C22* | *LogAktivitasPage* | *displayedLogList, filterInput* | *showPage(), applyFilter()* |
| *C23* | *AuthController* | *-* | *registrasiAkun(), cekStatusPendaftaran()* |
| *C24* | *PenjualanController* | *-* | *validasiDataPenjualan(), simpanDataPenjualan()* |
| *C25* | *PrediksiController* | *-* | *cekSyaratData(), jalankanPrediksi()* |
| *C26* | *ProdukSurplusController* | *-* | *validasiDataSurplus(), simpanDataSurplus(), validasiMetodeDistribusi(), simpanMetodeDistribusi()* |
| *C27* | *SurplusController* | *-* | *urutkanBerdasarkanJarak(), ambilDaftarSurplus(), saringProdukSurplus(), cariProdukSurplus()* |
| *C28* | *KlaimController* | *-* | *checkAvailability(), approveClaim()* |
| *C29* | *LogController* | *-* | *showLog(), filterLog()* |
| *C30* | *PemilikFnB* | *accountId, namaUsaha, alamatUsaha, jamOperasional* | *getAccountId(), aturDistribusiSurplus()* |
| *C31* | *PerwakilanNGO* | *accountId, namaOrganisasi, nomorLegalitas, lokasi* | *getAccountId(), lihatDaftarSurplus(), saringDaftarSurplus()* |
| *C32* | *AdminSistem* | *accountId, kewenangan* | *getAccountId(), verifikasiPendaftaran()* |

---

# BAB 6: Traceability

| ID Kelas | ID Use Case | ID KF |
| :--- | :--- | :--- |
| *C01* | *UC01, UC02, UC03, UC06, UC07, UC08, UC09, UC10, UC11, UC12* | *KF01, KF02, KF03, KF04, KF08, KF09, KF10, KF11, KF12, KF13, KF14, KF15* |
| *C02* | *UC01, UC02, UC03* | *KF01, KF02, KF03, KF04* |
| *C03* | *UC01, UC02* | *KF01, KF02, KF03* |
| *C04* | *UC02* | *KF02, KF03* |
| *C05* | *UC04, UC05, UC06* | *KF05, KF06, KF07, KF08* |
| *C06* | *UC04, UC05* | *KF05, KF06, KF07* |
| *C07* | *UC05* | *KF06, KF07* |
| *C08* | *UC06, UC07, UC08, UC09, UC10, UC11* | *KF08, KF09, KF10, KF11, KF12, KF13, KF14* |
| *C09* | *UC07, UC08, UC09* | *KF09, KF10, KF11, KF12* |
| *C10* | *UC10, UC11* | *KF13, KF14* |
| *C11* | *UC12* | *KF15* |
| *C12* | *UC01* | *KF01* |
| *C13* | *UC02* | *KF02, KF03* |
| *C14* | *UC03* | *KF04* |
| *C15* | *UC04* | *KF05* |
| *C16* | *UC05* | *KF06, KF07* |
| *C17* | *UC06* | *KF08* |
| *C18* | *UC07* | *KF09* |
| *C19* | *UC08, UC09* | *KF10, KF11, KF12* |
| *C20* | *UC10* | *KF13* |
| *C21* | *UC11* | *KF14* |
| *C22* | *UC12* | *KF15* |
| *C23* | *UC01, UC03* | *KF01, KF04* |
| *C24* | *UC04* | *KF05* |
| *C25* | *UC05* | *KF06, KF07* |
| *C26* | *UC06, UC07* | *KF08, KF09* |
| *C27* | *UC08, UC09* | *KF10, KF11, KF12* |
| *C28* | *UC10, UC11* | *KF13, KF14* |
| *C29* | *UC12* | *KF15* |
| *C30* | *UC01, UC02, UC03, UC04, UC05, UC06, UC07, UC11* | *KF01, KF02, KF03, KF04, KF05, KF06, KF07, KF08, KF09, KF14* |
| *C31* | *UC01, UC02, UC03, UC08, UC09, UC10, UC11* | *KF01, KF02, KF03, KF04, KF10, KF11, KF12, KF13, KF14* |
| *C32* | *UC02* | *KF02, KF03* |

---

# Referensi
- Diagram UML: [https://www.drawio.com/](https://www.drawio.com/), [https://staruml.io/](https://staruml.io/)
