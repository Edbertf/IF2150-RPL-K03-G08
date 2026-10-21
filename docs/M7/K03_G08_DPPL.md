<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 5
<br>
DESKRIPSI PERANCANGAN PERANGKAT LUNAK (DPPL)
</h1>
<br>

## *FoodLink*
### *[Logo Perangkat Lunak]*

### Untuk: *Angel*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *03* |
| Kelompok | *08*  |

| NIM       | Nama               |
| --------- | ------------------ |
| *13525024* | *Excell Timothy Josua Tarigan* |
| *13525036* | *Dylan Frederico Ketaren* |
| *13525111* | *Edbert Fernando* |
| *13525114* | *Ernest Clarence Gunawan* |
| *13525117* | *Abdur Rauuf Fawaaz* |
---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Menyeragamkan nama atribut dan operasi ke Bahasa Indonesia* |
| *B* | *Menghapus atribut accountId pada PemilikFnB, PerwakilanNGO, dan AdminSistem karena sudah diwarisi dari AkunPengguna.* |
| *C* | *Menambahkan operasi untuk merealisasikan skenario use case (validasiKelengkapanData() dan validasiFormatDokumen() pada AuthController; pilihTipeAkun(), kirimFormulir(), tampilkanPesanBerhasil(), dan tampilkanPesanError() pada RegistrasiPage)* |
| *D* | ** |

---

<br>

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini melanjutkan **Spesifikasi Kebutuhan Perangkat Lunak (SKPL)** dan **Arsitektur Perangkat Lunak (APL)**. Gunakan nama, ID, kebutuhan, dan use case yang konsisten dengan kedua dokumen tersebut. Contoh pola ID baru di bawah dapat disesuaikan dengan kesepakatan kelompok, ID yang sudah ada tetap dipertahankan.

<br>

---


# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen Deskripsi Perancangan Perangkat Lunak (DPPL) ini bertujuan untuk menjelaskan rancangan perangkat lunak FoodLink sebagai tindak lanjut dari Spesifikasi Kebutuhan Perangkat Lunak (SKPL) dan Arsitektur Perangkat Lunak (APL). Dokumen ini memuat rancangan arsitektur, identifikasi kelas, interaksi antarkelas, diagram kelas, serta keterkaitan antara kelas dan use case. DPPL digunakan sebagai acuan bagi pengembang dalam mengimplementasikan perangkat lunak FoodLink agar implementasinya sesuai dengan kebutuhan fungsional dan non-fungsional yang telah ditetapkan.

## 1.2 Lingkup Masalah
FoodLink merupakan suatu sistem perangkat lunak yang bertujuan untuk mengurangi pemborosan makanan dengan menghubungkan pemilik usaha F&B dan juga organisasi non-pemerintah (NGO). Sistem membantu pemilik F&B untuk mencatat data penjualan dan sisa produk harian untuk menghasilkan rekomendasi produksi, serta menyediakan akses untuk mengumumkan produk surplus yang dapat didonasikan atau dijual lagi dengan harga diskon. Sementara itu, NGO dapat menemukan, menyaring, dan mengklaim produk surplus di sekitar lokasinya. Dengan begitu, FoodLink akan mendukung pencapaian SDG 12 dan SDG 2.

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
Aturan penomoran (ID) yang digunakan dalam dokumen ini.

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| *Kebutuhan Fungsional* | *KFXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Kebutuhan Non-Fungsional* | *KNFXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Aktor* | *AXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Use Case* | *UCXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Kelas* | *CXX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |

