// Bank soal kuis. benar adalah indeks opsi (0=A sampai 3=D).
const SOAL = [
  {
    level: 'Mudah',
    q: 'Sebuah hambatan listrik 10 Ω diberi tegangan listrik 20 V. Berapakah kuat arus listrik yang mengalir?',
    opsi: ['0,5 A', '1 A', '2 A', '10 A'],
    benar: 2,
    bahas: 'Rumus: I = V/R. Substitusi: I = 20 V/10 Ω. Hasil akhir: I = 2 A (ampere).',
    rumus:
      '\\begin{aligned}\\text{Rumus: }& I=\\dfrac{V}{R}\\\\\\text{Substitusi: }& I=\\dfrac{20\\,\\text{V}}{10\\,\\Omega}\\\\\\text{Hasil akhir: }& I=2\\,\\text{A}\\end{aligned}',
    rumusTeks: 'Rumus: I = V / R; Substitusi: I = 20 V / 10 Ω; Hasil akhir: I = 2 A',
    ingat: 'Ingat: V = I × R. Jadi, kuat arus listrik yang mengalir adalah 2 A.',
  },
  {
    level: 'Mudah',
    q: 'Kuat arus listrik 3 A mengalir melalui hambatan listrik 4 Ω. Berapa tegangan listriknya?',
    opsi: ['0,75 V', '7 V', '12 V', '1,33 V'],
    benar: 2,
    bahas: 'Rumus: V = I × R. Substitusi: V = 3 A × 4 Ω. Hasil akhir: V = 12 V (volt).',
    rumus:
      '\\begin{aligned}\\text{Rumus: }& V=I\\times R\\\\\\text{Substitusi: }& V=3\\,\\text{A}\\times4\\,\\Omega\\\\\\text{Hasil akhir: }& V=12\\,\\text{V}\\end{aligned}',
    rumusTeks: 'Rumus: V = I × R; Substitusi: V = 3 A × 4 Ω; Hasil akhir: V = 12 V',
    ingat: 'Ingat: tegangan listrik sama dengan kuat arus listrik dikali hambatan listrik.',
  },
  {
    level: 'Mudah',
    q: 'Tegangan listrik 24 V menghasilkan kuat arus listrik 3 A. Berapa hambatan listriknya?',
    opsi: ['72 Ω', '8 Ω', '27 Ω', '0,125 Ω'],
    benar: 1,
    bahas: 'Rumus: R = V/I. Substitusi: R = 24 V/3 A. Hasil akhir: R = 8 Ω (ohm).',
    rumus:
      '\\begin{aligned}\\text{Rumus: }& R=\\dfrac{V}{I}\\\\\\text{Substitusi: }& R=\\dfrac{24\\,\\text{V}}{3\\,\\text{A}}\\\\\\text{Hasil akhir: }& R=8\\,\\Omega\\end{aligned}',
    rumusTeks: 'Rumus: R = V / I; Substitusi: R = 24 V / 3 A; Hasil akhir: R = 8 Ω',
    ingat: 'Ingat: hambatan listrik sama dengan tegangan listrik dibagi kuat arus listrik.',
  },
  {
    level: 'Mudah',
    q: 'Pada rangkaian seri, besaran yang sama pada setiap komponen adalah ...',
    opsi: ['Tegangan listrik', 'Hambatan listrik', 'Kuat arus listrik', 'Daya listrik'],
    benar: 2,
    bahas:
      'Rangkaian seri hanya memiliki satu jalur, sehingga kuat arus listrik sama pada semua komponen.',
    rumus: 'I_1=I_2=I_{\\text{total}}',
    rumusTeks: 'I1 = I2 = I total',
    ingat: 'Ingat: rangkaian seri hanya memiliki satu jalur untuk kuat arus listrik.',
  },
  {
    level: 'Sedang',
    q: 'Hambatan listrik 10 Ω, 20 Ω, dan 30 Ω disusun dalam rangkaian seri. Berapa hambatan listrik totalnya?',
    opsi: ['5,45 Ω', '20 Ω', '60 Ω', '600 Ω'],
    benar: 2,
    bahas:
      'Rumus: Rt = R1 + R2 + R3. Substitusi: Rt = 10 Ω + 20 Ω + 30 Ω. Hasil akhir: Rt = 60 Ω (ohm).',
    rumus:
      '\\begin{aligned}\\text{Rumus: }& R_{\\text{t}}=R_1+R_2+R_3\\\\\\text{Substitusi: }& R_{\\text{t}}=10\\,\\Omega+20\\,\\Omega+30\\,\\Omega\\\\\\text{Hasil akhir: }& R_{\\text{t}}=60\\,\\Omega\\end{aligned}',
    rumusTeks:
      'Rumus: Rt = R1 + R2 + R3; Substitusi: Rt = 10 Ω + 20 Ω + 30 Ω; Hasil akhir: Rt = 60 Ω',
    ingat: 'Ingat: hambatan listrik total rangkaian seri adalah jumlah semua hambatan listrik.',
  },
  {
    level: 'Sedang',
    q: 'Pada rangkaian paralel, besaran yang sama pada setiap cabang adalah ...',
    opsi: ['Kuat arus listrik', 'Tegangan listrik', 'Hambatan listrik', 'Daya listrik'],
    benar: 1,
    bahas:
      'Semua cabang rangkaian paralel terhubung pada dua titik yang sama, sehingga tegangan listriknya sama.',
    rumus: 'V_1=V_2=V_{\\text{sumber}}',
    rumusTeks: 'V1 = V2 = V sumber',
    ingat: 'Ingat: setiap cabang rangkaian paralel mendapat tegangan listrik sumber yang sama.',
  },
  {
    level: 'Sedang',
    q: 'Dua hambatan listrik 10 Ω disusun dalam rangkaian paralel. Berapa hambatan listrik totalnya?',
    opsi: ['20 Ω', '10 Ω', '5 Ω', '2 Ω'],
    benar: 2,
    bahas:
      'Rumus: Rt = (R1 × R2)/(R1 + R2). Substitusi: Rt = (10 Ω × 10 Ω)/(10 Ω + 10 Ω). Hasil akhir: Rt = 5 Ω (ohm).',
    rumus:
      '\\begin{aligned}\\text{Rumus: }& R_{\\text{t}}=\\dfrac{R_1R_2}{R_1+R_2}\\\\\\text{Substitusi: }& R_{\\text{t}}=\\dfrac{10\\,\\Omega\\times10\\,\\Omega}{10\\,\\Omega+10\\,\\Omega}\\\\\\text{Hasil akhir: }& R_{\\text{t}}=5\\,\\Omega\\end{aligned}',
    rumusTeks:
      'Rumus: Rt = (R1 × R2) / (R1 + R2); Substitusi: Rt = (10 Ω × 10 Ω) / (10 Ω + 10 Ω); Hasil akhir: Rt = 5 Ω',
    ingat:
      'Ingat: hambatan listrik total rangkaian paralel lebih kecil daripada hambatan listrik setiap cabang.',
  },
  {
    level: 'Sedang',
    q: 'Sumber 12 V dengan R1 = 10 Ω dan R2 = 20 Ω disusun dalam rangkaian seri. Berapa tegangan listrik pada R2?',
    opsi: ['4 V', '6 V', '8 V', '12 V'],
    benar: 2,
    bahas:
      'Rumus: I = V/(R1 + R2) dan V2 = I × R2. Substitusi: I = 12 V/(10 Ω + 20 Ω) = 0,4 A; V2 = 0,4 A × 20 Ω. Hasil akhir: V2 = 8 V (volt).',
    rumus:
      '\\begin{aligned}\\text{Rumus: }& I=\\dfrac{V}{R_1+R_2},\\quad V_2=I\\times R_2\\\\\\text{Substitusi: }& I=\\dfrac{12\\,\\text{V}}{10\\,\\Omega+20\\,\\Omega}=0{,}4\\,\\text{A},\\quad V_2=0{,}4\\,\\text{A}\\times20\\,\\Omega\\\\\\text{Hasil akhir: }& V_2=8\\,\\text{V}\\end{aligned}',
    rumusTeks:
      'Rumus: I = V / (R1 + R2), V2 = I × R2; Substitusi: I = 12 V / (10 Ω + 20 Ω) = 0,4 A, V2 = 0,4 A × 20 Ω; Hasil akhir: V2 = 8 V',
    ingat:
      'Ingat: pada rangkaian seri, tegangan listrik terbagi sebanding dengan hambatan listrik.',
  },
  {
    level: 'Sulit',
    q: 'Hambatan listrik 6 Ω dan 12 Ω disusun dalam rangkaian paralel. Berapa hambatan listrik totalnya?',
    opsi: ['18 Ω', '4 Ω', '9 Ω', '2 Ω'],
    benar: 1,
    bahas:
      'Rumus: Rt = (R1 × R2)/(R1 + R2). Substitusi: Rt = (6 Ω × 12 Ω)/(6 Ω + 12 Ω) = 72/18 Ω. Hasil akhir: Rt = 4 Ω (ohm).',
    rumus:
      '\\begin{aligned}\\text{Rumus: }& R_{\\text{t}}=\\dfrac{R_1R_2}{R_1+R_2}\\\\\\text{Substitusi: }& R_{\\text{t}}=\\dfrac{6\\,\\Omega\\times12\\,\\Omega}{6\\,\\Omega+12\\,\\Omega}=\\dfrac{72\\,\\Omega^2}{18\\,\\Omega}\\\\\\text{Hasil akhir: }& R_{\\text{t}}=4\\,\\Omega\\end{aligned}',
    rumusTeks:
      'Rumus: Rt = (R1 × R2) / (R1 + R2); Substitusi: Rt = (6 Ω × 12 Ω) / (6 Ω + 12 Ω) = 72 / 18 Ω; Hasil akhir: Rt = 4 Ω',
    ingat:
      'Ingat: untuk dua hambatan listrik dalam rangkaian paralel, kalikan keduanya lalu bagi dengan jumlahnya.',
  },
  {
    level: 'Sulit',
    q: 'Sumber 12 V dihubungkan ke R1 = 20 Ω dan R2 = 30 Ω dalam rangkaian paralel. Berapa kuat arus listrik total dari sumber?',
    opsi: ['0,24 A', '0,6 A', '1 A', '1,6 A'],
    benar: 2,
    bahas:
      'Rumus: Itotal = I1 + I2 dan I = V/R. Substitusi: Itotal = (12 V/20 Ω) + (12 V/30 Ω) = 0,6 A + 0,4 A. Hasil akhir: Itotal = 1 A (ampere).',
    rumus:
      '\\begin{aligned}\\text{Rumus: }& I_{\\text{total}}=I_1+I_2,\\quad I=\\dfrac{V}{R}\\\\\\text{Substitusi: }& I_{\\text{total}}=\\dfrac{12\\,\\text{V}}{20\\,\\Omega}+\\dfrac{12\\,\\text{V}}{30\\,\\Omega}=0{,}6\\,\\text{A}+0{,}4\\,\\text{A}\\\\\\text{Hasil akhir: }& I_{\\text{total}}=1\\,\\text{A}\\end{aligned}',
    rumusTeks:
      'Rumus: Itotal = I1 + I2, I = V / R; Substitusi: Itotal = 12 V / 20 Ω + 12 V / 30 Ω = 0,6 A + 0,4 A; Hasil akhir: Itotal = 1 A',
    ingat:
      'Ingat: kuat arus listrik total pada rangkaian paralel adalah jumlah kuat arus listrik setiap cabang.',
  },
];
