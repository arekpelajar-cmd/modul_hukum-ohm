// ===== Layar 4: Kuis interaktif =====
const app = document.getElementById('app');
const badge = () => document.getElementById('hdr-extra');
let q = [];
let i = 0;
let skor = 0;
let pilih = -1;
let sudahDijawab = false;

const acak = daftar => {
  const hasil = daftar.slice();
  for (let k = hasil.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [hasil[k], hasil[j]] = [hasil[j], hasil[k]];
  }
  return hasil;
};

function icon(nama, kelas) {
  return typeof ic === 'function' ? ic(nama, kelas) : '';
}

function renderRumus(rumus) {
  document.querySelectorAll('[data-tex]').forEach(el => {
    const fallback = el.dataset.fallback || el.dataset.tex;
    if (window.katex && typeof window.katex.render === 'function') {
      try {
        window.katex.render(el.dataset.tex, el, {
          throwOnError: false,
          displayMode: true
        });
      } catch (_) {
        el.textContent = fallback;
      }
    } else {
      el.textContent = fallback;
    }
  });
}

function mulai() {
  q = acak(SOAL);
  i = 0;
  skor = 0;
  soal();
}

function tandaiPilihan(radio) {
  if (sudahDijawab) return;
  pilih = Number(radio.value);
  radio.checked = true;
  app.querySelectorAll('.quiz-option').forEach(label => {
    label.classList.toggle('quiz-option--selected', label.querySelector('input').checked);
  });
  document.getElementById('sub').disabled = false;
}

function soal() {
  pilih = -1;
  sudahDijawab = false;
  const s = q[i];
  const pill = badge();
  if (pill) pill.textContent = `${i + 1}/${q.length}`;

  app.innerHTML = `
    <div class="quiz-layout grid grid-cols-1 md:grid-cols-[54fr_46fr] gap-3">
      <section class="panel quiz-card quiz-question-panel" aria-labelledby="quiz-question">
        <div class="quiz-prompt">
          <span class="quiz-prompt-icon" aria-hidden="true">${icon('lightbulb', 'w-6 h-6')}</span>
          <h2 id="quiz-question">${s.q}</h2>
        </div>
        <fieldset class="quiz-options">
          <legend class="sr-only">Pilih satu jawaban</legend>
          ${s.opsi.map((opsi, k) => `
            <label class="quiz-option" for="opsi-${k}">
              <input class="quiz-radio" type="radio" id="opsi-${k}" name="o" value="${k}" aria-label="${'ABCD'[k]}. ${opsi}">
              <span class="quiz-custom-radio" aria-hidden="true"></span>
              <span class="quiz-option-letter">${'ABCD'[k]}.</span>
              <span class="quiz-option-text">${opsi}</span>
              <span class="quiz-option-result" aria-live="polite"></span>
            </label>
          `).join('')}
        </fieldset>
        <button type="button" id="sub" class="btn btn-primary quiz-submit" disabled>Submit</button>
      </section>

      <section id="fb" class="panel quiz-card quiz-feedback" role="status" aria-live="polite" aria-atomic="true" aria-label="Pembahasan">
        <div class="quiz-empty-hint">
          <span class="quiz-prompt-icon" aria-hidden="true">${icon('lightbulb', 'w-5 h-5')}</span>
          <p>Pilih satu jawaban lalu tekan Submit.</p>
        </div>
      </section>
    </div>`;

  const radios = Array.from(app.querySelectorAll('.quiz-radio'));
  radios.forEach(radio => {
    radio.addEventListener('change', () => tandaiPilihan(radio));
    radio.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        tandaiPilihan(radios[(radios.indexOf(radio) + 1) % radios.length]);
        radios[(radios.indexOf(radio) + 1) % radios.length].focus();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        const targetIndex = (radios.indexOf(radio) - 1 + radios.length) % radios.length;
        tandaiPilihan(radios[targetIndex]);
        radios[targetIndex].focus();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (pilih !== -1) kirim();
      }
    });
  });
  document.getElementById('sub').onclick = kirim;
}

