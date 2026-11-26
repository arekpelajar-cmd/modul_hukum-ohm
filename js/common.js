// ===== Util bersama: header, penyimpanan, format angka, slider, frame, modal, dan pelacakan alur progres =====

const KEY = 'mediaOhm';
const PROGRES_KEY = 'progresBelajar';
const AUDIO_MUTED_KEY = 'mediaOhmAudioMuted';
const DESIMAL = '.';
let feedbackAudioContext = null;
let feedbackAudioUnlocked = false;

const FEEDBACK_SOUND_NOTES = {
  click: [{ frequency: 740, offset: 0, duration: 0.045, amplitude: 0.025 }],
  correct: [
    { frequency: 523.25, offset: 0, duration: 0.06, amplitude: 0.032 },
    { frequency: 659.25, offset: 0.055, duration: 0.075, amplitude: 0.03 },
  ],
  wrong: [{ frequency: 220, offset: 0, duration: 0.11, amplitude: 0.028 }],
};

function feedbackSoundMuted() {
  try {
    return localStorage.getItem(AUDIO_MUTED_KEY) === 'true';
  } catch (e) {
    return document.documentElement.dataset.audioMuted === 'true';
  }
}

function playFeedbackSound(type) {
  const notes = FEEDBACK_SOUND_NOTES[type];
  if (!notes || feedbackSoundMuted() || !feedbackAudioUnlocked) return false;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return false;

  try {
    if (!feedbackAudioContext) feedbackAudioContext = new AudioContextClass();
    const context = feedbackAudioContext;
    const playNotes = () => {
      if (context.state === 'closed' || feedbackSoundMuted()) return;
      const start = context.currentTime;
      notes.forEach((note) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const noteStart = start + note.offset;
        const noteEnd = noteStart + note.duration;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(note.frequency, noteStart);
        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.exponentialRampToValueAtTime(note.amplitude, noteStart + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteEnd + 0.005);
      });
    };

    if (context.state === 'suspended') {
      context
        .resume()
        .then(playNotes)
        .catch(() => {});
    } else {
      playNotes();
    }
    return true;
  } catch (e) {
    return false;
  }
}

if (typeof window !== 'undefined') window.playFeedbackSound = playFeedbackSound;

document.addEventListener(
  'click',
  (event) => {
    if (event.isTrusted) feedbackAudioUnlocked = true;
  },
  true,
);
document.addEventListener(
  'keydown',
  (event) => {
    if (event.isTrusted) feedbackAudioUnlocked = true;
  },
  true,
);

document.addEventListener('click', (event) => {
  if (!event.isTrusted) return;
  const target =
    event.target instanceof Element
      ? event.target.closest('button, a, input[type="range"], select')
      : null;
  if (!target || target.id === 'hdr-audio-effects' || target.id === 'sub') return;
  playFeedbackSound('click');
});

function sinkronkanTombolEfekSuara() {
  const muted = feedbackSoundMuted();
  document.documentElement.dataset.audioMuted = muted ? 'true' : 'false';
  const button = document.getElementById('hdr-audio-effects');
  if (!button) return;

  const volumeIcon = typeof ic === 'function' ? ic('volume-2', 'w-5 h-5') : '';
  const mutedIcon = typeof ic === 'function' ? ic('x', 'w-3 h-3') : '';
  const label = muted ? 'Nyalakan efek suara' : 'Matikan efek suara';
  button.setAttribute('aria-pressed', muted ? 'false' : 'true');
  button.setAttribute('aria-label', label);
  button.title = label;
  button.innerHTML = muted
    ? `<span class="relative inline-flex">${volumeIcon}<span class="absolute -right-1 -top-1">${mutedIcon}</span></span>`
    : volumeIcon;
}

window.addEventListener('storage', (event) => {
  if (event.key === AUDIO_MUTED_KEY) sinkronkanTombolEfekSuara();
});

const Store = {
  // localStorage dibungkus try/catch (bisa diblokir oleh browser)
  get(k, d) {
    try {
      const o = JSON.parse(localStorage.getItem(KEY) || '{}');
      return k in o ? o[k] : d;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      const o = JSON.parse(localStorage.getItem(KEY) || '{}');
      o[k] = v;
      localStorage.setItem(KEY, JSON.stringify(o));
    } catch (e) {
      /* abaikan */
    }
  },
  hapus(k) {
    try {
      const o = JSON.parse(localStorage.getItem(KEY) || '{}');
      delete o[k];
      localStorage.setItem(KEY, JSON.stringify(o));
    } catch (e) {
      /* abaikan */
    }
  },
  reset() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      /* abaikan */
    }
  },
};
if (typeof window !== 'undefined') window.Store = Store;

