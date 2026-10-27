<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 5
<br>
DESKRIPSI PERANCANGAN PERANGKAT LUNAK (DPPL)
</h1>
<br>

## *FoodLink*
<p align="center">
<img alt="Logo FoodLink" src="./assets/diagram/Logo FoodLink.png" width="50%">

### Untuk: *Angel*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *03* |
| Kelompok | *08*  |

| NIM | Nama |
| --- | --- |
| *13525024* | *Excell Timothy Josua Tarigan* |
| *13525036* | *Dylan Frederico Ketaren* |
| *13525111* | *Edbert Fernando* |
| *13525114* | *Ernest Clarence Gunawan* |
| *13525117* | *Abdur Rauuf Fawaaz* |
---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Merevisi realisasi UC11 dan UC12: mengganti identifikasi kelas pada kedua use case, menyeragamkan penamaan atribut dan operasi ke bahasa Indonesia, lalu mengganti sequence diagram dan class diagram sehingga konsisten dengan perubahan yang dilakukan* |
| *B* | *Merapikan serta menyesuaikan daftar kelas perancangan keseluruhan dengan perubahan yang ada* |
| *C* |  |
| ... |  |

---

<br>

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini melanjutkan **Deskripsi Perancangan Perangkat Lunak**. Gunakan nama, ID, kebutuhan, dan use case yang konsisten dengan kedua dokumen tersebut. Contoh pola ID baru di bawah dapat disesuaikan dengan kesepakatan kelompok, ID yang sudah ada tetap dipertahankan.

<br>

---


# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Tuliskan dengan ringkas tujuan dokumen DPPL ini dibuat dan siapa saja yang akan menggunakan dokumen ini.

## 1.2 Lingkup Masalah
FoodLink merupakan suatu sistem perangkat lunak yang bertujuan untuk mengurangi pemborosan makanan dengan menghubungkan pemilik usaha F&B dan juga organisasi non-pemerintah (NGO). Sistem membantu pemilik F&B untuk mencatat data penjualan dan sisa produk harian untuk menghasilkan rekomendasi produksi, serta menyediakan akses untuk mengumumkan produk surplus yang dapat didonasikan atau dijual lagi dengan harga diskon. Sementara itu, NGO dapat menemukan, menyaring, dan mengklaim produk surplus di sekitar lokasinya. Dengan begitu, FoodLink akan mendukung pencapaian SDG 12 dan SDG 2.

## 1.3 Definisi, Istilah, dan Singkatan
Semua definisi dan singkatan yang digunakan dalam dokumen ini beserta penjelasannya.

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| *P/L* | *Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu.* |
| *SKPL* | *Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya.* |
| *DPPL* | *Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya.* |
| *KF* | *Singkatan dari Kebutuhan Fungsional.* |
| *KNF* | *Singkatan dari Kebutuhan Non-Fungsional.* |
| *UC* | *Singkatan dari Use Case.* |
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
- K03_G08_DPPL.md
- Slide materi perkuliahan IF2150 RPL: https://drive.google.com/drive/folders/1SWxicyDoWrjlpJ18f9Oe_IuCYA-qGmrf?usp=sharing

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Tuliskan sistematika pembahasan dokumen ini secara ringkas dan runut, dengan maksimal 1 paragraf.

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
<img alt="Arsitektur MVC FoodLink" src="./assets/diagram/Gambar 1. Arsitektur MVC FoodLink.jpg" width="70%">
</p>
<p align="center">
<i>Gambar 1. Arsitektur MVC FoodLink</i>
</p>

## 2.3 Identifikasi Komponen / Modul / Subsistem

Tabel 2.3. Identifikasi Komponen/Modul/Subsistem

| Nama Komponen/Modul/Subsistem | Jenis | Penjelasan |
| :--- | :--- | :--- |
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
<img alt="Logical View FoodLink" src="./assets/diagram/Gambar 2. Logical View FoodLink.jpg" width="100%">
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
| 1 | *VerifikasiPage (C13)* | *VerifikasiPage (C13)* |
| 2 | *VerifikasiController (C04)* | *VerifikasiController (C04)* |
| 3 | *AkunPengguna (C01)* | *AkunPengguna (C01)* |
| 4 | *AdminSistem (C32)* | *AdminSistem (C32)* |
| 5 | *Pendaftaran (C02)* | *Pendaftaran (C02)* |
| 6 | *DokumenPendukung (C03)* | *DokumenPendukung (C03)* |

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
<img alt="Sequence Diagram UC02 - Pendaftaran Ditolak" src="./assets/diagram/Gambar 3.2.2. Sequence Diagram UC02 - Pendaftaran Ditolak.png" width="50%">
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
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/Gambar 3.3.3. Diagram Kelas UC03 - Melihat Status Pendaftaran.png" width="35%">
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
<img alt="Diagram Kelas UC04 - Mencatat Data Penjualan Harian" src="./assets/diagram/Gambar 3.4.3. Diagram Kelas UC04 - Mencatat Data Penjualan Harian .png" width="35%">
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
<img alt="Diagram Kelas UC05 - Melihat Hasil Prediksi Produksi" src="./assets/diagram/Gambar 3.5.3. Diagram Kelas Melihat Hasil Prediksi Produksi.png" width="35%">
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
<img alt="Sequence Diagram UC06 - Mereset Isian Formulir" src="./assets/diagram/Gambar 3.6.2. Sequence Diagram UC06 - Mereset Isian Formulir.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.6.2 Sequence Diagram UC06 - Mereset Isian Formulir</i>
</p>

