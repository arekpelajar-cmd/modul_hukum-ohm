// ===== data/materi.js — Data Subbab Materi Hukum Ohm =====

// Diagram rangkaian SVG tajam & presisi (stroke navy gelap, zigzag oranye/navy, baterai, label)
function buatDiagramMateri({ labelV = 'V', labelR = 'R', labelI = 'I' } = {}) {
  return `
    <svg viewBox="0 0 240 160" class="w-full max-w-[220px] mx-auto select-none" role="img" aria-label="Diagram Rangkaian Hukum Ohm">
      <title>Diagram Rangkaian Hukum Ohm</title>
      <!-- Kabel rangkaian persegi panjang -->
      <path d="M 40 30 L 95 30 M 145 30 L 200 30 L 200 130 L 40 130 L 40 85 M 40 65 L 40 30" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      
      <!-- Resistor Zigzag di sisi atas -->
      <polyline points="95,30 101,20 110,40 119,20 128,40 137,20 145,30" fill="none" stroke="var(--orange)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Label Resistor R -->
      <text x="120" y="14" font-size="13" font-weight="700" font-style="italic" fill="var(--ink)" text-anchor="middle">${labelR}</text>

      <!-- Simbol Baterai / Sumber Tegangan di sisi kiri -->
      <line x1="28" y1="68" x2="52" y2="68" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" />
      <line x1="33" y1="80" x2="47" y2="80" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" />
      <!-- Label Tegangan V -->
      <text x="16" y="77" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">${labelV}</text>

      <!-- Arah Arus di sisi bawah -->
      <circle cx="120" cy="130" r="3.5" fill="var(--blue)" />
      <!-- Label Arus I -->
      <text x="120" y="152" font-size="13" font-weight="700" font-style="italic" fill="var(--ink)" text-anchor="middle">${labelI}</text>
    </svg>
  `;
}

const MATERI = [
  {
    id: 'pengertian',
    judul: 'Hukum Ohm',
    tab: 'Pengertian',
    paragraf: 'Hukum Ohm menjelaskan hubungan antara tegangan (V), arus (I), dan hambatan (R) dalam suatu rangkaian listrik.',
    analogi: [
      { istilah: 'Tegangan', peran: 'Dorongan listrik.' },
      { istilah: 'Arus', peran: 'Aliran muatan listrik.' },
      { istilah: 'Hambatan', peran: 'Penghambat aliran listrik.' }
    ],
    audio: 'Hukum Ohm menjelaskan hubungan antara tegangan, arus, dan hambatan dalam rangkaian listrik. Tegangan adalah dorongan. Arus adalah aliran. Hambatan adalah penghambat.'
  },
  {
    id: 'rumus',
    judul: 'Rumus',
    paragraf: 'Kuat arus yang mengalir melalui penghantar berbanding lurus dengan tegangan dan berbanding terbalik dengan hambatan kawat penghantar.',
    rumus: 'V = I \\times R',
    rumusTeks: 'V = I x R',
    simbol: [
      { s: 'V', nama: 'Tegangan (Volt)' },
      { s: 'I', nama: 'Arus (Ampere)' },
      { s: 'R', nama: 'Hambatan (Ohm)' }
    ],
    audio: 'Rumus Hukum Ohm: V sama dengan I kali R. V adalah tegangan dalam volt. I adalah arus dalam ampere. R adalah hambatan dalam ohm.'
  },
  {
    id: 'contoh',
    judul: 'Contoh Soal',
    paragraf: 'Sebuah resistor 10 ohm diberi tegangan 20 V. Berapakah arus?',
    contoh: {
      diketahui: 'V = 20 V, R = 10 Ω',
      ditanya: 'Arus (I) = ... ?',
      jawabKaTeX: 'I = \\frac{V}{R} = \\frac{20}{10} = 2\\text{ A}',
      jawabTeks: 'I = V / R = 20 / 10 = 2 A',
      kesimpulan: 'Jadi, arus yang mengalir adalah 2 A.'
    },
    audio: 'Contoh soal. Resistor 10 ohm diberi tegangan 20 volt. Berapakah arus? Diketahui tegangan 20 volt dan hambatan 10 ohm. Jawab: I sama dengan V dibagi R, yaitu 20 dibagi 10 sama dengan 2 ampere.'
  },
  {
    id: 'latihan',
    judul: 'Latihan',
    paragraf: 'Pilih simulasi untuk mencoba, atau kerjakan kuis untuk berlatih.',
    ajakan: [
      {
        href: 'simulasi-ohm.html',
        judul: 'Coba di Simulasi',
        deskripsi: 'Atur tegangan dan hambatan, lalu amati perubahan arus.',
        ikon: 'activity',
        kelas: 'btn-primary'
      },
      {
        href: 'kuis.html',
        judul: 'Kerjakan Kuis',
        deskripsi: 'Uji pemahaman Hukum Ohm dengan soal interaktif.',
        ikon: 'clipboard-check',
        kelas: 'btn-outline'
      }
    ],
    audio: 'Pilih Coba di Simulasi untuk mencoba Hukum Ohm, atau Kerjakan Kuis untuk berlatih.'
  }
];

if (typeof window !== 'undefined') {
  window.MATERI = MATERI;
  window.buatDiagramMateri = buatDiagramMateri;
}
