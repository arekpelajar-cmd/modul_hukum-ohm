// ===== Layar 3: Simulasi Hukum Ohm =====

// Tabel kode warna resistor standar
// 0: Hitam, 1: Coklat, 2: Merah, 3: Oranye, 4: Kuning,
// 5: Hijau, 6: Biru, 7: Ungu, 8: Abu-abu, 9: Putih
const KODE_WARNA = [
  '#000000', // 0 Hitam
  '#8B4513', // 1 Coklat
  '#DC2626', // 2 Merah
  '#F97316', // 3 Oranye
  '#EAB308', // 4 Kuning
  '#16A34A', // 5 Hijau
  '#2563EB', // 6 Biru
  '#7C3AED', // 7 Ungu
  '#6B7280', // 8 Abu-abu
  '#FFFFFF'  // 9 Putih
];
const WARNA_EMAS = '#D4AF37';

// Fungsi murni warnaGelang(R) untuk 4 gelang resistor (2 digit signifikan, pengali, toleransi emas)
function warnaGelang(R) {
  const r = Math.round(Number(R));
  if (r < 10) {
    // R < 10: digit = [R, 0] dan pengali emas (x0.1) serta toleransi emas (±5%)
    return [KODE_WARNA[r] || KODE_WARNA[0], KODE_WARNA[0], WARNA_EMAS, WARNA_EMAS];
  }
  const s = String(r);
  const d1 = parseInt(s[0], 10);
  const d2 = parseInt(s[1], 10);
  const pengaliExp = s.length - 2;
  const cPengali = KODE_WARNA[pengaliExp] || KODE_WARNA[0];
  return [KODE_WARNA[d1], KODE_WARNA[d2], cPengali, WARNA_EMAS];
}

// State simulasi
let V = 12;
let R = 6;
let jalan = false; // Kondisi awal berhenti (Play)
let animId = null;
let geser = 0;
let tSebelumnya = 0;
let timerDebounce = null;

// Rumus arus I = V / R (dengan perlindungan pembagian nol)
const hitungArus = (v, r) => (r > 0 ? v / r : 0);

// Helper DOM
const $ = id => document.getElementById(id);

// Perbarui visualisasi hasil & sirkuit
function perbaruiTampilan() {
  const I = hitungArus(V, R);
  const teksI = `${fmt(I)} A`;
  const teksV = `${V} V`;
  const teksR = `${R} \u03A9`;

  // Label tegangan pada baterai
  const batLbl = $('bat-label');
  if (batLbl) batLbl.textContent = teksV;

  // Nilai pembacaan ammeter
  const ampBox = $('amp-box');
  if (ampBox) ampBox.textContent = teksI;

  // Kotak hasil
  const hV = $('hV');
  if (hV) hV.textContent = teksV;
  const hI = $('hI');
  if (hI) hI.textContent = teksI;
  const hR = $('hR');
  if (hR) hR.textContent = teksR;

  // Output screen reader
  const vOut = $('vOut');
  if (vOut) vOut.textContent = teksV;
  const rOut = $('rOut');
  if (rOut) rOut.textContent = teksR;

  // Gelang warna resistor
  const gelang = warnaGelang(R);
  gelang.forEach((warna, i) => {
    const elGelang = $('g' + i);
    if (elGelang) elGelang.setAttribute('fill', warna);
  });

  // Debounce pembaruan aria-live region agar pembaca layar tidak kebanjiran saat slider digeser
  clearTimeout(timerDebounce);
  timerDebounce = setTimeout(() => {
    const live = $('hasil-announcer');
    if (live) live.textContent = `Hasil saat ini: Tegangan ${V} Volt, Arus ${fmt(I)} Ampere, Hambatan ${R} Ohm.`;
  }, 300);
}

// Inisialisasi Titik-Titik Animasi Aliran Elektron
const JUMLAH_TITIK = 6;
let pathLoop = null;
let totalPanjang = 0;
const titikElements = [];
const preferReducedMotion = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: false };