### 3.6.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas UC06 - Mencatat Produk Surplus" src="./assets/diagram/Gambar 3.6.3. Diagram Kelas Mencatat Produk Surplus.png" width="35%">
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
<img alt="Diagram Kelas Mengatur Metode Distribusi Surplus" src="./assets/diagram/Gambar 3.7.4. Diagram Kelas Mengatur Metode Distribusi Surplus.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.7.4 Diagram Kelas Mengatur Metode Distribusi Surplus</i>
</p>

## 3.8 Use Case Melihat Informasi Produk Surplus

**ID Use Case:** *UC08*  
**Nama Use Case:** *Melihat Informasi Produk Surplus*

### 3.8.1 Identifikasi Kelas

Tabel 3.8 Identifikasi Kelas Use Case UC08

| No | Nama Kelas Perancangan | ID | Kelas Analisis Terkait |
|---:|---|---|---|
| 1 | DaftarSurplusPage (Boundary) | C19 | AkunPengguna (C01) |
| 2 | SurplusController (Control) | C27 | ProdukSurplus (C08) |
| 3 | PerwakilanNGO (Entity) | C31 | PerwakilanNGO (C31) |
| 4 | ProdukSurplus (Entity) | C08 | ProdukSurplus (C08) |
| 5 | Produk (Entity) | C05 | Produk (C05) |
| 6 | PemilikFnB (Entity) | C30 | PemilikFnB (C30) |
| 7 | MetodeDistribusiSurplus (Entity) | C09 | MetodeDistribusiSurplus (C09) |
| 8 | GeolocationAdapter (Integration) | C33 | Kelas integrasi tambahan untuk melengkapi KF11 |

### 3.8.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC08 - Skenario Normal"  src="./assets/diagram/Gambar 3.8.1. Sequence Diagram UC08 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.8.1 Sequence Diagram UC08 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Lokasi Pengguna Belum Tersedia**

<p align="center">
<img alt="Sequence Diagram UC08 - Lokasi Belum Tersedia" src="./assets/diagram/Gambar 3.8.2. Sequence Diagram UC08 - Lokasi Pengguna Belum Tersedia.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.8.2 Sequence Diagram UC08 - Lokasi Pengguna Belum Tersedia</i>
</p>

### 3.8.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Melihat Informasi Produk Surplus" src="./assets/diagram/Gambar 3.8.3. Diagram Kelas Melihat Informasi Produk Surplus.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.8.3 Diagram Kelas Melihat Informasi Produk Surplus</i>
</p>

## 3.9 Use Case Menyaring Produk Surplus

**ID Use Case:** *UC09*  
**Nama Use Case:** *Menyaring Produk Surplus*

### 3.9.1 Identifikasi Kelas

Tabel 3.9 Identifikasi Kelas Use Case UC09

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *PerwakilanNGO (C31)* | *PerwakilanNGO (C31)* |
| 2 | *DaftarSurplusPage* (C19) | *AkunPengguna* (C01) |
| 3 | *SurplusController* (C27) | *ProdukSurplus* (C08) |
| 4 | *ProdukSurplus* (C08) | *ProdukSurplus* (C08) |
| 5 | *MetodeDistribusiSurplus* (C09) | *MetodeDistribusiSurplus* (C09) |
| 6 | *PenyaringanController* (C34) | *PenyaringanController* (C34) |

### 3.9.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC09 - Skenario Normal"  src="./assets/diagram/Gambar 3.9.1 Sequence Diagram UC09 - Normal.jpg" width="50%">
</p>
<p align="center">
<i>Gambar 3.9.1 Sequence Diagram UC09 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Tidak Ada Produk Sesuai**

<p align="center">
<img alt="Sequence Diagram UC09 - Tidak Ada Produk Sesuai" src="./assets/diagram/Gambar 3.9.2 Sequence Diagram UC09 - Alternatif.jpg" width="50%">
</p>
<p align="center">
<i>Gambar 3.9.2 Sequence Diagram UC09 - Tidak Ada Produk Sesuai</i>
</p>

### 3.9.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Menyaring Produk Surplus" src="./assets/diagram/Gambar 3.9.3 Diagram Kelas Menyaring Produk.jpg" width="35%">
</p>
<p align="center">
<i>Gambar 3.9.3 Diagram Kelas Menyaring Produk Surplus</i>
</p>

## 3.10 Use Case Mengklaim Produk Surplus

**ID Use Case:** *UC10*  
**Nama Use Case:** *Menyaring Produk Surplus*

### 3.10.1 Identifikasi Kelas