## 1.5 Referensi
- K03_G08_SKPL.md
- K03_G08_APL.md
- Powerpoint Asistensi Akbar Milestone 7: https://itbdsti.sharepoint.com/:b:/s/2026IF2150RPL/IQDhmm3v8h_hQIHezJVhxoFJAfh5_OHdceaRPVDrmP43HMs?e=00IvJy
- Slide materi perkuliahan IF2150 RPL: https://drive.google.com/drive/folders/1SWxicyDoWrjlpJ18f9Oe_IuCYA-qGmrf?usp=sharing

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Dokumen DPPL FoodLink terdiri atas lima bab utama. Bab 1 menjelaskan tujuan, lingkup masalah, definisi istilah, aturan penomoran, dan referensi. Bab 2 menjelaskan rancangan lingkungan implementasi, pola arsitektur, serta identifikasi komponen perangkat lunak. Bab 3 menjelaskan realisasi use case melalui identifikasi kelas, sequence diagram, dan diagram kelas. Bab 4 menyajikan diagram kelas keseluruhan beserta daftar atribut dan operasi kelas. Bab 5 menjelaskan matriks kerunutan yang menghubungkan kelas perancangan dengan use case terkait.

<br>

---

# BAB 2: Perancangan Arsitektur

## 2.1 Rancangan Lingkungan Implementasi

Tabel 2.1. Lingkungan Implementasi

| Komponen | Spesifikasi |
| :--- | :--- |
| *Operating System* | *Cross-platform (Windows/Linux/macOS) melalui browser* |
| *DBMS* | *PostgreSQL 15* |
| *Development Tools* | *Visual Studio Code, Git dan GitHub, serta draw.io untuk pembuatan diagram* |
| *Filing System* | *Dokumen pendaftaran (PDF/JPG/PNG, maksimal 5 MB per berkas) disimpan pada file system server, sedangkan metadatanya disimpan di PostgreSQL* |
| *Bahasa Pemrograman* | *JavaScript (Node.js v20 dengan Express.js) di sisi server, serta HTML5, CSS, dan JavaScript di sisi klien* |

FoodLink dibangun dengan Node.js dan Express.js, yang tidak menyediakan struktur MVC secara bawaan. Karena itu, pola MVC diterapkan dengan mengelompokkan kode sesuai Tabel 2.3. Komponen *Model* menjadi modul yang mengakses PostgreSQL, komponen *View* menjadi halaman HTML yang ditampilkan ke pengguna, dan komponen *Controller* menjadi penangan *route* Express yang menerima permintaan dari View, memanggil Model, lalu memilih View yang ditampilkan.

## 2.2 Style/Pattern Arsitektur Acuan

### 2.2.1 Style/Pattern FoodLink
FoodLink menggunakan arsitektur MVC (Model-View-Controller) sebagai architectural pattern acuan. MVC memisahkan penyajian informasi, koordinasi alur use case, dan pengelolaan data beserta aturan domainnya ke dalam tiga bagian dengan tanggung jawab yang berbeda. Berikut peran masing-masing komponen:
* Model: Bertanggung jawab menyimpan dan mengelola data aplikasi, termasuk logika untuk berinteraksi dengan basis data (PostgreSQL). Model merepresentasikan struktur data seperti akun pengguna, pendaftaran, produk surplus, dan data penjualan
* View: Halaman antarmuka web yang ditampilkan kepada Pemilik F&B, Perwakilan NGO, dan Admin Sistem. View hanya menampilkan data dan meneruskan aksi pengguna (*user events*) ke Controller, tanpa memuat aturan pengolahan data.
* Controller: Menjembatani interaksi antara View dan Model. Controller menerima permintaan dari View (misalnya saat pengguna menekan tombol submit), memvalidasi dan memproses data, lalu memerintahkan Model untuk menyimpan/mengambil data, dan menentukan View mana yang akan ditampilkan sebagai respons.

### 2.2.2 Alasan Pemilihan

MVC dipilih sebagai arsitektur acuan FoodLink karena kesesuaiannya dengan karakteristik sistem, baik dari sisi Kebutuhan Fungsional (KF) maupun Kebutuhan Non-Fungsional (KNF).