// ===== Sistem Pelacakan Alur Pembelajaran Berbasis localStorage (Poin Revisi 3 & 4) =====
const Progres = {
  baca() {
    try {
      const def = { materi: false, simulasiOhm: false, simulasiSp: false, kuis: false };
      const data = JSON.parse(localStorage.getItem(PROGRES_KEY) || '{}');
      return Object.assign({}, def, data);
    } catch (e) {
      return { materi: false, simulasiOhm: false, simulasiSp: false, kuis: false };
    }
  },
  simpan(data) {
    try {
      localStorage.setItem(PROGRES_KEY, JSON.stringify(data));
    } catch (e) {
      /* abaikan */
    }
  },
  tandai(kunci, status = true) {
    const p = this.baca();
    p[kunci] = status;
    this.simpan(p);
    this.updateFlowNav();
  },
  getStatus(kunci) {
    const p = this.baca();
    return !!p[kunci];
  },
  isSiapKuis() {
    const p = this.baca();
    // Pengguna dianggap siap kuis jika materi dan minimal salah satu simulasi sudah dicoba
    return !!(p.materi && (p.simulasiOhm || p.simulasiSp));
  },
  konfirmasiAksesKuis(event, targetUrl = 'kuis.html') {
    if (this.isSiapKuis()) {
      if (targetUrl && !location.pathname.endsWith(targetUrl)) {
        window.location.href = targetUrl;
      }
      return true;
    }
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    const isiModal = `
      <div class="space-y-3 text-sm">
        <div class="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 leading-relaxed">
          <p class="font-bold text-base mb-1.5 flex items-center gap-2">
            <span>Rekomendasi Alur Pembelajaran</span>
          </p>
          <p>Untuk mendapatkan pemahaman konsep yang kokoh dan hasil latihan optimal, Anda sangat disarankan untuk mempelajari <strong>Materi</strong> serta mencoba <strong>Simulasi Interaktif</strong> terlebih dahulu.</p>
        </div>
        <p class="text-gray-600 text-xs">
          Apakah Anda ingin mengikuti alur belajar yang direkomendasikan atau tetap ingin langsung melanjutkan ke latihan soal?
        </p>
      </div>
    `;
    Modal.buka({
      judul: 'Panduan Akses Latihan & Evaluasi',
      isi: isiModal,
      tombol: [
        {
          label: 'Pelajari Materi Dulu',
          kelas: 'btn-primary',
          aksi: () => {
            Modal.tutup();
            window.location.href = 'materi.html';
          },
        },
        {
          label: 'Tetap Lanjut ke Latihan',
          kelas: 'btn-outline',
          aksi: () => {
            Modal.tutup();
            window.location.href = targetUrl || 'kuis.html';
          },
        },
      ],
    });
    return false;
  },
  reset() {
    try {
      localStorage.removeItem(PROGRES_KEY);
    } catch (e) {
      /* abaikan */
    }
    this.updateFlowNav();
  },
  updateFlowNav() {
    const nav = document.getElementById('flow-nav');
    if (!nav) return;
    const p = this.baca();
    const items = [
      { id: 'flow-materi', key: 'materi' },
      { id: 'flow-ohm', key: 'simulasiOhm' },
      { id: 'flow-sp', key: 'simulasiSp' },
      { id: 'flow-kuis', key: 'kuis' },
    ];
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) {
        if (p[it.key]) {
          el.classList.add('flow-step-selesai');
        } else {
          el.classList.remove('flow-step-selesai');
        }
      }
    });
  },
};
if (typeof window !== 'undefined') window.Progres = Progres;

function terapkanPreferensiAksesibilitas() {
  const html = document.documentElement;
  html.dataset.kontras = Store.get('kontras', false) ? 'tinggi' : 'normal';
  html.dataset.huruf = Store.get('hurufBesar', false) ? 'besar' : 'normal';
}
terapkanPreferensiAksesibilitas();

