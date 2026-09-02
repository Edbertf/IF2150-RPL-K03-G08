<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 1
<br>
TOPIC BRAINSTORMING
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

<br>
<br>

# BAB 1: Analisis Permasalahan

## 1.1 Latar Belakang Masalah
Di satu sisi jutaan penduduk masih menghadapi kekurangan pangan, sementara di sisi lain jumlah makanan layak konsumsi yang terbuang malah terus meningkat setiap tahunnya. Berdasarkan laporan United Nations Environment Programme (UNEP) berjudul Food Waste Index 2024, total sampah makanan Indonesia per tahun mencapai 14,73 juta ton, setara dengan 54,33 kilogram per penduduk per tahun, menjadikan Indonesia sebagai negara penghasil sampah makanan rumah tangga terbanyak se-Asia Tenggara. Masalah ini terjelaskan dengan melihat komposisi sampah nasional, dimana data Kementerian Lingkungan Hidup dan Kehutanan (KLHK) mencatat bahwa pada 2023 sekitar 41% sampah di Indonesia merupakan sampah makanan, proporsi tertinggi dibandingkan jenis sampah lainnya, jauh lebih tinggi dibanding sampah plastik yang hanya 18,6%.

Sebagian besar dari sampah makanan ini sebenarnya masih layak dikonsumsi, namun terbuang akibat tidak adanya sistem yang menghubungkan pihak dengan makanan berlebih (seperti restoran, kafe, toko roti) dengan pihak yang membutuhkan, serta kurangnya alat bantu bagi pelaku usaha untuk merencanakan produksi secara tepat sejak awal. Persoalan ini bukan sekadar isu lingkungan, melainkan juga masalah sosial dan ekonomi yang serius. Kajian Bappenas bersama Waste4Change dan World Resources Institute memperkirakan kerugian ekonomi akibat sampah makanan di Indonesia mencapai Rp213-551 triliun per tahun, dan bila dimanfaatkan, kandungan gizinya diproyeksikan mampu mencukupi kebutuhan pangan 61-125 juta penduduk Indonesia. Di tingkat perkotaan, keadaan ini justru terlihat lebih jelas. Lebih dari 22 juta penduduk mengalami kerawanan pangan, termasuk sekitar 11,64 juta orang miskin, sementara sampah makanan terus menumpuk dari sisa produksi yang tidak habis dikonsumsi.

Permasalahan ini berkaitan langsung dengan dua Tujuan Pembangunan Berkelanjutan (SDGs). Fokus utama permasalahan ini adalah pada SDG 12 (Responsible Consumption and Production), yang memiliki tujuan pengurangan sebagian limbah pangan global di tingkat ritel dan konsumen pada 2030 (Target 12.3). Di sisi lain, upaya ini juga memberikan kontribusi terhadap SDG 2 (Zero Hunger) , khususnya pada Target 2.4 tentang keberlanjutan sistem produksi pangan. Sistem redistribusi makanan berlebih yang masih layak konsumsi kepada pihak yang membutuhkan adalah langkah konkret yang dapat dilakukan untuk memperkecil kesenjangan akses pangan tanpa harus menambah produksi baru. Mencegah produksi berlebih sejak awal, di samping menyalurkan kelebihan makanan ke yang membutuhkan, akan membantu dalam membuat sistem pangan lebih efisien dan berkelanjutan.

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
FoodLink merupakan platform berbasis website yang bertujuan untuk mengurangi pemborosan makanan oleh pelaku usaha *Food and Beverage* (F&B) melalui pengelolaan surplus makanan secara preventif dan redistributif. Ada 2 kelompok pengguna utama dari platform ini, yaitu pelaku usaha itu sendiri dan *Non-Governmental Organization* (NGO).