FoodLink memiliki tiga jenis pengguna (Pemilik F&B, Perwakilan NGO, Admin Sistem) dengan tampilan (View) berbeda-beda, namun beberapa di antaranya mengakses dan memperbarui *state* data yang sama. Misalnya, ProdukSurplus ditampilkan di DaftarSurplusPage (NGO) sekaligus diatur di DistribusiSurplusPage (Pemilik F&B). Pemisahan MVC memungkinkan kedua View ini berbagi Model yang sama tanpa duplikasi logika pengolahan data.

Dari sisi KF, mayoritas kebutuhan FoodLink berbentuk proses pencatatan dan penampilan data yang diakses lebih dari satu jenis pengguna, sehingga logika cukup didefinisikan sekali pada Controller dan Model, lalu dipakai ulang oleh berbagai View. Dari sisi KNF, kebutuhan seperti maintainability, response time, portability, dan reliability juga sesuai dengan prinsip pemisahan tanggung jawab MVC, karena masing-masing dapat ditangani secara terisolasi tanpa saling memengaruhi lapisan lain.

Secara keseluruhan, pemisahan tanggung jawab MVC, yaitu data terpusat di *Model*, tampilan fleksibel di *View*, dan logika bisnis terisolasi di *Controller*, sejalan dengan kebutuhan FoodLink seperti sistem yang modular, responsif, cepat, dan andal.

<p align="center">
<img alt="Contoh Arsitektur MVC" src="./assets/diagram/Gambar 1. Arsitektur MVC FoodLink.jpg" width="70%">
</p>
<p align="center">
<i>Gambar 1. Arsitektur MVC FoodLink</i>
</p>

## 2.3 Identifikasi Komponen / Modul / Subsistem

Identifikasi komponen, modul, atau subsistem penyusun aplikasi berdasarkan *pattern* yang telah ditetapkan. Jelaskan tanggung jawab masing-masing komponen. Pengelompokan dapat mengikuti lapisan arsitektur atau fungsi/peran komponen dalam sistem.

Ambil dari **Tabel 2.1 dokumen APL**, lalu kelompokkan berdasarkan lapisan (Model/View/Controller). Kolom **Jenis** diisi sesuai pattern, misalnya View, Controller, Model, Service, Repository. Satu komponen merepresentasikan saatu tanggung jawab utama yang jelas,

Tabel 2.3. Identifikasi Komponen/Modul/Subsistem