Tabel 3.10 Identifikasi Kelas Use Case UC09

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *PerwakilanNGO (C31)* | *PerwakilanNGO (C31)* |
| 2 | *KlaimPage* (C20) | *KlaimPage* (C20) |
| 3 | *KlaimController* (C28) | *KlaimSurplus* (C28) |
| 4 | *SurplusController* (C27) | *ProdukSurplus* (C08) |
| 5 | *MetodeDistribusiSurplus* (C09) | *MetodeDistribusiSurplus* (C09) |
| 6 | *ProdukSurplus* (C08) | *ProdukSurplus* (C08) |
| 7 | *DokumenKlaim* (C10) | *DokumenKlaim* (C10) |

### 3.10.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC10 - Skenario Normal"  src="./assets/diagram/Gambar 3.10.1 Sequence Diagram UC10 - Normal.jpg" width="50%">
</p>
<p align="center">
<i>Gambar 3.10.1 Sequence Diagram UC010 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Produk sudah diklaim NGO lain terlebih dahulu**

<p align="center">
<img alt="Sequence Diagram UC10 - Produk sudah diklaim NGO lain terlebih dahulu" src="./assets/diagram/Gambar 3.10.2 Sequence Diagram UC10 - Alternatif.jpg" width="50%">
</p>
<p align="center">
<i>Gambar 3.10.2 Sequence Diagram UC10 - Produk sudah diklaim NGO lain terlebih dahulu</i>
</p>

### 3.10.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Mengklaim Produk Surplus" src="./assets/diagram/Gambar 3.10.3 Diagram Kelas Mengklaim Produk.jpg" width="35%">
</p>
<p align="center">
<i>Gambar 3.10.3 Diagram Kelas Mengklaim Produk Surplus</i>
</p>

## 3.11 Use Case Mengonfirmasi Pengambilan Produk Surplus

**ID Use Case:** *UC11*  
**Nama Use Case:** *Mengonfirmasi Pengambilan Produk Surplus*

### 3.11.1 Identifikasi Kelas

Tabel 3.11 Identifikasi Kelas Use Case UC11

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:---|:---|:---|
| 1 | *PengambilanPage (C21)* | *PengambilanPage (C21)* |
| 2 | *KlaimController (C28)* | *KlaimController (C28)* |
| 3 | *DokumenKlaim (C10)* | *DokumenKlaim (C10)* |
| 4 | *ProdukSurplus (C08)* | *ProdukSurplus (C08)* |
| 5 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |
| 6 | *PerwakilanNGO (C31)* | *PerwakilanNGO (C31)* |
| 7 | *AkunPengguna (C01)* | *AkunPengguna (C01)* |


### 3.11.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC11 - Skenario Normal" src="./assets/diagram/Gambar 3.11.1. Sequence Diagram UC11 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.11.1 Sequence Diagram UC12</i>
</p>

- **Skenario Alternatif 1: Pemilik F&B atau Perwakilan NGO Ingin Membatalkan Pengonfirmasian Pengambilan Produk Surplus**

<p align="center">
<img alt="Sequence Diagram UC11 - Membatalkan Pengonfirmasian Pengambilan Produk Surplus" src="./assets/diagram/Gambar 3.11.2. Sequence Diagram UC11 - Memilih No.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.11.2 Sequence Diagram UC12 - Membatalkan Pengonfirmasian Pengambilan Produk Surplus</i>
</p>

### 3.11.3 Diagram Kelas

<p align="center">
<img alt="Diagram Kelas Mengonfirmasi Pengambilan Produk Surplus" src="./assets/diagram/Gambar 3.11.3. Diagram Kelas UC11 - Mengonfirmasi Pengambilan Produk Surplus.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.11.3 Diagram Kelas Mengonfirmasi Pengambilan Produk Surplus</i>
</p>

## 3.12 Use Case Mengecek Log Aktivitas Pengguna

**ID Use Case:** *UC12*  
**Nama Use Case:** *Mengecek Log Aktivitas Pengguna*

### 3.12.1 Identifikasi Kelas

Tabel 3.12 Identifikasi Kelas Use Case UC12

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *LogAktivitasPage (C22)* | *LogAktivitasPage (C22)* |
| 2 | *LogController (C29)* | *LogController (C29)* |
| 3 | *LogAktivitas (C11)* | *LogAktivitas (C11)* |
| 4 | *AdminSistem (C32)* | *AdminSistem (C32)* |
| 5 | *AkunPengguna (C01)* | *AkunPengguna (C01)* |

### 3.12.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC12 - Skenario Normal" src="./assets/diagram/Gambar 3.12.1. Sequence Diagram UC12 - Skenario Normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.12.1 Sequence Diagram UC12</i>
</p>

- **Skenario Alternatif 1: Tidak Ada Log yang Sesuai dengan Penyaringan**

<p align="center">
<img alt="Sequence Diagram UC12 - Tidak Ada Log yang Sesuai dengan Penyaringan" src="./assets/diagram/Gambar 3.12.2. Sequence Diagram UC12 - Tidak Ada Log yang Sesuai.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.12.2 Sequence Diagram UC12 - Tidak Ada Log yang Sesuai dengan Penyaringan</i>
</p>