Dari sisi pelaku usaha, pengguna dapat melakukan pencatatan terkait jumlah stok dan penjualan, kemudian memperoleh rekomendasi jumlah produksi berdasarkan pola-pola penjualan sebelumnyha. Jadi, pelaku usaha dapat menyesuaikan produksi dengan rekomendasi untuk meminimalisir terjadinya *overproduction*. Pelaku usaha juga dapat memilih untuk mendonasikan surplusnya atau menjualnya kepada NGO dengan harga yang lebih murah. Dari sisi NGO, pengguna dapat melihat surplus makanan yang tersedia berdasarkan parameter-parameter seperti lokasi, jenis makanan, stok, batas waktu pengambilan, dan lain-lain. Jadi, produksi surplus memiliki peluang yang lebih besar untuk disalurkan ke pihak yang membutuhkan dibandingkan hanya menjadi limbah makanan 

Platform berbasis web menjadi pilihan dikarenakan fleksibilitas yang ditawarkan. Dengan website, pengguna tidak perlu menginstall aplikasi terpisah serta developer tidak perlu memikirkan kompatibilitas antar perangkat. Website juga sudah jelas dapat diakses oleh seluruh smartphone dan desktop yang memiliki browser. 

Nilai unik dari solusi ini adalah gabungan antara pencegahan serta redistribusi surplus. Berbeda dengan solusi yang hanya berfokus pada penanganan setelah terjadinya surplus, solusi ini membantu para pelaku usaha untuk meminimalisir terjadinya surplus sebelum produksi dilakukan. Ketika surplus tetap terjadi, solusi ini juga membuka jalur untuk redistribusi melalui donasi ataupun harga yang murah kepada NGO.

## 2.2 Asumsi dan Batasan
1. Asumsi Pengguna:
* Pelaku usaha diasumsikan memiliki data historis produksi dan penjualan yang cukup sebagai dasar pemberian rekomendasi
* Pelaku usaha diasumsikan bersedia untuk memasukkan data produksi dan penjualan  tersebut secara berkala
* Pelaku usaha diasumsikan mencantumkan informasi yang tepat mengenai jenis makanan, waktu, jumlah, dll
* Pelaku usaha diasumsikan hanya mencantumkan makanan yang layak konsumsi 
* NGO atau komunitas diasumsikan memiliki identitas yang dapat diverifikasi 
* NGO atau komunitas diasumsikan mampu untuk mengambil makanan yang di klaim

2. Asumsi Teknis:
* Pengguna diasumsikan memiliki perangkat yang dapat mengakses browser dan memiliki koneksi internet yang memadai
* Pengguna diasumsikan mampu mengoperasikan perangkat yang digunakan untuk mengakses web
* Pengguna diasumsikan mampu melakukan navigasi saat menggunakan web 

3. Batasan Resource:
* Pengembangkan dibatasi oleh waktu, sumber daya, dan jumlah developer karena masih dalam ruang lingkup akademik sehingga fokus ada pada pengembangan fitur utama seperti rekomendasi produksi, pencatatan surplus, dll
* Pengujian dilakukan dalam skala kecil sehingga tidak menjamin bahwa platform dapat bekerja secara efektif pada skala besar
* Sistem tidak mencakup integrasi langsung terhadap sistem internal pelaku usaha maupun NGO
* Sistem tidak menjamin keakuratan 100% mengenai rekomendasi jumlah produksi

4. Batasan Ruang Lingkup:
* Sistem tidak mengelola distribusi secara langsung kepada penerima manfaat
* Sistem hanya berfungsi sebagai penghubung antara pelaku usaha dan NGO
* Sistem tidak terlibat dalam pengangkutan atau penyimpanan makanan
* Keberhasilan distribusi tergantung pada ketersediaan NGO atau komuntas yang bersedia menerima surplus sehingga platform tidak menjamin seluruh surplus akan tersalurkan
* Sistem tidak melakukan pemeriksaan atau pengujian terhadap surplus yang dicantumkan

5. Batasan Hukum:
* Data pribadi yang terdapat pada sistem dikelola dengan mengacu pada UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi
* Pelaku usaha bertanggung jawab atas keamanan dan kelayakan makanan sesuai dengan UU No. 12 Tahun 2012 tentang Pangan