| Nama Komponen/Modul/Subsistem | Jenis | Penjelasan |
| :---------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------- |
| *PendaftaranView* | *View* | *Menampilkan formulir registrasi sesuai dengan tipe akun yang didaftarkan beserta tempat untuk upload dokumen yang dibutuhkan untuk pendaftaran. Akan ditampilkan juga status pendaftaran dan aksi pengguna akan diteruskan ke AuthController. (C12 & C14)* |
| *VerifikasiView* | *View* | *Menampilkan antarmuka daftar serta detail pendaftar untuk admin yang akan diteruskan ke VerifikasiController. (C13)* |
| *PenjualanPrediksiView* | *View* | *Menampilkan formulir untuk input data penjualan harian dan juga dashboard hasil prediksi produksi yang akan diteruskan ke PenjualanController dan PrediksiController. (C15 & C16)* |
| *SurplusPemilikView* | *View* | *Menampilkan antarmuka untuk menginput produk surplus dan juga pengaturan untuk metode distribusi surplus yang akan diteruskan ke ProdukSurplusController. (C17 & C18)* |
| *SurplusNGOView* | *View* | *Menampilkan antarmuka terkait produk surplus, mulai dari daftar dan detil produk serta fitur penyaringan produk hingga antarmuka untuk mengajukan klaim yang akan diteruskan ke SurplusController dan KlaimController. (C19 & C20)* |
| *PengambilanView* | *View* | *Menampilkan antarmuka untuk konfirmasi klaim produk surplus yang akan diteruskan ke KlaimController. (C21)* |
| *LogView* | *View* | *Menampilkan dashboard log aktivitas untuk admin yang akan diteruskan ke LogController. (C22)* |
| *AuthController* | *Controller* | *Memproses registrasi akun dan mengecek status pendaftaran. (C23)* |
| *VerifikasiController* | *Controller*  | *Memproses keputusan verifikasi saat pendaftaran dan menangani proses pemeriksaan. (C04)* |
| *PenjualanController* | *Controller* | *Memvalidasi data penjualan harian dan menyimpannya. (C24)* |
| *PrediksiController* | *Controller* | *Memvalidasi data historis dan menjalankan algoritma untuk menghasilkan rekomendasi produksi. (C25)* |
| *ProdukSurplusController* | *Controller* | *Memvalidasi dan menyimpan data terkait produk surplus serta metode distribusinya. (C26)* |
| *SurplusController* | *Controller* | *Mengurutkan produk surplus berdasarkan beberapa kategori seperti jarak dan jenis. (C27)* |
| *KlaimController* | *Controller* | *Memvalidasi ketersediaan produk surplus dan menyetujui klaim serta memproses konfirmasi pengambilan produk. (C28)* |
| *LogController* | *Controller* | *Menampilkan dan juga menyaring log aktivitas pengguna untuk admin. (C29)* |
| *AkunModel* | *Model* | *Menyimpan data akun dan identitas pengguna beserta sub kelasnya. (C01, C30, C31, C32)* |
| *PendaftaranModel* | *Model* | *Menyimpan data registrasi beserta statusnya dan juga dokumen pendukung yang diunggah oleh pendaftar. (C02 & C03)* |
| *PenjualanModel* | *Model* | *Menyimpan jenis produk, data penjualan dan sisa harian, dan hasil prediksi produksi. (C05, C06, C07)* |
| *SurplusModel* | *Model* | *Menyimpan informasi produk surplus, pilihan distribusi surplus, dan juga catatan NGO yang mengklaim produk surplus. (C08, C09, C10)* |
| *LogModel* | *Model* | *Menyimpan informasi terkait pengguna, aktivitas, dan waktu. (C11)* |
| *GeolocationAdapter* | *Integrasi Eksternal* | *Menghubungkan SurplusController dengan layanan peta pihak ketiga untuk mengonversi alamat pemilik F&B dan lokasi NGO menjadi koordinat untuk menghitung jaraknya.* |
| *Database* | *Penyimpanan Data* | *Menyimpan data secara persisten pada PostgreSQL 15, diakses oleh seluruh komponen Model.* |

## 2.4 Model Arsitektur Perangkat Lunak

### 2.4.1 Logical View

Gambar 2 adalah *Logical View* FoodLink. Untuk memodelkan struktur arsitektur aplikasi FoodLink, kami memilih *Logical View* sebagai representasi utama. *Logical View* dipilih karena model ini sangat efektif untuk memvisualisasikan dekomposisi fungsional sistem ke dalam unit-unit yang lebih kecil dan terorganisasi. Pada aplikasi FoodLink yang menggunakan pola arsitektur Model-View-Controller (MVC), *Logical View* memudahkan pengembang untuk melihat pemisahan tanggung jawab secara terstruktur, mulai dari antarmuka pengguna (View), pengontrol logika bisnis (Controller), hingga pengelolaan data (Model). Melalui view ini, aliran permintaan dari View ke Controller, akses Controller ke Model, penyimpanan data dari Model ke Database, serta pemakaian layanan eksternal oleh Controller dapat dipetakan dengan jelas, sehingga setiap Kebutuhan Fungsional (KF) dapat ditelusuri ke komponen yang mengerjakannya tanpa tumpang tindih logika.

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/Gambar 2. Logical View FoodLink.jpg" width="100%">
</p>
<p align="center">
<i>Gambar 2. Logical View FoodLink</i>
</p>

<br>

---


# BAB 3: Realisasi Use Case

## 3.1 Use Case Melakukan Registrasi Akun

