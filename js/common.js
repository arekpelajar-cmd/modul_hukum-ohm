// ===== Util bersama: header, penyimpanan, format angka, slider, frame, modal =====

const KEY = 'mediaOhm';
const DESIMAL = '.';

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
  },
  hapus(k) {
    try {
      const o = JSON.parse(localStorage.getItem(KEY) || '{}');
      delete o[k];
      localStorage.setItem(KEY, JSON.stringify(o));
    } catch (e) { /* abaikan */ }
  },
  reset() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) { /* abaikan */ }
  }
};
if (typeof window !== 'undefined') window.Store = Store;

// Format 2 desimal dengan tanda pemisah DESIMAL ('.'); nilai tak hingga/tidak valid ditampilkan "∞"
const fmt = (n, d = 2) =>
  (Number.isFinite(n) ? n.toFixed(d).replace('.', DESIMAL) : '∞');

// Baca input angka, batasi ke rentang, pakai default bila tidak valid (terima titik atau koma)
function readNum(v, min, max, def) {
  let n = parseFloat(String(v).replace(',', '.'));
  if (!Number.isFinite(n)) n = def;
  return Math.min(max, Math.max(min, n));
}

// ---- Slider kustom ----
function updateSlider(el) {
  const min = parseFloat(el.min) || 0;
  const max = parseFloat(el.max) || 100;
  const val = parseFloat(el.value) || 0;
  const pct = ((val - min) / (max - min)) * 100;
  el.style.setProperty('--pct', pct.toFixed(2) + '%');
}

// ---- Modal Generik (<dialog id="modal" class="modal">) ----
const Modal = {
  el: null,
  init() {
    if (this.el) return;
    let m = document.getElementById('modal');
    if (!m) {
      m = document.createElement('dialog');
      m.id = 'modal';
      m.className = 'modal';
      document.body.appendChild(m);
    }
    // Klik di luar kotak dialog menutup modal
    m.addEventListener('click', (e) => {
      const rect = m.getBoundingClientRect();
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!inDialog) {
        Modal.tutup();
      }
    });
    m.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
    });
    this.el = m;
  },
  buka({ judul = 'Informasi', isi = '', tombol = [] }) {
    this.init();
    const iconClose = typeof ic === 'function' ? ic('x', 'w-5 h-5') : 'x';
    let btnHtml = '';
    if (!tombol || tombol.length === 0) {
      btnHtml = `<button type="button" class="btn btn-primary" onclick="Modal.tutup()">Tutup</button>`;
    } else {
      btnHtml = tombol
        .map((t, idx) => `<button type="button" id="modal-btn-${idx}" class="btn ${t.kelas || 'btn-outline'}">${t.label}</button>`)
        .join(' ');
    }

    const isiHtml = typeof isi === 'string' ? isi : (isi.outerHTML || '');
    this.el.innerHTML = `
      <div class="modal-header">
        <h2 id="modal-title">${judul}</h2>
        <button type="button" class="modal-close" aria-label="Tutup" onclick="Modal.tutup()">${iconClose}</button>
      </div>
      <div class="modal-body" id="modal-desc">${isiHtml}</div>
      <div class="modal-footer">${btnHtml}</div>
    `;
    this.el.setAttribute('aria-labelledby', 'modal-title');
    this.el.setAttribute('aria-describedby', 'modal-desc');

    if (tombol && tombol.length > 0) {
      tombol.forEach((t, idx) => {
        const b = document.getElementById(`modal-btn-${idx}`);
        if (b && typeof t.aksi === 'function') {
          b.onclick = (e) => t.aksi(e);
        }
      });
    }

    document.body.classList.add('modal-open');
    if (typeof this.el.showModal === 'function') {
      this.el.showModal();
    } else {
      this.el.setAttribute('open', '');
    }
  },
  tutup() {
    if (!this.el) return;
    if (typeof this.el.close === 'function') {
      this.el.close();
    } else {
      this.el.removeAttribute('open');
      document.body.classList.remove('modal-open');
    }
  }
};
if (typeof window !== 'undefined') window.Modal = Modal;

// ---- Pembungkus Frame ----
function setupFrame() {
  const hdr = document.getElementById('hdr');
  const main = document.querySelector('main');
  if (!hdr || !main) return;
  if (hdr.parentElement && hdr.parentElement.classList.contains('frame')) return;

  const w = document.body.dataset.width;
  const frame = document.createElement('div');
  frame.className = `frame ${w === 'lebar' ? 'frame-lebar' : 'frame-sempit'}`;

  hdr.parentNode.insertBefore(frame, hdr);
  frame.appendChild(hdr);
  frame.appendChild(main);
}

