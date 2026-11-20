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

Bagian ini diisi dengan *System Overview*, dalam bentuk gambar dan narasi yang memberikan gambaran tentang aplikasi dan konteksnya. **Batasan dan keterkaitan** antara sistem yang dibangun dengan sistem lain di luarnya harus jelas. Deskripsi umum sistem perlu dilengkapi dengan pemodelan kasus yang dihadapi, seperti *use case diagram*. Berikan narasi yang jelas untuk setiap gambar yang ditampilkan.

Bagian ini dapat menyalin atau meringkas dari dokumen SKPL atau DPPL.

<p align="center">
<img alt="System Overview / Use Case Diagram" src="./assets/contoh-uc-diagram.webp" width="90%">
</p>
<p align="center">
<i>Gambar 2.1. Use Case Diagram [Nama P/L]</i>
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
| *C01* | *AkunPengguna* | *Mendalam* | *Menyimpan kata sandi sebagai hash dan memvalidasi data registrasi akun* | |
| *C02* | *Pendaftaran* | *Mendalam* | *Memvalidasi data pendaftaran dan mengelola transisi status verifikasi* | |
| *C03* | *DokumenPendukung* | *Mendalam* | *Memvalidasi tipe dan ukuran berkas serta menyimpan dokumen pendukung* | |
| *C04* | *VerifikasiController* | *Sedang* | *Mengoordinasikan tampilan verifikasi dan mendelegasikan perubahan status ke C02, diuji juga melalui integrasi* | |
| *C05* | *Produk* | *Tidak perlu* | *Entity produk tanpa logika, hanya menyimpan atribut dan getter, diuji tidak langsung melalui UC* | |
| *C06* | *DataPenjualan* | *Mendalam* | *Memvalidasi input penjualan dan menghitung sisa stok harian* | |
| *C07* | *PrediksiProduksi* | *Mendalam* | *Menjalankan dan menyimpan prediksi produksi beserta rekomendasi jumlah* | |
| *C08* | *ProdukSurplus* | *Mendalam* | *Memvalidasi data surplus dan mengelola status ketersediaan* | |
| *C09* | *MetodeDistribusiSurplus* | *Mendalam* | *Menentukan metode distribusi serta perhitungan harga atau gratis* | |
| *C10* | *DokumenKlaim* | *Mendalam* | *Mencatat klaim dan mengelola transisi status klaim* | |
| *C11* | *LogAktivitas* | *Mendalam* | *Mencari dan menyaring log dengan query serta validasi kriteria* | |
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
| *C23* | *AuthController* | *Mendalam* | *Memvalidasi kelengkapan dan format registrasi serta mengecek status pendaftaran* | |
| *C24* | *PenjualanController* | *Mendalam* | *Memvalidasi input penjualan dengan batas numerik lalu menyimpan data* | |
| *C25* | *PrediksiController* | *Mendalam* | *Mengecek kecukupan data historis dan menjalankan prediksi produksi* | |
| *C26* | *ProdukSurplusController* | *Mendalam* | *Memvalidasi data surplus dan metode distribusi lalu menyimpan keduanya* | |
| *C27* | *SurplusController* | *Mendalam* | *Mengambil surplus tersedia, menghitung jarak lewat C33, dan mengurutkan hasil* | |
| *C28* | *KlaimController* | *Mendalam* | *Mengelola persetujuan klaim, ketersediaan, penguncian, dan konfirmasi pengambilan* | |
| *C29* | *LogController* | *Sedang* | *Hanya memilih kriteria filter dan mendelegasikan pencarian ke C11, diuji juga melalui integrasi* | |
| *C30* | *PemilikFnB* | *Tidak perlu* | *Kelas peran/entity pemilik F&B yang menyimpan data dan mendelegasikan aksi ke controller/model, diuji tidak langsung melalui UC* | |
| *C31* | *PerwakilanNGO* | *Tidak perlu* | *Kelas peran/entity NGO yang menyimpan data dan mendelegasikan aksi ke controller/model, diuji tidak langsung melalui UC* | |
| *C32* | *AdminSistem* | *Mendalam* | *Guard otorisasi peran dan status verifikasi akun* | |
| *C33* | *GeolocationAdapter* | *Mendalam* | *Adapter integrasi geocoding dan perhitungan jarak* | |
| *C34* | *PenyaringanController* | *Mendalam* | *Memvalidasi kriteria dan menyaring produk berdasarkan jenis, jarak, dan waktu* | |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test: *[tuliskan perintah, mis. `pytest src/tests/`]*.

Lokasi file test: *[path, mis. `src/tests/`]*.

### 4.2.1 Kelas [Nama Kelas 1]

**ID Kelas:** *[C02]*  
**Nama Kelas:** *[Pesanan]*  
**Tingkat:** *[Mendalam]*