function siapkanTitikAnimasi() {
  pathLoop = $('loop');
  const groupDots = $('dots');
  if (!groupDots || !pathLoop) return;

  groupDots.style.visibility = 'hidden';
  groupDots.innerHTML = '';
  titikElements.length = 0;

  try {
    totalPanjang = pathLoop.getTotalLength();
  } catch (_) {
    totalPanjang = 840; // perkiraan cadangan jika getTotalLength tidak tersedia (mis. lingkungan test)
  }

  for (let i = 0; i < JUMLAH_TITIK; i++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('r', '4.5');
    c.setAttribute('fill', 'var(--blue)');
    groupDots.appendChild(c);
    titikElements.push(c);
  }

  letakkanTitik(0);
}

// Tempatkan titik sepanjang lintasan #loop
function letakkanTitik(offset) {
  if (!pathLoop || titikElements.length === 0 || !totalPanjang) return;
  const jarakAntar = totalPanjang / JUMLAH_TITIK;

  titikElements.forEach((c, idx) => {
    const d = ((offset + idx * jarakAntar) % totalPanjang + totalPanjang) % totalPanjang;
    if (typeof pathLoop.getPointAtLength === 'function') {
      try {
        const pt = pathLoop.getPointAtLength(d);
        c.setAttribute('cx', pt.x);
        c.setAttribute('cy', pt.y);
      } catch (_) {
        // Fallback matematika jika getPointAtLength gagal
        fallbackPosisiTitik(c, d);
      }
    } else {
      fallbackPosisiTitik(c, d);
    }
  });
}

// Fallback posisi keliling persegi panjang (68,50 ke 308,208)
function fallbackPosisiTitik(c, d) {
  const x0 = 68, x1 = 308, y0 = 50, y1 = 208;
  const w = x1 - x0, h = y1 - y0, p = 2 * (w + h);
  let s = ((d % p) + p) % p;
  if (s < w) { c.setAttribute('cx', x0 + s); c.setAttribute('cy', y0); return; }
  s -= w;
  if (s < h) { c.setAttribute('cx', x1); c.setAttribute('cy', y0 + s); return; }
  s -= w;
  if (s < w) { c.setAttribute('cx', x1 - s); c.setAttribute('cy', y1); return; }
  s -= w;
  c.setAttribute('cx', x0); c.setAttribute('cy', y1 - s);
}

// Loop Animasi requestAnimationFrame
function animasiFrame(t) {
  if (!jalan) return;

  if (!tSebelumnya) tSebelumnya = t;
  const dt = (t - tSebelumnya) / 1000;
  tSebelumnya = t;

  const I = hitungArus(V, R);
  // Laju gerak proporsional terhadap arus I (k x I) dengan batas atas dan batas bawah
  const laju = Math.min(Math.max(I * 45, 18), 350);
  geser = (geser + laju * dt) % totalPanjang;

  letakkanTitik(geser);
  animId = requestAnimationFrame(animasiFrame);
}

// Kontrol Play / Pause
function setStatusAnimasi(mulai) {
  const btnPlay = $('play');
  const groupDots = $('dots');

  jalan = mulai;
  if (groupDots) {
    groupDots.style.visibility = jalan ? 'visible' : 'hidden';
  }
  if (animId) cancelAnimationFrame(animId);
  animId = null;
  if (jalan) {
    // Play adalah aksi eksplisit pengguna; pilihan Kurangi gerakan tetap berlaku saat preferensi berubah.
    tSebelumnya = performance.now();
    animId = requestAnimationFrame(animasiFrame);
    if (btnPlay) {
      btnPlay.innerHTML = typeof ic === 'function' ? ic('pause', 'w-6 h-6') : 'Pause';
      btnPlay.setAttribute('aria-label', 'Jeda animasi');
      btnPlay.setAttribute('aria-pressed', 'true');
    }
  } else {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    if (btnPlay) {
      btnPlay.innerHTML = typeof ic === 'function' ? ic('play', 'w-6 h-6') : 'Play';
      btnPlay.setAttribute('aria-label', 'Mulai animasi aliran arus');
      btnPlay.setAttribute('aria-pressed', 'false');
    }
  }
}

// Sinkronisasi Slider dan Input Angka dengan Clamp
function pasangSinkronisasi(slider, input, min, max, defaultVal, callbackUbah) {
  if (!slider || !input) return;

  // Slider digeser
  slider.addEventListener('input', () => {
    const val = parseFloat(slider.value);
    input.value = val;
    callbackUbah(val);
    perbaruiTampilan();
  });

  // Input teks diubah/diketik (menerima angka desimal/koma/titik)
  input.addEventListener('change', () => {
    const val = readNum(input.value, min, max, defaultVal);
    input.value = val;
    slider.value = val;
    updateSlider(slider);
    callbackUbah(val);
    perbaruiTampilan();
  });

  // Tombol Enter pada input langsung memicu blur/change
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      input.blur();
    }
  });
}