---

# BAB 3: Spesifikasi Kebutuhan dan Proses Bisnis

## 3.1 Identifikasi Aktor

| Aktor | Deskripsi |
| :--- | :--- |
| *Pemilik F&B* | *Pengguna ini bertindak sebagai pihak perwakilan dari bisnis F&B. Karakteristik dari pengguna ini adalah ia butuh UI/UX yang bagus dan nyaman untuk memasukkan data harian juga mengumumkan makanan yang berlebih agar dapat diambil.* |
| *Perwakilan NGO* | *Pengguna ini bertindak sebagai pihak penerima donasi yang telah terdaftar di FoodLink. Karakteristik dari pengguna ini adalah ia sering mengakses software, butuh informasi yang jelas terkait detail makanan, lokasi, dan batas waktu pengambilan makanan untuk segera diambil.* |
| *Admin Sistem* | *Pengguna ini bertindah sebagai pihak yang mengelola software, mulai dari verifikasi akun baru hingga keamanan* |


## 3.2 Kebutuhan Pengguna Awal

| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| US-01 | *Pemilik F&B* | *Memasukkan hasil data penjualan dan sisa produk harian* | *Sistem merekomendasikan prediksi produksi untuk hari berikutnya* |
| US-02 | *Pemilik F&B* | *Melihat rekomendasi dan prediksi produksi bahan harian* | *Merencanakan kebutuhan produksi untuk mencegah overproduksi kedepannya* |
| US-03 | *Pemilik F&B* | *Memilih opsi menjual surplus makanan dengan harga yang lebih murah atau didonasikan* | *Makanan layak konsumsi yang tak terjual dapat diberikan ke pihak yang membutuhkan* |
| US-04 | *Pemilik F&B* | *Mengumumkan daftar produksi yang berlebih* | *Pihak lain dapat ternotifikasi akan makanan surplus* |
| US-05 | *Perwakilan NGO* | *Melihat daftar makanan berlebih yang tersedia dan dekat dengan lokasi* | *Menemukan dan mengambil produksi makanan yang siap dijual murah atau didonasikan* |
| US-06 | *Perwakilan NGO* | *Mengklaim makanan yang sudah diambil* | *Mengamankan donasi agar tidak diklaim lagi oleh komunitas lain* |
| US-07 | *Admin Sistem* | *Verifikasi identitas pengguna baru* | *Mencegah pihak yang tidak terpercaya/bertanggung jawab di software* |

## 3.3 Deskripsi Aktivitas
Buatlah daftar seluruh aktivitas yang terdapat dalam sistem solusi, lengkap dengan ID dan penjelasan. Telusuri hubungan aktivitas tersebut dengan *user story* yang sudah dituliskan sebelumnya. Bisa dibuat dalam bentuk tabel.
| ID | Aktivitas | Penjelasan | ID User Story |
| :--- | :--- | :--- | :--- |
| A01 | *Melakukan Pemesanan* | *Pelanggan memulai proses dengan memesan produk.* | *US-01* |
| A02 | *Memproses Pesanan* | *Sistem memproses dan menyiapkan detail sesuai dengan pesanan.* | *US-02*|
| ... | ... | ... | ... |

## 3.4. Model Proses Bisnis
<br>

<p align="center">
<img alt="Contoh Diagram Swimlane" src="./assets/diagram/diagram- swimlane-1.jpg" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Diagram Swimlane</i>
</p>

<br>

# Referensi
- Diagram UML: https://www.drawio.com/, https://staruml.io/
- Food Waste Index Report 2024: https://www.unep.org/resources/publication/food-waste-index-report-2024
- Data Komposisi Sampah Nasional: https://mahasiswaindonesia.id/mengungkap-krisis-food-waste-di-perkotaan-bukti-data-dampak-nyata-dan-strategi-mitigasi-berkelanjutan/
- Surplus Indonesia: https://surplus.id/
- Sustainable Development Goals: https://sdgs.un.org/goals