Tabel 4.2.1. Hasil Pengujian Unit Kelas [C02]

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C02-UT01* | *`hitungTotal(): Decimal`* | *Normal* | *Pesanan berisi 2 item: 10.000 x 2 dan 5.000 x 1* | *Total = 25.000* | *[Hasil aktual]* | *Pass/Fail* |
| *C02-UT02* | *`hitungTotal(): Decimal`* | *Batas* | *Pesanan berisi tepat 1 item dengan jumlah 1* | *Total = harga item tersebut* | *[...]* | *Pass/Fail* |
| *C02-UT03* | *`hitungTotal(): Decimal`* | *Negatif* | *Pesanan tanpa item* | *Total = 0 atau melempar kesalahan sesuai rancangan* | *[...]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

Khusus kelas **Mendalam**:

Tabel 4.2.1b. Ringkasan Cakupan Kelas [C02]

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *[op1(), op2(), ...]* |
| Operasi yang diuji | *[op1(), op2(), ...]* |
| ID Algoritma yang tercakup | *[Algo-001, ...]* |
| Coverage (wajib ≥ 70%) | *[% baris / % cabang, alat dan bukti pada 4.6]* |

### 4.2.2 Kelas [Nama Kelas 2]

*[Ulangi pola 4.2.1 untuk setiap kelas bertingkat Mendalam atau Sedang.]*

<br>

## 4.3 Pengujian Integrasi

Pengujian integrasi memeriksa interaksi antarkomponen yang melewati batas, yaitu *Controller* ke *Model*, aplikasi ke basis data, dan aplikasi ke sistem eksternal. Daftar antarmuka mengacu pada dokumen DPPL, dengan minimal satu test case untuk setiap antarmuka. Pengujian memakai komponen nyata, bukan *mock*. Apabila ada antarmuka tambahan yang belum didaftarkan pada dokumen DPPL, cantumkan juga.

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| *I-01* | *KeranjangController* | *Keranjang (Model)* | *Controller - Model* | *INT-TC01, INT-TC02* |
| *I-02* | *Pesanan (Model)* | *Database* | *Aplikasi - Basis data* | *INT-TC03* |
| *I-03* | *PaymentGatewayAdapter* | *Payment Gateway (dummy)* | *Aplikasi - Sistem eksternal* | *INT-TC04, INT-TC05* |
| *[I-XX]* | *[Komponen asal]* | *[Komponen tujuan]* | *[Jenis batas]* | *[ID test case]* |
| *...* | *...* | *...* | *...* | *...* |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *INT-TC01* | *I-01* | *Normal: tambah item ke keranjang* | *Panggil `tambahItem()` melalui KeranjangController dengan produk valid* | *Item tersimpan pada Keranjang dan tampil pada daftar item* | *[Hasil aktual]* | *Pass/Fail* |
| *INT-TC03* | *I-02* | *Normal: simpan pesanan* | *Buat pesanan, lalu baca ulang langsung dari basis data* | *Baris pesanan ada dengan nilai total dan status yang sama* | *[...]* | *Pass/Fail* |
| *INT-TC05* | *I-03* | *Gagal: gateway mengembalikan status gagal* | *Kirim otorisasi dengan saldo dummy tidak cukup* | *Status pesanan tidak berubah menjadi "Lunas", pesan gagal diteruskan ke pengguna* | *[...]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

### 4.4.1 Use Case [Nama Use Case 1]

**ID Use Case:** *[UC01 sesuai SKPL]*  
**Nama Use Case:** *[Nama use case sesuai SKPL]*

Tabel 4.4.1. Hasil Pengujian Use Case [UC01]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC01-TC01* | *KF01* | *Normal* | *1. Buka halaman login.<br>2. Masukkan kredensial.<br>3. Klik tombol "Login".* | *User: rpl@gmail.com<br>Pass: 123456* | *Pengguna diarahkan ke Halaman Dashboard.* | *Pengguna diarahkan ke Halaman Dashboard sesuai hasil yang diharapkan.* | *Pass* |
| *UC01-TC02* | *KF01* | *Alternatif 1: [Nama skenario]* | *[Langkah-langkah pengujian]* | *[Data masukan]* | *[Hasil yang diharapkan]* | *[Hasil aktual]* | *[Pass/Fail. Jika Fail: penjelasan dan solusi]* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* | *...* |

### 4.4.2 Use Case [Nama Use Case 2]

*[Lanjutkan untuk seluruh use case dengan pola yang sama, hingga 4.4.N.]*

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
| *C02-UT01 – C02-UT08* | *[Sisipkan hasil keluaran unit test]* |
| *C02 (coverage)* | *[Sisipkan laporan coverage kelas C02]* |
| *INT-TC01* | *[Sisipkan bukti pengujian integrasi]* |
| *UC01-TC01* | *[Sisipkan tangkapan layar UC01-TC01 sesuai prosedur pengujian]* |
| *UC01-TC02* | *[Sisipkan tangkapan layar UC01-TC02 sesuai prosedur pengujian]* |
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