// Format 2 desimal dengan tanda pemisah DESIMAL ('.'); nilai tak hingga/tidak valid ditampilkan "∞"
const fmt = (n, d = 2) => (Number.isFinite(n) ? n.toFixed(d).replace('.', DESIMAL) : '∞');

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
        .map(
          (t, idx) =>
            `<button type="button" id="modal-btn-${idx}" class="btn ${t.kelas || 'btn-outline'}">${t.label}</button>`,
        )
        .join(' ');
    }

    const isiHtml = typeof isi === 'string' ? isi : isi.outerHTML || '';
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
  },
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
  const helpText =
    b.dataset.help ||
    'Gunakan slider untuk mengubah nilai parameter dan amati perubahan pada rangkaian serta hasil pengukuran secara langsung.';

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
      <div class="flex items-center gap-2">
        <button type="button" id="hdr-home" class="hdr-btn-round" aria-label="Ke atas">${iHome}</button>
        <button type="button" id="hdr-settings" class="hdr-btn-round" aria-label="Pengaturan">${iSettings}</button>
        <button type="button" id="hdr-profile" class="hdr-btn-round" aria-label="Profil Siswa">${iUser}</button>
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
      <div class="w-40 flex justify-end items-center gap-2">
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
      <div class="w-36 flex justify-end items-center gap-2">
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
      <div class="w-36 flex justify-end items-center gap-2">
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
      <div class="w-36 flex justify-end items-center gap-2">
        <span id="hdr-extra" class="text-sm"></span>
        <a href="index.html" class="hdr-btn-round" aria-label="Beranda">${iHome}</a>
      </div>
    `;
  }

  const controls = el.lastElementChild;
  if (controls) {
    const soundButton = document.createElement('button');
    soundButton.type = 'button';
    soundButton.id = 'hdr-audio-effects';
    soundButton.className = 'hdr-btn-round';
    const anchor =
      controls.querySelector('#hdr-settings') ||
      controls.querySelector('a[aria-label="Beranda"]') ||
      controls.querySelector('#hdr-home') ||
      controls.lastElementChild;
    controls.insertBefore(soundButton, anchor);
    sinkronkanTombolEfekSuara();
    soundButton.onclick = () => {
      const muted = !feedbackSoundMuted();
      try {
        localStorage.setItem(AUDIO_MUTED_KEY, muted ? 'true' : 'false');
      } catch (e) {
        /* abaikan */
      }
      sinkronkanTombolEfekSuara();
      if (!muted) playFeedbackSound('click');
    };
  }
}

function formatEduBotMessage(rawText) {
  const escapeHtml = (text) =>
    text.replace(/[&<>]/g, (character) => {
      const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
      return entities[character];
    });
  const formatInline = (text) =>
    escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  const lines = String(rawText ?? '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
  const blocks = [];
  let paragraph = [];
  let listType = '';
  let listItems = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${paragraph.map(formatInline).join('<br>')}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listType) {
      const items = listItems.map((item) => `<li>${formatInline(item)}</li>`).join('');
      blocks.push(`<${listType}>${items}</${listType}>`);
      listType = '';
      listItems = [];
    }
  };

  for (const line of lines) {
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const unorderedItem = line.match(/^\s*[-*]\s+(.+)$/);
    const orderedItem = line.match(/^\s*\d+\.\s+(.+)$/);
    const item = unorderedItem || orderedItem;
    if (item) {
      flushParagraph();
      const nextListType = unorderedItem ? 'ul' : 'ol';
      if (listType && listType !== nextListType) flushList();
      listType = nextListType;
      listItems.push(item[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks.join('');
}

let eduBotMathRendererPromise;

function loadEduBotScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.crossOrigin = 'anonymous';
    script.onload = resolve;
    script.onerror = () => {
      script.remove();
      reject(new Error('KaTeX gagal dimuat.'));
    };
    document.head.appendChild(script);
  });
}

function ensureEduBotMathRenderer() {
  if (typeof window.renderMathInElement === 'function') return Promise.resolve();
  if (!eduBotMathRendererPromise) {
    eduBotMathRendererPromise = (async () => {
      const katexVersion = '0.16.9';
      const stylesheetUrl = `https://cdn.jsdelivr.net/npm/katex@${katexVersion}/dist/katex.min.css`;
      if (!document.querySelector('link[href*="katex.min.css"]')) {
        await new Promise((resolve, reject) => {
          const stylesheet = document.createElement('link');
          stylesheet.rel = 'stylesheet';
          stylesheet.href = stylesheetUrl;
          stylesheet.onload = resolve;
          stylesheet.onerror = () => {
            stylesheet.remove();
            reject(new Error('KaTeX stylesheet gagal dimuat.'));
          };
          document.head.appendChild(stylesheet);
        });
      }

      if (!window.katex) {
        await loadEduBotScript(
          `https://cdn.jsdelivr.net/npm/katex@${katexVersion}/dist/katex.min.js`,
        );
      }
      if (typeof window.renderMathInElement !== 'function') {
        await loadEduBotScript(
          `https://cdn.jsdelivr.net/npm/katex@${katexVersion}/dist/contrib/auto-render.min.js`,
        );
      }
      if (typeof window.renderMathInElement !== 'function') {
        throw new Error('KaTeX auto-render tidak tersedia.');
      }
    })().catch((error) => {
      eduBotMathRendererPromise = null;
      throw error;
    });
  }
  return eduBotMathRendererPromise;
}

