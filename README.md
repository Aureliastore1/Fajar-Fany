# Undangan Fajar & Fany — Panduan Pengisian

## 1. Musik latar
Player musik sudah siap jalan otomatis, tinggal isi filenya:
1. Siapkan file MP3 yang **kamu miliki hak/lisensinya sendiri** (lagu yang dibeli, instrumental royalty-free, atau rekaman sendiri).
2. Beri nama file itu `music.mp3`.
3. Simpan ke folder `assets/music.mp3` (menimpa file kosong yang ada).

Tidak perlu ubah kode apa pun — `index.html` sudah menunggu file di path itu.

## 2. Foto galeri & foto mempelai
Saat ini galeri dan foto mempelai masih berupa **kotak placeholder** (belum foto asli), supaya tidak ada foto berhak cipta/acak yang terpasang tanpa izin.

Untuk mengisi foto asli:
1. Simpan foto ke `assets/img/gallery/` (untuk galeri) dan `assets/img/` (untuk foto mempelai).
2. Di `index.html`, cari elemen `<div class="couple-photo" data-placeholder="...">` dan `<div class="gallery-item ...">`, lalu ganti isinya dengan tag `<img src="assets/img/nama-file.jpg" alt="...">`.

Contoh mengganti satu foto galeri:
```html
<!-- sebelum -->
<div class="gallery-item tall"><span>Foto 1</span></div>

<!-- sesudah -->
<div class="gallery-item tall">
  <img src="assets/img/gallery/foto1.jpg" alt="Fajar & Fany">
</div>
```

## 3. Struktur file
```
undangan/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── music.mp3        ← isi sendiri
│   └── img/
│       └── gallery/      ← isi sendiri
└── README.md
```

## 4. Fitur yang sudah jalan
- Loading screen → transisi cover "smooth garden reveal" (fade + stagger)
- Tombol "Buka Undangan" memicu musik + transisi ke isi undangan
- Scroll-reveal tiap section (Intersection Observer)
- Simpan Tanggal ke Google Calendar (Akad & Resepsi)
- Tombol "Lihat Peta" (akad pakai pencarian alamat, resepsi pakai link yang kamu berikan)
- RSVP tersimpan di browser (localStorage) — tanpa perlu server
- Salin nomor rekening BCA sekali klik

## 5. Kalau mau tambah backend RSVP sungguhan
Saat ini RSVP hanya tersimpan di browser tamu masing-masing (tidak terkumpul ke satu tempat). Kalau ingin semua RSVP masuk ke satu Google Sheet/database, kabari saja — bisa dibantu sambungkan ke Google Form/Sheets API atau layanan sejenis.
