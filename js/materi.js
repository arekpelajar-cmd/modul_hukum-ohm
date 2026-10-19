// ===== Layar 2: materi, tab subbab, audio =====
let idx = 0, bicara = false;
const side = document.getElementById('side'), box = document.getElementById('konten'),
      btnAudio = document.getElementById('audio'), btnNext = document.getElementById('lanjut'),
      audioLabel = document.getElementById('audio-label');

function renderMath() { // KaTeX dengan fallback teks biasa bila CDN gagal
  document.querySelectorAll('[data-tex]').forEach(e => {
    if (window.katex) { try { katex.render(e.dataset.tex, e, { throwOnError: false }); } catch (_) {} }
  });
}
function resetAudioUI() {
  bicara = false;
  if (audioLabel) audioLabel.textContent = 'Audio';
  if (btnAudio) btnAudio.setAttribute('aria-pressed', 'false');
}
function stopAudio() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  resetAudioUI();
}
function tampil(i) {
  stopAudio(); idx = i; const m = MATERI[i];
  box.innerHTML = `<h2 class="text-xl font-bold mb-2">${m.judul}</h2>` + m.html;
  side.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-current', k === i));
  btnNext.textContent = i === MATERI.length - 1 ? 'Ke Simulasi →' : 'Lanjut →';
  renderMath();
  const cek = document.getElementById('cekLat');
  if (cek) cek.onclick = () => { // jawaban benar: R = 12/3 = 4
    const n = readNum(document.getElementById('jwb').value, 0, 1e6, NaN), fb = document.getElementById('fbLat');
    fb.classList.remove('hidden', 'ok', 'no');
    if (!Number.isFinite(n)) { fb.classList.add('no'); fb.textContent = 'Masukkan angka yang valid.'; }
    else if (Math.abs(n - 4) < 0.001) { fb.classList.add('ok'); fb.textContent = 'BENAR! R = V/I = 12/3 = 4 Ω.'; }
    else { fb.classList.add('no'); fb.textContent = 'Belum tepat. Gunakan R = V/I.'; }
  };
}
side.innerHTML = MATERI.map((m, k) => `<li><button class="tab" data-i="${k}">${k + 1}. ${m.judul}</button></li>`).join('');
side.onclick = e => { const b = e.target.closest('button'); if (b) tampil(+b.dataset.i); };
btnNext.onclick = () => { if (idx < MATERI.length - 1) tampil(idx + 1); else location.href = 'simulasi-ohm.html'; };

function initAudioHandler() {
  const btn = document.getElementById('audio');
  const lbl = document.getElementById('audio-label');
  if (btn) {
    btn.onclick = () => { // toggle putar/berhenti
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
      speechSynthesis.speak(u);
    };
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAudioHandler);
} else {
  initAudioHandler();
}

window.addEventListener('beforeunload', stopAudio);
tampil(0);
