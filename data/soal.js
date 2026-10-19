// Bank soal (guru bisa menambah). benar = indeks opsi (0=A ... 3=D)
const SOAL = [
 { level:'Mudah', q:'Sebuah resistor 10 Ω diberi tegangan 20 V. Berapa arus yang mengalir?', opsi:['0,5 A','1 A','2 A','10 A'], benar:2, bahas:'I = V/R = 20/10 = 2 A.' },
 { level:'Mudah', q:'Arus 3 A mengalir melalui resistor 4 Ω. Berapa tegangannya?', opsi:['0,75 V','7 V','12 V','1,33 V'], benar:2, bahas:'V = I × R = 3 × 4 = 12 V.' },
 { level:'Mudah', q:'Tegangan 24 V menghasilkan arus 3 A. Berapa hambatannya?', opsi:['72 Ω','8 Ω','27 Ω','0,125 Ω'], benar:1, bahas:'R = V/I = 24/3 = 8 Ω.' },
 { level:'Mudah', q:'Pada rangkaian seri, besaran yang sama di setiap komponen adalah ...', opsi:['Tegangan','Hambatan','Arus','Daya'], benar:2, bahas:'Rangkaian seri hanya punya satu jalur, sehingga arus sama di semua komponen.' },
 { level:'Sedang', q:'Resistor 10 Ω, 20 Ω, dan 30 Ω disusun seri. Hambatan totalnya?', opsi:['5,45 Ω','20 Ω','60 Ω','600 Ω'], benar:2, bahas:'Rt = R1 + R2 + R3 = 10 + 20 + 30 = 60 Ω.' },
 { level:'Sedang', q:'Pada rangkaian paralel, besaran yang sama di setiap cabang adalah ...', opsi:['Arus','Tegangan','Hambatan','Daya'], benar:1, bahas:'Semua cabang paralel terhubung ke dua titik yang sama, sehingga tegangannya sama.' },
 { level:'Sedang', q:'Dua resistor 10 Ω disusun paralel. Hambatan totalnya?', opsi:['20 Ω','10 Ω','5 Ω','2 Ω'], benar:2, bahas:'Rt = (10×10)/(10+10) = 100/20 = 5 Ω.' },
 { level:'Sedang', q:'Sumber 12 V dengan R1 = 10 Ω dan R2 = 20 Ω seri. Berapa tegangan pada R2?', opsi:['4 V','6 V','8 V','12 V'], benar:2, bahas:'I = 12/30 = 0,4 A; V2 = I × R2 = 0,4 × 20 = 8 V.' },
 { level:'Sulit', q:'Resistor 6 Ω dan 12 Ω disusun paralel. Berapa hambatan totalnya?', opsi:['18 Ω','4 Ω','9 Ω','2 Ω'], benar:1, bahas:'Rt = (6×12)/(6+12) = 72/18 = 4 Ω.' },
 { level:'Sulit', q:'Sumber 12 V dihubungkan ke R1 = 20 Ω dan R2 = 30 Ω paralel. Berapa arus total dari sumber?', opsi:['0,24 A','0,6 A','1 A','1,6 A'], benar:2, bahas:'I1 = 12/20 = 0,6 A; I2 = 12/30 = 0,4 A; I total = 0,6 + 0,4 = 1 A (Rt = 12 Ω).' }
];