- **Skenario Alternatif 2: Belum Ada Log Aktivitas**

<p align="center">
<img alt="Sequence Diagram UC12 - Belum Ada Log Aktivitas" src="./assets/diagram/Gambar 3.12.3. Sequence Diagram UC12 - Belum Ada Log Aktivitas.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.12.3 Sequence Diagram UC12 - Belum Ada Log Aktivitas</i>
</p>

### 3.12.3 Diagram Kelas

<p align="center">
<img alt="Sequence Diagram UC12 - Belum Ada Log Aktivitas" src="./assets/diagram/Gambar 3.12.4. Diagram Kelas Mengecek Log Aktivitas Pengguna.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.12.4 Diagram Kelas Mengecek Log Aktivitas Pengguna</i>
</p>

<br>

---

# BAB 4: Diagram Kelas Keseluruhan

## 4.1 Diagram Kelas

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/Gambar 4.1. Diagram Kelas Keseluruhan.png" width="70%">
</p>
<p align="center">
<i>Gambar 4.1. Diagram Kelas Perancangan Keseluruhan FoodLink</i>
</p>

Tabel 4.1. Daftar Kelas Perancangan Keseluruhan

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C01* | *AkunPengguna* | *idAkun, email, kataSandi, tipeAkun* | *registrasi()* |
| *C02* | *Pendaftaran* | *idPendaftaran, tanggalDaftar, statusVerifikasi* | *ajukanPendaftaran(), getDaftarMenungguVerifikasi(), getDetailPendaftar(), updateStatus()* |
| *C03* | *DokumenPendukung* | *idDokumen, namaFile, tipeDokumen* | *unggahDokumen(), getDokumen()* |
| *C04* | *VerifikasiController* | *-* | *tampilkanDaftarPendaftar(), ambilDetailPendaftar(), prosesVerifikasi()* |
| *C05* | *Produk* | *-idProduk, -namaProduk, -kategori* | *+getDetailProduk()* |
| *C06* | *DataPenjualan* | *-idPenjualan, -tanggal, -jumlahTerjual, -jumlahTersisa* | *+getDataHistoris(), +catatPenjualan()* |
| *C07* | *PrediksiProduksi* | *-idPrediksi, -tanggalPrediksi, -jumlahRekomendasi* | *+buatPrediksi(), +getHasilPrediksi()* |
| *C08* | *ProdukSurplus* | *-idSurplus, -jumlah, -batasWaktuPengambilan, -status* | *+simpanProdukSurplus(), +setStatus(), +getDetailSurplus()* |
| *C09* | *MetodeDistribusiSurplus* | *-idDistribusi, -jenisDistribusi, -harga* | *+pilihMetodeDistribusi(), +hitungHargaDiskon(), +getInfoDistribusi()* |
| *C10* | *DokumenKlaim* | *idKlaim, idNgo, waktuKlaim* | *catatKlaim(), getDetailKlaim()* |
| *C11* | *LogAktivitas* | *idLog, aktivitas, waktu* | *catatLog(), getDaftarLog(), cariLog()* |
| *C12* | *RegistrasiPage* | *-* | *pilihTipeAkun(), tampilkanFormRegistrasi(), kirimFormulir(), tampilkanPesanBerhasil(), tampilkanPesanError()* |
| *C13* | *VerifikasiPage* | *-* | *bukaDaftarVerifikasi(), tampilkanDaftarVerifikasi(), pilihPendaftar(), tampilkanDetailPendaftar(), kirimKeputusan()* |
| *C14* | *StatusPendaftaranPage* | *-* | *tampilkanStatusPendaftaran()* |
| *C15* | *PenjualanPage* | *-* | *tampilkanFormPenjualan(), kirimDataPenjualan()* |
| *C16* | *PrediksiPage* | *-* | *+tampilkanDashboardPrediksi(), +tampilkanGrafik(), +tampilkanPesanError()* |
| *C17* | *ProdukSurplusPage* | *-* | *+tampilkanFormulirSurplus(), +kirimDataSurplus(), +resetFormulir(), +tampilkanNotifikasiSukses(), +kosongkanIsian()* |
| *C18* | *DistribusiSurplusPage* | *-* | *+tampilkanOpsiDistribusi()* |
| *C19* | *DaftarSurplusPage* | *-* | *+tampilkanDaftarSurplus(), +tampilkanFormFilter()* |
| *C20* | *KlaimPage* | *produkTerpilih* | *tampilkanHalaman(), kirimKlaim()* |
| *C21* | *PengambilanPage* | *-* | *bukaDetailPengambilan(), tampilkanDetailPengambilan(), tampilkanPopupKonfirmasi(), pilihKonfirmasiPengambilan(), pilihYes(), pilihNo(), tutupPopupKonfirmasi(), tampilkanPesanBerhasil()* |
| *C22* | *LogAktivitasPage* | *daftarLogTampil* | *bukaDashboardLog(), tampilkanDashboardLog(), terapkanFilter(), tampilkanTabelLog(), tampilkanPesanLogKosong()* |
| *C23* | *AuthController* | *-* | *registrasiAkun(), validasiKelengkapanData(), validasiFormatDokumen()* |
| *C24* | *PenjualanController* | *-* | *validasiInputPenjualan(), simpanDataPenjualan()* |
| *C25* | *PrediksiController* | *-* | *+cekKecukupanData(), +jalankanPrediksi()* |
| *C26* | *ProdukSurplusController* | *-* | *+validasiDataSurplus(), +simpanDataSurplus()* |
| *C27* | *SurplusController* | *-* | *+ambilDaftarSurplus(), +urutkanBerdasarkanJarak()* |
| *C28* | *KlaimController* | *-* | *ambilDetailPengambilan(), konfirmasiPengambilan()* |
| *C29* | *LogController* | *-* | *tampilkanLog(), saringLog()* |
| *C30* | *PemilikFnB* | *namaUsaha, alamatUsaha, jamOperasional* | *(diwarisi dari AkunPengguna)* |
| *C31* | *PerwakilanNGO* | *namaOrganisasi, nomorLegalitas, lokasi* | *(diwarisi dari AkunPengguna)* |
| *C32* | *AdminSistem* | *kewenangan* | *verifikasiPendaftaran()* |
| *C33* | *GeolocationAdapter* | *(tidak ada)* | *+getCoordinates(), +calculateDistance()* |
| *C34* | *PenyaringanController* | *-* | *saringProdukSurplus(), cariProdukSurplus(), validasiKriteria(), saringBerdasarkanJenis(), saringBerdasarkanJarak(), saringBerdasarkanBatasWaktu()* |

