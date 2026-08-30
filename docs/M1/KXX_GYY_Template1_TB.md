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
Di satu sisi jutaan penduduk masih menghadapi kekurangan pangan, sementara di sisi lain jumlah makanan layak konsumsi yang terbuang malah terus meningkat setiap tahunnya. Berdasarkan laporan United Nations Environment Programme (UNEP) berjudul Food Waste Index 2024, total sampah makanan Indonesia per tahun mencapai 14,73 juta ton, setara dengan 54,33 kilogram per penduduk per tahun, menjadikan Indonesia sebagai negara penghasil sampah makanan rumah tangga terbanyak se-Asia Tenggara. Masalah ini terjelaskan dengan melihat komposisi sampah nasional, dimana data Kementerian Lingkungan Hidup dan Kehutanan (KLHK) mencatat bahwa pada 2023 sekitar 41% sampah di Indonesia merupakan sampah makanan, proporsi tertinggi dibandingkan jenis sampah lainnya, jauh lebih tinggi dibanding sampah plastik yang hanya 18,6%.

Sebagian besar dari sampah makanan ini sebenarnya masih layak dikonsumsi, namun terbuang akibat tidak adanya sistem yang menghubungkan pihak dengan makanan berlebih (seperti restoran, kafe, toko roti) dengan pihak yang membutuhkan, serta kurangnya alat bantu bagi pelaku usaha untuk merencanakan produksi secara tepat sejak awal. Persoalan ini bukan sekadar isu lingkungan, melainkan juga masalah sosial dan ekonomi yang serius. Kajian Bappenas bersama Waste4Change dan World Resources Institute memperkirakan kerugian ekonomi akibat sampah makanan di Indonesia mencapai Rp213-551 triliun per tahun, dan bila dimanfaatkan, kandungan gizinya diproyeksikan mampu mencukupi kebutuhan pangan 61-125 juta penduduk Indonesia. Di tingkat perkotaan, keadaan ini justru terlihat lebih jelas. Lebih dari 22 juta penduduk mengalami kerawanan pangan, termasuk sekitar 11,64 juta orang miskin, sementara sampah makanan terus menumpuk dari sisa produksi yang tidak habis dikonsumsi.

Permasalahan ini berkaitan langsung dengan dua Tujuan Pembangunan Berkelanjutan (SDGs). Pertama, SDG 2 (Zero Hunger), yang bertujuan memastikan semua orang mendapat akses makanan yang aman dan bergizi, serta menjaga sistem produksi pangan tetap berkelanjutan. Sistem redistribusi makanan berlebih yang masih layak konsumsi kepada pihak yang membutuhkan adalah langkah konkret yang dapat dilakukan untuk memperkecil kesenjangan akses pangan tanpa harus menambah produksi baru. Kedua, SDG 12 (Responsible Consumption and Production), yang memiliki tujuan pengurangan sebagia limbah pangan global di tingkat ritel dan konsumen pada 2030. Mencegah produksi berlebih sejak awal, di samping menyalurkan kelebihan makanan ke yang membutuhkan, akan membantu dalam membuat sistem pangan lebih efisien dan berkelanjutan.

Urgensi penyelesaian masalah ini dapat diperhatikan dari beberapa aspek. Secara sosial, kesenjangan pangan terjadi bukan karena sedikitnya produksi, melainkan karena kurangnya perencanaan dan distribusi yang buruk. Makanan yang sebenarnya cukup untuk puluhan juta orang malah terbuang. Secara ekonomi pula, kerugian yang mencapai ratusan triliun rupiah per tahun merupakan pemborosan yang sangat besar bagi Indonesia. Kompleksnya masalah ini, yang melibatkan banyak pihak dan menuntut koordinasi waktu yang efisien (karena sifat makanan yang mudah rusak), menjadikannya sulit diselesaikan secara manual, sehingga diperlukan solusi berbasis perangkat lunak yang mampu membantu pelaku usaha merencanakan produksi secara lebih akurat sekaligus menghubungkan surplus yang tetap terjadi dengan pihak yang membutuhkan  secara cepat dan efisien.

## 1.2 Analisis Kondisi Saat Ini
Saat ini, sebagian besar pelaku usaha F&B di Indonesia masih menangani surplus makanan setelah surplus tersebut terjadi. Restoran, kafe, dan toko roti biasanya menentukan jumlah produksi berdasarkan perkiraan atau kebiasaan sehari-hari. Perkiraan tersebut belum tentu mempertimbangkan data penjualan sebelumnya, hari dalam seminggu, musim, cuaca, atau hari libur. Akibatnya, jumlah produksi terkadang tidak sesuai dengan permintaan dan menyisakan makanan yang tidak terjual pada akhir hari.

Salah satu solusi yang sudah tersedia di Indonesia adalah Surplus Indonesia atau Surplus.id. Aplikasi ini mempertemukan pelaku usaha F&B dengan konsumen yang ingin membeli makanan surplus dengan harga lebih murah. Melalui aplikasi tersebut, pelaku usaha dapat mengunggah produk yang belum terjual dan menawarkannya dengan diskon minimal 50% menjelang jam tutup. Surplus.id telah beroperasi di beberapa wilayah, seperti JABODETABEK, Bandung, Yogyakarta, dan Malang. Aplikasi ini memiliki misi untuk membantu mengurangi setengah jumlah sampah makanan di Indonesia pada 2030.