**ID Use Case:** *UC01*  
**Nama Use Case:** *Melakukan Registrasi Akun*

### 3.1.1 Identifikasi Kelas

Tabel 3.1 Identifikasi Kelas Use Case UC01

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *RegistrasiPage (C12)* | *RegistrasiPage (C12)* |
| 2 | *AuthController (C23)* | *AuthController (C23)* |
| 3 | *AkunPengguna (C01)* | *AkunPengguna (C01)* |
| 4 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |
| 5 | *PerwakilanNGO (C31)* | *PerwakilanNGO (C31)* |
| 6 | *Pendaftaran (C02)* | *Pendaftaran (C02)* |
| 7 | *DokumenPendukung (C03)* | *DokumenPendukung (C03)* |

### 3.1.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC01 - Skenario Normal" src="./assets/diagram/Gambar 3.1.1. Sequence Diagram UC01 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.1.1 Sequence Diagram UC01</i>
</p>

- **Skenario Alternatif 1: Data Tidak Lengkap atau Dokumen Tidak Valid**

<p align="center">
<img alt="Sequence Diagram UC01 - Data Tidak Lengkap atau Dokumen Tidak Valid" src="./assets/diagram/Gambar 3.1.2. Sequence Diagram UC01 - Data Tidak Lengkap atau Dokumen Tidak Valid.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.1.2 Sequence Diagram UC01 - Data Tidak Lengkap atau Dokumen Tidak Valid</i>
</p>

### 3.1.3 Diagram Kelas

Buatlah diagram kelas untuk use case ini yang terdiri atas kelas-kelas dari 3.1.1. **Setiap kelas pada diagram wajib menampilkan atribut dan metode/operasi langsung di dalam kotak kelasnya**, sehingga tidak perlu membuat tabel daftar atribut dan metode per kelas pada subbab ini. Daftar lengkap atribut dan metode seluruh kelas disajikan pada Tabel 4.1 (Bab 4).

<p align="center">
<img alt="Diagram Kelas Melakukan Registrasi Akun" src="./assets/diagram/Gambar 3.1.3. Diagram Kelas Melakukan Registrasi Akun.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.1.3 Diagram Kelas Melakukan Registrasi Akun</i>
</p>

## 3.2 Use Case Memverifikasi Pendaftaran Akun

**ID Use Case:** *UC02*  
**Nama Use Case:** *Memverifikasi Pendaftaran Akun*

### 3.2.1 Identifikasi Kelas

Tabel 3.2 Identifikasi Kelas Use Case UC02

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *RegistrasiPage (C12)* | *RegistrasiPage (C12)* |
| 2 | *AuthController (C23)* | *AuthController (C23)* |
| 3 | *AkunPengguna (C01)* | *AkunPengguna (C01)* |
| 4 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |
| 5 | *PerwakilanNGO (C31)* | *PerwakilanNGO (C31)* |
| 6 | *Pendaftaran (C02)* | *Pendaftaran (C02)* |
| 7 | *DokumenPendukung (C03)* | *DokumenPendukung (C03)* |

### 3.2.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC02 - Skenario Normal" src="./assets/diagram/Gambar 3.2.1. Sequence Diagram UC02 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.2.1 Sequence Diagram UC02</i>
</p>

- **Skenario Alternatif 1: Pendaftaran Ditolak**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/Gambar 3.2.2. Sequence Diagram UC02 - Pendaftaran Ditolak.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.2.2 Sequence Diagram UC02 - Pendaftaran Ditolak</i>
</p>

### 3.1.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Memverifikasi Pendaftaran Akun" src="./assets/diagram/Gambar 3.2.3. Diagram Kelas Memverifikasi Pendaftaran Akun.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.2.3 Diagram Kelas Memverifikasi Pendaftaran Akun</i>
</p>

## 3.3 Use Case Menampilkan Status Pendaftaran