<br>

---

# BAB 5: Perancangan Rinci Kelas

Bagian ini diisi dengan daftar seluruh kelas dalam tabel berikut:

Tabel 5.1. Daftar Kelas Perancangan dan Kelas Analisis Terkait

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
| :--- | :--- | :--- |
| 1 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL atau -]* |
| 2 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL atau -]* |
| ... | *...* | *...* |

Untuk **setiap kelas**, identifikasi operasi berdasarkan tanggung jawab kelas beserta *visibility*-nya, serta atribut beserta *visibility* dan tipenya. Buat subbab tersendiri untuk setiap kelas.

## 5.1 Kelas [Nama Kelas 1]

**Nama Kelas:** *[Nama kelas]*  
**ID Kelas:** *[ID kelas]*

Tabel 5.1.1. Operasi Kelas [Nama Kelas 1]

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *[Signature operasi, termasuk parameter dan tipe kembalian]* | *[Visibility]* | *[Tanggung jawab operasi]* |
| *...* | *...* | *...* |

Tabel 5.1.2. Atribut Kelas [Nama Kelas 1]

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *[Nama atribut]* | *[Visibility]* | *[Tipe sesuai bahasa pemrograman yang digunakan]* |
| *...* | *...* | *...* |

### 5.1.1 Algoritma/Query

Bagian ini diisi untuk kerangka algoritma proses yang dianggap cukup penting. Algoritma dapat dituliskan sebagai *pseudocode*. Implementasi *skeleton code* juga dapat digunakan untuk kelas yang sudah terdefinisi pada bahasa pemrograman tertentu.

**Nama Kelas:** *[Nama kelas]*  
**Nama Operasi:** *[Signature operasi]*  
**ID Algoritma:** *[Algo-001]*

```text
[Tuliskan pseudocode algoritma operasi di sini.]
```

Jika operasi mengacu pada query tertentu, lengkapi tabel berikut. 

Tabel 5.1.1. Query Operasi [Nama Operasi]

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *[Q-001]* | *[Tuliskan query]* | *[Fungsi query]* |
| *...* | *...* | *...* |


### 5.1.2 Algoritma/Query

*[Ulangi pola 5.1.1 untuk operasi penting berikutnya pada kelas yang sama, jika ada.]*

## 5.1 Kelas AkunPengguna

**Nama Kelas:** *AkunPengguna*  
**ID Kelas:** *C01*

Tabel 5.1.1. Operasi Kelas AkunPengguna

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *registrasi(dataForm: Object): Number* | *Public* | *Membuat akun baru dari data formulir registrasi (email, kata sandi, tipe akun) dan mengembalikan idAkun* |

Tabel 5.1.2. Atribut Kelas AkunPengguna

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idAkun* | *Private* | *Number* |
| *email* | *Private* | *String* |
| *kataSandi* | *Private* | *String* |
| *tipeAkun* | *Private* | *String* |

### 5.1.1 Algoritma/Query

**Nama Kelas:** *AkunPengguna*  
**Nama Operasi:** *registrasi(dataForm: Object): Number*  
**ID Algoritma:** *Algo-001*

```text
FUNCTION registrasi(dataForm)
    kataSandiHash <- HASH(kata sandi dari dataForm)
    idAkun <- JALANKAN Q-001 dengan (email dari dataForm, kataSandiHash, tipeAkun)
    RETURN idAkun
END FUNCTION
```

