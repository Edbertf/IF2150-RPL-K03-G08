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
| *B* | *Merapikan serta menyesuaikan daftar kelas perancangan keseluruhan dengan perubahan yang ada (menambah atribut dan operasi yang belum ada di tabel, menghapus yang tidak digunakan di realisasi)* |
| *C* | *Menambahkan operasi getStatus() di C02 dan catatPenjualan() di C06 serta merevisi sequence diagram dan diagram kelas UC04 dan menambah* |
| *D* | *Menambahkan kelas PenyaringanController (C34)(menambahkan deskripsi perubahan yang tidak ada di M7)* |
| *E* | *Merevisi sequence diagram dan class diagram UC09 dan UC10* |
| *F* | *Merevisi sequence diagram dan class diagram UC05 dan UC06, serta mengubah nama operasi C07 dari buatPrediksi jadi simpanPrediksi* |

---


# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen Deskripsi Perancangan Perangkat Lunak (DPPL) ini dibuat untuk menjabarkan rancangan teknis dari sistem FoodLink. Dokumen ini menerjemahkan kebutuhan sistem dari dokumen SKPL ke dalam bentuk arsitektur, diagram kelas, sequence diagram, rancangan antarmuka, serta query basis data. Dokumen ini ditujukan bagi tim pengembang sebagai panduan dalam menulis kode program dengan arsitektur MVC, tim penguji sebagai acuan penyusunan skenario pengujian, serta dosen dan asisten sebagai bentuk pemenuhan tugas besar mata kuliah IF2150 Rekayasa Perangkat Lunak.

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
| *UC* | *Singkatan dari Use Case.* |
| *NGO* | *Non-Governmental Organization, organisasi non-pemerintah yang menerima dan mendistribusikan makanan surplus kepada pihak yang membutuhkan.* |
| *F&B* | *Food and Beverage, sebutan untuk usaha yang bergerak di bidang makanan dan minuman.* |
| *Surplus* | *Produk makanan/minuman layak konsumsi yang tidak terjual dan berpotensi terbuang apabila tidak segera didistribusikan.* |
| *Use Case* | *Istilah Use Case secara bahasa berarti kasus penggunaan, yaitu kondisi spesifik di mana perangkat lunak digunakan untuk kasus spesifik dengan tujuan tertentu.*|
| *Kelas* | *Istilah Kelas merupakan sekumpulan atribut (data) dan metode (perilaku atau fungsi) yang akan dimiliki oleh objek yang dibuat darinya.*|
| *Use Case* | *Istilah Use Case secara bahasa berarti kasus penggunaan, yaitu kondisi spesifik di mana perangkat lunak digunakan untuk kasus spesifik dengan tujuan tertentu.*|
| *Algoritma* | *Istilah Algoritma berarti urutan langkah-langkah logis dan sistematis yang digunakan untuk menyelesaikan suatu permasalahan secara komputasional.*|
| *Query* | *Istilah Query berarti rangkaian perintah atau permintaan yang digunakan untuk mengambil, menambah, mengubah, atau menghapus data dari basis data.*|
| *Antarmuka* | *Istilah Antarmuka berarti area input/output di mana pengguna berinteraksi dengan perangkat lunak.*|

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
| *ALgoritma* | *Algo-CXX-XX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Query* | *Q-CXX-XX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |
| *Interface* | *I-XX* | *XX merupakan nomor urut dua digit, dimulai dari 01.* |

## 1.5 Referensi
- K03_G08_SKPL.md
- K03_G08_APL.md
- K03_G08_DPPL.md
- Slide materi perkuliahan IF2150 RPL: https://drive.google.com/drive/folders/1SWxicyDoWrjlpJ18f9Oe_IuCYA-qGmrf?usp=sharing

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)

Dokumen Deskripsi Perancangan Perangkat Lunak (DPPL) ini disusun secara sistematis ke dalam tujuh bab. Dokumen diawali dengan **Bab 1** yang memuat pendahuluan, tujuan, dan lingkup sistem. **Bab 2** menjabarkan perancangan arsitektur perangkat lunak yang menggunakan pola *Model-View-Controller* (MVC) beserta identifikasi komponennya. Selanjutnya, **Bab 3** menguraikan realisasi dari setiap Use Case yang mencakup identifikasi kelas, sequence diagram, dan diagram kelas. **Bab 4** menyajikan gambaran utuh diagram kelas keseluruhan sistem beserta daftar kelas perancangannya. **Bab 5** memuat perancangan rinci untuk setiap kelas, meliputi operasi, atribut, serta kerangka algoritma dan query basis data. **Bab 6** mendeskripsikan rancangan antarmuka pengguna (UI) beserta spesifikasi objeknya. Dokumen ini ditutup dengan **Bab 7** yang menyajikan matriks kerunutan (*traceability*) untuk memetakan keterkaitan antara kelas perancangan dengan use case terkait.

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

### 3.2.3 Diagram Kelas

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

## 3.7 Use Case Mengatur Metode Distribusi Surplus

**ID Use Case:** *UC07*
**Nama Use Case:** *Mengatur Metode Distribusi Surplus*

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
| 2 | *DaftarSurplusPage (C19)* | *DaftarSurplusPage (C19)* |
| 3 | *SurplusController (C27)* | *SurplusController (C27)* |
| 4 | *ProdukSurplus (C08)* | *ProdukSurplus (C08)* |
| 5 | *MetodeDistribusiSurplus (C09)* | *MetodeDistribusiSurplus (C09)* |
| 6 | *PenyaringanController (C34)* | *PenyaringanController (C34)* |
| 7 | *Produk (C05)* | *Produk (C05)* |
| 8 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |
| 9 | *GeolocationAdapter C33* | *GeolocationAdapter C33* |

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
<img alt="Diagram Kelas Menyaring Produk Surplus" src="./assets/diagram/Gambar 3.9.3 Diagram Kelas Menyaring Produk.jpg" width="50%">
</p>
<p align="center">
<i>Gambar 3.9.3 Diagram Kelas Menyaring Produk Surplus</i>
</p>

## 3.10 Use Case Mengklaim Produk Surplus

**ID Use Case:** *UC10*  
**Nama Use Case:** *Mengklaim Produk Surplus*

### 3.10.1 Identifikasi Kelas

Tabel 3.10 Identifikasi Kelas Use Case UC10

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *PerwakilanNGO (C31)* | *PerwakilanNGO (C31)* |
| 2 | *KlaimPage (C20)* | *KlaimPage (C20)* |
| 3 | *KlaimController (C28)* | *KlaimController (C28)* |
| 4 | *SurplusController (C27)* | *SurplusController (C27)* |
| 5 | *MetodeDistribusiSurplus (C09)* | *MetodeDistribusiSurplus (C09)* |
| 6 | *ProdukSurplus (C08)* | *ProdukSurplus (C08)* |
| 7 | *DokumenKlaim (C10)* | *DokumenKlaim (C10)* |
| 8 | *Produk (C05)* | *Produk (C05)* |
| 9 | *PemilikFnB (C30)* | *PemilikFnB (C30)* |

### 3.10.2 Sequence Diagram

- **Skenario Normal**

<p align="center">
<img alt="Sequence Diagram UC10 - Skenario Normal"  src="./assets/diagram/Gambar 3.10.1 Sequence Diagram UC10 - Normal.jpg" width="50%">
</p>
<p align="center">
<i>Gambar 3.10.1 Sequence Diagram UC10 - Skenario Normal</i>
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
<img alt="Diagram Kelas Mengklaim Produk Surplus" src="./assets/diagram/Gambar 3.10.3 Diagram Kelas Mengklaim Produk.jpg" width="50%">
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
<i>Gambar 3.11.1 Sequence Diagram UC11</i>
</p>

- **Skenario Alternatif 1: Pemilik F&B atau Perwakilan NGO Ingin Membatalkan Pengonfirmasian Pengambilan Produk Surplus**

<p align="center">
<img alt="Sequence Diagram UC11 - Membatalkan Pengonfirmasian Pengambilan Produk Surplus" src="./assets/diagram/Gambar 3.11.2. Sequence Diagram UC11 - Memilih No.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.11.2 Sequence Diagram UC11 - Membatalkan Pengonfirmasian Pengambilan Produk Surplus</i>
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
| *C02* | *Pendaftaran* | *idPendaftaran, tanggalDaftar, statusVerifikasi* | *ajukanPendaftaran(), getDaftarMenungguVerifikasi(), getDetailPendaftar(), updateStatus(), getStatus()* |
| *C03* | *DokumenPendukung* | *idDokumen, namaFile, tipeDokumen* | *unggahDokumen(), getDokumen()* |
| *C04* | *VerifikasiController* | *-* | *tampilkanDaftarPendaftar(), ambilDetailPendaftar(), prosesVerifikasi()* |
| *C05* | *Produk* | *idProduk, namaProduk, kategori* | *getDetailProduk()* |
| *C06* | *DataPenjualan* | *idPenjualan, tanggal, jumlahTerjual, jumlahTersisa* | *getDataHistoris(), catatPenjualan()* |
| *C07* | *PrediksiProduksi* | *idPrediksi, tanggalPrediksi, jumlahRekomendasi* | *simpanPrediksi(), getHasilPrediksi()* |
| *C08* | *ProdukSurplus* | *idSurplus, idProduk, idPemilik, jumlah, batasWaktuPengambilan, status* | *simpanProdukSurplus(), setStatus(), getDetailSurplus(), getProdukSurplusTersedia(), getStatus()* |
| *C09* | *MetodeDistribusiSurplus* | *idDistribusi, jenisDistribusi, harga* | *pilihMetodeDistribusi(), getInfoDistribusi(), getJenisDistribusi(), getHarga()* |
| *C10* | *DokumenKlaim* | *idKlaim, idNgo, idSurplus, waktuKlaim, statusKlaim* | *catatKlaim(), getDetailKlaim(), getWaktuKlaim(), getStatusKlaim()* |
| *C11* | *LogAktivitas* | *idLog, aktivitas, waktu* | *getDaftarLog(), cariLog()* |
| *C12* | *RegistrasiPage* | *-* | *pilihTipeAkun(), tampilkanFormRegistrasi(), kirimFormulir(), tampilkanPesanBerhasil(), tampilkanPesanError()* |
| *C13* | *VerifikasiPage* | *-* | *bukaDaftarVerifikasi(), tampilkanDaftarVerifikasi(), pilihPendaftar(), tampilkanDetailPendaftar(), kirimKeputusan()* |
| *C14* | *StatusPendaftaranPage* | *-* | *tampilkanStatusPendaftaran()* |
| *C15* | *PenjualanPage* | *-* | *tampilkanFormPenjualan(), kirimDataPenjualan()* |
| *C16* | *PrediksiPage* | *-* | *lihatHasilPrediksi(), tampilkanDashboardPrediksi(), tampilkanGrafik(), tampilkanPesanError()* |
| *C17* | *ProdukSurplusPage* | *-* | *tampilkanFormulirSurplus(), kirimDataSurplus(), resetFormulir(), tampilkanNotifikasiSukses(), kosongkanIsian()* |
| *C18* | *DistribusiSurplusPage* | *-* | *pilihProdukSurplus(), tampilkanFormDistribusi(), tampilkanOpsiDistribusi(), tampilkanKolomHarga(), tampilkanKeteranganGratis(), simpanDistribusi(), tampilkanPesanKesalahan(), tampilkanPesanSukses()* |
| *C19* | *DaftarSurplusPage* | *lokasiPengguna, daftarSurplus, kataKunci, kriteriaFilter* | *saringDaftarSurplus(), tampilkanFormFilter(), kirimKriteriaFilter(), tampilkanHasilFilter(), tampilkanPesanTidakAda(), pilihProduk(), tampilkanDetailProduk()* |
| *C20* | *KlaimPage* | *idSurplusTerpilih, hasilKlaim, pesanError* | *tampilkanHalaman(), tampilkanDetailProduk(), kirimKlaim(), tampilkanKlaimBerhasil(), tampilkanPesanDitolak()* |
| *C21* | *PengambilanPage* | *-* | *bukaDetailPengambilan(), tampilkanDetailPengambilan(), tampilkanPopupKonfirmasi(), pilihKonfirmasiPengambilan(), pilihYes(), pilihNo(), tutupPopupKonfirmasi(), tampilkanPesanBerhasil()* |
| *C22* | *LogAktivitasPage* | *daftarLogTampil* | *bukaDashboardLog(), tampilkanDashboardLog(), terapkanFilter(), tampilkanTabelLog(), tampilkanPesanLogKosong()* |
| *C23* | *AuthController* | *-* | *registrasiAkun(), validasiKelengkapanData(), validasiFormatDokumen(), cekStatusPendaftaran()* |
| *C24* | *PenjualanController* | *-* | *validasiInputPenjualan(), simpanDataPenjualan()* |
| *C25* | *PrediksiController* | *-* | *cekKecukupanData(), jalankanPrediksi()* |
| *C26* | *ProdukSurplusController* | *-* | *validasiDataSurplus(), simpanDataSurplus(), tampilkanFormDistribusi(), simpanMetodeDistribusi(), validasiMetodeDistribusi()* |
| *C27* | *SurplusController* | *-* | *ambilDaftarSurplus(), ambilDetailSurplus(), urutkanBerdasarkanJarak()* |
| *C28* | *KlaimController* | *-* | *setujuiKlaim(), tolakKlaim(), cekKetersediaan(), kunciProduk(), ambilDetailPengambilan(), konfirmasiPengambilan()* |
| *C29* | *LogController* | *-* | *tampilkanLog(), saringLog()* |
| *C30* | *PemilikFnB* | *namaUsaha, alamatUsaha, jamOperasional, idPemilik* | *catatProdukSurplus(), lihatHasilPrediksi(), getLokasiUsaha(), getDataUsaha(), aturDistribusiSurplus(), bukaMenuSurplus(), resetFormulir()* |
| *C31* | *PerwakilanNGO* | *namaOrganisasi, nomorLegalitas, lokasi* | *lihatDaftarSurplus(), ajukanKlaim(), getDataNgo()* |
| *C32* | *AdminSistem* | *kewenangan* | *verifikasiPendaftaran()* |
| *C33* | *GeolocationAdapter* | *-* | *hitungJarak()* |
| *C34* | *PenyaringanController* | *-* | *saringProdukSurplus(), cariProdukSurplus(), validasiKriteria(), saringBerdasarkanJenis(), saringBerdasarkanJarak(), saringBerdasarkanBatasWaktu()* |

<br>

---

# BAB 5: Perancangan Rinci Kelas

Tabel 5.1. Daftar Kelas Perancangan dan Kelas Analisis Terkait

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
| :--- | :--- | :--- |
| 1 | *AkunPengguna* | *AkunPengguna* |
| 2 | *Pendaftaran* | *Pendaftaran* |
| 3 | *DokumenPendukung* | *DokumenPendukung* |
| 4 | *VerifikasiController* | *VerifikasiController* |
| 5 | *Produk* | *Produk* |
| 6 | *DataPenjualan* | *DataPenjualan* |
| 7 | *PrediksiProduksi* | *PrediksiProduksi* |
| 8 | *ProdukSurplus* | *ProdukSurplus* |
| 9 | *MetodeDistribusiSurplus* | *MetodeDistribusiSurplus* |
| 10 | *DokumenKlaim* | *DokumenKlaim* |
| 11 | *LogAktivitas* | *LogAktivitas* |
| 12 | *RegistrasiPage* | *RegistrasiPage* |
| 13 | *VerifikasiPage* | *VerifikasiPage* |
| 14 | *StatusPendaftaranPage* | *StatusPendaftaranPage* |
| 15 | *PenjualanPage* | *PenjualanPage* |
| 16 | *PrediksiPage* | *PrediksiPage* |
| 17 | *ProdukSurplusPage* | *ProdukSurplusPage* |
| 18 | *DistribusiSurplusPage* | *DistribusiSurplusPage* |
| 19 | *DaftarSurplusPage* | *DaftarSurplusPage* |
| 20 | *KlaimPage* | *KlaimPage* |
| 21 | *PengambilanPage* | *PengambilanPage* |
| 22 | *LogAktivitasPage* | *LogAktivitasPage* |
| 23 | *AuthController* | *AuthController* |
| 24 | *PenjualanController* | *PenjualanController* |
| 25 | *PrediksiController* | *PrediksiController* |
| 26 | *ProdukSurplusController* | *ProdukSurplusController* |
| 27 | *SurplusController* | *SurplusController* |
| 28 | *KlaimController* | *KlaimController* |
| 29 | *LogController* | *LogController* |
| 30 | *PemilikFnB* | *PemilikFnB* |
| 31 | *PerwakilanNGO* | *PerwakilanNGO* |
| 32 | *AdminSistem* | *AdminSistem* |
| 33 | *GeolocationAdapter* | *(Kelas integrasi eksternal, ditambahkan pada tahap perancangan)* |
| 34 | *PenyaringanController* | *(Kelas controller tambahan untuk memisahkan logika penyaringan)* |


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
**ID Algoritma:** *Algo-C01-01*

```text
FUNCTION registrasi(dataForm)
    kataSandiHash <- HASH(kata sandi dari dataForm)
    idAkun <- JALANKAN Q-C01-01 dengan (email dari dataForm, kataSandiHash, tipeAkun)
    RETURN idAkun
END FUNCTION
```

Tabel 5.1.3. Query Operasi registrasi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C01-01* | *INSERT INTO akun_pengguna(email, kata_sandi, tipe_akun) VALUES ($1, $2, $3) RETURNING id_akun;* | *Menyimpan data akun pengguna baru ke tabel akun_pengguna di PostgreSQL dan mengembalikan id_akun yang dibuat.* |

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
**ID Algoritma:** *Algo-C02-01*

```text
FUNCTION ajukanPendaftaran(idAkun)
    idPendaftaran <- JALANKAN Q-C02-01 dengan (idAkun)
    RETURN idPendaftaran
END FUNCTION
```

Tabel 5.2.3. Query Operasi ajukanPendaftaran()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C02-01* | *INSERT INTO pendaftaran(id_akun, tanggal_daftar, status_verifikasi) VALUES ($1, CURRENT_DATE, 'menunggu verifikasi') RETURNING id_pendaftaran;* | *Meyimpan pendaftaran baru dengan tanggal hari ini dan status awal "menunggu verifikasi", lalu mengembalikan idPendaftaran* |

### 5.2.2 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *getDaftarMenungguVerifikasi(): Array*  
**ID Algoritma:** *Algo-C02-02*

```text
FUNCTION getDaftarMenungguVerifikasi()
    daftarPendaftar <- JALANKAN Q-C02-02
    RETURN daftarPendaftar
END FUNCTION
```
Tabel 5.2.4. Query Operasi getDaftarMenungguVerifikasi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C02-02* | *SELECT id_pendaftaran, id_akun, tanggal_daftar, status_verifikasi FROM pendaftaran WHERE status_verifikasi = 'menunggu verifikasi';* | *Mengambil seluruh pendaftaran yang masih menunggu untuk verifikasi* |

### 5.2.3 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *getDetailPendaftar(idPendaftaran: Number): Object*  
**ID Algoritma:** *Algo-C02-03*

```text
FUNCTION getDetailPendaftar(idPendaftaran)
    dataPendaftar <- JALANKAN Q-C02-03 dengan (idPendaftaran)
    RETURN dataPendaftar
END FUNCTION
```

Tabel 5.2.5. Query Operasi getDetailPendaftar()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C02-03* | *SELECT id_pendaftaran, id_akun, tanggal_daftar, status_verifikasi FROM pendaftaran WHERE id_pendaftaran = $1;* | *Mengambil data satu pendaftaran berdasarkan id_pendaftaran*|

### 5.2.4 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *updateStatus(idPendaftaran: Number, status: String): void*  
**ID Algoritma:** *Algo-C02-04*

```text
PROCEDURE updateStatus(idPendaftaran, status)
    JALANKAN Q-C02-04 dengan (status, idPendaftaran)
END PROCEDURE
```
Tabel 5.2.6. Query Operasi updateStatus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C02-04* | *UPDATE pendaftaran SET status_verifikasi = $1 WHERE id_pendaftaran = $2;* | *Memperbarui status verifikasi menjadi "diterima" atau "ditolak"* |

### 5.2.5 Algoritma/Query

**Nama Kelas:** *Pendaftaran*  
**Nama Operasi:** *getStatus(): String*  
**ID Algoritma:** *Algo-C02-05*

```text
FUNCTION getStatus()
    statusVerifikasi <- JALANKAN Q-C02-05 dengan (idPendaftaran milik objek)
    RETURN statusVerifikasi
END FUNCTION
```
Tabel 5.2.7. Query Operasi getStatus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C02-05* | *SELECT status_verifikasi FROM pendaftaran WHERE id_pendaftaran = $1;* | *Mengambil status verifikasi dari pendaftaran* |

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
**ID Algoritma:** *Algo-C03-01*