**ID Use Case:** *UC03*  
**Nama Use Case:** *Menampilkan Status Pendaftaran*

### 3.3.1 Identifikasi Kelas

Tabel 3.3 Identifikasi Kelas Use Case UC03

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *Pendaftaran (C02)* | *Pendaftaran (C02)* |
| 2 | *StatusPendaftaranPage (C14)* | *StatusPendaftaranPage (C14)* |
| 3 | *AuthController (C23)* | *AuthController (C23)* |
| 4 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |
| 5 | *PerwakilanNGO (C31)* | *PerwakilanNGO (C31)* |

### 3.3.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC03 - Skenario Normal" src="./assets/diagram/Gambar 3.3.1. Sequence Diagram UC03 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.3.1 Sequence Diagram UC03</i>
</p>

- **Skenario Alternatif 1: Status Pendaftaran Ditolak**

<p align="center">
<img alt="Sequence Diagram UC03 - Status Pendaftaran Ditolak" src="./assets/diagram/Gambar 3.3.2. Sequence Diagram UC03 - Status Pendaftaran Ditolak.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.3.2 Sequence Diagram UC03 - Status Pendaftaran Ditolak</i>
</p>

### 3.3.3 Diagram Kelas

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/Gambar 3.3.3 Diagram Kelas UC03 - Melihat Status Pendaftaran.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.3.3 Diagram Kelas Melihat Status Pendaftaran</i>
</p>

## 3.4 Use Case Mencatat Data Penjualan Harian

**ID Use Case:** *UC04*  
**Nama Use Case:** *Mencatat Data Penjualan Harian*

### 3.4.1 Identifikasi Kelas

Tabel 3.4 Identifikasi Kelas Use Case UC04

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |
| 2 | *PenjualanPage (C15)* | *PenjualanPage (C15)* |
| 3 | *PenjualanController (C24)* | *PenjualanController (C24)* |
| 4 | *DataPenjualan (C06)* | *DataPenjualan (C06)* |
| 5 | *Produk (C05)* | *Produk (C05)* |

### 3.4.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC03 - Skenario Normal" src="./assets/diagram/Gambar 3.4.1. Sequence Diagram UC04 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.4.1 Sequence Diagram UC04</i>
</p>

- **Skenario Alternatif 1: Format Isian Tidak Valid**

<p align="center">
<img alt="Sequence Diagram UC03 - Format Isian Tidak Valid" src="./assets/diagram/Gambar 3.4.2. Sequence Diagram UC04 - Format Isian Tidak Valid.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.4.2 Sequence Diagram UC04 - Format Isian Tidak Valid</i>
</p>

### 3.4.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas UC04 - Mencatat Data Penjualan Harian" src="./assets/diagram/Gambar 3.4.3 Diagram Kelas UC04 - Mencatat Data Penjualan Harian .png" width="35%">
</p>
<p align="center">
<i>Gambar 3.4.3 Diagram Kelas Mencatat Data Penjualan Harian</i>
</p>

## 3.5 Use Case Melihat Hasil Prediksi Produksi

**ID Use Case:** *UC05*  
**Nama Use Case:** *Melihat Hasil Prediksi Produksi*

### 3.5.1 Identifikasi Kelas

Tabel 3.5 Identifikasi Kelas Use Case UC05

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *PrediksiPage (C16)* | *PrediksiPage (C16)* |
| 2 | *PrediksiController (C25)* | *PrediksiController (C25)* |
| 3 | *DataPenjualan (C06)* | *DataPenjualan (C06)* |
| 4 | *PrediksiProduksi (C07)* | *PrediksiProduksi (C07)* |
| 5 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |

### 3.5.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC05 - Skenario Normal" src="./assets/diagram/Gambar 3.5.1. Sequence Diagram UC05 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.5.1. Sequence Diagram UC05 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Data Historis Belum Memenuhi Syarat Minimal**