Walaupun memberikan dampak positif, Surplus.id masih memiliki beberapa keterbatasan. Pertama, aplikasi ini baru menangani makanan setelah surplus terjadi. Belum terdapat fitur yang membantu pelaku usaha memperkirakan jumlah produksi sebelum kegiatan produksi dilakukan. Artinya, aplikasi tersebut belum mencegah munculnya surplus dari awal, tetapi lebih berfokus pada menjual kembali makanan yang sudah terlanjur berlebih.

Kedua, Surplus.id menggunakan model komersial karena makanan surplus tetap harus dibeli oleh pengguna, meskipun harganya sudah didiskon. Model tersebut memang dapat membantu konsumen memperoleh makanan dengan harga lebih murah. Namun, masyarakat yang sama sekali tidak memiliki kemampuan untuk membeli makanan tetap belum dapat merasakan manfaatnya. Menurut kami, bagian ini masih menjadi kekurangan karena kelompok yang paling membutuhkan justru belum sepenuhnya terjangkau.

Selain itu, berdasarkan kajian terhadap ratusan ulasan pengguna, masih ditemukan beberapa masalah teknis dan operasional. Beberapa pengguna mengalami kendala pada proses transaksi. Fitur peta juga dinilai kurang tepat dalam menunjukkan lokasi mitra terdekat. Di sisi lain, harga produk terkadang dianggap tidak wajar karena pengawasan terhadap mitra masih terbatas. Metode pembayaran yang tersedia juga lebih banyak bergantung pada dompet digital. Jangkauan mitranya pun masih terkonsentrasi di kota-kota besar sehingga pengguna dari wilayah lain belum dapat menggunakan layanan ini secara maksimal.

Berdasarkan kondisi tersebut, terdapat dua masalah utama yang belum sepenuhnya diselesaikan oleh solusi yang ada. Masalah pertama adalah belum adanya mekanisme prediksi yang membantu pelaku usaha mencegah surplus sejak tahap perencanaan produksi. Masalah kedua adalah belum tersedianya jalur donasi yang terintegrasi untuk menyalurkan makanan kepada masyarakat yang tidak memiliki daya beli.

Oleh karena itu, solusi perangkat lunak yang dikembangkan dalam proyek ini akan menggabungkan dua pendekatan. Pendekatan pertama adalah membantu pelaku usaha memperkirakan kebutuhan produksi agar jumlah makanan berlebih dapat dikurangi sejak awal. Pendekatan kedua adalah menyalurkan surplus yang tetap terjadi kepada pihak yang membutuhkan. Dengan menggabungkan pencegahan dan redistribusi, solusi yang dikembangkan diharapkan dapat mendukung pencapaian SDG 2 dan SDG 12 secara bersamaan.



---

# BAB 2: Analisis Solusi

## 2.1 Deskripsi Perangkat Lunak
Abstraksikan solusi perangkat lunak yang diusulkan dari sudut pandang pengguna. Jelaskan target platform yang akan digunakan (misalnya: desktop application) beserta alasan pemilihannya. Deskripsikan juga nilai unik (inovasi inti) dari perangkat lunak kalian dan apa yang membedakannya dari solusi yang sudah ada.

## 2.2 Asumsi dan Batasan
Definisikan secara tegas asumsi (baik teknis maupun dari sisi pengguna) yang menjadi dasar pengembangan. Tuliskan batasan seperti regulasi/hukum, keterbatasan sumber daya, dan ruang lingkup solusi.

---

# BAB 3: Spesifikasi Kebutuhan dan Proses Bisnis

## 3.1 Identifikasi Aktor
Buatlah daftar seluruh aktor (pengguna) yang akan berinteraksi langsung dengan sistem solusi yang kalian kembangkan. Berikan penjelasan singkat mengenai peran dan karakteristik dari masing-masing aktor tersebut.

| Aktor | Deskripsi |
| :--- | :--- |
| *Kasir* | *Pengguna ini bertindak sebagai pihak yang bertanggung jawab untuk memproses transaksi harian dan melayani pembayaran pelanggan. Karakteristik dari pengguna ini adalah mengutamakan kecepatan dan keakuratan saat bertransaksi.* |
| ... | ... |


## 3.2 Kebutuhan Pengguna Awal
Definisikan apa yang ingin dicapai oleh pengguna saat menggunakan sistem ini dalam format *User Story* (Sebagai [Aktor], saya ingin [Aktivitas/Kebutuhan], sehingga [Tujuan/Nilai]). Pastikan kalian berfokus pada "apa yang ingin dilakukan pengguna".

| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| US-01 | *Kasir* |  *Memindai barcode barang* | *Proses pembayaran berjalan cepat dan akurat* |
| US-02 | *[Nama Aktor]* | *[Kebutuhan pengguna]* | *[Tujuan yang dicapai pengguna]* |
| ... | ... | ... | ... |

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