```text
PROCEDURE unggahDokumen(idPendaftaran, berkas)
    namaFile <- SIMPAN berkas ke folder penyimpanan dokumen di server
    tipeDokumen <- tipe berkas (PDF, JPG, atau PNG)
    JALANKAN Q-C03-01 dengan (idPendaftaran, namaFile, tipeDokumen)
END PROCEDURE
```

Tabel 5.3.3. Query Operasi unggahDokumen()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C03-01* | *INSERT INTO dokumen_pendukung(id_pendaftaran, nama_file, tipe_dokumen) VALUES ($1, $2, $3);* | *Menyimpan data dokumen pendukung ke dalam tabel dokumen_pendukung* |

### 5.3.2 Algoritma/Query

**Nama Kelas:** *DokumenPendukung*  
**Nama Operasi:** *getDokumen(idPendaftaran: Number): Array*  
**ID Algoritma:** *Algo-C03-02*

```text
FUNCTION getDokumen(idPendaftaran)
    daftarDokumen <- JALANKAN Q-C03-02 dengan (idPendaftaran)
    RETURN daftarDokumen
END FUNCTION
```

Tabel 5.3.4. Query Operasi getDokumen()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C03-02* | *SELECT id_dokumen, nama_file, tipe_dokumen FROM dokumen_pendukung WHERE id_pendaftaran = $1;* | *Mengambil data dokumen pendukung milik satu pendaftar* |

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
**ID Algoritma:** *Algo-C04-01*

```text
FUNCTION tampilkanDaftarPendaftar()
    daftarPendaftar <- getDaftarMenungguVerifikasi() pada Pendaftaran
    RETURN daftarPendaftar
END FUNCTION
```

### 5.4.2 Algoritma/Query

**Nama Kelas:** *VerifikasiController*  
**Nama Operasi:** *ambilDetailPendaftar(idPendaftaran: Number): Object*  
**ID Algoritma:** *Algo-C04-02*

```text
FUNCTION ambilDetailPendaftar(idPendaftaran)
    dataPendaftar <- getDetailPendaftar(idPendaftaran) pada Pendaftaran
    daftarDokumen <- getDokumen(idPendaftaran) pada DokumenPendukung
    detailPendaftar <- GABUNGKAN dataPendaftar dan daftarDokumen
    RETURN detailPendaftar
END FUNCTION
```

### 5.4.3 Algoritma/Query

**Nama Kelas:** *VerifikasiController*  
**Nama Operasi:** *prosesVerifikasi(idPendaftaran: Number, keputusan: String): String*  
**ID Algoritma:** *Algo-C04-03*

```text
FUNCTION prosesVerifikasi(idPendaftaran, keputusan)
    verifikasiPendaftaran(idPendaftaran, keputusan) pada AdminSistem
    RETURN pesan status keputusan tersimpan
END FUNCTION
```

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
**ID Algoritma:** *Algo-C05-01*

```text
FUNCTION getDetailProduk()
    RETURN idProduk, namaProduk, kategori
END FUNCTION
```

## 5.6 Kelas DataPenjualan

**Nama Kelas:** *DataPenjualan*  
**ID Kelas:** *C06*

Tabel 5.6.1. Operasi Kelas DataPenjualan

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *getDataHistoris(): Array* | *Public* | *Mengambil data historis penjualan untuk dijadikan prediksi* |
| *catatPenjualan(data: Array): void* | *Public* | *Menyimpan data penjualan harian* |

Tabel 5.6.2. Atribut Kelas DataPenjualan

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idPenjualan* | *Private* | *Number* |
| *tanggal* | *Private* | *Date* |
| *jumlahTerjual* | *Private* | *Number* |
| *jumlahTersisa* | *Private* | *Number* |

### 5.6.1 Algoritma/Query

**Nama Kelas:** *DataPenjualan*  
**Nama Operasi:** *catatPenjualan(data: Array): void*  
**ID Algoritma:** *Algo-C06-01*

```text
PROCEDURE catatPenjualan(data)
    tanggalHariIni <- DAPATKAN TANGGAL HARI INI
    UNTUK SETIAP produk DALAM data
        JALANKAN Q-C06-01 dengan (produk.idProduk, tanggalHariIni, produk.jumlahTerjual, produk.jumlahTersisa)
    AKHIR UNTUK
END PROCEDURE
``` 
Tabel 5.6.3. Query Operasi catatPenjualan()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C06-01* | *INSERT INTO data_penjualan (id_penjualan, id_produk, tanggal, jumlah_terjual, jumlah_tersisa) VALUES (DEFAULT, $1, $2, $3, $4);* | *Menyimpan data penjualan harian* |

### 5.6.2 Algoritma/Query

**Nama Kelas:** *DataPenjualan*  
**Nama Operasi:** *getDataHistoris(): Array*  
**ID Algoritma:** *Algo-C06-02*

```text
FUNCTION getDataHistoris()
    dataHistoris <- JALANKAN Q-C06-02
    RETURN dataHistoris
END FUNCTION
``` 
Tabel 5.6.4. Query Operasi getDataHistoris()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C06-02* | *SELECT tanggal, jumlah_terjual, jumlah_tersisa FROM data_penjualan ORDER BY tanggal DESC LIMIT 7;* | *mengambil data historis hingga 7 hari untuk dijadikan prediksi* |

<<<<<<< Updated upstream
## 5.12 Kelas RegistrasiPage

**Nama Kelas:** *RegistrasiPage*  
**ID Kelas:** *C12*

Tabel 5.12.1. Operasi Kelas RegistrasiPage

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *pilihTipeAkun(tipeAkun: String): void* | *public* | *Menentukan tipe akun yang dipilih pengguna.* |
| *tampilkanFormRegistrasi(tipeAkun: String): void* | *public* | *Menampilkan formulir registrasi sesuai tipe akun.* |
| *kirimFormulir(dataForm: Object, daftarDokumen: Array): void* | *public* | *Mengirim data formulir dan dokumen ke AuthController.* |
| *tampilkanPesanBerhasil(): void* | *public* | *Menampilkan notifikasi pendaftaran berhasil.* |
| *tampilkanPesanError(daftarError: Array): void* | *public* | *Menampilkan pesan kesalahan validasi isian.* |

Tabel 5.12.2. Atribut Kelas RegistrasiPage

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

*Kelas ini merupakan boundary class (View) sehingga tidak memiliki atribut.*

### 5.12.1 Algoritma/Query

**Nama Kelas:** *RegistrasiPage*  
**Nama Operasi:** *pilihTipeAkun(tipeAkun)*  
**ID Algoritma:** *Algo-C12-01*

```text
Procedure pilihTipeAkun(tipeAkun)
    If (tipeAkun = "Pemilik F&B") Then
        tampilkanFormRegistrasi("Pemilik F&B")
    Else If (tipeAkun = "Perwakilan NGO") Then
        tampilkanFormRegistrasi("Perwakilan NGO")
    Else
        TAMPILKAN pesan("Tipe akun tidak valid.")
    End If
End Procedure
```

### 5.12.2 Algoritma/Query

**Nama Kelas:** *RegistrasiPage*  
**Nama Operasi:** *tampilkanFormRegistrasi(tipeAkun)*  
**ID Algoritma:** *Algo-C12-02*

```text
Procedure tampilkanFormRegistrasi(tipeAkun)
    If (tipeAkun = "Pemilik F&B") Then
        TAMPILKAN FormRegistrasiFNB
    Else If (tipeAkun = "Perwakilan NGO") Then
        TAMPILKAN FormRegistrasiNGO
    End If
End Procedure
```

### 5.12.3 Algoritma/Query

**Nama Kelas:** *RegistrasiPage*  
**Nama Operasi:** *kirimFormulir(dataForm, daftarDokumen)*  
**ID Algoritma:** *Algo-C12-03*

```text
Procedure kirimFormulir(dataForm, daftarDokumen)
    daftarError ← AuthController.registrasiAkun(dataForm.tipeAkun, dataForm, daftarDokumen)
    
    If (daftarError is empty) Then
        tampilkanPesanBerhasil()
    Else
        tampilkanPesanError(daftarError)
    End If
End Procedure
```

### 5.12.4 Algoritma/Query

**Nama Kelas:** *RegistrasiPage*  
**Nama Operasi:** *tampilkanPesanBerhasil()*  
**ID Algoritma:** *Algo-C12-04*

```text
Procedure tampilkanPesanBerhasil()
    TAMPILKAN pesan("Registrasi Berhasil! Silakan tunggu verifikasi admin.")
    PINDAH KE Halaman StatusPendaftaran
End Procedure
```

### 5.12.5 Algoritma/Query

**Nama Kelas:** *RegistrasiPage*  
**Nama Operasi:** *tampilkanPesanError(daftarError)*  
**ID Algoritma:** *Algo-C12-05*

```text
Procedure tampilkanPesanError(daftarError)
    For each error in daftarError
        TAMPILKAN pesan(error)
    End For
End Procedure
```

## 5.13 Kelas VerifikasiPage

**Nama Kelas:** *VerifikasiPage*  
**ID Kelas:** *C13*

Tabel 5.13.1. Operasi Kelas VerifikasiPage

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *bukaDaftarVerifikasi(): void* | *public* | *Meminta dan menampilkan daftar pendaftar yang menunggu verifikasi.* |
| *tampilkanDaftarVerifikasi(daftarPendaftar: List): void* | *public* | *Merender antarmuka daftar pendaftar.* |
| *pilihPendaftar(idPendaftaran: String): void* | *public* | *Memilih pendaftar tertentu untuk melihat detailnya.* |
| *tampilkanDetailPendaftar(detailPendaftar: Map): void* | *public* | *Menampilkan data diri dan dokumen pendukung pendaftar.* |
| *kirimKeputusan(idPendaftaran: String, keputusan: String): void* | *public* | *Mengirim keputusan admin (terima/tolak) ke VerifikasiController.* |

Tabel 5.13.2. Atribut Kelas VerifikasiPage

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

*Kelas ini merupakan boundary class (View) sehingga tidak memiliki atribut.*

### 5.13.1 Algoritma/Query

**Nama Kelas:** *VerifikasiPage*  
**Nama Operasi:** *bukaDaftarVerifikasi()*  
**ID Algoritma:** *Algo-C13-01*

```text
Procedure bukaDaftarVerifikasi()
    daftarPendaftar ← VerifikasiController.tampilkanDaftarPendaftar()
    tampilkanDaftarVerifikasi(daftarPendaftar)
End Procedure
```

### 5.13.2 Algoritma/Query

**Nama Kelas:** *VerifikasiPage*  
**Nama Operasi:** *tampilkanDaftarVerifikasi(daftarPendaftar)*  
**ID Algoritma:** *Algo-C13-02*

```text
Procedure tampilkanDaftarVerifikasi(daftarPendaftar)
    If (daftarPendaftar is empty) Then
        TAMPILKAN pesan("Tidak ada pendaftar yang menunggu verifikasi.")
    Else
        TAMPILKAN tabel daftarPendaftar
    End If
End Procedure
```

### 5.13.3 Algoritma/Query

**Nama Kelas:** *VerifikasiPage*  
**Nama Operasi:** *pilihPendaftar(idPendaftaran)*  
**ID Algoritma:** *Algo-C13-03*

```text
Procedure pilihPendaftar(idPendaftaran)
    detailPendaftar ← VerifikasiController.ambilDetailPendaftar(idPendaftaran)
    tampilkanDetailPendaftar(detailPendaftar)
End Procedure
```

### 5.13.4 Algoritma/Query

**Nama Kelas:** *VerifikasiPage*  
**Nama Operasi:** *tampilkanDetailPendaftar(detailPendaftar)*  
**ID Algoritma:** *Algo-C13-04*

```text
Procedure tampilkanDetailPendaftar(detailPendaftar)
    TAMPILKAN data diri pendaftar
    TAMPILKAN dokumen pendukung pendaftar
End Procedure
```

### 5.13.5 Algoritma/Query

**Nama Kelas:** *VerifikasiPage*  
**Nama Operasi:** *kirimKeputusan(idPendaftaran, keputusan)*  
**ID Algoritma:** *Algo-C13-05*

```text
Procedure kirimKeputusan(idPendaftaran, keputusan)
    status ← VerifikasiController.prosesVerifikasi(idPendaftaran, keputusan)
    
    If (status = "Berhasil") Then
        TAMPILKAN pesan("Keputusan verifikasi berhasil disimpan.")
        PINDAH KE Halaman VerifikasiPage
    Else
        TAMPILKAN pesan("Gagal menyimpan keputusan verifikasi.")
    End If
End Procedure
```

## 5.14 Kelas StatusPendaftaranPage

**Nama Kelas:** *StatusPendaftaranPage*  
**ID Kelas:** *C14*

Tabel 5.14.1. Operasi Kelas StatusPendaftaranPage

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *tampilkanStatusPendaftaran(): void* | *public* | *Menampilkan status pendaftaran pengguna berdasarkan hasil pengecekan.* |

Tabel 5.14.2. Atribut Kelas StatusPendaftaranPage

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

*Kelas ini merupakan boundary class (View) sehingga tidak memiliki atribut.*

### 5.14.1 Algoritma/Query

**Nama Kelas:** *StatusPendaftaranPage*  
**Nama Operasi:** *tampilkanStatusPendaftaran()*  
**ID Algoritma:** *Algo-C14-01*

```text
Procedure tampilkanStatusPendaftaran()
    statusVerifikasi ← AuthController.cekStatusPendaftaran()
    
    If (statusVerifikasi = "menunggu") Then
        TAMPILKAN pesan("Pendaftaran sedang menunggu verifikasi admin.")
    Else If (statusVerifikasi = "ditolak") Then
        TAMPILKAN pesan("Pendaftaran ditolak. Silakan periksa kembali dokumen Anda.")
    Else If (statusVerifikasi = "diterima") Then
        TAMPILKAN pesan("Pendaftaran diterima. Selamat bergabung!")
    Else
        TAMPILKAN pesan("Status pendaftaran tidak diketahui.")
    End If
End Procedure
```

## 5.15 Kelas PenjualanPage

**Nama Kelas:** *PenjualanPage*  
**ID Kelas:** *C15*

Tabel 5.15.1. Operasi Kelas PenjualanPage

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *tampilkanFormPenjualan(): void* | *public* | *Menampilkan formulir input data penjualan harian beserta daftar produk.* |
| *kirimDataPenjualan(data: Object): void* | *public* | *Mengirimkan data penjualan yang telah diisi ke PenjualanController.* |

Tabel 5.15.2. Atribut Kelas PenjualanPage

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

*Kelas ini merupakan boundary class (View) sehingga tidak memiliki atribut.*

### 5.15.1 Algoritma/Query

**Nama Kelas:** *PenjualanPage*  
**Nama Operasi:** *tampilkanFormPenjualan()*  
**ID Algoritma:** *Algo-C15-01*

```text
Procedure tampilkanFormPenjualan()
    daftarProduk ← Produk.getDetailProduk()
    TAMPILKAN form penjualan(daftarProduk)
End Procedure
```

### 5.15.2 Algoritma/Query

**Nama Kelas:** *PenjualanPage*  
**Nama Operasi:** *kirimDataPenjualan(data)*  
**ID Algoritma:** *Algo-C15-02*

```text
Procedure kirimDataPenjualan(data)
    status ← PenjualanController.simpanDataPenjualan(data)
    
    If (status = "Berhasil") Then
        TAMPILKAN pesan("Data penjualan berhasil disimpan.")
    Else
        TAMPILKAN pesan("Format isian penjualan tidak valid.")
    End If
End Procedure
```

## 5.16 Kelas PrediksiPage

**Nama Kelas:** *PrediksiPage*  
**ID Kelas:** *C16*

Tabel 5.16.1. Operasi Kelas PrediksiPage

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *lihatHasilPrediksi(): void* | *public* | *Titik awal UC05: memicu pengecekan data dan penarikan hasil prediksi.* |
| *tampilkanDashboardPrediksi(hasil: List): void* | *public* | *Menampilkan ringkasan hasil rekomendasi produksi.* |
| *tampilkanGrafik(dataGrafik: Map): void* | *public* | *Menampilkan visualisasi grafik tren penjualan dan prediksi.* |
| *tampilkanPesanError(pesan: String): void* | *public* | *Menampilkan pesan kesalahan jika data historis belum memenuhi syarat.* |

Tabel 5.16.2. Atribut Kelas PrediksiPage

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

*Kelas ini merupakan boundary class (View) sehingga tidak memiliki atribut.*

### 5.16.1 Algoritma/Query

**Nama Kelas:** *PrediksiPage*  
**Nama Operasi:** *lihatHasilPrediksi()*  
**ID Algoritma:** *Algo-C16-01*

```text
Procedure lihatHasilPrediksi()
    isCukup ← PrediksiController.cekKecukupanData()
    
    If (isCukup = true) Then
        hasilPrediksi ← PrediksiController.jalankanPrediksi()
        tampilkanDashboardPrediksi(hasilPrediksi)
        tampilkanGrafik(hasilPrediksi)
    Else
        tampilkanPesanError("Data historis belum memenuhi syarat minimal 7 hari.")
    End If
End Procedure
```

### 5.16.2 Algoritma/Query

**Nama Kelas:** *PrediksiPage*  
**Nama Operasi:** *tampilkanDashboardPrediksi(hasil)*  
**ID Algoritma:** *Algo-C16-02*

```text
Procedure tampilkanDashboardPrediksi(hasil)
    If (hasil is empty) Then
        TAMPILKAN pesan("Belum ada rekomendasi produksi untuk saat ini.")
    Else
        For each item in hasil
            TAMPILKAN item.namaProduk, item.jumlahRekomendasi
        End For
    End If
End Procedure
```

### 5.16.3 Algoritma/Query

**Nama Kelas:** *PrediksiPage*  
**Nama Operasi:** *tampilkanGrafik(dataGrafik)*  
**ID Algoritma:** *Algo-C16-03*

```text
Procedure tampilkanGrafik(dataGrafik)
    TAMPILKAN grafik tren(dataGrafik)
End Procedure
```

### 5.16.4 Algoritma/Query

**Nama Kelas:** *PrediksiPage*  
**Nama Operasi:** *tampilkanPesanError(pesan)*  
**ID Algoritma:** *Algo-C16-04*

```text
Procedure tampilkanPesanError(pesan)
    TAMPILKAN pesan kesalahan(pesan)
End Procedure
```

## 5.17 Kelas ProdukSurplusPage

**Nama Kelas:** *ProdukSurplusPage*  
**ID Kelas:** *C17*

Tabel 5.17.1. Operasi Kelas ProdukSurplusPage

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *tampilkanFormulirSurplus(): void* | *public* | *Menampilkan formulir input data produk surplus yang akan didonasikan/dijual.* |
| *kirimDataSurplus(dataSurplus: Map): void* | *public* | *Mengirimkan data produk surplus yang telah diisi ke ProdukSurplusController.* |
| *resetFormulir(): void* | *public* | *Meminta penghapusan seluruh isian pada formulir.* |
| *tampilkanNotifikasiSukses(): void* | *public* | *Menampilkan notifikasi bahwa data produk surplus berhasil disimpan.* |
| *kosongkanIsian(): void* | *public* | *Membersihkan seluruh field input pada formulir.* |

Tabel 5.17.2. Atribut Kelas ProdukSurplusPage

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

*Kelas ini merupakan boundary class (View) sehingga tidak memiliki atribut.*

### 5.17.1 Algoritma/Query

**Nama Kelas:** *ProdukSurplusPage*  
**Nama Operasi:** *tampilkanFormulirSurplus(): void*  
**ID Algoritma:** *Algo-C17-01*

```text
Procedure tampilkanFormulirSurplus()
    TAMPILKAN form input produk surplus
End Procedure
```

### 5.17.2 Algoritma/Query

**Nama Kelas:** *ProdukSurplusPage*  
**Nama Operasi:** *kirimDataSurplus(dataSurplus)*  
**ID Algoritma:** *Algo-C17-02*

```text
Procedure kirimDataSurplus(dataSurplus)
    statusSukses ← ProdukSurplusController.simpanDataSurplus(dataSurplus)
    
    If (statusSukses = true) Then
        tampilkanNotifikasiSukses()
    Else
        TAMPILKAN pesan("Gagal menyimpan data. Periksa kembali isian Anda.")
    End If
End Procedure
```

### 5.17.3 Algoritma/Query

**Nama Kelas:** *ProdukSurplusPage*  
**Nama Operasi:** *resetFormulir()*  
**ID Algoritma:** *Algo-C17-03*

```text
Procedure resetFormulir()
    kosongkanIsian()
End Procedure
```

### 5.17.4 Algoritma/Query

**Nama Kelas:** *ProdukSurplusPage*  
**Nama Operasi:** *tampilkanNotifikasiSukses()*  
**ID Algoritma:** *Algo-C17-04*

```text
Procedure tampilkanNotifikasiSukses()
    TAMPILKAN notifikasi("Produk surplus berhasil dicatat.")
End Procedure
```

### 5.17.5 Algoritma/Query

**Nama Kelas:** *ProdukSurplusPage*  
**Nama Operasi:** *kosongkanIsian()*  
**ID Algoritma:** *Algo-C17-05*