<p align="center">
<img alt="Sequence Diagram UC05 - Data Historis Belum Memenuhi Syarat Minimal" src="./assets/diagram/Gambar 3.5.2. Sequence Diagram UC05 - Data Historis Belum Memenuhi Syarat Minimal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.5.2. Sequence Diagram UC05 - Data Historis Belum Memenuhi Syarat Minimal</i>
</p>

### 3.5.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas UC05 - Melihat Hasil Prediksi Produksi" src="./assets/diagram/Gambar 3.5.3 Diagram Kelas Melihat Hasil Prediksi Produksi.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.5.3 Diagram Kelas Melihat Hasil Prediksi Produksi</i>
</p>

## 3.6 Use Case Mencatat Produk Surplus

**ID Use Case:** *UC06*  
**Nama Use Case:** *Mencatat Produk Surplus*

### 3.6.1 Identifikasi Kelas

Tabel 3.6 Identifikasi Kelas Use Case UC06

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *ProdukSurplusPage (C17)* | *ProdukSurplusPage (C17)* |
| 2 | *ProdukSurplusController (C26)* | *ProdukSurplusController (C26)* |
| 3 | *ProdukSurplus (C08)* | *ProdukSurplus (C08)* |
| 4 | *Produk (C05)* | *Produk (C05)* |
| 5 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |

### 3.6.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC06 - Skenario Normal" src="./assets/diagram/Gambar 3.6.1. Sequence Diagram UC06 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.6.1. Sequence Diagram UC06 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Mereset Isian Formulir**

<p align="center">
<img alt="Sequence Diagram UC06 - Mereset Isian Formulir" src="./assets/diagram/Gambar 3.6.2 Sequence Diagram UC06 - Mereset Isian Formulir.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.6.2 Sequence Diagram UC06 - Mereset Isian Formulir</i>
</p>

### 3.6.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas UC06 - Mencatat Produk Surplus" src="./assets/diagram/Gambar 3.6.3 Diagram Kelas Mencatat Produk Surplus.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.6.3 Diagram Kelas Mencatat Produk Surplus</i>
</p>

### 3.7.1 Identifikasi Kelas

Tabel 3.7 Identifikasi Kelas Use Case UC07

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *DistribusiSurplusPage* (C18) | *AkunPengguna* (C01) |
| 2 | *ProdukSurplusController* (C26) | *ProdukSurplus* (C08) |
| 3 | *ProdukSurplus* (C08) | *ProdukSurplus* (C08) |
| 4 | *MetodeDistribusiSurplus* (C09) | *MetodeDistribusiSurplus* (C09) |

### 3.7.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC07 - Skenario Normal" src="./assets/diagram/Gambar 3.7.1. Sequence Diagram UC07 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.7.1 Sequence Diagram UC07 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Pemilik F&B Memilih Donasi**

<p align="center">
<img alt="Sequence Diagram UC07 - Memilih Donasi" src="./assets/diagram/Gambar 3.7.2. Sequence Diagram UC07 - Memilih Donasi.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.7.2 Sequence Diagram UC07 - Memilih Donasi</i>
</p>

- **Skenario Alternatif 2: Harga Penjualan Tidak Valid**

<p align="center">
<img alt="Sequence Diagram UC07 - Harga Tidak Valid" src="./assets/diagram/Gambar 3.7.3. Sequence Diagram UC07 - Harga Penjualan Tidak Valid.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.7.3 Sequence Diagram UC07 - Harga Penjualan Tidak Valid</i>
</p>

### 3.7.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Mengatur Metode Distribusi Surplus" src="./assets/diagram/Gambar 3.7.4. Diagram Kelas Mengatur Metode Distribusi Surplus.png" width="40%">
</p>
<p align="center">
<i>Gambar 3.7.4 Diagram Kelas Mengatur Metode Distribusi Surplus</i>
</p>

## 3.8 Use Case Melihat Informasi Produk Surplus

