// ===== Layar 5: Simulasi Seri-Paralel + Mode Tantangan =====
const $ = id => document.getElementById(id), SUMBER = 12;
let mode = 'seri', R1 = 10, R2 = 20, tant = null;
const SKEN = [
  { t: 'Buat Rt seri = 30 Ω', mode: 'seri', k: 'Rt', val: 30, u: 'Ω' },
  { t: 'Buat Rt paralel = 6 Ω', mode: 'paralel', k: 'Rt', val: 6, u: 'Ω' },
  { t: 'Buat Rt seri = 50 Ω', mode: 'seri', k: 'Rt', val: 50, u: 'Ω' },
  { t: 'Buat Rt paralel = 5 Ω', mode: 'paralel', k: 'Rt', val: 5, u: 'Ω' },
  { t: 'Buat arus seri = 0,2 A', mode: 'seri', k: 'I', val: 0.2, u: 'A' }
];
function hitung() { // pembagian nol dicegah: R minimal 1 Ω
  if (mode === 'seri') { const Rt = R1 + R2, I = SUMBER / Rt; return { Rt, I, V1: I * R1, V2: I * R2 }; }
  const Rt = R1 * R2 / (R1 + R2); return { Rt, I: SUMBER / Rt, V1: SUMBER, V2: SUMBER, I1: SUMBER / R1, I2: SUMBER / R2 };
}
const zig = x => `<polyline points="${x},40 ${x + 10},32 ${x + 25},48 ${x + 40},32 ${x + 55},48 ${x + 70},32 ${x + 80},40" fill="none" stroke="#F97316" stroke-width="3"/>`;
function gambar(c) {
  const dur = Math.min(Math.max(1.2 / Math.max(c.I, .05), .15), 4).toFixed(2), a = `class="flow" style="animation-duration:${dur}s"`;
  const bat = `<line x1="45" x2="75" y1="100" y2="100" stroke="#0F2440" stroke-width="4"/><line x1="52" x2="68" y1="112" y2="112" stroke="#0F2440" stroke-width="4"/><text x="8" y="112" font-size="13">12 V</text>`;
  if (mode === 'seri') return `<svg viewBox="0 0 400 230" class="w-full" role="img" aria-label="Rangkaian seri"><path ${a} d="M60,100V40H100M180,40H220M300,40H340V190H60V112" fill="none" stroke="#1D6FE8" stroke-width="3"/>${zig(100)}${zig(220)}${bat}<text x="120" y="22" font-size="13">R1 ${R1} Ω</text><text x="240" y="22" font-size="13">R2 ${R2} Ω</text></svg>`;
  return `<svg viewBox="0 0 400 230" class="w-full" role="img" aria-label="Rangkaian paralel"><path ${a} d="M60,40V100M60,112V190M60,40H130M210,40H340M60,190H130M210,190H340M340,40V190" fill="none" stroke="#1D6FE8" stroke-width="3"/>${zig(130)}<g transform="translate(0,150)">${zig(130)}</g>${bat}<text x="150" y="22" font-size="13">R1 ${R1} Ω</text><text x="150" y="172" font-size="13">R2 ${R2} Ω</text></svg>`;
}
function ubah() {
  const c = hitung(); $('diagram').innerHTML = gambar(c);
  $('r1o').textContent = `${R1} Ω`; $('r2o').textContent = `${R2} Ω`;
  $('hRt').textContent = `${fmt(c.Rt)} Ω`; $('hI').textContent = `${fmt(c.I)} A`;
  $('hV1').textContent = `${fmt(c.V1)} V`; $('hV2').textContent = `${fmt(c.V2)} V`;
  $('cabang').textContent = mode === 'paralel' ? `Arus cabang: I1 = ${fmt(c.I1)} A, I2 = ${fmt(c.I2)} A` : '';
  $('rumus').textContent = mode === 'seri' ? 'Seri: Rt = R1 + R2; I = V/Rt; V1 = I·R1; V2 = I·R2' : 'Paralel: Rt = R1·R2/(R1+R2); V1 = V2 = V; I1 = V/R1; I2 = V/R2';
  $('bSeri').setAttribute('aria-pressed', mode === 'seri'); $('bPar').setAttribute('aria-pressed', mode === 'paralel');
  $('bSeri').classList.toggle('btn-primary', mode === 'seri'); $('bPar').classList.toggle('btn-primary', mode === 'paralel');
}
function setMode(m) { mode = m; ubah(); }
$('bSeri').onclick = () => setMode('seri'); $('bPar').onclick = () => setMode('paralel');
function sinkron(s, n, set) {
  s.oninput = () => { set(+s.value); n.value = s.value; ubah(); };
  // Setelah mengubah slider.value secara programatik, perbarui gradient track
  n.onchange = () => { const v = Math.round(readNum(n.value, 1, 100, 10)); set(v); s.value = n.value = v; updateSlider(s); ubah(); };
}
sinkron($('r1'), $('r1n'), v => R1 = v); sinkron($('r2'), $('r2n'), v => R2 = v);
function setR(a, b) {
  R1 = a; R2 = b;
  $('r1').value = $('r1n').value = a;
  $('r2').value = $('r2n').value = b;
  // Perbarui gradient track setelah nilai diset programatik
  updateSlider($('r1')); updateSlider($('r2'));
}
$('reset').onclick = () => { setR(10, 20); mode = 'seri'; ubah(); $('info').textContent = ''; };
$('hint').onclick = () => { // petunjuk kontekstual
  let h;
  if (tant && !tant.selesai) { const s = SKEN[tant.i]; h = s.k === 'I' ? `Ingat I = V/Rt dengan V = 12 V. Untuk ${fmt(s.val)} A, Rt harus ${fmt(SUMBER / s.val, 0)} Ω.` : s.mode === 'seri' ? `Seri: Rt = R1 + R2. Cari dua nilai yang jumlahnya ${s.val} Ω.` : `Paralel: Rt selalu lebih kecil dari R terkecil. Coba R1 = R2 = ${s.val * 2} Ω.`; }
  else h = mode === 'seri' ? 'Pada seri, arus sama di semua resistor; tegangan terbagi sebanding dengan R.' : 'Pada paralel, tegangan tiap cabang sama; arus terbagi, dan Rt lebih kecil dari R terkecil.';
  $('info').textContent = '💡 ' + h;
};
// ---- Mode Tantangan ----
function tampilTant() {
  const p = $('tant'); p.classList.remove('hidden');
  if (tant.selesai) { const lulus = tant.ok >= 4; Store.set('spBest', Math.max(Store.get('spBest', 0), tant.ok));
    p.innerHTML = `<b>Tantangan selesai:</b> ${tant.ok}/5 berhasil — <span class="font-bold ${lulus ? 'text-green-700' : 'text-red-700'}">${lulus ? 'LULUS' : 'Belum lulus (min. 4 dari 5)'}</span><br><button id="ulT" class="btn mt-2">Ulangi Tantangan</button>`;
    $('ulT').onclick = mulaiT; return; }
  const s = SKEN[tant.i]; setMode(s.mode);
  p.innerHTML = `<b>Skenario ${tant.i + 1}/5:</b> ${s.t}<br><button id="cekT" class="btn btn-primary mt-2">Periksa</button> <span id="fbT" role="status" class="ml-2 font-semibold"></span>`;
  $('cekT').onclick = () => {
    const c = hitung(), ok = Math.abs(c[s.k] - s.val) < 0.05; if (ok) tant.ok++;
    $('fbT').textContent = ok ? '✅ Berhasil!' : `❌ Belum tepat (hasil: ${fmt(c[s.k])} ${s.u})`; $('cekT').disabled = true;
    setTimeout(() => { tant.i++; if (tant.i >= SKEN.length) tant.selesai = true; tampilTant(); }, 1200);
  };
}
function mulaiT() { tant = { i: 0, ok: 0, selesai: false }; tampilTant(); }
$('btnT').onclick = mulaiT;
$('selesai').onclick = () => {
  const best = Store.get('spBest', 0);
  $('info').innerHTML = `Terima kasih! Skor tantangan terbaik: <b>${best}/5</b>. <a class="underline text-blue-700" href="kuis.html">Kerjakan kuis</a> atau <a class="underline text-blue-700" href="index.html">kembali ke beranda</a>.`;
};
ubah();
