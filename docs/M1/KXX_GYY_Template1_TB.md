<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 1
<br>
TOPIC BRAINSTORMING
</h1>
<br>

## *Nama Perangkat Lunak*

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

<br>
<br>

# BAB 1: Analisis Permasalahan

## 1.1 Latar Belakang Masalah
Tuliskan deskripsi permasalahan yang kalian pilih secara naratif dan spesifik. Tambahkan keterkaitan permasalahan tersebut dengan Tujuan Pembangunan Berkelanjutan (SDGs) yang telah disepakati. Dukung argumen kalian dengan data yang kredibel, serta jelaskan urgensi mengapa masalah ini perlu dan layak untuk segera diselesaikan.

## 1.2 Analisis Kondisi Saat Ini
Lakukan analisis terhadap proses yang berjalan saat ini di dunia nyata, baik itu sistem lama ataupun solusi yang sudah ada. Soroti kesenjangan atau celah dari kondisi tersebut yang nantinya akan diselesaikan oleh perangkat lunak kalian.

---

# BAB 2: Analisis Solusi

## 2.1 Deskripsi Perangkat Lunak
Abstraksikan solusi perangkat lunak yang diusulkan dari sudut pandang pengguna. Jelaskan target platform yang akan digunakan (misalnya: desktop application) beserta alasan pemilihannya. Deskripsikan juga nilai unik (inovasi inti) dari perangkat lunak kalian dan apa yang membedakannya dari solusi yang sudah ada.

## 2.2 Asumsi dan Batasan
Definisikan secara tegas asumsi (baik teknis maupun dari sisi pengguna) yang menjadi dasar pengembangan. Tuliskan batasan seperti regulasi/hukum, keterbatasan sumber daya, dan ruang lingkup solusi.

---

# BAB 3: Spesifikasi Kebutuhan dan Proses Bisnis

## 3.1 Identifikasi Aktor

| Aktor | Deskripsi |
| :--- | :--- |
| *Pemilik F&B* | *Pengguna ini bertindak sebagai pihak perwakilan dari bisnis F&B. Karakteristik dari pengguna ini adalah ia butuh UI/UX yang bagus dan nyaman untuk memasukkan data harian juga mengumumkan makanan yang berlebih agar dapat diambil.* |
| *Perwakilan NGO* | *Pengguna ini bertindak sebagai pihak penerima donasi yang telah terdaftar di FoodLoop. Karakteristik dari pengguna ini adalah ia sering mengakses software, butuh informasi yang jelas terkait detail makanan, lokasi, dan batas waktu pengambilan makanan untuk segera diambil.* |
| *Admin Sistem* | *Pengguna ini bertindah sebagai pihak yang mengelola software, mulai dari verifikasi akun baru hingga keamanan* |


## 3.2 Kebutuhan Pengguna Awal

| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| US-01 | *Pemilik F&B* | *Memasukkan hasil data penjualan dan sisa produk harian* | *Sistem merekomendasikan prediksi produksi untuk hari berikutnya* |
| US-02 | *Pemilik F&B* | *Melihat rekomendasi dan prediksi produksi bahan harian* | *Merencanakan kebutuhan produksi untuk mencegah overproduksi kedepannya* |
| US-03 | *Pemilik F&B* | *Mengumumkan daftar produksi yang berlebih* | *Makanan layak konsumsi yang tak terjual dapat diberikan ke pihak yang membutuhkan* |
| US-04 | *Perwakilan NGO* | *Melihat daftar makanan berlebih yang tersedia dan dekat dengan lokasi* | *Menemukan dan mengambil produksi makanan yang siap didonasikan* |
| US-05 | *Perwakilan NGO* | *Mengklaim makanan yang sudah diambil* | *Mengamankan donasi agar tidak diklaim lagi oleh komunitas lain* |
| US-06 | *Admin Sistem* | *Verifikasi identitas pengguna baru* | *Mencegah pihak yang tidak terpercaya/bertanggung jawab di software* |

## 3.3 Model Proses Bisnis
Buatlah *Activity Diagram* atau *Swimlane Diagram* yang menunjukkan alur kerja proses bisnis dari sistem solusi. Diagram ini harus memvisualisasikan bagaimana alur operasional di dunia nyata berjalan lebih efisien dengan adanya interaksi antara aktor (yang didefinisikan pada poin 3.1) dan sistem perangkat lunak. Perhatikan notasi yang digunakan dalam pembuatannya.
<br>

<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/diagram-act-1.avif" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Activity Diagram</i>
</p>

<br>

# Referensi
- Diagram UML: https://www.drawio.com/, https://staruml.io/