**ID Use Case:** *UC08*  
**Nama Use Case:** *Melihat Informasi Produk Surplus*

### 3.8.1 Identifikasi Kelas

Tabel 3.8 Identifikasi Kelas Use Case UC08

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *DaftarSurplusPage* (C19) | *AkunPengguna* (C01) |
| 2 | *SurplusController* (C27) | *ProdukSurplus* (C08) |
| 3 | *ProdukSurplus* (C08) | *ProdukSurplus* (C08) |
| 4 | *MetodeDistribusiSurplus* (C09) | *MetodeDistribusiSurplus* (C09) |
| 5 | *GeolocationAdapter* (ID belum ditetapkan) | *ProdukSurplus* (C08) |

### 3.8.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC08 - Skenario Normal"  src="./assets/diagram/Gambar 3.8.1. Sequence Diagram UC08 - Skenario Normal.png" width="40%">
</p>
<p align="center">
<i>Gambar 3.8.1 Sequence Diagram UC08 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Lokasi Pengguna Belum Tersedia**

<p align="center">
<img alt="Sequence Diagram UC08 - Lokasi Belum Tersedia" src="./assets/diagram/Gambar 3.8.2. Sequence Diagram UC08 - Lokasi Pengguna Belum Tersedia.png" width="40%">
</p>
<p align="center">
<i>Gambar 3.8.2 Sequence Diagram UC08 - Lokasi Pengguna Belum Tersedia</i>
</p>

### 3.8.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Melihat Informasi Produk Surplus" src="./assets/diagram/Gambar 3.8.3. Diagram Kelas Melihat Informasi Produk Surplus.png" width="40%">
</p>
<p align="center">
<i>Gambar 3.8.3 Diagram Kelas Melihat Informasi Produk Surplus</i>
</p>

<br>



---

# BAB 4: Diagram Kelas Keseluruhan

## 4.1 Diagram Kelas

**Bagian ini diisi dengan diagram kelas keseluruhan.**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-class_diargam.png" width="35%">
</p>
<p align="center">
<i>Gambar 4.1. Diagram Kelas Perancangan Keseluruhan [Nama P/L]</i>
</p>

Tabel 4.1. Daftar Kelas Perancangan Keseluruhan

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C01* | *AkunPengguna* | *idAkun, email, kataSandi, tipeAkun* | *registrasi()* |
| *C02* | *Pendaftaran* | *idPendaftaran, tanggalDaftar, statusVerifikasi* | *ajukanPendaftaran()* |
| *C03* | *DokumenPendukung* | *idDokumen, namaFile, tipeDokumen* | *unggahDokumen()* |
| *C12* | *RegistrasiPage* | *-* | *pilihTipeAkun(), tampilkanFormRegistrasi(), kirimFormulir(), tampilkanPesanBerhasil(), tampilkanPesanError()* |
| *C23* | *AuthController* | *-* | *registrasiAkun(), validasiKelengkapanData(), validasiFormatDokumen()* |
| *C30* | *PemilikFnB* | *namaUsaha, alamatUsaha, jamOperasional* | ** |
| *C31* | *PerwakilanNGO* | *namaOrganisasi, nomorLegalitas, lokasi* | ** |
| *...* | *...* | *...* | *...* |

<br>

---

# BAB 5: Matriks Kerunutan

Petakan kelas perancangan dengan use case yang terkait. Gunakan **BAB 6 Traceability pada dokumen SKPL** sebagai acuan keterkaitan kelas analisis dan use case, lalu sesuaikan dengan realisasi use case dan kelas perancangan pada BAB 3–BAB 5 DPPL.

Tabel 7.1. Matriks Kerunutan Kelas terhadap Use Case

| Kelas | Use Case Terkait |
| :--- | :--- |
| *[ID kelas - Nama kelas]* | *[ID UC - Nama use case]* |
| *[ID kelas - Nama kelas]* | *[ID UC - Nama use case]* |
| *...* | *...* |
