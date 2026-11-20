<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 10
<br>
HASIL IMPLEMENTASI DAN UJI PERANGKAT LUNAK (HIUPL)
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

## Daftar Isi

- [BAB 1: Pendahuluan](#bab-1-pendahuluan)
  - [1.1 Tujuan Penulisan Dokumen](#11-tujuan-penulisan-dokumen)
  - [1.2 Lingkup Masalah](#12-lingkup-masalah)
  - [1.3 Definisi, Istilah, dan Singkatan](#13-definisi-istilah-dan-singkatan)
  - [1.4 Aturan Penomoran](#14-aturan-penomoran)
  - [1.5 Referensi](#15-referensi)
  - [1.6 Deskripsi Umum Dokumen (Ikhtisar)](#16-deskripsi-umum-dokumen-ikhtisar)
- [BAB 2: Deskripsi Umum Perangkat Lunak](#bab-2-deskripsi-umum-perangkat-lunak)
- [BAB 3: Implementasi](#bab-3-implementasi)
  - [3.1 Lingkungan Implementasi](#31-lingkungan-implementasi)
  - [3.2 Implementasi Modul](#32-implementasi-modul)
  - [3.3 Implementasi Antarmuka](#33-implementasi-antarmuka)
  - [3.4 File Lain](#34-file-lain)
- [BAB 4: Hasil Pengujian](#bab-4-hasil-pengujian)
  - [4.1 Strategi dan Kedalaman Pengujian Kelas](#41-strategi-dan-kedalaman-pengujian-kelas)
  - [4.2 Pengujian Unit Kelas](#42-pengujian-unit-kelas)
  - [4.3 Pengujian Integrasi](#43-pengujian-integrasi)
  - [4.4 Pengujian Use Case](#44-pengujian-use-case)
  - [4.5 Pengujian Kebutuhan Non-Fungsional (KNF)](#45-pengujian-kebutuhan-non-fungsional-knf)
  - [4.6 Tangkapan Layar dan Bukti Hasil Pengujian](#46-tangkapan-layar-dan-bukti-hasil-pengujian)
- [BAB 5: Traceability](#bab-5-traceability)

---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

---

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen Hasil Implementasi dan Uji Perangkat Lunak (HIUPL) ini disusun untuk melaporkan hasil implementasi dan pengujian perangkat lunak FoodLink sebagai tindak lanjut dari SKPL, APL, DPPL, dan laporan Implementasi. Dokumen ini memuat lingkungan implementasi, daftar modul/kelas yang telah dibuat, antarmuka yang tersedia, strategi serta hasil pengujian unit, integrasi, use case, dan kebutuhan non-fungsional, lengkap dengan bukti tangkapan layar dan matriks traceability. Dengan demikian, dokumen ini menjadi bukti bahwa kebutuhan fungsional, kebutuhan non-fungsional, dan use case FoodLink telah diimplementasikan serta diuji sesuai rancangan.
 
Dokumen ini ditujukan bagi kelompok sebagai dokumentasi hasil pekerjaan dan acuan verifikasi, serta untuk dosen dan asisten mata kuliah IF2150 Rekayasa Perangkat Lunak sebagai bahan evaluasi kesesuaian implementasi dengan kebutuhan dan rancangan yang telah ditetapkan.


## 1.2 Lingkup Masalah
FoodLink merupakan suatu sistem perangkat lunak yang bertujuan untuk mengurangi pemborosan makanan dengan menghubungkan pemilik usaha F&B dan juga organisasi non-pemerintah (NGO). Sistem membantu pemilik F&B untuk mencatat data penjualan dan sisa produk harian untuk menghasilkan rekomendasi produksi, serta menyediakan akses untuk mengumumkan produk surplus yang dapat didonasikan atau dijual lagi dengan harga diskon. Sementara itu, NGO dapat menemukan, menyaring, dan mengklaim produk surplus di sekitar lokasinya. Dengan begitu, FoodLink akan mendukung pencapaian SDG 12 dan SDG 2..

## 1.3 Definisi, Istilah, dan Singkatan
Semua definisi dan singkatan yang digunakan dalam dokumen ini beserta penjelasannya.

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| *P/L* | *Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu.* |
| *SKPL* | *Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya.* |
| *DPPL* | *Singkatan dari Deskripsi Perancangan Perangkat Lunak, yaitu dokumen yang menjelaskan rancangan arsitektur, kelas, dan antarmuka P/L.* |
| *HIUPL* | *Singkatan dari Hasil Implementasi dan Uji Perangkat Lunak, yaitu dokumen yang melaporkan hasil implementasi dan pengujian P/L.* |
| *KF* | *Singkatan dari Kebutuhan Fungsional.* |
| *KNF* | *Singkatan dari Kebutuhan Non-Fungsional.* |
| *UC* | *Singkatan dari Use Case.* |
| *TC* | *Singkatan dari Test Case, yaitu satu kasus uji untuk skenario tertentu.* |
| *UT* | *Singkatan dari Unit Test, yaitu test case tingkat kelas/operasi.* |
| *INT* | *Singkatan dari Integration Test, yaitu test case yang menguji interaksi antarkomponen.* |
| *Boundary* | *Kasus uji pada nilai batas masukan, misalnya nilai minimum, maksimum, atau tepat di ambang aturan.* |
| *Coverage* | *Persentase baris/cabang kode yang dieksekusi oleh pengujian.* |
| *NGO* | *Non-Governmental Organization, organisasi non-pemerintah yang menerima dan mendistribusikan makanan surplus kepada pihak yang membutuhkan.* |
| *F&B* | *Food and Beverage, sebutan untuk usaha yang bergerak di bidang makanan dan minuman.* 


## 1.4 Aturan Penomoran
Aturan penomoran (ID) yang digunakan dalam dokumen ini.

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| *Kebutuhan Fungsional* | *KFXX* | *XX merupakan nomor urut dua digit, dimulai dari 01* |
| *Kebutuhan Non-Fungsional* | *KNFXX* | *Sesuai SKPL* |
| *Use Case* | *UCXX* | *XX merupakan nomor urut dua digit, dimulai dari 01* |
| *Kelas* | *CXX* | *XX merupakan nomor urut dua digit, dimulai dari 01* |
| *Antarmuka* | *I-XX* | *XX merupakan nomor urut dua digit, dimulai dari 01* |
| *Test Case Unit* | *CXX-UTYY* | *XX adalah nomor kelas, YY adalah nomor urut test case unit pada kelas tersebut* |
| *Test Case Integrasi* | *INT-TCYY* | *YY adalah nomor urut test case integrasi* |
| *Test Case Use Case* | *UCXX-TCYY* | *XX adalah nomor use case, YY adalah nomor urut test case pada use case tersebut* |
| *Test Case KNF* | *KNFXX-TCYY* | *XX adalah nomor KNF, YY adalah nomor urut test case pada KNF tersebut* |
| *...* | *...* | *...* |

## 1.5 Referensi
- [K03_G08_SKPL.md](https://github.com/Edbertf/IF2150-RPL-K03-G08/blob/main/docs/M5/K03_G08_SKPL.md)
- [K03_G08_APL.md](https://github.com/Edbertf/IF2150-RPL-K03-G08/blob/main/docs/M6/K03_G08_APL.md)
- [K03_G08_DPPL.md](https://github.com/Edbertf/IF2150-RPL-K03-G08/blob/main/docs/M7/K03_G08_DPPL.md)
- [K03_G08_DPPL2.md](https://github.com/Edbertf/IF2150-RPL-K03-G08/blob/main/docs/M8/K03_G08_DPPL2.md)
- [K03_G08_Implementasi.md](https://github.com/Edbertf/IF2150-RPL-K03-G08/blob/main/docs/M9/K03_G08_Implementasi.md)

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Dokumen HIUPL ini disusun dalam lima bab. **Bab 1** memuat pendahuluan yang menjelaskan tujuan dokumen, lingkup masalah, definisi istilah, aturan penomoran, referensi, serta ikhtisar dokumen. **Bab 2** menyajikan deskripsi umum perangkat lunak, meliputi gambaran sistem, batasan, keterkaitan dengan sistem lain, aktor, dan use case diagram FoodLink. **Bab 3** menjelaskan implementasi perangkat lunak, mulai dari lingkungan implementasi, daftar modul/kelas, antarmuka yang telah dibuat, hingga file pendukung dan perubahan terhadap DPPL. **Bab 4** memaparkan strategi dan hasil pengujian, mencakup pengujian unit, integrasi, use case, kebutuhan non-fungsional, serta tangkapan layar sebagai bukti. Dokumen ini ditutup dengan **Bab 5** yang menyajikan matriks traceability untuk memetakan keterkaitan antara kebutuhan, use case, kelas, implementasi, dan hasil pengujian.

<br>

---

# BAB 2: Deskripsi Umum Perangkat Lunak

## 2.1 Gambaran Umum Sistem (System Overview)

FoodLink merupakan aplikasi berbasis web yang menghubungkan Pemilik F&B dengan Perwakilan NGO untuk mengurangi makanan surplus. Pemilik F&B mencatat data penjualan harian dan sisa produk; data tersebut diolah sistem menjadi rekomendasi produksi untuk hari berikutnya. Apabila masih terdapat makanan berlebih, Pemilik F&B mencatat produk surplus dan menentukan metode distribusinya, yaitu donasi atau penjualan dengan harga diskon. Perwakilan NGO melihat informasi produk surplus, menyaringnya berdasarkan jenis, jarak, dan batas waktu pengambilan, lalu mengajukan klaim. Admin Sistem memverifikasi pendaftaran akun dan memantau log aktivitas pengguna.

FoodLink dibangun dengan pola arsitektur MVC (*Model-View-Controller*). *View* menampilkan halaman dan meneruskan aksi pengguna, *Controller* memvalidasi masukan dan mengatur alur use case, sedangkan *Model* mengelola data ke basis data. Gambar 2.1 menunjukkan rancangan arsitektur MVC yang menjadi acuan implementasi.

<p align="center">
<img alt="Arsitektur MVC FoodLink" src="../M8/assets/diagram/Gambar%201.%20Arsitektur%20MVC%20FoodLink.jpg" width="70%">
</p>
<p align="center">
<i>Gambar 2.1. Arsitektur MVC FoodLink (sumber: M8 DPPL2, Subbab 2.2.1)</i>
</p>

<br>

Gambar diatas memperlihatkan hubungan antara *View*, *Controller*, dan *Model*. *View* mengirim aksi pengguna ke *Controller* dan menerima perubahan tampilan; *Controller* mengakses *Model* untuk membaca atau mengubah data; *Model* memberi notifikasi perubahan dan melayani permintaan data. Pemisahan ini memungkinkan beberapa halaman memakai logika yang sama, misalnya data produk surplus digunakan oleh halaman Pemilik F&B dan Perwakilan NGO.

## 2.2 Batas Sistem dan Keterkaitan dengan Sistem Eksternal

Batas FoodLink mencakup seluruh proses pengelolaan akun, data penjualan, prediksi produksi, produk surplus, klaim, konfirmasi pengambilan, dan log aktivitas.

Beberapa batasan utama FoodLink adalah sebagai berikut.

1. FoodLink tidak terintegrasi dengan *payment gateway*. Sistem hanya mencatat metode distribusi, yaitu donasi atau penjualan dengan harga diskon; pembayaran dilakukan langsung antara Pemilik F&B dan Perwakilan NGO di luar sistem.
2. FoodLink tidak menyediakan layanan pengiriman. Produk surplus harus diambil langsung di lokasi Pemilik F&B sebelum batas waktu pengambilan.
3. Dokumen pendaftaran hanya dapat diunggah dalam format PDF, JPG, atau PNG dengan ukuran maksimal 5 MB per dokumen. Akun baru dapat digunakan setelah diverifikasi secara manual oleh Admin Sistem.
4. Prediksi produksi hanya dapat dijalankan apabila tersedia minimal tujuh hari data penjualan.
5. Satu produk surplus hanya dapat diklaim oleh satu Perwakilan NGO. Klaim diproses secara atomik agar tidak terjadi klaim ganda.
6. Pengelolaan data pribadi pengguna mengikuti UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.


Tabel 2.1. Keterkaitan FoodLink dengan Sistem Eksternal

| Komponen/Sistem | Posisi | Keterkaitan dengan FoodLink |
| :--- | :--- | :--- |
| *Browser modern* | Di luar sistem, sisi klien | Menampilkan antarmuka FoodLink. |
| *OpenStreetMap Nominatim* | Di luar sistem, layanan pihak ketiga | Mengubah alamat kantor Perwakilan NGO dan alamat usaha Pemilik F&B menjadi koordinat. |
| *Basis data SQLite* | Di dalam deployment FoodLink | Menyimpan data secara lokal menggunakan `better-sqlite3`. Rancangan DPPL memakai PostgreSQL 15, tetapi implementasi memakai SQLite (M9 Tabel B.1 no.1). |

<br>

<p align="center">
<img alt="Logical View FoodLink" src="../M8/assets/diagram/Gambar%202.%20Logical%20View%20FoodLink.jpg" width="100%">
</p>
<p align="center">
<i>Gambar 2.2. Logical View FoodLink (sumber: M8 DPPL2, Subbab 2.4.1)</i>
</p>


Gambar diatas menegaskan batas sistem dari sisi komponen. *View*, *Controller*, *Model*, dan basis data berada di dalam FoodLink, sedangkan komponen integrasi eksternal *GeolocationAdapter* menghubungkan sistem dengan layanan peta di luar FoodLink. Pada gambar, basis data masih berlabel PostgreSQL 15 karena gambar berasal dari DPPL; implementasi akhir menggunakan SQLite sebagaimana tercatat pada M9 Tabel B.1 no.1. Adapter geolocation diimplementasikan menggunakan Nominatim dengan batas waktu dan cache (M9 Tabel B.1 no.21).

## 2.3 Aktor dan Pemodelan Kasus

FoodLink memiliki tiga aktor yang berinteraksi langsung dengan sistem.

Tabel 2.2. Aktor FoodLink

| ID Aktor | Aktor | Peran Utama |
| :--- | :--- | :--- |
| *A01* | *Pemilik F&B* | Mencatat data penjualan harian, melihat hasil prediksi produksi, mencatat produk surplus, dan mengatur metode distribusi surplus. |
| *A02* | *Perwakilan NGO* | Melihat dan menyaring informasi produk surplus, mengajukan klaim, serta mengonfirmasi pengambilan produk. |
| *A03* | *Admin Sistem* | Memverifikasi pendaftaran akun dan mengecek log aktivitas pengguna. |

<br>

Interaksi aktor dengan sistem dimodelkan dalam 12 use case utama.

Tabel 2.3. Daftar Use Case FoodLink

| ID UC | Nama Use Case | Aktor | ID KF |
| :--- | :--- | :--- | :--- |
| *UC01* | *Melakukan Registrasi Akun* | *A01, A02* | *KF01* |
| *UC02* | *Memverifikasi Pendaftaran Akun* | *A03* | *KF02, KF03* |
| *UC03* | *Melihat Status Pendaftaran* | *A01, A02* | *KF04* |
| *UC04* | *Mencatat Data Penjualan Harian* | *A01* | *KF05* |
| *UC05* | *Melihat Hasil Prediksi Produksi* | *A01* | *KF06, KF07* |
| *UC06* | *Mencatat Produk Surplus* | *A01* | *KF08* |
| *UC07* | *Mengatur Metode Distribusi Surplus* | *A01* | *KF09* |
| *UC08* | *Melihat Informasi Produk Surplus* | *A02* | *KF10, KF11* |
| *UC09* | *Menyaring Informasi Produk Surplus* | *A02* | *KF12* |
| *UC10* | *Mengklaim Produk Surplus* | *A02* | *KF13* |
| *UC11* | *Mengonfirmasi Pengambilan Produk Surplus* | *A01, A02* | *KF14* |
| *UC12* | *Mengecek Log Aktivitas Pengguna* | *A03* | *KF15* |

## 2.4 Use Case Diagram

Gambar dibawah menunjukkan *use case diagram* FoodLink yang memperlihatkan aktor, batas sistem, dan hubungan antar-use case.

<p align="center">
<img alt="Use Case Diagram FoodLink" src="../M5/assets/diagram/Use%20Case%20Diagram-Revisi.jpg" width="70%">
</p>
<p align="center">
<i>Gambar 2.3. Use Case Diagram FoodLink (sumber: M5 SKPL, Subbab 4.3)</i>
</p>

<br>




---

# BAB 3: Implementasi

Bagian ini diisi dengan informasi tentang elemen P/L yang dikembangkan (*executable files*, *configuration files*, *data files*, dan sebagainya) serta perubahannya terhadap rancangan pada DPPL (jika ada).

## 3.1 Lingkungan Implementasi

Tuliskan *hardware* dan *software* yang digunakan untuk implementasi, mencakup *operating system*, bahasa pemrograman beserta versinya, *framework*/*library*, DBMS, *development tools*, dan *version control*. Lingkungan ini harus konsisten dengan **Subbab 2.1 DPPL**; jelaskan jika ada perubahan. Cantumkan juga *framework* dan alat pengujian yang dipakai.

Tabel 3.1. Lingkungan Implementasi

| Aspek | Keterangan |
| :--- | :--- |
| *Hardware* | *[Spesifikasi perangkat keras]* |
| *Operating System* | *[Nama dan versi OS]* |
| *Bahasa Pemrograman* | *[Bahasa dan versi]* |
| *Framework/Library* | *[Daftar framework/library beserta versi]* |
| *DBMS* | *[Nama dan versi DBMS]* |
| *Development Tools* | *[IDE, version control, tools lain]* |
| *Testing Tools* | *[Framework unit test, alat ukur performa, alat coverage]* |

## 3.2 Implementasi Modul

Tabel 3.2. Implementasi Modul

| No | ID Kelas | Nama Modul/Kelas | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *C01* | *AkunPengguna* | *src/models/AkunPengguna.js* | *-* |
| 2 | *C02* | *Pendaftaran* | *src/models/Pendaftaran.js* | *-* |
| 3 | *C03* | *DokumenPendukung* | *src/models/DokumenPendukung.js* | *-* |
| 4 | *C04* | *VerifikasiController* | *src/controllers/VerifikasiController.js*, *src/routes/admin.js* | *-* |
| 5 | *C05* | *Produk* | *src/models/Produk.js* | *-* |
| 6 | *C06* | *DataPenjualan* | *src/models/DataPenjualan.js* | *-* |
| 7 | *C07* | *PrediksiProduksi* | *src/models/PrediksiProduksi.js* | *-* |
| 8 | *C08* | *ProdukSurplus* | *src/models/ProdukSurplus.js* | *-* |
| 9 | *C09* | *MetodeDistribusiSurplus* | *src/models/MetodeDistribusiSurplus.js* | *-* |
| 10 | *C10* | *DokumenKlaim* | *src/models/DokumenKlaim.js* | *-* |
| 11 | *C11* | *LogAktivitas* | *src/models/LogAktivitas.js* | *-* |
| 12 | *C12* | *RegistrasiPage* | *src/views/auth/I02-I03-Registrasi.ejs*, *src/routes/auth.js* | *-* |
| 13 | *C13* | *VerifikasiPage* | *src/views/admin/I19-VerifikasiPendaftar.ejs*, *src/views/admin/I20-DetailPendaftar.ejs*, *src/views/admin/I21-I22-HasilVerifikasi.ejs*, *src/routes/admin.js* | *-* |
| 14 | *C14* | *StatusPendaftaranPage* | *src/views/auth/I04-StatusPendaftaran.ejs*, *src/routes/status.js* | *-* |
| 15 | *C15* | *PenjualanPage* | *src/views/fnb/I06-PenjualanHarian.ejs*, *src/views/fnb/I07-PenjualanTersimpan.ejs*, *src/routes/fnb.js* | *-* |
| 16 | *C16* | *PrediksiPage* | *src/views/fnb/I05-DashboardF&B.ejs*, *src/controllers/PrediksiController.js* | *-* |
| 17 | *C17* | *ProdukSurplusPage* | *src/views/surplus/I08-CatatSurplus.ejs*, *src/controllers/CatatSurplusController.js* | *-* |
| 18 | *C18* | *DistribusiSurplusPage* | *src/views/surplus/I09-AturDistribusi.ejs*, *src/views/surplus/I11-SuksesPublikasi.ejs*, *src/controllers/DistribusiSurplusController.js* | *-* |
| 19 | *C19* | *DaftarSurplusPage* | *src/views/ngo/I12-DaftarSurplus.ejs*, *src/controllers/SurplusController.js* | *-* |
| 20 | *C20* | *KlaimPage* | *src/views/ngo/I15-DetailProduk.ejs*, *src/views/ngo/N6-KlaimBerhasil.ejs*, *src/routes/ngo.js* | *-* |
| 21 | *C21* | *PengambilanPage* | *src/views/ngo/N7-KlaimSaya.ejs*, *src/views/ngo/N7-PengambilanSelesai.ejs*, *src/views/ngo/partials/N5-KonfirmasiKlaim.ejs*, *src/routes/ngo.js* | *-* |
| 22 | *C22* | *LogAktivitasPage* | *src/views/admin/I23-LogAktivitas.ejs* | *-* |
| 23 | *C23* | *AuthController* | *src/controllers/AuthController.js* | *-* |
| 24 | *C24* | *PenjualanController* | *src/controllers/PenjualanController.js* | *-* |
| 25 | *C25* | *PrediksiController* | *src/controllers/PrediksiController.js* | *-* |
| 26 | *C26* | *ProdukSurplusController* | *src/controllers/CatatSurplusController.js*, *src/controllers/DistribusiSurplusController.js* | *-* |
| 27 | *C27* | *SurplusController* | *src/controllers/SurplusController.js* | *-* |
| 28 | *C28* | *KlaimController* | *src/controllers/KlaimController.js* | *-* |
| 29 | *C29* | *LogController* | *src/controllers/LogController.js*, *src/routes/log.js* | *-* |
| 30 | *C30* | *PemilikFnB* | *src/models/PemilikFnB.js* | *-* |
| 31 | *C31* | *PerwakilanNGO* | *src/models/PerwakilanNGO.js* | *-* |
| 32 | *C32* | *AdminSistem* | *src/middleware/peran.js*, *src/routes/admin.js*, *src/routes/log.js* | *-* |
| 33 | *C33* | *GeolocationAdapter* | *src/models/GeolocationAdapter.js* | *-* |
| 34 | *C34* | *PenyaringanController* | *src/controllers/SurplusController.js* | *-* |

## 3.3 Implementasi Antarmuka

Daftar antarmuka yang telah diimplementasikan. Gunakan ID dan nama layar yang sama dengan ID dan nama layar pada tugas DPPL.

Tabel 3.3. Implementasi Antarmuka

| No | ID Antarmuka | Nama Antarmuka | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *I-00* | *Masuk* | *src/views/auth/I00-Masuk.ejs* | *-* |
| 2 | *I-01* | *Selamat Datang* | *src/views/I01-SelamatDatang.ejs* | *-* |
| 3 | *I-02* | *Registrasi - Pemilik F&B* | *src/views/auth/I02-I03-Registrasi.ejs* | *-* |
| 4 | *I-03* | *Registrasi - NGO* | *src/views/auth/I02-I03-Registrasi.ejs* | *-* |
| 5 | *I-04* | *Status Pendaftaran* | *src/views/auth/I04-StatusPendaftaran.ejs* | *-* |
| 6 | *I-05* | *Dashboard Pemilik F&B* | *src/views/fnb/I05-DashboardF&B.ejs* | *-* |
| 7 | *I-06* | *Penjualan Harian* | *src/views/fnb/I06-PenjualanHarian.ejs* | *-* |
| 8 | *I-07* | *Penjualan Tersimpan* | *src/views/fnb/I07-PenjualanTersimpan.ejs* | *-* |
| 9 | *I-08* | *Catat Produk Surplus* | *src/views/surplus/I08-CatatSurplus.ejs* | *-* |
| 10 | *I-09* | *Atur Distribusi - Donasi* | *src/views/surplus/I09-AturDistribusi.ejs* | *-* |
| 11 | *I-10* | *Atur Distribusi - Jual Diskon* | *src/views/surplus/I09-AturDistribusi.ejs* | *-* |
| 12 | *I-11* | *Surplus Dipublikasikan* | *src/views/surplus/I11-SuksesPublikasi.ejs* | *-* |
| 13 | *I-12* | *Daftar Surplus* | *src/views/ngo/I12-DaftarSurplus.ejs* | *-* |
| 14 | *I-13* | *Filter* | *src/views/ngo/I12-DaftarSurplus.ejs* | *-* |
| 15 | *I-14* | *Daftar Surplus (Terfilter)* | *src/views/ngo/I12-DaftarSurplus.ejs* | *-* |
| 16 | *I-15* | *Detail Produk* | *src/views/ngo/I15-DetailProduk.ejs* | *-* |
| 17 | *I-16* | *Konfirmasi Klaim* | *src/views/ngo/partials/N5-KonfirmasiKlaim.ejs* | *-* |
| 18 | *I-17* | *Klaim Berhasil* | *src/views/ngo/N6-KlaimBerhasil.ejs* | *-* |
| 19 | *I-18* | *Pengambilan Selesai* | *src/views/ngo/N7-PengambilanSelesai.ejs* | *-* |
| 20 | *I-19* | *Verifikasi Pendaftar* | *src/views/admin/I19-VerifikasiPendaftar.ejs* | *-* |
| 21 | *I-20* | *Detail Pendaftar* | *src/views/admin/I20-DetailPendaftar.ejs* | *-* |
| 22 | *I-21* | *Pendaftar Diterima* | *src/views/admin/I21-I22-HasilVerifikasi.ejs* | *-* |
| 23 | *I-22* | *Pendaftar Ditolak* | *src/views/admin/I21-I22-HasilVerifikasi.ejs* | *-* |
| 24 | *I-23* | *Log Aktivitas* | *src/views/admin/I23-LogAktivitas.ejs* | *-* |
| 25 | *N7* | *Klaim Saya* | *src/views/ngo/N7-KlaimSaya.ejs* | *-* |


## 3.4 File Lain

Daftar file lain yang dibuat selain file kelas dan antarmuka, misalnya file *utility*, *configuration*, *database schema/seed*, *file test*, atau *data*.

Tabel 3.4. File Lain

| No | Nama File | Keterangan |
| :--- | :--- | :--- |
| 1 | *[Nama file]* | *[Fungsi file]* |
| ... | *...* | *...* |

<br>

---

# BAB 4: Hasil Pengujian

Bab ini melaporkan hasil pengujian P/L pada level unit, integrasi, dan sistem. Pengujian dilakukan pada tag release terakhir Tugas 9. Hasil aktual diisi berdasarkan pengamatan saat pengujian. Kesimpulan diisi `Pass` atau `Fail`, dan untuk `Fail` dilengkapi penyebab serta usulan perbaikan.

## 4.1 Strategi dan Kedalaman Pengujian Kelas

Setiap kelas perancangan pada Tabel 4.1 DPPL diklasifikasikan ke dalam tiga tingkat kedalaman pengujian. Tingkat **Mendalam** diberikan pada kelas yang memuat logika bisnis, perhitungan, validasi, aturan status, algoritma, integrasi eksternal, atau keamanan. Tingkat **Sedang** diberikan pada kelas yang hanya mengoordinasikan atau mendelegasikan proses. Tingkat **Tidak perlu** diberikan pada kelas tanpa logika, seperti *entity/DTO* dan kelas konfigurasi, yang teruji secara tidak langsung melalui test case use case. Seluruh kelas wajib dicantumkan beserta alasan penentuan tingkatnya.

Tabel 4.1.1. Identifikasi Tingkat Pengujian Kelas

| ID Kelas | Nama Kelas | Tingkat | Alasan | Test Case Terkait |
| :--- | :--- | :--- | :--- | :--- |
| *C01* | *AkunPengguna* | *Mendalam* | *Menyimpan kata sandi sebagai hash dan memvalidasi data registrasi akun* | *C01-UT01 s.d. C01-UT05* |
| *C02* | *Pendaftaran* | *Mendalam* | *Memvalidasi data pendaftaran dan mengelola transisi status verifikasi* | *C02-UT01 s.d. C02-UT18* |
| *C03* | *DokumenPendukung* | *Mendalam* | *Memvalidasi tipe dan ukuran berkas serta menyimpan dokumen pendukung* | *C03-UT01 s.d. C03-UT10* |
| *C04* | *VerifikasiController* | *Sedang* | *Mengoordinasikan tampilan verifikasi dan mendelegasikan perubahan status ke C02, diuji juga melalui integrasi* | *C04-UT01 s.d. C04-UT07* |
| *C05* | *Produk* | *Tidak perlu* | *Entity produk tanpa logika, hanya menyimpan atribut dan getter, diuji tidak langsung melalui UC* | |
| *C06* | *DataPenjualan* | *Mendalam* | *Memvalidasi input penjualan dan menghitung sisa stok harian* | *C06-UT01 s.d. C06-UT08* |
| *C07* | *PrediksiProduksi* | *Mendalam* | *Menjalankan dan menyimpan prediksi produksi beserta rekomendasi jumlah* | *C07-UT01 s.d. C07-UT08* |
| *C08* | *ProdukSurplus* | *Mendalam* | *Memvalidasi data surplus dan mengelola status ketersediaan* | *C08-UT01 s.d. C08-UT16* |
| *C09* | *MetodeDistribusiSurplus* | *Mendalam* | *Menentukan metode distribusi serta perhitungan harga atau gratis* | *C09-UT01 s.d. C09-UT09* |
| *C10* | *DokumenKlaim* | *Mendalam* | *Mencatat klaim dan mengelola transisi status klaim* | *C10-UT01 s.d. C10-UT09* |
| *C11* | *LogAktivitas* | *Mendalam* | *Mencari dan menyaring log dengan query serta validasi kriteria* | *C11-UT01 s.d. C11-UT09* |
| *C12* | *RegistrasiPage* | *Tidak perlu* | *View-only untuk formulir registrasi, logika di C23, diuji tidak langsung melalui UC* | |
| *C13* | *VerifikasiPage* | *Tidak perlu* | *View-only untuk daftar dan detail verifikasi, logika di C04, diuji tidak langsung melalui UC* | |
| *C14* | *StatusPendaftaranPage* | *Tidak perlu* | *View-only untuk status pendaftaran, logika di C02, diuji tidak langsung melalui UC* | |
| *C15* | *PenjualanPage* | *Tidak perlu* | *View-only untuk formulir penjualan, logika di C24, diuji tidak langsung melalui UC* | |
| *C16* | *PrediksiPage* | *Tidak perlu* | *View-only untuk dashboard dan grafik prediksi, logika di C25 dan C07, diuji tidak langsung melalui UC* | |
| *C17* | *ProdukSurplusPage* | *Tidak perlu* | *View-only untuk formulir produk surplus, logika di C26, diuji tidak langsung melalui UC* | |
| *C18* | *DistribusiSurplusPage* | *Tidak perlu* | *View-only untuk formulir distribusi surplus, logika di C26 dan C09, diuji tidak langsung melalui UC* | |
| *C19* | *DaftarSurplusPage* | *Tidak perlu* | *View-only untuk daftar dan filter surplus, logika di C34 dan C27, diuji tidak langsung melalui UC* | |
| *C20* | *KlaimPage* | *Tidak perlu* | *View-only untuk detail dan pengajuan klaim, logika di C28, diuji tidak langsung melalui UC* | |
| *C21* | *PengambilanPage* | *Tidak perlu* | *View-only untuk detail dan konfirmasi pengambilan, logika di C28, diuji tidak langsung melalui UC* | |
| *C22* | *LogAktivitasPage* | *Tidak perlu* | *View-only untuk dashboard log, logika di C29 dan C11, diuji tidak langsung melalui UC* | |
| *C23* | *AuthController* | *Mendalam* | *Memvalidasi kelengkapan dan format registrasi serta mengecek status pendaftaran* | *C23-UT01 s.d. C23-UT15* |
| *C24* | *PenjualanController* | *Mendalam* | *Memvalidasi input penjualan dengan batas numerik lalu menyimpan data* | *C24-UT01 s.d. C24-UT07* |
| *C25* | *PrediksiController* | *Mendalam* | *Mengecek kecukupan data historis dan menjalankan prediksi produksi* | *C25-UT01 s.d. C25-UT07* |
| *C26* | *ProdukSurplusController* | *Mendalam* | *Memvalidasi data surplus dan metode distribusi lalu menyimpan keduanya* | *C26-UT01 s.d. C26-UT16* |
| *C27* | *SurplusController* | *Mendalam* | *Mengambil surplus tersedia, menghitung jarak lewat C33, dan mengurutkan hasil* | *C27-UT01 s.d. C27-UT11* |
| *C28* | *KlaimController* | *Mendalam* | *Mengelola persetujuan klaim, ketersediaan, penguncian, dan konfirmasi pengambilan* | *C28-UT01 s.d. C28-UT18* |
| *C29* | *LogController* | *Sedang* | *Hanya memilih kriteria filter dan mendelegasikan pencarian ke C11, diuji juga melalui integrasi* | *C29-UT01 s.d. C29-UT06* |
| *C30* | *PemilikFnB* | *Tidak perlu* | *Kelas peran/entity pemilik F&B yang menyimpan data dan mendelegasikan aksi ke controller/model, diuji tidak langsung melalui UC* | |
| *C31* | *PerwakilanNGO* | *Tidak perlu* | *Kelas peran/entity NGO yang menyimpan data dan mendelegasikan aksi ke controller/model, diuji tidak langsung melalui UC* | |
| *C32* | *AdminSistem* | *Mendalam* | *Guard otorisasi peran dan status verifikasi akun* | *C32-UT01 s.d. C32-UT06* |
| *C33* | *GeolocationAdapter* | *Mendalam* | *Adapter integrasi geocoding dan perhitungan jarak* | *C33-UT01 s.d. C33-UT06* |
| *C34* | *PenyaringanController* | *Mendalam* | *Memvalidasi kriteria dan menyaring produk berdasarkan jenis, jarak, dan waktu* | *C34-UT01 s.d. C34-UT06* |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test: *tambahkan `--experimental-test-coverage --test-coverage-include="**/<Folder>/<NamaKelas>.js"` pada perintah tersebut, misalnya `node --test --experimental-test-coverage --test-coverage-include="**/models/PrediksiProduksi.js" tests/PrediksiProduksi.test.js` untuk C07*.

Lokasi file test: *`src/tests/`*.

### 4.2.1 Kelas AkunPengguna

**ID Kelas:** *C01*  
**Nama Kelas:** *AkunPengguna*  
**Tingkat:** *Mendalam*

Tabel 4.2.1. Hasil Pengujian Unit Kelas AkunPengguna

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C01-UT01* | *`registrasi()`* | *Normal* | *Registrasi akun F&B dengan email unik dan kata sandi `rahasia123`* | *Akun tersimpan, idAkun dikembalikan, kata sandi berupa hash dan cocok dengan `bcrypt.compareSync()`* | *Lulus, akun tersimpan dan hash bcrypt terverifikasi* | *Pass* |
| *C01-UT02* | *`registrasi()`* | *Batas* | *Kata sandi tepat 72 karakter* | *Akun tersimpan dan hash tetap dapat diverifikasi* | *Lulus, kata sandi 72 karakter ter-hash dan dapat diverifikasi* | *Pass* |
| *C01-UT03* | *`registrasi()`* | *Negatif* | *Email yang sudah terdaftar didaftarkan ulang* | *Operasi gagal karena UNIQUE constraint dan jumlah akun tidak bertambah* | *Lulus, error UNIQUE constraint terdeteksi dan jumlah akun tetap* | *Pass* |
| *C01-UT04* | *`cariBerdasarkanEmail()`* | *Normal/Negatif* | *Email terdaftar dan email yang tidak terdaftar* | *Data akun dikembalikan untuk email terdaftar, `null` untuk email tidak terdaftar* | *Lulus, akun ditemukan dan `null` untuk email tidak terdaftar* | *Pass* |
| *C01-UT05* | *`cariKredensial()`* | *Normal/Negatif* | *Email terdaftar dan email yang tidak terdaftar* | *Hash kata sandi dikembalikan dan cocok, `null` untuk email tidak terdaftar* | *Lulus, hash cocok dan `null` untuk email tidak terdaftar* | *Pass* |

Tabel 4.2.1b. Ringkasan Cakupan Kelas AkunPengguna

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`registrasi()`* |
| Operasi yang diuji | *`registrasi()`, `cariBerdasarkanEmail()`, `cariKredensial()`* |
| ID Algoritma yang tercakup | *Algo-C01-01* |
| Coverage (wajib ≥ 70%) | *100% baris / 100% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.2 Kelas Pendaftaran

**ID Kelas:** *C02*  
**Nama Kelas:** *Pendaftaran*  
**Tingkat:** *Mendalam*

Tabel 4.2.2. Hasil Pengujian Unit Kelas Pendaftaran

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C02-UT01* | *`ajukanPendaftaran()`* | *Normal* | *Akun F&B valid yang belum memiliki pendaftaran* | *idPendaftaran dikembalikan dan baris tersimpan dengan status `menunggu verifikasi` serta tanggal Jakarta hari ini* | *Lulus, idPendaftaran > 0, status dan tanggal sesuai* | *Pass* |
| *C02-UT02* | *`ajukanPendaftaran()`* | *Batas* | *Akun yang sudah memiliki pendaftaran diajukan lagi* | *INSERT ditolak oleh UNIQUE constraint dan jumlah pendaftaran tidak bertambah* | *Lulus, error UNIQUE `pendaftaran.id_akun` terdeteksi* | *Pass* |
| *C02-UT03* | *`ajukanPendaftaran()`* | *Negatif* | *idAkun 999999 yang tidak terdaftar* | *INSERT ditolak oleh FOREIGN KEY constraint dan jumlah pendaftaran tidak bertambah* | *Lulus, error FOREIGN KEY terdeteksi* | *Pass* |
| *C02-UT04* | *`getDaftarMenungguVerifikasi()`* | *Normal* | *Satu pendaftar F&B dan satu pendaftar NGO berstatus menunggu* | *Keduanya muncul dengan nama usaha/organisasi dan status `menunggu verifikasi`* | *Lulus, kedua baris dan nama sesuai* | *Pass* |
| *C02-UT05* | *`getDaftarMenungguVerifikasi()`* | *Batas* | *Satu pendaftaran diterima dan satu ditolak* | *Keduanya tidak muncul dalam daftar* | *Lulus, hanya status menunggu yang diambil* | *Pass* |
| *C02-UT06* | *`getDaftarMenungguVerifikasi()`* | *Negatif* | *Seluruh isi tabel pendaftaran dihapus sementara dalam transaksi* | *Daftar yang dikembalikan berupa array kosong* | *Lulus, hasil `[]` dan transaksi dibatalkan* | *Pass* |
| *C02-UT07* | *`getDetailPendaftar()`* | *Normal* | *idPendaftaran milik pemilik F&B* | *Data akun, status, tanggal, nama usaha, alamat, dan jam operasional terisi; field NGO `null`* | *Lulus, data F&B lengkap dan field NGO `null`* | *Pass* |
| *C02-UT08* | *`getDetailPendaftar()`* | *Batas* | *idPendaftaran milik perwakilan NGO* | *Data akun, status, tanggal, nama organisasi, nomor legalitas, dan lokasi terisi; field F&B `null`* | *Lulus, data NGO lengkap dan field F&B `null`* | *Pass* |
| *C02-UT09* | *`getDetailPendaftar()`* | *Negatif* | *idPendaftaran 999999 yang tidak ada* | *Operasi mengembalikan `null`* | *Lulus, hasil `null`* | *Pass* |
| *C02-UT10* | *`updateStatus()`* | *Normal* | *Pendaftaran menunggu dengan status `diterima`* | *Operasi mengembalikan `true` dan status berubah menjadi `diterima`* | *Lulus, return `true` dan status `diterima`* | *Pass* |
| *C02-UT11* | *`updateStatus()`* | *Normal* | *Pendaftaran menunggu dengan status `ditolak`* | *Operasi mengembalikan `true` dan status berubah menjadi `ditolak`* | *Lulus, return `true` dan status `ditolak`* | *Pass* |
| *C02-UT12* | *`updateStatus()`* | *Batas* | *Pendaftaran yang sudah diterima diubah lagi menjadi `ditolak`* | *Operasi mengembalikan `false` dan status tetap `diterima`* | *Lulus, keputusan pertama tidak tertimpa* | *Pass* |
| *C02-UT13* | *`updateStatus()`* | *Negatif* | *Status `pending` pada pendaftaran menunggu; status `diterima` pada idPendaftaran 999999* | *Operasi mengembalikan `false` untuk keduanya dan status awal tidak berubah* | *Lulus, kedua input ditolak tanpa perubahan* | *Pass* |
| *C02-UT14* | *`getStatus()`* | *Normal* | *Pendaftaran baru yang masih menunggu* | *Mengembalikan `menunggu verifikasi`* | *Lulus, status awal terbaca* | *Pass* |
| *C02-UT15* | *`getStatus()`* | *Batas* | *Pendaftaran tepat setelah diputuskan diterima* | *Mengembalikan `diterima`* | *Lulus, status hasil keputusan terbaca* | *Pass* |
| *C02-UT16* | *`getStatus()`* | *Negatif* | *idPendaftaran 999999 yang tidak ada* | *Mengembalikan `null`* | *Lulus, hasil `null`* | *Pass* |
| *C02-UT17* | *`cariBerdasarkanAkun()`* | *Normal* | *idAkun yang memiliki pendaftaran* | *Objek berisi idPendaftaran, tanggalDaftar, dan statusVerifikasi* | *Lulus, data pendaftaran milik akun sesuai* | *Pass* |
| *C02-UT18* | *`cariBerdasarkanAkun()`* | *Negatif* | *idAkun yang belum memiliki pendaftaran* | *Mengembalikan `null`* | *Lulus, hasil `null`* | *Pass* |
 
Tabel 4.2.2b. Ringkasan Cakupan Kelas Pendaftaran
 
| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`ajukanPendaftaran()`, `getDaftarMenungguVerifikasi()`, `getDetailPendaftar()`, `updateStatus()`, `getStatus()`* |
| Operasi yang diuji | *`ajukanPendaftaran()`, `getDaftarMenungguVerifikasi()`, `getDetailPendaftar()`, `updateStatus()`, `getStatus()`, `cariBerdasarkanAkun()`* |
| ID Algoritma yang tercakup | *Algo-C02-01 s.d. Algo-C02-05* |
| Coverage (wajib ≥ 70%) | *100% baris / 100% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.3 Kelas DokumenPendukung

**ID Kelas:** *C03*  
**Nama Kelas:** *DokumenPendukung*  
**Tingkat:** *Mendalam*

Tabel 4.2.3. Hasil Pengujian Unit Kelas DokumenPendukung

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C03-UT01* | *`unggahDokumen()`* | *Normal* | *Unggah berkas `NIB.pdf` untuk pendaftaran valid* | *idDokumen dikembalikan, metadata tersimpan, berkas tersalin ke storage, berkas sementara dihapus* | *Lulus, metadata dan berkas tujuan sesuai* | *Pass* |
| *C03-UT02* | *`unggahDokumen()`* | *Batas* | *Nama berkas `Laporan NIB (Final).PDF`* | *Ekstensi dinormalkan menjadi `.pdf` dan nama disanitasi menjadi `Laporan_NIB__Final_.pdf`* | *Lulus, nama dan tipe dokumen sesuai* | *Pass* |
| *C03-UT03* | *`unggahDokumen()`* | *Negatif* | *Berkas `virus.exe` dengan ekstensi tidak didukung* | *Operasi gagal, tidak ada baris baru, folder dokumen tidak dibuat* | *Lulus, error ekstensi tidak didukung* | *Pass* |
| *C03-UT04* | *`unggahDokumen()`* | *Batas* | *Dua berkas dengan nama asli `NIB.pdf` pada pendaftaran yang sama* | *Berkas pertama `NIB.pdf`, berkas kedua mendapat nama `NIB-1.pdf`* | *Lulus, akhiran unik ditambahkan* | *Pass* |
| *C03-UT05* | *`unggahDokumen()`* | *Negatif* | *idPendaftaran 999999 yang tidak ada* | *INSERT gagal karena FOREIGN KEY dan berkas hasil salinan dibersihkan* | *Lulus, folder kosong dan berkas sementara terhapus* | *Pass* |
| *C03-UT06* | *`getDokumen()`* | *Normal* | *Dua dokumen diunggah untuk satu pendaftaran* | *Kedua dokumen dikembalikan urut berdasarkan idDokumen beserta nama dan tipe* | *Lulus, urutan dan metadata sesuai* | *Pass* |
| *C03-UT07* | *`getDokumen()`* | *Batas* | *Dua pendaftaran, dokumen hanya dimiliki pendaftaran A* | *Pendaftaran A mengembalikan dokumennya, pendaftaran B mengembalikan array kosong* | *Lulus, dokumen tidak bocor antar pendaftaran* | *Pass* |
| *C03-UT08* | *`getDokumen()`* | *Negatif* | *idPendaftaran 999999 yang tidak ada* | *Mengembalikan array kosong* | *Lulus, hasil `[]`* | *Pass* |
| *C03-UT09* | *`ambilPathBerkas()`* | *Normal* | *idPendaftaran 12 dan nama `NIB.pdf`* | *Path berada di folder `12` dalam akar storage* | *Lulus, path sesuai* | *Pass* |
| *C03-UT10* | *`ambilPathBerkas()`* | *Batas* | *Nama berkas `../../evil.pdf`* | *Komponen traversal dibuang dan path tetap di folder pendaftaran* | *Lulus, path tetap aman* | *Pass* |

Tabel 4.2.3b. Ringkasan Cakupan Kelas DokumenPendukung

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`unggahDokumen()`, `getDokumen()`* |
| Operasi yang diuji | *`unggahDokumen()`, `getDokumen()`, `ambilPathBerkas()`* |
| ID Algoritma yang tercakup | *Algo-C03-01, Algo-C03-02* |
| Coverage (wajib ≥ 70%) | *100% baris / 85.71% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.4 Kelas VerifikasiController

**ID Kelas:** *C04*  
**Nama Kelas:** *VerifikasiController*  
**Tingkat:** *Sedang*

Tabel 4.2.4. Hasil Pengujian Unit Kelas VerifikasiController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C04-UT01* | *`tampilkanDaftarPendaftar()`* | *Normal* | *Ada pendaftar F&B dan NGO berstatus menunggu* | *Halaman daftar dirender dengan nama, label tipe, dan tanggal pendaftar* | *Lulus, kedua pendaftar tampil dengan label yang sesuai* | *Pass* |
| *C04-UT02* | *`tampilkanDaftarPendaftar()`* | *Negatif* | *Tidak ada pendaftaran berstatus menunggu* | *Halaman tetap dirender dengan daftar kosong* | *Lulus, daftar berisi array kosong* | *Pass* |
| *C04-UT03* | *`ambilDetailPendaftar()`* | *Normal* | *idPendaftaran valid dan memiliki satu dokumen* | *Halaman detail dirender dengan data pendaftar dan status dokumen `tersedia`* | *Lulus, detail dan dokumen tampil* | *Pass* |
| *C04-UT04* | *`ambilDetailPendaftar()`* | *Negatif* | *idPendaftaran 999999 yang tidak ada* | *Respons 404 dengan pesan `Pendaftaran tidak ditemukan.`* | *Lulus, status 404 dan pesan sesuai* | *Pass* |
| *C04-UT05* | *`prosesVerifikasi()`* | *Normal* | *Keputusan `terima` untuk pendaftaran F&B yang menunggu* | *Status menjadi `diterima`, log verifikasi dicatat, dan diarahkan ke halaman hasil* | *Lulus, status, log, dan redirect sesuai* | *Pass* |
| *C04-UT06* | *`prosesVerifikasi()`* | *Normal* | *Keputusan `tolak` untuk pendaftaran NGO yang menunggu* | *Status menjadi `ditolak`, log verifikasi dicatat, dan diarahkan ke halaman hasil* | *Lulus, status, log, dan redirect sesuai* | *Pass* |
| *C04-UT07* | *`prosesVerifikasi()`* | *Negatif* | *Keputusan `ubah` yang tidak dikenal* | *Status tidak berubah, tidak ada log baru, dan diarahkan kembali ke detail dengan pesan error* | *Lulus, keputusan ditolak tanpa perubahan* | *Pass* |

### 4.2.5 Kelas DataPenjualan

**ID Kelas:** *C06*  
**Nama Kelas:** *DataPenjualan*  
**Tingkat:** *Mendalam*

Tabel 4.2.5. Hasil Pengujian Unit Kelas DataPenjualan

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C06-UT01* | *`catatPenjualan()`* | *Normal* | *Satu produk dengan jumlah terjual 12 dan tersisa 3* | *Satu baris tersimpan pada tanggal Jakarta hari ini dan tanggal dikembalikan* | *Lulus, baris dan tanggal sesuai* | *Pass* |
| *C06-UT02* | *`catatPenjualan()`* | *Batas* | *Array kosong, nilai 0/0, lalu produk dan tanggal yang sama dicatat ulang dengan nilai 7/8* | *Array kosong tidak menambah baris; nilai 0 diterima; baris yang sama diperbarui tanpa duplikasi* | *Lulus, jumlah baris tetap dan nilai terbaru tersimpan* | *Pass* |
| *C06-UT03* | *`catatPenjualan()`* | *Negatif* | *Jumlah terjual -1, jumlah tersisa -1, lalu produk valid diikuti idProduk 999999* | *Operasi gagal karena CHECK atau FOREIGN KEY dan seluruh transaksi dibatalkan* | *Lulus, error terdeteksi dan tidak ada baris tersimpan* | *Pass* |
| *C06-UT04* | *`getDataHistoris()`* | *Normal* | *Data hari ini, 2 hari lalu, 6 hari lalu, 7 hari lalu, dan data pemilik lain* | *Hanya 5 baris dalam 7 hari milik pemilik, urut tanggal lalu idProduk* | *Lulus, filter, jumlah, dan urutan sesuai* | *Pass* |
| *C06-UT05* | *`getDataHistoris()`* | *Batas* | *`batasHari` 1 dan 2 dengan data hari ini, kemarin, dan dua hari lalu* | *`batasHari=1` hanya hari ini; `batasHari=2` hari ini dan kemarin* | *Lulus, batas inklusif sesuai* | *Pass* |
| *C06-UT06* | *`getDataHistoris()`* | *Negatif* | *Pemilik tanpa data dan idPemilik 999999* | *Mengembalikan array kosong* | *Lulus, hasil `[]`* | *Pass* |
| *C06-UT07* | *`getPenjualanHarian()`* | *Normal/Negatif* | *Dua produk hari ini, data kemarin, dan pemilik lain; lalu tanggal tanpa data dan idPemilik 999999* | *Dua baris hari ini milik pemilik urut idProduk; array kosong untuk data yang tidak ada* | *Lulus, filter dan urutan sesuai, hasil kosong sesuai* | *Pass* |
| *C06-UT08* | *`hitungHariTerkumpul()`* | *Normal/Negatif* | *Data hari ini, kemarin, dua hari lalu, tujuh hari lalu, dan pemilik lain; lalu pemilik tanpa data dan idPemilik 999999* | *Menghitung 3 hari unik dalam 7 hari; `batasHari=2` menghasilkan 2; data kosong menghasilkan 0* | *Lulus, hari unik, batas, dan hasil kosong sesuai* | *Pass* |

Tabel 4.2.5b. Ringkasan Cakupan Kelas DataPenjualan

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`getDataHistoris()`, `catatPenjualan()`* |
| Operasi yang diuji | *`getDataHistoris()`, `catatPenjualan()`, `getPenjualanHarian()`, `hitungHariTerkumpul()`; `tanggalHariIni()` tercakup melalui `catatPenjualan()`* |
| ID Algoritma yang tercakup | *Algo-C06-01, Algo-C06-02* |
| Coverage (wajib ≥ 70%) | *100% baris / 100% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.6 Kelas PrediksiProduksi

**ID Kelas:** *C07*  
**Nama Kelas:** *PrediksiProduksi*  
**Tingkat:** *Mendalam*

Tabel 4.2.6. Hasil Pengujian Unit Kelas PrediksiProduksi

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C07-UT01* | *`simpanPrediksi()`* | *Normal* | *Dua baris data untuk satu produk: 10/4 dan 20/0* | *Satu prediksi tersimpan untuk tanggal besok dengan rata-rata terjual 15 dan tersisa 2, sehingga rekomendasi 16* | *Lulus, tanggal dan nilai rekomendasi sesuai* | *Pass* |
| *C07-UT02* | *`simpanPrediksi()`* | *Batas* | *Dua produk berbeda, lalu produk A dicatat ulang pada tanggal prediksi yang sama* | *Produk A dan B masing-masing mendapat prediksi; pencatatan ulang A memperbarui baris tanpa duplikasi* | *Lulus, jumlah baris tetap dan nilai terbaru tersimpan* | *Pass* |
| *C07-UT03* | *`simpanPrediksi()`* | *Negatif* | *Array kosong, `null`, string, lalu produk valid diikuti idProduk 999999* | *Input kosong dan FOREIGN KEY ditolak; transaksi dibatalkan sehingga tidak ada prediksi tersimpan* | *Lulus, error terdeteksi dan tidak ada baris tersimpan* | *Pass* |
| *C07-UT04* | *`getHasilPrediksi()`* | *Normal* | *Prediksi dua produk milik satu pemilik; produk A memiliki penjualan terakhir 10* | *Dua baris dikembalikan urut idProduk; produk A memiliki rekomendasi 12, penjualan terakhir 10, dan tren 2* | *Lulus, filter, urutan, dan tren sesuai* | *Pass* |
| *C07-UT05* | *`getHasilPrediksi()`* | *Batas* | *Prediksi produk tanpa data penjualan dan prediksi milik pemilik lain* | *Hanya prediksi pemilik yang dikembalikan; `terjualTerakhir` dan `tren` bernilai `null`* | *Lulus, data pemilik lain tidak ikut dan nilai null sesuai* | *Pass* |
| *C07-UT06* | *`getHasilPrediksi()`* | *Negatif* | *Prediksi tersimpan untuk tanggal hari ini dan idPemilik 999999* | *Mengembalikan array kosong karena prediksi harus bertanggal besok dan milik pemilik yang diminta* | *Lulus, hasil `[]`* | *Pass* |
| *C07-UT07* | *`hitungRekomendasi()`* | *Normal/Batas/Negatif* | *Nilai 10/4, 10.4/0, 10.5/0, -10/0, `Infinity`, dan `NaN`* | *Hasil 12, 10, 11, 0, 0, dan 0 sesuai pembulatan serta batas bawah* | *Lulus, pembulatan dan penanganan nilai tidak valid sesuai* | *Pass* |
| *C07-UT08* | *`tanggalBesok()`* | *Normal* | *Memanggil helper tanggal besok* | *Tanggal Jakarta berformat `YYYY-MM-DD` satu hari setelah hari ini* | *Lulus, format dan tanggal sesuai* | *Pass* |

Tabel 4.2.6b. Ringkasan Cakupan Kelas PrediksiProduksi

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`simpanPrediksi()`, `getHasilPrediksi()`* |
| Operasi yang diuji | *`simpanPrediksi()`, `getHasilPrediksi()`, `hitungRekomendasi()`, `tanggalBesok()`* |
| ID Algoritma yang tercakup | *Algo-C07-01, Algo-C07-02* |
| Coverage (wajib ≥ 70%) | *100% baris / 100% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.7 Kelas ProdukSurplus

**ID Kelas:** *C08*  
**Nama Kelas:** *ProdukSurplus*  
**Tingkat:** *Mendalam*

Tabel 4.2.7. Hasil Pengujian Unit Kelas ProdukSurplus

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C08-UT01* | *`simpanProdukSurplus()`* | *Normal* | *Produk valid, jumlah 3, batas waktu 2099-01-01 12:00* | *idSurplus dikembalikan dan baris tersimpan dengan status `tersedia` serta atribut sesuai* | *Lulus, id dan seluruh atribut sesuai* | *Pass* |
| *C08-UT02* | *`simpanProdukSurplus()`* | *Batas* | *Jumlah tepat 1* | *Surplus tetap tersimpan karena jumlah minimum yang diterima constraint adalah 1* | *Lulus, jumlah 1 tersimpan* | *Pass* |
| *C08-UT03* | *`simpanProdukSurplus()`* | *Negatif* | *Jumlah 0, jumlah -1, lalu idProduk 999999* | *CHECK dan FOREIGN KEY menolak penyimpanan; jumlah baris tidak bertambah* | *Lulus, error constraint terdeteksi dan tidak ada baris baru* | *Pass* |
| *C08-UT04* | *`setStatus()`* | *Normal* | *Surplus tersedia diubah menjadi `terklaim`* | *Status berubah menjadi `terklaim`* | *Lulus, status tersimpan* | *Pass* |
| *C08-UT05* | *`setStatus()`* | *Batas* | *Surplus terklaim diubah menjadi `selesai`* | *Status berubah menjadi `selesai`* | *Lulus, status akhir sesuai* | *Pass* |
| *C08-UT06* | *`setStatus()`* | *Negatif* | *Status `diproses`; lalu status `selesai` untuk idSurplus 999999* | *Status tidak valid ditolak tanpa perubahan; id yang tidak ada memunculkan error* | *Lulus, kedua kesalahan terdeteksi* | *Pass* |
| *C08-UT07* | *`getDetailSurplus()`* | *Normal* | *idSurplus valid dengan jumlah 5* | *Seluruh atribut surplus dikembalikan sesuai baris database* | *Lulus, id, jumlah, batas waktu, dan status sesuai* | *Pass* |
| *C08-UT08* | *`getDetailSurplus()`* | *Batas* | *Surplus dengan batas waktu 2020-01-01 12:00* | *Detail tetap dikembalikan karena penyaringan waktu dilakukan di C27* | *Lulus, detail tersedia meskipun batas waktu lewat* | *Pass* |
| *C08-UT09* | *`getDetailSurplus()`* | *Negatif* | *idSurplus 999999 dan 0* | *Mengembalikan `null`* | *Lulus, hasil `null`* | *Pass* |
| *C08-UT10* | *`getProdukSurplusTersedia()`* | *Normal* | *Dua surplus tersedia, satu terklaim, dan satu selesai* | *Hanya dua surplus tersedia yang dikembalikan, urut idSurplus* | *Lulus, filter status dan urutan sesuai* | *Pass* |
| *C08-UT11* | *`getProdukSurplusTersedia()`* | *Batas* | *Satu surplus tersedia dengan batas waktu 2020-01-01 12:00* | *Model tetap mengembalikannya; penyaringan batas waktu dilakukan C27* | *Lulus, baris tersedia dikembalikan* | *Pass* |
| *C08-UT12* | *`getProdukSurplusTersedia()`* | *Negatif* | *Tabel surplus dikosongkan* | *Mengembalikan array kosong* | *Lulus, hasil `[]`* | *Pass* |
| *C08-UT13* | *`getStatus()`* | *Normal* | *Surplus baru berstatus tersedia* | *Mengembalikan `tersedia`* | *Lulus, status sesuai* | *Pass* |
| *C08-UT14* | *`getStatus()`* | *Batas* | *Status diubah menjadi `selesai` lalu dibaca kembali* | *Mengembalikan `selesai`* | *Lulus, status terbaru terbaca* | *Pass* |
| *C08-UT15* | *`getStatus()`* | *Negatif* | *idSurplus 999999 dan 0* | *Mengembalikan `null`* | *Lulus, hasil `null`* | *Pass* |
| *C08-UT16* | *`tambahProduk()`, `getSemuaProduk()`, `getProdukById()`, `updateProduk()`* | *Normal/Negatif* | *Tambah produk, baca daftar/detail, ubah produk, lalu akses id 999999* | *Produk bertambah dan berubah; id yang tidak ada menghasilkan `null`; update id tidak ada ditolak* | *Lulus, seluruh operasi pendukung sesuai* | *Pass* |

Tabel 4.2.7b. Ringkasan Cakupan Kelas ProdukSurplus

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`simpanProdukSurplus()`, `setStatus()`, `getDetailSurplus()`, `getProdukSurplusTersedia()`, `getStatus()`* |
| Operasi yang diuji | *`simpanProdukSurplus()`, `setStatus()`, `getDetailSurplus()`, `getProdukSurplusTersedia()`, `getStatus()`, operasi pendukung `tambahProduk()`, `getSemuaProduk()`, `getProdukById()`, `updateProduk()`* |
| ID Algoritma yang tercakup | *Algo-C08-01 s.d. Algo-C08-05* |
| Coverage (wajib ≥ 70%) | *100% baris / 100% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.8 Kelas MetodeDistribusiSurplus

**ID Kelas:** *C09*  
**Nama Kelas:** *MetodeDistribusiSurplus*  
**Tingkat:** *Mendalam*

Tabel 4.2.8. Hasil Pengujian Unit Kelas MetodeDistribusiSurplus

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C09-UT01* | *`simpanMetode()`* | *Normal* | *Produk valid dengan jenis `Donasi` dan harga 0* | *Satu baris metode tersimpan dengan jenis `Donasi` dan harga 0* | *Lulus, data metode sesuai* | *Pass* |
| *C09-UT02* | *`simpanMetode()`* | *Batas* | *Produk yang sudah memiliki metode `Donasi` diubah menjadi `Jual Diskon` dengan harga 8000* | *Baris yang sama diperbarui, tidak ada duplikasi, dan idDistribusi tetap* | *Lulus, jumlah baris tetap dan nilai terbaru tersimpan* | *Pass* |
| *C09-UT03* | *`simpanMetode()`* | *Negatif* | *Jenis `Gratis`; idProduk 999999; lalu harga -1 untuk `Jual Diskon`* | *Jenis ditolak validasi; relasi ditolak FOREIGN KEY; harga negatif ditolak CHECK; tidak ada baris baru* | *Lulus, seluruh error terdeteksi* | *Pass* |
| *C09-UT04* | *`getInfoDistribusi()`* | *Normal* | *Produk dengan metode `Donasi` dan harga 0* | *Mengembalikan objek berisi `jenisDistribusi` dan `harga`* | *Lulus, objek sesuai* | *Pass* |
| *C09-UT05* | *`getInfoDistribusi()`* | *Batas* | *Metode diubah dari `Donasi` menjadi `Jual Diskon` dengan harga 12000* | *Mengembalikan jenis dan harga terbaru* | *Lulus, data terbaru terbaca* | *Pass* |
| *C09-UT06* | *`getInfoDistribusi()`* | *Negatif* | *idProduk 999999 dan 0* | *Mengembalikan `null`* | *Lulus, hasil `null`* | *Pass* |
| *C09-UT07* | *`getJenisDistribusi()`* | *Normal* | *Produk dengan metode `Donasi`* | *Mengembalikan string `Donasi`* | *Lulus, jenis sesuai* | *Pass* |
| *C09-UT08* | *`getJenisDistribusi()`* | *Batas* | *Metode diubah dari `Donasi` menjadi `Jual Diskon`* | *Mengembalikan string `Jual Diskon`* | *Lulus, jenis terbaru terbaca* | *Pass* |
| *C09-UT09* | *`getJenisDistribusi()`* | *Negatif* | *idProduk 999999 dan 0* | *Mengembalikan `null`* | *Lulus, hasil `null`* | *Pass* |

Tabel 4.2.8b. Ringkasan Cakupan Kelas MetodeDistribusiSurplus

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`pilihMetodeDistribusi()`, `getInfoDistribusi()`, `getJenisDistribusi()`* |
| Operasi yang diuji | *`simpanMetode()` sebagai implementasi `pilihMetodeDistribusi()`, `getInfoDistribusi()`, `getJenisDistribusi()`* |
| ID Algoritma yang tercakup | *Algo-C09-01 s.d. Algo-C09-03* |
| Coverage (wajib ≥ 70%) | *100% baris / 100% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.9 Kelas DokumenKlaim

**ID Kelas:** *C10*  
**Nama Kelas:** *DokumenKlaim*  
**Tingkat:** *Mendalam*

Tabel 4.2.9. Hasil Pengujian Unit Kelas DokumenKlaim

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C10-UT01* | *`catatKlaim()`* | *Normal* | *NGO valid mengklaim satu produk surplus* | *idKlaim dikembalikan; baris tersimpan dengan status `terklaim` dan waktu klaim valid* | *Lulus, id, status, dan waktu sesuai* | *Pass* |
| *C10-UT02* | *`catatKlaim()`* | *Batas* | *Satu NGO mengklaim dua produk surplus berbeda* | *Dua klaim tersimpan dengan idKlaim berbeda dan status `terklaim`* | *Lulus, kedua klaim tersimpan* | *Pass* |
| *C10-UT03* | *`catatKlaim()`* | *Negatif* | *Klaim ulang produk yang sama; idNgo 999999; idSurplus 999999* | *Duplikasi ditolak UNIQUE; relasi tidak valid ditolak FOREIGN KEY; jumlah klaim tidak bertambah* | *Lulus, seluruh error terdeteksi* | *Pass* |
| *C10-UT04* | *`getDetailKlaim()`* | *Normal* | *idKlaim valid* | *Mengembalikan idKlaim, idNgo, idSurplus, waktuKlaim, dan statusKlaim* | *Lulus, seluruh atribut sesuai* | *Pass* |
| *C10-UT05* | *`getDetailKlaim()`* | *Batas* | *Dua klaim berbeda, lalu mengambil klaim kedua* | *Dokumen yang dikembalikan sesuai idKlaim yang diminta, bukan klaim pertama* | *Lulus, idKlaim dan idSurplus sesuai* | *Pass* |
| *C10-UT06* | *`getDetailKlaim()`* | *Negatif* | *idKlaim 999999 dan 0* | *Melempar error `Dokumen klaim tidak ditemukan.`* | *Lulus, error sesuai* | *Pass* |
| *C10-UT07* | *`getDaftarKlaim()`* | *Normal* | *Dua klaim milik satu NGO dengan waktu berbeda* | *Klaim terbaru muncul lebih dulu dan data produk, kategori, status surplus, jumlah, serta nama usaha terisi* | *Lulus, urutan dan data gabungan sesuai* | *Pass* |
| *C10-UT08* | *`getDaftarKlaim()`* | *Batas* | *Dua klaim milik NGO yang diuji dengan waktu sama, dan satu klaim milik NGO lain* | *Hanya klaim NGO yang diuji yang dikembalikan; waktu sama diurutkan idKlaim terbesar lebih dulu* | *Lulus, filter NGO dan pemecah urutan sesuai* | *Pass* |
| *C10-UT09* | *`getDaftarKlaim()`* | *Negatif* | *idNgo 999999 dan NGO tanpa klaim* | *Mengembalikan array kosong* | *Lulus, hasil `[]`* | *Pass* |

Tabel 4.2.9b. Ringkasan Cakupan Kelas DokumenKlaim

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`catatKlaim()`, `getDetailKlaim()`, `getWaktuKlaim()`, `getStatusKlaim()`* |
| Operasi yang diuji | *`catatKlaim()`, `getDetailKlaim()` (mencakup `waktuKlaim` dan `statusKlaim`), `getDaftarKlaim()`* |
| ID Algoritma yang tercakup | *Algo-C10-01, Algo-C10-02; Algo-C10-03/04 tercakup melalui `getDetailKlaim()`* |
| Coverage (wajib ≥ 70%) | *96.92% baris / 85.71% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.10 Kelas LogAktivitas

**ID Kelas:** *C11*  
**Nama Kelas:** *LogAktivitas*  
**Tingkat:** *Mendalam*

Tabel 4.2.10. Hasil Pengujian Unit Kelas LogAktivitas

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C11-UT01* | *`catatLog()`* | *Normal* | *Akun pemilik valid dengan aktivitas `Mencatat penjualan C11`* | *Satu log tersimpan dengan waktu berformat `YYYY-MM-DD HH:mm:ss`* | *Lulus, aktivitas dan format waktu sesuai* | *Pass* |
| *C11-UT02* | *`catatLog()`* | *Negatif* | *idAkun 999999 yang tidak terdaftar* | *INSERT ditolak FOREIGN KEY dan jumlah log tidak bertambah* | *Lulus, error relasi terdeteksi* | *Pass* |
| *C11-UT03* | *`getDaftarLog()`* | *Normal* | *Enam log milik admin, pemilik, dan NGO dengan waktu berbeda* | *Log terbaru lebih dulu dan kolom pengguna berisi `Admin Sistem`, nama usaha, atau nama organisasi* | *Lulus, urutan dan nama pengguna sesuai* | *Pass* |
| *C11-UT04* | *`getDaftarLog()`* | *Batas* | *120 log tambahan dimasukkan setelah data awal* | *Hanya 100 log terbaru yang dikembalikan; baris teratas adalah `Aktivitas tambahan 119`* | *Lulus, batas 100 diterapkan* | *Pass* |
| *C11-UT05* | *`getDaftarLog()`* | *Negatif* | *Tabel log dikosongkan* | *Mengembalikan array kosong* | *Lulus, hasil `[]`* | *Pass* |
| *C11-UT06* | *`cariLog()`* | *Normal* | *Kata kunci `Klaim`, `Surplus`, dan `Verifikasi`* | *`Klaim` dan `Surplus` masing-masing mengembalikan satu log; `Verifikasi` mengembalikan dua log, seluruhnya memuat nama pengguna* | *Lulus, hasil filter sesuai* | *Pass* |
| *C11-UT07* | *`cariLog()`* | *Batas* | *Kata kunci `klaim` dan `SURPLUS`* | *Pencarian tetap menemukan log yang sama tanpa membedakan huruf besar/kecil* | *Lulus, pencarian case-insensitive* | *Pass* |
| *C11-UT08* | *`cariLog()`* | *Negatif* | *Kata kunci `TidakAda`* | *Mengembalikan array kosong* | *Lulus, hasil `[]`* | *Pass* |
| *C11-UT09* | *`adaLog()`* | *Normal/Negatif* | *Tabel berisi log, lalu dikosongkan sementara dalam transaksi* | *Mengembalikan `true` saat berisi dan `false` saat kosong; perubahan dibatalkan* | *Lulus, kedua kondisi sesuai* | *Pass* |

Tabel 4.2.10b. Ringkasan Cakupan Kelas LogAktivitas

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`getDaftarLog()`, `cariLog()`* |
| Operasi yang diuji | *`getDaftarLog()`, `cariLog()`, `catatLog()`, `adaLog()`* |
| ID Algoritma yang tercakup | *Algo-C11-01, Algo-C11-02* |
| Coverage (wajib ≥ 70%) | *100% baris / 100% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.11 Kelas AuthController

**ID Kelas:** *C23*  
**Nama Kelas:** *AuthController*  
**Tingkat:** *Mendalam*

Tabel 4.2.11. Hasil Pengujian Unit Kelas AuthController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C23-UT01* | *`registrasiAkun()`* | *Normal* | *Form F&B valid dengan dokumen PDF* | *Akun, profil F&B, pendaftaran, dokumen, dan log tersimpan; status `menunggu verifikasi`* | *Lulus, idAkun/idPendaftaran > 0, hash bcrypt, 1 dokumen PDF, log tercatat* | *Pass* |
| *C23-UT02* | *`registrasiAkun()`* | *Batas* | *Form NGO dengan kata sandi 72 karakter; nama organisasi 120; nomor legalitas 120; lokasi 255* | *Akun dan profil NGO tersimpan dengan nilai batas; tabel F&B tidak bertambah; log tercatat* | *Lulus, profil dan log memakai nilai batas* | *Pass* |
| *C23-UT03* | *`registrasiAkun()`* | *Negatif* | *Jam operasional kosong; dokumen tidak ada; dokumen `.exe`; email duplikat* | *`GalatRegistrasi` dengan field yang sesuai; tidak ada akun/berkas sisa* | *Lulus, seluruh error terdeteksi dan jumlah akun tetap* | *Pass* |
| *C23-UT04* | *`validasiKelengkapanData()`* | *Normal* | *Form F&B dan NGO valid; isian berspasi dan email berhuruf besar* | *`true`; normalisasi memangkas spasi, lowercase email, dan sandi non-string menjadi kosong* | *Lulus, kedua formulir valid dan normalisasi sesuai* | *Pass* |
| *C23-UT05* | *`validasiKelengkapanData()`* | *Batas* | *Email 257 karakter; sandi 73 karakter; alamat 256 karakter; lokasi NGO 256 karakter* | *`false` untuk tiap nilai di atas batas* | *Lulus, seluruh nilai di atas batas ditolak* | *Pass* |
| *C23-UT06* | *`validasiKelengkapanData()`* | *Negatif* | *Tipe akun salah; email kosong/format salah; sandi kosong/pendek; field wajib kosong* | *`false`; `daftarErrorKelengkapan()` menunjuk field bermasalah* | *Lulus, seluruh input tidak valid ditolak* | *Pass* |
| *C23-UT07* | *`validasiFormatDokumen()`* | *Normal* | *Berkas PDF, JPG, dan PNG valid* | *`true` untuk ketiga format* | *Lulus, tiga format diterima* | *Pass* |
| *C23-UT08* | *`validasiFormatDokumen()`* | *Batas* | *Berkas 0 byte dan berkas 5 MB + 1 byte* | *`false` untuk keduanya* | *Lulus, berkas kosong dan melebihi batas ditolak* | *Pass* |
| *C23-UT09* | *`validasiFormatDokumen()`* | *Negatif* | *Berkas tidak ada; `.exe`; MIME tidak cocok; tanpa ekstensi* | *`false` untuk seluruh berkas* | *Lulus, seluruh berkas tidak layak ditolak* | *Pass* |
| *C23-UT10* | *`cekStatusPendaftaran()`* | *Normal* | *Pendaftaran berstatus `menunggu verifikasi`* | *Status dan tanggal daftar `YYYY-MM-DD` dikembalikan* | *Lulus, status dan tanggal sesuai* | *Pass* |
| *C23-UT11* | *`cekStatusPendaftaran()`* | *Batas* | *Pendaftaran berstatus `diterima` dan `ditolak`* | *Status terbaru terbaca untuk keduanya* | *Lulus, status `diterima` dan `ditolak` sesuai* | *Pass* |
| *C23-UT12* | *`cekStatusPendaftaran()`* | *Negatif* | *Akun tanpa pendaftaran* | *`{ ditemukan: false, pesan: 'Pendaftaran belum tersedia.' }`* | *Lulus, pesan tidak ditemukan sesuai* | *Pass* |
| *C23-UT13* | *`tampilkanFormRegistrasi()`, `tampilkanFormRegistrasiDenganError()`, `kirimFormulirRegistrasi()`* | *Normal/Negatif* | *GET form F&B/NGO; POST valid; POST error* | *Form/error dirender; sukses dialihkan ke `/daftar/berhasil`; berkas error dihapus* | *Lulus, respons dan pembersihan berkas sesuai* | *Pass* |
| *C23-UT14* | *`masuk()`* | *Normal/Negatif* | *Kredensial kosong/salah; akun admin, menunggu, diterima F&B/NGO, dan tanpa profil* | *Error atau redirect sesuai status dan peran* | *Lulus, seluruh cabang login sesuai* | *Pass* |
| *C23-UT15* | *`keluar()`, `tampilkanHalamanMasuk()`, `tampilkanStatusPendaftaran()`, `tampilkanHalamanBerhasil()`* | *Normal/Negatif* | *Logout; halaman masuk; status menunggu; id status tidak ada; halaman berhasil* | *Sesi dihancurkan; halaman/redirect/404 sesuai* | *Lulus, respons halaman dan logout sesuai* | *Pass* |

Tabel 4.2.11b. Ringkasan Cakupan Kelas AuthController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`registrasiAkun()`, `validasiKelengkapanData()`, `validasiFormatDokumen()`, `cekStatusPendaftaran()`* |
| Operasi yang diuji | *Empat operasi public di atas, ditambah `normalisasiFormulir()`, `daftarErrorKelengkapan()`, dan handler HTTP registrasi/masuk/keluar/status* |
| ID Algoritma yang tercakup | *Algo-C23-01 s.d. Algo-C23-04* |
| Coverage (wajib ≥ 70%) | *98.51% baris / 92.56% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.12 Kelas PenjualanController

**ID Kelas:** *C24*  
**Nama Kelas:** *PenjualanController*  
**Tingkat:** *Mendalam*

Tabel 4.2.12. Hasil Pengujian Unit Kelas PenjualanController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C24-UT01* | *`validasiInputPenjualan()`* | *Normal* | *Dua produk dengan `idProduk` terisi; `jumlahTerjual` 10 dan 0; `jumlahTersisa` 2 dan 5* | *`validasiInputPenjualan()` mengembalikan `true`* | *Lulus, kedua produk valid dan fungsi mengembalikan `true`* | *Pass* |
| *C24-UT02* | *`validasiInputPenjualan()`* | *Batas* | *Nilai 0 dan 1000 pada kedua field; lalu 1001 pada `jumlahTerjual` dan `jumlahTersisa`* | *Nilai 0 dan 1000 diterima; nilai 1001 ditolak* | *Lulus, nilai 0 dan 1000 diterima; nilai 1001 ditolak* | *Pass* |
| *C24-UT03* | *`validasiInputPenjualan()`* | *Negatif* | *Array kosong; non-array; `idProduk` null/undefined; jumlah desimal, negatif, dan NaN* | *`validasiInputPenjualan()` mengembalikan `false` untuk seluruh input* | *Lulus, seluruh input tidak valid mengembalikan `false`* | *Pass* |
| *C24-UT04* | *`simpanDataPenjualan()`* | *Normal* | *Dua produk valid disimpan untuk tanggal hari ini* | *Dua baris tersimpan dengan jumlah terjual dan tersisa sesuai* | *Lulus, dua baris tersimpan dengan jumlah sesuai* | *Pass* |
| *C24-UT05* | *`simpanDataPenjualan()`* | *Batas* | *Simpan nilai 0/0 lalu 1000/1000 untuk produk yang sama* | *Nilai batas diterima; baris yang sama diperbarui tanpa duplikasi* | *Lulus, nilai batas tersimpan; baris yang sama diperbarui tanpa duplikasi* | *Pass* |
| *C24-UT06* | *`simpanDataPenjualan()`* | *Negatif* | *Array kosong; jumlah negatif; `idProduk` 999999* | *Galat validasi atau FOREIGN KEY; tidak ada baris baru* | *Lulus, galat validasi/FOREIGN KEY muncul dan tidak ada baris baru* | *Pass* |
| *C24-UT07* | *`tampilkanFormPenjualan()`, `tampilkanPenjualanTersimpan()`, `kirimDataPenjualan()`* | *Normal/Negatif* | *Render form dan halaman tersimpan; POST dengan satu field kosong; POST dua produk valid* | *Form menampilkan produk, nilai tersimpan, progres 1/7, dan persen 14; halaman tersimpan dirender; input tidak valid menghasilkan 400; input valid menyimpan dua baris, mencatat log, dan redirect ke `/fnb/penjualan/tersimpan`* | *Lulus, form menampilkan 2 produk dengan progres 1/7 dan persen 14; halaman tersimpan dirender; submit tidak valid 400; submit valid menyimpan 2 baris, log tercatat, dan redirect sesuai* | *Pass* |

Tabel 4.2.12b. Ringkasan Cakupan Kelas PenjualanController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`validasiInputPenjualan()`, `simpanDataPenjualan()`* |
| Operasi yang diuji | *`validasiInputPenjualan()`, `simpanDataPenjualan()`, `tampilkanFormPenjualan()`, `tampilkanPenjualanTersimpan()`, `kirimDataPenjualan()`* |
| ID Algoritma yang tercakup | *Algo-C24-01, Algo-C24-02* |
| Coverage (wajib ≥ 70%) | *100% baris / 97.83% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.13 Kelas PrediksiController

**ID Kelas:** *C25*  
**Nama Kelas:** *PrediksiController*  
**Tingkat:** *Mendalam*

Tabel 4.2.13. Hasil Pengujian Unit Kelas PrediksiController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C25-UT01* | *`cekKecukupanData()`* | *Normal* | *Dua produk masing-masing memiliki data pada tujuh tanggal unik dalam 7 hari terakhir* | *`cekKecukupanData()` mengembalikan `true`* | *Lulus, tujuh tanggal unik terdeteksi dan hasil `true`* | *Pass* |
| *C25-UT02* | *`cekKecukupanData()`* | *Batas* | *Enam tanggal unik dengan 7 baris; lalu tambah satu tanggal menjadi tujuh tanggal unik* | *Enam tanggal unik menghasilkan `false`; tujuh tanggal unik menghasilkan `true`* | *Lulus, 7 baris/6 tanggal menghasilkan `false`; 7 tanggal unik menghasilkan `true`* | *Pass* |
| *C25-UT03* | *`cekKecukupanData()`* | *Negatif* | *Tanpa data; hanya data lebih dari 7 hari lalu; `idPemilik` 999999* | *`cekKecukupanData()` mengembalikan `false` untuk seluruh input* | *Lulus, data kosong, data lama, dan id 999999 menghasilkan `false`* | *Pass* |
| *C25-UT04* | *`jalankanPrediksi()`* | *Normal* | *Tujuh hari data untuk dua produk; rata-rata terjual/tersisa 10/2 dan 4/3* | *Dua hasil prediksi tersimpan dan dikembalikan; rekomendasi 11 dan 6; tren 1 dan 2* | *Lulus, dua hasil tersimpan dengan rekomendasi 11 dan 6 serta tren 1 dan 2* | *Pass* |
| *C25-UT05* | *`jalankanPrediksi()`* | *Batas* | *Tepat tujuh hari dengan penjualan 0 dan tersisa 0; prediksi dijalankan dua kali* | *Rekomendasi 0; hasil tetap satu baris tanpa duplikasi* | *Lulus, rekomendasi 0; dijalankan dua kali tetap satu baris* | *Pass* |
| *C25-UT06* | *`jalankanPrediksi()`* | *Negatif* | *Enam tanggal unik; 7 baris tetapi 6 tanggal; `idPemilik` 999999* | *Galat `Data historis belum memenuhi syarat minimal 7 hari.`; tidak ada prediksi tersimpan* | *Lulus, galat sesuai dan tidak ada prediksi tersimpan* | *Pass* |
| *C25-UT07* | *`tampilkanDashboard()`* | *Normal/Negatif* | *Dashboard dengan tujuh hari data; dashboard dengan enam hari data* | *Dashboard penuh menampilkan hasil prediksi, progres 7/7, dan persen 100; dashboard kurang menampilkan `hasilPrediksi` kosong, pesan galat, progres 6/7, dan persen 86* | *Lulus, dashboard lengkap menampilkan hasil prediksi, progres 7/7, dan persen 100; dashboard kurang menampilkan hasil kosong, pesan galat, progres 6/7, dan persen 86* | *Pass* |

Tabel 4.2.13b. Ringkasan Cakupan Kelas PrediksiController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`cekKecukupanData()`, `jalankanPrediksi()`* |
| Operasi yang diuji | *`cekKecukupanData()`, `jalankanPrediksi()`, `tampilkanDashboard()`* |
| ID Algoritma yang tercakup | *Algo-C25-01, Algo-C25-02* |
| Coverage (wajib ≥ 70%) | *98.23% baris / 91.30% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.14 Kelas ProdukSurplusController

**ID Kelas:** *C26*  
**Nama Kelas:** *ProdukSurplusController*  
**Tingkat:** *Mendalam*

Tabel 4.2.14. Hasil Pengujian Unit Kelas ProdukSurplusController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C26-UT01* | *`validasiDataSurplus()`* | *Normal* | *Produk Makanan, jumlah 5, batas waktu 2099-01-01 12.00* | *Data diterima, surplus tersimpan, dan pengguna diarahkan ke halaman donasi* | *Lulus, surplus tersimpan, redirect ke `/surplus/{id}/donasi`, id produk dan jumlah sesuai* | *Pass* |
| *C26-UT02* | *`validasiDataSurplus()`* | *Batas* | *Produk Minuman, jumlah minimum 1, batas waktu 2099-01-01 12.00* | *Data diterima, surplus jumlah 1 tersimpan, dan log memakai satuan gelas* | *Lulus, jumlah 1 tersimpan dan log `(1 gelas)` tercatat* | *Pass* |
| *C26-UT03* | *`validasiDataSurplus()`* | *Negatif* | *Isian kosong; jumlah 0 dan 1,5; batas waktu lampau; format tanggal salah; produk 999999* | *Setiap masukan ditolak dengan status 400 dan pesan yang sesuai; tidak ada surplus baru* | *Lulus, 8 kasus ditolak 400 dan jumlah surplus tetap* | *Pass* |
| *C26-UT04* | *`simpanDataSurplus()`* | *Normal* | *Produk Makanan, jumlah 5, batas waktu valid* | *Surplus tersimpan dengan status `tersedia`, id pemilik benar, dan log porsi tercatat* | *Lulus, status `tersedia`, id pemilik benar, batas waktu dan log porsi sesuai* | *Pass* |
| *C26-UT05* | *`simpanDataSurplus()`* | *Batas* | *Jumlah 1 dan batas waktu di masa depan* | *Surplus jumlah 1 tersimpan dengan status `tersedia`* | *Lulus, jumlah 1 dan status `tersedia` sesuai* | *Pass* |
| *C26-UT06* | *`simpanDataSurplus()`* | *Negatif* | *Produk milik pemilik lain* | *Permintaan ditolak dengan status 400 dan pesan `Produk tidak ditemukan.`; tidak ada surplus baru* | *Lulus, 400 dengan pesan sesuai dan jumlah surplus tetap* | *Pass* |
| *C26-UT07* | *`tampilkanFormDistribusi()`* | *Normal* | *Surplus milik pemilik, jumlah 4, batas waktu valid* | *Halaman distribusi dirender dengan nama produk, jumlah, dan batas waktu terformat* | *Lulus, view `surplus/I09-AturDistribusi`, ringkasan nama, jumlah, dan batas waktu sesuai* | *Pass* |
| *C26-UT08* | *`tampilkanFormDistribusi()`* | *Batas* | *idSurplus 0; batas waktu kosong; batas waktu tidak valid* | *id 0 menghasilkan 404; batas kosong tampil `-`; batas tidak valid tampil apa adanya* | *Lulus, id 0 menghasilkan 404; batas kosong `-`; batas tidak valid tampil apa adanya* | *Pass* |
| *C26-UT09* | *`tampilkanFormDistribusi()`* | *Negatif* | *idSurplus 999999 dan surplus milik pemilik lain* | *Halaman 404 dengan pesan `Produk surplus tidak ditemukan.`* | *Lulus, kedua kasus menghasilkan 404 dan pesan sesuai* | *Pass* |
| *C26-UT10* | *`validasiMetodeDistribusi()`* | *Normal* | *Metode Donasi tanpa harga* | *Donasi diterima, metode tersimpan dengan harga 0, dan pengguna diarahkan ke halaman sukses* | *Lulus, Donasi harga 0 tersimpan dan redirect ke `/surplus/sukses`* | *Pass* |
| *C26-UT11* | *`validasiMetodeDistribusi()`* | *Batas* | *Jual Diskon dengan harga minimum 1* | *Jual Diskon diterima dan harga 1 tersimpan* | *Lulus, Jual Diskon dan harga 1 tersimpan* | *Pass* |
| *C26-UT12* | *`validasiMetodeDistribusi()`* | *Negatif* | *Diskon harga 0/kosong; surplus berstatus terklaim* | *Permintaan ditolak dengan status 400 dan pesan sesuai; tidak ada metode atau log baru* | *Lulus, seluruh kasus ditolak 400; metode dan log tidak bertambah* | *Pass* |
| *C26-UT13* | *`simpanMetodeDistribusi()`* | *Normal* | *Donasi pada surplus jumlah 4* | *Metode Donasi tersimpan, sesi sukses terisi, dan log distribusi tercatat* | *Lulus, Donasi tersimpan, sesi sukses terisi, dan log tercatat* | *Pass* |
| *C26-UT14* | *`simpanMetodeDistribusi()`* | *Batas* | *Jual Diskon dengan harga `Rp 8.000`* | *Harga diparsing menjadi 8000 dan tersimpan; log menampilkan `Rp 8.000`* | *Lulus, harga 8000 tersimpan dan log menampilkan `Rp 8.000`* | *Pass* |
| *C26-UT15* | *`simpanMetodeDistribusi()`* | *Negatif* | *idSurplus 999999 dan surplus milik pemilik lain* | *Permintaan ditolak dengan status 404; tidak ada metode baru dan log tidak bertambah* | *Lulus, kedua kasus 404; metode dan log tidak bertambah* | *Pass* |
| *C26-UT16* | *`tampilFormCatat()`, `simpanProdukBaru()`, `tampilEditProduk()`, `simpanEditProduk()`, `tampilSukses()`* | *Normal/Negatif* | *Form tanpa/edit produk; tambah produk valid dan kosong; edit produk valid dan kosong; halaman sukses tanpa/dengan sesi* | *Form dan produk edit dirender; produk valid bertambah/berubah beserta log; isian kosong tidak mengubah data; tanpa sesi dialihkan ke `/surplus/catat`; dengan sesi halaman sukses dirender dan sesi dihapus* | *Lulus, form/edit dirender; tambah/ubah produk dan log sesuai; input kosong tidak mengubah data; tanpa sesi redirect dan dengan sesi render serta sesi dihapus* | *Pass* |

Catatan: kelas *C26 ProdukSurplusController* pada DPPL diimplementasikan sebagai dua controller, yaitu *CatatSurplusController* dan *DistribusiSurplusController*.

Tabel 4.2.14b. Ringkasan Cakupan Kelas ProdukSurplusController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`validasiDataSurplus()`, `simpanDataSurplus()`, `tampilkanFormDistribusi()`, `validasiMetodeDistribusi()`, `simpanMetodeDistribusi()`* |
| Operasi yang diuji | *`validasiDataSurplus()` melalui `simpanDataSurplus()`, `simpanDataSurplus()`, `tampilkanFormDistribusi()` melalui `tampilFormDistribusi()`, `validasiMetodeDistribusi()` dan `simpanMetodeDistribusi()` melalui `simpanDistribusi()`, ditambah `tampilFormCatat()`, `simpanProdukBaru()`, `tampilEditProduk()`, `simpanEditProduk()`, `tampilSukses()`* |
| ID Algoritma yang tercakup | *Algo-C26-01 s.d. Algo-C26-05* |
| Coverage (wajib ≥ 70%) | *100% baris / 97.40% cabang gabungan; `CatatSurplusController.js` 100%/100%, `DistribusiSurplusController.js` 100%/95.24%, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.15 Kelas SurplusController

**ID Kelas:** *C27*  
**Nama Kelas:** *SurplusController*  
**Tingkat:** *Mendalam*

Tabel 4.2.15. Hasil Pengujian Unit Kelas SurplusController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C27-UT01* | *`ambilDaftarSurplus()`* | *Normal* | *Dua pemilik dengan jarak berbeda; satu surplus Donasi dan satu Jual Diskon; ditambah surplus lewat dan terklaim* | *Surplus tersedia yang belum lewat dikembalikan, diurutkan dari jarak terdekat, dan surplus lewat/terklaim tidak muncul* | *Lulus, surplus dekat dan jauh terurut, surplus lewat/terklaim tidak muncul, badge dan satuan sesuai* | *Pass* |
| *C27-UT02* | *`ambilDaftarSurplus()`* | *Batas* | *Pemilik tanpa alamat; produk kategori Lainnya tanpa metode; lokasi pengguna kosong* | *Produk tanpa alamat berjarak `null` dan berada di urutan terakhir; lokasi kosong membuat jarak tidak dihitung* | *Lulus, usaha tanpa alamat berjarak `null` dan terakhir; lokasi kosong membuat seluruh jarak `null`* | *Pass* |
| *C27-UT03* | *`ambilDaftarSurplus()`* | *Negatif* | *Hanya ada surplus lewat batas waktu dan surplus berstatus terklaim* | *Array kosong karena tidak ada surplus yang layak ditampilkan* | *Lulus, array kosong* | *Pass* |
| *C27-UT04* | *`ambilDetailSurplus()`* | *Normal* | *Surplus Jual Diskon Rp 12.000, jumlah 3, pemilik beralamat koordinat* | *Detail memuat nama produk, jumlah, badge harga, dan jarak dalam km* | *Lulus, detail memuat nama, jumlah 3 porsi, badge Rp 12.000, dan jarak km* | *Pass* |
| *C27-UT05* | *`ambilDetailSurplus()`* | *Batas* | *Batas waktu kosong; tanpa metode distribusi; pemilik tanpa alamat; surplus sudah lewat* | *Batas waktu tampil `-`, sisa waktu kosong, badge netral, jarak `null`, dan surplus lewat bertanda `sudah lewat`* | *Lulus, batas waktu kosong `-`, sisa waktu kosong, metode belum diatur, surplus lewat `sudah lewat`* | *Pass* |
| *C27-UT06* | *`ambilDetailSurplus()`* | *Negatif* | *idSurplus 0; idSurplus `abc`; idSurplus 999999* | *Id tidak valid ditolak dengan pesan `ID produk surplus tidak valid.`; id tidak ada menghasilkan `Produk surplus tidak ditemukan.`* | *Lulus, id 0 dan `abc` ditolak; id 999999 tidak ditemukan* | *Pass* |
| *C27-UT07* | *`urutkanBerdasarkanJarak()`* | *Normal* | *Tiga data dengan jarak 5, 1, dan 3* | *Urutan naik berdasarkan jarakProduk* | *Lulus, urutan `[2, 3, 1]`* | *Pass* |
| *C27-UT08* | *`urutkanBerdasarkanJarak()`* | *Batas* | *Data dengan jarak `null`, 2, 2, dan `null`* | *Jarak `null` ditempatkan terakhir; jarak sama diurutkan berdasarkan idSurplus* | *Lulus, urutan `[2, 3, 1, 4]`* | *Pass* |
| *C27-UT09* | *`urutkanBerdasarkanJarak()`* | *Negatif* | *Array kosong; array dengan jarak `null` dan 1* | *Array kosong menghasilkan array kosong; input asli tidak berubah* | *Lulus, array kosong dan input tidak berubah* | *Pass* |
| *C27-UT10* | *`tampilkanDaftarSurplus()`* | *Normal/Negatif* | *Filter kata kunci, jenis, jarak, dan waktu; pencarian tanpa hasil; filter tidak valid* | *Filter diterapkan, hasil kosong ditampilkan tanpa galat, dan nilai filter tidak valid diabaikan* | *Lulus, filter menghasilkan C27 Uji Roti; pencarian kosong 0; filter tidak valid diabaikan* | *Pass* |
| *C27-UT11* | *`tampilkanDetailSurplus()`* | *Normal/Negatif* | *Detail surplus valid; idSurplus 999999* | *Detail valid dirender dengan status 200; id tidak ada menghasilkan 404 dan `tidakDitemukan` bernilai `true`* | *Lulus, detail 200 dengan badge Rp 12.000; id 999999 404* | *Pass* |

Tabel 4.2.15b. Ringkasan Cakupan Kelas SurplusController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`ambilDaftarSurplus()`, `ambilDetailSurplus()`, `urutkanBerdasarkanJarak()`* |
| Operasi yang diuji | *Ketiga operasi public di atas, ditambah `tampilkanDaftarSurplus()` dan `tampilkanDetailSurplus()`* |
| ID Algoritma yang tercakup | *Algo-C27-01 s.d. Algo-C27-03* |
| Coverage (wajib ≥ 70%) | *97.53% baris / 89.34% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.16 Kelas KlaimController

**ID Kelas:** *C28*  
**Nama Kelas:** *KlaimController*  
**Tingkat:** *Mendalam*

Tabel 4.2.16. Hasil Pengujian Unit Kelas KlaimController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C28-UT01* | *`cekKetersediaan()`* | *Normal* | *Surplus berstatus `tersedia`* | *Mengembalikan `true`* | *Lulus, mengembalikan `true`* | *Pass* |
| *C28-UT02* | *`cekKetersediaan()`* | *Batas* | *Surplus berstatus `terklaim` dan `selesai`; ID 999999* | *Mengembalikan `false` untuk ketiganya* | *Lulus, ketiganya mengembalikan `false`* | *Pass* |
| *C28-UT03* | *`cekKetersediaan()`* | *Negatif* | *ID 0, -1, 1.5, dan `'abc'`* | *Galat `ID surplus tidak valid.`* | *Lulus, seluruh ID tidak valid ditolak* | *Pass* |
| *C28-UT04* | *`kunciProduk()`* | *Normal* | *Surplus berstatus `tersedia`* | *Mengembalikan `true`; status berubah menjadi `terklaim`* | *Lulus, `true` dan status `terklaim`* | *Pass* |
| *C28-UT05* | *`kunciProduk()`* | *Batas* | *Surplus berstatus `terklaim`* | *Galat `Produk surplus sudah tidak tersedia.`; status tetap `terklaim`* | *Lulus, galat sesuai dan status tetap `terklaim`* | *Pass* |
| *C28-UT06* | *`kunciProduk()`* | *Negatif* | *ID 0 dan ID 999999* | *ID 0 ditolak `ID surplus tidak valid.`; ID 999999 ditolak `Produk surplus sudah tidak tersedia.`* | *Lulus, kedua kasus ditolak dengan pesan sesuai* | *Pass* |
| *C28-UT07* | *`setujuiKlaim()`* | *Normal* | *Surplus Minuman jumlah 3; NGO valid* | *Klaim tersimpan; surplus `terklaim`; log `Mengklaim ... (3 gelas)`* | *Lulus, idKlaim > 0, status `terklaim`, detail klaim sesuai, dan 1 log `3 gelas`* | *Pass* |
| *C28-UT08* | *`setujuiKlaim()`* | *Batas* | *Klaim kedua pada surplus yang sama* | *Galat status `terklaim`; jumlah klaim, status, dan log tidak bertambah* | *Lulus, galat sesuai; 1 klaim, status `terklaim`, dan 1 log* | *Pass* |
| *C28-UT09* | *`setujuiKlaim()`* | *Negatif* | *ID surplus 0; ID NGO 0; surplus 999999; ID NGO 999999* | *Galat validasi/`Produk surplus tidak ditemukan.`/FOREIGN KEY; transaksi rollback* | *Lulus, status tetap `tersedia`, 0 klaim, dan 0 log* | *Pass* |
| *C28-UT10* | *`tolakKlaim()`* | *Normal* | *Surplus berstatus `terklaim`* | *Pesan `Klaim tidak dapat diproses karena produk surplus berstatus "terklaim".`* | *Lulus, pesan sesuai* | *Pass* |
| *C28-UT11* | *`tolakKlaim()`* | *Batas* | *Surplus berstatus `selesai`; ID 999999* | *Pesan status `selesai`; ID 999999 menghasilkan `Produk surplus tidak ditemukan.`* | *Lulus, kedua pesan sesuai* | *Pass* |
| *C28-UT12* | *`tolakKlaim()`* | *Negatif* | *ID 0 dan `'abc'`* | *Galat `ID surplus tidak valid.`* | *Lulus, keduanya ditolak* | *Pass* |
| *C28-UT13* | *`ambilDetailPengambilan()`* | *Normal* | *Klaim pada surplus Minuman jumlah 3; data pemilik dan NGO lengkap* | *Objek detail klaim, surplus, usaha, dan NGO* | *Lulus, seluruh field detail, jumlah 3, nama/alamat usaha, dan data NGO sesuai* | *Pass* |
| *C28-UT14* | *`ambilDetailPengambilan()`* | *Batas* | *ID klaim 999999* | *Galat `Dokumen klaim tidak ditemukan.`* | *Lulus, galat sesuai* | *Pass* |
| *C28-UT15* | *`ambilDetailPengambilan()`* | *Negatif* | *ID klaim 0, -1, 1.5, dan `'abc'`* | *Galat `ID klaim tidak valid.`* | *Lulus, seluruh ID tidak valid ditolak* | *Pass* |
| *C28-UT16* | *`konfirmasiPengambilan()`* | *Normal* | *Klaim pada surplus Makanan jumlah 4* | *Status surplus `selesai`; pesan keberhasilan; log `Mengonfirmasi pengambilan klaim ... (4 porsi)`* | *Lulus, status `selesai`, pesan sesuai, dan 1 log `4 porsi`* | *Pass* |
| *C28-UT17* | *`konfirmasiPengambilan()`* | *Batas* | *Konfirmasi kedua pada klaim yang sama; surplus Minuman jumlah 2* | *Galat `Pengambilan produk surplus sudah dikonfirmasi.`; status tetap `selesai`; log tidak bertambah* | *Lulus, galat sesuai, status `selesai`, dan 1 log `2 gelas`* | *Pass* |
| *C28-UT18* | *`konfirmasiPengambilan()`* | *Negatif* | *ID klaim 0 dan 999999* | *ID 0 ditolak `ID klaim tidak valid.`; ID 999999 menghasilkan `Dokumen klaim tidak ditemukan.`* | *Lulus, kedua kasus ditolak dengan pesan sesuai* | *Pass* |

Tabel 4.2.16b. Ringkasan Cakupan Kelas KlaimController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`cekKetersediaan()`, `kunciProduk()`, `setujuiKlaim()`, `tolakKlaim()`, `ambilDetailPengambilan()`, `konfirmasiPengambilan()`* |
| Operasi yang diuji | *Keenam operasi public di atas* |
| ID Algoritma yang tercakup | *Algo-C28-01 s.d. Algo-C28-06* |
| Coverage (wajib ≥ 70%) | *95.54% baris / 86.49% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.17 Kelas LogController

**ID Kelas:** *C29*  
**Nama Kelas:** *LogController*  
**Tingkat:** *Sedang*

Tabel 4.2.17. Hasil Pengujian Unit Kelas LogController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C29-UT01* | *`tampilkanLog()`* | *Normal* | *Tiga log dengan waktu 10.00, 09.00, dan 08.00* | *Status 200; seluruh log terurut terbaru; `waktuTampil` berformat `HH.MM`; empat pilihan filter; `filterAktif` `Semua`; `adaLogKeseluruhan` bernilai `true`* | *Lulus, 3 log terurut, format waktu sesuai, pilihan filter lengkap, dan `adaLogKeseluruhan` `true`* | *Pass* |
| *C29-UT02* | *`tampilkanLog()`* | *Batas* | *Basis data log kosong* | *Status 200; `daftar` berupa array kosong; `adaLogKeseluruhan` bernilai `false`* | *Lulus, daftar kosong dan `adaLogKeseluruhan` `false`* | *Pass* |
| *C29-UT03* | *`tampilkanLog()`* | *Negatif* | *Log dengan nilai `waktu` `'tanpa-jam'`* | *Halaman tetap dirender tanpa galat; `waktuTampil` menjadi `'-'`* | *Lulus, baris tetap tampil dengan `waktuTampil` `'-'`* | *Pass* |
| *C29-UT04* | *`saringLog()`* | *Normal* | *Kategori `Klaim`* | *Status 200; hanya log yang memuat kata `Klaim`; `filterAktif` `Klaim`; `adaLogKeseluruhan` bernilai `true`* | *Lulus, 1 log Klaim, filter aktif sesuai, dan format waktu `10.00`* | *Pass* |
| *C29-UT05* | *`saringLog()`* | *Batas* | *Kategori `'  kLaIm  '`, `Semua`, dan `Verifikasi` tanpa hasil* | *Trim dan case-insensitive untuk `Klaim`; `Semua` mengembalikan seluruh log; `Verifikasi` menghasilkan daftar kosong dengan `adaLogKeseluruhan` `true`* | *Lulus, ketiga skenario menghasilkan daftar dan filter aktif yang sesuai* | *Pass* |
| *C29-UT06* | *`saringLog()`* | *Negatif* | *Kategori `Akun`; kategori berupa array `['Klaim']`* | *Status 400; pesan `Kriteria penyaringan tidak valid.`; seluruh log tetap dikirim; `filterAktif` `Semua`* | *Lulus, kedua masukan ditolak 400 dengan pesan dan data log yang sesuai* | *Pass* |

### 4.2.18 Kelas AdminSistem

**ID Kelas:** *C32*  
**Nama Kelas:** *AdminSistem*  
**Tingkat:** *Mendalam*

Tabel 4.2.18. Hasil Pengujian Unit Kelas AdminSistem

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C32-UT01* | *`butuhPeran()`* | *Normal* | *Peran `admin_sistem` pada guard route admin* | *`next()` dipanggil; tidak ada redirect atau status 403* | *Lulus, request dilanjutkan tanpa respons penolakan* | *Pass* |
| *C32-UT02* | *`butuhPeran()`* | *Batas* | *Daftar peran `pemilik_fnb` dan `perwakilan_ngo`; pengguna berperan `perwakilan_ngo`* | *`next()` dipanggil karena peran pengguna termasuk daftar yang diizinkan* | *Lulus, request dilanjutkan* | *Pass* |
| *C32-UT03* | *`butuhPeran()`* | *Negatif* | *Pengguna belum masuk; pengguna `pemilik_fnb` mengakses guard `admin_sistem`* | *Pengguna belum masuk dialihkan ke `/masuk`; peran salah mendapat status 403 dengan pesan `Halaman ini tidak tersedia untuk peran Anda.`; `next()` tidak dipanggil* | *Lulus, redirect dan 403 sesuai, serta request tidak dilanjutkan* | *Pass* |
| *C32-UT04* | *`butuhDiverifikasi()`* | *Normal* | *Akun pemilik dengan pendaftaran berstatus `diterima`; akun `admin_sistem` tanpa pendaftaran* | *Keduanya boleh melanjutkan karena sudah diterima atau dikecualikan sebagai admin* | *Lulus, akun diterima dan admin sama-sama dilanjutkan* | *Pass* |
| *C32-UT05* | *`butuhDiverifikasi()`* | *Batas* | *Pendaftaran berstatus `menunggu verifikasi`, pendaftaran `ditolak`, dan akun tanpa pendaftaran* | *Ketiganya dialihkan ke `/status`; `next()` tidak dipanggil* | *Lulus, ketiga skenario dialihkan ke `/status`* | *Pass* |
| *C32-UT06* | *`butuhDiverifikasi()`* | *Negatif* | *Pengguna belum masuk* | *Dialihkan ke `/masuk`; `next()` tidak dipanggil* | *Lulus, redirect `/masuk` dan request tidak dilanjutkan* | *Pass* |

Catatan: implementasi C32 tidak berupa kelas AdminSistem eksplisit. Kewenangan admin diwujudkan oleh butuhPeran('admin_sistem') pada routes/admin.js dan routes/log.js, sedangkan status verifikasi akun oleh butuhDiverifikasi() pada route F&B/NGO.

Tabel 4.2.18b. Ringkasan Cakupan Kelas AdminSistem

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`verifikasiPendaftaran()`* |
| Operasi yang diuji | *`butuhPeran()` dan `butuhDiverifikasi()` sebagai guard implementasi C32; operasi `verifikasiPendaftaran()` didelegasikan ke C04 dan diuji melalui integrasi* |
| ID Algoritma yang tercakup | *Algo-C32-01 bagian pemeriksaan kewenangan admin* |
| Coverage (wajib ≥ 70%) | *100% baris / 100% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.19 Kelas GeolocationAdapter

**ID Kelas:** *C33*  
**Nama Kelas:** *GeolocationAdapter*  
**Tingkat:** *Mendalam*

Tabel 4.2.19. Hasil Pengujian Unit Kelas GeolocationAdapter

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C33-UT01* | *`hitungJarak()`* | *Normal* | *Koordinat `0,0` dan `0,1`* | *Jarak dihitung memakai formula Haversine dan dibulatkan dua desimal* | *Lulus, jarak `111.19` km* | *Pass* |
| *C33-UT02* | *`hitungJarak()`* | *Batas* | *Koordinat dengan spasi; koordinat batas `-90,-180` dan `90,180`* | *Spasi diabaikan; koordinat batas diterima; jarak dihitung dengan benar* | *Lulus, jarak koordinat sama `0` km dan jarak antipodal `20015.09` km* | *Pass* |
| *C33-UT03* | *`hitungJarak()`* | *Negatif* | *Lokasi pengguna kosong; lokasi pemilik kosong; geocoding alamat gagal* | *Galat `Lokasi harus diisi.` untuk lokasi kosong; galat `Lokasi tidak ditemukan: ...` saat geocoding gagal* | *Lulus, seluruh kasus ditolak dengan pesan yang sesuai* | *Pass* |
| *C33-UT04* | *`ambilKoordinat()`* | *Normal* | *String koordinat `' -6.9175, 107.6191 '`* | *Koordinat langsung diparse tanpa memanggil layanan geocoding* | *Lulus, menghasilkan `{ lat: -6.9175, lng: 107.6191 }`* | *Pass* |
| *C33-UT05* | *`ambilKoordinat()`* | *Batas* | *Alamat teks yang sama dipanggil dua kali dengan perbedaan huruf besar/kecil* | *Panggilan pertama memakai geocoding; panggilan kedua memakai cache; `fetch` hanya dipanggil sekali* | *Lulus, hasil kedua sama dan jumlah panggilan `fetch` tetap 1* | *Pass* |
| *C33-UT06* | *`ambilKoordinat()`* | *Negatif* | *Input `null` dan kosong; respons HTTP gagal; hasil kosong; `lat`/`lon` tidak numerik; koordinat di luar batas; `AbortError`; galat jaringan* | *Galat `Lokasi harus diisi.` atau `Lokasi tidak ditemukan: ...` sesuai kasus; galat jaringan diteruskan* | *Lulus, seluruh respons tidak valid ditolak dengan pesan yang sesuai* | *Pass* |

Tabel 4.2.19b. Ringkasan Cakupan Kelas GeolocationAdapter

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`hitungJarak()`, `ambilKoordinat()`* |
| Operasi yang diuji | *Kedua operasi public di atas* |
| ID Algoritma yang tercakup | *Algo-C33-01, Algo-C33-02* |
| Coverage (wajib ≥ 70%) | *100% baris / 94.44% cabang, `node --test --experimental-test-coverage`, bukti pada 4.6* |

### 4.2.20 Kelas PenyaringanController

**ID Kelas:** *C34*  
**Nama Kelas:** *PenyaringanController*  
**Tingkat:** *Mendalam*

Tabel 4.2.20. Hasil Pengujian Unit Kelas PenyaringanController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C34-UT01* | *`saringProdukSurplus()`* | *Normal* | *Kata kunci `c34 NASI` dengan spasi, jenis `Makanan`, jarak maksimum 2 km, dan waktu `hari-ini`; tersedia produk dekat Makanan, dekat Minuman, serta jauh Makanan besok* | *Seluruh kriteria digabung dengan operator AND; hanya produk dekat berkategori Makanan yang tampil* | *Lulus, hanya `C34 Nasi Rendang` yang tampil; `totalTersedia` 3, `totalDitampilkan` 1, dan `adaFilter` `true`* | *Pass* |
| *C34-UT02* | *`saringProdukSurplus()`* | *Batas* | *Tanpa filter; kata kunci berisi spasi; jarak maksimum 10 km dengan waktu `besok`* | *Tanpa filter seluruh produk tampil; kata kunci spasi dianggap kosong; batas jarak 10 km dan waktu besok hanya menampilkan produk besok* | *Lulus, 2 produk tampil tanpa filter; kata kunci spasi menghasilkan 2 produk; filter 10 km dan besok hanya menghasilkan `C34 Besok`* | *Pass* |
| *C34-UT03* | *`saringProdukSurplus()`* | *Negatif* | *Jenis `Lainnya`, jarak `3`, dan waktu `kemarin`; kemudian kata kunci `zzz-tidak-ada`* | *Kriteria tidak valid diabaikan sehingga produk valid tetap tampil; pencarian tanpa hasil mengembalikan daftar kosong tanpa galat* | *Lulus, kriteria tidak valid diabaikan dan `C34 Produk Valid` tampil; pencarian `zzz-tidak-ada` menghasilkan 0 hasil dengan `galat` `null`* | *Pass* |
| *C34-UT04* | *`cariProdukSurplus()`* | *Normal* | *Kata kunci `ayam GEPREK` pada produk `C34 Ayam Geprek` dan `C34 Kopi Susu`* | *Pencarian nama produk tidak membedakan huruf besar/kecil dan hanya mengembalikan produk yang cocok* | *Lulus, hanya `C34 Ayam Geprek` tampil; `totalTersedia` 2 dan `totalDitampilkan` 1* | *Pass* |
| *C34-UT05* | *`cariProdukSurplus()`* | *Batas* | *Kata kunci kosong, kata kunci berisi spasi saja, dan kata kunci `  ayam  `* | *Kata kunci kosong atau spasi mengembalikan seluruh daftar; spasi di awal dan akhir kata kunci diabaikan* | *Lulus, kata kunci kosong dan spasi menghasilkan 2 produk; kata kunci `  ayam  ` hanya menghasilkan `C34 Ayam Geprek`* | *Pass* |
| *C34-UT06* | *`cariProdukSurplus()`* | *Negatif* | *Kata kunci `tidak-ada-produk-ini`* | *Tidak ada produk yang cocok sehingga daftar hasil kosong dan halaman tetap dirender tanpa galat* | *Lulus, `totalTersedia` 1, `totalDitampilkan` 0, daftar kosong, dan `galat` `null`* | *Pass* |

Catatan: kelas *C34 PenyaringanController* diimplementasikan sebagai helper privat di `SurplusController.js`, sehingga pengujian dijalankan melalui `tampilkanDaftarSurplus()`. Nilai kriteria yang tidak termasuk pilihan valid dinormalkan atau diabaikan, bukan dilempar sebagai galat.

Tabel 4.2.20b. Ringkasan Cakupan Kelas PenyaringanController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *`saringProdukSurplus()`, `cariProdukSurplus()`* |
| Operasi yang diuji | *Kedua operasi public di atas melalui `tampilkanDaftarSurplus()`, mencakup pencarian kata kunci, penyaringan jenis, jarak, waktu, serta penanganan kriteria tidak valid* |
| ID Algoritma yang tercakup | *Algo-C34-01 s.d. Algo-C34-06* |
| Coverage (wajib ≥ 70%) | *97.53% baris / 90.32% cabang gabungan dengan C27 pada `SurplusController.js`; `node --test --experimental-test-coverage --test-coverage-include="**/controllers/SurplusController.js" tests/SurplusController.test.js tests/PenyaringanController.test.js`, bukti pada 4.6* |

<br>

## 4.3 Pengujian Integrasi

Pengujian integrasi memakai komponen nyata: server Express dijalankan sebagai proses terpisah dengan basis data SQLite sementara, lalu skenario dieksekusi lewat HTTP (`fetch`, cookie jar, `redirect: 'manual'`). Model dan skema tidak dipalsukan. Uji integrasi peta memanggil Nominatim sungguhan.

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| *I-01* | *PendaftaranView (C12)* | *AuthController (C23)* | *View - Controller* | *INT-TC01* |
| *I-02* | *VerifikasiView (C13)* | *VerifikasiController (C04)* | *View - Controller* | *INT-TC02* |
| *I-03* | *PenjualanPrediksiView (C15/C16)* | *PenjualanController (C24)* | *View - Controller* | *INT-TC03* |
| *I-04* | *PenjualanPrediksiView (C16)* | *PrediksiController (C25)* | *View - Controller* | *INT-TC04* |
| *I-05* | *SurplusPemilikView (C17)* | *ProdukSurplusController (C26)* | *View - Controller* | *INT-TC05* |
| *I-06* | *SurplusPemilikView (C18)* | *ProdukSurplusController (C26)* | *View - Controller* | *INT-TC06* |
| *I-07* | *SurplusNGOView (C19)* | *SurplusController (C27)* | *View - Controller* | *INT-TC07* |
| *I-08* | *SurplusNGOView (C19)* | *SurplusController/Penyaringan (C34)* | *View - Controller* | *INT-TC08* |
| *I-09* | *SurplusNGOView (C20)* | *KlaimController (C28)* | *View - Controller* | *INT-TC09* |
| *I-10* | *PengambilanView (C21)* | *KlaimController (C28)* | *View - Controller* | *INT-TC10* |
| *I-11* | *LogView (C22)* | *LogController (C29)* | *View - Controller* | *INT-TC11* |
| *I-12* | *AuthController (C23)* | *AkunModel (C01, C30, C31)* | *Controller - Model* | *INT-TC12* |
| *I-13* | *AuthController (C23)* | *PendaftaranModel (C02, C03)* | *Controller - Model* | *INT-TC13* |
| *I-14* | *VerifikasiController (C04)* | *PendaftaranModel (C02, C03)* | *Controller - Model* | *INT-TC14* |
| *I-15* | *PenjualanController (C24)* | *PenjualanModel (C05, C06)* | *Controller - Model* | *INT-TC15* |
| *I-16* | *PrediksiController (C25)* | *PenjualanModel/PrediksiModel (C06, C07)* | *Controller - Model* | *INT-TC16* |
| *I-17* | *ProdukSurplusController (C26)* | *SurplusModel (C08, C09)* | *Controller - Model* | *INT-TC17* |
| *I-18* | *SurplusController (C27)* | *SurplusModel + GeolocationAdapter (C08, C33)* | *Controller - Model - Eksternal* | *INT-TC18* |
| *I-19* | *KlaimController (C28)* | *SurplusModel + KlaimModel (C08, C10)* | *Controller - Model* | *INT-TC19* |
| *I-20* | *LogController (C29)* | *LogModel (C11)* | *Controller - Model* | *INT-TC20* |
| *I-21* | *Seluruh Model* | *Database (SQLite)* | *Aplikasi - Basis data* | *INT-TC21* |
| *I-22* | *Middleware pengguna/peran (C32)* | *Route aplikasi* | *Middleware - Route* | *INT-TC22* |
| *I-23* | *GeolocationAdapter (C33)* | *Nominatim (sistem eksternal)* | *Aplikasi - Sistem eksternal* | *INT-TC23* |
| *I-24* | *Aplikasi (server Express)* | *Klien HTTP/peramban* | *Aplikasi - Antarmuka jaringan* | *INT-TC24* |
| *I-25* | *Penyimpanan dokumen (C03)* | *Sistem berkas* | *Aplikasi - Sistem berkas* | *INT-TC25* |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *INT-TC01* | *I-01* | *Normal dan negatif unggah* | *POST multipart `/daftar` pemilik; field kosong; `.docx`; email duplikat* | *302 berhasil; 400 dengan pesan per kasus* | *Sesuai (UC01-TC01 s.d. TC04)* | *Pass* |
| *INT-TC02* | *I-02* | *Normal dan negatif keputusan* | *Admin membuka daftar/detail lalu menyetujui atau menolak* | *Status berubah; halaman hasil tampil* | *Sesuai (UC02-TC01 s.d. TC03)* | *Pass* |
| *INT-TC03* | *I-03* | *Normal dan negatif simpan penjualan* | *POST form penjualan dengan angka valid, negatif, nol* | *Tersimpan; tolak negatif; terima nol* | *Sesuai (UC04-TC01 s.d. TC03)* | *Pass* |
| *INT-TC04* | *I-04* | *Batas data historis* | *Dashboard 7 hari vs 2 hari* | *Rekomendasi tampil vs pesan terkunci* | *Sesuai (UC05-TC01/02)* | *Pass* |
| *INT-TC05* | *I-05* | *Normal dan negatif surplus* | *POST surplus valid; jumlah 0; batas lampau; field kosong* | *Tersimpan + redirect; tiga penolakan* | *Sesuai (UC06-TC01 s.d. TC03)* | *Pass* |
| *INT-TC06* | *I-06* | *Normal dan negatif distribusi* | *POST diskon 15.000; donasi; harga 0* | *Harga tersimpan; donasi tanpa harga; penolakan* | *Sesuai (UC07-TC01 s.d. TC03)* | *Pass* |
| *INT-TC07* | *I-07* | *Normal dan alternatif lokasi* | *NGO buka daftar; NGO tanpa lokasi* | *Urut jarak; permintaan isi lokasi* | *Sesuai (UC08-TC01/02)* | *Pass* |
| *INT-TC08* | *I-08* | *Penyaringan* | *Kata kunci + jenis; kriteria tanpa hasil* | *Daftar tersaring; pesan kosong* | *Sesuai (UC09-TC01/02)* | *Pass* |
| *INT-TC09* | *I-09* | *Normal dan alternatif klaim* | *Dua NGO POST klaim produk yang sama* | *NGO pertama 302; kedua 409* | *Sesuai (UC10-TC01/02)* | *Pass* |
| *INT-TC10* | *I-10* | *Normal dan batas konfirmasi* | *Konfirmasi pertama; ganda; akses NGO lain* | *Selesai; ditolak; 403* | *Sesuai (UC11-TC01/02)* | *Pass* |
| *INT-TC11* | *I-11* | *Normal dan negatif filter* | *Admin membuka log; filter valid/tidak valid* | *Daftar; 400 pada filter asing* | *Sesuai (UC12-TC01/02)* | *Pass* |
| *INT-TC12* | *I-12* | *Registrasi dan login* | *`registrasiAkun()` lewat HTTP; login dengan hash* | *Akun+profil tersimpan; sesi terisi* | *Sesuai (kontroler.test.js, UC01/UC02)* | *Pass* |
| *INT-TC13* | *I-13* | *Pendaftaran + dokumen* | *Registrasi F&B/NGO; periksa tabel pendaftaran dan berkas* | *Satu baris; berkas di STORAGE_DIR* | *Sesuai (registrasi.test.js)* | *Pass* |
| *INT-TC14* | *I-14* | *Keputusan verifikasi* | *`prosesVerifikasi()` lalu baca DB* | *Status sesuai keputusan* | *Sesuai (verifikasi.test.js)* | *Pass* |
| *INT-TC15* | *I-15* | *Simpan penjualan* | *Panggil controller lalu baca `data_penjualan`* | *Nilai dan tanggal sesuai* | *Sesuai (kontroler.test.js)* | *Pass* |
| *INT-TC16* | *I-16* | *Prediksi* | *Controller menghitung lalu menulis `prediksi_produksi`* | *Rekomendasi benar per produk besok* | *Sesuai (prediksi.test.js)* | *Pass* |
| *INT-TC17* | *I-17* | *Surplus + distribusi* | *Simpan surplus lalu metode; baca ulang* | *Kedua tabel konsisten* | *Sesuai (kontroler.test.js)* | *Pass* |
| *INT-TC18* | *I-18* | *Daftar + geolokasi* | *Daftar surplus dua pemilik, satu tanpa koordinat* | *Urutan jarak; yang tak terhitung di akhir* | *Sesuai (informasiSurplus.test.js)* | *Pass* |
| *INT-TC19* | *I-19* | *Klaim atomik* | *Dua transaksi klaim pada produk yang sama* | *Satu dokumen klaim; status terklaim* | *Sesuai (UC10-TC02, KNF04)* | *Pass* |
| *INT-TC20* | *I-20* | *Log* | *Tujuh aksi UC menulis log; query filter* | *Log tercatat dan terfilter* | *Sesuai (integrasi-log.test.js, log.test.js)* | *Pass* |
| *INT-TC21* | *I-21* | *Persistensi* | *Tulis lewat model, baca dengan koneksi baru* | *Data bertahan; foreign key aktif* | *Data terbaca kembali; `PRAGMA foreign_keys = ON` dan `journal_mode = WAL` terpasang di `config/db.js`* | *Pass* |
| *INT-TC22* | *I-22* | *Guard peran* | *Akses route terproteksi tanpa sesi/salah peran* | *Redirect/403* | *Sesuai (akses.test.js)* | *Pass* |
| *INT-TC23* | *I-23* | *Nominatim nyata* | *`ambilKoordinat('Jl. Dago No. 10, Bandung')`; panggilan kedua; Haversine* | *Koordinat didapat; panggilan kedua 0 ms (cache); jarak 4,34 km* | *Sesuai (`geolokasi.json`: 140 ms panggilan pertama, 0 ms cache, 4,34 km)* | *Pass* |
| *INT-TC24* | *I-24* | *HTTP* | *32 skenario fetch ke server proses anak* | *Status 200/302/400/403/404/409 sesuai skenario* | *Sesuai (rute-terpadu.test.js, 32/32 pass)* | *Pass* |
| *INT-TC25* | *I-25* | *Berkas 5 MB* | *Unggah PDF 5 MB; PDF +1 KB; DOCX* | *Diterima; 400 pesan 5 MB; 400 format* | *Sesuai (`kinerja.json`)* | *Pass* |

<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

### 4.4.1 Use Case Melakukan Registrasi Akun

**ID Use Case:** *UC01*  
**Nama Use Case:** *Melakukan Registrasi Akun*

Tabel 4.4.1. Hasil Pengujian Use Case UC01

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC01-TC01* | *KF01* | *Normal* | *1. Buka halaman registrasi. (Daftar sekarang)<br>2. Pilih tipe akun Pemilik F&B atau Perwakilan NGO.<br>3. Isi seluruh kolom wajib dan unggah dokumen pendukung.<br>4. Klik tombol "Daftar".* | *Data akun yang valid dan dokumen pendukung yang sesuai.* | *Sistem menyimpan akun, profil, pendaftaran, dan dokumen, lalu menampilkan status pendaftaran "menunggu verifikasi".* | *Sesuai. Data pendaftaran tersimpan dan status berubah menjadi "menunggu verifikasi".* | *Pass* |
| *UC01-TC02* | *KF01* | *Alternatif 1: Data Tidak Lengkap* | *1. Buka halaman registrasi. (Daftar sekarang)<br>2. Kosongkan salah satu kolom wajib.<br>3. Isi data lain dengan valid.<br>4. Klik tombol "Daftar".* | *Data wajib tidak lengkap.* | *Sistem membatalkan pendaftaran dan menampilkan pesan error pada kolom terkait.* | *Sesuai. Formulir ditampilkan ulang dengan pesan error dan tidak ada akun baru yang tersimpan.* | *Pass* |
| *UC01-TC03* | *KF01* | *Alternatif 1: Dokumen Tidak Valid* | *1. Buka halaman registrasi. (Daftar sekarang)<br>2. Isi seluruh kolom wajib.<br>3. Unggah dokumen dengan format atau ukuran yang tidak valid.<br>4. Klik tombol "Daftar".* | *Dokumen tidak sesuai format atau melebihi 5 MB.* | *Sistem membatalkan pendaftaran dan menampilkan pesan error dokumen.* | *Sesuai. Dokumen ditolak dan tidak ada akun baru yang tersimpan.* | *Pass* |

### 4.4.2 Use Case Memverifikasi Pendaftaran Akun

**ID Use Case:** *UC02*  
**Nama Use Case:** *Memverifikasi Pendaftaran Akun*

Tabel 4.4.2. Hasil Pengujian Use Case UC02

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC02-TC01* | *KF02, KF03* | *Normal* | *1. Masuk sebagai Admin Sistem.<br>2. Buka halaman verifikasi pendaftaran.<br>3. Pilih salah satu pendaftar.<br>4. Periksa data dan dokumen pendukung.<br>5. Klik tombol "Setujui".* | *Pendaftar berstatus "menunggu verifikasi" beserta dokumen pendukung.* | *Sistem menampilkan detail pendaftar, mengubah status menjadi "diterima", dan menampilkan halaman hasil verifikasi.* | *Sesuai. Status pendaftaran berubah menjadi "diterima", pendaftar hilang dari daftar menunggu, dan aktivitas verifikasi tercatat.* | *Pass* |
| *UC02-TC02* | *KF02, KF03* | *Alternatif 1: Pendaftaran Ditolak* | *1. Masuk sebagai Admin Sistem.<br>2. Buka halaman verifikasi pendaftaran.<br>3. Pilih salah satu pendaftar.<br>4. Periksa data dan dokumen pendukung.<br>5. Klik tombol "Tolak".* | *Pendaftar dengan dokumen yang tidak valid atau tidak relevan.* | *Sistem mengubah status pendaftaran menjadi "ditolak" dan menampilkan halaman hasil verifikasi.* | *Sesuai. Status pendaftaran berubah menjadi "ditolak", pendaftar hilang dari daftar menunggu, dan aktivitas verifikasi tercatat.* | *Pass* |

### 4.4.3 Use Case Menampilkan Status Pendaftaran

**ID Use Case:** *UC03*  
**Nama Use Case:** *Menampilkan Status Pendaftaran*

Tabel 4.4.3. Hasil Pengujian Use Case UC03

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC03-TC01* | *KF04* | *Normal* | *1. Masuk sebagai Pemilik F&B atau Perwakilan NGO.<br>2. Buka halaman status pendaftaran.<br>3. Lihat hasil verifikasi.* | *Akun dengan status pendaftaran "diterima".* | *Sistem menampilkan status pendaftaran "Diterima" beserta informasi bahwa akun telah diverifikasi.* | *Sesuai. Halaman status menampilkan badge "Diterima" dan tombol menuju halaman utama sesuai peran pengguna.* | *Pass* |
| *UC03-TC02* | *KF04* | *Alternatif 1: Status Pendaftaran Ditolak* | *1. Masuk sebagai Pemilik F&B atau Perwakilan NGO.<br>2. Buka halaman status pendaftaran.<br>3. Lihat hasil verifikasi.* | *Akun dengan status pendaftaran "ditolak".* | *Sistem menampilkan status pendaftaran "Ditolak" dan menyarankan pendaftar memperbaiki dokumen lalu mendaftar ulang.* | *Sesuai. Halaman status menampilkan badge "Ditolak" beserta pesan untuk memperbaiki dokumen dan melakukan pendaftaran ulang.* | *Pass* |

### 4.4.4 Use Case Mencatat Data Penjualan Harian

**ID Use Case:** *UC04*  
**Nama Use Case:** *Mencatat Data Penjualan Harian*

Tabel 4.4.4. Hasil Pengujian Use Case UC04

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC04-TC01* | *KF05* | *Normal* | *1. Masuk sebagai Pemilik F&B.<br>2. Buka menu Penjualan Harian.<br>3. Isi jumlah terjual dan tersisa untuk minimal satu produk.<br>4. Klik tombol simpan.* | *Jumlah terjual dan tersisa berupa bilangan bulat yang valid.* | *Sistem memvalidasi input, menyimpan data per produk dan tanggal, lalu menampilkan halaman penjualan tersimpan.* | *Sesuai. Data tersimpan, pengguna diarahkan ke halaman penjualan tersimpan, dan aktivitas pencatatan masuk ke log.* | *Pass* |
| *UC04-TC02* | *KF05* | *Alternatif 1: Format Isian Tidak Valid* | *1. Buka menu Penjualan Harian.<br>2. Isi jumlah terjual dengan nilai negatif.<br>3. Klik tombol simpan.* | *Jumlah terjual negatif, misalnya -5.* | *Sistem membatalkan penyimpanan dan menampilkan pesan error bahwa jumlah harus berupa bilangan bulat nol atau positif.* | *Sesuai. Formulir ditampilkan kembali dengan pesan validasi dan data tidak tersimpan.* | *Pass* |

### 4.4.5 Use Case Melihat Hasil Prediksi Produksi

**ID Use Case:** *UC05*  
**Nama Use Case:** *Melihat Hasil Prediksi Produksi*

Tabel 4.4.5. Hasil Pengujian Use Case UC05

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC05-TC01* | *KF06, KF07* | *Normal* | *1. Masuk sebagai Pemilik F&B.<br>2. Buka dashboard.<br>3. Tunggu sistem memuat hasil prediksi.<br>4. Lihat rekomendasi produksi.* | *Data penjualan historis minimal tujuh hari.* | *Sistem menjalankan prediksi dan menampilkan rekomendasi produksi dalam tabel atau grafik.* | *Sesuai. Sistem menghitung rekomendasi dari data tujuh hari, menyimpan hasilnya, dan menampilkannya pada dashboard.* | *Pass* |
| *UC05-TC02* | *KF06, KF07* | *Alternatif 1: Data Historis Belum Memenuhi Syarat Minimal* | *1. Masuk sebagai Pemilik F&B.<br>2. Buka dashboard dengan data historis kurang dari tujuh hari.<br>3. Lihat bagian prediksi.* | *Data penjualan historis kurang dari tujuh hari.* | *Sistem menampilkan pesan bahwa prediksi belum dapat dilakukan sampai data penjualan tujuh hari terpenuhi.* | *Sesuai. Dashboard menampilkan pesan “Data historis belum memenuhi syarat minimal 7 hari.” dan daftar prediksi kosong.* | *Pass* |

### 4.4.6 Use Case Mencatat Produk Surplus

**ID Use Case:** *UC06*  
**Nama Use Case:** *Mencatat Produk Surplus*

Tabel 4.4.6. Hasil Pengujian Use Case UC06

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC06-TC01* | *KF08* | *Normal* | *1. Masuk sebagai Pemilik F&B.<br>2. Buka menu Catat Surplus.<br>3. Pilih produk, isi jumlah surplus, dan tentukan batas waktu pengambilan.<br>4. Klik tombol "Lanjut: Atur Distribusi".* | *Produk valid, jumlah surplus berupa bilangan bulat lebih dari 0, dan batas waktu setelah waktu sekarang.* | *Sistem menyimpan produk surplus beserta jumlah dan batas waktu pengambilannya, lalu memberi umpan balik bahwa pencatatan berhasil.* | *Sesuai. Data surplus tersimpan dengan status "tersedia", aktivitas pencatatan masuk ke log, dan pengguna diarahkan ke halaman pengaturan distribusi.* | *Pass* |
| *UC06-TC02* | *KF08* | *Alternatif 1: Mereset Isian Formulir* | *1. Buka menu Catat Surplus.<br>2. Isi produk, jumlah surplus, dan batas waktu pengambilan.<br>3. Klik tombol "Reset".* | *Formulir terisi sebagian atau seluruhnya.* | *Sistem membatalkan pengisian dan mengembalikan formulir ke keadaan kosong.* | *Sesuai. Seluruh isian terhapus, formulir kembali kosong, dan tidak ada data surplus yang tersimpan.* | *Pass* |

### 4.4.7 Use Case Mengatur Metode Distribusi Surplus

**ID Use Case:** *UC07*  
**Nama Use Case:** *Mengatur Metode Distribusi Surplus*

Tabel 4.4.7. Hasil Pengujian Use Case UC07

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC07-TC01* | *KF09* | *Normal* | *1. Masuk sebagai Pemilik F&B.<br>2. Buka halaman pengaturan distribusi untuk produk surplus yang baru dicatat.<br>3. Pilih opsi "Jual Diskon".<br>4. Isi harga jual dengan 15000.<br>5. Klik tombol "Simpan".* | *Metode jual diskon dengan harga 15000.* | *Sistem memeriksa kelengkapan dan kevalidan harga, menyimpan metode distribusi beserta harga produk, lalu menampilkan pesan bahwa pengaturan berhasil disimpan.* | *Sesuai. Surplus dipublikasikan dengan metode "Jual Diskon" dan halaman konfirmasi menampilkan detail produk, jumlah, metode, serta batas waktu pengambilan.* | *Pass* |
| *UC07-TC02* | *KF09* | *Alternatif 1: Memilih Donasi* | *1. Masuk sebagai Pemilik F&B.<br>2. Buka halaman pengaturan distribusi.<br>3. Pilih opsi "Donasi".<br>4. Biarkan kolom harga kosong.<br>5. Klik tombol "Simpan".* | *Metode donasi tanpa harga.* | *Sistem tidak mewajibkan pengisian harga, menyimpan metode distribusi sebagai donasi tanpa biaya, lalu menampilkan pesan bahwa pengaturan berhasil disimpan.* | *Sesuai. Metode donasi tersimpan dengan harga 0 dan halaman konfirmasi menampilkan metode "Donasi".* | *Pass* |
| *UC07-TC03* | *KF09* | *Alternatif 2: Harga Penjualan Tidak Valid* | *1. Masuk sebagai Pemilik F&B.<br>2. Buka halaman pengaturan distribusi.<br>3. Pilih opsi "Jual Diskon".<br>4. Kosongkan atau isi harga dengan 0.<br>5. Klik tombol "Simpan".* | *Harga kosong atau 0.* | *Sistem menolak penyimpanan dan meminta harga berupa angka lebih dari nol.* | *Sesuai. Halaman pengaturan ditampilkan ulang dengan pesan "Harga jual diskon harus lebih dari 0." dan tidak ada pengaturan yang tersimpan.* | *Pass* |

### 4.4.8 Use Case Melihat Informasi Produk Surplus

**ID Use Case:** *UC08*  
**Nama Use Case:** *Melihat Informasi Produk Surplus*

Tabel 4.4.8. Hasil Pengujian Use Case UC08

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC08-TC01* | *KF10, KF11* | *Normal* | *1. Masuk sebagai Perwakilan NGO dengan lokasi tersedia.<br>2. Buka halaman daftar produk surplus.<br>3. Amati urutan daftar.<br>4. Pilih salah satu produk untuk melihat detail.* | *NGO berlokasi; beberapa produk surplus tersedia.* | *Sistem menampilkan daftar produk tersedia yang diurutkan dari jarak terdekat, lalu detail berisi jenis, jumlah, lokasi, batas waktu, metode distribusi, dan harga apabila produk dijual.* | *Sesuai. Daftar terurut dari produk terdekat dan halaman detail menampilkan jenis, jumlah, jarak, batas waktu, serta metode distribusi.* | *Pass* |
| *UC08-TC02* | *KF10, KF11* | *Alternatif 1: Lokasi Pengguna Belum Tersedia* | *1. Masuk sebagai Perwakilan NGO yang belum mengisi lokasi.<br>2. Buka halaman daftar produk surplus.* | *Lokasi pengguna kosong.* | *Sistem meminta Perwakilan NGO memberikan lokasi agar produk dapat diurutkan berdasarkan jarak terdekat; daftar produk tetap ditampilkan tanpa informasi jarak.* | *Sesuai. Muncul ajakan mengisi lokasi dan daftar produk tetap tampil tanpa informasi jarak.* | *Pass* |
| *UC08-TC03* | *KF10, KF11* | *Batas: Produk Tidak Lagi Tersedia* | *1. Buka daftar produk surplus yang memuat produk tersedia, terklaim, dan kedaluwarsa.<br>2. Klaim dua produk.<br>3. Buka kembali daftar.* | *Lima produk tersedia; dua produk diklaim; satu produk melewati batas waktu.* | *Produk yang berstatus terklaim atau melewati batas waktu tidak lagi ditampilkan pada daftar.* | *Sesuai. Daftar menyusut dari lima menjadi tiga produk; produk terklaim dan kedaluwarsa tidak tampil.* | *Pass* |

### 4.4.9 Use Case Menyaring Informasi Produk Surplus

**ID Use Case:** *UC09*  
**Nama Use Case:** *Menyaring Informasi Produk Surplus*

Tabel 4.4.9. Hasil Pengujian Use Case UC09

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC09-TC01* | *KF12* | *Normal* | *1. Masuk sebagai Perwakilan NGO.<br>2. Buka halaman daftar produk surplus.<br>3. Masukkan kata kunci "roti" dan pilih jenis "Makanan".<br>4. Terapkan penyaringan.* | *Kata kunci "roti"; jenis "Makanan".* | *Sistem menampilkan produk surplus yang sesuai dengan kata kunci dan seluruh kriteria, tetap diurutkan berdasarkan jarak terdekat.* | *Sesuai. Hanya produk makanan yang memuat kata kunci tampil dan urutan jarak tetap berlaku.* | *Pass* |
| *UC09-TC02* | *KF12* | *Alternatif 1: Tidak Ada Produk yang Sesuai* | *1. Buka halaman daftar produk surplus.<br>2. Masukkan kata kunci yang tidak cocok dengan produk mana pun.<br>3. Terapkan penyaringan.* | *Kata kunci "tidakada".* | *Sistem menampilkan pesan bahwa tidak ada produk yang sesuai dan tetap menampilkan kata kunci serta kriteria yang digunakan.* | *Sesuai. Pesan kosong ditampilkan dan kata kunci tetap terlihat pada kolom pencarian.* | *Pass* |
| *UC09-TC03* | *KF12* | *Batas: Kombinasi Filter Jarak dan Batas Waktu* | *1. Buka panel penyaringan.<br>2. Pilih jarak maksimal 2 km dan batas waktu "Besok".<br>3. Terapkan penyaringan.* | *Jarak maksimal 2 km; batas waktu "Besok".* | *Sistem menerapkan seluruh kriteria secara bersamaan dan hanya menampilkan produk yang memenuhi semuanya.* | *Sesuai. Hanya produk dalam radius 2 km yang berbatas waktu besok ditampilkan; filter jarak dan waktu bekerja bersamaan.* | *Pass* |

### 4.4.10 Use Case Mengklaim Produk Surplus

**ID Use Case:** *UC10*  
**Nama Use Case:** *Mengklaim Produk Surplus*

Tabel 4.4.10. Hasil Pengujian Use Case UC10

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC10-TC01* | *KF13* | *Normal* | *1. Masuk sebagai Perwakilan NGO.<br>2. Pilih produk surplus yang ingin diklaim.<br>3. Buka detail produk.<br>4. Klik tombol "Klaim".* | *Produk surplus berstatus tersedia.* | *Sistem memeriksa ketersediaan, menyetujui klaim, mencatat NGO yang mengklaim, mengubah status produk menjadi "terklaim", lalu menampilkan hasil pengajuan.* | *Sesuai. Halaman klaim berhasil tampil dengan informasi pengambilan dan status produk berubah menjadi "terklaim".* | *Pass* |
| *UC10-TC02* | *KF13* | *Alternatif 1: Produk Sudah Diklaim NGO Lain* | *1. Masuk sebagai Perwakilan NGO lain.<br>2. Buka produk yang sudah diklaim NGO pertama.<br>3. Klik tombol "Klaim".* | *Produk surplus yang sudah berstatus terklaim.* | *Sistem menolak pengajuan, menampilkan pesan bahwa produk sudah diklaim, dan mempertahankan klaim yang telah berhasil sebelumnya.* | *Sesuai. Permintaan klaim kedua ditolak dengan status 409 beserta pesan bahwa produk sudah diklaim; klaim NGO pertama tetap berlaku.* | *Pass* |
| *UC10-TC03* | *KF13* | *Batas: Klaim Serentak oleh Banyak NGO* | *Kirim 12 permintaan klaim secara paralel dari 12 sesi Perwakilan NGO berbeda pada produk yang sama.* | *Dua belas sesi NGO; satu produk tersedia.* | *Tepat satu klaim berhasil, klaim lainnya ditolak, dan hanya satu dokumen klaim yang tersimpan.* | *Sesuai. Satu sesi menerima halaman klaim berhasil (302) dan 11 sesi lainnya menerima penolakan (409).* | *Pass* |

### 4.4.11 Use Case Mengonfirmasi Pengambilan Produk Surplus

**ID Use Case:** *UC11*  
**Nama Use Case:** *Mengonfirmasi Pengambilan Produk Surplus*

Tabel 4.4.11. Hasil Pengujian Use Case UC11

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC11-TC01* | *KF14* | *Normal* | *1. Masuk sebagai Perwakilan NGO pemilik klaim.<br>2. Buka detail pengambilan produk.<br>3. Klik tombol konfirmasi pengambilan.<br>4. Pilih "Yes" pada pop-up konfirmasi.* | *Klaim berstatus terklaim dan belum selesai.* | *Sistem menampilkan pop-up konfirmasi; setelah memilih "Yes" status pengambilan berubah menjadi "selesai" dan pesan keberhasilan ditampilkan.* | *Sesuai. Status pengambilan berubah menjadi "selesai" dan halaman pengambilan selesai ditampilkan.* | *Pass* |
| *UC11-TC02* | *KF14* | *Negatif/Batas: Konfirmasi Ganda dan Akses NGO Lain* | *1. Konfirmasi pengambilan untuk kedua kalinya.<br>2. Buka detail klaim yang sama dari sesi Perwakilan NGO lain.* | *ID klaim yang sama; sesi NGO lain.* | *Konfirmasi ganda ditolak dan NGO lain tidak diizinkan mengakses detail klaim.* | *Sesuai. Konfirmasi kedua ditolak dengan pesan bahwa pengambilan sudah dikonfirmasi, sedangkan NGO lain menerima status 403.* | *Pass* |
| *UC11-TC03* | *KF14* | *Alternatif 1: Memilih "No" pada Pop-up Konfirmasi* | *1. Buka detail pengambilan.<br>2. Klik tombol konfirmasi pengambilan.<br>3. Pilih "No" pada pop-up konfirmasi.* | *Pop-up konfirmasi pengambilan.* | *Sistem menutup pop-up dan kembali menampilkan detail pengambilan tanpa mengubah status.* | *Sesuai. Pop-up tertutup dan status pengambilan tidak berubah.* | *Pass* |

### 4.4.12 Use Case Mengecek Log Aktivitas Pengguna

**ID Use Case:** *UC12*  
**Nama Use Case:** *Mengecek Log Aktivitas Pengguna*

Tabel 4.4.12. Hasil Pengujian Use Case UC12

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC12-TC01* | *KF15* | *Normal* | *1. Masuk sebagai Admin Sistem.<br>2. Buka menu log aktivitas pengguna.<br>3. Terapkan penyaringan "Klaim".* | *Daftar log tanpa filter; filter "Klaim".* | *Sistem menampilkan daftar log aktivitas beserta pilihan penyaringan, lalu menampilkan log yang sesuai dengan kriteria.* | *Sesuai. Daftar awal menampilkan seluruh aktivitas dan filter "Klaim" menampilkan hanya aktivitas klaim.* | *Pass* |
| *UC12-TC02* | *KF15* | *Negatif: Kriteria Penyaringan Tidak Dikenal* | *1. Buka menu log aktivitas.<br>2. Terapkan kriteria penyaringan di luar pilihan yang tersedia.* | *Nilai filter di luar empat pilihan.* | *Sistem menolak penyaringan dan menampilkan pesan galat.* | *Sesuai. Halaman menampilkan status 400 beserta pesan bahwa kategori filter tidak dikenal.* | *Pass* |
| *UC12-TC03* | *KF15* | *Negatif: Aktor Bukan Admin Sistem* | *Buka menu log aktivitas menggunakan sesi Perwakilan NGO atau Pemilik F&B.* | *Sesi non-admin.* | *Sistem menolak akses pengguna yang bukan Admin Sistem.* | *Sesuai. Pengguna non-admin menerima status 403 dan tidak dapat melihat log.* | *Pass* |
| *UC12-TC04* | *KF15* | *Alternatif 1: Tidak Ada Log yang Sesuai dengan Penyaringan* | *1. Buka menu log aktivitas.<br>2. Terapkan kriteria penyaringan yang tidak cocok dengan log mana pun.* | *Kriteria filter tanpa hasil.* | *Sistem menampilkan pesan bahwa tidak ada log aktivitas yang sesuai dengan kriteria tersebut.* | *Sesuai. Pesan bahwa tidak ada log yang sesuai ditampilkan dengan filter tetap aktif.* | *Pass* |
| *UC12-TC05* | *KF15* | *Alternatif 2: Belum Ada Log Aktivitas* | *Buka menu log aktivitas ketika belum ada aktivitas pengguna yang tercatat.* | *Tabel log masih kosong.* | *Sistem menampilkan pesan bahwa belum ada log aktivitas pengguna yang tersedia.* | *Sesuai. Pesan khusus "belum ada log aktivitas" ditampilkan dan berbeda dari pesan filter tanpa hasil.* | *Pass* |

<br>

## 4.5 Pengujian Kebutuhan Non-Fungsional (KNF)

Setiap KNF pada Tabel 3.2 SKPL diuji secara terukur berdasarkan parameter yang telah didefinisikan. Setiap pengujian memuat target terukur, metode dan alat yang sesuai dengan parameter (misalnya Chrome DevTools untuk *response time* dan inspeksi basis data untuk *security*), serta hasil aktual berupa angka atau data. KNF yang belum dipenuhi atau tidak diimplementasikan dicantumkan beserta alasan dan rencana perbaikan.

Tabel 4.5. Hasil Pengujian KNF

| ID Pengujian | ID KNF | Parameter | Target Terukur | Metode dan Alat | Hasil Aktual | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *KNF01-TC01* | *KNF01* | *Reliability* | *Tidak ada data hilang/ganda saat jaringan putus di tengah transaksi* | *Simulasi putus koneksi saat bayar, lalu cek status di DB* | *[Hasil aktual]* | *Pass/Fail* |
| *KNF02-TC01* | *KNF02* | *Security* | *Password tersimpan sebagai hash, bukan plain-text* | *Inspeksi tabel pengguna di DB* | *[...]* | *Pass/Fail* |
| *KNFXX-TC01* | *KNFXX* | *Response time* | *Halaman tampil ≤ 4 detik* | *Chrome DevTools, 5 kali ukur, ambil rata-rata* | *[Rata-rata ... detik, maks ... detik]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

<br>

## 4.6 Tangkapan Layar dan Bukti Hasil Pengujian

Bukti pengujian dilampirkan sesuai ID Pengujian pada Subbab 4.2 sampai 4.5, berupa tangkapan layar aplikasi, keluaran *test runner*, laporan *coverage* untuk setiap kelas Mendalam, atau hasil alat ukur.

Tabel 4.6. Bukti Hasil Pengujian

| ID Pengujian | Bukti Hasil Pengujian |
| :--- | :--- |
| *C01-UT01 – C01-UT05* | *<img src="assets/Bukti-4.2/C01-UT.png">* |
| *C01 (coverage)* | *<img src="assets/Bukti-4.2/C01-Coverage.png">* |
| *C02-UT01 – C02-UT18* | *<img src="assets/Bukti-4.2/C02-UT.png">* |
| *C02 (coverage)* | *<img src="assets/Bukti-4.2/C02-Coverage.png">* |
| *C03-UT01 – C03-UT10* | *<img src="assets/Bukti-4.2/C03-UT.png">* |
| *C03 (coverage)* | *<img src="assets/Bukti-4.2/C03-Coverage.png">* |
| *C04-UT01 – C04-UT07* | *<img src="assets/Bukti-4.2/C04-UT.png">* |
| *C06-UT01 – C06-UT08* | *<img src="assets/Bukti-4.2/C06-UT.png">* |
| *C06 (coverage)* | *<img src="assets/Bukti-4.2/C06-Coverage.png">* |
| *C07-UT01 – C07-UT08* | *<img src="assets/Bukti-4.2/C07-UT.png">* |
| *C07 (coverage)* | *<img src="assets/Bukti-4.2/C07-Coverage.png">* |
| *C08-UT01 – C08-UT16* | *<img src="assets/Bukti-4.2/C08-UT.png">* |
| *C08 (coverage)* | *<img src="assets/Bukti-4.2/C08-Coverage.png">* |
| *C09-UT01 – C09-UT09* | *<img src="assets/Bukti-4.2/C09-UT.png">* |
| *C09 (coverage)* | *<img src="assets/Bukti-4.2/C09-Coverage.png">* |
| *C10-UT01 – C10-UT09* | *<img src="assets/Bukti-4.2/C10-UT.png">* |
| *C10 (coverage)* | *<img src="assets/Bukti-4.2/C10-Coverage.png">* |
| *C11-UT01 – C11-UT09* | *<img src="assets/Bukti-4.2/C11-UT.png">* |
| *C11 (coverage)* | *<img src="assets/Bukti-4.2/C11-Coverage.png">* |
| *C23-UT01 – C23-UT15* | *<img src="assets/Bukti-4.2/C23-UT.png">* |
| *C23 (coverage)* | *<img src="assets/Bukti-4.2/C23-Coverage.png">* |
| *C24-UT01 – C24-UT07* | *<img src="assets/Bukti-4.2/C24-UT.png">* |
| *C24 (coverage)* | *<img src="assets/Bukti-4.2/C24-Coverage.png">* |
| *C25-UT01 – C25-UT07* | *<img src="assets/Bukti-4.2/C25-UT.png">* |
| *C25 (coverage)* | *<img src="assets/Bukti-4.2/C25-Coverage.png">* |
| *C26-UT01 – C26-UT16* | *<img src="assets/Bukti-4.2/C26-UT.png">* |
| *C26 (coverage)* | *<img src="assets/Bukti-4.2/C26-Coverage.png">* |
| *C27-UT01 – C27-UT11* | *<img src="assets/Bukti-4.2/C27-UT.png">* |
| *C27 (coverage)* | *<img src="assets/Bukti-4.2/C27-Coverage.png">* |
| *C28-UT01 – C28-UT18* | *<img src="assets/Bukti-4.2/C28-UT.png">* |
| *C28 (coverage)* | *<img src="assets/Bukti-4.2/C28-Coverage.png">* |
| *C29-UT01 – C29-UT06* | *<img src="assets/Bukti-4.2/C29-UT.png">* |
| *C32-UT01 – C32-UT06* | *<img src="assets/Bukti-4.2/C32-UT.png">* |
| *C32 (coverage)* | *<img src="assets/Bukti-4.2/C32-Coverage.png">* |
| *C33-UT01 – C33-UT06* | *<img src="assets/Bukti-4.2/C33-UT.png">* |
| *C33 (coverage)* | *<img src="assets/Bukti-4.2/C33-Coverage.png">* |
| *C34-UT01 – C34-UT06* | *<img src="assets/Bukti-4.2/C34-UT.png">* |
| *C34 (coverage)* | *<img src="assets/Bukti-4.2/C34-Coverage.png">* |
| *INT-TC01* | *[Sisipkan bukti pengujian integrasi]* |
| *UC01-TC01* | *<img src="assets/Bukti-4.4/UC01/UC01-TC01.png">* |
| *UC01-TC02* | *<img src="assets/Bukti-4.4/UC01/UC01-TC02.png">* |
| *UC01-TC03* | *<img src="assets/Bukti-4.4/UC01/UC01-TC03.png">* |
| *UC02-TC01* | *<img src="assets/Bukti-4.4/UC02/UC02-TC01.png">* |
| *UC02-TC02* | *<img src="assets/Bukti-4.4/UC02/UC02-TC02.png">* |
| *UC03-TC01* | *Status diterima: <img src="assets/Bukti-4.4/UC03-TC01.png">* |
| *UC03-TC02* | *Status ditolak: <img src="assets/Bukti-4.4/UC03-TC02.png">* |
| *UC04-TC01* | *Halaman tersimpan: <img src="assets/Bukti-4.4/UC04-TC01.png"><br>Isian tersimpan (8 terjual, 2 tersisa): <img src="assets/Bukti-4.4/UC04-TC01-b.png">* |
| *UC04-TC02* | *Pesan validasi: <img src="assets/Bukti-4.4/UC04-TC02.png">* |
| *UC05-TC01* | *<img src="assets/Bukti-4.4/UC05-TC01.png">* |
| *UC05-TC02* | *<img src="assets/Bukti-4.4/UC05-TC02.png">* |
| *UC06-TC01* | *<img src="assets/Bukti-4.4/UC06-TC01.png">* |
| *UC06-TC02* | *Sebelum reset: <img src="assets/Bukti-4.4/UC06-TC02-a.png"><br>Sesudah reset: <img src="assets/Bukti-4.4/UC06-TC02-b.png">* |
| *UC07-TC01* | *<img src="assets/Bukti-4.4/UC07-TC01.png">* |
| *UC07-TC02* | *<img src="assets/Bukti-4.4/UC07-TC02.png">* |
| *UC07-TC03* | *<img src="assets/Bukti-4.4/UC07-TC03.png">* |
| *UC08-TC01* | *Daftar terurut jarak: <img src="assets/Bukti-4.4/UC08-TC01-a.png"><br>Detail produk: <img src="assets/Bukti-4.4/UC08-TC01-b.png">* |
| *UC08-TC02* | *<img src="assets/Bukti-4.4/UC08-TC02.png">* |
| *UC08-TC03* | *Sebelum klaim: <img src="assets/Bukti-4.4/UC08-TC03-a.png"><br>Sesudah klaim: <img src="assets/Bukti-4.4/UC08-TC03-b.png">* |
| *UC09-TC01* | *<img src="assets/Bukti-4.4/UC09-TC01.png">* |
| *UC09-TC02* | *<img src="assets/Bukti-4.4/UC09-TC02.png">* |
| *UC09-TC03* | *Hasil filter: <img src="assets/Bukti-4.4/UC09-TC03.png"><br>Panel filter: <img src="assets/Bukti-4.4/UC09-TC03-b.png">* |
| *UC10-TC01* | *<img src="assets/Bukti-4.4/UC10-TC01.png">* |
| *UC10-TC02* | *Respons klaim kedua: <img src="assets/Bukti-4.4/UC10-TC02-a.png"><br>Detail bagi NGO lain: <img src="assets/Bukti-4.4/UC10-TC02-b.png">* |
| *UC10-TC03* | *<img src="assets/Bukti-4.4/UC10-TC03.png">* |
| *UC11-TC01* | *<img src="assets/Bukti-4.4/UC11-TC01.png">* |
| *UC11-TC02* | *Konfirmasi ganda: <img src="assets/Bukti-4.4/UC11-TC02-a.png"><br>NGO lain: <img src="assets/Bukti-4.4/UC11-TC02-b.png">* |
| *UC11-TC03* | *Pop-up konfirmasi: <img src="assets/Bukti-4.4/UC11-TC03-a.png"><br>Setelah memilih "Tidak": <img src="assets/Bukti-4.4/UC11-TC03-b.png">* |
| *UC12-TC01* | *Semua log: <img src="assets/Bukti-4.4/UC12-TC01-a.png"><br>Filter Klaim: <img src="assets/Bukti-4.4/UC12-TC01-b.png">* |
| *UC12-TC02* | *<img src="assets/Bukti-4.4/UC12-TC02.png">* |
| *UC12-TC03* | *<img src="assets/Bukti-4.4/UC12-TC03.png">* |
| *UC12-TC04* | *Filter tanpa hasil: <img src="assets/Bukti-4.4/UC12-TC04-a.png">* |
| *UC12-TC05* | *Belum ada log: <img src="assets/Bukti-4.4/UC12-TC04-b.png">* |
| *KNF01-TC01* | *[Sisipkan bukti pengukuran parameter KNF01-TC01]* |
| *...* | *...* |

<br>

---

# BAB 5: Traceability

Petakan setiap KF ke KNF, use case, kelas perancangan, file implementasi, dan test case. Tabel traceability berikut akan menjadi sarana verifikasi KF. Setiap KF memiliki minimal satu test case dan dinyatakan terpenuhi apabila **seluruh** test case terkaitnya berkesimpulan `Pass`. KF yang tidak diimplementasikan tetap dicantumkan beserta alasannya.

Tabel 5.1. Matriks Kerunutan KF terhadap Implementasi dan Pengujian

| KF ID | KNF Terkait | Use Case ID | Kelas Terkait | Implementasi File Terkait | Test Case (UC) | Test Case (Unit/Integrasi/KNF) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *KF05* | *KNF01* | *UC03* | *C02 - Pesanan* | *`src/...`* | *UC03-TC01* | *C02-UT05, INT-TC04, KNF01-TC01* |
| *KF01* | *-* | *UC01<br>UC02* | *[C01 - Nama kelas]<br>[C02 - Nama kelas]* | *[path/ke/file1]<br>[path/ke/file2]* | *UC01-TC01, UC01-TC02<br>UC02-TC01* | *-* |
| *KF02* | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| *KFXX* | *-* | *[UCXX atau -]* | *[CXX - Nama kelas atau -]* | *Tidak diimplementasikan: [alasan]* | *-* | *-* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

Tabel 5.2. Matriks Kerunutan KNF terhadap Pengujian

| ID KNF | Parameter | KF/UC Terkait | Test Case |
| :--- | :--- | :--- | :--- |
| *KNF01* | *Reliability* | *KF05 / UC03* | *KNF01-TC01* |
| *KNFXX* | *[Parameter]* | *[KFXX / UCXX atau -]* | *[KNFXX-TCYY]* |
| *...* | *...* | *...* | *...* |