function formatEduBotMathFallback(bubbleEl) {
  const walker = document.createTreeWalker(bubbleEl, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  for (const node of textNodes) {
    node.nodeValue = node.nodeValue.replace(
      /\$\$([\s\S]+?)\$\$|\$([^$\n]+)\$/g,
      (_, display, inline) =>
        (display || inline)
          .replace(/\\(?:Omega|ohm)\b/g, 'Ω')
          .replace(/\\times\b/g, '×')
          .replace(/\\cdot\b/g, '·')
          .replace(/\\(?:text|mathrm)\{([^{}]*)\}/g, '$1')
          .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1/$2')
          .replace(/\\sqrt\{([^{}]+)\}/g, '√($1)')
          .replace(/[_^]\{([^{}]+)\}/g, '$1')
          .trim(),
    );
  }
}

function renderEduBotMath(bubbleEl) {
  if (!bubbleEl.textContent.includes('$')) return;
  const render = () =>
    window.renderMathInElement(bubbleEl, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    });

  if (typeof window.renderMathInElement === 'function') {
    try {
      render();
    } catch {
      formatEduBotMathFallback(bubbleEl);
    }
    return;
  }

  ensureEduBotMathRenderer()
    .then(render)
    .catch(() => formatEduBotMathFallback(bubbleEl));
}

