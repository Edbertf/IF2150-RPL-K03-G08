<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 3
<br>
USE CASE & SCENARIO USE CASE
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
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

<br>
<br>

# BAB 1: Deskripsi Perangkat Lunak

FoodLink merupakan sebuah sistem perangkat lunak yang dibuat dengan tujuan untuk mengatasi dan mengurangi pemborosan makanan dengan cara menjadi penghubung antara pihak pemilik usaha F&B dengan NGO dalam proses pengelolaan dan distribusi makanan layak konsumsi yang surplus. Sistem ini juga akan memberikan rekomendasi produksi bagi para pemilik usaha F&B untuk membantu meminimalisir surplus.

Dari sisi pemilik F&B, sistem diharapkan akan dapat membantu pengguna dalam memasukkan data penjualan dan sisa produk secara berkala. Data yang dimasukkan oleh pengguna kemudian akan disimpan sebagai data historis dan akan diolah oleh sistem untuk menghasilkan rekomendasi produksi untuk hari berikutnya. Rekomendasi tersebut akan menjadi salah satu pertimbangan pengguna dalam menentukan jumlah produksi agar jumlah produksi dapat disesuaikan dan potensi makanan surplus dapat dikurangi. Apabila pada akhirnya masih terdapat makanan berlebih yang tidak terjual, pengguna dapat memasukkannya sebagai makanan surplus ke dalam sistem. Lalu, pengguna dapat menentukan apakah makanan akan didonasikan secara sukarela atau dijual dengan harga yang lebih rendah. Setelah diumumkan, informasi terkait makanan surplus akan dapat diakses oleh pihak NGO yang membutuhkannya. Adapun informasi tersebut mencakup hal-hal yang diperlukan dalam proses pengambilan makanan, seperti jenis makanan, jumlah, harga, lokasi , batas waktu pengambilan, dan lain-lain.

Dari sisi pihak NGO, sistem diharapkan akan memudahkan pengguna dalam menemukan makanan surplus yang tersedia di sekitar lokasi mereka. Pengguna dapat melihat informasi makanan yang tersedia, memilih makanan sesuai dengan kebutuhannya, dan mengajukan klaim. Setelah klaim diterima, pengguna akan dapat mengambil makanan secara langsung di lokasi pemilik F&B sesuai dengan batas waktu yang telah ditentukan sebelumnya. Terdapat juga admin sistem yang akan mengelola penggunaan FoodLink agar sistem dapat berjalan dengan baik. Admin akan melakukan proses verifikasi terhadap pengguna baru dan memantau aktivitas pengguna untuk menjaga keamanan serta mencegah penyalahgunaan sistem.

Secara keseluruhan, alur penggunaan FoodLink dimulai dari pendaftaran dan verifikasi pengguna untuk memastikan bahwa identitas dari pengguna itu valid. Setelah dapat menggunakan sistem, pemilik F&B dapat secara berkala memasukkan data penjualan dan sisa produk. Data tersebut kemudian akan diolah oleh sistem untuk menghasilkan rekomendasi produksi bagi pemilik F&B. Ketika masih terdapat surplus, pemilik F&B dapat mengumumkan makanan tersebut melalui sistem untuk didonasikan secara sukarela atau dijual kembali sehingga pihak NGO dapat menerima informasi-informasi terkait jenis makanan, jumlah, dan batas waktu pengambilan agar bisa melakukan klaim dan segera mengambil makanan tersebut. Dengan alur tersebut, FoodLink diharapkan dapat mempertemukan pihak yang memiliki makanan surplus dengan pihak yang membutuhkan secara teratur dan terorganisir.

Penerapan FoodLink diharapkan dapat memberikan manfaat bagi seluruh pihak yang terlibat. Pemilik F&B dapat terbantu dalam merencanakan jumlah produksi dan mengelola makanan layak konsumsi yang tidak terjual sedangkan NGO dapat memperolah akses yang lebih mudah terhadap informasi terkait makanan surplus yang masih layak konsumsi. Pada akhirnya, sistem diharapkan dapat meminimalisir surplus makanan sekaligus meningkatkan pemanfaatan surplus melalui sebuah proses distribusi yang lebih efektif.

---

# BAB 2: Kebutuhan Fungsional (KF)
Salin ulang **seluruh Kebutuhan Fungsional (KF)** yang telah didefinisikan pada dokumen *Requirement Gathering*. Tabel ini menjadi acuan *traceability*, dimana setiap Use Case pada BAB 3 wajib ditelusuri ke satu atau lebih ID KF di tabel ini, dan sebaliknya setiap KF idealnya tercakup oleh minimal satu Use Case. Pastikan juga sudah menggunakan **format EARS** dalam penulisan KF.

| ID KF | Kebutuhan | Penjelasan |
| :--- | :--- | :--- |
| *KF01* | *Menampilkan pilihan metode pembayaran* | *Perangkat lunak dapat menampilkan pilihan antarmuka metode pembayaran (transfer bank, e-wallet, kartu kredit) setelah pengguna melakukan checkout.* |
| *KF02* | *Mengirim permintaan otorisasi pembayaran* | *Perangkat lunak dapat mengirimkan permintaan otorisasi transaksi ke API Payment Gateway beserta nominal tagihan dan ID Pesanan.* |
| *...* | *...* | *...* |

<sub> ***Catatan***: *Jika ada KF dari ML2 yang berubah/bertambah/dihapus setelah asistensi, pastikan tabel ini konsisten dengan versi KF terbaru sebelum dikumpulkan.*
<sub>

---

# BAB 3: Model Use Case

