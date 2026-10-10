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
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

---

<br>

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini melanjutkan **Spesifikasi Kebutuhan Perangkat Lunak (SKPL)** dan **Arsitektur Perangkat Lunak (APL)**. Gunakan nama, ID, kebutuhan, dan use case yang konsisten dengan kedua dokumen tersebut. Contoh pola ID baru di bawah dapat disesuaikan dengan kesepakatan kelompok, ID yang sudah ada tetap dipertahankan.

<br>

---


# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen Deskripsi Perancangan Perangkat Lunak (DPPL) ini disusun untuk mendeskripsikan rancangan perangkat lunak FoodLink berdasarkan kebutuhan yang telah ditetapkan pada dokumen SKPL dan juga arsitektur yang telah dirancang pada dokumen APL. Rancangan yang dibahas akan mencakup kelas perancangan serta interaksinya untuk merealisasikan setiap use case. Dokumen ini ditujukan kepada tim pengembang untuk membantu proses pengembangan perangkat lunak.

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
Dokumen ini terdiri atas lima bab. Bab 1 membahas tentang pendahuluan yang mencakup tujuan penulisan dokumen, lingkup masalah, definisi dan singkatan, aturan penomoran, referensi, serta deskripsi umum dokumen. Bab 2 membahas tentang perancangan arsitektur, termasuk lingkungan implementasi, style arsitektur acuan, identifikasi komponen, hingga model arsitektur yang digunakan. Bab 3 membahas tentang realisasi tiap use case melalui identifikasi kelas perancangan, sequence diagram untuk skenario-skenario yang ada, serta diagram kelas yang terkait. Bab 4 menggabungkan seluruh kelas perancangan ke dalam satu diagram kelas keseluruhan. Bab 5 akan menunjukkan matriks kerunutan yang memetakan kelas terhadap use case. 

<br>

---

# BAB 2: Perancangan Arsitektur

## 2.1 Rancangan Lingkungan Implementasi

Sebutkan *operating system*, DBMS, *development tools*, *filing system*, dan bahasa pemrograman yang digunakan.

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
<img alt="Contoh Arsitektur MVC" src="./assets/diagram/Arsitektur MVC FoodLink.jpg" width="70%">
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

## 2.4.1 Logical View

Gambar 2 adalah *Logical View* FoodLink. Untuk memodelkan struktur arsitektur aplikasi FoodLink, kami memilih *Logical View* sebagai representasi utama. *Logical View* dipilih karena model ini sangat efektif untuk memvisualisasikan dekomposisi fungsional sistem ke dalam unit-unit yang lebih kecil dan terorganisasi. Pada aplikasi FoodLink yang menggunakan pola arsitektur Model-View-Controller (MVC), *Logical View* memudahkan pengembang untuk melihat pemisahan tanggung jawab secara terstruktur—mulai dari antarmuka pengguna (View), pengontrol logika bisnis (Controller), hingga entitas pengelolaan data (Model). Melalui view ini, relasi statis antar-komponen seperti dependensi, komposisi, dan agregasi (terutama pada entitas data pengguna, pendaftaran, produk surplus, dan log aktivitas) dapat dipetakan dengan jelas, sehingga memastikan setiap Kebutuhan Fungsional (KF) terpenuhi tanpa adanya tumpang tindih logika.

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/Logical View.jpg" width="100%">
</p>
<p align="center">
<i>Gambar 2. Logical View FoodLink</i>
</p>

<br>

---


# BAB 3: Realisasi Use Case

## 3.1 Use Case [Nama Use Case 1]

**ID Use Case:** *[UC01 sesuai SKPL]*  
**Nama Use Case:** *[Nama use case sesuai SKPL]*

### 3.1.1 Identifikasi Kelas

Identifikasi kelas yang terkait dengan use case tersebut. Kelas di tahap perancangan dapat berbeda dengan dengan kelas di tahap analisis. Dapat menggunakan tabel di bawah:

Tabel 3.1. Identifikasi Kelas Use Case [UC01]

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL]* |
| 2 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL]* |
| ... | *...* | *...* |

### 3.1.2 Sequence Diagram

Buat *sequence diagram* untuk **setiap skenario use case**, mencakup skenario normal dan alternatif pada subbab 4.4 SKPL. Diagram melibatkan kelas-kelas yang telah diidentifikasi pada SKPL. 

- **Skenario Normal**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-sequence_diagram.png" width="50%">
</p>
<p align="center">
<i>Gambar X. Sequence Diagram [UC01]</i>
</p>

- **Skenario Alternatif [Nomor]: [Nama Skenario]**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-sequence_diagram.png" width="50%">
</p>
<p align="center">
<i>Gambar X. Sequence Diagram [UC01] - [Nama skenario alternatif]</i>
</p>

### 3.1.3 Diagram Kelas

Buatlah diagram kelas untuk use case ini yang terdiri atas kelas-kelas dari 3.1.1. **Setiap kelas pada diagram wajib menampilkan atribut dan metode/operasi langsung di dalam kotak kelasnya**, sehingga tidak perlu membuat tabel daftar atribut dan metode per kelas pada subbab ini. Daftar lengkap atribut dan metode seluruh kelas disajikan pada Tabel 4.1 (Bab 4).

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh_class-diagram2.jpg" width="35%">
</p>
<p align="center">
<i>Gambar X. Diagram Kelas [Nama Uce Case]</i>
</p>

Pada diagram, pastikan:
- Atribut dituliskan beserta visibilitas dan tipe datanya, misalnya `- email: String`.
- Operasi dituliskan beserta visibilitas, parameter, dan tipe kembaliannya, misalnya `+ login(email: String, password: String): Boolean`.
- Relasi antarkelas (asosiasi, agregasi, komposisi, generalisasi, dan dependensi) digambarkan lengkap dengan multiplisitas.
- Semua operasi yang dipanggil pada sequence diagram 3.1.2 (skenario normal dan alternatif) ada pada kelas yang bersangkutan.
- Kelas yang sama dengan kelas di use case lain memakai nama, atribut, dan metode yang konsisten.

## 3.2 Use Case XX

Silahkan lanjutkan untuk  *use case* berikutnya dengan content yang sama dengan 3.1

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
| *[C01]* | *[Nama kelas]* | *[Daftar atribut]* | *[Daftar metode/operasi]* |
| *[C02]* | *[Nama kelas]* | *[Daftar atribut]* | *[Daftar metode/operasi]* |
| *[C03]* | *[Nama kelas]* | *[Daftar atribut]* | *[Daftar metode/operasi]* |
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