// ---- Render Header 4 Varian ----
function renderHeader() {
  const el = document.getElementById('hdr');
  if (!el) return;

  const b = document.body;
  const varian = b.dataset.header || 'umum';
  const title = b.dataset.title || '';
  const back = b.dataset.back || '';
  const helpText = b.dataset.help || 'Gunakan slider untuk mengubah nilai parameter dan amati perubahan pada rangkaian serta hasil pengukuran secara langsung.';

  el.className = 'app-header';

  // Ikon helper
  const iZap = typeof ic === 'function' ? ic('zap', 'w-5 h-5') : '';
  const iHome = typeof ic === 'function' ? ic('home', 'w-5 h-5') : '';
  const iSettings = typeof ic === 'function' ? ic('settings', 'w-5 h-5') : '';
  const iUser = typeof ic === 'function' ? ic('user', 'w-5 h-5') : '';
  const iBack = typeof ic === 'function' ? ic('chevron-left', 'w-5 h-5') : '<-';
  const iVolume = typeof ic === 'function' ? ic('volume-2', 'w-4 h-4') : '';
  const iHelp = typeof ic === 'function' ? ic('help-circle', 'w-5 h-5') : '?';

  if (varian === 'beranda') {
    el.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">${iZap}</span>
        <span class="font-bold text-base tracking-wide">Modul Interaktif</span>
      </div>
      <h1 class="sr-only">Modul Interaktif: Hukum Ohm dan Rangkaian Seri-Paralel</h1>
      <div class="flex items-center gap-2">
        <button type="button" id="hdr-home" class="hdr-btn-round" aria-label="Ke atas">${iHome}</button>
        <button type="button" id="hdr-settings" class="hdr-btn-round" aria-label="Pengaturan">${iSettings}</button>
        <button type="button" id="hdr-profile" class="hdr-btn-round" aria-label="Profil">${iUser}</button>
      </div>
    `;
    const btnHome = document.getElementById('hdr-home');
    if (btnHome) {
      btnHome.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } else if (varian === 'materi') {
    el.innerHTML = `
      <div class="w-24">
        ${back ? `<a href="${back}" class="font-medium text-sm inline-flex items-center gap-1 text-white no-underline hover:underline" aria-label="Kembali">${iBack} <span>Kembali</span></a>` : ''}
      </div>
      <h1 class="font-semibold text-center flex-1 text-base sm:text-lg m-0 truncate px-2">${title}</h1>
      <div class="w-32 flex justify-end items-center gap-2">
        <button type="button" id="audio" class="hdr-btn-pill" aria-pressed="false" aria-label="Dengarkan Audio">
          ${iVolume} <span id="audio-label">Audio</span>
        </button>
        <a href="index.html" id="hdr-home" class="hdr-btn-round" aria-label="Beranda">${iHome}</a>
      </div>
    `;
  } else if (varian === 'bantuan') {
    el.innerHTML = `
      <div class="w-24">
        ${back ? `<a href="${back}" class="font-medium text-sm inline-flex items-center gap-1 text-white no-underline hover:underline" aria-label="Kembali">${iBack} <span>Kembali</span></a>` : ''}
      </div>
      <h1 class="font-semibold text-center flex-1 text-base sm:text-lg m-0 truncate px-2">${title}</h1>
      <div class="w-24 flex justify-end items-center gap-2">
        <button type="button" id="hdr-help" class="hdr-btn-round" aria-label="Bantuan">${iHelp}</button>
        <a href="index.html" class="hdr-btn-round" aria-label="Beranda">${iHome}</a>
      </div>
    `;
    const btnHelp = document.getElementById('hdr-help');
    if (btnHelp) {
      btnHelp.onclick = () => Modal.buka({ judul: 'Bantuan Simulasi', isi: helpText });
    }
  } else if (varian === 'kuis') {
    el.innerHTML = `
      <div class="w-24">
        ${back ? `<a href="${back}" class="font-medium text-sm inline-flex items-center gap-1 text-white no-underline hover:underline" aria-label="Kembali">${iBack} <span>Kembali</span></a>` : ''}
      </div>
      <h1 class="font-semibold text-center flex-1 text-base sm:text-lg m-0 truncate px-2">${title}</h1>
      <div class="w-24 flex justify-end items-center gap-2">
        <span id="hdr-extra" class="pill"></span>
        <a href="index.html" class="hdr-btn-round" aria-label="Beranda">${iHome}</a>
      </div>
    `;
  } else {
    // Varian umum / cadangan
    el.innerHTML = `
      <div class="w-24">
        ${back ? `<a href="${back}" class="font-medium text-sm inline-flex items-center gap-1 text-white no-underline hover:underline" aria-label="Kembali">${iBack} <span>Kembali</span></a>` : ''}
      </div>
      <h1 class="font-semibold text-center flex-1 text-base sm:text-lg m-0 truncate px-2">${title}</h1>
      <div class="w-24 flex justify-end items-center gap-2">
        <span id="hdr-extra" class="text-sm"></span>
        <a href="index.html" class="hdr-btn-round" aria-label="Beranda">${iHome}</a>
      </div>
    `;
  }
}

// Inisialisasi Frame dan Header
function initAppChrome() {
  setupFrame();
  renderHeader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAppChrome);
} else {
  initAppChrome();
}

// Pasang listener global slider
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type=range]').forEach(el => {
    updateSlider(el);
    el.addEventListener('input', () => updateSlider(el));
  });
});