function renderEduBot() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('kuis.html')) return;
  const halamanDidukung =
    path === '/' || /\/(index|materi|simulasi-ohm|simulasi-sp)\.html$/.test(path);
  if (!halamanDidukung || document.getElementById('edubot-root')) return;

  const root = document.createElement('div');
  root.id = 'edubot-root';
  root.innerHTML = `
    <button type="button" id="edubot-toggle" class="edubot-toggle" aria-label="Buka chat EduBot" aria-expanded="false" aria-controls="edubot-panel">
      ${typeof ic === 'function' ? ic('book-open', 'w-6 h-6') : 'Chat'}
      <span class="edubot-toggle-label">EduBot</span>
    </button>
    <section id="edubot-panel" class="edubot-panel" role="dialog" aria-labelledby="edubot-title" aria-modal="false" hidden>
      <header class="edubot-header">
        <div>
          <h2 id="edubot-title">EduBot</h2>
          <p>Asisten Belajar Kelistrikan</p>
        </div>
        <button type="button" id="edubot-close" class="edubot-icon-button" aria-label="Tutup chat EduBot">
          ${typeof ic === 'function' ? ic('x', 'w-5 h-5') : 'Tutup'}
        </button>
      </header>
      <div id="edubot-messages" class="edubot-messages" role="log" aria-live="polite" aria-relevant="additions text"></div>
      <form id="edubot-form" class="edubot-form">
        <label class="sr-only" for="edubot-input">Tulis pertanyaan untuk EduBot</label>
        <textarea id="edubot-input" rows="1" maxlength="2000" placeholder="Tulis pertanyaan..." required></textarea>
        <button type="submit" id="edubot-send" class="edubot-send" aria-label="Kirim pesan">
          ${typeof ic === 'function' ? ic('arrow-right', 'w-5 h-5') : 'Kirim'}
        </button>
      </form>
    </section>`;
  document.body.appendChild(root);

  const panel = root.querySelector('#edubot-panel');
  const toggle = root.querySelector('#edubot-toggle');
  const messages = root.querySelector('#edubot-messages');
  const input = root.querySelector('#edubot-input');
  const send = root.querySelector('#edubot-send');
  const historyKey = 'mediaOhmEduBotHistory';
  const quickPrompts = [
    'Jelaskan hubungan V, I, dan R pada Hukum Ohm',
    'Apa perbedaan arus dan tegangan pada rangkaian seri dan paralel?',
    'Bantu saya memahami langkah menghitung hambatan pengganti',
  ];
  let conversation = [];

  try {
    const stored = JSON.parse(sessionStorage.getItem(historyKey) || '[]');
    if (Array.isArray(stored)) {
      conversation = stored
        .filter(
          (item) => item && ['user', 'model'].includes(item.role) && typeof item.text === 'string',
        )
        .slice(-20);
    }
  } catch (e) {
    /* abaikan */
  }

  function simpanRiwayat() {
    try {
      sessionStorage.setItem(historyKey, JSON.stringify(conversation.slice(-20)));
    } catch (e) {
      /* abaikan */
    }
  }

  function tambahPesan(role, text) {
    const row = document.createElement('div');
    row.className = `edubot-message edubot-message-${role}`;
    const bubble = document.createElement(role === 'model' ? 'div' : 'p');
    if (role === 'model') {
      bubble.innerHTML = formatEduBotMessage(text);
    } else {
      bubble.textContent = text;
    }
    row.appendChild(bubble);
    messages.appendChild(row);
    if (role === 'model') renderEduBotMath(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function renderPesan() {
    messages.replaceChildren();
    if (!conversation.length) {
      const welcome = document.createElement('p');
      welcome.className = 'edubot-welcome';
      welcome.textContent = 'Halo! Saya EduBot. Mau belajar konsep kelistrikan apa hari ini?';
      messages.appendChild(welcome);
      const quickList = document.createElement('div');
      quickList.className = 'edubot-quick-prompts';
      quickPrompts.forEach((prompt) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'edubot-quick-prompt';
        button.textContent = prompt;
        button.addEventListener('click', () => kirimPesan(prompt));
        quickList.appendChild(button);
      });
      messages.appendChild(quickList);
      return;
    }
    conversation.forEach((item) => tambahPesan(item.role, item.text));
  }

  function setTerbuka(terbuka) {
    panel.hidden = !terbuka;
    toggle.setAttribute('aria-expanded', terbuka ? 'true' : 'false');
    toggle.setAttribute('aria-label', terbuka ? 'Tutup chat EduBot' : 'Buka chat EduBot');
    if (terbuka) input.focus();
  }

  async function kirimPesan(pesan) {
    const message = String(pesan || '')
      .trim()
      .slice(0, 2000);
    if (!message || send.disabled) return;

    const history = conversation.slice(-12).map((item) => ({ role: item.role, text: item.text }));
    conversation.push({ role: 'user', text: message });
    conversation = conversation.slice(-20);
    simpanRiwayat();
    renderPesan();
    input.value = '';
    send.disabled = true;
    const loading = document.createElement('p');
    loading.className = 'edubot-loading';
    loading.textContent = 'EduBot sedang menyiapkan jawaban...';
    messages.appendChild(loading);
    messages.scrollTop = messages.scrollHeight;

    try {
      if (window.location.protocol === 'file:') {
        throw new Error('EduBot membutuhkan server lokal. Jalankan `vercel dev`, lalu buka alamat localhost yang ditampilkan.');
      }
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, currentPage: window.location.pathname }),
      });
      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error('Respons EduBot tidak valid. Pastikan serverless API berjalan melalui Vercel.');
      }
      if (!response.ok) throw new Error(data.error || 'Layanan EduBot belum dapat digunakan.');
      conversation.push({
        role: 'model',
        text: String(data.reply || 'Maaf, saya belum dapat menyusun jawaban.'),
      });
    } catch (error) {
      conversation.push({
        role: 'model',
        text: error.message || 'Koneksi EduBot bermasalah. Silakan coba lagi.',
      });
    } finally {
      conversation = conversation.slice(-20);
      simpanRiwayat();
      send.disabled = false;
      renderPesan();
      input.focus();
    }
  }

  toggle.addEventListener('click', () => setTerbuka(panel.hidden));
  root.querySelector('#edubot-close').addEventListener('click', () => setTerbuka(false));
  root.querySelector('#edubot-form').addEventListener('submit', (event) => {
    event.preventDefault();
    kirimPesan(input.value);
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      root.querySelector('#edubot-form').requestSubmit();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) setTerbuka(false);
  });
  renderPesan();
}

