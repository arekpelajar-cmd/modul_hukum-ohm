# Checklist Pengujian

| ID | Layar | Skenario | Hasil diharapkan | Status |
|---|---|---|---|---|
| T01 | Beranda | Klik Mulai Belajar | Menuju materi.html | |
| T02 | Beranda | Klik 4 kartu menu | Menuju halaman masing-masing | |
| T03 | Header | Klik Kembali dan Home | Navigasi benar di semua halaman | |
| T04 | Materi | Klik tiap subbab | Konten berganti tanpa reload, subbab aktif ditandai | |
| T05 | Materi | Tekan Audio dua kali | Putar lalu berhenti | |
| T06 | Materi | Subbab Rumus | Rumus KaTeX tampil | |
| T07 | Materi | Lanjut di subbab terakhir | Menuju simulasi-ohm.html | |
| T08 | Simulasi Ohm | Default 12 V / 6 Ω | Arus 2,00 A | |
| T09 | Simulasi Ohm | Geser slider / ketik angka | Hasil dan amperemeter berubah realtime | |
| T10 | Simulasi Ohm | Play/Pause, Reset, Cek | Animasi berhenti/jalan, nilai kembali 12 V/6 Ω, langkah hitung tampil | |
| T11 | Kuis | Pilih opsi dengan klik/keyboard; Submit sebelum memilih | Opsi radio terpilih; Submit nonaktif sebelum pilihan | |
| T12 | Kuis | Submit jawaban benar dan salah | Opsi terkunci dan ditandai; BENAR/SALAH, rumus, dan Ingat tampil | |
| T13 | Kuis | Selesaikan 10 soal | Pill bergerak 1/10–10/10 lalu kosong; hasil menampilkan skor/persen; 8/10 Lulus, 7/10 Ulangi | |
| T14 | Kuis | Ulangi dan bandingkan skor terbaik | Soal diacak ulang; skor terbaik tersimpan dan tidak turun | |
| T15 | Seri-Paralel | Default seri 10/20 Ω | 30 Ω, 0.40 A, 4 V, 8 V | |
| T16 | Seri-Paralel | Paralel 10/20 Ω | Rt 6.67 Ω, I 1.80 A, I1 1.20 A, I2 0.60 A | |
| T17 | Seri-Paralel | Modal Selesai dan 5 skenario tantangan | Periksa/Lewati berfungsi; skor 4/5 lulus, 3/5 belum lulus, skor terbaik tersimpan | |
| T18 | Seri-Paralel | Hint, Reset, Ringkasan, Tantangan | Hint sesuai mode; Reset mengakhiri tantangan; tab modal dapat dipilih | |
| T19 | Umum | Layar 320, 360, 390, 768 px dan zoom 200% | Tidak ada scroll horizontal; panel mengikuti breakpoint desktop/tablet/HP | |
| T20 | Umum | Navigasi keyboard dan tautan lewati konten | Urutan Tab logis; fokus jelas; tautan lewati menuju `<main>`; dialog menjaga fokus | |
| T21 | Umum | Buka Pengaturan dan aktifkan Kontras tinggi/Huruf besar | Preferensi tersimpan di Store dan berlaku setelah pindah halaman | |
| T22 | Simulasi | Aktifkan prefers-reduced-motion, uji Play dan Jeda | Titik tersembunyi saat berhenti; Play secara sengaja menjalankan arus; perubahan preferensi saat berjalan menghentikan animasi | |
| T23 | Umum | Jalankan axe-core pada semua halaman | Tidak ada pelanggaran WCAG A/AA; color-contrast diperiksa terpisah | |
| T24 | Umum | Periksa label input, SVG, link aset, dan sumber HTML | Semua input berlabel; SVG dekoratif tersembunyi; HTML tanpa emoji/hex | |
