# ⚡ Media Pembelajaran Interaktif: Hukum Ohm & Rangkaian Seri-Paralel

![HTML5](https://img.shields.io/badge/HTML-5-E34F26) ![CSS3](https://img.shields.io/badge/CSS-3-1572B6) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E) ![License](https://img.shields.io/badge/License-MIT-green)

Media pembelajaran web interaktif untuk siswa SMK Teknik Elektro/Elektronika, berbasis storyboard 5 layar. Tanpa framework, tanpa build, tanpa `npm install`.

## 1. Fitur Utama
- **Layar 1 Beranda**: hero, tombol Mulai Belajar, 4 kartu menu (Materi, Simulasi, Latihan, Evaluasi).
- **Layar 2 Materi**: 4 subbab tanpa reload, rumus KaTeX, diagram SVG, audio (Web Speech API), tombol Lanjut.
- **Layar 3 Simulasi Ohm**: slider V (1–24) dan R (1–100), arus realtime, animasi titik arus, gelang warna resistor, Play/Pause, Reset, Cek.
- **Layar 4 Kuis**: 10 soal diacak, umpan balik + pembahasan, lulus ≥ 80%, skor terbaik di localStorage.
- **Layar 5 Seri-Paralel**: toggle seri/paralel, R1/R2, hasil lengkap, Hint, Reset, serta modal Selesai dengan Ringkasan dan Tantangan 5 skenario (lulus ≥ 4).

## 2. Struktur Folder
```
media-ohm/
├── index.html · materi.html · simulasi-ohm.html · kuis.html · simulasi-sp.html
├── css/style.css
├── js/ common.js · materi.js · ohm.js · kuis.js · seripararel.js
├── data/ soal.js · materi.js
├── assets/ img/ · audio/
└── docs/ storyboard-notes.md · test-checklist.md
```

## 3. Menjalankan Lokal
1. Buka `index.html` langsung di browser, atau
2. VS Code → pasang ekstensi **Live Server** → klik kanan `index.html` → *Open with Live Server*.

Butuh internet saat pertama dibuka (CDN Tailwind, KaTeX, Google Fonts).

## 4. Deploy ke GitHub Pages
1. Push repo ke GitHub. 2. **Settings → Pages**. 3. Source: *Deploy from a branch*, branch `main`, folder `/ (root)`, Save. 4. Tunggu 1–2 menit; URL: `https://USERNAME.github.io/media-ohm/`.
5. **QR code**: tempel URL ke generator QR (mis. qr-code-generator.com), unduh PNG, simpan di `assets/img/qr.png`.

## 5. WORKFLOW PENGERJAAN

### Fase 0: Setup
- **Tujuan**: lingkungan siap. **File**: –. **Estimasi**: 1 jam.
- [ ] Pasang VS Code + Live Server
- [ ] Pasang Git, buat repo GitHub, clone
- [ ] Buat branch `dev`
- **DoD**: Live Server membuka halaman kosong dan push pertama berhasil.

### Fase 1: Kerangka & navigasi
- **Tujuan**: semua halaman terhubung. **File**: 5 HTML, `common.js`, `style.css`. **Estimasi**: 2 jam.
- [ ] Buat 5 HTML dengan `<header id="hdr">`
- [ ] Render header (Kembali, judul, Home) dari `common.js`
- [ ] Pasang CDN Tailwind, KaTeX, Poppins
- **DoD**: semua tautan berpindah halaman, tidak ada 404.

### Fase 2: Layar 1 & 2
- **Tujuan**: konten statis, tab, audio, rumus. **File**: `index.html`, `materi.html`, `materi.js`, `data/materi.js`. **Estimasi**: 4 jam.
- [ ] Hero + 4 kartu menu
- [ ] Sidebar subbab + penanda aktif
- [ ] Rumus KaTeX + diagram SVG
- [ ] Audio toggle + fallback
- [ ] Tombol Lanjut
- **DoD**: subbab berganti tanpa reload, audio bisa diputar/dihentikan, rumus tampil.

### Fase 3: Layar 3
- **Tujuan**: simulasi Ohm. **File**: `simulasi-ohm.html`, `ohm.js`. **Estimasi**: 5 jam.
- [ ] SVG rangkaian + gelang warna
- [ ] Slider + kotak nilai tersinkron
- [ ] Hitung I = V/R realtime
- [ ] Animasi titik arus, Play/Pause, Reset, Cek
- **DoD**: 12 V / 6 Ω → 2,00 A; kecepatan titik naik bila I naik.

### Fase 4: Layar 5
- **Tujuan**: seri/paralel + tantangan. **File**: `simulasi-sp.html`, `seripararel.js`. **Estimasi**: 5 jam.
- [ ] Toggle mode + diagram + rumus
- [ ] Panel hasil (dan arus cabang)
- [ ] Hint, Reset, Selesai
- [ ] 5 skenario tantangan + penilaian ≥ 4/5
- **DoD**: default seri 30 Ω, 0,40 A, 4 V, 8 V; semua skenario dapat diselesaikan.

### Fase 5: Layar 4
- **Tujuan**: kuis. **File**: `kuis.html`, `kuis.js`, `data/soal.js`. **Estimasi**: 4 jam.
- [ ] 10 soal 3 tingkat
- [ ] Submit nonaktif sebelum memilih
- [ ] Umpan balik, pembahasan, Ingat
- [ ] Skor, persen, Lulus/Ulangi, skor terbaik
- **DoD**: urutan teracak tiap sesi; 8/10 = Lulus.

### Fase 6: Polish
- **Tujuan**: responsif, aksesibel, cepat. **File**: semua. **Estimasi**: 3 jam.
- [ ] Uji lebar 360–1280 px
- [ ] Label, aria, kontras, fokus keyboard
- [ ] Animasi tidak berjalan otomatis; klik Play menjadi persetujuan eksplisit untuk memutarnya, termasuk saat `prefers-reduced-motion` aktif
- **DoD**: tidak ada scroll horizontal; seluruh fitur bisa dipakai dengan keyboard.

### Fase 7: Pengujian
- **Tujuan**: temukan bug. **File**: `docs/test-checklist.md`. **Estimasi**: 4 jam.
- [ ] Uji fungsional semua ID checklist
- [ ] Chrome, Edge, Firefox, Safari, Android/iOS
- [ ] Uji coba ke 3–5 siswa dan catat masukan
- **DoD**: semua status "Lulus", bug kritis nol.

### Fase 8: Deploy & dokumentasi
- **Tujuan**: rilis. **File**: `README.md`, `docs/`. **Estimasi**: 2 jam.
- [ ] Merge `dev` → `main`
- [ ] Aktifkan GitHub Pages
- [ ] Buat QR code, cek URL publik
- **DoD**: situs publik berjalan, README akurat.

## 6. Panduan Git
- Branch: `main` (rilis), `dev` (integrasi), `feature/layar-1` … `feature/layar-5`.
- Commit: `feat:` fitur, `fix:` perbaikan, `docs:` dokumentasi, `style:` tampilan/format.
```bash
git checkout dev && git checkout -b feature/layar-3
git add . && git commit -m "feat: slider tegangan dan hambatan"
git checkout dev && git merge feature/layar-3
git checkout main && git merge dev && git push origin main
```

## 7. Mengedit Konten
**Soal** (`data/soal.js`, `benar` = indeks 0–3):
```js
{ level:'Mudah', q:'Berapa arus pada 12 V dan 4 Ω?', opsi:['1 A','3 A','4 A','48 A'], benar:1, bahas:'I = 12/4 = 3 A.' }
```
**Materi** (`data/materi.js`): ubah `html` (tampilan) dan `audio` (teks yang dibacakan) pada subbab terkait. Rumus: `<span data-tex="V=I\\times R"></span>`.

## 8. Pemetaan Storyboard → File → Fungsi
| Layar | File | Fungsi utama |
|---|---|---|
| 1 | index.html | `renderHeader()` |
| 2 | materi.html, materi.js | `tampil()`, `renderMath()`, tombol audio |
| 3 | simulasi-ohm.html, ohm.js | `ubah()`, `HITUNG()`, `gelang()`, `frame()` |
| 4 | kuis.html, kuis.js | `mulai()`, `soal()`, `kirim()`, `hasil()` |
| 5 | simulasi-sp.html, seripararel.js | `hitung()`, `gambar()`, `tampilTant()` |

## 9. Rumus & Verifikasi
| Rumus | Contoh |
|---|---|
| I = V/R | 12 / 6 = **2,00 A** |
| Seri: Rt = R1+R2; I = V/Rt; Vn = I·Rn | 10+20 = **30 Ω**; 12/30 = **0,40 A**; V1 = **4 V**; V2 = **8 V** |
| Paralel: Rt = R1·R2/(R1+R2); In = V/Rn | 10‖20 = **6,67 Ω**; I1 = 1,20 A; I2 = 0,60 A; I = 1,80 A |

## 10. Troubleshooting
- **Audio tidak bunyi**: pakai Chrome/Edge, naikkan volume, pastikan ada suara bahasa Indonesia (id-ID) di sistem.
- **KaTeX tidak tampil**: cek koneksi internet/CDN; teks rumus biasa tetap muncul sebagai cadangan.
- **localStorage terblokir** (mode privat): aplikasi tetap jalan, hanya skor terbaik tidak tersimpan.

## 11. Pengembangan Lanjut
Mode gelap, daya (P = V·I), rangkaian campuran, ekspor skor, versi PWA offline.

## 12. Pengaturan dan Profil di Beranda
- **Pengaturan** (ikon gerigi di header Beranda): Menyediakan sakelar suara materi (`suara`) dan opsi reset progres (`kuisBest`, `spBest`) tanpa menghapus identitas nama siswa.
- **Profil** (ikon pengguna di header Beranda): Menyimpan nama siswa (`nama`) dan menampilkan ringkasan skor kuis terbaik serta pencapaian tantangan seri-paralel.

## 13. Cara Memakai Overlay (Alat Bantu Pengembangan)
Buka `docs/overlay.html` di browser (misalnya via Live Server atau file://):
- URL default: `docs/overlay.html?page=../index.html&ref=ref/layar-1.png`.
- Tersedia kontrol slider opacity, lebar referensi, posisi offset X/Y, dan tombol salin konfigurasi.
- *Catatan*: Alat ini hanya digunakan untuk tahap pengembangan/verifikasi visual dan akan dihapus saat rilis.

## 14. Lisensi
MIT, lihat [LICENSE](LICENSE).