// ---- Render Flow Navigation (Stepper Terpadu Antarfitur - Poin Revisi 3) ----
function renderFlowNav() {
  const b = document.body;
  const varian = b.dataset.header || 'umum';
  if (varian === 'beranda') return; // Beranda sudah memiliki 4 kartu menu

  const hdr = document.getElementById('hdr');
  if (!hdr || !hdr.parentNode) return;
  if (document.getElementById('flow-nav')) return;

  const path = window.location.pathname.toLowerCase();
  let stepAktif = 1;
  if (path.includes('simulasi-ohm.html')) stepAktif = 2;
  else if (path.includes('simulasi-sp.html')) stepAktif = 3;
  else if (path.includes('kuis.html')) stepAktif = 4;
  else if (path.includes('materi.html')) stepAktif = 1;

  const p = Progres.baca();
  const nav = document.createElement('nav');
  nav.id = 'flow-nav';
  nav.className = 'flow-nav';
  nav.setAttribute('aria-label', 'Alur Pembelajaran Modul');

  const langkah = [
    { num: 1, label: 'Materi', href: 'materi.html', id: 'flow-materi', key: 'materi' },
    {
      num: 2,
      label: 'Simulasi Ohm',
      href: 'simulasi-ohm.html',
      id: 'flow-ohm',
      key: 'simulasiOhm',
    },
    { num: 3, label: 'Seri-Paralel', href: 'simulasi-sp.html', id: 'flow-sp', key: 'simulasiSp' },
    { num: 4, label: 'Latihan', href: 'kuis.html', id: 'flow-kuis', key: 'kuis' },
  ];

  let stepsHtml = langkah
    .map((s, idx) => {
      const isAktif = s.num === stepAktif;
      const isSelesai = !!p[s.key];
      const kelasAktif = isAktif ? 'flow-step-aktif' : '';
      const kelasSelesai = isSelesai ? 'flow-step-selesai' : '';
      const separator =
        idx < langkah.length - 1 ? '<span class="flow-separator" aria-hidden="true">→</span>' : '';

      return `
      <li class="flow-step ${kelasAktif} ${kelasSelesai}" id="${s.id}">
        <a href="${s.href}" class="flow-step-link" ${isAktif ? 'aria-current="step"' : ''}>
          <span class="flow-step-num">${s.num}</span>
          <span class="flow-step-text">${s.label}</span>
        </a>
      </li>
      ${separator}
    `;
    })
    .join('');

  nav.innerHTML = `<ol class="flow-steps">${stepsHtml}</ol>`;

  // Sisipkan tepat di bawah header di dalam .frame
  hdr.insertAdjacentElement('afterend', nav);

  // Cegat klik kuis jika belum siap kuis
  const kuisLink = nav.querySelector('#flow-kuis a');
  if (kuisLink) {
    kuisLink.addEventListener('click', (e) => {
      if (!Progres.isSiapKuis()) {
        Progres.konfirmasiAksesKuis(e, 'kuis.html');
      }
    });
  }

  // Tandai progres otomatis sesuai halaman aktif
  if (stepAktif === 1) {
    Progres.tandai('materi', true);
  } else if (stepAktif === 2) {
    Progres.tandai('simulasiOhm', true);
  } else if (stepAktif === 3) {
    Progres.tandai('simulasiSp', true);
  } else if (stepAktif === 4) {
    Progres.tandai('kuis', true);
  }
}

// Inisialisasi Frame dan Header
function initAppChrome() {
  terapkanPreferensiAksesibilitas();
  setupFrame();
  renderHeader();
  renderFlowNav();
  renderEduBot();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAppChrome);
} else {
  initAppChrome();
}

// Pasang listener global slider
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type=range]').forEach((el) => {
    updateSlider(el);
    el.addEventListener('input', () => updateSlider(el));
  });
});