```text
Procedure kosongkanIsian()
    BERSIHKAN semua field input pada form
End Procedure
```
## 5.18 Kelas DistribusiSurplusPage

**Nama Kelas:** *DistribusiSurplusPage*  
**ID Kelas:** *C18*

Tabel 5.18.1. Operasi Kelas DistribusiSurplusPage

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| *pilihProdukSurplus(idSurplus: Number): void* | Public | Menetapkan produk surplus yang akan diatur distribusinya. |
| *tampilkanFormDistribusi(data: Object): void* | Public | Menampilkan ringkasan produk serta formulir pengaturan distribusi. |
| *tampilkanOpsiDistribusi(opsi: Array): void* | Public | Menampilkan pilihan jenis distribusi yang tersedia. |
| *tampilkanKolomHarga(): void* | Public | Menampilkan isian harga ketika jenis distribusi adalah jual diskon. |
| *tampilkanKeteranganGratis(): void* | Public | Menampilkan keterangan bahwa produk donasi diberikan tanpa biaya. |
| *simpanDistribusi(jenisDistribusi: String, harga: Number?): void* | Public | Mengirim pilihan distribusi dan harga kepada ProdukSurplusController. |
| *tampilkanPesanKesalahan(pesan: String): void* | Public | Menampilkan kesalahan validasi atau kegagalan penyimpanan. |
| *tampilkanPesanSukses(pesan: String): void* | Public | Menampilkan konfirmasi bahwa pengaturan distribusi tersimpan. |

Tabel 5.18.2. Atribut Kelas DistribusiSurplusPage

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| *idSurplusTerpilih* | Private | Number |
| *dataProdukSurplus* | Private | Object |
| *jenisDistribusiTerpilih* | Private | String |
| *harga* | Private | Number? |
| *opsiDistribusi* | Private | Array |
| *pesanKesalahan* | Private | String? |

### 5.18.1 Algoritma/Query

**Nama Kelas:** *DistribusiSurplusPage*  
**Nama Operasi:** *pilihProdukSurplus(idSurplus: Number): void*  
**ID Algoritma:** *Algo-C18-01*

```text
PROCEDURE pilihProdukSurplus(idSurplus)
    idSurplusTerpilih <- idSurplus
    data <- tampilkanFormDistribusi(idSurplus) pada ProdukSurplusController
    IF data tidak ditemukan THEN
        tampilkanPesanKesalahan("Produk surplus tidak ditemukan atau tidak dapat diatur.")
        RETURN
    END IF
    dataProdukSurplus <- data.produk
    tampilkanFormDistribusi(data)
    tampilkanOpsiDistribusi(data.opsiDistribusi)
END PROCEDURE
```

Operasi ini meminta data melalui ProdukSurplusController (C26), tanpa akses basis data langsung.

### 5.18.2 Algoritma/Query

**Nama Kelas:** *DistribusiSurplusPage*  
**Nama Operasi:** *tampilkanFormDistribusi(data: Object): void*  
**ID Algoritma:** *Algo-C18-02*

```text
PROCEDURE tampilkanFormDistribusi(data)
    tampilkan nama produk, jumlah, dan batas waktu pengambilan dari data.produk
    tampilkan pilihan jenis distribusi
    tampilkan nilai distribusi yang telah tersimpan jika tersedia
END PROCEDURE
```

Operasi hanya merender data yang diterima dari controller; tidak menjalankan query.

### 5.18.3 Algoritma/Query

**Nama Kelas:** *DistribusiSurplusPage*  
**Nama Operasi:** *tampilkanOpsiDistribusi(opsi: Array): void*  
**ID Algoritma:** *Algo-C18-03*

```text
PROCEDURE tampilkanOpsiDistribusi(opsi)
    opsiDistribusi <- opsi
    tampilkan pilihan "Donasi" dan "Jual Diskon" yang tersedia
    IF jenisDistribusiTerpilih = "Donasi" THEN
        tampilkanKeteranganGratis()
    ELSE IF jenisDistribusiTerpilih = "Jual Diskon" THEN
        tampilkanKolomHarga()
    END IF
END PROCEDURE
```

Operasi antarmuka; tidak mengakses basis data.

### 5.18.4 Algoritma/Query

**Nama Kelas:** *DistribusiSurplusPage*  
**Nama Operasi:** *tampilkanKolomHarga(): void*  
**ID Algoritma:** *Algo-C18-04*

```text
PROCEDURE tampilkanKolomHarga()
    tampilkan kolom input harga
    sembunyikan keterangan gratis
END PROCEDURE
```

Operasi antarmuka tanpa query basis data.

### 5.18.5 Algoritma/Query

**Nama Kelas:** *DistribusiSurplusPage*  
**Nama Operasi:** *tampilkanKeteranganGratis(): void*  
**ID Algoritma:** *Algo-C18-05*

```text
PROCEDURE tampilkanKeteranganGratis()
    tampilkan keterangan bahwa metode donasi tidak memungut harga
    sembunyikan kolom harga
END PROCEDURE
```

Operasi antarmuka tanpa query basis data.

### 5.18.6 Algoritma/Query

**Nama Kelas:** *DistribusiSurplusPage*  
**Nama Operasi:** *simpanDistribusi(jenisDistribusi: String, harga: Number?): void*  
**ID Algoritma:** *Algo-C18-06*

```text
PROCEDURE simpanDistribusi(jenisDistribusi, harga)
    jenisDistribusiTerpilih <- jenisDistribusi
    IF jenisDistribusi = "Donasi" THEN hargaKirim <- 0
    ELSE hargaKirim <- harga
    TRY
        simpanMetodeDistribusi(idSurplusTerpilih, jenisDistribusi, hargaKirim)
            pada ProdukSurplusController
        tampilkanPesanSukses("Metode distribusi berhasil disimpan.")
    CATCH kesalahan
        tampilkanPesanKesalahan(kesalahan.pesan)
    END TRY
END PROCEDURE
```

Penyimpanan diteruskan ke ProdukSurplusController (C26), kemudian MetodeDistribusiSurplus (C09); Page tidak mengakses basis data langsung.

### 5.18.7 Algoritma/Query

**Nama Kelas:** *DistribusiSurplusPage*  
**Nama Operasi:** *tampilkanPesanKesalahan(pesan: String): void*  
**ID Algoritma:** *Algo-C18-07*

```text
PROCEDURE tampilkanPesanKesalahan(pesan)
    pesanKesalahan <- pesan
    tampilkan pesanKesalahan pada formulir
END PROCEDURE
```

Operasi tidak mengakses basis data.

### 5.18.8 Algoritma/Query

**Nama Kelas:** *DistribusiSurplusPage*  
**Nama Operasi:** *tampilkanPesanSukses(pesan: String): void*  
**ID Algoritma:** *Algo-C18-08*

```text
PROCEDURE tampilkanPesanSukses(pesan)
    hapus pesanKesalahan jika ada
    tampilkan pesan sebagai konfirmasi penyimpanan
END PROCEDURE
```

Operasi tidak mengakses basis data.

## 5.19 Kelas DaftarSurplusPage

**Nama Kelas:** *DaftarSurplusPage*  
**ID Kelas:** *C19*

Tabel 5.19.1. Operasi Kelas DaftarSurplusPage

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| *saringDaftarSurplus(): void* | Public | Meminta controller mencari surplus berdasarkan kata kunci, filter, dan lokasi. |
| *tampilkanFormFilter(): void* | Public | Menampilkan kontrol filter jenis produk, jarak, batas waktu, dan kata kunci. |
| *kirimKriteriaFilter(kriteria: Object): void* | Public | Mengirim kriteria pencarian kepada PenyaringanController. |
| *tampilkanHasilFilter(daftar: Array): void* | Public | Menampilkan daftar produk yang memenuhi kriteria. |
| *tampilkanPesanTidakAda(pesan: String): void* | Public | Menampilkan keadaan kosong ketika tidak ada produk yang cocok. |
| *pilihProduk(idSurplus: Number): void* | Public | Meminta detail produk surplus yang dipilih. |
| *tampilkanDetailProduk(detail: Object): void* | Public | Menampilkan informasi surplus, pemilik, distribusi, dan jarak bila tersedia. |

Tabel 5.19.2. Atribut Kelas DaftarSurplusPage

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| *lokasiPengguna* | Private | Object? |
| *daftarSurplus* | Private | Array |
| *kataKunci* | Private | String |
| *kriteriaFilter* | Private | Object |

### 5.19.1 Algoritma/Query

**Nama Kelas:** *DaftarSurplusPage*  
**Nama Operasi:** *saringDaftarSurplus(): void*  
**ID Algoritma:** *Algo-C19-01*

```text
PROCEDURE saringDaftarSurplus()
    kriteria <- gabungkan kriteriaFilter dan kataKunci
    kirimKriteriaFilter(kriteria)
END PROCEDURE
```

Page meneruskan kriteria melalui PenyaringanController (C34), tanpa akses basis data langsung.

### 5.19.2 Algoritma/Query

**Nama Kelas:** *DaftarSurplusPage*  
**Nama Operasi:** *tampilkanFormFilter(): void*  
**ID Algoritma:** *Algo-C19-02*

```text
PROCEDURE tampilkanFormFilter()
    tampilkan kolom kata kunci
    tampilkan filter jenis produk, jarak maksimum, dan batas waktu
    isi kontrol dengan kriteriaFilter saat ini
END PROCEDURE
```

Operasi antarmuka tanpa query basis data.

### 5.19.3 Algoritma/Query

**Nama Kelas:** *DaftarSurplusPage*  
**Nama Operasi:** *kirimKriteriaFilter(kriteria: Object): void*  
**ID Algoritma:** *Algo-C19-03*

```text
PROCEDURE kirimKriteriaFilter(kriteria)
    kriteriaFilter <- kriteria
    daftar <- saringProdukSurplus(kriteria, lokasiPengguna) pada PenyaringanController
    IF daftar kosong THEN
        tampilkanPesanTidakAda("Tidak ada produk surplus yang sesuai dengan filter.")
    ELSE
        tampilkanHasilFilter(daftar)
    END IF
END PROCEDURE
```

Data diambil dan disaring melalui PenyaringanController (C34) serta kelas model terkait.

### 5.19.4 Algoritma/Query

**Nama Kelas:** *DaftarSurplusPage*  
**Nama Operasi:** *tampilkanHasilFilter(daftar: Array): void*  
**ID Algoritma:** *Algo-C19-04*

```text
PROCEDURE tampilkanHasilFilter(daftar)
    daftarSurplus <- daftar
    tampilkan setiap produk dalam daftarSurplus
    sembunyikan pesan keadaan kosong
END PROCEDURE
```

Operasi merender hasil controller; tidak mengakses basis data.

### 5.19.5 Algoritma/Query

**Nama Kelas:** *DaftarSurplusPage*  
**Nama Operasi:** *tampilkanPesanTidakAda(pesan: String): void*  
**ID Algoritma:** *Algo-C19-05*

```text
PROCEDURE tampilkanPesanTidakAda(pesan)
    daftarSurplus <- []
    tampilkan pesan keadaan kosong
    sembunyikan daftar hasil
END PROCEDURE
```

Operasi tidak mengakses basis data.

### 5.19.6 Algoritma/Query

**Nama Kelas:** *DaftarSurplusPage*  
**Nama Operasi:** *pilihProduk(idSurplus: Number): void*  
**ID Algoritma:** *Algo-C19-06*

```text
PROCEDURE pilihProduk(idSurplus)
    detail <- ambilDetailSurplus(idSurplus) pada SurplusController
    IF detail ditemukan THEN tampilkanDetailProduk(detail)
    ELSE tampilkanPesanTidakAda("Detail produk surplus tidak tersedia.")
    END IF
END PROCEDURE
```

Detail diminta melalui SurplusController (C27), tanpa query langsung dari Page.

### 5.19.7 Algoritma/Query

**Nama Kelas:** *DaftarSurplusPage*  
**Nama Operasi:** *tampilkanDetailProduk(detail: Object): void*  
**ID Algoritma:** *Algo-C19-07*

```text
PROCEDURE tampilkanDetailProduk(detail)
    tampilkan nama, kategori, jumlah, dan batas waktu produk
    tampilkan metode distribusi, harga, dan informasi pemilik
    IF lokasiPengguna tersedia DAN detail.jarak tersedia THEN
        tampilkan jarak dari lokasi pengguna
    END IF
END PROCEDURE
```

Operasi merender objek detail yang disediakan SurplusController.

## 5.20 Kelas KlaimPage

**Nama Kelas:** *KlaimPage*  
**ID Kelas:** *C20*

Tabel 5.20.1. Operasi Kelas KlaimPage

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| *tampilkanHalaman(idSurplus: Number): void* | Public | Menyiapkan halaman klaim dan mengambil detail produk surplus. |
| *tampilkanDetailProduk(detail: Object): void* | Public | Menampilkan informasi produk yang dapat diklaim. |
| *kirimKlaim(idNgo: Number, idSurplus: Number): void* | Public | Mengirim permintaan klaim kepada KlaimController. |
| *tampilkanKlaimBerhasil(detailKlaim: Object): void* | Public | Menampilkan konfirmasi klaim berhasil beserta ringkasan klaim. |
| *tampilkanPesanDitolak(pesan: String): void* | Public | Menampilkan pesan ketika produk tidak tersedia atau klaim ditolak. |

Tabel 5.20.2. Atribut Kelas KlaimPage

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| *idSurplusTerpilih* | Private | Number |
| *hasilKlaim* | Private | Object? |
| *pesanError* | Private | String? |

### 5.20.1 Algoritma/Query

**Nama Kelas:** *KlaimPage*  
**Nama Operasi:** *tampilkanHalaman(idSurplus: Number): void*  
**ID Algoritma:** *Algo-C20-01*

```text
PROCEDURE tampilkanHalaman(idSurplus)
    idSurplusTerpilih <- idSurplus
    detail <- ambilDetailSurplus(idSurplus) pada SurplusController
    IF detail tidak ditemukan ATAU detail.status bukan "tersedia" THEN
        tampilkanPesanDitolak("Produk surplus tidak tersedia untuk diklaim.")
        RETURN
    END IF
    tampilkanDetailProduk(detail)
END PROCEDURE
```

Pengambilan detail dilakukan melalui SurplusController (C27).

### 5.20.2 Algoritma/Query

**Nama Kelas:** *KlaimPage*  
**Nama Operasi:** *tampilkanDetailProduk(detail: Object): void*  
**ID Algoritma:** *Algo-C20-02*

```text
PROCEDURE tampilkanDetailProduk(detail)
    tampilkan nama produk, jumlah, dan batas waktu pengambilan
    tampilkan informasi pemilik dan metode distribusi
    tampilkan tindakan untuk mengajukan klaim
END PROCEDURE
```

Operasi antarmuka tanpa akses basis data.

### 5.20.3 Algoritma/Query

**Nama Kelas:** *KlaimPage*  
**Nama Operasi:** *kirimKlaim(idNgo: Number, idSurplus: Number): void*  
**ID Algoritma:** *Algo-C20-03*

```text
PROCEDURE kirimKlaim(idNgo, idSurplus)
    IF idSurplus != idSurplusTerpilih THEN
        tampilkanPesanDitolak("Produk yang dipilih tidak sesuai.")
        RETURN
    END IF
    TRY
        hasilKlaim <- setujuiKlaim(idNgo, idSurplus) pada KlaimController
        tampilkanKlaimBerhasil(hasilKlaim)
    CATCH kesalahan
        pesanError <- kesalahan.pesan
        tampilkanPesanDitolak(pesanError)
    END TRY
END PROCEDURE
```

KlaimController (C28) memeriksa ketersediaan dan mencatat klaim melalui DokumenKlaim (C10).

### 5.20.4 Algoritma/Query

**Nama Kelas:** *KlaimPage*  
**Nama Operasi:** *tampilkanKlaimBerhasil(detailKlaim: Object): void*  
**ID Algoritma:** *Algo-C20-04*

```text
PROCEDURE tampilkanKlaimBerhasil(detailKlaim)
    hasilKlaim <- detailKlaim
    hapus pesanError jika ada
    tampilkan identitas klaim dan ringkasan produk
    tampilkan instruksi pengambilan
END PROCEDURE
```

Operasi merender hasil controller; tidak mengakses basis data.

### 5.20.5 Algoritma/Query

**Nama Kelas:** *KlaimPage*  
**Nama Operasi:** *tampilkanPesanDitolak(pesan: String): void*  
**ID Algoritma:** *Algo-C20-05*

```text
PROCEDURE tampilkanPesanDitolak(pesan)
    pesanError <- pesan
    tampilkan pesanError
    nonaktifkan tindakan klaim jika produk tidak tersedia
END PROCEDURE
```

Operasi tidak mengakses basis data.

## 5.21 Kelas PengambilanPage

**Nama Kelas:** *PengambilanPage*  
**ID Kelas:** *C21*

Tabel 5.21.1. Operasi Kelas PengambilanPage

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| *bukaDetailPengambilan(idKlaim: Number): void* | Public | Memulai proses dengan meminta data pengambilan berdasarkan klaim. |
| *tampilkanDetailPengambilan(detail: Object): void* | Public | Menampilkan produk, pihak terkait, lokasi, dan waktu pengambilan. |
| *tampilkanPopupKonfirmasi(): void* | Public | Meminta konfirmasi sebelum pengambilan ditandai selesai. |
| *pilihKonfirmasiPengambilan(pilihan: Boolean): void* | Public | Meneruskan pilihan konfirmasi pengguna. |
| *pilihYes(): void* | Public | Menyatakan pengambilan telah dilakukan. |
| *pilihNo(): void* | Public | Membatalkan konfirmasi tanpa mengubah status klaim. |
| *tutupPopupKonfirmasi(): void* | Public | Menutup dialog konfirmasi. |
| *tampilkanPesanBerhasil(pesan: String): void* | Public | Menampilkan konfirmasi bahwa pengambilan berhasil dicatat. |

Tabel 5.21.2. Atribut Kelas PengambilanPage

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| *idKlaimTerpilih* | Private | Number |
| *detailPengambilan* | Private | Object? |
| *popupKonfirmasiTerbuka* | Private | Boolean |

### 5.21.1 Algoritma/Query

**Nama Kelas:** *PengambilanPage*  
**Nama Operasi:** *bukaDetailPengambilan(idKlaim: Number): void*  
**ID Algoritma:** *Algo-C21-01*

```text
PROCEDURE bukaDetailPengambilan(idKlaim)
    idKlaimTerpilih <- idKlaim
    detail <- ambilDetailPengambilan(idKlaim) pada KlaimController
    IF detail tidak ditemukan THEN
        tampilkan pesan bahwa detail pengambilan tidak tersedia
        RETURN
    END IF
    detailPengambilan <- detail
    tampilkanDetailPengambilan(detail)
END PROCEDURE
```

Data diminta melalui KlaimController (C28), tanpa query langsung dari Page.

### 5.21.2 Algoritma/Query

**Nama Kelas:** *PengambilanPage*  
**Nama Operasi:** *tampilkanDetailPengambilan(detail: Object): void*  
**ID Algoritma:** *Algo-C21-02*

```text
PROCEDURE tampilkanDetailPengambilan(detail)
    tampilkan produk surplus dan ringkasan klaim
    tampilkan identitas pemilik F&B dan perwakilan NGO
    tampilkan lokasi serta informasi waktu pengambilan
    tampilkan tindakan konfirmasi pengambilan
END PROCEDURE
```

Operasi antarmuka tanpa akses basis data.

### 5.21.3 Algoritma/Query

**Nama Kelas:** *PengambilanPage*  
**Nama Operasi:** *tampilkanPopupKonfirmasi(): void*  
**ID Algoritma:** *Algo-C21-03*

```text
PROCEDURE tampilkanPopupKonfirmasi()
    popupKonfirmasiTerbuka <- true
    tampilkan pertanyaan apakah produk surplus telah diambil
    tampilkan pilihan Yes dan No
END PROCEDURE
```

Operasi antarmuka tanpa akses basis data.

### 5.21.4 Algoritma/Query

**Nama Kelas:** *PengambilanPage*  
**Nama Operasi:** *pilihKonfirmasiPengambilan(pilihan: Boolean): void*  
**ID Algoritma:** *Algo-C21-04*

```text
PROCEDURE pilihKonfirmasiPengambilan(pilihan)
    IF popupKonfirmasiTerbuka = false THEN RETURN
    IF pilihan = true THEN pilihYes()
    ELSE pilihNo()
    END IF
END PROCEDURE
```

Operasi meneruskan pilihan ke alur yang sesuai; tidak mengakses basis data.

### 5.21.5 Algoritma/Query

**Nama Kelas:** *PengambilanPage*  
**Nama Operasi:** *pilihYes(): void*  
**ID Algoritma:** *Algo-C21-05*

```text
PROCEDURE pilihYes()
    IF idKlaimTerpilih belum ditetapkan THEN RETURN
    hasil <- konfirmasiPengambilan(idKlaimTerpilih, true) pada KlaimController
    tutupPopupKonfirmasi()
    tampilkanPesanBerhasil(hasil.pesan)
END PROCEDURE
```

