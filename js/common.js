// ===== Util bersama: header, penyimpanan, format angka, slider =====

const KEY = 'mediaOhm';

const Store = {
  // localStorage dibungkus try/catch (bisa diblokir oleh browser)
  get(k, d) {
    try {
      const o = JSON.parse(localStorage.getItem(KEY) || '{}');
      return k in o ? o[k] : d;
    } catch (e) { return d; }
  },
  set(k, v) {
    try {
      const o = JSON.parse(localStorage.getItem(KEY) || '{}');
      o[k] = v;
      localStorage.setItem(KEY, JSON.stringify(o));
    } catch (e) { /* abaikan */ }
  }
};

// Format 2 desimal dengan koma; nilai tak hingga/tidak valid ditampilkan "∞"
const fmt = (n, d = 2) =>
  (Number.isFinite(n) ? n.toFixed(d).replace('.', ',') : '∞');

// Baca input angka, batasi ke rentang, pakai default bila tidak valid
function readNum(v, min, max, def) {
  let n = parseFloat(String(v).replace(',', '.'));
  if (!Number.isFinite(n)) n = def;
  return Math.min(max, Math.max(min, n));
}

// ---- Slider kustom ----
/**
 * updateSlider(el) — menghitung persentase posisi thumb dan mengisi
 * CSS custom property --pct pada elemen slider, sehingga gradient
 * track (kiri=biru, kanan=abu) selalu sinkron dengan nilai slider.
 * Dipanggil saat: input berubah (event 'input') atau nilai diset JS.
 * @param {HTMLInputElement} el  Elemen input[type=range]
 */
function updateSlider(el) {
  const min = parseFloat(el.min) || 0;
  const max = parseFloat(el.max) || 100;
  const val = parseFloat(el.value) || 0;
  const pct = ((val - min) / (max - min)) * 100;
  el.style.setProperty('--pct', pct.toFixed(2) + '%');
}

// Header konsisten: Kembali | Judul | slot tambahan + Home
function renderHeader() {
  const el = document.getElementById('hdr');
  if (!el) return; // aman jika elemen tidak ada (mis. di ui-kit.html)
  const b = document.body, back = b.dataset.back;
  el.className = 'sticky top-0 z-20 text-white flex items-center justify-between px-3 py-3';
  el.style.background = 'var(--navy)';
  el.innerHTML = `<div class="w-24">${back
    ? `<a href="${back}" class="font-medium text-sm" aria-label="Kembali">← Kembali</a>`
    : ''}</div>
  <h1 class="font-semibold text-center flex-1 text-base sm:text-lg">${b.dataset.title}</h1>
  <div class="w-24 flex justify-end items-center gap-2"><span id="hdr-extra" class="text-sm"></span><a href="index.html" aria-label="Beranda" class="text-xl">🏠</a></div>`;
}

renderHeader();

// Pasang listener global: setiap slider diperbarui saat input, dan
// inisialisasi semua slider yang sudah ada di halaman saat DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type=range]').forEach(el => {
    // Inisialisasi posisi awal
    updateSlider(el);
    // Perbarui setiap kali nilai berubah via drag/keyboard
    el.addEventListener('input', () => updateSlider(el));
  });
});
