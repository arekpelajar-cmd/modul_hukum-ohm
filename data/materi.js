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
        <title id="diagram-seri-title">Diagram rangkaian seri</title>
        <desc id="diagram-seri-desc">Sumber 10 volt mengalir melalui resistor R1 2 ohm, R2 3 ohm, dan R3 5 ohm dalam satu jalur.</desc>
        ${source('10 V')}
        ${resistor(90, 55, 'R1 = 2 Ω')}
        ${resistor(195, 55, 'R2 = 3 Ω')}
        ${resistor(300, 55, 'R3 = 5 Ω')}
        <path d="M65 55H90 M170 55H195 M275 55H300 M380 55H450" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round"/>
        <text x="250" y="229" font-size="14" font-weight="700" fill="var(--blue)" text-anchor="middle">Arus sama di setiap resistor: I = 1 A</text>
      </svg>
    `;
  }

  if (jenis === 'paralel') {
    return `
      <svg viewBox="0 0 500 270" class="materi-circuit-svg" role="img" aria-labelledby="diagram-paralel-title diagram-paralel-desc">
        <title id="diagram-paralel-title">Diagram rangkaian paralel</title>
        <desc id="diagram-paralel-desc">Sumber 12 volt terhubung pada tiga cabang paralel: R1 6 ohm dengan arus 2 ampere, R2 3 ohm dengan arus 4 ampere, dan R3 2 ohm dengan arus 6 ampere.</desc>
        <path d="M120 65V190 M360 65V190 M120 65H200 M280 65H360 M120 120H200 M280 120H360 M120 175H200 M280 175H360 M120 190V220H228 M252 220H360V190" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        ${resistor(200, 65, 'R1 = 6 Ω', 45)}
        ${resistor(200, 120, 'R2 = 3 Ω', 100)}
        ${resistor(200, 175, 'R3 = 2 Ω', 155)}
        <line x1="235" y1="207" x2="235" y2="233" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <line x1="245" y1="213" x2="245" y2="227" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <text x="405" y="70" font-size="12" font-weight="700" fill="var(--blue)">I1 = 2 A</text>
        <text x="405" y="125" font-size="12" font-weight="700" fill="var(--blue)">I2 = 4 A</text>
        <text x="405" y="180" font-size="12" font-weight="700" fill="var(--blue)">I3 = 6 A</text>
        <text x="240" y="253" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Sumber 12 V · Itotal = 12 A</text>
      </svg>
    `;
  }

  if (jenis === 'gabungan') {
    return `
      <svg viewBox="0 0 500 245" class="materi-circuit-svg" role="img" aria-labelledby="diagram-gabungan-title diagram-gabungan-desc">
        <title id="diagram-gabungan-title">Diagram rangkaian gabungan seri-paralel</title>
        <desc id="diagram-gabungan-desc">Sumber 12 volt dan resistor R1 serta R2 masing-masing 10 ohm tersusun seri, dilanjutkan cabang paralel R3 dan R4 yang masing-masing 8 ohm.</desc>
        <path d="M65 55V92 M65 124V200H430V55 M65 55H90 M170 55H190 M270 55H300 M380 55H430 M300 55V140 M300 140H320 M400 140H430 M430 55V200" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="52" y1="100" x2="78" y2="100" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <line x1="57" y1="116" x2="73" y2="116" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <text x="42" y="145" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">12 V</text>
        ${resistor(90, 55, 'R1 = 10 Ω', 32)}
        ${resistor(190, 55, 'R2 = 10 Ω', 32)}
        ${resistor(300, 55, 'R3 = 8 Ω', 32)}
        ${resistor(320, 140, 'R4 = 8 Ω', 117)}
        <text x="250" y="229" font-size="14" font-weight="700" fill="var(--blue)" text-anchor="middle">Seri: R1, R2 · Paralel: R3, R4</text>
      </svg>
    `;
  }

  return '';
}

const MATERI = [
  {
    id: 'arus-dc',
    judul: 'Dasar Listrik DC',
    tab: 'Listrik DC',
    paragraf: 'Arus searah (DC) mengalir dengan arah tetap. Sumber tegangan menyediakan beda potensial yang mendorong arus mengalir ketika rangkaian tertutup.',
    sumber: [
      { nama: 'Baterai', contoh: 'Sumber DC portabel, misalnya pada senter.' },
      { nama: 'Aki', contoh: 'Sumber DC isi ulang yang digunakan pada kendaraan.' },
      { nama: 'Catu daya DC', contoh: 'Adaptor yang mengubah AC menjadi tegangan DC untuk perangkat elektronik.' },
      { nama: 'Panel surya', contoh: 'Mengubah energi cahaya menjadi energi listrik DC.' }
    ],
    arahArus: 'Pada diagram rangkaian, arah arus konvensional ditetapkan dari kutub positif ke negatif. Arah gerak elektron berlawanan, dari negatif ke positif.',
    simbol: [
      { s: 'V', nama: 'Tegangan, satuan volt (V)' },
      { s: 'I', nama: 'Arus, satuan ampere (A)' },
      { s: 'R', nama: 'Hambatan, satuan ohm (Ω)' }
    ],
    audio: 'Arus searah atau DC mengalir dengan arah tetap. Contoh sumber tegangan DC adalah baterai, aki, catu daya DC, dan panel surya. Pada diagram, arus konvensional dari positif ke negatif, sedangkan elektron bergerak berlawanan arah.'
  },
  {
    id: 'pengertian',
    judul: 'Hukum Ohm',
    tab: 'Pengertian',
    paragraf: 'Untuk resistor ohmik pada kondisi fisik yang tetap, arus bertambah saat tegangan dinaikkan dan berkurang saat hambatan diperbesar. Analogi aliran air dapat membantu membayangkan hubungan ini, tetapi listrik dan air bukan hal yang sama.',
    analogi: [
      { istilah: 'Tegangan', peran: 'Dorongan listrik.' },
      { istilah: 'Arus', peran: 'Aliran muatan listrik.' },
      { istilah: 'Hambatan', peran: 'Penghambat aliran listrik.' }
    ],
    audio: 'Hukum Ohm menjelaskan hubungan tegangan, arus, dan hambatan pada resistor ohmik ketika kondisi fisik tetap. Tegangan mendorong muatan, arus adalah laju aliran muatan, dan hambatan melawan aliran arus.'
  },
  {
    id: 'rumus',
    judul: 'Rumus',
    paragraf: 'Pilih bentuk persamaan sesuai besaran yang diketahui. Pastikan satuan konsisten sebelum menghitung.',
    rumus: 'V = I \\times R',
    rumusTeks: 'V = I x R',
    bentukRumus: [
      { label: 'Tegangan', rumus: 'V=I\\times R', teks: 'V = I x R' },
      { label: 'Arus', rumus: 'I=\\dfrac{V}{R}', teks: 'I = V / R' },
      { label: 'Hambatan', rumus: 'R=\\dfrac{V}{I}', teks: 'R = V / I' }
    ],
    simbol: [
      { s: 'V', nama: 'Tegangan (Volt)' },
      { s: 'I', nama: 'Arus (Ampere)' },
      { s: 'R', nama: 'Hambatan (Ohm)' }
    ],
    simulasi: {
      href: 'simulasi-ohm.html',
      judul: 'Uji Hukum Ohm',
      deskripsi: 'Ubah tegangan atau hambatan dan amati perubahan arus.'
    },
    audio: 'Hukum Ohm memiliki tiga bentuk. Tegangan sama dengan arus dikali hambatan. Arus sama dengan tegangan dibagi hambatan. Hambatan sama dengan tegangan dibagi arus.'
  },
  {
    id: 'seri',
    judul: 'Rangkaian Seri',
    tab: 'Seri',
    paragraf: 'Pada rangkaian seri, komponen berada dalam satu jalur. Arus yang melalui setiap komponen sama, sedangkan tegangan sumber terbagi pada komponen.',
    ciri: [
      'Arus sama pada semua komponen: It = I1 = I2 = ...',
      'Hambatan total adalah jumlah hambatan: Rt = R1 + R2 + ...',
      'Tegangan sumber sama dengan jumlah jatuh tegangan: Vt = V1 + V2 + ...',
      'Jika jalur terbuka pada satu titik, arus berhenti di seluruh rangkaian.'
    ],
    contohBertahap: {
      diketahui: 'R1 = 2 Ω, R2 = 3 Ω, R3 = 5 Ω, dan sumber = 10 V',
      ditanya: 'Hambatan total, arus, dan tegangan pada tiap resistor',
      langkah: [
        { label: 'Hambatan total', rumus: 'R_t=2+3+5=10\\,\\Omega', teks: 'Rt = 2 + 3 + 5 = 10 Ω' },
        { label: 'Arus rangkaian', rumus: 'I=\\dfrac{10}{10}=1\\,\\text{A}', teks: 'I = 10 / 10 = 1 A' },
        { label: 'Tegangan tiap resistor', rumus: 'V_1=2\\,\\text{V},\\quad V_2=3\\,\\text{V},\\quad V_3=5\\,\\text{V}', teks: 'V1 = 2 V, V2 = 3 V, V3 = 5 V' }
      ],
      kesimpulan: 'Arusnya sama, yaitu 1 A. Jumlah jatuh tegangan (2 + 3 + 5 V) sama dengan tegangan sumber 10 V.'
    },
    simulasi: {
      href: 'simulasi-sp.html',
      judul: 'Coba mode seri',
      deskripsi: 'Atur nilai resistor dan amati arus yang sama serta pembagian tegangan.'
    },
    audio: 'Pada rangkaian seri hanya ada satu jalur. Arus sama di semua komponen, hambatan total dijumlahkan, dan tegangan terbagi. Jika satu titik pada jalur terbuka, arus berhenti di seluruh rangkaian.'
  },
  {
    id: 'paralel',
    judul: 'Rangkaian Paralel',
    tab: 'Paralel',
    paragraf: 'Pada rangkaian paralel, setiap cabang terhubung pada pasangan titik yang sama. Tegangan tiap cabang sama dengan tegangan sumber, sedangkan arus terbagi.',
    ciri: [
      'Tegangan tiap cabang sama: V1 = V2 = ... = V sumber.',
      'Arus total adalah jumlah arus cabang: It = I1 + I2 + ...',
      'Kebalikan hambatan total dijumlahkan: 1/Rt = 1/R1 + 1/R2 + ... .',
      'Untuk dua resistor, rumus ringkasnya: Rt = (R1 x R2) / (R1 + R2).',
      'Hambatan total paralel lebih kecil daripada hambatan cabang terkecil.'
    ],
    contohBertahap: {
      diketahui: 'R1 = 6 Ω, R2 = 3 Ω, R3 = 2 Ω, dan sumber = 12 V',
      ditanya: 'Hambatan total, arus total, dan arus pada tiap cabang',
      langkah: [
        { label: 'Hambatan total', rumus: '\\dfrac{1}{R_t}=\\dfrac{1}{6}+\\dfrac{1}{3}+\\dfrac{1}{2}=1\\quad\\Rightarrow\\quad R_t=1\\,\\Omega', teks: '1/Rt = 1/6 + 1/3 + 1/2 = 1, jadi Rt = 1 Ω' },
        { label: 'Arus total', rumus: 'I_t=\\dfrac{12}{1}=12\\,\\text{A}', teks: 'It = 12 / 1 = 12 A' },
        { label: 'Arus cabang', rumus: 'I_1=2\\,\\text{A},\\quad I_2=4\\,\\text{A},\\quad I_3=6\\,\\text{A}', teks: 'I1 = 2 A, I2 = 4 A, I3 = 6 A' }
      ],
      kesimpulan: 'Setiap cabang mendapat 12 V. Jumlah arus cabang (2 + 4 + 6 A) sama dengan arus total 12 A.'
    },
    simulasi: {
      href: 'simulasi-sp.html',
      judul: 'Coba mode paralel',
      deskripsi: 'Amati tegangan yang sama dan arus pada tiap cabang.'
    },
    audio: 'Pada rangkaian paralel tegangan tiap cabang sama dengan tegangan sumber. Arus total adalah jumlah arus cabang, dan hambatan total lebih kecil dari hambatan cabang terkecil.'
  },
  {
    id: 'gabungan',
    judul: 'Rangkaian Gabungan',
    tab: 'Gabungan',
    paragraf: 'Rangkaian gabungan memiliki bagian seri dan paralel. Selesaikan rangkaian bertahap dengan mengganti kelompok resistor menjadi hambatan ekuivalen.',
    langkahAnalisis: [
      'Identifikasi bagian seri, paralel, dan titik percabangan.',
      'Sederhanakan kelompok resistor yang paling mudah dihitung menjadi hambatan ekuivalen.',
      'Hitung hambatan total rangkaian.',
      'Gunakan Hukum Ohm untuk mencari arus total, lalu hitung tegangan atau arus tiap komponen.',
      'Periksa kembali jumlah tegangan pada jalur seri dan jumlah arus pada cabang paralel.'
    ],
    contohBertahap: {
      diketahui: 'R1 = 10 Ω dan R2 = 10 Ω tersusun seri dengan cabang R3 = 8 Ω paralel R4 = 8 Ω; sumber = 12 V',
      ditanya: 'Hambatan total dan arus sumber',
      langkah: [
        { label: 'Sederhanakan cabang paralel', rumus: 'R_{34}=\\dfrac{8\\times8}{8+8}=4\\,\\Omega', teks: 'R34 = (8 x 8) / (8 + 8) = 4 Ω' },
        { label: 'Hambatan total', rumus: 'R_t=10+10+4=24\\,\\Omega', teks: 'Rt = 10 + 10 + 4 = 24 Ω' },
        { label: 'Arus sumber', rumus: 'I_t=\\dfrac{12}{24}=0.5\\,\\text{A}', teks: 'It = 12 / 24 = 0,5 A' }
      ],
      kesimpulan: 'Tegangan pada cabang paralel adalah 2 V. Karena R3 dan R4 sama, arus cabangnya masing-masing 0,25 A; jumlahnya kembali menjadi 0,5 A.'
    },
    simulasi: {
      href: 'simulasi-sp.html',
      judul: 'Eksplorasi seri-paralel',
      deskripsi: 'Bandingkan karakteristik rangkaian seri dan paralel, lalu analisis rangkaian gabungan bertahap.'
    },
    audio: 'Untuk rangkaian gabungan, identifikasi susunan komponen lalu sederhanakan bagian seri atau paralel secara bertahap. Hitung hambatan total dan arus, kemudian periksa kembali tegangan serta arus cabang.'
  },
  {
    id: 'contoh',
    judul: 'Contoh Soal',
    paragraf: 'Pelajari cara menyelesaikan soal Hukum Ohm dan rangkaian seri-paralel. Perhatikan satuan, tulis rumus yang digunakan, lalu cek kembali hasilnya.',
    contohSoal: [
      {
        judul: 'Menghitung arus dengan Hukum Ohm',
        diketahui: 'V = 20 V, R = 10 Ω',
        ditanya: 'Arus (I)',
        langkah: [
          { label: 'Gunakan rumus arus', rumus: 'I=\\dfrac{V}{R}', teks: 'I = V / R' },
          { label: 'Substitusikan nilai', rumus: 'I=\\dfrac{20}{10}=2\\,\\text{A}', teks: 'I = 20 / 10 = 2 A' }
        ],
        kesimpulan: 'Arus yang mengalir adalah 2 A.'
      },
      {
        judul: 'Menghitung hambatan dengan Hukum Ohm',
        diketahui: 'V = 9 V, I = 0,3 A',
        ditanya: 'Hambatan (R)',
        langkah: [
          { label: 'Gunakan rumus hambatan', rumus: 'R=\\dfrac{V}{I}', teks: 'R = V / I' },
          { label: 'Substitusikan nilai', rumus: 'R=\\dfrac{9}{0.3}=30\\,\\Omega', teks: 'R = 9 / 0,3 = 30 Ω' }
        ],
        kesimpulan: 'Hambatan resistor adalah 30 Ω.'
      },
      {
        judul: 'Menghitung jatuh tegangan pada rangkaian seri',
        diketahui: 'V sumber = 12 V, R1 = 4 Ω, R2 = 8 Ω',
        ditanya: 'Arus rangkaian dan tegangan pada R2',
        langkah: [
          { label: 'Hitung hambatan total', rumus: 'R_t=4+8=12\\,\\Omega', teks: 'Rt = 4 + 8 = 12 Ω' },
          { label: 'Hitung arus seri', rumus: 'I=\\dfrac{12}{12}=1\\,\\text{A}', teks: 'I = 12 / 12 = 1 A' },
          { label: 'Hitung tegangan pada R2', rumus: 'V_2=I\\times R_2=1\\times8=8\\,\\text{V}', teks: 'V2 = 1 x 8 = 8 V' }
        ],
        kesimpulan: 'Tegangan pada R2 adalah 8 V; tegangan pada R1 adalah 4 V sehingga jumlahnya 12 V.'
      },
      {
        judul: 'Menghitung arus cabang pada rangkaian paralel',
        diketahui: 'V sumber = 12 V, R1 = 6 Ω, R2 = 3 Ω',
        ditanya: 'Arus pada tiap cabang dan arus total',
        langkah: [
          { label: 'Hitung arus cabang R1', rumus: 'I_1=\\dfrac{12}{6}=2\\,\\text{A}', teks: 'I1 = 12 / 6 = 2 A' },
          { label: 'Hitung arus cabang R2', rumus: 'I_2=\\dfrac{12}{3}=4\\,\\text{A}', teks: 'I2 = 12 / 3 = 4 A' },
          { label: 'Jumlahkan arus cabang', rumus: 'I_t=I_1+I_2=2+4=6\\,\\text{A}', teks: 'It = I1 + I2 = 2 + 4 = 6 A' }
        ],
        kesimpulan: 'Arus total adalah 6 A. Kedua cabang mendapat tegangan yang sama, yaitu 12 V.'
      }
    ],
    audio: 'Contoh soal mencakup perhitungan arus dan hambatan dengan Hukum Ohm, jatuh tegangan rangkaian seri, serta arus pada cabang paralel. Periksa kembali satuan dan hasil perhitungan.'
  },
  {
    id: 'aplikasi',
    judul: 'Aplikasi & Analisis',
    tab: 'Aplikasi',
    paragraf: 'Hukum Ohm membantu memilih resistor, memperkirakan arus beban, dan menganalisis hasil pengukuran. Gunakan perhitungan sebagai prediksi yang kemudian dibandingkan dengan kondisi rangkaian.',
    contohAplikasi: [
      { judul: 'Pembagi tegangan seri', isi: 'Dua resistor 10 Ω dan 20 Ω dipasang seri pada sumber 30 V. Hambatan total 30 Ω menghasilkan arus 1 A, sehingga jatuh tegangannya masing-masing 10 V dan 20 V.' },
      { judul: 'Beban paralel', isi: 'Tiap cabang mendapat tegangan sumber dan dapat bekerja secara terpisah. Karena itu, beban instalasi rumah umumnya dirancang paralel, bukan dalam satu jalur seri.' },
      { judul: 'Analisis gangguan', isi: 'Arus terukur yang lebih kecil dari prediksi dapat disebabkan sambungan longgar, hambatan kabel, sumber yang turun, atau alat ukur. Periksa rangkaian dan alat ukur dengan prosedur aman.' }
    ],
    keselamatan: 'Gunakan simulasi atau sumber DC tegangan rendah untuk latihan. Matikan sumber sebelum mengubah sambungan, hindari menyentuh konduktor terbuka, dan jangan bereksperimen langsung pada tegangan PLN.',
    audio: 'Hukum Ohm membantu memilih resistor dan menganalisis rangkaian. Bandingkan hasil pengukuran dengan prediksi. Gunakan sumber DC tegangan rendah, matikan sumber sebelum mengubah sambungan, dan jangan bereksperimen langsung pada tegangan PLN.'
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
        href: 'simulasi-sp.html',
        judul: 'Simulasi Seri-Paralel',
        deskripsi: 'Bandingkan hambatan total, arus, dan pembagian tegangan.',
        ikon: 'bar-chart-3',
        kelas: 'btn-outline'
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
  window.buatDiagramRangkaianMateri = buatDiagramRangkaianMateri;
}
