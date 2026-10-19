# Catatan Storyboard

Sumber: `docs/ref/storyboard-asli.png`. Potongan per layar ada di `docs/ref/layar-1.png` sampai `layar-5.png` (dipakai sebagai acuan overlay saat menyamakan tampilan).

Judul storyboard: **Storyboard Prototipe Media Pembelajaran Interaktif, Hukum Ohm dan Rangkaian Seri-Paralel**.
Deskripsi: modul pembelajaran interaktif berbasis multimedia digital dengan integrasi elemen interaktif untuk siswa SMK (Teknik Elektro/Teknik Elektronika).

## Layar 1, Halaman Utama (Beranda)
Referensi: `docs/ref/layar-1.png` | File: `index.html`

| Aspek | Isi |
|---|---|
| Jenis Interaktivitas | Navigasi |
| Aksi Siswa | Memilih menu yang diinginkan |
| Respons Media | Menampilkan halaman sesuai pilihan |
| Tujuan | Memberikan kendali kepada siswa untuk mengakses bagian pembelajaran |

## Layar 2, Materi Hukum Ohm
Referensi: `docs/ref/layar-2.png` | File: `materi.html`

| Aspek | Isi |
|---|---|
| Jenis Interaktivitas | Kendali / Navigasi |
| Aksi Siswa | Membaca materi, menekan tombol audio, lalu klik "Lanjut" |
| Respons Media | Memutar audio dan membuka halaman berikutnya |
| Prinsip Desain | Segmentasi (materi dibagi menjadi bagian pendek) |

## Layar 3, Simulasi Hukum Ohm
Referensi: `docs/ref/layar-3.png` | File: `simulasi-ohm.html`

| Aspek | Isi |
|---|---|
| Jenis Interaktivitas | Manipulasi |
| Aksi Siswa | Mengubah nilai tegangan atau hambatan menggunakan slider |
| Respons Media | Nilai arus berubah secara langsung |
| Tujuan | Siswa mengamati hubungan antara V, I, dan R |

## Layar 4, Kuis Interaktif
Referensi: `docs/ref/layar-4.png` | File: `kuis.html`

| Aspek | Isi |
|---|---|
| Jenis Interaktivitas | Dialog |
| Aksi Siswa | Memilih jawaban dan menekan tombol submit |
| Respons Media | Menampilkan benar/salah + pembahasan |
| Degree / Ukuran | Minimal 80% jawaban benar |

## Layar 5, Simulasi Rangkaian Seri-Paralel
Referensi: `docs/ref/layar-5.png` | File: `simulasi-sp.html`

| Aspek | Isi |
|---|---|
| Jenis Interaktivitas | Manipulasi + Navigasi |
| Aksi Siswa | Memilih jenis rangkaian, mengubah nilai resistor, mengamati hasil |
| Respons Media | Menampilkan nilai hambatan total, arus, dan tegangan |
| Degree / Ukuran | Siswa mampu menganalisis minimal 80% skenario rangkaian dengan benar |

## Header tiap layar (untuk Fase 2)

| Layar | Kiri | Tengah | Kanan |
|---|---|---|---|
| 1 | Logo petir + "Modul Interaktif" | (kosong) | Home, Pengaturan, Profil (tombol bulat) |
| 2 | Kembali | Hukum Ohm | Audio + Home |
| 3 | Kembali | Simulasi Hukum Ohm | Ikon ? |
| 4 | Kembali | Latihan Hukum Ohm | Pill penghitung "4/10" |
| 5 | Kembali | Simulasi Rangkaian Seri-Paralel | Ikon ? |

## Warna terukur dari storyboard (untuk Fase 1)

| Elemen | Warna |
|---|---|
| Header | `#15497E` |
| Tombol utama, menu Materi | `#0062DD` |
| Sidebar aktif (Layar 2) | `#0355BB` |
| Sidebar tidak aktif | `#D9E8F9` |
| Menu Simulasi | `#1CB375` |
| Menu Latihan | `#FD7D17` |
| Menu Evaluasi | `#4530C3` |