Tabel 5.1.1. Query Operasi registrasi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-001* | *INSERT INTO akun_pengguna(email, kata_sandi, tipe_akun) VALUES ($1, $2, $3) RETURNING id_akun;* | *Menyimpan data akun pengguna baru ke tabel akun_pengguna di PostgreSQL dan mengembalikan id_akun yang dibuat.* |

## 5.2 Kelas Pendaftaran

**Nama Kelas:** *Pendaftaran*  
**ID Kelas:** *C02*

Tabel 5.2.1. Operasi Kelas Pendaftaran

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *ajukanPendaftaran(idAkun: Number): Number* | *Public* | *Membuat catatan pendaftaran untuk akun yang baru terbentuk  dan mengembalikan idPendaftaran* |
| *getDaftarMenungguVerifikasi(): Array* | *Public* | *Mengambil daftar pendaftaran yang berstatus "menunggu verifikasi" untuk ditampilkan ke admin sistem* |
| *getDetailPendaftar(idPendaftaran: Number): Object* | *Public* | *Mengambil data detil dari satu pendaftar* |
| *updateStatus(idPendaftaran: Number, status: String): void* | *Public* | *Memperbarui statusVerifikasi pendaftaran menjadi "diterima" atau "ditolak"* |
| *getStatus(): String* | *Public* | *Mengembalikan statusVerifikasi* |

Tabel 5.2.2. Atribut Kelas Pendaftaran 

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idPendaftaran* | *Private* | *Number* |
| *tanggalDaftar* | *Private* | *Date* |
| *statusVerifikasi* | *Private* | *String* |
### 5.2.1 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *ajukanPendaftaran(idAkun: Number): Number*  
**ID Algoritma:** *Algo-002*

```text
FUNCTION ajukanPendaftaran(idAkun)
    idPendaftaran <- JALANKAN Q-002 dengan (idAkun)
    RETURN idPendaftaran
END FUNCTION
```

