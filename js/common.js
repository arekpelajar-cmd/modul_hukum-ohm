// ===== Util bersama: header, penyimpanan, format angka =====
const KEY = 'mediaOhm';
const Store = {
  // localStorage dibungkus try/catch (bisa diblokir oleh browser)
  get(k, d) { try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); return k in o ? o[k] : d; } catch (e) { return d; } },
  set(k, v) { try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); o[k] = v; localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* abaikan */ } }
};
// Format 2 desimal dengan koma; nilai tak hingga/tidak valid ditampilkan "∞"
const fmt = (n, d = 2) => (Number.isFinite(n) ? n.toFixed(d).replace('.', ',') : '∞');
// Baca input angka, batasi ke rentang, pakai default bila tidak valid
function readNum(v, min, max, def) { let n = parseFloat(String(v).replace(',', '.')); if (!Number.isFinite(n)) n = def; return Math.min(max, Math.max(min, n)); }
// Header konsisten: Kembali | Judul | slot tambahan + Home
function renderHeader() {
  const el = document.getElementById('hdr'); if (!el) return;
  const b = document.body, back = b.dataset.back;
  el.className = 'sticky top-0 z-20 text-white flex items-center justify-between px-3 py-3';
  el.style.background = 'var(--navy)';
  el.innerHTML = `<div class="w-24">${back ? `<a href="${back}" class="font-medium text-sm" aria-label="Kembali">← Kembali</a>` : ''}</div>
  <h1 class="font-semibold text-center flex-1 text-base sm:text-lg">${b.dataset.title}</h1>
  <div class="w-24 flex justify-end items-center gap-2"><span id="hdr-extra" class="text-sm"></span><a href="index.html" aria-label="Beranda" class="text-xl">🏠</a></div>`;
}
renderHeader();
