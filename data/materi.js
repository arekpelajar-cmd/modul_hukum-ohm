// Teks materi per subbab (mudah diedit). audio = teks yang dibacakan.
const DIAGRAM = `<svg viewBox="0 0 220 140" class="w-full max-w-xs" role="img" aria-label="Rangkaian baterai dan resistor"><path d="M20 50V20H70M150 20H200V120H20V80" fill="none" stroke="#1E4B8F" stroke-width="3"/><polyline points="70,20 80,8 95,32 110,8 125,32 140,8 150,20" fill="none" stroke="#F97316" stroke-width="3"/><line x1="8" y1="50" x2="32" y2="50" stroke="#0F2440" stroke-width="4"/><line x1="14" y1="62" x2="26" y2="62" stroke="#0F2440" stroke-width="4"/><text x="100" y="52" font-size="14" text-anchor="middle">R</text><text x="40" y="70" font-size="14">V</text><text x="205" y="75" font-size="14">I</text></svg>`;
const MATERI = [
 { id:'pengertian', judul:'Pengertian',
   audio:'Hukum Ohm menjelaskan hubungan antara tegangan, arus, dan hambatan dalam suatu rangkaian listrik. Pada hambatan tetap, arus berbanding lurus dengan tegangan dan berbanding terbalik dengan hambatan.',
   html:`<p>Hukum Ohm menjelaskan hubungan antara tegangan (V), arus (I), dan hambatan (R) dalam suatu rangkaian listrik.</p><p class="mt-2">Pada hambatan tetap, arus <b>berbanding lurus</b> dengan tegangan dan <b>berbanding terbalik</b> dengan hambatan.</p><div class="mt-3">${DIAGRAM}</div>` },
 { id:'rumus', judul:'Rumus',
   audio:'Rumus Hukum Ohm adalah V sama dengan I kali R. V adalah tegangan dalam volt, I adalah arus dalam ampere, dan R adalah hambatan dalam ohm. Dari rumus ini, I sama dengan V dibagi R, dan R sama dengan V dibagi I.',
   html:`<div class="box text-2xl my-3" data-tex="V = I \\times R" aria-label="V sama dengan I kali R">V = I × R</div><p class="mb-2">Turunan: <span data-tex="I=\\dfrac{V}{R}">I = V/R</span> dan <span data-tex="R=\\dfrac{V}{I}">R = V/I</span></p><table class="text-sm"><tr><td class="pr-3"><i>V</i></td><td>= Tegangan (Volt)</td></tr><tr><td><i>I</i></td><td>= Arus (Ampere)</td></tr><tr><td><i>R</i></td><td>= Hambatan (Ohm, Ω)</td></tr></table><div class="mt-3">${DIAGRAM}</div>` },
 { id:'contoh', judul:'Contoh Soal',
   audio:'Contoh soal. Sebuah resistor 10 ohm diberi tegangan 20 volt. Berapa arus yang mengalir? Gunakan I sama dengan V dibagi R, yaitu 20 dibagi 10, sama dengan 2 ampere.',
   html:`<p><b>Soal:</b> Sebuah resistor 10 Ω diberi tegangan 20 V. Berapa arus yang mengalir?</p><p class="mt-2"><b>Diketahui:</b> V = 20 V, R = 10 Ω</p><div class="box my-2" data-tex="I=\\dfrac{V}{R}=\\dfrac{20}{10}=2\\ \\text{A}">I = V/R = 20/10 = 2 A</div><p><b>Jadi arus yang mengalir 2 A.</b></p>` },
 { id:'latihan', judul:'Latihan',
   audio:'Latihan. Sebuah resistor dialiri arus 3 ampere pada tegangan 12 volt. Berapa hambatannya dalam ohm? Ketik jawabanmu lalu tekan Cek.',
   html:`<p>Sebuah resistor dialiri arus 3 A pada tegangan 12 V. Berapa hambatannya (Ω)?</p><div class="flex gap-2 items-center my-3"><label for="jwb" class="sr-only">Jawaban</label><input id="jwb" class="val" inputmode="decimal" placeholder="... Ω"><button id="cekLat" class="btn btn-primary">Cek</button></div><div id="fbLat" role="status" class="rounded-lg p-2 hidden"></div>` }
];