Tabel 5.2.3. Query Operasi ajukanPendaftaran()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-002* | *INSERT INTO pendaftaran(id_akun, tanggal_daftar, status_verifikasi) VALUES ($1, CURRENT_DATE, 'menunggu verifikasi) RETURNING id_pendaftaran;* | *Meyimpan pendaftaran baru dengan tanggal hari ini dan status awal "menunggu verifikasi", lalu mengembalikan idPendaftaran* |

### 5.2.2 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *getDaftarMenungguVerifikasi(): Array*  
**ID Algoritma:** *Algo-003*

```text
FUNCTION getDaftarMenungguVerifikasi()
    daftarPendaftar <- JALANKAN Q-003
    RETURN daftarPendaftar
END FUNCTION
```
Tabel 5.2.4. Query Operasi getDaftarMenungguVerifikasi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-003* | *SELECT id_pendaftaran, id_akun, tanggal_daftar, status_verifikasi FROM pendaftaran WHERE status_verifikasi = 'menunggu verifikasi';* | *Mengambil seluruh pendaftaran yang masih menunggu untuk verifikasi* |

### 5.2.3 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *getDetailPendaftar(idPendaftaran: Number): Object*  
**ID Algoritma:** *Algo-004*

```text
FUNCTION getDetailPendaftar(idPendaftaran)
    dataPendaftar <- JALANKAN Q-004 dengan (idPendaftaran)
    RETURN dataPendaftar
END FUNCTION
```

Tabel 5.2.5. Query Operasi getDetailPendaftar()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-004* | *SELECT id_pendaftaran, id_akun, tanggal_daftar, status_verifikasi FROM pendaftaran WHERE id_pendaftaran = $1;* | *Mengambil data satu pendaftaran berdasarkan id_pendaftaran. $1 = idPendaftaran.* |

### 5.2.4 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *updateStatus(idPendaftaran: Number, status: String): void*  
**ID Algoritma:** *Algo-005*

```text
PROCEDURE updateStatus(idPendaftaran, status)
    JALANKAN Q-005 dengan (status, idPendaftaran)
END PROCEDURE
```
Tabel 5.2.6. Query Operasi updateStatus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-005* | *UPDATE pendaftaran SET status_verifikasi = $1 WHERE id_pendaftaran = $2;* | *Memperbarui status verifikasi menjadi "diterima" atau "ditolak"* |

### 5.2.5 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *getStatus(): String*  
**ID Algoritma:** *Algo-006*

```text
FUNCTION getStatus()
    statusVerifikasi <- JALANKAN Q-006 dengan (idPendaftaran milik objek)
    RETURN statusVerifikasi
END FUNCTION
```
Tabel 5.2.7. Query Operasi getStatus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-006* | *SELECT status_verifikasi FROM pendaftaran WHERE id_pendaftaran = $1;* | *Mengambil status verifikasi dari pendaftaran* |

## 5.3 Kelas DokumenPendukung

**Nama Kelas:** *DokumenPendukung*  
**ID Kelas:** *C03*

Tabel 5.3.1. Operasi Kelas DokumenPendukung

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *unggahDokumen(idPendaftaran: Number, berkas: Object): void* | *Public* | *Menyimpan berkas dokumen pendukung milik sebuah pendaftar* |
| *getDokumen(idPendaftaran: Number): Array* | *Public* | *Mengambil dokumen pendukung milik satu pendaftar* |

Tabel 5.3.2. Atribut Kelas DokumenPendukung

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idDokumen* | *Private* | *Number* |
| *namaFile* | *Private* | *String* |
| *tipeDokumen* | *Private* | *String* |

### 5.3.1 Algoritma/Query

**Nama Kelas:** *DokumenPendukung*  
**Nama Operasi:** *unggahDokumen(idPendaftaran: Number, berkas: Object): void*  
**ID Algoritma:** *Algo-007*

```text
PROCEDURE unggahDokumen(idPendaftaran, berkas)
    namaFile <- SIMPAN berkas ke folder penyimpanan dokumen di server
    tipeDokumen <- tipe berkas (PDF, JPG, atau PNG)
    JALANKAN Q-007 dengan (idPendaftaran, namaFile, tipeDokumen)
END PROCEDURE
```

Tabel 5.3.3. Query Operasi unggahDokumen()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-007* | *INSERT INTO dokumen_pendukung(id_pendaftaran, nama_file, tipe_dokumen) VALUES ($1, $2, $3);* | *Menyimpan data dokumen pendukung ke dalam tabel dokumen_pendukung* |

### 5.3.2 Algoritma/Query

**Nama Kelas:** *DokumenPendukung*  
**Nama Operasi:** *getDokumen(idPendaftaran: Number): Array*  
**ID Algoritma:** *Algo-008*

```text
FUNCTION getDokumen(idPendaftaran)
    daftarDokumen <- JALANKAN Q-008 dengan (idPendaftaran)
    RETURN daftarDokumen
END FUNCTION
```

Tabel 5.3.4. Query Operasi getDokumen()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-008* | *SELECT id_dokumen, nama_file, tipe_dokumen FROM dokumen_pendukung WHERE id_pendaftaran = $1;* | *Mengambil data dokumen pendukung milik satu pendaftar* |

## 5.4 Kelas VerifikasiController

**Nama Kelas:** *VerifikasiController*  
**ID Kelas:** *C04*

Tabel 5.4.1. Operasi Kelas VerifikasiController

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *tampilkanDaftarPendaftar(): Array* | *Public* | *Meminta daftar dari pendaftar yang berstatus "menunggu verifikasi"* |
| *ambilDetailPendaftar(idPendaftaran: Number): Object* | *Public* | *Mengambil data pendaftar dan dokumen* |
| *prosesVerifikasi(idPendaftaran: Number, keputusan: String): String* | *Public* | *Meneruskan keputusan admin sistem terkait status pendaftaran* |

Tabel 5.4.2. Atribut Kelas VerifikasiController

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |


### 5.4.1 Algoritma/Query

**Nama Kelas:** *VerifikasiController*  
**Nama Operasi:** *tampilkanDaftarPendaftar(): Array*  
**ID Algoritma:** *Algo-009*

```text
FUNCTION tampilkanDaftarPendaftar()
    daftarPendaftar <- getDaftarMenungguVerifikasi() pada Pendaftaran
    RETURN daftarPendaftar
END FUNCTION
```

Tabel 5.4.3. Query Operasi tampilkanDaftarPendaftar()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.4.2 Algoritma/Query

**Nama Kelas:** *VerifikasiController*  
**Nama Operasi:** *ambilDetailPendaftar(idPendaftaran: Number): Object*  
**ID Algoritma:** *Algo-010*

```text
FUNCTION ambilDetailPendaftar(idPendaftaran)
    dataPendaftar <- getDetailPendaftar(idPendaftaran) pada Pendaftaran
    daftarDokumen <- getDokumen(idPendaftaran) pada DokumenPendukung
    detailPendaftar <- GABUNGKAN dataPendaftar dan daftarDokumen
    RETURN detailPendaftar
END FUNCTION
```

Tabel 5.4.4. Query Operasi ambilDetailPendaftar()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.4.3 Algoritma/Query

**Nama Kelas:** *VerifikasiController*  
**Nama Operasi:** *prosesVerifikasi(idPendaftaran: Number, keputusan: String): String*  
**ID Algoritma:** *Algo-011*

```text
FUNCTION prosesVerifikasi(idPendaftaran, keputusan)
    verifikasiPendaftaran(idPendaftaran, keputusan) pada AdminSistem
    RETURN pesan status keputusan tersimpan
END FUNCTION
```

Tabel 5.4.5. Query Operasi prosesVerifikasi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

## 5.5 Kelas Produk

**Nama Kelas:** *Produk*  
**ID Kelas:** *C05*

Tabel 5.5.1. Operasi Kelas Produk

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *getDetailProduk(): Object* | *Public* | *Mengembalikan data detil milik suatu produk* |

Tabel 5.5.2. Atribut Kelas Produk

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idProduk* | *Private* | *Number* |
| *namaProduk* | *Private* | *String* |
| *kategori* | *Private* | *String* |

### 5.5.1 Algoritma/Query

**Nama Kelas:** *Produk*  
**Nama Operasi:** *getDetailProduk()*  
**ID Algoritma:** *-*

```text
-
```

Tabel 5.5.3. Query Operasi getDetailProduk()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

## 5.6 Kelas DataPenjualan

**Nama Kelas:** *DataPenjualan*  
**ID Kelas:** *C06*

Tabel 5.6.1. Operasi Kelas DataPenjualan

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *getDataHistoris(): Array* | *Public* | *Mengambil data historis penjualan untuk dijadikan prediksi* |
| *catatPenjualan(data: Object): void* | *Public* | *Menyimpan data penjualan harian* |

Tabel 5.6.2. Atribut Kelas DataPenjualan

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idPenjualan* | *Private* | *Number* |
| *tanggal* | *Private* | *Date* |
| *jumlahTerjual* | *Private* | *Number* |
| *jumlahTersisa* | *Private* | *Number* |

### 5.6.1 Algoritma/Query

**Nama Kelas:** *DataPenjualan*  
**Nama Operasi:** *catatPenjualan(data: Object): void*  
**ID Algoritma:** *Algo-012*

```text
PROCEDURE catatPenjualan(data)
    tanggalHariIni <- DAPATKAN TANGGAL HARI INI
    UNTUK SETIAP produk DALAM data
        JALANKAN Q-009 dengan (produk.idProduk, tanggalHariIni, produk.jumlahTerjual, produk.jumlahTersisa)
    AKHIR UNTUK
END PROCEDURE
``` 
Tabel 5.6.3. Query Operasi catatPenjualan()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-009* |INSERT INTO data_penjualan (id_penjualan, id_produk, tanggal, jumlah_terjual, jumlah_tersisa) VALUES (DEFAULT, $1, $2, $3, $4);* | *Menyimpan data penjualan harian* |

### 5.6.2 Algoritma/Query

**Nama Kelas:** *DataPenjualan*  
**Nama Operasi:** *getDataHistoris(): Array*  
**ID Algoritma:** *Algo-013*

```text
FUNCTION getDataHistoris()
    dataHistoris <- JALANKAN Q-010
    RETURN dataHistoris
END FUNCTION
``` 
Tabel 5.6.4. Query Operasi getDataHistoris()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-010* | *SELECT tanggal, jumlah_terjual, jumlah_tersisa FROM data_penjualan ORDER BY tanggal DESC LIMIT 7;* | *mengambil data historis hingga 7 hari untuk dijadikan prediksi* |



<br>

---

# BAB 6: Perancangan Antarmuka

## 6.1 Rancangan Antarmuka [ID Layar 1]

Masukkan versi awal prototipe antarmuka, dimana untuk setiap antarmuka/layar, tuliskan spesifikasi rinci objek yang ditampilkan dan reaksi sistem terhadap interaksi pengguna.

**Antarmuka:** *[ID layar]*  
**Nama Layar:** *[Nama layar]*

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-design.png" width="50%">
</p>
<p align="center">
<i>Gambar 6.1. Rancangan Antarmuka [ID Layar] - [Nama Layar]</i>
</p>

Tabel 6.1. Spesifikasi Objek Antarmuka [ID Layar]

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *[ID objek]* | *[Jenis objek, misalnya Button, RTF Box, dll]* | *[String yang tampil pada layar]* | *[Reaksi sistem, layar tujuan, tautan, atau ID algoritma yang dijalankan]* |
| *[ID objek]* | *[Jenis objek]* | *[Konten yang ditampilkan]* | *[Reaksi sistem atau nama file terkait beserta deskripsi ringkasnya]* |
| *...* | *...* | *...* | *...* |


## 6.X Rancangan Antarmuka [ID Layar X]

*[Ulangi pola 6.1 untuk layar berikutnya sampai semua layar teridentifikasi]*

## 6.Y Rancangan Antarmuka Keseluruhan

Tuliskan daftar gambar seluruh antarmuka. Berikan ID unik untuk setiap tampilan dan gunakan ID yang sama pada subbab perancangan antarmuka masing-masing.

Tabel 6.Y. Rancangan Antarmuka Keseluruhan

| No | Tampilan Antarmuka |
| :--- | :--- |
| *[I-01]* | <img src="./assets/diagram/contoh-design.png" alt="Contoh Desain" width="400"> |
| *[I-02]* | *[Sisipkan gambar antarmuka I-02]* |
| *[I-XX]* | *[Sisipkan gambar antarmuka berikutnya]* |

<br>

---

# BAB 7: Matriks Kerunutan

Petakan kelas perancangan dengan use case yang terkait. Gunakan **BAB 6 Traceability pada dokumen SKPL** sebagai acuan keterkaitan kelas analisis dan use case, lalu sesuaikan dengan realisasi use case dan kelas perancangan pada BAB 3–BAB 5 DPPL.

Tabel 7.1. Matriks Kerunutan Kelas terhadap Use Case

| Kelas | Use Case Terkait |
| :--- | :--- |
| *[ID kelas - Nama kelas]* | *[ID UC - Nama use case; tuliskan seluruh use case terkait]* |
| *[ID kelas - Nama kelas]* | *[ID UC - Nama use case]* |
| *...* | *...* |