## 3.1 Identifikasi Aktor
Daftarkan seluruh aktor yang terlibat dalam use case yang akan dimodelkan. Aktor berupa pengguna manusia yang berinteraksi dengan solusi. Perlu diperhatikan bahwa Admin/Developer/ Pihak Eksternal lain yang bisa diotomisasi, tidak perlu dijadikan aktor.

| Aktor | Deskripsi |
| :--- | :--- |
| *Pelanggan* | *Pengguna yang melakukan transaksi pembelian dan pembayaran melalui sistem.* |
| *Kasir* | *Pengguna internal toko yang memverifikasi status pembayaran pelanggan sebelum menyerahkan barang.* |
| *...* | *...* |



## 3.2 Identifikasi Use Case
Identifikasi seluruh use case yang mencakup Kebutuhan Fungsional pada BAB 2. Satu use case boleh mencakup lebih dari satu KF, dan sebaliknya satu KF boleh muncul di lebih dari satu use case bila memang relevan.

| ID UC | Nama Use Case | Deskripsi Singkat | Aktor Terlibat | ID KF Terkait |
| :--- | :--- | :--- | :--- | :--- |
| *UC01* | *Melakukan Pembayaran Digital* | *Pelanggan memilih metode pembayaran dan menyelesaikan transaksi.* | *Pelanggan* | *KF01, KF02* |
| *UC02* | *Memverifikasi Status Pembayaran* | *Kasir mengecek status transaksi pelanggan sebelum menyerahkan barang.* | *Kasir* | *KF03* |
| *...* | *...* | *...* | *...* | *...* |

## 3.3 Use Case Diagram
Buatlah **satu** use case diagram yang mencakup seluruh aktor dan use case. Sertakan relasi *include*/*extend* apabila ada use case yang saling bergantung.
<br>
<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/contoh-uc-diagram.webp" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Use Case Diagram</i>
</p>
<br>

Hal-hal yang perlu diperhatikan dalam pembuatan use case diagram:
- Pastikan notasi UML use case (aktor, oval use case, garis asosiasi, *include/extend*) digambar dengan benar.
- Seluruh aktor dan use case yang telah didefinisikan harus muncul di diagram, tidak ada yang terlewat maupun berlebih.
- Hindari garis yang saling bersilangan tanpa alasan jelas, susun diagram agar mudah dibaca.
- Hindari istilah solusi teknis (misalnya nama tabel database, nama endpoint API) muncul di dalam diagram use case karena use case menjelaskan *interaksi fungsional*, bukan detail implementasi.

## 3.4 Skenario Use Case
Buat skenario untuk **setiap** use case yang telah diidentifikasi pada 3.2. Setiap skenario dapat terdiri dari dua jenis alur:
- **Skenario Normal**: alur utama (*happy path*) di mana interaksi aktor-sistem berjalan lancar tanpa kendala hingga tujuan use case tercapai.
- **Skenario Alternatif**: alur percabangan dari skenario normal, misalnya kondisi gagal, input tidak valid, atau pilihan lain yang tersedia bagi aktor. Boleh ada lebih dari satu skenario alternatif per use case jika ada beberapa titik percabangan berbeda.

Format tabel skenario: kolom **Aksi Aktor** berisi apa yang dilakukan/diinput aktor, kolom **Reaksi Perangkat Lunak** berisi respons sistem terhadap aksi tersebut secara **berurutan** (nomor langkah harus berpasangan/selaras antar dua kolom).


### 3.4.1 Skenario UC01

**Nama Use Case:** *Melakukan Pembayaran Digital*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pelanggan memilih menu checkout* | *Sistem menampilkan ringkasan pesanan dan pilihan metode pembayaran* |
| 2 | *Pelanggan memilih metode pembayaran (misal: e-wallet)* | *Sistem mengarahkan pelanggan ke halaman konfirmasi e-wallet* |
| 3 | *Pelanggan mengonfirmasi pembayaran* | *Sistem menerima respons pembayaran berhasil, memperbarui status pesanan menjadi "Lunas", dan menampilkan notifikasi pembayaran berhasil* |


<br>

**Skenario Alternatif 1: Otorisasi Pembayaran Gagal**


| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pelanggan memilih menu checkout* | *Sistem menampilkan ringkasan pesanan dan pilihan metode pembayaran* |
| 2 | *Pelanggan memilih metode pembayaran (misal: e-wallet)* | *Sistem mengarahkan pelanggan ke halaman konfirmasi e-wallet* |
| 3 | *Pelanggan mengonfirmasi pembayaran* | *Sistem menerima respons pembayaran gagal (misal: saldo tidak cukup). Sistem menampilkan pesan error dan meminta pelanggan memilih metode pembayaran lain* |
| 4 | *Pelanggan memilih metode pembayaran lain* | *Sistem kembali ke langkah 2 skenario normal* |

### 3.4.2 Skenario UC02

**Nama Use Case:** *Memverifikasi Status Pembayaran*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Kasir memasukkan ID Pesanan pelanggan* | *Sistem menampilkan status pembayaran ("Lunas") beserta detail transaksi* |

<br>

**Skenario Alternatif 1: ID Pesanan Tidak Ditemukan**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Kasir memasukkan ID Pesanan yang salah/tidak ada* | *Sistem menampilkan pesan "ID Pesanan tidak ditemukan" dan meminta kasir memasukkan ulang* |


<sub>*Lanjutkanlah pola 3.4.x ini untuk setiap ID UC yang telah diidentifikasi pada 3.2, sampai seluruh use case memiliki skenario normal dan skenario alternatif (tidak usah dibuat jika use case tersebut memang tidak memiliki skenario alternatif).*<sub>