// Tombol Reset ke Default
function resetSimulasi() {
  V = 12;
  R = 6;
  const sliderV = $('v');
  const inputV = $('vn');
  const sliderR = $('r');
  const inputR = $('rn');

  if (sliderV) { sliderV.value = 12; updateSlider(sliderV); }
  if (inputV) inputV.value = 12;
  if (sliderR) { sliderR.value = 6; updateSlider(sliderR); }
  if (inputR) inputR.value = 6;

  setStatusAnimasi(false);
  perbaruiTampilan();
  letakkanTitik(0);
}

// Tombol Cek: Buka Modal Langkah Hitung
function bukaLangkahHitung() {
  const I = hitungArus(V, R);
  const teksI = fmt(I);

  const isiModal = `
    <div class="space-y-3">
      <div class="p-3 bg-[var(--box-formula)] rounded-lg text-center font-mono font-bold text-lg text-[var(--navy)]">
        I = V / R
      </div>
      <div class="text-sm space-y-1">
        <p><strong>Diketahui:</strong></p>
        <ul class="list-disc list-inside ml-2 text-gray-700">
          <li>Tegangan (V) = ${V} V</li>
          <li>Hambatan (R) = ${R} &Omega;</li>
        </ul>
      </div>
      <div class="text-sm space-y-1">
        <p><strong>Ditanya:</strong> Kuat Arus (I) = ... ?</p>
      </div>
      <div class="text-sm space-y-1">
        <p><strong>Langkah Perhitungan:</strong></p>
        <p class="font-mono ml-2">I = ${V} / ${R} = <strong>${teksI} A</strong></p>
      </div>
      <div class="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-lg text-sm text-[var(--ink)]">
        <strong>Tafsir:</strong> Bila tegangan naik, arus naik; bila hambatan naik, arus turun.
      </div>
    </div>
  `;

  if (window.Modal && typeof window.Modal.buka === 'function') {
    window.Modal.buka({
      judul: 'Langkah Hitung Hukum Ohm',
      isi: isiModal,
      tombol: [{ label: 'Tutup', kelas: 'btn-primary', aksi: () => window.Modal.tutup() }]
    });
  }
}

// Hentikan rAF saat tab tersembunyi
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (jalan && animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  } else {
    if (jalan && !animId) {
      tSebelumnya = performance.now();
      animId = requestAnimationFrame(animasiFrame);
    }
  }
});

// Inisialisasi saat DOM siap
function initSimulasiOhm() {
  siapkanTitikAnimasi();

  const hentikanJikaKurangiGerakan = () => {
    if (preferReducedMotion.matches && jalan) setStatusAnimasi(false);
  };
  if (typeof preferReducedMotion.addEventListener === 'function') {
    preferReducedMotion.addEventListener('change', hentikanJikaKurangiGerakan);
  } else if (typeof preferReducedMotion.addListener === 'function') {
    preferReducedMotion.addListener(hentikanJikaKurangiGerakan);
  }

  const sliderV = $('v');
  const inputV = $('vn');
  const sliderR = $('r');
  const inputR = $('rn');

  pasangSinkronisasi(sliderV, inputV, 1, 24, 12, val => { V = val; });
  pasangSinkronisasi(sliderR, inputR, 1, 100, 6, val => { R = val; });

  const btnPlay = $('play');
  if (btnPlay) {
    btnPlay.onclick = () => setStatusAnimasi(!jalan);
  }

  const btnReset = $('reset');
  if (btnReset) {
    btnReset.onclick = resetSimulasi;
  }

  const btnCek = $('cek');
  if (btnCek) {
    btnCek.onclick = bukaLangkahHitung;
  }

  perbaruiTampilan();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSimulasiOhm);
} else {
  initSimulasiOhm();
}

// Ekspor untuk pengujian lingkungan JSDOM/Node
if (typeof window !== 'undefined') {
  window.warnaGelang = warnaGelang;
  window.hitungArus = hitungArus;
  window.resetSimulasi = resetSimulasi;
  window.setStatusAnimasi = setStatusAnimasi;
}