Perubahan status dijalankan oleh KlaimController (C28) pada model terkait.

### 5.21.6 Algoritma/Query

**Nama Kelas:** *PengambilanPage*  
**Nama Operasi:** *pilihNo(): void*  
**ID Algoritma:** *Algo-C21-06*

```text
PROCEDURE pilihNo()
    konfirmasiPengambilan(idKlaimTerpilih, false) pada KlaimController
    tutupPopupKonfirmasi()
    pertahankan status klaim yang ada
END PROCEDURE
```

Pilihan pembatalan tidak mengubah status pengambilan.

### 5.21.7 Algoritma/Query

**Nama Kelas:** *PengambilanPage*  
**Nama Operasi:** *tutupPopupKonfirmasi(): void*  
**ID Algoritma:** *Algo-C21-07*

```text
PROCEDURE tutupPopupKonfirmasi()
    popupKonfirmasiTerbuka <- false
    tutup dialog konfirmasi
END PROCEDURE
```

Operasi antarmuka tanpa akses basis data.

### 5.21.8 Algoritma/Query

**Nama Kelas:** *PengambilanPage*  
**Nama Operasi:** *tampilkanPesanBerhasil(pesan: String): void*  
**ID Algoritma:** *Algo-C21-08*

```text
PROCEDURE tampilkanPesanBerhasil(pesan)
    tampilkan pesan konfirmasi pengambilan
    perbarui tampilan status detailPengambilan menjadi selesai
END PROCEDURE
```

Operasi merender hasil KlaimController; tidak mengakses basis data langsung.

## 5.22 Kelas LogAktivitasPage

**Nama Kelas:** *LogAktivitasPage*  
**ID Kelas:** *C22*

Tabel 5.22.1. Operasi Kelas LogAktivitasPage

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| *bukaDashboardLog(kriteria: Object?): void* | Public | Meminta daftar log untuk dashboard admin, dengan kriteria awal bila tersedia. |
| *tampilkanDashboardLog(daftar: Array): void* | Public | Menyiapkan dashboard dan menampilkan daftar log. |
| *terapkanFilter(kriteria: Object): void* | Public | Mengirim kriteria filter kepada LogController. |
| *tampilkanTabelLog(daftar: Array): void* | Public | Menampilkan hasil log dalam tabel. |
| *tampilkanPesanLogKosong(pesan: String): void* | Public | Menampilkan keadaan kosong ketika belum ada log atau hasil filter kosong. |

Tabel 5.22.2. Atribut Kelas LogAktivitasPage

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| *daftarLogTampil* | Private | Array |

### 5.22.1 Algoritma/Query

**Nama Kelas:** *LogAktivitasPage*  
**Nama Operasi:** *bukaDashboardLog(kriteria: Object?): void*  
**ID Algoritma:** *Algo-C22-01*

```text
PROCEDURE bukaDashboardLog(kriteria)
    daftar <- tampilkanLog(kriteria) pada LogController
    IF daftar kosong THEN tampilkanPesanLogKosong("Belum ada log aktivitas.")
    ELSE tampilkanDashboardLog(daftar)
    END IF
END PROCEDURE
```

LogController (C29) mengambil data melalui LogAktivitas (C11).

### 5.22.2 Algoritma/Query

**Nama Kelas:** *LogAktivitasPage*  
**Nama Operasi:** *tampilkanDashboardLog(daftar: Array): void*  
**ID Algoritma:** *Algo-C22-02*

```text
PROCEDURE tampilkanDashboardLog(daftar)
    daftarLogTampil <- daftar
    tampilkan judul dashboard dan kontrol filter
    tampilkanTabelLog(daftarLogTampil)
END PROCEDURE
```

Operasi antarmuka tanpa query basis data.

### 5.22.3 Algoritma/Query

**Nama Kelas:** *LogAktivitasPage*  
**Nama Operasi:** *terapkanFilter(kriteria: Object): void*  
**ID Algoritma:** *Algo-C22-03*

```text
PROCEDURE terapkanFilter(kriteria)
    daftar <- saringLog(kriteria) pada LogController
    IF daftar kosong THEN
        tampilkanPesanLogKosong("Tidak ada log aktivitas yang sesuai dengan filter.")
    ELSE
        tampilkanTabelLog(daftar)
    END IF
END PROCEDURE
```

Pemfilteran dilakukan melalui LogController (C29), bukan oleh Page terhadap basis data.

### 5.22.4 Algoritma/Query

**Nama Kelas:** *LogAktivitasPage*  
**Nama Operasi:** *tampilkanTabelLog(daftar: Array): void*  
**ID Algoritma:** *Algo-C22-04*

```text
PROCEDURE tampilkanTabelLog(daftar)
    daftarLogTampil <- daftar
    tampilkan kolom waktu, pengguna, dan uraian aktivitas
    tampilkan satu baris untuk setiap log dalam daftarLogTampil
END PROCEDURE
```

Operasi merender data yang diterima; tidak mengakses basis data langsung.

### 5.22.5 Algoritma/Query

**Nama Kelas:** *LogAktivitasPage*  
**Nama Operasi:** *tampilkanPesanLogKosong(pesan: String): void*  
**ID Algoritma:** *Algo-C22-05*

```text
PROCEDURE tampilkanPesanLogKosong(pesan)
    daftarLogTampil <- []
    sembunyikan tabel log
    tampilkan pesan
END PROCEDURE
```

Operasi tidak mengakses basis data.

## 5.23 Kelas AuthController

**Nama Kelas:** *AuthController*  
**ID Kelas:** *C23*

Tabel 5.23.1. Operasi Kelas AuthController

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| *registrasiAkun(dataForm: Object): Object* | Public | Memvalidasi data dan dokumen, membuat akun dan pendaftaran, serta menyimpan dokumen pendukung. |
| *validasiKelengkapanData(dataForm: Object): Boolean* | Public | Memeriksa kelengkapan data wajib sesuai jenis akun. |
| *validasiFormatDokumen(berkas: Array): Boolean* | Public | Memeriksa keberadaan, format, dan kelayakan dokumen pendukung. |
| *cekStatusPendaftaran(idAkun: Number): Object* | Public | Mengambil status pendaftaran akun. |

Tabel 5.23.2. Atribut Kelas AuthController

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.23.1 Algoritma/Query

**Nama Kelas:** *AuthController*  
**Nama Operasi:** *registrasiAkun(dataForm: Object): Object*  
**ID Algoritma:** *Algo-C23-01*

```text
FUNCTION registrasiAkun(dataForm)
    IF NOT validasiKelengkapanData(dataForm) THEN
        RAISE Error("Data registrasi belum lengkap atau tidak valid.")
    END IF
    IF NOT validasiFormatDokumen(dataForm.berkas) THEN
        RAISE Error("Dokumen pendukung tidak valid.")
    END IF
    idAkun <- registrasi(dataForm) pada AkunPengguna
    simpan data profil sesuai tipe akun pada PemilikFnB atau PerwakilanNGO
    idPendaftaran <- ajukanPendaftaran(idAkun) pada Pendaftaran
    unggahDokumen(idPendaftaran, dataForm.berkas) pada DokumenPendukung
    RETURN {idAkun, idPendaftaran, status: "menunggu verifikasi"}
END FUNCTION
```

Controller mengorkestrasi AkunPengguna (C01), Pendaftaran (C02), DokumenPendukung (C03), dan profil akun. Akses basis data dilakukan oleh kelas-kelas tersebut.

### 5.23.2 Algoritma/Query

**Nama Kelas:** *AuthController*  
**Nama Operasi:** *validasiKelengkapanData(dataForm: Object): Boolean*  
**ID Algoritma:** *Algo-C23-02*

```text
FUNCTION validasiKelengkapanData(dataForm)
    IF email kosong atau format email tidak valid THEN RETURN false
    IF kata sandi kosong atau tidak memenuhi aturan THEN RETURN false
    IF tipe akun bukan "Pemilik FnB" dan bukan "Perwakilan NGO" THEN RETURN false
    IF tipe akun = "Pemilik FnB" AND nama usaha/alamat/jam operasional kosong THEN
        RETURN false
    END IF
    IF tipe akun = "Perwakilan NGO" AND nama organisasi/nomor legalitas/lokasi kosong THEN
        RETURN false
    END IF
    RETURN true
END FUNCTION
```


### 5.23.3 Algoritma/Query

**Nama Kelas:** *AuthController*  
**Nama Operasi:** *validasiFormatDokumen(berkas: Array): Boolean*  
**ID Algoritma:** *Algo-C23-03*

```text
FUNCTION validasiFormatDokumen(berkas)
    IF berkas kosong THEN RETURN false
    UNTUK SETIAP dokumen DALAM berkas
        IF dokumen tidak dapat dibaca atau ukuran = 0 THEN RETURN false
        IF ekstensi bukan PDF, JPG, atau PNG THEN RETURN false
        IF tipe konten tidak sesuai ekstensi THEN RETURN false
    AKHIR UNTUK
    RETURN true
END FUNCTION
```


### 5.23.4 Algoritma/Query

**Nama Kelas:** *AuthController*  
**Nama Operasi:** *cekStatusPendaftaran(idAkun: Number): Object*  
**ID Algoritma:** *Algo-C23-04*

```text
FUNCTION cekStatusPendaftaran(idAkun)
    pendaftaran <- cari pendaftaran milik idAkun pada Pendaftaran
    IF pendaftaran tidak ditemukan THEN
        RETURN {ditemukan: false, pesan: "Pendaftaran belum tersedia."}
    END IF
    status <- getStatus() pada pendaftaran
    RETURN {ditemukan: true, status: status}
END FUNCTION
```

=======
## 5.7 Kelas PrediksiProduksi

**Nama Kelas:** *PrediksiProduksi*  
**ID Kelas:** *C07*

Tabel 5.7.1. Operasi Kelas PrediksiProduksi 

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *simpanPrediksi(dataPenjualan: Array): void* | *Public* | *Menerima data penjualan historis dan menyimpan hasil rekomendasi produksi* |
| *getHasilPrediksi(): Array* | *Public* | *Mengambil data hasil rekomendasi produksi untuk ditampilkan pada halaman prediksi* |

Tabel 5.7.2. Atribut Kelas PrediksiProduksi

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idPrediksi* | *Private* | *Number* |
| *tanggalPrediksi* | *Private* | *Date* |
| *jumlahRekomendasi* | *Private* | *Number* |

### 5.1.1 Algoritma/Query

**Nama Kelas:** *PrediksiProduksi*  
**Nama Operasi:** *simpanPrediksi(dataPenjualan: Array): void*  
**ID Algoritma:** *Algo-C07-01*

```text
PROCEDURE simpanPrediksi(dataPenjualan)
    IF dataPenjualan kosong THEN
        RAISE Error("Data penjualan tidak boleh kosong.")
    END IF
    tanggalPrediksi <- DAPATKAN TANGGAL BESOK
    UNTUK SETIAP data DALAM dataPenjualan
        jumlahRekomendasi <- HITUNG_REKOMENDASI(data.jumlahTerjual, data.jumlahTersisa)
        JALANKAN Q-C07-01 dengan (tanggalPrediksi, data.idProduk, jumlahRekomendasi)
    AKHIR UNTUK
END PROCEDURE
```

Tabel 5.7.3. Query Operasi simpanPrediksi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C07-01* | *INSERT INTO prediksi_produksi (tanggal_prediksi, id_produk, jumlah_rekomendasi) VALUES ($1, $2, $3);* | *Menyimpan hasil rekomendasi produksi* |

### 5.7.2 Algoritma/Query

**Nama Kelas:** *PrediksiProduksi*  
**Nama Operasi:** *getHasilPrediksi():Array*  
**ID Algoritma:** *Algo-C07-02*

```text
FUNCTION getHasilPrediksi()
    hasilPrediksi <- JALANKAN Q-C07-02
    RETURN hasilPrediksi
END FUNCTION
```

Tabel 5.7.4. Query Operasi getHasilPrediksi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C07-02* | *SELECT id_prediksi, tanggal_prediksi, id_produk, jumlah_rekomendasi FROM prediksi_produksi WHERE tanggal_prediksi >= CURRENT_DATE ORDER BY tanggal_prediksi ASC;* | *Mengambil data rekomendasi produksi* |

## 5.8 Kelas ProdukSurplus

**Nama Kelas:** *ProdukSurplus*  
**ID Kelas:** *C08*

Tabel 5.8.1. Operasi Kelas ProdukSurplus

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *simpanProdukSurplus(dataSurplus: Object): Number* | *Public* | *Menyimpan data produk surplus baru yang diinputkan oleh Pemilik F&B.* |
| *setStatus(idSurplus: Number, status: String): void* | *Public* | *Memperbarui status produk surplus (menjadi "terklaim" atau "selesai").* |
| *getDetailSurplus(idSurplus: Number): Object* | *Public* | *Mengambil data detail dari satu produk surplus.* |
| *getProdukSurplusTersedia(): Array* | *Public* | *Mengambil daftar semua produk surplus berstatus "tersedia".* |
| *getStatus(): String* | *Public* | *Mengambil status dari suatu produk surplus.* |

Tabel 5.8.2. Atribut Kelas ProdukSurplus

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idSurplus* | *Private* | *Number* |
| *idProduk* | *Private* | *Number* |
| *idPemilik* | *Private* | *Number* |
| *jumlah* | *Private* | *Number* |
| *batasWaktuPengambilan* | *Private* | *DateTime* |
| *status* | *Private* | *String* |

### 5.8.1 Algoritma/Query

**Nama Kelas:** *ProdukSurplus*  
**Nama Operasi:** *simpanProdukSurplus(dataSurplus: Object): Number*  
**ID Algoritma:** *Algo-C08-01*

```text
FUNCTION simpanProdukSurplus(dataSurplus)
    IF dataSurplus.idProduk kosong ATAU dataSurplus.jumlah <= 0 THEN
        RAISE Error("Data produk surplus tidak valid.")
    END IF
    idSurplus <- JALANKAN Q-C08-01 dengan (dataSurplus.idProduk, dataSurplus.idPemilik, dataSurplus.jumlah, dataSurplus.batasWaktuPengambilan)
    RETURN idSurplus
END FUNCTION
```

Tabel 5.8.3. Query Operasi simpanProdukSurplus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C08-01* | *INSERT INTO produk_surplus (id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status) VALUES ($1, $2, $3, $4, 'tersedia') RETURNING id_surplus;* | *Menyimpan data produk surplus baru dengan status awal "tersedia" dan mengembalikan id_surplus.* |

### 5.8.2 Algoritma/Query

**Nama Kelas:** *ProdukSurplus*  
**Nama Operasi:** *setStatus(idSurplus: Number, status: String): void*  
**ID Algoritma:** *Algo-C08-02*

```text
PROCEDURE setStatus(idSurplus, status)
    IF status BUKAN salah satu dari ("tersedia", "terklaim", "selesai") THEN
        RAISE Error("Status tidak valid.")
    END IF
    JALANKAN Q-C08-02 dengan (status, idSurplus)
END PROCEDURE
```

Tabel 5.8.4. Query Operasi setStatus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C08-02* | *UPDATE produk_surplus SET status = $1 WHERE id_surplus = $2;* | *Memperbarui status produk surplus di database.* |

### 5.8.3 Algoritma/Query

**Nama Kelas:** *ProdukSurplus*  
**Nama Operasi:** *getDetailSurplus(idSurplus: Number): Object*  
**ID Algoritma:** *Algo-C08-03*

```text
FUNCTION getDetailSurplus(idSurplus)
    detailSurplus <- JALANKAN Q-C08-03 dengan (idSurplus)
    IF detailSurplus kosong THEN
        RAISE Error("Produk surplus tidak ditemukan.")
    END IF
    RETURN detailSurplus
END FUNCTION
```

Tabel 5.8.5. Query Operasi getDetailSurplus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C08-03* | *SELECT id_surplus, id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status FROM produk_surplus WHERE id_surplus = $1;* | *Mengambil detail satu produk surplus berdasarkan id_surplus.* |

### 5.8.4 Algoritma/Query

**Nama Kelas:** *ProdukSurplus*  
**Nama Operasi:** *getProdukSurplusTersedia(): Array*  
**ID Algoritma:** *Algo-C08-04*

```text
FUNCTION getProdukSurplusTersedia()
    daftarSurplus <- JALANKAN Q-C08-04
    RETURN daftarSurplus
END FUNCTION
```

Tabel 5.8.6. Query Operasi getProdukSurplusTersedia()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C08-04* | *SELECT id_surplus, id_produk, id_pemilik, jumlah, batas_waktu_pengambilan, status FROM produk_surplus WHERE status = 'tersedia' AND batas_waktu_pengambilan > CURRENT_TIMESTAMP;* | *Mengambil daftar produk surplus yang masih tersedia dan belum melewati batas waktu.* |

### 5.8.5 Algoritma/Query

**Nama Kelas:** *ProdukSurplus*  
**Nama Operasi:** *getStatus(): String*  
**ID Algoritma:** *Algo-C08-05*

```text
FUNCTION getStatus()
    statusSurplus <- JALANKAN Q-C08-05 dengan (idSurplus milik objek)
    RETURN statusSurplus
END FUNCTION
```

Tabel 5.8.7. Query Operasi getStatus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C08-05* | *SELECT status FROM produk_surplus WHERE id_surplus = $1;* | *Mengambil status dari produk surplus tertentu.* |

## 5.9 Kelas MetodeDistribusiSurplus

**Nama Kelas:** *MetodeDistribusiSurplus*  
**ID Kelas:** *C09*

Tabel 5.9.1. Operasi Kelas MetodeDistribusiSurplus

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *pilihMetodeDistribusi(idProduk: Number, jenisDistribusi: String, harga: Number): void* | *Public* | *Menyimpan atau memperbarui metode distribusi (Donasi/Jual Diskon) dan harga untuk suatu produk.* |
| *getInfoDistribusi(): Object* | *Public* | *Mengambil informasi jenis distribusi dan harga dari objek produk saat ini.* |
| *getJenisDistribusi(): String* | *Public* | *Mengambil jenis distribusi (Donasi atau Jual Diskon) dari objek saat ini.* |

Tabel 5.9.2. Atribut Kelas MetodeDistribusiSurplus

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idDistribusi* | *Private* | *Number* |
| *jenisDistribusi* | *Private* | *String* |
| *harga* | *Private* | *Number* |

### 5.9.1 Algoritma/Query

**Nama Kelas:** *MetodeDistribusiSurplus*  
**Nama Operasi:** *pilihMetodeDistribusi(idProduk: Number, jenisDistribusi: String, harga: Number): void*  
**ID Algoritma:** *Algo-C09-01*

```text
PROCEDURE pilihMetodeDistribusi(idProduk, jenisDistribusi, harga)
    IF jenisDistribusi = "Donasi" THEN
        harga <- 0
    END IF
    JALANKAN Q-C09-01 dengan (idProduk, jenisDistribusi, harga)
END PROCEDURE
```

Tabel 5.9.3. Query Operasi pilihMetodeDistribusi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C09-01* | *INSERT INTO metode_distribusi_surplus (id_produk, jenis_distribusi, harga) VALUES ($1, $2, $3) ON CONFLICT (id_produk) DO UPDATE SET jenis_distribusi = EXCLUDED.jenis_distribusi, harga = EXCLUDED.harga;* | *Menyimpan metode distribusi baru atau memperbarui jika produk sudah memiliki metode distribusi sebelumnya (menggunakan id_produk sebagai kunci relasi).* |

### 5.9.2 Algoritma/Query

**Nama Kelas:** *MetodeDistribusiSurplus*  
**Nama Operasi:** *getInfoDistribusi(): Object*  
**ID Algoritma:** *Algo-C09-02*

```text
FUNCTION getInfoDistribusi()
    info <- JALANKAN Q-C09-02 dengan (idProduk milik objek)
    IF info kosong THEN
        RAISE Error("Informasi distribusi tidak ditemukan.")
    END IF
    RETURN info
END FUNCTION
```

Tabel 5.9.4. Query Operasi getInfoDistribusi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C09-02* | *SELECT jenis_distribusi, harga FROM metode_distribusi_surplus WHERE id_produk = $1;* | *Mengambil jenis distribusi dan harga berdasarkan id_produk dari objek saat ini.* |

### 5.9.3 Algoritma/Query

**Nama Kelas:** *MetodeDistribusiSurplus*  
**Nama Operasi:** *getJenisDistribusi(): String*  
**ID Algoritma:** *Algo-C09-03*

```text
FUNCTION getJenisDistribusi()
    jenis <- JALANKAN Q-C09-03 dengan (idProduk milik objek)
    RETURN jenis
END FUNCTION
```

Tabel 5.9.5. Query Operasi getJenisDistribusi()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C09-03* | *SELECT jenis_distribusi FROM metode_distribusi_surplus WHERE id_produk = $1;* | *Mengambil jenis distribusi saja berdasarkan id_produk objek saat ini.* |

