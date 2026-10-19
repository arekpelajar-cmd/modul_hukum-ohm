// ===== js/materi.js — Interaktivitas Layar 2: Materi Hukum Ohm =====

let idx = 0;
let bicara = false;

// Elemen DOM
const tablist = document.getElementById('tablist-materi');
const box = document.getElementById('konten');
const announcer = document.getElementById('materi-announcer');
const btnNext = document.getElementById('lanjut');
const btnAudio = () => document.getElementById('audio');
const audioLabel = () => document.getElementById('audio-label');

// Render formula KaTeX dengan fallback teks biasa tanpa melempar error
function renderMath() {
  document.querySelectorAll('[data-tex]').forEach(el => {
    const formula = el.getAttribute('data-tex');
    const fallback = el.getAttribute('data-fallback') || formula;
    if (window.katex && typeof window.katex.render === 'function') {
      try {
        window.katex.render(formula, el, {
          throwOnError: false,
          displayMode: el.classList.contains('katex-block')
        });
      } catch (_) {
        el.textContent = fallback;
      }
    } else {
      el.textContent = fallback;
    }
  });
}

function resetAudioUI() {
  bicara = false;
  const lbl = audioLabel();
  const btn = btnAudio();
  if (lbl) lbl.textContent = 'Audio';
  if (btn) btn.setAttribute('aria-pressed', 'false');
}

function stopAudio() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  }
  resetAudioUI();
}

