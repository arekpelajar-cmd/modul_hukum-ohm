// ===== Layar 3: Simulasi Hukum Ohm =====
const $ = id => document.getElementById(id);
const WARNA = ['#000', '#8B4513', '#DC2626', '#F97316', '#EAB308', '#16A34A', '#2563EB', '#7C3AED', '#6B7280', '#fff'];
let V = 12, R = 6, jalan = true, geser = 0;
const HITUNG = (v, r) => (r > 0 ? v / r : 0); // cegah pembagian nol
function gelang(r) { // 2 digit + pengali (emas = x0,1)
  if (r < 10) return [WARNA[r], WARNA[0], '#D4AF37'];
  if (r < 100) return [WARNA[Math.floor(r / 10)], WARNA[r % 10], WARNA[0]];
  return [WARNA[1], WARNA[0], WARNA[1]];
}
function ubah() {
  const I = HITUNG(V, R);
  $('vOut').textContent = `${V} V`; $('rOut').textContent = `${R} Ω`;
  $('amp').textContent = `${fmt(I)} A`; $('lblV').textContent = `${V} V`;
  $('hV').textContent = `${V} V`; $('hI').textContent = `${fmt(I)} A`; $('hR').textContent = `${R} Ω`;
  gelang(R).forEach((c, k) => $('g' + k).setAttribute('fill', c));
  $('langkah').classList.add('hidden');
}
function sinkron(slider, num, min, max, def, set) {
  slider.oninput = () => { set(+slider.value); num.value = slider.value; ubah(); };
  // Setelah mengubah slider.value secara programatik, perbarui gradient track
  num.onchange = () => { const n = Math.round(readNum(num.value, min, max, def)); set(n); slider.value = n; num.value = n; updateSlider(slider); ubah(); };
}
sinkron($('v'), $('vn'), 1, 24, 12, n => V = n);
sinkron($('r'), $('rn'), 1, 100, 6, n => R = n);
$('play').onclick = () => {
  jalan = !jalan;
  $('play').innerHTML = jalan ? `${ic('pause', 'w-4 h-4')} Pause` : `${ic('play', 'w-4 h-4')} Play`;
};
$('reset').onclick = () => {
  V = 12; R = 6;
  $('v').value = $('vn').value = 12;
  $('r').value = $('rn').value = 6;
  // Perbarui gradient track slider setelah nilai di-reset
  updateSlider($('v')); updateSlider($('r'));
  ubah();
};
$('cek').onclick = () => {
  const I = HITUNG(V, R), p = $('langkah'); p.classList.remove('hidden');
  p.innerHTML = `<b>Langkah hitung:</b><br>I = V / R<br>I = ${V} / ${R}<br><b>I = ${fmt(I)} A</b>`;
};
// Animasi titik arus mengelilingi persegi panjang rangkaian (kecepatan ∝ I)
const X0 = 60, X1 = 340, Y0 = 50, Y1 = 210, W = X1 - X0, H = Y1 - Y0, P = 2 * (W + H);
const dots = $('dots'), N = 14;
for (let k = 0; k < N; k++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', 4); c.setAttribute('fill', '#F97316'); dots.appendChild(c); }
function pos(s) { s = ((s % P) + P) % P; if (s < W) return [X0 + s, Y0]; s -= W; if (s < H) return [X1, Y0 + s]; s -= H; if (s < W) return [X1 - s, Y1]; s -= W; return [X0, Y1 - s]; }
let t0 = performance.now();
function frame(t) {
  const dt = (t - t0) / 1000; t0 = t;
  if (jalan) geser += Math.min(Math.max(HITUNG(V, R) * 30, 8), 400) * dt;
  [...dots.children].forEach((c, k) => { const [x, y] = pos(geser + k * P / N); c.setAttribute('cx', x); c.setAttribute('cy', y); });
  requestAnimationFrame(frame);
}
ubah(); requestAnimationFrame(frame);
