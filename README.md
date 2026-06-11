
# 📓 Field Notes – Jurnal Belajar IT & Showcase Proyek

Ini adalah repositori kode sumber untuk website jurnal belajar pribadi saya di bidang **IT Networking, Web Development, dan System Administration**. Website ini mencatat praktikum harian, konfigurasi jaringan, eksperimen CSS/JS, serta menyimpan tautan ke proyek web latihan eksternal. Dibangun sebagai *personal branding* yang bersih, unik, dan fungsional – cocok untuk rekan sejawat, komunitas developer, maupun rekruter.

> 🔗 Website live: [fatah-journal.vercel.app](https://fatah-journal.vercel.app/)

---

## ✨ Fitur Unggulan

- **Buku Jurnal dengan Efek Kertas Fisik** – Desain *skeuomorphic* bergaris ala binder, lengkap dengan garis tepi merah dan latar kertas krem. Memberi nuansa jurnal manual yang hangat.
- **Daftar Catatan & Proyek Otomatis** – Cukup tambahkan file `.html` di folder `/catatan` atau file `.json` di folder `/proyek`, maka saat deploy website akan otomatis mengindeksnya tanpa perlu edit manual.
- **Dua Tab Cerdas** – Pisahkan antara catatan belajar dan daftar latihan web. Masing-masing tab memiliki sorting dan paginasi sendiri.
- **Pencarian Real-Time + Tombol Clear** – Filter langsung saat mengetik; tombol `✕` muncul otomatis dan mengosongkan pencarian.
- **Paginasi 20 Item per Halaman** – Nyaman untuk ratusan catatan tanpa lag.
- **Routing Dinamis (Tanpa Reload)** – Klik judul catatan akan memuat konten penuh via `?page=...`, tetap dalam satu halaman.
- **Mobile-First & Responsif** – Dioptimasi untuk diketik dan diedit langsung dari HP (Acode / Spck), namun tetap nyaman di desktop.
- **Build Script Otomatis (Node.js)** – Saat deployment, Vercel menjalankan `build.js` yang memindai folder `/catatan` dan `/proyek`, lalu menghasilkan file JSON statis untuk frontend.
- **Zero Framework** – Murni HTML5, CSS3, JavaScript Vanilla. Tidak ada React, Vue, Tailwind, atau jQuery.

---

## 🗂️ Struktur Kode & Manajemen Konten

Proyek ini disusun secara modular agar mudah dikelola dari smartphone:

| File / Folder | Fungsi |
|---------------|--------|
| `index.html` | Landing page minimalis: bio, showcase proyek terbaru, tautan ke jurnal. |
| `catatan.html` | Halaman jurnal utama dengan efek garis kertas, tab, search, sorting, paginasi, dan mode baca. |
| `style.css` | Semua gaya visual (CSS Custom Properties, efek kertas, komponen). |
| `script.js` | Logika frontend: fetch JSON, tab, search, sorting, paginasi, routing, tombol kembali. |
| `build.js` | Script Node.js untuk membaca folder `catatan/` dan `proyek/`, menghasilkan `daftar-catatan.json` & `daftar-proyek.json` (minified). |
| `package.json` | Konfigurasi npm dengan script `"build": "node build.js"` untuk Vercel. |
| `catatan/` | Folder berisi file HTML parsial (tanpa `<html>/<body>`) – setiap file adalah satu catatan. |
| `proyek/` | Folder berisi file JSON metadata proyek eksternal (judul, deskripsi, link, tanggal). |
| `.gitignore` | Mengabaikan `node_modules/` dan file JSON hasil build agar tidak konflik. |

---

## 💻 Cara Menjalankan Secara Lokal

Jika ingin menguji atau mengembangkan website ini di komputer/HP Anda:

1. **Clone repositori**  
   ```bash
   git clone https://github.com/username/field-notes-journal.git
   cd field-notes-journal
  ```

2. Buat folder konten contoh (jika belum ada)
   · Tambahkan file .html di catatan/
   · Tambahkan file .json di proyek/
   
        (lihat bagian Cara Menambah Catatan/Proyek di bawah)
3. Generate file JSON statis (wajib agar frontend tidak error)
      Pastikan Node.js terinstal, lalu jalankan:
   ```bash
   node build.js
   ```

   Perintah ini akan membuat daftar-catatan.json dan daftar-proyek.json di root.
4. Buka website
   · Buka index.html dengan browser (cukup klik dua kali).
   · Atau gunakan Live Server / ekstensi server lokal untuk pengalaman lebih baik.

---

📝 Cara Menambah Catatan atau Proyek Baru

🔹 Menambah Catatan Belajar

1. Buat file baru di folder /catatan dengan nama slug (huruf kecil, pisah dengan -), contoh: konfigurasi-vlan.html
2. Isi file dengan HTML parsial (tidak perlu <html> atau <body>):
   ```html
   <h2>Judul Catatan</h2>
   <p class="meta-date">Dipelajari pada: 12 Juni 2026 | Kategori: #Networking</p>
   <p>Isi catatan...</p>
   <pre><code>perintah atau kode</code></pre>
   <img src="https://contoh.com/gambar.jpg" alt="deskripsi">
   ```

3. Jalankan node build.js (atau push ke GitHub, nanti Vercel otomatis menjalankannya).

🔹 Menambah Proyek Web

1. Buat file .json di folder /proyek, contoh: aplikasi-cuaca.json
2. Isi dengan format berikut:
   ```json
   {
     "judul": "Aplikasi Cuaca Sederhana",
     "deskripsi": "Menggunakan API OpenWeatherMap dan fetch vanilla JS.",
     "link": "https://cuaca-latihan.vercel.app",
     "tanggal": "2026-06-11"
   }
   ```

3. Jalankan node build.js lagi.

Catatan: Setiap perubahan, jalankan node build.js agar JSON terbaru. Saat deploy ke Vercel, hal ini otomatis terjadi setiap push.

---

🚀 Deployment ke Vercel

Proyek ini dirancang khusus untuk deployment mudah di Vercel:

1. Push repositori ke GitHub (atau GitLab/Bitbucket).
2. Masuk ke vercel.com, klik Add New → Project.
3. Pilih repository Anda.
4. Atur Build Command menjadi npm run build
5. Atur Output Directory menjadi . (root)
6. Klik Deploy.

Vercel akan menjalankan build.js otomatis, menghasilkan file JSON, dan mendeploy seluruh website statis. Setiap git push berikutnya akan memicu redeploy otomatis.

---

🛠️ Teknologi yang Digunakan

· HTML5 & CSS3 – Struktur semantik, CSS Grid & Flexbox (tanpa framework)
· JavaScript (Vanilla ES6+) – Fetch API, URL routing, DOM manipulation
· Node.js – Hanya untuk build script (tidak digunakan di frontend)
· Google Fonts – Special Elite (judul) dan Inter (body) – diperbolehkan
· Vercel – Hosting + serverless build otomatis

---

📄 Lisensi & Hak Cipta

© 2026 [Nama Anda]. Dibangun untuk keperluan portofolio dan dokumentasi belajar pribadi.
Silakan gunakan kode ini sebagai referensi, namun jangan lupa untuk memberikan atribusi jika menyebarkan ulang.

---

🙋‍♂️ Tentang Saya

Saya seorang teknisi IT yang terus belajar Networking, Web Development, dan otomatisasi sistem. Jurnal ini adalah bukti nyata perjalanan saya – dari konfigurasi Cisco hingga membuat website tanpa framework.

Terima kasih sudah berkunjung!
– Fatahilah Miftahul Rahman

```