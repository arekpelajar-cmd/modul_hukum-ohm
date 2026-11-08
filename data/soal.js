// Bank soal kuis. benar adalah indeks opsi (0=A sampai 3=D).
const SOAL = [
  {
    level: 'Mudah',
    q: 'Sebuah resistor 10 Ohm diberi tegangan 20 V. Berapakah arus yang mengalir?',
    opsi: ['0,5 A', '1 A', '2 A', '10 A'],
    benar: 2,
    bahas: 'I = V/R = 20/10 = 2 A.',
    rumus: 'I=\\dfrac{V}{R}=\\dfrac{20}{10}=2\\,\\text{A}',
    rumusTeks: 'I = V / R = 20 / 10 = 2 A',
    ingat: 'Ingat: V = I x R. Jadi, arus yang mengalir adalah 2 A.'
  },
  {
    level: 'Mudah',
    q: 'Arus 3 A mengalir melalui resistor 4 Ohm. Berapa tegangannya?',
    opsi: ['0,75 V', '7 V', '12 V', '1,33 V'],
    benar: 2,
    bahas: 'V = I × R = 3 × 4 = 12 V.',
    rumus: 'V=I\\times R=3\\times4=12\\,\\text{V}',
    rumusTeks: 'V = I x R = 3 x 4 = 12 V',
    ingat: 'Ingat: tegangan adalah arus dikali hambatan.'
  },
  {
    level: 'Mudah',
    q: 'Tegangan 24 V menghasilkan arus 3 A. Berapa hambatannya?',
    opsi: ['72 Ohm', '8 Ohm', '27 Ohm', '0,125 Ohm'],
    benar: 1,
    bahas: 'R = V/I = 24/3 = 8 Ohm.',
    rumus: 'R=\\dfrac{V}{I}=\\dfrac{24}{3}=8\\,\\Omega',
    rumusTeks: 'R = V / I = 24 / 3 = 8 Ohm',
    ingat: 'Ingat: hambatan adalah tegangan dibagi arus.'
  },
  {
    level: 'Mudah',
    q: 'Pada rangkaian seri, besaran yang sama di setiap komponen adalah ...',
    opsi: ['Tegangan', 'Hambatan', 'Arus', 'Daya'],
    benar: 2,
    bahas: 'Rangkaian seri hanya memiliki satu jalur, sehingga arus sama di semua komponen.',
    rumus: 'I_1=I_2=I_{\\text{total}}',
    rumusTeks: 'I1 = I2 = I total',
    ingat: 'Ingat: rangkaian seri hanya memiliki satu jalur arus.'
  },
  {
    level: 'Sedang',
    q: 'Resistor 10 Ohm, 20 Ohm, dan 30 Ohm disusun seri. Berapa hambatan totalnya?',
    opsi: ['5,45 Ohm', '20 Ohm', '60 Ohm', '600 Ohm'],
    benar: 2,
    bahas: 'Rt = R1 + R2 + R3 = 10 + 20 + 30 = 60 Ohm.',
    rumus: 'R_{\\text{t}}=R_1+R_2+R_3=10+20+30=60\\,\\Omega',
    rumusTeks: 'Rt = R1 + R2 + R3 = 10 + 20 + 30 = 60 Ohm',
    ingat: 'Ingat: hambatan total rangkaian seri adalah jumlah semua hambatan.'
  },
  {
    level: 'Sedang',
    q: 'Pada rangkaian paralel, besaran yang sama di setiap cabang adalah ...',
    opsi: ['Arus', 'Tegangan', 'Hambatan', 'Daya'],
    benar: 1,
    bahas: 'Semua cabang paralel terhubung pada dua titik yang sama, sehingga tegangannya sama.',
    rumus: 'V_1=V_2=V_{\\text{sumber}}',
    rumusTeks: 'V1 = V2 = V sumber',
    ingat: 'Ingat: setiap cabang paralel mendapat tegangan sumber yang sama.'
  },
  {
    level: 'Sedang',
    q: 'Dua resistor 10 Ohm disusun paralel. Berapa hambatan totalnya?',
    opsi: ['20 Ohm', '10 Ohm', '5 Ohm', '2 Ohm'],
    benar: 2,
    bahas: 'Rt = (10 × 10)/(10 + 10) = 100/20 = 5 Ohm.',
    rumus: 'R_{\\text{t}}=\\dfrac{R_1R_2}{R_1+R_2}=\\dfrac{10\\times10}{10+10}=5\\,\\Omega',
    rumusTeks: 'Rt = (R1 x R2) / (R1 + R2) = (10 x 10) / (10 + 10) = 5 Ohm',
    ingat: 'Ingat: hambatan total paralel lebih kecil daripada hambatan cabangnya.'
  },
  {
    level: 'Sedang',
    q: 'Sumber 12 V dengan R1 = 10 Ohm dan R2 = 20 Ohm disusun seri. Berapa tegangan pada R2?',
    opsi: ['4 V', '6 V', '8 V', '12 V'],
    benar: 2,
    bahas: 'I = 12/30 = 0,4 A; V2 = I × R2 = 0,4 × 20 = 8 V.',
    rumus: 'I=\\dfrac{12}{10+20}=0.4\\,\\text{A},\\quad V_2=I\\times20=8\\,\\text{V}',
    rumusTeks: 'I = 12 / (10 + 20) = 0,4 A; V2 = I x 20 = 8 V',
    ingat: 'Ingat: pada rangkaian seri, tegangan terbagi sebanding dengan hambatan.'
  },
  {
    level: 'Sulit',
    q: 'Resistor 6 Ohm dan 12 Ohm disusun paralel. Berapa hambatan totalnya?',
    opsi: ['18 Ohm', '4 Ohm', '9 Ohm', '2 Ohm'],
    benar: 1,
    bahas: 'Rt = (6 × 12)/(6 + 12) = 72/18 = 4 Ohm.',
    rumus: 'R_{\\text{t}}=\\dfrac{6\\times12}{6+12}=\\dfrac{72}{18}=4\\,\\Omega',
    rumusTeks: 'Rt = (6 x 12) / (6 + 12) = 72 / 18 = 4 Ohm',
    ingat: 'Ingat: untuk dua resistor paralel, kalikan keduanya lalu bagi dengan jumlahnya.'
  },
  {
    level: 'Sulit',
    q: 'Sumber 12 V dihubungkan ke R1 = 20 Ohm dan R2 = 30 Ohm paralel. Berapa arus total dari sumber?',
    opsi: ['0,24 A', '0,6 A', '1 A', '1,6 A'],
    benar: 2,
    bahas: 'I1 = 12/20 = 0,6 A; I2 = 12/30 = 0,4 A; arus total = 1 A.',
    rumus: 'I_{\\text{total}}=\\dfrac{12}{20}+\\dfrac{12}{30}=0.6+0.4=1\\,\\text{A}',
    rumusTeks: 'I total = 12 / 20 + 12 / 30 = 0,6 + 0,4 = 1 A',
    ingat: 'Ingat: arus total pada rangkaian paralel adalah jumlah arus setiap cabang.'
  }
];
