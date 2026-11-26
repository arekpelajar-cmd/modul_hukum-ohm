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

function buatDiagramRangkaianMateri(jenis) {
  const resistor = (x, y, label, labelY = y - 18) => `
    <path d="M${x} ${y}h8 M${x + 72} ${y}h8" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round"/>
    <polyline points="${x + 8},${y} ${x + 16},${y - 8} ${x + 24},${y + 8} ${x + 32},${y - 8} ${x + 40},${y + 8} ${x + 48},${y - 8} ${x + 56},${y + 8} ${x + 64},${y - 8} ${x + 72},${y}" fill="none" stroke="var(--orange)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="${x + 40}" y="${labelY}" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">${label}</text>
  `;
  const source = voltage => `
    <path d="M65 55V92 M65 124V200H450V55" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="52" y1="100" x2="78" y2="100" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
    <line x1="57" y1="116" x2="73" y2="116" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
    <text x="42" y="145" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">${voltage}</text>
  `;

  if (jenis === 'seri') {
    return `
      <svg viewBox="0 0 500 245" class="materi-circuit-svg" role="img" aria-labelledby="diagram-seri-title diagram-seri-desc">
        <title id="diagram-seri-title">Diagram Rangkaian Seri</title>
        <desc id="diagram-seri-desc">Sumber tegangan listrik 10 Volt mengalirkan kuat arus melalui resistor R1 2 Ohm, R2 3 Ohm, dan R3 5 Ohm dalam satu jalur tertutup.</desc>
        ${source('10 V')}
        ${resistor(90, 55, 'R1 = 2 Ω')}
        ${resistor(195, 55, 'R2 = 3 Ω')}
        ${resistor(300, 55, 'R3 = 5 Ω')}
        <path d="M65 55H90 M170 55H195 M275 55H300 M380 55H450" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round"/>
        <text x="250" y="229" font-size="14" font-weight="700" fill="var(--blue)" text-anchor="middle">Kuat arus listrik sama di setiap resistor: I = 1 A</text>
      </svg>
    `;
  }

  if (jenis === 'paralel') {
    return `
      <svg viewBox="0 0 500 270" class="materi-circuit-svg" role="img" aria-labelledby="diagram-paralel-title diagram-paralel-desc">
        <title id="diagram-paralel-title">Diagram Rangkaian Paralel</title>
        <desc id="diagram-paralel-desc">Sumber tegangan listrik 12 Volt terhubung pada tiga cabang paralel: R1 6 Ohm dengan kuat arus 2 Ampere, R2 3 Ohm dengan kuat arus 4 Ampere, dan R3 2 Ohm dengan kuat arus 6 Ampere.</desc>
        <path d="M120 65V190 M360 65V190 M120 65H200 M280 65H360 M120 120H200 M280 120H360 M120 175H200 M280 175H360 M120 190V220H228 M252 220H360V190" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        ${resistor(200, 65, 'R1 = 6 Ω', 45)}
        ${resistor(200, 120, 'R2 = 3 Ω', 100)}
        ${resistor(200, 175, 'R3 = 2 Ω', 155)}
        <line x1="235" y1="207" x2="235" y2="233" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <line x1="245" y1="213" x2="245" y2="227" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <text x="405" y="70" font-size="12" font-weight="700" fill="var(--blue)">I1 = 2 A</text>
        <text x="405" y="125" font-size="12" font-weight="700" fill="var(--blue)">I2 = 4 A</text>
        <text x="405" y="180" font-size="12" font-weight="700" fill="var(--blue)">I3 = 6 A</text>
        <text x="240" y="253" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Tegangan Sumber 12 V · I total = 12 A</text>
      </svg>
    `;
  }

  if (jenis === 'gabungan') {
    return `
      <svg viewBox="0 0 500 245" class="materi-circuit-svg" role="img" aria-labelledby="diagram-gabungan-title diagram-gabungan-desc">
        <title id="diagram-gabungan-title">Diagram Rangkaian Gabungan Seri-Paralel</title>
        <desc id="diagram-gabungan-desc">Sumber tegangan listrik 12 Volt menyuplai resistor R1 dan R2 (masing-masing 10 Ohm) yang tersusun seri, dilanjutkan cabang paralel R3 dan R4 (masing-masing 8 Ohm).</desc>
        <path d="M65 55V92 M65 124V200H430V55 M65 55H90 M170 55H190 M270 55H300 M380 55H430 M300 55V140 M300 140H320 M400 140H430 M430 55V200" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="52" y1="100" x2="78" y2="100" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <line x1="57" y1="116" x2="73" y2="116" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <text x="42" y="145" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">12 V</text>
        ${resistor(90, 55, 'R1 = 10 Ω', 32)}
        ${resistor(190, 55, 'R2 = 10 Ω', 32)}
        ${resistor(300, 55, 'R3 = 8 Ω', 32)}
        ${resistor(320, 140, 'R4 = 8 Ω', 117)}
        <text x="250" y="229" font-size="14" font-weight="700" fill="var(--blue)" text-anchor="middle">Rangkaian Seri: R1, R2 · Rangkaian Paralel: R3, R4</text>
      </svg>
    `;
  }

  return '';
}

