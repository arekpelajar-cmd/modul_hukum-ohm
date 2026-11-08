# Laporan Rasio Kontras

Rasio dihitung dengan rumus luminans relatif WCAG 2.2 menggunakan skrip Node.js satu kali yang dijalankan dari CLI dan tidak disimpan di repositori. Batas yang dipakai: **4.5:1** untuk teks normal dan **3:1** untuk batas/indikator antarmuka. Audit axe-core/jsdom tidak menguji `color-contrast`, karena jsdom tidak menyediakan rendering warna yang diperlukan.

## Token default

| Teks atau komponen latar | Rasio | Kriteria | Hasil |
|---|---:|---|---|
| Putih / `--navy` | 9.19:1 | Teks | Memenuhi |
| Putih / `--blue` | 5.54:1 | Teks | Memenuhi |
| Putih / `--green` | 2.71:1 | Teks dan ikon | **Tidak memenuhi** |
| Putih / `--orange` | 2.59:1 | Teks dan ikon | **Tidak memenuhi** |
| Putih / `--indigo` | 8.52:1 | Teks | Memenuhi |
| `--ink` / `--bg` | 14.50:1 | Teks | Memenuhi |
| `--ink` / `--box` | 14.12:1 | Teks | Memenuhi |
| Label abu transparan 50% (`#8792A0` setelah komposit) / putih | 3.16:1 | Teks | **Tidak memenuhi** |
| `--line` / putih | 1.42:1 | Komponen UI | **Tidak memenuhi** |
| `--track` / putih | 1.36:1 | Komponen UI | **Tidak memenuhi** |
| Fokus `--blue` / putih | 5.54:1 | Indikator fokus | Memenuhi |

Rasio teks putih pada hijau dan oranye juga berada di bawah batas 3:1 untuk ikon/indikator non-teks di atas putih. Mode kontras tinggi mengganti token tersebut dengan warna yang lebih gelap.

## Mode kontras tinggi

Mode ini memakai `--orange: #B94A00`, `--green: #126B45`, `--muted: #364152`, `--line: #718096`, dan `--track: #707C8A`. Token lain tetap mengikuti warna default.

| Teks atau komponen latar | Rasio | Kriteria | Hasil |
|---|---:|---|---|
| Putih / `--navy` | 9.19:1 | Teks | Memenuhi |
| Putih / `--blue` | 5.54:1 | Teks | Memenuhi |
| Putih / `--green` mode kontras tinggi | 6.53:1 | Teks dan ikon | Memenuhi |
| Putih / `--orange` mode kontras tinggi | 5.19:1 | Teks dan ikon | Memenuhi |
| Putih / `--indigo` | 8.52:1 | Teks | Memenuhi |
| `--ink` / `--bg` | 14.50:1 | Teks | Memenuhi |
| `--ink` / `--box` | 14.12:1 | Teks | Memenuhi |
| `--muted` / putih | 10.32:1 | Teks | Memenuhi |
| `--line` mode kontras tinggi / putih | 4.02:1 | Komponen UI | Memenuhi |
| `--track` mode kontras tinggi / putih | 4.25:1 | Komponen UI | Memenuhi |
| Fokus `--blue` / putih | 5.54:1 | Indikator fokus | Memenuhi |

Mode default dipertahankan agar warna storyboard tidak berubah. Aktifkan **Kontras tinggi** pada Pengaturan untuk memenuhi rasio pada teks hijau/oranye, label hasil, garis, dan track.