function gulirKePembahasan() {
  if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById('fb').scrollIntoView({ behavior, block: 'start' });
  }
}

function kirim() {
  if (pilih < 0 || sudahDijawab) return;
  sudahDijawab = true;
  const s = q[i];
  const benar = pilih === s.benar;
  if (benar) skor++;

  app.querySelectorAll('.quiz-radio').forEach(radio => {
    radio.disabled = true;
  });
  app.querySelectorAll('.quiz-option').forEach(label => {
    const radio = label.querySelector('input');
    const result = label.querySelector('.quiz-option-result');
    if (Number(radio.value) === s.benar) {
      label.classList.add('quiz-option--correct');
      result.innerHTML = `${icon('check-circle', 'w-5 h-5')} <span>Jawaban benar</span>`;
    } else if (Number(radio.value) === pilih) {
      label.classList.add('quiz-option--incorrect');
      result.innerHTML = `${icon('x-circle', 'w-5 h-5')} <span>Jawaban salah</span>`;
    }
  });
  document.getElementById('sub').remove();

  const last = i === q.length - 1;
  const feedback = document.getElementById('fb');
  feedback.innerHTML = `
    <div class="quiz-feedback-content">
      <div class="quiz-verdict ${benar ? 'quiz-verdict--correct' : 'quiz-verdict--incorrect'}">
        ${icon(benar ? 'check-circle' : 'x-circle', 'w-8 h-8')}
        <h2>${benar ? 'BENAR!' : 'SALAH'}</h2>
      </div>
      ${benar ? '' : `<p class="quiz-answer-correct">Jawaban benar: <b>${'ABCD'[s.benar]}. ${s.opsi[s.benar]}</b></p>`}
      <div class="quiz-solution">
        <p>Gunakan rumus Hukum Ohm:</p>
        <div class="quiz-formula" data-tex="${s.rumus}" data-fallback="${s.rumusTeks}">${s.rumusTeks}</div>
      </div>
      <div class="quiz-remember">
        <span class="quiz-remember-icon" aria-hidden="true">${icon('lightbulb', 'w-5 h-5')}</span>
        <p>${s.ingat}</p>
      </div>
      <div class="quiz-next-row">
        <button type="button" id="nx" class="btn btn-primary">
          <span>${last ? 'Lihat Hasil' : 'Soal Berikutnya'}</span>${icon('arrow-right', 'w-4 h-4')}
        </button>
      </div>
    </div>`;
  renderRumus(s.rumus);
  document.getElementById('nx').onclick = () => {
    if (last) hasil();
    else {
      i++;
      soal();
    }
  };
  gulirKePembahasan();
}

function hasil() {
  const persentase = Math.round(skor / q.length * 100);
  const lulus = persentase >= 80;
  const terbaik = Math.max(Store.get('kuisBest', 0), persentase);
  Store.set('kuisBest', terbaik);
  const pill = badge();
  if (pill) pill.textContent = '';

  app.innerHTML = `
    <section class="panel quiz-result-card" aria-live="polite">
      <div class="quiz-result-content">
        <h2>Hasil Akhir</h2>
        <p class="quiz-result-score">${skor}/${q.length}</p>
        <p class="quiz-result-percent">Persentase: <b>${persentase}%</b></p>
        <p class="quiz-status ${lulus ? 'quiz-status--passed' : 'quiz-status--retry'}">
          ${icon(lulus ? 'check-circle' : 'x-circle', 'w-5 h-5')}
          <span>${lulus ? 'Lulus' : 'Ulangi'}</span>
        </p>
        <p class="quiz-best-score">Skor terbaik: <b>${terbaik}%</b></p>
        <div class="quiz-result-actions">
          <button type="button" id="ul" class="btn btn-primary">Ulangi</button>
          <a class="btn btn-outline" href="index.html">Ke Beranda</a>
        </div>
      </div>
    </section>`;
  document.getElementById('ul').onclick = mulai;
}

mulai();

if (typeof window !== 'undefined') {
  window.mulaiKuis = mulai;
}