const MATERI = [
  {
    id: 'tujuan',
    judul: 'Tujuan Pembelajaran',
    tab: 'Tujuan Pembelajaran',
    paragraf: 'Modul interaktif ini dirancang untuk memfasilitasi pemahaman komprehensif mengenai prinsip kelistrikan arus searah (DC), Hukum Ohm, serta karakteristik rangkaian seri, paralel, dan gabungan melalui simulasi visual dan perhitungan bertahap.',
    poinTujuan: [
      {
        kategori: 'Konsep Besaran Listrik DC',
        deskripsi: 'Mengidentifikasi dan memahami konsep dasar besaran kelistrikan arus searah (DC) beserta satuan baku Sistem Internasional (SI), meliputi <strong>Tegangan Listrik (<span data-tex="V">V</span>)</strong> dalam <em>Volt (V)</em>, <strong>Kuat Arus Listrik (<span data-tex="I">I</span>)</strong> dalam <em>Ampere (A)</em>, dan <strong>Hambatan Listrik (<span data-tex="R">R</span>)</strong> dalam <em>Ohm (Ω)</em>.'
      },
      {
        kategori: 'Hubungan Matematis Hukum Ohm',
        deskripsi: 'Menganalisis hubungan kesebandingan fisis antara beda potensial (tegangan listrik) dan kuat arus listrik, serta hubungan berbanding terbalik antara kuat arus listrik dan nilai hambatan listrik sesuai persamaan <span data-tex="V = I \\times R">V = I × R</span>.'
      },
      {
        kategori: 'Karakteristik Rangkaian Listrik',
        deskripsi: 'Membandingkan dan menyimpulkan karakteristik pembagian tegangan listrik dan aliran kuat arus listrik pada <strong>Rangkaian Seri</strong> (<span data-tex="I_{\\text{total}} = I_1 = I_2">I total sama</span>), <strong>Rangkaian Paralel</strong> (<span data-tex="V_{\\text{total}} = V_1 = V_2">V total sama</span>), maupun <strong>Rangkaian Gabungan</strong>.'
      },
      {
        kategori: 'Perhitungan Sistematis',
        deskripsi: 'Menyelesaikan permasalahan perhitungan besaran kelistrikan dan hambatan total pengganti (<span data-tex="R_{\\text{total}}">R total</span>) secara terstruktur melalui alur 4 tahap baku: <em>Diketahui & Ditanya</em>, <em>Rumus</em>, <em>Substitusi</em>, dan <em>Hasil Perhitungan Akhir</em> lengkap beserta satuan SI.'
      }
    ],
    petunjuk: 'Pelajarilah setiap materi secara berurutan menggunakan navigasi subbab bernomor di sebelah kiri atau tombol navigasi "Lanjut" di bagian bawah. Anda juga dapat langsung menguji konsep teori pada simulasi interaktif yang disediakan.',
    audio: 'Selamat datang pada modul interaktif Hukum Ohm. Tujuan pembelajaran modul ini meliputi pemahaman konsep dasar besaran listrik tegangan, kuat arus, dan hambatan, analisis hubungan matematis Hukum Ohm, perbandingan karakteristik rangkaian seri dan paralel, serta penguasaan alur perhitungan kelistrikan secara sistematis.'
  },
  {
    id: 'arus-dc',
    judul: 'Dasar Listrik DC',
    tab: 'Listrik DC',
    paragraf: 'Kuat arus listrik searah (DC/Direct Current) mengalir secara konstan dalam satu arah tertentu. Sumber tegangan listrik DC menyediakan beda potensial yang mendorong muatan listrik mengalir ketika rangkaian berada dalam keadaan tertutup.',
    sumber: [
      { nama: 'Baterai (Elemen Kering)', contoh: 'Sumber tegangan listrik DC kimia portabel, contohnya pada senter, jam dinding, dan remote kontrol.' },
      { nama: 'Akumulator / Aki (Elemen Basah)', contoh: 'Sumber tegangan listrik DC yang dapat diisi ulang, umum digunakan sebagai penyedia daya starter pada kendaraan bermotor.' },
      { nama: 'Catu Daya DC (Power Supply / Adaptor)', contoh: 'Perangkat penyearah yang mengubah tegangan bolak-balik (AC) menjadi tegangan listrik DC stabil untuk perangkat elektronik.' },
      { nama: 'Panel Surya (Sel Fotovoltaik)', contoh: 'Mengubah energi foton dari sinar matahari secara langsung menjadi energi listrik DC yang ramah lingkungan.' }
    ],
    arahArus: 'Pada konvensi diagram kelistrikan, arah kuat arus listrik ditetapkan mengalir dari kutub berpotensial tinggi (positif) menuju kutub berpotensial rendah (negatif). Sebaliknya, aliran fisik muatan elektron sebenarnya bergerak dari kutub negatif menuju kutub positif.',
    simbol: [
      { s: 'V', nama: 'Tegangan Listrik (Beda Potensial), satuan baku Volt (V)' },
      { s: 'I', nama: 'Kuat Arus Listrik, satuan baku Ampere (A)' },
      { s: 'R', nama: 'Hambatan Listrik (Resistansi), satuan baku Ohm (Ω)' }
    ],
    audio: 'Kuat arus searah atau DC mengalir secara konstan dalam satu arah. Contoh sumber tegangan listrik DC meliputi baterai, aki, catu daya DC, dan panel surya. Pada diagram, arah arus konvensional mengalir dari kutub positif ke negatif, sedangkan elektron bergerak berlawanan arah.'
  },
  {
    id: 'pengertian',
    judul: 'Hukum Ohm',
    tab: 'Pengertian',
    paragraf: 'Hukum Ohm menyatakan bahwa pada kondisi suhu dan fisik penghantar yang konstan, kuat arus listrik yang mengalir melalui suatu penghantar berbanding lurus dengan beda potensial (tegangan listrik) di antara kedua ujungnya, serta berbanding terbalik dengan hambatan listriknya. Analogi aliran air dapat digunakan untuk mempermudah pemahaman konsep fisis ini.',
    analogi: [
      { istilah: 'Tegangan Listrik (V)', peran: 'Dorongan atau tekanan listrik yang memaksa muatan bergerak (setara dengan tekanan dorong pompa air).' },
      { istilah: 'Kuat Arus Listrik (I)', peran: 'Laju jumlah muatan listrik yang mengalir tiap detik (setara dengan volume debit aliran air pada pipa).' },
      { istilah: 'Hambatan Listrik (R)', peran: 'Rintangan yang menghambat kelancaran laju muatan listrik (setara dengan penyempitan diameter pipa air).' }
    ],
    audio: 'Hukum Ohm menjelaskan hubungan antara tegangan listrik, kuat arus listrik, dan hambatan listrik. Tegangan listrik berfungsi sebagai pendorong muatan, kuat arus listrik adalah laju aliran muatan, dan hambatan listrik adalah rintangan yang menahan aliran arus tersebut.'
  },
  {
    id: 'rumus',
    judul: 'Rumus Hukum Ohm',
    paragraf: 'Hubungan antara tegangan listrik, kuat arus listrik, dan hambatan listrik dirumuskan secara matematis dalam tiga bentuk persamaan. Pilihlah bentuk rumus yang sesuai dengan besaran yang ingin dicari, dan pastikan seluruh nilai telah menggunakan satuan baku Sistem Internasional (SI).',
    rumus: 'V = I \\times R',
    rumusTeks: 'V = I × R',
    bentukRumus: [
      { label: 'Tegangan Listrik (V)', rumus: 'V = I \\times R', teks: 'V = I × R' },
      { label: 'Kuat Arus Listrik (I)', rumus: 'I = \\dfrac{V}{R}', teks: 'I = V / R' },
      { label: 'Hambatan Listrik (R)', rumus: 'R = \\dfrac{V}{I}', teks: 'R = V / I' }
    ],
    simbol: [
      { s: 'V', nama: 'Tegangan Listrik (satuan Volt, disingkat V)' },
      { s: 'I', nama: 'Kuat Arus Listrik (satuan Ampere, disingkat A)' },
      { s: 'R', nama: 'Hambatan Listrik (satuan Ohm, disimbolkan Ω)' }
    ],
    simulasi: {
      href: 'simulasi-ohm.html',
      judul: 'Uji Eksperimen Hukum Ohm',
      deskripsi: 'Geser pengatur tegangan atau hambatan dan amati perubahan kuat arus secara langsung pada simulasi interaktif.'
    },
    audio: 'Persamaan Hukum Ohm memiliki tiga bentuk matematis: Tegangan listrik sama dengan kuat arus dikali hambatan listrik. Kuat arus listrik sama dengan tegangan dibagi hambatan. Dan hambatan listrik sama dengan tegangan dibagi kuat arus.'
  },
  {
    id: 'seri',
    judul: 'Rangkaian Seri',
    tab: 'Seri',
    paragraf: 'Pada Rangkaian Seri, semua komponen disusun secara berurutan dalam satu lintasan tunggal tanpa percabangan. Akibatnya, kuat arus listrik yang mengalir melalui setiap komponen bernilai sama besar, sedangkan tegangan listrik sumber terbagi ke masing-masing komponen.',
    ciri: [
      'Kuat arus listrik bernilai sama di seluruh komponen: Itotal = I1 = I2 = I3 = ...',
      'Hambatan total merupakan hasil penjumlahan langsung: Rtotal = R1 + R2 + R3 + ...',
      'Tegangan listrik sumber sama dengan jumlah jatuh tegangan: Vsumber = V1 + V2 + V3 + ...',
      'Jika salah satu komponen terputus, seluruh aliran kuat arus listrik dalam rangkaian akan terhenti.'
    ],
    contohBertahap: {
      judul: 'Contoh Perhitungan Rangkaian Seri',
      deskripsi: 'Tiga buah resistor masing-masing R1 = 2 Ω, R2 = 3 Ω, dan R3 = 5 Ω disusun secara seri dan dihubungkan dengan sumber tegangan listrik sebesar 10 V.',
      diketahui: [
        'Hambatan resistor 1 (R1) = 2 Ω',
        'Hambatan resistor 2 (R2) = 3 Ω',
        'Hambatan resistor 3 (R3) = 5 Ω',
        'Tegangan sumber (V) = 10 V'
      ],
      ditanya: [
        'Hambatan total rangkaian (Rtotal)',
        'Kuat arus listrik rangkaian (I)',
        'Tegangan listrik pada masing-masing resistor (V1, V2, V3)'
      ],
      langkah: [
        {
          label: 'Menghitung Hambatan Total Rangkaian (Rtotal)',
          rumus: 'R_{\\text{total}} = R_1 + R_2 + R_3',
          rumusTeks: 'Rtotal = R1 + R2 + R3',
          substitusi: 'R_{\\text{total}} = 2\\,\\Omega + 3\\,\\Omega + 5\\,\\Omega',
          substitusiTeks: 'Rtotal = 2 Ω + 3 Ω + 5 Ω',
          hasil: 'R_{\\text{total}} = 10\\,\\Omega',
          hasilTeks: 'Rtotal = 10 Ω'
        },
        {
          label: 'Menghitung Kuat Arus Listrik Rangkaian (I)',
          rumus: 'I = \\dfrac{V}{R_{\\text{total}}}',
          rumusTeks: 'I = V / Rtotal',
          substitusi: 'I = \\dfrac{10\\,\\text{V}}{10\\,\\Omega}',
          substitusiTeks: 'I = 10 V / 10 Ω',
          hasil: 'I = 1\\,\\text{A}',
          hasilTeks: 'I = 1 A'
        },
        {
          label: 'Menghitung Jatuh Tegangan Listrik Tiap Resistor',
          rumus: 'V_n = I \\times R_n',
          rumusTeks: 'Vn = I × Rn',
          substitusi: 'V_1 = 1\\,\\text{A} \\times 2\\,\\Omega,\\quad V_2 = 1\\,\\text{A} \\times 3\\,\\Omega,\\quad V_3 = 1\\,\\text{A} \\times 5\\,\\Omega',
          substitusiTeks: 'V1 = 1 A × 2 Ω; V2 = 1 A × 3 Ω; V3 = 1 A × 5 Ω',
          hasil: 'V_1 = 2\\,\\text{V},\\; V_2 = 3\\,\\text{V},\\; V_3 = 5\\,\\text{V}',
          hasilTeks: 'V1 = 2 V, V2 = 3 V, V3 = 5 V'
        }
      ],
      kesimpulan: 'Pada Rangkaian Seri, kuat arus listrik pada setiap resistor bernilai sama yaitu 1 A. Jumlah jatuh tegangan pada seluruh resistor (2 V + 3 V + 5 V = 10 V) tepat sama dengan tegangan listrik sumber (10 V).'
    },
    simulasi: {
      href: 'simulasi-sp.html',
      judul: 'Coba Eksperimen Mode Seri',
      deskripsi: 'Atur nilai resistansi dan amati kuat arus yang sama serta pembagian nilai tegangan pada rangkaian.'
    },
    audio: 'Pada Rangkaian Seri hanya terdapat satu jalur tertutup. Kuat arus listrik bernilai sama di seluruh komponen, hambatan total dijumlahkan secara langsung, dan tegangan listrik sumber terbagi. Jika satu titik terbuka, arus berhenti di seluruh rangkaian.'
  },
  {
    id: 'paralel',
    judul: 'Rangkaian Paralel',
    tab: 'Paralel',
    paragraf: 'Pada Rangkaian Paralel, setiap cabang komponen terhubung langsung pada pasangan titik percabangan yang sama. Akibatnya, tegangan listrik pada setiap cabang bernilai sama dengan tegangan sumber, sedangkan kuat arus listrik total terbagi ke masing-masing cabang.',
    ciri: [
      'Tegangan listrik pada setiap cabang sama besar: Vsumber = V1 = V2 = V3 = ...',
      'Kuat arus listrik total merupakan penjumlahan arus cabang: Itotal = I1 + I2 + I3 + ...',
      'Kebalikan hambatan total sama dengan jumlah kebalikan hambatan cabang: 1/Rtotal = 1/R1 + 1/R2 + ...',
      'Untuk dua resistor paralel, rumus praktis: Rtotal = (R1 × R2) / (R1 + R2)',
      'Hambatan total Rangkaian Paralel selalu lebih kecil daripada hambatan cabang terkecil.',
      'Jika salah satu cabang terputus, cabang yang lain tetap dapat mengalirkan arus listrik secara normal.'
    ],
    contohBertahap: {
      judul: 'Contoh Perhitungan Rangkaian Paralel',
      deskripsi: 'Tiga buah resistor R1 = 6 Ω, R2 = 3 Ω, dan R3 = 2 Ω dihubungkan secara paralel dengan sumber tegangan listrik sebesar 12 V.',
      diketahui: [
        'Hambatan cabang 1 (R1) = 6 Ω',
        'Hambatan cabang 2 (R2) = 3 Ω',
        'Hambatan cabang 3 (R3) = 2 Ω',
        'Tegangan sumber (V) = 12 V'
      ],
      ditanya: [
        'Hambatan total rangkaian (Rtotal)',
        'Kuat arus listrik pada masing-masing cabang (I1, I2, I3)',
        'Kuat arus listrik total rangkaian (Itotal)'
      ],
      langkah: [
        {
          label: 'Menghitung Hambatan Total Rangkaian (Rtotal)',
          rumus: '\\dfrac{1}{R_{\\text{total}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3}',
          rumusTeks: '1/Rtotal = 1/R1 + 1/R2 + 1/R3',
          substitusi: '\\dfrac{1}{R_{\\text{total}}} = \\dfrac{1}{6\\,\\Omega} + \\dfrac{1}{3\\,\\Omega} + \\dfrac{1}{2\\,\\Omega} = \\dfrac{1 + 2 + 3}{6\\,\\Omega} = \\dfrac{6}{6\\,\\Omega}',
          substitusiTeks: '1/Rtotal = 1/6 + 2/6 + 3/6 = 6/6 Ω⁻¹',
          hasil: 'R_{\\text{total}} = 1\\,\\Omega',
          hasilTeks: 'Rtotal = 1 Ω'
        },
        {
          label: 'Menghitung Kuat Arus Listrik Tiap Cabang',
          rumus: 'I_n = \\dfrac{V}{R_n}',
          rumusTeks: 'In = V / Rn',
          substitusi: 'I_1 = \\dfrac{12\\,\\text{V}}{6\\,\\Omega},\\quad I_2 = \\dfrac{12\\,\\text{V}}{3\\,\\Omega},\\quad I_3 = \\dfrac{12\\,\\text{V}}{2\\,\\Omega}',
          substitusiTeks: 'I1 = 12 V / 6 Ω; I2 = 12 V / 3 Ω; I3 = 12 V / 2 Ω',
          hasil: 'I_1 = 2\\,\\text{A},\\; I_2 = 4\\,\\text{A},\\; I_3 = 6\\,\\text{A}',
          hasilTeks: 'I1 = 2 A, I2 = 4 A, I3 = 6 A'
        },
        {
          label: 'Menghitung Kuat Arus Listrik Total (Itotal)',
          rumus: 'I_{\\text{total}} = I_1 + I_2 + I_3',
          rumusTeks: 'Itotal = I1 + I2 + I3',
          substitusi: 'I_{\\text{total}} = 2\\,\\text{A} + 4\\,\\text{A} + 6\\,\\text{A}',
          substitusiTeks: 'Itotal = 2 A + 4 A + 6 A',
          hasil: 'I_{\\text{total}} = 12\\,\\text{A}',
          hasilTeks: 'Itotal = 12 A'
        }
      ],
      kesimpulan: 'Pada Rangkaian Paralel, setiap cabang menerima tegangan listrik yang sama sebesar 12 V. Jumlah kuat arus cabang (2 A + 4 A + 6 A = 12 A) tepat sama dengan kuat arus listrik total rangkaian, dan hambatan total (1 Ω) terbukti lebih kecil daripada cabang terkecil (2 Ω).'
    },
    simulasi: {
      href: 'simulasi-sp.html',
      judul: 'Coba Eksperimen Mode Paralel',
      deskripsi: 'Amati nilai tegangan listrik yang seragam dan pembagian kuat arus pada setiap cabang rangkaian.'
    },
    audio: 'Pada Rangkaian Paralel, tegangan listrik pada setiap cabang bernilai sama dengan tegangan sumber. Kuat arus total merupakan penjumlahan kuat arus di setiap cabang, dan hambatan total selalu lebih kecil dari nilai hambatan cabang terkecil.'
  },
  {
    id: 'gabungan',
    judul: 'Rangkaian Gabungan',
    tab: 'Gabungan',
    paragraf: 'Rangkaian Gabungan (Seri-Paralel) memadukan susunan seri dan paralel dalam satu kesatuan rangkaian listrik. Analisis rangkaian dilakukan secara terstruktur dengan menyederhanakan kelompok komponen menjadi hambatan ekuivalen (pengganti) hingga diperoleh nilai hambatan total.',
    langkahAnalisis: [
      'Identifikasi titik percabangan untuk membedakan kelompok komponen yang terhubung seri murni atau paralel murni.',
      'Sederhanakan terlebih dahulu kelompok resistor yang paling mudah dihitung (misalnya cabang paralel) menjadi hambatan pengganti ekuivalen.',
      'Hitung hambatan total (Rtotal) seluruh rangkaian dengan menjumlahkan hambatan ekuivalen yang tersisa.',
      'Gunakan persamaan Hukum Ohm untuk menghitung kuat arus listrik total yang keluar dari sumber tegangan.',
      'Telusuri kembali pembagian tegangan pada jalur seri dan pembagian kuat arus listrik pada cabang paralel.'
    ],
    contohBertahap: {
      judul: 'Contoh Perhitungan Rangkaian Gabungan (Seri-Paralel)',
      deskripsi: 'Resistor R1 = 10 Ω dan R2 = 10 Ω terhubung seri, lalu disambungkan dengan cabang paralel yang terdiri atas R3 = 8 Ω dan R4 = 8 Ω. Rangkaian disuplai oleh sumber tegangan listrik sebesar 12 V.',
      diketahui: [
        'Resistor seri: R1 = 10 Ω dan R2 = 10 Ω',
        'Resistor cabang paralel: R3 = 8 Ω dan R4 = 8 Ω',
        'Tegangan sumber (V) = 12 V'
      ],
      ditanya: [
        'Hambatan pengganti cabang paralel (Rp)',
        'Hambatan total seluruh rangkaian (Rtotal)',
        'Kuat arus listrik total dari sumber (Itotal)'
      ],
      langkah: [
        {
          label: 'Menyederhanakan Cabang Paralel (R3 dan R4)',
          rumus: 'R_p = \\dfrac{R_3 \\times R_4}{R_3 + R_4}',
          rumusTeks: 'Rp = (R3 × R4) / (R3 + R4)',
          substitusi: 'R_p = \\dfrac{8\\,\\Omega \\times 8\\,\\Omega}{8\\,\\Omega + 8\\,\\Omega} = \\dfrac{64}{16}\\,\\Omega',
          substitusiTeks: 'Rp = (8 Ω × 8 Ω) / (8 Ω + 8 Ω) = 64 / 16 Ω',
          hasil: 'R_p = 4\\,\\Omega',
          hasilTeks: 'Rp = 4 Ω'
        },
        {
          label: 'Menghitung Hambatan Total Seluruh Rangkaian (Rtotal)',
          rumus: 'R_{\\text{total}} = R_1 + R_2 + R_p',
          rumusTeks: 'Rtotal = R1 + R2 + Rp',
          substitusi: 'R_{\\text{total}} = 10\\,\\Omega + 10\\,\\Omega + 4\\,\\Omega',
          substitusiTeks: 'Rtotal = 10 Ω + 10 Ω + 4 Ω',
          hasil: 'R_{\\text{total}} = 24\\,\\Omega',
          hasilTeks: 'Rtotal = 24 Ω'
        },
        {
          label: 'Menghitung Kuat Arus Listrik Total Sumber (Itotal)',
          rumus: 'I_{\\text{total}} = \\dfrac{V}{R_{\\text{total}}}',
          rumusTeks: 'Itotal = V / Rtotal',
          substitusi: 'I_{\\text{total}} = \\dfrac{12\\,\\text{V}}{24\\,\\Omega}',
          substitusiTeks: 'Itotal = 12 V / 24 Ω',
          hasil: 'I_{\\text{total}} = 0{,}5\\,\\text{A}',
          hasilTeks: 'Itotal = 0,5 A'
        }
      ],
      kesimpulan: 'Hambatan pengganti rangkaian gabungan ini adalah 24 Ω dan kuat arus listrik total sumber bernilai 0,5 A. Tegangan pada cabang paralel adalah Vp = 0,5 A × 4 Ω = 2 V, sehingga kuat arus cabang pada masing-masing resistor R3 dan R4 adalah 0,25 A.'
    },
    simulasi: {
      href: 'simulasi-sp.html',
      judul: 'Eksplorasi Rangkaian Seri-Paralel',
      deskripsi: 'Bandingkan karakteristik Rangkaian Seri dan Rangkaian Paralel, lalu analisis rangkaian gabungan secara bertahap.'
    },
    audio: 'Untuk menganalisis Rangkaian Gabungan, kenali susunan komponen lalu sederhanakan bagian seri atau paralel secara bertahap. Hitung hambatan total dan kuat arus listrik total, kemudian periksa kembali pembagian tegangan serta kuat arus pada masing-masing cabang.'
  },
  {
    id: 'contoh',
    judul: 'Contoh Soal',
    paragraf: 'Pelajari alur penyelesaian soal-soal Hukum Ohm dan rangkaian listrik berikut secara berurutan. Setiap contoh soal disusun secara eksplisit melalui 4 tahap: Diketahui & Ditanya, Penulisan Rumus, Substitusi Angka, dan Perhitungan Hasil Akhir lengkap dengan satuan SI serta kesimpulan konseptual.',
    contohSoal: [
      {
        judul: 'Contoh Soal 1: Menghitung Kuat Arus Listrik dengan Hukum Ohm',
        deskripsi: 'Sebuah rangkaian tertutup dihubungkan ke sumber tegangan listrik sebesar 20 Volt dengan beban resistor berhambatan 10 Ohm. Berapakah kuat arus listrik yang mengalir pada rangkaian tersebut?',
        diketahui: [
          'Tegangan listrik (V) = 20 V',
          'Hambatan listrik (R) = 10 Ω'
        ],
        ditanya: [
          'Kuat arus listrik (I)'
        ],
        langkah: [
          {
            label: 'Menghitung Kuat Arus Listrik (I)',
            rumus: 'I = \\dfrac{V}{R}',
            rumusTeks: 'I = V / R',
            substitusi: 'I = \\dfrac{20\\,\\text{V}}{10\\,\\Omega}',
            substitusiTeks: 'I = 20 V / 10 Ω',
            hasil: 'I = 2\\,\\text{A}',
            hasilTeks: 'I = 2 A'
          }
        ],
        kesimpulan: 'Kuat arus listrik yang mengalir melalui rangkaian tersebut adalah sebesar 2 Ampere (A).'
      },
      {
        judul: 'Contoh Soal 2: Menghitung Hambatan Listrik dengan Hukum Ohm',
        deskripsi: 'Suatu komponen listrik dialiri kuat arus sebesar 0,3 Ampere saat dihubungkan pada sumber tegangan listrik baterai 9 Volt. Berapakah nilai hambatan listrik pada komponen tersebut?',
        diketahui: [
          'Tegangan listrik (V) = 9 V',
          'Kuat arus listrik (I) = 0,3 A'
        ],
        ditanya: [
          'Hambatan listrik (R)'
        ],
        langkah: [
          {
            label: 'Menghitung Hambatan Listrik (R)',
            rumus: 'R = \\dfrac{V}{I}',
            rumusTeks: 'R = V / I',
            substitusi: 'R = \\dfrac{9\\,\\text{V}}{0{,}3\\,\\text{A}}',
            substitusiTeks: 'R = 9 V / 0,3 A',
            hasil: 'R = 30\\,\\Omega',
            hasilTeks: 'R = 30 Ω'
          }
        ],
        kesimpulan: 'Besar hambatan listrik pada komponen tersebut adalah 30 Ohm (Ω).'
      },
      {
        judul: 'Contoh Soal 3: Menghitung Jatuh Tegangan pada Rangkaian Seri',
        deskripsi: 'Dua buah resistor masing-masing R1 = 4 Ohm dan R2 = 8 Ohm disusun secara seri pada sumber tegangan listrik 12 Volt. Tentukan kuat arus listrik yang mengalir pada rangkaian dan tegangan listrik (jatuh tegangan) pada resistor R2!',
        diketahui: [
          'Tegangan sumber (V) = 12 V',
          'Hambatan resistor 1 (R1) = 4 Ω',
          'Hambatan resistor 2 (R2) = 8 Ω'
        ],
        ditanya: [
          'Kuat arus listrik rangkaian (I)',
          'Tegangan listrik pada resistor R2 (V2)'
        ],
        langkah: [
          {
            label: 'Menghitung Hambatan Total Rangkaian Seri (Rtotal)',
            rumus: 'R_{\\text{total}} = R_1 + R_2',
            rumusTeks: 'Rtotal = R1 + R2',
            substitusi: 'R_{\\text{total}} = 4\\,\\Omega + 8\\,\\Omega',
            substitusiTeks: 'Rtotal = 4 Ω + 8 Ω',
            hasil: 'R_{\\text{total}} = 12\\,\\Omega',
            hasilTeks: 'Rtotal = 12 Ω'
          },
          {
            label: 'Menghitung Kuat Arus Listrik Rangkaian (I)',
            rumus: 'I = \\dfrac{V}{R_{\\text{total}}}',
            rumusTeks: 'I = V / Rtotal',
            substitusi: 'I = \\dfrac{12\\,\\text{V}}{12\\,\\Omega}',
            substitusiTeks: 'I = 12 V / 12 Ω',
            hasil: 'I = 1\\,\\text{A}',
            hasilTeks: 'I = 1 A'
          },
          {
            label: 'Menghitung Tegangan Listrik pada Resistor R2 (V2)',
            rumus: 'V_2 = I \\times R_2',
            rumusTeks: 'V2 = I × R2',
            substitusi: 'V_2 = 1\\,\\text{A} \\times 8\\,\\Omega',
            substitusiTeks: 'V2 = 1 A × 8 Ω',
            hasil: 'V_2 = 8\\,\\text{V}',
            hasilTeks: 'V2 = 8 V'
          }
        ],
        kesimpulan: 'Kuat arus listrik yang mengalir pada rangkaian seri bernilai 1 Ampere (A). Jatuh tegangan listrik pada resistor R2 adalah 8 Volt (V) dan pada resistor R1 adalah 4 Volt (V), sehingga totalnya sama dengan tegangan sumber 12 Volt (V).'
      },
      {
        judul: 'Contoh Soal 4: Menghitung Kuat Arus Cabang pada Rangkaian Paralel',
        deskripsi: 'Dua buah resistor R1 = 6 Ohm dan R2 = 3 Ohm dihubungkan secara paralel pada sumber tegangan listrik 12 Volt. Hitunglah kuat arus listrik pada cabang resistor R1 (I1), cabang resistor R2 (I2), serta kuat arus listrik total rangkaian (Itotal)!',
        diketahui: [
          'Tegangan sumber (V) = 12 V',
          'Hambatan cabang 1 (R1) = 6 Ω',
          'Hambatan cabang 2 (R2) = 3 Ω'
        ],
        ditanya: [
          'Kuat arus listrik pada cabang R1 (I1)',
          'Kuat arus listrik pada cabang R2 (I2)',
          'Kuat arus listrik total rangkaian (Itotal)'
        ],
        langkah: [
          {
            label: 'Menghitung Kuat Arus Cabang R1 (I1)',
            rumus: 'I_1 = \\dfrac{V}{R_1}',
            rumusTeks: 'I1 = V / R1',
            substitusi: 'I_1 = \\dfrac{12\\,\\text{V}}{6\\,\\Omega}',
            substitusiTeks: 'I1 = 12 V / 6 Ω',
            hasil: 'I_1 = 2\\,\\text{A}',
            hasilTeks: 'I1 = 2 A'
          },
          {
            label: 'Menghitung Kuat Arus Cabang R2 (I2)',
            rumus: 'I_2 = \\dfrac{V}{R_2}',
            rumusTeks: 'I2 = V / R2',
            substitusi: 'I_2 = \\dfrac{12\\,\\text{V}}{3\\,\\Omega}',
            substitusiTeks: 'I2 = 12 V / 3 Ω',
            hasil: 'I_2 = 4\\,\\text{A}',
            hasilTeks: 'I2 = 4 A'
          },
          {
            label: 'Menghitung Kuat Arus Listrik Total (Itotal)',
            rumus: 'I_{\\text{total}} = I_1 + I_2',
            rumusTeks: 'Itotal = I1 + I2',
            substitusi: 'I_{\\text{total}} = 2\\,\\text{A} + 4\\,\\text{A}',
            substitusiTeks: 'Itotal = 2 A + 4 A',
            hasil: 'I_{\\text{total}} = 6\\,\\text{A}',
            hasilTeks: 'Itotal = 6 A'
          }
        ],
        kesimpulan: 'Kedua cabang menerima tegangan listrik yang sama sebesar 12 Volt (V). Kuat arus pada cabang R1 adalah 2 Ampere dan cabang R2 adalah 4 Ampere, sehingga menghasilkan kuat arus listrik total rangkaian sebesar 6 Ampere (A).'
      }
    ],
    audio: 'Contoh soal mencakup perhitungan kuat arus listrik dan hambatan listrik menggunakan Hukum Ohm, jatuh tegangan listrik pada Rangkaian Seri, serta kuat arus cabang pada Rangkaian Paralel. Pastikan langkah penyelesaian dilakukan secara bertahap dan satuannya telah sesuai.'
  },
  {
    id: 'aplikasi',
    judul: 'Aplikasi & Analisis',
    tab: 'Aplikasi',
    paragraf: 'Prinsip Hukum Ohm diaplikasikan secara luas dalam pemilihan nilai resistor, estimasi kuat arus beban rangkaian, serta analisis troubleshooting hasil pengukuran kelistrikan. Gunakan perhitungan teoritis sebagai acuan prediksi sebelum melakukan pengujian riil.',
    contohAplikasi: [
      { judul: 'Pembagi Tegangan Seri', isi: 'Dua buah resistor 10 Ω dan 20 Ω dirangkai seri pada tegangan sumber 30 V. Hambatan total 30 Ω menghasilkan kuat arus 1 A, sehingga jatuh tegangan listriknya terbagi proporsional menjadi 10 V dan 20 V.' },
      { judul: 'Beban Listrik Paralel', isi: 'Setiap cabang alat listrik rumah tangga menerima tegangan listrik sumber jala-jala secara penuh dan beroperasi independen. Karena itu, instalasi listrik perumahan dirancang dengan prinsip Rangkaian Paralel.' },
      { judul: 'Analisis Gangguan Kelistrikan', isi: 'Kuat arus listrik terukur yang lebih kecil daripada perhitungan teoritis dapat mengindikasikan adanya resistansi kontak, kabel penghantar yang aus, atau penurunan tegangan pada sumber daya.' }
    ],
    keselamatan: 'Gunakan simulasi interaktif atau catu daya DC tegangan rendah (ekstra rendah < 12 V) saat berlatih. Selalu matikan sumber tegangan listrik sebelum mengubah sambungan kabel, hindari kontak langsung dengan konduktor terbuka, dan jangan pernah melakukan eksperimen mandiri pada sumber tegangan jala-jala PLN tanpa pengawasan instruktur berlisensi.',
    audio: 'Prinsip Hukum Ohm digunakan dalam merancang rangkaian dan menganalisis pengukuran listrik. Utamakan selalu keselamatan kerja: gunakan sumber tegangan rendah, matikan daya sebelum mengubah sambungan, dan hindari kontak langsung dengan konduktor listrik terbuka.'
  },
  {
    id: 'latihan',
    judul: 'Latihan & Eksplorasi',
    paragraf: 'Uji dan perdalam pemahaman Anda mengenai Hukum Ohm serta Rangkaian Seri dan Rangkaian Paralel melalui simulasi interaktif atau kerjakan kuis evaluasi bertahap.',
    ajakan: [
      {
        href: 'simulasi-ohm.html',
        judul: 'Simulasi Hukum Ohm',
        deskripsi: 'Eksperimen langsung dengan mengatur tegangan dan hambatan, lalu amati perubahan kuat arus secara langsung.',
        ikon: 'activity',
        kelas: 'btn-primary'
      },
      {
        href: 'simulasi-sp.html',
        judul: 'Simulasi Seri-Paralel',
        deskripsi: 'Bandingkan nilai hambatan total, karakteristik kuat arus, dan pembagian tegangan listrik secara visual.',
        ikon: 'bar-chart-3',
        kelas: 'btn-outline'
      },
      {
        href: 'kuis.html',
        judul: 'Evaluasi & Kuis',
        deskripsi: 'Uji pemahaman komprehensif Anda tentang Hukum Ohm melalui soal-soal latihan interaktif.',
        ikon: 'clipboard-check',
        kelas: 'btn-outline'
      }
    ],
    audio: 'Silakan pilih Simulasi Hukum Ohm untuk menguji hubungan matematis secara visual, atau pilih Evaluasi dan Kuis untuk mengukur tingkat pemahaman Anda.'
  }
];

if (typeof window !== 'undefined') {
  window.MATERI = MATERI;
  window.buatDiagramMateri = buatDiagramMateri;
  window.buatDiagramRangkaianMateri = buatDiagramRangkaianMateri;
}