// Template Konten per Subbab
function renderContentHtml(m) {
  let innerHtml = '';

  if (m.id === 'pengertian') {
    innerHtml = `
      <div class="space-y-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-2">Hukum Ohm</h2>
          <p class="text-sm sm:text-base text-gray-700 leading-relaxed">${m.paragraf}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[57%_43%] gap-4 items-center pt-2">
          <div class="space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--navy)] block mb-1">Analogi Konsep:</span>
            ${m.analogi.map(item => `
              <div class="p-2.5 rounded-lg bg-[var(--box)] border border-blue-100 flex items-start gap-2.5">
                <span class="text-[var(--blue)] font-bold text-sm shrink-0">${typeof ic === 'function' ? ic('zap', 'w-4 h-4') : '•'}</span>
                <div class="text-xs sm:text-sm">
                  <strong class="text-[var(--ink)]">${item.istilah}:</strong> ${item.peran}
                </div>
              </div>
            `).join('')}
          </div>
          <div class="p-3 bg-white rounded-xl border border-[var(--line)] shadow-sm flex items-center justify-center">
            ${buatDiagramMateri({ labelV: 'V', labelR: 'R', labelI: 'I' })}
          </div>
        </div>
      </div>
    `;
  } else if (m.id === 'rumus') {
    innerHtml = `
      <div class="space-y-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-2">Hukum Ohm</h2>
          <p class="text-sm sm:text-base text-gray-700 leading-relaxed">${m.paragraf}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[57%_43%] gap-4 items-center pt-2">
          <!-- Kolom Kiri: Kotak Rumus KaTeX & Tabel Simbol -->
          <div class="space-y-4">
            <div class="box-formula">
              <span class="katex-block" data-tex="${m.rumus}" data-fallback="${m.rumusTeks}">${m.rumusTeks}</span>
            </div>

            <div class="overflow-hidden rounded-lg border border-[var(--line)]">
              <table class="w-full text-xs sm:text-sm text-left bg-white">
                <tbody>
                  ${m.simbol.map(s => `
                    <tr class="border-b border-gray-100 last:border-0 hover:bg-blue-50/30">
                      <td class="py-2 px-3 font-bold italic text-[var(--ink)] w-10 text-center">${s.s}</td>
                      <td class="py-2 px-1 text-gray-400 w-6 text-center">${s.tanda}</td>
                      <td class="py-2 px-3 text-gray-700">${s.nama}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Kolom Kanan: Diagram Rangkaian SVG -->
          <div class="p-3 bg-white rounded-xl border border-[var(--line)] shadow-sm flex items-center justify-center">
            ${buatDiagramMateri({ labelV: 'V', labelR: 'R', labelI: 'I' })}
          </div>
        </div>
      </div>
    `;
  } else if (m.id === 'contoh') {
    innerHtml = `
      <div class="space-y-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-2">Contoh Soal</h2>
          <div class="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
            <p class="text-sm sm:text-base font-medium text-gray-800">${m.paragraf}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[57%_43%] gap-4 items-center pt-2">
          <div class="space-y-3">
            <div class="text-xs sm:text-sm space-y-1.5 p-3 rounded-xl bg-white border border-[var(--line)]">
              <p><strong class="text-[var(--navy)]">Diketahui:</strong> ${m.contoh.diketahui}</p>
              <p><strong class="text-[var(--navy)]">Ditanya:</strong> ${m.contoh.ditanya}</p>
              <div class="pt-2 border-t border-gray-100">
                <span class="font-bold text-[var(--navy)] block mb-1">Penyelesaian:</span>
                <div class="p-2 bg-[var(--box-formula)] rounded-lg text-center font-bold text-base sm:text-lg">
                  <span data-tex="${m.contoh.jawabKaTeX}" data-fallback="${m.contoh.jawabTeks}">${m.contoh.jawabTeks}</span>
                </div>
              </div>
              <p class="pt-1.5 text-xs text-green-700 font-semibold">${m.contoh.kesimpulan}</p>
            </div>
          </div>

          <div class="p-3 bg-white rounded-xl border border-[var(--line)] shadow-sm flex items-center justify-center">
            ${buatDiagramMateri({ labelV: '20 V', labelR: '10 Ω', labelI: '2 A' })}
          </div>
        </div>
      </div>
    `;
  } else if (m.id === 'latihan') {
    innerHtml = `
      <div class="space-y-5">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-2">Latihan &amp; Eksplorasi</h2>
          <p class="text-sm sm:text-base text-gray-700 leading-relaxed">${m.paragraf}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          ${m.ajakan.map(a => `
            <div class="p-4 rounded-xl border border-[var(--line)] bg-white hover:border-blue-300 shadow-sm flex flex-col justify-between gap-3 transition-colors">
              <div>
                <span class="font-bold text-base text-[var(--ink)] block mb-1">${a.judul}</span>
                <p class="text-xs text-gray-500 leading-relaxed">${a.deskripsi}</p>
              </div>
              <a href="${a.href}" class="btn ${a.kelas} w-full justify-center">
                <span>Buka Sekarang</span>
                ${typeof ic === 'function' ? ic('arrow-right', 'w-4 h-4') : '→'}
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return innerHtml;
}

// Tampilkan Subbab berdasarkan Indeks
function tampil(i, { pushHash = true } = {}) {
  stopAudio();
  idx = i;
  const m = MATERI[i];
  if (!m) return;

  // Render konten kartu
  box.innerHTML = renderContentHtml(m);

  // Perbarui status tablist (aria-selected, aria-current, tabindex)
  const tabs = tablist.querySelectorAll('button[role="tab"]');
  tabs.forEach((tab, k) => {
    const isAktif = k === i;
    tab.setAttribute('aria-selected', isAktif ? 'true' : 'false');
    tab.setAttribute('aria-current', isAktif ? 'true' : 'false');
    tab.tabIndex = isAktif ? 0 : -1;
  });

  // Perbarui tombol Lanjut
  const isAkhir = i === MATERI.length - 1;
  btnNext.innerHTML = `
    <span>${isAkhir ? 'Ke Simulasi' : 'Lanjut'}</span>
    ${typeof ic === 'function' ? ic('arrow-right', 'w-4 h-4') : '→'}
  `;

  // Update hash URL tanpa merebut fokus
  if (pushHash && history.replaceState) {
    history.replaceState(null, '', `#${m.id}`);
  }

  // Umumkan pergantian konten via polite announcer (aksesibilitas screen reader)
  if (announcer) {
    announcer.textContent = `Menampilkan materi subbab ${i + 1}: ${m.judul}`;
  }

  // Render KaTeX setelah DOM diinjeksi
  renderMath();
}

// Pasang Tombol Navigasi Subbab (Sidebar Tablist)
function initTabs() {
  if (!tablist) return;

  tablist.innerHTML = MATERI.map((m, k) => `
    <button type="button" role="tab" id="tab-${m.id}" aria-controls="konten" data-i="${k}" class="tab" aria-selected="false" aria-current="false">
      ${k + 1}. ${m.judul}
    </button>
  `).join('');

  tablist.onclick = e => {
    const b = e.target.closest('button[role="tab"]');
    if (b) {
      tampil(+b.dataset.i);
    }
  };

  // Navigasi Keyboard Panah (Arrow Up/Down/Left/Right)
  tablist.onkeydown = e => {
    const tabs = Array.from(tablist.querySelectorAll('button[role="tab"]'));
    const currIndex = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    if (currIndex === -1) return;

    let targetIndex = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      targetIndex = (currIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      targetIndex = (currIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = tabs.length - 1;
    }

    if (targetIndex !== -1) {
      tabs[targetIndex].focus();
      tampil(targetIndex);
    }
  };
}

// Navigasi tombol Lanjut
if (btnNext) {
  btnNext.onclick = () => {
    if (idx < MATERI.length - 1) {
      tampil(idx + 1);
    } else {
      location.href = 'simulasi-ohm.html';
    }
  };
}

// Audio SpeechSynthesis Handler
function initAudioHandler() {
  const btn = btnAudio();
  const lbl = audioLabel();
  if (btn) {
    btn.onclick = () => {
      if (!('speechSynthesis' in window)) {
        alert('Browser kamu belum mendukung audio (Web Speech API). Coba Chrome atau Edge.');
        return;
      }
      if (bicara) {
        stopAudio();
        return;
      }
      if (typeof Store !== 'undefined' && Store.get('suara', true) === false) {
        if (typeof Modal !== 'undefined') {
          Modal.buka({
            judul: 'Suara dimatikan',
            isi: 'Aktifkan kembali di Pengaturan pada halaman Beranda.'
          });
        }
        return;
      }
      const u = new SpeechSynthesisUtterance(MATERI[idx].audio);
      u.lang = 'id-ID';
      u.onend = u.onerror = resetAudioUI;
      bicara = true;
      if (lbl) lbl.textContent = 'Berhenti';
      btn.setAttribute('aria-pressed', 'true');
      window.speechSynthesis.speak(u);
    };
  }
}

// Inisialisasi Halaman
function initMateriPage() {
  initTabs();
  initAudioHandler();

  // Hormati URL Hash (misal #pengertian, #rumus, #contoh, #latihan)
  let initialIdx = 0;
  const hash = (location.hash || '').replace('#', '').toLowerCase();
  if (hash) {
    const found = MATERI.findIndex(m => m.id.toLowerCase() === hash);
    if (found !== -1) initialIdx = found;
  }

  tampil(initialIdx, { pushHash: false });
}

window.addEventListener('hashchange', () => {
  const hash = (location.hash || '').replace('#', '').toLowerCase();
  const found = MATERI.findIndex(m => m.id.toLowerCase() === hash);
  if (found !== -1 && found !== idx) {
    tampil(found, { pushHash: false });
  }
});

window.addEventListener('beforeunload', stopAudio);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMateriPage);
} else {
  initMateriPage();
}