## 5.10 Kelas DokumenKlaim

**Nama Kelas:** *DokumenKlaim*  
**ID Kelas:** *C10*

Tabel 5.10.1. Operasi Kelas DokumenKlaim

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *catatKlaim(idNgo: Number, idSurplus: Number): Number* | *Public* | *Mencatat data klaim baru oleh NGO untuk suatu produk surplus dan mengembalikan idKlaim.* |
| *getDetailKlaim(idKlaim: Number): Object* | *Public* | *Mengambil data detail klaim berdasarkan idKlaim.* |
| *getWaktuKlaim(idKlaim: Number): DateTime* | *Public* | *Mengambil informasi waktu klaim dilakukan.* |
| *getStatusKlaim(idKlaim: Number): String* | *Public* | *Mengambil status dari suatu klaim.* |

Tabel 5.10.2. Atribut Kelas DokumenKlaim

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idKlaim* | *Private* | *Number* |
| *idNgo* | *Private* | *Number* |
| *idSurplus* | *Private* | *Number* |
| *waktuKlaim* | *Private* | *DateTime* |
| *statusKlaim* | *Private* | *String* |

### 5.10.1 Algoritma/Query

**Nama Kelas:** *DokumenKlaim*  
**Nama Operasi:** *catatKlaim(idNgo: Number, idSurplus: Number): Number*  
**ID Algoritma:** *Algo-C10-01*

```text
FUNCTION catatKlaim(idNgo, idSurplus)
    waktuSekarang <- DAPATKAN WAKTU SEKARANG
    idKlaim <- JALANKAN Q-C10-01 dengan (idNgo, idSurplus, waktuSekarang)
    RETURN idKlaim
END FUNCTION
```

Tabel 5.10.3. Query Operasi catatKlaim()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C10-01* | *INSERT INTO dokumen_klaim (id_ngo, id_surplus, waktu_klaim, status_klaim) VALUES ($1, $2, $3, 'terklaim') RETURNING id_klaim;* | *Menyimpan data klaim baru dengan status awal "terklaim" dan mengembalikan id_klaim.* |

### 5.10.2 Algoritma/Query

**Nama Kelas:** *DokumenKlaim*  
**Nama Operasi:** *getDetailKlaim(idKlaim: Number): Object*  
**ID Algoritma:** *Algo-C10-02*

```text
FUNCTION getDetailKlaim(idKlaim)
    detailKlaim <- JALANKAN Q-C10-02 dengan (idKlaim)
    IF detailKlaim kosong THEN
        RAISE Error("Dokumen klaim tidak ditemukan.")
    END IF
    RETURN detailKlaim
END FUNCTION
```

Tabel 5.10.4. Query Operasi getDetailKlaim()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C10-02* | *SELECT id_klaim, id_ngo, id_surplus, waktu_klaim, status_klaim FROM dokumen_klaim WHERE id_klaim = $1;* | *Mengambil seluruh detail data klaim berdasarkan id_klaim.* |

### 5.10.3 Algoritma/Query

**Nama Kelas:** *DokumenKlaim*  
**Nama Operasi:** *getWaktuKlaim(idKlaim: Number): DateTime*  
**ID Algoritma:** *Algo-C10-03*

```text
FUNCTION getWaktuKlaim(idKlaim)
    waktuKlaim <- JALANKAN Q-C10-03 dengan (idKlaim)
    RETURN waktuKlaim
END FUNCTION
```

Tabel 5.10.5. Query Operasi getWaktuKlaim()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C10-03* | *SELECT waktu_klaim FROM dokumen_klaim WHERE id_klaim = $1;* | *Mengambil data waktu klaim berdasarkan id_klaim.* |

### 5.10.4 Algoritma/Query

**Nama Kelas:** *DokumenKlaim*  
**Nama Operasi:** *getStatusKlaim(idKlaim: Number): String*  
**ID Algoritma:** *Algo-C10-04*

```text
FUNCTION getStatusKlaim(idKlaim)
    statusKlaim <- JALANKAN Q-C10-04 dengan (idKlaim)
    RETURN statusKlaim
END FUNCTION
```

Tabel 5.10.6. Query Operasi getStatusKlaim()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C10-04* | *SELECT status_klaim FROM dokumen_klaim WHERE id_klaim = $1;* | *Mengambil status klaim berdasarkan id_klaim.* |

## 5.11 Kelas LogAktivitas

**Nama Kelas:** *LogAktivitas*  
**ID Kelas:** *C11*

Tabel 5.11.1. Operasi Kelas LogAktivitas

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *getDaftarLog(): Array* | *Public* | *Mengambil seluruh daftar log aktivitas pengguna yang tersimpan di database.* |
| *cariLog(kriteria: String): Array* | *Public* | *Mencari dan menyaring daftar log aktivitas berdasarkan kriteria (jenis aktivitas) yang dipilih.* |

Tabel 5.11.2. Atribut Kelas LogAktivitas

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idLog* | *Private* | *Number* |
| *aktivitas* | *Private* | *String* |
| *waktu* | *Private* | *DateTime* |

### 5.11.1 Algoritma/Query

**Nama Kelas:** *LogAktivitas*  
**Nama Operasi:** *getDaftarLog(): Array*  
**ID Algoritma:** *Algo-C11-01*

```text
FUNCTION getDaftarLog()
    daftarLog <- JALANKAN Q-C11-01
    RETURN daftarLog
END FUNCTION
```

Tabel 5.11.3. Query Operasi getDaftarLog()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C11-01* | *SELECT id_log, aktivitas, waktu FROM log_aktivitas ORDER BY waktu DESC;* | *Mengambil seluruh data log aktivitas dan mengurutkannya dari yang terbaru.* |

### 5.11.2 Algoritma/Query

**Nama Kelas:** *LogAktivitas*  
**Nama Operasi:** *cariLog(kriteria: String): Array*  
**ID Algoritma:** *Algo-C11-02*

```text
FUNCTION cariLog(kriteria)
    IF kriteria = "Semua" THEN
        daftarLog <- JALANKAN Q-C11-01
    ELSE
        daftarLog <- JALANKAN Q-C11-02 dengan (kriteria)
    END IF
    RETURN daftarLog
END FUNCTION
```

Tabel 5.11.4. Query Operasi cariLog()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C11-02* | *SELECT id_log, aktivitas, waktu FROM log_aktivitas WHERE aktivitas ILIKE '%' || $1 || '%' ORDER BY waktu DESC;* | *Mengambil log aktivitas yang mengandung kata kunci kriteria tertentu (misal: "Klaim", "Surplus", atau "Verifikasi").* |

>>>>>>> Stashed changes
## 5.24 Kelas PenjualanController

**Nama Kelas:** *PenjualanController*  
**ID Kelas:** *C24*

Tabel 5.24.1. Operasi Kelas PenjualanController

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *validasiInputPenjualan(dataPenjualan: Array): Boolean* | *Public* | *Memeriksa isian penjualan harian untuk setiap produk: idProduk harus terisi, serta jumlahTerjual dan jumlahTersisa harus bilangan bulat yang tidak kurang dari 0. Mengembalikan false jika ada isian yang tidak valid.* |
| *simpanDataPenjualan(dataPenjualan: Array): void* | *Public* | *Operasi utama UC04. Memvalidasi isian terlebih dahulu, lalu meminta DataPenjualan menyimpan data penjualan harian. Jika isian tidak valid, data tidak disimpan dan muncul galat untuk ditampilkan PenjualanPage.* |

Tabel 5.24.2. Atribut Kelas PenjualanController

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.24.1 Algoritma/Query

**Nama Kelas:** *PenjualanController*  
**Nama Operasi:** *validasiInputPenjualan(dataPenjualan: Array): Boolean*  
**ID Algoritma:** *Algo-C24-01*

```text
FUNCTION validasiInputPenjualan(dataPenjualan)
    IF dataPenjualan kosong THEN
        RETURN false
    END IF
    UNTUK SETIAP produk DALAM dataPenjualan
        IF produk.idProduk kosong THEN
            RETURN false
        END IF
        IF produk.jumlahTerjual BUKAN bilangan bulat ATAU produk.jumlahTerjual < 0 THEN
            RETURN false
        END IF
        IF produk.jumlahTersisa BUKAN bilangan bulat ATAU produk.jumlahTersisa < 0 THEN
            RETURN false
        END IF
    AKHIR UNTUK
    RETURN true
END FUNCTION
```

### 5.24.2 Algoritma/Query

**Nama Kelas:** *PenjualanController*  
**Nama Operasi:** *simpanDataPenjualan(dataPenjualan: Array): void*  
**ID Algoritma:** *Algo-C24-02*

```text
PROCEDURE simpanDataPenjualan(dataPenjualan)
    IF NOT validasiInputPenjualan(dataPenjualan) THEN
        RAISE Error("Format isian penjualan tidak valid.")
    END IF
    catatPenjualan(dataPenjualan) pada DataPenjualan
END PROCEDURE
```

## 5.25 Kelas PrediksiController

**Nama Kelas:** *PrediksiController*  
**ID Kelas:** *C25*

Tabel 5.25.1. Operasi Kelas PrediksiController

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *cekKecukupanData(): Boolean* | *Public* | *Memeriksa apakah data historis penjualan sudah memenuhi syarat minimal 7 hari untuk dipakai prediksi. Mengembalikan false jika data belum cukup.* |
| *jalankanPrediksi(): Array* | *Public* | *Operasi utama UC05. Memeriksa kecukupan data historis, lalu meminta PrediksiProduksi menghitung rekomendasi produksi dan mengembalikan hasilnya untuk ditampilkan PrediksiPage. Jika data belum cukup, muncul galat.* |

Tabel 5.25.2. Atribut Kelas PrediksiController

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.25.1 Algoritma/Query

**Nama Kelas:** *PrediksiController*  
**Nama Operasi:** *cekKecukupanData(): Boolean*  
**ID Algoritma:** *Algo-C25-01*

```text
FUNCTION cekKecukupanData()
    dataHistoris <- getDataHistoris() pada DataPenjualan
    IF JUMLAH(dataHistoris) < 7 THEN
        RETURN false
    END IF
    RETURN true
END FUNCTION
```

### 5.25.2 Algoritma/Query

**Nama Kelas:** *PrediksiController*  
**Nama Operasi:** *jalankanPrediksi(): Array*  
**ID Algoritma:** *Algo-C25-02*

```text
FUNCTION jalankanPrediksi()
    IF NOT cekKecukupanData() THEN
        RAISE Error("Data historis belum memenuhi syarat minimal 7 hari.")
    END IF
    dataHistoris <- getDataHistoris() pada DataPenjualan
    buatPrediksi(dataHistoris) pada PrediksiProduksi
    hasilPrediksi <- getHasilPrediksi() pada PrediksiProduksi
    RETURN hasilPrediksi
END FUNCTION
```

## 5.26 Kelas ProdukSurplusController

**Nama Kelas:** *ProdukSurplusController*  
**ID Kelas:** *C26*

Tabel 5.26.1. Operasi Kelas ProdukSurplusController

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *validasiDataSurplus(dataSurplus: Object): Boolean* | *Public* | *Memeriksa data produk surplus dari ProdukSurplusPage: idProduk harus terisi, jumlah harus angka lebih dari nol, dan batasWaktuPengambilan tidak boleh di masa lalu. Mengembalikan false jika ada isian yang tidak valid.* |
| *simpanDataSurplus(dataSurplus: Object): Number* | *Public* | *Titik akhir UC06. Memvalidasi data surplus, lalu meminta ProdukSurplus menyimpannya. Mengembalikan idSurplus yang terbentuk. Jika data tidak valid, muncul galat.* |
| *tampilkanFormDistribusi(idSurplus: Number): Object* | *Public* | *Titik awal UC07. Mengambil ringkasan produk surplus yang dipilih dan opsi metode distribusi (\"Donasi\" atau \"Jual Diskon\") untuk ditampilkan DistribusiSurplusPage.* |
| *validasiMetodeDistribusi(jenisDistribusi: String, harga: Number): Boolean* | *Public* | *Memeriksa pilihan distribusi: jenisDistribusi harus \"Donasi\" atau \"Jual Diskon\". Untuk \"Jual Diskon\", harga harus angka lebih dari nol. Untuk \"Donasi\", harga harus kosong atau nol.* |
| *simpanMetodeDistribusi(idSurplus: Number, jenisDistribusi: String, harga: Number): void* | *Public* | *Operasi utama UC07. Memvalidasi pilihan distribusi, lalu meminta MetodeDistribusiSurplus menyimpannya untuk produk surplus terkait. Jika tidak valid (misalnya harga jual tidak valid), muncul galat.* |

Tabel 5.26.2. Atribut Kelas ProdukSurplusController

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.26.1 Algoritma/Query

**Nama Kelas:** *ProdukSurplusController*  
**Nama Operasi:** *validasiDataSurplus(dataSurplus: Object): Boolean*  
**ID Algoritma:** *Algo-C26-01*

```text
FUNCTION validasiDataSurplus(dataSurplus)
    IF dataSurplus.idProduk kosong THEN
        RETURN false
    END IF
    IF dataSurplus.jumlah BUKAN angka ATAU dataSurplus.jumlah <= 0 THEN
        RETURN false
    END IF
    IF dataSurplus.batasWaktuPengambilan kosong
       ATAU dataSurplus.batasWaktuPengambilan < WAKTU_SEKARANG THEN
        RETURN false
    END IF
    RETURN true
END FUNCTION
```

### 5.26.2 Algoritma/Query

**Nama Kelas:** *ProdukSurplusController*  
**Nama Operasi:** *simpanDataSurplus(dataSurplus: Object): Number*  
**ID Algoritma:** *Algo-C26-02*

```text
FUNCTION simpanDataSurplus(dataSurplus)
    IF NOT validasiDataSurplus(dataSurplus) THEN
        RAISE Error("Data produk surplus tidak valid.")
    END IF
    idSurplus <- simpanProdukSurplus(dataSurplus) pada ProdukSurplus
    RETURN idSurplus
END FUNCTION
```

### 5.26.3 Algoritma/Query

**Nama Kelas:** *ProdukSurplusController*  
**Nama Operasi:** *tampilkanFormDistribusi(idSurplus: Number): Object*  
**ID Algoritma:** *Algo-C26-03*

```text
FUNCTION tampilkanFormDistribusi(idSurplus)
    IF idSurplus kosong THEN
        RAISE Error("idSurplus harus diisi.")
    END IF
    detailSurplus <- getDetailSurplus(idSurplus) pada ProdukSurplus
    opsiDistribusi <- DAFTAR ("Donasi", "Jual Diskon")
    RETURN { detailSurplus, opsiDistribusi }
END FUNCTION
```

### 5.26.4 Algoritma/Query

**Nama Kelas:** *ProdukSurplusController*  
**Nama Operasi:** *validasiMetodeDistribusi(jenisDistribusi: String, harga: Number): Boolean*  
**ID Algoritma:** *Algo-C26-04*

```text
FUNCTION validasiMetodeDistribusi(jenisDistribusi, harga)
    IF jenisDistribusi BUKAN salah satu dari ("Donasi", "Jual Diskon") THEN
        RETURN false
    END IF
    IF jenisDistribusi = "Jual Diskon" THEN
        IF harga kosong ATAU harga BUKAN angka ATAU harga <= 0 THEN
            RETURN false
        END IF
    ELSE
        IF harga tidak kosong DAN harga <> 0 THEN
            RETURN false
        END IF
    END IF
    RETURN true
END FUNCTION
```

### 5.26.5 Algoritma/Query

**Nama Kelas:** *ProdukSurplusController*  
**Nama Operasi:** *simpanMetodeDistribusi(idSurplus: Number, jenisDistribusi: String, harga: Number): void*  
**ID Algoritma:** *Algo-C26-05*

```text
PROCEDURE simpanMetodeDistribusi(idSurplus, jenisDistribusi, harga)
    IF NOT validasiMetodeDistribusi(jenisDistribusi, harga) THEN
        RAISE Error("Metode distribusi atau harga penjualan tidak valid.")
    END IF
    IF jenisDistribusi = "Donasi" THEN
        harga <- 0
    END IF
    pilihMetodeDistribusi(idSurplus, jenisDistribusi, harga) pada MetodeDistribusiSurplus
END PROCEDURE
```

## 5.27 Kelas SurplusController

**Nama Kelas:** *SurplusController*  
**ID Kelas:** *C27*

Tabel 5.27.1. Operasi Kelas SurplusController

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *ambilDaftarSurplus(lokasi: String): Array* | *Public* | *Operasi utama UC08. Mengambil produk surplus yang masih tersedia, melengkapi tiap produk dengan data produk, metode distribusi, dan jarak ke lokasi pengguna (dihitung GeolocationAdapter), lalu mengurutkannya dari jarak terdekat. Jika lokasi kosong, muncul galat. Hasilnya juga dipakai PenyaringanController (C34) pada UC09.* |
| *ambilDetailSurplus(idSurplus: Number, lokasi: String): Object* | *Public* | *Mengambil detail satu produk surplus (produk, jumlah, batas pengambilan, metode distribusi, alamat dan jarak lokasi pengambilan) untuk ditampilkan pada halaman detail produk.* |
| *urutkanBerdasarkanJarak(daftarSurplus: Array): Array* | *Public* | *Mengurutkan daftar produk surplus dari jarakProduk terkecil ke terbesar.* |

Tabel 5.27.2. Atribut Kelas SurplusController

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.27.1 Algoritma/Query

**Nama Kelas:** *SurplusController*  
**Nama Operasi:** *ambilDaftarSurplus(lokasi: String): Array*  
**ID Algoritma:** *Algo-C27-01*

```text
FUNCTION ambilDaftarSurplus(lokasi)
    IF lokasi kosong THEN
        RAISE Error("Lokasi pengguna belum tersedia.")
    END IF
    daftarSurplus <- getProdukSurplusTersedia() pada ProdukSurplus
    hasil <- DAFTAR KOSONG
    UNTUK SETIAP surplus DALAM daftarSurplus
        detailProduk <- getDetailProduk() pada Produk milik surplus.idProduk
        infoDistribusi <- getInfoDistribusi() pada MetodeDistribusiSurplus milik surplus.idSurplus
        lokasiPemilik <- getLokasiUsaha(surplus.idPemilik) pada PemilikFnB
        jarak <- hitungJarak(lokasi, lokasiPemilik) pada GeolocationAdapter
        TAMBAHKAN {
            idSurplus: surplus.idSurplus,
            namaProduk: detailProduk.namaProduk,
            jenisProduk: detailProduk.kategori,
            jumlah: surplus.jumlah,
            batasWaktuPengambilan: surplus.batasWaktuPengambilan,
            jenisDistribusi: infoDistribusi.jenisDistribusi,
            harga: infoDistribusi.harga,
            jarakProduk: jarak
        } KE hasil
    AKHIR UNTUK
    RETURN urutkanBerdasarkanJarak(hasil)
END FUNCTION
```

### 5.27.2 Algoritma/Query

**Nama Kelas:** *SurplusController*  
**Nama Operasi:** *ambilDetailSurplus(idSurplus: Number, lokasi: String): Object*  
**ID Algoritma:** *Algo-C27-02*

```text
FUNCTION ambilDetailSurplus(idSurplus, lokasi)
    IF idSurplus kosong THEN
        RAISE Error("idSurplus harus diisi.")
    END IF
    detailSurplus <- getDetailSurplus(idSurplus) pada ProdukSurplus
    detailProduk <- getDetailProduk() pada Produk milik detailSurplus.idProduk
    infoDistribusi <- getInfoDistribusi() pada MetodeDistribusiSurplus milik idSurplus
    lokasiPemilik <- getLokasiUsaha(detailSurplus.idPemilik) pada PemilikFnB
    jarak <- hitungJarak(lokasi, lokasiPemilik) pada GeolocationAdapter
    RETURN GABUNGKAN detailSurplus, detailProduk, infoDistribusi, lokasiPemilik, dan jarak
END FUNCTION
```

### 5.27.3 Algoritma/Query

**Nama Kelas:** *SurplusController*  
**Nama Operasi:** *urutkanBerdasarkanJarak(daftarSurplus: Array): Array*  
**ID Algoritma:** *Algo-C27-03*

```text
FUNCTION urutkanBerdasarkanJarak(daftarSurplus)
    RETURN URUTKAN daftarSurplus MENAIK berdasarkan jarakProduk
END FUNCTION
```

## 5.28 Kelas KlaimController

**Nama Kelas:** *KlaimController*  
**ID Kelas:** *C28*

Tabel 5.28.1. Operasi Kelas KlaimController

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *cekKetersediaan(idSurplus: Number): Boolean* | *Public* | *Memeriksa apakah produk surplus masih berstatus \"tersedia\". Mengembalikan false jika produk sudah diklaim NGO lain.* |
| *kunciProduk(idSurplus: Number): void* | *Public* | *Mengubah status produk surplus menjadi \"terklaim\" agar tidak dapat diklaim NGO lain.* |
| *setujuiKlaim(idSurplus: Number, idNgo: Number): Number* | *Public* | *Operasi utama UC10 pada skenario normal. Memastikan produk masih tersedia, mengunci produk, lalu mencatat klaim. Mengembalikan idKlaim.* |
| *tolakKlaim(idSurplus: Number): String* | *Public* | *Skenario alternatif UC10 saat produk sudah diklaim NGO lain. Mengembalikan pesan penolakan untuk ditampilkan KlaimPage.* |
| *ambilDetailPengambilan(idKlaim: Number): Object* | *Public* | *Titik awal UC11. Mengambil detail klaim beserta data produk surplus, Pemilik F&B, dan Perwakilan NGO untuk ditampilkan PengambilanPage.* |
| *konfirmasiPengambilan(idKlaim: Number): String* | *Public* | *Operasi utama UC11. Menandai pengambilan produk surplus sebagai selesai dan mengembalikan pesan keberhasilan. Jika pengambilan sudah pernah dikonfirmasi, muncul galat.* |

Tabel 5.28.2. Atribut Kelas KlaimController

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.28.1 Algoritma/Query

**Nama Kelas:** *KlaimController*  
**Nama Operasi:** *cekKetersediaan(idSurplus: Number): Boolean*  
**ID Algoritma:** *Algo-C28-01*

```text
FUNCTION cekKetersediaan(idSurplus)
    statusSurplus <- getStatus() pada ProdukSurplus milik idSurplus
    IF statusSurplus = "tersedia" THEN
        RETURN true
    END IF
    RETURN false
END FUNCTION
```

### 5.28.2 Algoritma/Query

**Nama Kelas:** *KlaimController*  
**Nama Operasi:** *kunciProduk(idSurplus: Number): void*  
**ID Algoritma:** *Algo-C28-02*

```text
PROCEDURE kunciProduk(idSurplus)
    setStatus(idSurplus, "terklaim") pada ProdukSurplus
END PROCEDURE
```

### 5.28.3 Algoritma/Query

**Nama Kelas:** *KlaimController*  
**Nama Operasi:** *setujuiKlaim(idSurplus: Number, idNgo: Number): Number*  
**ID Algoritma:** *Algo-C28-03*

```text
FUNCTION setujuiKlaim(idSurplus, idNgo)
    IF NOT cekKetersediaan(idSurplus) THEN
        RAISE Error("Produk surplus sudah tidak tersedia.")
    END IF
    kunciProduk(idSurplus)
    idKlaim <- catatKlaim(idNgo, idSurplus) pada DokumenKlaim
    RETURN idKlaim
END FUNCTION
```

### 5.28.4 Algoritma/Query

**Nama Kelas:** *KlaimController*  
**Nama Operasi:** *tolakKlaim(idSurplus: Number): String*  
**ID Algoritma:** *Algo-C28-04*

```text
FUNCTION tolakKlaim(idSurplus)
    RETURN "Produk surplus sudah diklaim oleh NGO lain."
END FUNCTION
```

### 5.28.5 Algoritma/Query

**Nama Kelas:** *KlaimController*  
**Nama Operasi:** *ambilDetailPengambilan(idKlaim: Number): Object*  
**ID Algoritma:** *Algo-C28-05*

```text
FUNCTION ambilDetailPengambilan(idKlaim)
    IF idKlaim kosong THEN
        RAISE Error("idKlaim harus diisi.")
    END IF
    detailKlaim <- getDetailKlaim(idKlaim) pada DokumenKlaim
    detailSurplus <- getDetailSurplus(detailKlaim.idSurplus) pada ProdukSurplus
    dataUsaha <- getDataUsaha() pada PemilikFnB milik detailSurplus.idPemilik
    dataNgo <- getDataNgo() pada PerwakilanNGO milik detailKlaim.idNgo
    RETURN GABUNGKAN detailKlaim, detailSurplus, dataUsaha, dan dataNgo
END FUNCTION
```

### 5.28.6 Algoritma/Query

**Nama Kelas:** *KlaimController*  
**Nama Operasi:** *konfirmasiPengambilan(idKlaim: Number): String*  
**ID Algoritma:** *Algo-C28-06*

```text
FUNCTION konfirmasiPengambilan(idKlaim)
    detailKlaim <- getDetailKlaim(idKlaim) pada DokumenKlaim
    statusSurplus <- getStatus() pada ProdukSurplus milik detailKlaim.idSurplus
    IF statusSurplus = "selesai" THEN
        RAISE Error("Pengambilan produk surplus sudah dikonfirmasi.")
    END IF
    setStatus(detailKlaim.idSurplus, "selesai") pada ProdukSurplus
    RETURN "Pengambilan produk surplus berhasil dikonfirmasi."
END FUNCTION
```

## 5.29 Kelas LogController

**Nama Kelas:** *LogController*  
**ID Kelas:** *C29*

Tabel 5.29.1. Operasi Kelas LogController

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *tampilkanLog(): Object* | *Public* | *Mengambil seluruh log aktivitas pengguna dari LogAktivitas, lalu mengembalikannya bersama pilihan penyaringan untuk ditampilkan oleh LogAktivitasPage. Jika belum ada log, daftarLog berupa array kosong.* |
| *saringLog(kriteria: String): Array* | *Public* | *Meminta LogAktivitas mencari log sesuai jenis aktivitas yang dipilih admin ("Semua", "Klaim", "Surplus", atau "Verifikasi"). Jika tidak ada log yang cocok, mengembalikan array kosong.* |

Tabel 5.29.2. Atribut Kelas LogController

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.29.1 Algoritma/Query

**Nama Kelas:** *LogController*  
**Nama Operasi:** *tampilkanLog(): Object*  
**ID Algoritma:** *Algo-C29-01*

```text
FUNCTION tampilkanLog()
    daftarLog <- getDaftarLog() pada LogAktivitas
    pilihanFilter <- DAFTAR ("Semua", "Klaim", "Surplus", "Verifikasi")
    RETURN { daftarLog, pilihanFilter }
END FUNCTION
```

### 5.29.2 Algoritma/Query

**Nama Kelas:** *LogController*  
**Nama Operasi:** *saringLog(kriteria: String): Array*  
**ID Algoritma:** *Algo-C29-02*

```text
FUNCTION saringLog(kriteria)
    IF kriteria BUKAN salah satu dari ("Semua", "Klaim", "Surplus", "Verifikasi") THEN
        RAISE Error("Kriteria penyaringan tidak valid.")
    END IF
    hasilLog <- cariLog(kriteria) pada LogAktivitas
    RETURN hasilLog
END FUNCTION
```

## 5.30 Kelas PemilikFnB

**Nama Kelas:** *PemilikFnB*  
**ID Kelas:** *C30*

Tabel 5.30.1. Operasi Kelas PemilikFnB

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *getLokasiUsaha(idPemilik: Number): String* | *Public* | *Mengambil alamat usaha milik Pemilik F&B berdasarkan idPemilik. Dipakai SurplusController untuk menghitung jarak produk surplus ke lokasi NGO (UC08, UC09, UC10).* |
| *getDataUsaha(): Object* | *Public* | *Mengambil data usaha Pemilik F&B (namaUsaha, alamatUsaha, jamOperasional) berdasarkan idPemilik milik objek. Dipakai KlaimController untuk menampilkan pihak yang terlibat pada detail pengambilan produk surplus (UC11).* |
| *aturDistribusiSurplus(): void* | *Public* | *Titik awal UC07: membuka DistribusiSurplusPage agar Pemilik F&B dapat memilih produk surplus dan mengatur metode distribusinya.* |
| *catatProdukSurplus(dataSurplus: Object): void* | *Public* | *Titik awal UC06: meneruskan data produk surplus (produk, jumlah, batas waktu pengambilan) ke ProdukSurplusPage.* |
| *lihatHasilPrediksi(): void* | *Public* | *Titik awal UC05: membuka PrediksiPage agar Pemilik F&B dapat melihat rekomendasi produksi.* |
| *bukaMenuSurplus(): void* | *Public* | *Membuka ProdukSurplusPage agar Pemilik F&B dapat mencatat produk surplus (UC06).* |
| *resetFormulir(): void* | *Public* | *Meminta ProdukSurplusPage mengosongkan kembali isian formulir pencatatan produk surplus.* |

Tabel 5.30.2. Atribut Kelas PemilikFnB

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *idPemilik* | *Private* | *Number* |
| *namaUsaha* | *Private* | *String* |
| *alamatUsaha* | *Private* | *String* |
| *jamOperasional* | *Private* | *String* |

*Kelas ini merupakan subkelas AkunPengguna (C01) sehingga mewarisi atribut idAkun, email, kataSandi, dan tipeAkun.*

### 5.30.1 Algoritma/Query

**Nama Kelas:** *PemilikFnB*  
**Nama Operasi:** *getLokasiUsaha(idPemilik: Number): String*  
**ID Algoritma:** *Algo-C30-01*

```text
FUNCTION getLokasiUsaha(idPemilik)
    IF idPemilik kosong THEN
        RAISE Error("idPemilik harus diisi.")
    END IF
    dataPemilik <- JALANKAN Q-C30-01 dengan (idPemilik)
    IF dataPemilik kosong THEN
        RAISE Error("Data Pemilik F&B tidak ditemukan.")
    END IF
    RETURN dataPemilik.alamat_usaha
END FUNCTION
```

### 5.30.2 Algoritma/Query

**Nama Kelas:** *PemilikFnB*  
**Nama Operasi:** *aturDistribusiSurplus(): void*  
**ID Algoritma:** *Algo-C30-02*

```text
PROCEDURE aturDistribusiSurplus()
    NAVIGATOR.goTo(DistribusiSurplusPage)
END PROCEDURE
```

### 5.30.3 Algoritma/Query

**Nama Kelas:** *PemilikFnB*  
**Nama Operasi:** *catatProdukSurplus(dataSurplus: Object): void*  
**ID Algoritma:** *Algo-C30-03*

```text
PROCEDURE catatProdukSurplus(dataSurplus)
    kirimDataSurplus(dataSurplus) pada ProdukSurplusPage
END PROCEDURE
```

### 5.30.4 Algoritma/Query

**Nama Kelas:** *PemilikFnB*  
**Nama Operasi:** *lihatHasilPrediksi(): void*  
**ID Algoritma:** *Algo-C30-04*

```text
PROCEDURE lihatHasilPrediksi()
    NAVIGATOR.goTo(PrediksiPage)
END PROCEDURE
```

### 5.30.5 Algoritma/Query

**Nama Kelas:** *PemilikFnB*  
**Nama Operasi:** *getDataUsaha(): Object*  
**ID Algoritma:** *Algo-C30-05*

```text
FUNCTION getDataUsaha()
    dataUsaha <- JALANKAN Q-C30-02 dengan (idPemilik milik objek)
    IF dataUsaha kosong THEN
        RAISE Error("Data Pemilik F&B tidak ditemukan.")
    END IF
    RETURN { namaUsaha: dataUsaha.nama_usaha,
             alamatUsaha: dataUsaha.alamat_usaha,
             jamOperasional: dataUsaha.jam_operasional }
END FUNCTION
```

Tabel 5.30.7. Query Operasi getDataUsaha()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C30-02* | *SELECT nama_usaha, alamat_usaha, jam_operasional FROM pemilik_fnb WHERE id_pemilik = $1;* | *Mengambil data usaha dari tabel pemilik_fnb berdasarkan id_pemilik* |

### 5.30.6 Algoritma/Query

**Nama Kelas:** *PemilikFnB*  
**Nama Operasi:** *bukaMenuSurplus(): void*  
**ID Algoritma:** *Algo-C30-06*

```text
PROCEDURE bukaMenuSurplus()
    NAVIGATOR.goTo(ProdukSurplusPage)
END PROCEDURE
```

Tabel 5.30.8. Query Operasi bukaMenuSurplus()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *-* | *-* | *Operasi navigasi antarmuka.* |

### 5.30.7 Algoritma/Query

**Nama Kelas:** *PemilikFnB*  
**Nama Operasi:** *resetFormulir(): void*  
**ID Algoritma:** *Algo-C30-07*

```text
PROCEDURE resetFormulir()
    RESET TAMPILAN FORMULIR PADA ProdukSurplusPage
END PROCEDURE
```

Tabel 5.30.9. Query Operasi resetFormulir()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *-* | *-* | *Operasi pengelolaan tampilan pada sisi klien (View).* |

## 5.31 Kelas PerwakilanNGO

**Nama Kelas:** *PerwakilanNGO*  
**ID Kelas:** *C31*

Tabel 5.31.1. Operasi Kelas PerwakilanNGO

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *lihatDaftarSurplus(): void* | *Public* | *Titik awal UC08: membuka DaftarSurplusPage agar Perwakilan NGO dapat melihat daftar produk surplus yang terurut berdasarkan jarak terdekat.* |
| *saringDaftarSurplus(): void* | *Public* | *Titik awal UC09: membuka fitur pencarian dan penyaringan pada DaftarSurplusPage.* |
| *ajukanKlaim(idSurplus: Number): Boolean* | *Public* | *Titik awal pengajuan klaim pada UC10: meneruskan idSurplus ke KlaimPage. Mengembalikan false jika idSurplus kosong.* |
| *getDataNgo(): Object* | *Public* | *Mengambil data Perwakilan NGO (namaOrganisasi, nomorLegalitas, lokasi) berdasarkan idAkun milik objek, yang nilainya sama dengan idNgo pada DokumenKlaim. Dipakai KlaimController untuk menampilkan pihak yang terlibat pada detail pengambilan produk surplus (UC11).* |

Tabel 5.31.2. Atribut Kelas PerwakilanNGO

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *namaOrganisasi* | *Private* | *String* |
| *nomorLegalitas* | *Private* | *String* |
| *lokasi* | *Private* | *String* |

*Kelas ini merupakan subkelas AkunPengguna (C01) sehingga mewarisi atribut idAkun, email, kataSandi, dan tipeAkun.*

### 5.31.1 Algoritma/Query

**Nama Kelas:** *PerwakilanNGO*  
**Nama Operasi:** *lihatDaftarSurplus(): void*  
**ID Algoritma:** *Algo-C31-01*

```text
PROCEDURE lihatDaftarSurplus()
    NAVIGATOR.goTo(DaftarSurplusPage)
END PROCEDURE
```

### 5.31.2 Algoritma/Query

**Nama Kelas:** *PerwakilanNGO*  
**Nama Operasi:** *saringDaftarSurplus(): void*  
**ID Algoritma:** *Algo-C31-02*

```text
PROCEDURE saringDaftarSurplus()
    tampilkanFormFilter() pada DaftarSurplusPage
END PROCEDURE
```

### 5.31.3 Algoritma/Query

**Nama Kelas:** *PerwakilanNGO*  
**Nama Operasi:** *ajukanKlaim(idSurplus: Number): Boolean*  
**ID Algoritma:** *Algo-C31-03*

```text
FUNCTION ajukanKlaim(idSurplus)
    IF idSurplus kosong THEN
        RETURN false
    END IF
    kirimKlaim(idSurplus) pada KlaimPage
    RETURN true
END FUNCTION
```

### 5.31.4 Algoritma/Query

**Nama Kelas:** *PerwakilanNGO*  
**Nama Operasi:** *getDataNgo(): Object*  
**ID Algoritma:** *Algo-C31-04*

```text
FUNCTION getDataNgo()
    dataNgo <- JALANKAN Q-C31-01 dengan (idAkun milik objek)
    IF dataNgo kosong THEN
        RAISE Error("Data Perwakilan NGO tidak ditemukan.")
    END IF
    RETURN { namaOrganisasi: dataNgo.nama_organisasi,
             nomorLegalitas: dataNgo.nomor_legalitas,
             lokasi: dataNgo.lokasi }
END FUNCTION
```

Tabel 5.31.6. Query Operasi getDataNgo()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *Q-C31-01* | *SELECT nama_organisasi, nomor_legalitas, lokasi FROM perwakilan_ngo WHERE id_akun = $1;* | *Mengambil data organisasi dari tabel perwakilan_ngo berdasarkan id_akun* |

## 5.32 Kelas AdminSistem

**Nama Kelas:** *AdminSistem*  
**ID Kelas:** *C32*

Tabel 5.32.1. Operasi Kelas AdminSistem

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *verifikasiPendaftaran(idPendaftaran: Number, keputusan: String): void* | *Public* | *Menjalankan keputusan verifikasi admin ("diterima" atau "ditolak") atas satu pendaftaran. Operasi ini memeriksa kewenangan admin dan keabsahan keputusan, lalu meminta Pendaftaran memperbarui statusVerifikasi.* |

Tabel 5.32.2. Atribut Kelas AdminSistem

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *kewenangan* | *Private* | *String* |

*Kelas ini merupakan subkelas AkunPengguna (C01) sehingga mewarisi atribut idAkun, email, kataSandi, dan tipeAkun.*

### 5.32.1 Algoritma/Query

**Nama Kelas:** *AdminSistem*  
**Nama Operasi:** *verifikasiPendaftaran(idPendaftaran: Number, keputusan: String): void*  
**ID Algoritma:** *Algo-C32-01*

```text
PROCEDURE verifikasiPendaftaran(idPendaftaran, keputusan)
    IF kewenangan milik objek TIDAK memuat "verifikasi" THEN
        RAISE Error("Admin tidak berwenang melakukan verifikasi.")
    END IF
    IF keputusan BUKAN "diterima" DAN keputusan BUKAN "ditolak" THEN
        RAISE Error("Keputusan verifikasi harus 'diterima' atau 'ditolak'.")
    END IF
    updateStatus(idPendaftaran, keputusan) pada Pendaftaran
END PROCEDURE
```

<<<<<<< Updated upstream
Tabel 5.32.3. Query Operasi verifikasiPendaftaran()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *-* | *-* | *Perubahan status disimpan oleh updateStatus() di kelas Pendaftaran (C02, Q-C02-04).* |

=======
>>>>>>> Stashed changes
## 5.33 Kelas GeolocationAdapter

**Nama Kelas:** *GeolocationAdapter*  
**ID Kelas:** *C33*

Tabel 5.33.1. Operasi Kelas GeolocationAdapter

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *hitungJarak(lokasiPengguna: String, lokasiPemilik: String): Number* | *Public* | *Menghitung jarak (dalam kilometer) antara lokasi Perwakilan NGO dan alamat usaha Pemilik F&B. Lokasi berupa koordinat "lat,lng" dari HTML5 Geolocation API atau alamat teks yang dikonversi menjadi koordinat melalui layanan peta pihak ketiga (Google Maps Geocoding API atau OpenStreetMap Nominatim). Dipanggil oleh SurplusController untuk setiap produk surplus.* |

Tabel 5.33.2. Atribut Kelas GeolocationAdapter

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.33.1 Algoritma/Query

**Nama Kelas:** *GeolocationAdapter*  
**Nama Operasi:** *hitungJarak(lokasiPengguna: String, lokasiPemilik: String): Number*  
**ID Algoritma:** *Algo-C33-01*

```text
FUNCTION hitungJarak(lokasiPengguna, lokasiPemilik)
    IF lokasiPengguna kosong ATAU lokasiPemilik kosong THEN
        RAISE Error("Lokasi pengguna dan lokasi pemilik harus diisi.")
    END IF

    koordinatPengguna <- AMBIL_KOORDINAT(lokasiPengguna)
    koordinatPemilik  <- AMBIL_KOORDINAT(lokasiPemilik)

    R <- 6371                                   // jari-jari bumi (km)
    dLat <- RADIAN(koordinatPemilik.lat - koordinatPengguna.lat)
    dLng <- RADIAN(koordinatPemilik.lng - koordinatPengguna.lng)
    a <- SIN(dLat / 2) ^ 2
         + COS(RADIAN(koordinatPengguna.lat)) * COS(RADIAN(koordinatPemilik.lat))
         * SIN(dLng / 2) ^ 2
    jarak <- 2 * R * ATAN2(SQRT(a), SQRT(1 - a))
    RETURN PEMBULATAN(jarak, 2)
END FUNCTION

<<<<<<< Updated upstream
// Fungsi bantu internal (bukan operasi kelas)
FUNCTION AMBIL_KOORDINAT(lokasi)
    IF lokasi berformat "lat,lng" THEN             // dari HTML5 Geolocation API
        RETURN { lat: PARSE(lat dari lokasi), lng: PARSE(lng dari lokasi) }
=======
### 5.33.2 Algoritma/Query

**Nama Kelas:** *GeolocationAdapter*  
**Nama Operasi:** *ambilKoordinat(alamat: String): Object*  
**ID Algoritma:** *Algo-C33-02*

```text
FUNCTION ambilKoordinat(alamat)
    IF alamat kosong THEN
        RAISE Error("Lokasi harus diisi.")
>>>>>>> Stashed changes
    END IF
    respons <- GEOCODING_API.cari(lokasi)          // Google Maps Geocoding API atau OSM Nominatim
    IF respons gagal ATAU respons kosong THEN
        RAISE Error("Lokasi tidak ditemukan: " + lokasi)
    END IF
    RETURN { lat: respons.lat, lng: respons.lng }
END FUNCTION
```

<<<<<<< Updated upstream
Tabel 5.33.3. Query Operasi hitungJarak()

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| *-* | *-* | *Kelas ini memakai layanan peta pihak ketiga, bukan database.* |

=======
>>>>>>> Stashed changes
## 5.34 Kelas PenyaringanController

**Nama Kelas:** *PenyaringanController*  
**ID Kelas:** *C34*

Tabel 5.34.1. Operasi Kelas PenyaringanController

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| *saringProdukSurplus(kataKunci: String, kriteriaFilter: Object, lokasi: String): Array* | *Public* | *Operasi utama UC09. Memvalidasi kriteria, mengambil daftar surplus terurut dari SurplusController, lalu menerapkan pencarian kata kunci dan penyaringan jenis, jarak, serta batas waktu. Mengembalikan array kosong jika tidak ada produk yang sesuai.* |
| *cariProdukSurplus(kataKunci: String, daftarSurplus: Array): Array* | *Public* | *Mencari produk surplus yang nama atau jenis produknya memuat kata kunci (tidak membedakan huruf besar/kecil).* |
| *validasiKriteria(kriteriaFilter: Object): Boolean* | *Private* | *Memeriksa kriteria penyaringan: jenisProduk harus "Semua", "Makanan", atau "Minuman"; jarakMaks harus angka lebih dari nol; batasWaktu tidak boleh di masa lalu. Kriteria yang kosong dianggap valid.* |
| *saringBerdasarkanJenis(daftarSurplus: Array, jenisProduk: String): Array* | *Private* | *Menyaring produk surplus berdasarkan jenis produk. Jika jenisProduk kosong atau "Semua", daftar dikembalikan apa adanya.* |
| *saringBerdasarkanJarak(daftarSurplus: Array, jarakMaks: Number): Array* | *Private* | *Menyaring produk surplus yang jarakProduk-nya tidak melebihi jarakMaks (km). Jarak sudah dihitung SurplusController melalui GeolocationAdapter. Jika jarakMaks kosong, daftar dikembalikan apa adanya.* |
| *saringBerdasarkanBatasWaktu(daftarSurplus: Array, batasWaktu: DateTime): Array* | *Private* | *Menyaring produk surplus yang batasWaktuPengambilan-nya tidak melewati batasWaktu. Jika batasWaktu kosong, daftar dikembalikan apa adanya.* |

Tabel 5.34.2. Atribut Kelas PenyaringanController

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| *-* | *-* | *-* |

### 5.34.1 Algoritma/Query

**Nama Kelas:** *PenyaringanController*  
**Nama Operasi:** *saringProdukSurplus(kataKunci: String, kriteriaFilter: Object, lokasi: String): Array*  
**ID Algoritma:** *Algo-C34-01*

```text
FUNCTION saringProdukSurplus(kataKunci, kriteriaFilter, lokasi)
    IF NOT validasiKriteria(kriteriaFilter) THEN
        RAISE Error("Kriteria penyaringan tidak valid.")
    END IF
    daftarSurplus <- ambilDaftarSurplus(lokasi) pada SurplusController
    hasil <- cariProdukSurplus(kataKunci, daftarSurplus)
    hasil <- saringBerdasarkanJenis(hasil, kriteriaFilter.jenisProduk)
    hasil <- saringBerdasarkanJarak(hasil, kriteriaFilter.jarakMaks)
    hasil <- saringBerdasarkanBatasWaktu(hasil, kriteriaFilter.batasWaktu)
    RETURN hasil
END FUNCTION
```

### 5.34.2 Algoritma/Query

**Nama Kelas:** *PenyaringanController*  
**Nama Operasi:** *cariProdukSurplus(kataKunci: String, daftarSurplus: Array): Array*  
**ID Algoritma:** *Algo-C34-02*

```text
FUNCTION cariProdukSurplus(kataKunci, daftarSurplus)
    IF kataKunci kosong THEN
        RETURN daftarSurplus
    END IF
    kata <- HURUF_KECIL(TRIM(kataKunci))
    hasil <- DAFTAR KOSONG
    UNTUK SETIAP produk DALAM daftarSurplus
        IF kata TERKANDUNG DALAM HURUF_KECIL(produk.namaProduk)
           ATAU kata TERKANDUNG DALAM HURUF_KECIL(produk.jenisProduk) THEN
            TAMBAHKAN produk KE hasil
        END IF
    AKHIR UNTUK
    RETURN hasil
END FUNCTION
```

### 5.34.3 Algoritma/Query

**Nama Kelas:** *PenyaringanController*  
**Nama Operasi:** *validasiKriteria(kriteriaFilter: Object): Boolean*  
**ID Algoritma:** *Algo-C34-03*

```text
FUNCTION validasiKriteria(kriteriaFilter)
    IF kriteriaFilter.jenisProduk tidak kosong
       DAN kriteriaFilter.jenisProduk BUKAN salah satu dari ("Semua", "Makanan", "Minuman") THEN
        RETURN false
    END IF
    IF kriteriaFilter.jarakMaks tidak kosong
       DAN (kriteriaFilter.jarakMaks BUKAN angka ATAU kriteriaFilter.jarakMaks <= 0) THEN
        RETURN false
    END IF
    IF kriteriaFilter.batasWaktu tidak kosong
       DAN kriteriaFilter.batasWaktu < WAKTU_SEKARANG THEN
        RETURN false
    END IF
    RETURN true
END FUNCTION
```

### 5.34.4 Algoritma/Query

**Nama Kelas:** *PenyaringanController*  
**Nama Operasi:** *saringBerdasarkanJenis(daftarSurplus: Array, jenisProduk: String): Array*  
**ID Algoritma:** *Algo-C34-04*

```text
FUNCTION saringBerdasarkanJenis(daftarSurplus, jenisProduk)
    IF jenisProduk kosong ATAU jenisProduk = "Semua" THEN
        RETURN daftarSurplus
    END IF
    hasil <- DAFTAR KOSONG
    UNTUK SETIAP produk DALAM daftarSurplus
        IF produk.jenisProduk = jenisProduk THEN
            TAMBAHKAN produk KE hasil
        END IF
    AKHIR UNTUK
    RETURN hasil
END FUNCTION
```

### 5.34.5 Algoritma/Query

**Nama Kelas:** *PenyaringanController*  
**Nama Operasi:** *saringBerdasarkanJarak(daftarSurplus: Array, jarakMaks: Number): Array*  
**ID Algoritma:** *Algo-C34-05*

```text
FUNCTION saringBerdasarkanJarak(daftarSurplus, jarakMaks)
    IF jarakMaks kosong THEN
        RETURN daftarSurplus
    END IF
    hasil <- DAFTAR KOSONG
    UNTUK SETIAP produk DALAM daftarSurplus
        IF produk.jarakProduk <= jarakMaks THEN
            TAMBAHKAN produk KE hasil
        END IF
    AKHIR UNTUK
    RETURN hasil
END FUNCTION
```

### 5.34.6 Algoritma/Query

**Nama Kelas:** *PenyaringanController*  
**Nama Operasi:** *saringBerdasarkanBatasWaktu(daftarSurplus: Array, batasWaktu: DateTime): Array*  
**ID Algoritma:** *Algo-C34-06*

```text
FUNCTION saringBerdasarkanBatasWaktu(daftarSurplus, batasWaktu)
    IF batasWaktu kosong THEN
        RETURN daftarSurplus
    END IF
    hasil <- DAFTAR KOSONG
    UNTUK SETIAP produk DALAM daftarSurplus
        IF produk.batasWaktuPengambilan <= batasWaktu THEN
            TAMBAHKAN produk KE hasil
        END IF
    AKHIR UNTUK
    RETURN hasil
END FUNCTION
```

<br>

---

# BAB 6: Perancangan Antarmuka

## 6.1 Rancangan Antarmuka I-01

**Antarmuka:** *I-01*  
**Nama Layar:** *Selamat Datang (A1)*  
**Use Case Terkait:** *UC01*

<p align="center">
<img alt="Rancangan Antarmuka I-01 - Selamat Datang" src="./assets/interface/A1.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.1. Rancangan Antarmuka I-01 - Selamat Datang</i>
</p>

Tabel 6.1. Spesifikasi Objek Antarmuka I-01

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Btn_RoleFnB* | *Button* | *Pemilik F&B* | *Menuju dashboard Pemilik F&B (I-05)* |
| *Btn_RoleNGO* | *Button* | *Perwakilan NGO* | *Menuju daftar surplus NGO (I-12)* |
| *Btn_RoleAdmin* | *Button* | *Admin Sistem* | *Menuju verifikasi pendaftar Admin (I-19)* |
| *Link_Register* | *Link* | *Daftar sekarang* | *Menuju formulir registrasi (I-02)* |

## 6.2 Rancangan Antarmuka I-02

**Antarmuka:** *I-02*  
**Nama Layar:** *Registrasi — Pemilik F&B (A2)*  
**Use Case Terkait:** *UC01*

<p align="center">
<img alt="Rancangan Antarmuka I-02 - Registrasi — Pemilik F&B" src="./assets/interface/A2.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.2. Rancangan Antarmuka I-02 - Registrasi — Pemilik F&B</i>
</p>

Tabel 6.2. Spesifikasi Objek Antarmuka I-02

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Tab_Role* | *Segmented tab* | *Pemilik F&B | Perwakilan NGO* | *Berpindah antara formulir F&B (I-02) dan NGO (I-03)* |
| *Input_BusinessName* | *Textbox* | *Nama Usaha* | *Wajib diisi* |
| *Input_Email* | *Textbox* | *Email* | *Wajib diisi* |
| *Input_Address* | *Textbox* | *Alamat Usaha* | *Wajib diisi* |
| *Input_Pass* | *Password* | *Kata Sandi* | *Wajib diisi, karakter disamarkan* |
| *Input_License* | *File upload* | *Unggah NIB / Izin Usaha (PDF, JPG, PNG · maks 5 MB)* | *Memvalidasi format dan ukuran; menampilkan nama berkas terpilih* |
| *Btn_Register* | *Button* | *Daftar* | *Jika data/dokumen tidak lengkap atau tidak valid tampil pesan galat; jika valid menuju status pendaftaran (I-04)* |

## 6.3 Rancangan Antarmuka I-03

**Antarmuka:** *I-03*  
**Nama Layar:** *Registrasi — NGO (A3)*  
**Use Case Terkait:** *UC01*

<p align="center">
<img alt="Rancangan Antarmuka I-03 - Registrasi — NGO" src="./assets/interface/A3.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.3. Rancangan Antarmuka I-03 - Registrasi — NGO</i>
</p>

Tabel 6.3. Spesifikasi Objek Antarmuka I-03

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Tab_Role* | *Segmented tab* | *Pemilik F&B | Perwakilan NGO* | *Berpindah formulir* |
| *Input_OrgName* | *Textbox* | *Nama Organisasi* | *Wajib diisi* |
| *Input_Email* | *Textbox* | *Email* | *Wajib diisi* |
| *Input_Address* | *Textbox* | *Alamat Kantor* | *Wajib diisi* |
| *Input_Pass* | *Password* | *Kata Sandi* | *Wajib diisi* |
| *Input_Deed* | *File upload* | *Unggah Akta / SK Kemenkumham (PDF, JPG, PNG · maks 5 MB)* | *Validasi format dan ukuran berkas* |
| *Btn_Register* | *Button* | *Daftar* | *Menuju status pendaftaran (I-04) jika valid* |

## 6.4 Rancangan Antarmuka I-04

**Antarmuka:** *I-04*  
**Nama Layar:** *Status Pendaftaran (A4)*  
**Use Case Terkait:** *UC03*

<p align="center">
<img alt="Rancangan Antarmuka I-04 - Status Pendaftaran" src="./assets/interface/A4.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.4. Rancangan Antarmuka I-04 - Status Pendaftaran</i>
</p>

Tabel 6.4. Spesifikasi Objek Antarmuka I-04

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Icon_Clock* | *Ikon* | *Jam* | *Menandakan status menunggu* |
| *Title_Status* | *Label* | *Pendaftaran Dikirim* | *Judul status* |
| *Badge_Status* | *Badge* | *Menunggu Verifikasi* | *Status pendaftaran saat ini (Menunggu/Diterima/Ditolak)* |
| *Txt_StatusDesc* | *Teks* | *Admin FoodLink sedang memeriksa dokumen Anda…* | *Penjelasan status* |
| *Btn_BackHome* | *Button* | *Kembali ke Beranda* | *Menuju layar selamat datang (I-01)* |

## 6.5 Rancangan Antarmuka I-05

**Antarmuka:** *I-05*  
**Nama Layar:** *Dashboard Pemilik F&B (F1)*  
**Use Case Terkait:** *UC05*

<p align="center">
<img alt="Rancangan Antarmuka I-05 - Dashboard Pemilik F&B" src="./assets/interface/F1.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.5. Rancangan Antarmuka I-05 - Dashboard Pemilik F&B</i>
</p>

Tabel 6.5. Spesifikasi Objek Antarmuka I-05

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Nav_Sidebar* | *Sidebar* | *Dashboard · Penjualan · Surplus · Profil* | *Navigasi antar menu Pemilik F&B* |
| *Stat_Summary* | *Kartu statistik* | *148 Terjual hari ini · 12 Sisa produk · jumlah Surplus aktif* | *Ringkasan operasional hari ini* |
| *Btn_AddSales* | *Button* | *Catat Penjualan* | *Menuju penjualan harian (I-06)* |
| *Btn_AddSurplus* | *Button* | *Catat Surplus* | *Menuju catat surplus (I-08)* |
| *Chart_Sales7Days* | *Bar chart* | *Penjualan 7 Hari Terakhir* | *Menampilkan porsi terjual per hari; hari ini disorot* |
| *List_Recommendation* | *Daftar* | *Rekomendasi Produksi Besok + badge Prediksi aktif* | *Hasil prediksi per produk beserta tren naik/turun* |

## 6.6 Rancangan Antarmuka I-06

**Antarmuka:** *I-06*  
**Nama Layar:** *Penjualan Harian (F2)*  
**Use Case Terkait:** *UC04*

<p align="center">
<img alt="Rancangan Antarmuka I-06 - Penjualan Harian" src="./assets/interface/F2.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.6. Rancangan Antarmuka I-06 - Penjualan Harian</i>
</p>

Tabel 6.6. Spesifikasi Objek Antarmuka I-06

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Btn_Back* | *Button* | *Kembali (←)* | *Menuju dashboard (I-05)* |
| *Label_Date* | *Label* | *Senin, 26 Oktober 2026* | *Tanggal pencatatan* |
| *Progress_DataCount* | *Progress bar* | *Data terkumpul untuk prediksi 6/7 hari* | *Menunjukkan kelengkapan data historis (minimal 7 hari)* |
| *Input_Sold* | *Textbox angka* | *Terjual (per produk)* | *Wajib bilangan bulat ≥ 0* |
| *Input_Remaining* | *Textbox angka* | *Sisa (per produk)* | *Wajib bilangan bulat ≥ 0* |
| *Btn_Reset* | *Button* | *Reset* | *Mengosongkan seluruh isian* |
| *Btn_Save* | *Button* | *Simpan* | *Jika ada isian tidak valid tampil pesan galat; jika valid menuju penjualan tersimpan (I-07)* |

## 6.7 Rancangan Antarmuka I-07

**Antarmuka:** *I-07*  
**Nama Layar:** *Penjualan Tersimpan (F3)*  
**Use Case Terkait:** *UC04*

<p align="center">
<img alt="Rancangan Antarmuka I-07 - Penjualan Tersimpan" src="./assets/interface/F3.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.7. Rancangan Antarmuka I-07 - Penjualan Tersimpan</i>
</p>

Tabel 6.7. Spesifikasi Objek Antarmuka I-07

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Icon_Check* | *Ikon* | *Centang* | *Menandakan penyimpanan berhasil* |
| *Badge_Saved* | *Badge* | *Tercatat* | *Status penyimpanan* |
| *Txt_SavedInfo* | *Teks* | *Data penjualan … tersimpan per produk dan tanggal* | *Informasi progres prediksi (6/7)* |
| *Btn_Dashboard* | *Button* | *Ke Dashboard* | *Menuju dashboard (I-05)* |

## 6.8 Rancangan Antarmuka I-08

**Antarmuka:** *I-08*  
**Nama Layar:** *Catat Produk Surplus (F4)*  
**Use Case Terkait:** *UC06*

<p align="center">
<img alt="Rancangan Antarmuka I-08 - Catat Produk Surplus" src="./assets/interface/F4.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.8. Rancangan Antarmuka I-08 - Catat Produk Surplus</i>
</p>

Tabel 6.8. Spesifikasi Objek Antarmuka I-08

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Input_Product* | *Textbox* | *Produk* | *Nama produk surplus* |
| *Input_Quantity* | *Textbox* | *Jumlah Surplus* | *Wajib > 0* |
| *Input_PickupDate* | *Dropdown* | *Tanggal Pengambilan (Hari ini/Besok)* | *Menentukan tanggal batas ambil* |
| *Input_PickupTime* | *Time picker* | *Batas Jam* | *Tidak boleh di masa lalu; jika melanggar isian ditandai galat* |
| *Input_Location* | *Textbox* | *Lokasi Pengambilan* | *Alamat pengambilan* |
| *Btn_Next* | *Button* | *Lanjut: Atur Distribusi* | *Jika valid menuju atur distribusi (I-09/I-10)* |
| *Btn_Reset* | *Button* | *Reset* | *Mengosongkan seluruh isian formulir* |

## 6.9 Rancangan Antarmuka I-09

**Antarmuka:** *I-09*  
**Nama Layar:** *Atur Distribusi — Donasi (F5)*  
**Use Case Terkait:** *UC07*

<p align="center">
<img alt="Rancangan Antarmuka I-09 - Atur Distribusi — Donasi" src="./assets/interface/F5.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.9. Rancangan Antarmuka I-09 - Atur Distribusi — Donasi</i>
</p>

Tabel 6.9. Spesifikasi Objek Antarmuka I-09

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Card_Summary* | *Kartu ringkasan* | *Produk · Jumlah · Ambil sebelum* | *Ringkasan data surplus dari I-08* |
| *Tab_Method* | *Segmented tab* | *Donasi | Jual Diskon* | *Berpindah metode distribusi* |
| *Card_Donation* | *Kartu pilihan* | *Donasi Gratis* | *Produk tampil gratis bagi NGO; tanpa harga* |
| *Btn_Save* | *Button* | *Simpan* | *Mempublikasikan surplus; menuju I-11* |
| *Btn_Back* | *Button* | *Kembali* | *Menuju catat surplus (I-08)* |

## 6.10 Rancangan Antarmuka I-10

**Antarmuka:** *I-10*  
**Nama Layar:** *Atur Distribusi — Jual Diskon (F6)*  
**Use Case Terkait:** *UC07*

<p align="center">
<img alt="Rancangan Antarmuka I-10 - Atur Distribusi — Jual Diskon" src="./assets/interface/F6.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.10. Rancangan Antarmuka I-10 - Atur Distribusi — Jual Diskon</i>
</p>

Tabel 6.10. Spesifikasi Objek Antarmuka I-10

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Tab_Method* | *Segmented tab* | *Donasi | Jual Diskon* | *Berpindah metode distribusi* |
| *Card_Discount* | *Kartu pilihan* | *Jual dengan Diskon* | *Metode jual murah* |
| *Input_Price* | *Textbox* | *Harga Jual per Porsi (Rp)* | *Wajib angka > 0; jika tidak valid tampil galat* |
| *Card_PriceSummary* | *Kartu ringkasan* | *Harga normal · Hemat (%)* | *Persentase hemat dihitung otomatis dari harga normal* |
| *Btn_Save* | *Button* | *Simpan* | *Mempublikasikan surplus; menuju I-11* |
| *Btn_Back* | *Button* | *Kembali* | *Menuju catat surplus (I-08)* |

## 6.11 Rancangan Antarmuka I-11

**Antarmuka:** *I-11*  
**Nama Layar:** *Surplus Dipublikasikan (F7)*  
**Use Case Terkait:** *UC07*

<p align="center">
<img alt="Rancangan Antarmuka I-11 - Surplus Dipublikasikan" src="./assets/interface/F7.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.11. Rancangan Antarmuka I-11 - Surplus Dipublikasikan</i>
</p>

Tabel 6.11. Spesifikasi Objek Antarmuka I-11

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Icon_Check* | *Ikon* | *Centang* | *Menandakan publikasi berhasil* |
| *Badge_Published* | *Badge* | *Terlihat oleh NGO* | *Status publikasi* |
| *Card_Summary* | *Kartu ringkasan* | *Produk · Jumlah · Metode · Ambil sebelum* | *Rangkuman surplus yang dipublikasikan* |
| *Btn_Dashboard* | *Button* | *Ke Dashboard* | *Menuju dashboard (I-05)* |

## 6.12 Rancangan Antarmuka I-12

**Antarmuka:** *I-12*  
**Nama Layar:** *Daftar Surplus (N1)*  
**Use Case Terkait:** *UC08*

<p align="center">
<img alt="Rancangan Antarmuka I-12 - Daftar Surplus" src="./assets/interface/N1.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.12. Rancangan Antarmuka I-12 - Daftar Surplus</i>
</p>

Tabel 6.12. Spesifikasi Objek Antarmuka I-12

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Label_Location* | *Label* | *Lokasi Anda · Dago, Bandung* | *Lokasi acuan jarak* |
| *Input_Search* | *Textbox* | *Cari roti, nasi, minuman…* | *Menyaring daftar berdasarkan kata kunci* |
| *Btn_Filter* | *Button ikon* | *Filter* | *Membuka panel filter (I-13)* |
| *Chip_QuickFilter* | *Chip* | *Semua · Makanan · Minuman · < 2 km* | *Filter cepat* |
| *Card_Product* | *Kartu produk* | *Nama, jenis/jumlah, penjual, jarak, batas ambil, badge Donasi/harga* | *Klik membuka detail produk (I-15)* |

## 6.13 Rancangan Antarmuka I-13

**Antarmuka:** *I-13*  
**Nama Layar:** *Filter (N2)*  
**Use Case Terkait:** *UC09*

<p align="center">
<img alt="Rancangan Antarmuka I-13 - Filter" src="./assets/interface/N2.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.13. Rancangan Antarmuka I-13 - Filter</i>
</p>

Tabel 6.13. Spesifikasi Objek Antarmuka I-13

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Chip_FoodType* | *Chip* | *Jenis Makanan: Semua/Makanan/Minuman* | *Memilih jenis produk* |
| *Chip_Distance* | *Chip* | *Jarak Maksimal: 1/2/5/10 km* | *Memilih radius* |
| *Chip_Deadline* | *Chip* | *Batas Waktu: Hari ini/Besok/Semua* | *Memilih rentang waktu ambil* |
| *Btn_Reset* | *Button* | *Reset* | *Mengembalikan filter ke default* |
| *Btn_Apply* | *Button* | *Terapkan* | *Menerapkan filter; menuju daftar terfilter (I-14)* |
| *Btn_Close* | *Button ikon* | *Tutup (✕)* | *Menutup panel tanpa menerapkan* |

## 6.14 Rancangan Antarmuka I-14

**Antarmuka:** *I-14*  
**Nama Layar:** *Daftar Surplus (Terfilter) (N3)*  
**Use Case Terkait:** *UC09*

<p align="center">
<img alt="Rancangan Antarmuka I-14 - Daftar Surplus (Terfilter)" src="./assets/interface/N3.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.14. Rancangan Antarmuka I-14 - Daftar Surplus (Terfilter)</i>
</p>

Tabel 6.14. Spesifikasi Objek Antarmuka I-14

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Chip_ActiveFilter* | *Chip aktif* | *Makanan ✕ · < 2 km ✕ · Hari ini ✕* | *Klik ✕ menghapus filter terkait* |
| *Link_ClearFilter* | *Link* | *Hapus filter* | *Menghapus semua filter; kembali ke I-12* |
| *Label_ResultCount* | *Label* | *Menampilkan N hasil terdekat* | *Jumlah hasil; jika kosong tampil pesan tidak ada produk* |
| *Card_Product* | *Kartu produk* | *Hasil yang sesuai filter* | *Klik membuka detail produk (I-15)* |

## 6.15 Rancangan Antarmuka I-15

**Antarmuka:** *I-15*  
**Nama Layar:** *Detail Produk (N4)*  
**Use Case Terkait:** *UC08*

<p align="center">
<img alt="Rancangan Antarmuka I-15 - Detail Produk" src="./assets/interface/N4.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.15. Rancangan Antarmuka I-15 - Detail Produk</i>
</p>

Tabel 6.15. Spesifikasi Objek Antarmuka I-15

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Btn_Back* | *Button* | *Kembali (←)* | *Menuju daftar surplus (I-12)* |
| *Badge_Type* | *Badge* | *Makanan · Donasi Gratis / Jual Diskon* | *Jenis dan metode distribusi* |
| *Title_Product* | *Label* | *Nama produk, penjual* | *Identitas produk* |
| *Txt_Detail* | *Info* | *Jumlah tersedia · Lokasi · Batas pengambilan* | *Menampilkan jumlah, alamat, jarak, dan sisa waktu* |
| *Map_Location* | *Peta* | *Peta lokasi pengambilan* | *Menampilkan titik lokasi* |
| *Btn_Claim* | *Button* | *Ajukan Klaim* | *Membuka dialog konfirmasi klaim (I-16)* |

## 6.16 Rancangan Antarmuka I-16

**Antarmuka:** *I-16*  
**Nama Layar:** *Konfirmasi Klaim (N5)*  
**Use Case Terkait:** *UC10*

<p align="center">
<img alt="Rancangan Antarmuka I-16 - Konfirmasi Klaim" src="./assets/interface/N5.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.16. Rancangan Antarmuka I-16 - Konfirmasi Klaim</i>
</p>

Tabel 6.16. Spesifikasi Objek Antarmuka I-16

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Modal_Claim* | *Dialog* | *Klaim produk ini?* | *Ringkasan produk, jumlah, penjual, batas ambil* |
| *Btn_Confirm* | *Button* | *Ya, Klaim* | *Menyimpan klaim; menuju klaim berhasil (I-17)* |
| *Btn_Cancel* | *Button* | *Batal* | *Menutup dialog; tetap di detail produk* |

## 6.17 Rancangan Antarmuka I-17

**Antarmuka:** *I-17*  
**Nama Layar:** *Klaim Berhasil (N6)*  
**Use Case Terkait:** *UC10*

<p align="center">
<img alt="Rancangan Antarmuka I-17 - Klaim Berhasil" src="./assets/interface/N6.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.17. Rancangan Antarmuka I-17 - Klaim Berhasil</i>
</p>

Tabel 6.17. Spesifikasi Objek Antarmuka I-17

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Badge_Claimed* | *Badge* | *Terklaim* | *Status klaim* |
| *Card_Summary* | *Kartu ringkasan* | *Produk · Jumlah · Kode klaim · Ambil sebelum* | *Kode klaim ditunjukkan ke pemilik usaha saat pengambilan* |
| *Btn_ConfirmPickup* | *Button* | *Konfirmasi Pengambilan* | *Menuju pengambilan selesai (I-18)* |
| *Btn_BackList* | *Button* | *Kembali ke Daftar* | *Menuju daftar surplus (I-12)* |

## 6.18 Rancangan Antarmuka I-18

**Antarmuka:** *I-18*  
**Nama Layar:** *Pengambilan Selesai (N7)*  
**Use Case Terkait:** *UC11*

<p align="center">
<img alt="Rancangan Antarmuka I-18 - Pengambilan Selesai" src="./assets/interface/N7.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.18. Rancangan Antarmuka I-18 - Pengambilan Selesai</i>
</p>

Tabel 6.18. Spesifikasi Objek Antarmuka I-18

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Icon_Heart* | *Ikon* | *Hati* | *Menandakan pengambilan selesai* |
| *Badge_Done* | *Badge* | *Selesai* | *Status pengambilan* |
| *Txt_Impact* | *Teks* | *Terima kasih telah membantu mengurangi pemborosan makanan…* | *Ringkasan dampak* |
| *Btn_BackList* | *Button* | *Kembali ke Daftar* | *Menuju daftar surplus (I-12)* |

## 6.19 Rancangan Antarmuka I-19

**Antarmuka:** *I-19*  
**Nama Layar:** *Verifikasi Pendaftar (M1)*  
**Use Case Terkait:** *UC02*

<p align="center">
<img alt="Rancangan Antarmuka I-19 - Verifikasi Pendaftar" src="./assets/interface/M1.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.19. Rancangan Antarmuka I-19 - Verifikasi Pendaftar</i>
</p>

Tabel 6.19. Spesifikasi Objek Antarmuka I-19

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Badge_Pending* | *Badge* | *N menunggu* | *Jumlah pendaftar berstatus menunggu* |
| *Card_Applicant* | *Kartu pendaftar* | *Avatar, nama, tipe akun · tanggal, badge status* | *Klik membuka detail pendaftar (I-20)* |

## 6.20 Rancangan Antarmuka I-20

**Antarmuka:** *I-20*  
**Nama Layar:** *Detail Pendaftar (M2)*  
**Use Case Terkait:** *UC02*

<p align="center">
<img alt="Rancangan Antarmuka I-20 - Detail Pendaftar" src="./assets/interface/M2.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.20. Rancangan Antarmuka I-20 - Detail Pendaftar</i>
</p>

Tabel 6.20. Spesifikasi Objek Antarmuka I-20

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Card_ApplicantData* | *Kartu data* | *Nama, Tipe Akun, Email, Alamat, Tanggal Daftar* | *Data pendaftar yang diperiksa* |
| *Card_Document* | *Kartu dokumen* | *Nama berkas, ukuran, tautan Lihat, pratinjau* | *Memeriksa dokumen pendukung* |
| *Btn_Reject* | *Button* | *Tolak* | *Menolak pendaftaran; menuju I-22* |
| *Btn_Approve* | *Button* | *Setujui* | *Menyetujui pendaftaran; menuju I-21* |

## 6.21 Rancangan Antarmuka I-21

**Antarmuka:** *I-21*  
**Nama Layar:** *Pendaftar Diterima (M3)*  
**Use Case Terkait:** *UC02*

<p align="center">
<img alt="Rancangan Antarmuka I-21 - Pendaftar Diterima" src="./assets/interface/M3.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.21. Rancangan Antarmuka I-21 - Pendaftar Diterima</i>
</p>

Tabel 6.21. Spesifikasi Objek Antarmuka I-21

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Badge_Accepted* | *Badge* | *Diterima* | *Status baru pendaftar* |
| *Txt_Status* | *Teks* | *Status … diperbarui menjadi diterima* | *Pendaftar dapat langsung memakai FoodLink* |
| *Btn_BackList* | *Button* | *Kembali ke Daftar* | *Menuju verifikasi pendaftar (I-19)* |

## 6.22 Rancangan Antarmuka I-22

**Antarmuka:** *I-22*  
**Nama Layar:** *Pendaftar Ditolak (M4)*  
**Use Case Terkait:** *UC02*

<p align="center">
<img alt="Rancangan Antarmuka I-22 - Pendaftar Ditolak" src="./assets/interface/M4.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.22. Rancangan Antarmuka I-22 - Pendaftar Ditolak</i>
</p>

Tabel 6.22. Spesifikasi Objek Antarmuka I-22

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Badge_Rejected* | *Badge* | *Ditolak* | *Status baru pendaftar* |
| *Txt_Status* | *Teks* | *Pendaftar disarankan memperbaiki dokumennya…* | *Pendaftar dapat mendaftar ulang* |
| *Btn_BackList* | *Button* | *Kembali ke Daftar* | *Menuju verifikasi pendaftar (I-19)* |

## 6.23 Rancangan Antarmuka I-23

**Antarmuka:** *I-23*  
**Nama Layar:** *Log Aktivitas (M5)*  
**Use Case Terkait:** *UC12*

<p align="center">
<img alt="Rancangan Antarmuka I-23 - Log Aktivitas" src="./assets/interface/M5.png" width="80%">
</p>
<p align="center">
<i>Gambar 6.23. Rancangan Antarmuka I-23 - Log Aktivitas</i>
</p>

Tabel 6.23. Spesifikasi Objek Antarmuka I-23

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *Chip_Filter* | *Chip* | *Semua · Klaim · Surplus · Verifikasi* | *Menyaring log; jika tidak ada tampil pesan belum ada log yang sesuai* |
| *List_Log* | *Daftar* | *Jam, nama pengguna, deskripsi aktivitas* | *Log terbaru berada di paling atas* |

## 6.24 Rancangan Antarmuka Keseluruhan

Tabel 6.24. Rancangan Antarmuka Keseluruhan

| No | Tampilan Antarmuka |
| :--- | :--- |
| *I-01* (Selamat Datang) | <img src="./assets/interface/A1.png" alt="Selamat Datang" width="400"> |
| *I-02* (Registrasi - Pemilik F&B) | <img src="./assets/interface/A2.png" alt="Registrasi - Pemilik F&B" width="400"> |
| *I-03* (Registrasi - NGO) | <img src="./assets/interface/A3.png" alt="Registrasi - NGO" width="400"> |
| *I-04* (Status Pendaftaran) | <img src="./assets/interface/A4.png" alt="Status Pendaftaran" width="400"> |
| *I-05* (Dashboard Pemilik F&B) | <img src="./assets/interface/F1.png" alt="Dashboard Pemilik F&B" width="400"> |
| *I-06* (Penjualan Harian) | <img src="./assets/interface/F2.png" alt="Penjualan Harian" width="400"> |
| *I-07* (Penjualan Tersimpan) | <img src="./assets/interface/F3.png" alt="Penjualan Tersimpan" width="400"> |
| *I-08* (Catat Produk Surplus) | <img src="./assets/interface/F4.png" alt="Catat Produk Surplus" width="400"> |
| *I-09* (Atur Distribusi - Donasi) | <img src="./assets/interface/F5.png" alt="Atur Distribusi - Donasi" width="400"> |
| *I-10* (Atur Distribusi - Jual Diskon) | <img src="./assets/interface/F6.png" alt="Atur Distribusi - Jual Diskon" width="400"> |
| *I-11* (Surplus Dipublikasikan) | <img src="./assets/interface/F7.png" alt="Surplus Dipublikasikan" width="400"> |
| *I-12* (Daftar Surplus) | <img src="./assets/interface/N1.png" alt="Daftar Surplus" width="400"> |
| *I-13* (Filter) | <img src="./assets/interface/N2.png" alt="Filter" width="400"> |
| *I-14* (Daftar Surplus (Terfilter)) | <img src="./assets/interface/N3.png" alt="Daftar Surplus (Terfilter)" width="400"> |
| *I-15* (Detail Produk) | <img src="./assets/interface/N4.png" alt="Detail Produk" width="400"> |
| *I-16* (Konfirmasi Klaim) | <img src="./assets/interface/N5.png" alt="Konfirmasi Klaim" width="400"> |
| *I-17* (Klaim Berhasil) | <img src="./assets/interface/N6.png" alt="Klaim Berhasil" width="400"> |
| *I-18* (Pengambilan Selesai) | <img src="./assets/interface/N7.png" alt="Pengambilan Selesai" width="400"> |
| *I-19* (Verifikasi Pendaftar) | <img src="./assets/interface/M1.png" alt="Verifikasi Pendaftar" width="400"> |
| *I-20* (Detail Pendaftar) | <img src="./assets/interface/M2.png" alt="Detail Pendaftar" width="400"> |
| *I-21* (Pendaftar Diterima) | <img src="./assets/interface/M3.png" alt="Pendaftar Diterima" width="400"> |
| *I-22* (Pendaftar Ditolak) | <img src="./assets/interface/M4.png" alt="Pendaftar Ditolak" width="400"> |
| *I-23* (Log Aktivitas) | <img src="./assets/interface/M5.png" alt="Log Aktivitas" width="400"> |


<br>

---

# BAB 7: Matriks Kerunutan

Petakan kelas perancangan dengan use case yang terkait. Gunakan **BAB 6 Traceability pada dokumen SKPL** sebagai acuan keterkaitan kelas analisis dan use case, lalu sesuaikan dengan realisasi use case dan kelas perancangan pada BAB 3–BAB 5 DPPL.

| Kelas | Use Case Terkait |
| :--- | :--- |
| *C01 - AkunPengguna* | *UC01 - Melakukan Registrasi Akun; UC02 - Memverifikasi Pendaftaran Akun; UC11 - Mengonfirmasi Pengambilan Produk Surplus; UC12 - Mengecek Log Aktivitas Pengguna* |
| *C02 - Pendaftaran* | *UC01 - Melakukan Registrasi Akun; UC02 - Memverifikasi Pendaftaran Akun; UC03 - Menampilkan Status Pendaftaran* |
| *C03 - DokumenPendukung* | *UC01 - Melakukan Registrasi Akun; UC02 - Memverifikasi Pendaftaran Akun* |
| *C04 - VerifikasiController* | *UC02 - Memverifikasi Pendaftaran Akun* |
| *C05 - Produk* | *UC04 - Mencatat Data Penjualan Harian; UC05 - Melihat Hasil Prediksi Produksi; UC06 - Mencatat Produk Surplus; UC08 - Melihat Informasi Produk Surplus; UC09 - Menyaring Informasi Produk Surplus; UC10 - Mengklaim Produk Surplus* |
| *C06 - DataPenjualan* | *UC04 - Mencatat Data Penjualan Harian; UC05 - Melihat Hasil Prediksi Produksi* |
| *C07 - PrediksiProduksi* | *UC05 - Melihat Hasil Prediksi Produksi* |
| *C08 - ProdukSurplus* | *UC06 - Mencatat Produk Surplus; UC07 - Mengatur Metode Distribusi Surplus; UC08 - Melihat Informasi Produk Surplus; UC09 - Menyaring Informasi Produk Surplus; UC10 - Mengklaim Produk Surplus; UC11 - Mengonfirmasi Pengambilan Produk Surplus* |
| *C09 - MetodeDistribusiSurplus* | *UC07 - Mengatur Metode Distribusi Surplus; UC08 - Melihat Informasi Produk Surplus; UC09 - Menyaring Informasi Produk Surplus; UC10 - Mengklaim Produk Surplus* |
| *C10 - DokumenKlaim* | *UC10 - Mengklaim Produk Surplus; UC11 - Mengonfirmasi Pengambilan Produk Surplus* |
| *C11 - LogAktivitas* | *UC12 - Mengecek Log Aktivitas Pengguna* |
| *C12 - RegistrasiPage* | *UC01 - Melakukan Registrasi Akun* |
| *C13 - VerifikasiPage* | *UC02 - Memverifikasi Pendaftaran Akun* |
| *C14 - StatusPendaftaranPage* | *UC03 - Menampilkan Status Pendaftaran* |
| *C15 - PenjualanPage* | *UC04 - Mencatat Data Penjualan Harian* |
| *C16 - PrediksiPage* | *UC05 - Melihat Hasil Prediksi Produksi* |
| *C17 - ProdukSurplusPage* | *UC06 - Mencatat Produk Surplus* |
| *C18 - DistribusiSurplusPage* | *UC07 - Mengatur Metode Distribusi Surplus* |
| *C19 - DaftarSurplusPage* | *UC08 - Melihat Informasi Produk Surplus; UC09 - Menyaring Informasi Produk Surplus* |
| *C20 - KlaimPage* | *UC10 - Mengklaim Produk Surplus* |
| *C21 - PengambilanPage* | *UC11 - Mengonfirmasi Pengambilan Produk Surplus* |
| *C22 - LogAktivitasPage* | *UC12 - Mengecek Log Aktivitas Pengguna* |
| *C23 - AuthController* | *UC01 - Melakukan Registrasi Akun; UC03 - Menampilkan Status Pendaftaran* |
| *C24 - PenjualanController* | *UC04 - Mencatat Data Penjualan Harian* |
| *C25 - PrediksiController* | *UC05 - Melihat Hasil Prediksi Produksi* |
| *C26 - ProdukSurplusController* | *UC06 - Mencatat Produk Surplus; UC07 - Mengatur Metode Distribusi Surplus* |
| *C27 - SurplusController* | *UC08 - Melihat Informasi Produk Surplus; UC09 - Menyaring Informasi Produk Surplus; UC10 - Mengklaim Produk Surplus* |
| *C28 - KlaimController* | *UC10 - Mengklaim Produk Surplus; UC11 - Mengonfirmasi Pengambilan Produk Surplus* |
| *C29 - LogController* | *UC12 - Mengecek Log Aktivitas Pengguna* |
| *C30 - PemilikFnB* | *UC01 - Melakukan Registrasi Akun; UC04 - Mencatat Data Penjualan Harian; UC05 - Melihat Hasil Prediksi Produksi; UC06 - Mencatat Produk Surplus; UC07 - Mengatur Metode Distribusi Surplus; UC08 - Melihat Informasi Produk Surplus; UC09 - Menyaring Informasi Produk Surplus; UC10 - Mengklaim Produk Surplus; UC11 - Mengonfirmasi Pengambilan Produk Surplus* |
| *C31 - PerwakilanNGO* | *UC01 - Melakukan Registrasi Akun; UC03 - Menampilkan Status Pendaftaran; UC08 - Melihat Informasi Produk Surplus; UC09 - Menyaring Informasi Produk Surplus; UC10 - Mengklaim Produk Surplus; UC11 - Mengonfirmasi Pengambilan Produk Surplus* |
| *C32 - AdminSistem* | *UC02 - Memverifikasi Pendaftaran Akun; UC12 - Mengecek Log Aktivitas Pengguna* |
| *C33 - GeolocationAdapter* | *UC08 - Melihat Informasi Produk Surplus; UC09 - Menyaring Informasi Produk Surplus* |
| *C34 - PenyaringanController* | *UC09 - Menyaring Informasi Produk Surplus* |