// ===== Layar 5: Simulasi Rangkaian Seri-Paralel =====
const $ = id => document.getElementById(id);
const SUMBER = 12;
let mode = 'seri';
let R1 = 10;
let R2 = 20;
let tant = null;
let timerTantangan = null;
let timerAnnouncer = null;

const SKEN = [
  { t: 'Seri: buat hambatan total 50 Ω', mode: 'seri', k: 'Rt', val: 50, u: 'Ω' },
  { t: 'Seri: buat arus 0,30 A', mode: 'seri', k: 'I', val: 0.30, u: 'A' },
  { t: 'Paralel: buat hambatan total 6 Ω', mode: 'paralel', k: 'Rt', val: 6, u: 'Ω' },
  { t: 'Paralel: buat arus total 2,40 A', mode: 'paralel', k: 'I', val: 2.40, u: 'A' },
  { t: 'Seri: buat tegangan R2 sebesar 8 V', mode: 'seri', k: 'V2', val: 8, u: 'V' }
];

function hitung(r1 = R1, r2 = R2, jenis = mode, tegangan = SUMBER) {
  if (jenis === 'seri') {
    const Rt = r1 + r2;
    const I = tegangan / Rt;
    return { Rt, I, V1: I * r1, V2: I * r2 };
  }

  const Rt = r1 * r2 / (r1 + r2);
  const I1 = tegangan / r1;
  const I2 = tegangan / r2;
  return { Rt, I: I1 + I2, V1: tegangan, V2: tegangan, I1, I2 };
}

const fmtNilai = n => Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : fmt(n);
const zigzag = (x, y) =>
  `<polyline points="${x},${y} ${x + 10},${y - 8} ${x + 25},${y + 8} ${x + 40},${y - 8} ${x + 55},${y + 8} ${x + 70},${y - 8} ${x + 80},${y}" fill="none" stroke="var(--orange)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;

function gambar() {
  const baterai = `
    <line x1="52" y1="105" x2="88" y2="105" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
    <line x1="59" y1="130" x2="81" y2="130" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
    <text x="13" y="123" font-size="13" font-weight="700" fill="var(--ink)">12 V</text>`;

  if (mode === 'seri') {
    return `
      <svg viewBox="0 0 400 230" class="sp-svg" role="img" aria-label="Diagram rangkaian seri">
        <title>Rangkaian seri, R1 ${R1} ohm dan R2 ${R2} ohm, sumber 12 volt</title>
        <path d="M70 52V100 M70 135V188 H340 V52 H300 M220 52H190 M110 52H70" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        ${zigzag(110, 52)}${zigzag(220, 52)}${baterai}
        <text x="150" y="25" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">R1 ${R1} Ω</text>
        <text x="260" y="25" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">R2 ${R2} Ω</text>
      </svg>`;
  }

  return `
    <svg viewBox="0 0 400 230" class="sp-svg" role="img" aria-label="Diagram rangkaian paralel">
      <title>Rangkaian paralel, R1 ${R1} ohm dan R2 ${R2} ohm, sumber 12 volt</title>
      <path d="M70 62V100 M70 135V188 M70 62H120 M200 62H340 V188 H200 M120 188H70" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${zigzag(120, 62)}${zigzag(120, 188)}${baterai}
      <text x="160" y="38" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">R1 ${R1} Ω</text>
      <text x="160" y="218" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">R2 ${R2} Ω</text>
    </svg>`;
}

function updateModeButtons() {
  const seri = $('bSeri');
  const paralel = $('bPar');
  seri.setAttribute('aria-checked', mode === 'seri' ? 'true' : 'false');
  paralel.setAttribute('aria-checked', mode === 'paralel' ? 'true' : 'false');
  seri.tabIndex = mode === 'seri' ? 0 : -1;
  paralel.tabIndex = mode === 'paralel' ? 0 : -1;
  seri.classList.toggle('btn-primary', mode === 'seri');
  paralel.classList.toggle('btn-primary', mode === 'paralel');
}

function ubah() {
  const hasil = hitung();
  $('diagram').innerHTML = gambar();
  $('hRt').textContent = `${fmtNilai(hasil.Rt)} Ω`;
  $('hI').textContent = `${fmt(hasil.I)} A`;
  $('hV1').textContent = `${fmtNilai(hasil.V1)} V`;
  $('hV2').textContent = `${fmtNilai(hasil.V2)} V`;
  updateModeButtons();

  clearTimeout(timerAnnouncer);
  timerAnnouncer = setTimeout(() => {
    $('hasil-announcer').textContent =
      `Hambatan total ${fmtNilai(hasil.Rt)} ohm, arus ${fmt(hasil.I)} ampere, tegangan R1 ${fmtNilai(hasil.V1)} volt, tegangan R2 ${fmtNilai(hasil.V2)} volt.`;
  }, 250);
}

function setMode(jenis) {
  mode = jenis;
  ubah();
}

function sinkron(slider, input, nilaiDefault, setNilai) {
  slider.addEventListener('input', () => {
    const nilai = Math.round(readNum(slider.value, 1, 100, nilaiDefault));
    slider.value = nilai;
    input.value = nilai;
    updateSlider(slider);
    setNilai(nilai);
    ubah();
  });

  input.addEventListener('change', () => {
    const nilai = Math.round(readNum(input.value, 1, 100, nilaiDefault));
    input.value = nilai;
    slider.value = nilai;
    updateSlider(slider);
    setNilai(nilai);
    ubah();
  });

  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') input.blur();
  });
}

function setResistor(a, b) {
  R1 = a;
  R2 = b;
  $('r1').value = $('r1n').value = a;
  $('r2').value = $('r2n').value = b;
  updateSlider($('r1'));
  updateSlider($('r2'));
}

function tutupModal() {
  if (window.Modal) Modal.tutup();
}

function bukaPetunjuk() {
  const dasar = mode === 'seri'
    ? 'Arus yang sama mengalir pada R1 dan R2; tegangan terbagi sebanding dengan hambatan.'
    : 'Tegangan pada tiap cabang sama dengan sumber; cabang dengan hambatan lebih kecil dialiri arus lebih besar.';
  const skenario = tant && !tant.selesai ? SKEN[tant.i] : null;
  const tambahan = skenario ? `
    <div class="mt-3 p-3 rounded-lg bg-[var(--box)]">
      <b>Petunjuk skenario ${tant.i + 1}:</b> ${hintSkenario(skenario)}
    </div>` : '';
  Modal.buka({
    judul: 'Petunjuk',
    isi: `<p>${dasar}</p>${tambahan}`,
    tombol: [{ label: 'Tutup', kelas: 'btn-primary', aksi: tutupModal }]
  });
}

function hintSkenario(s) {
  if (s.k === 'Rt' && s.mode === 'seri') return 'Hambatan total seri adalah jumlah R1 dan R2.';
  if (s.k === 'I' && s.mode === 'seri') return 'Gunakan I = V/Rt. Untuk arus 0,30 A, Rt sekitar 40 Ω.';
  if (s.k === 'Rt' && s.mode === 'paralel') return 'Dua hambatan 12 Ω yang dipasang paralel menghasilkan Rt = 6 Ω.';
  if (s.k === 'I' && s.mode === 'paralel') return 'Arus total adalah jumlah arus cabang. Coba R1 dan R2 masing-masing 10 Ω.';
  return 'Pada seri, V2 = 12 × R2/(R1 + R2). Coba R1 = 10 Ω dan R2 = 20 Ω.';
}

function ringkasanHtml() {
  const c = hitung();
  const rows = [
    ['Mode', mode === 'seri' ? 'Seri' : 'Paralel'],
    ['R1', `${R1} Ω`],
    ['R2', `${R2} Ω`],
    ['Hambatan total (Rt)', `${fmtNilai(c.Rt)} Ω`],
    ['Arus total (I)', `${fmt(c.I)} A`],
    ['Tegangan R1 (V1)', `${fmtNilai(c.V1)} V`],
    ['Tegangan R2 (V2)', `${fmtNilai(c.V2)} V`]
  ];
  if (mode === 'paralel') {
    rows.push(['Arus cabang I1', `${fmt(c.I1)} A`], ['Arus cabang I2', `${fmt(c.I2)} A`]);
  }
  const tafsir = mode === 'seri'
    ? 'Arus sama, tegangan terbagi.'
    : 'Tegangan sama, arus terbagi.';
  return `
    <dl class="sp-summary grid grid-cols-2 gap-2">
      ${rows.map(([label, value]) => `<div class="box-hasil text-left"><dt class="text-xs">${label}</dt><dd class="font-bold m-0">${value}</dd></div>`).join('')}
    </dl>
    <p class="mt-3 font-semibold">${tafsir}</p>`;
}

function skenarioHtml() {
  return `
    <ol class="list-decimal list-inside space-y-1 mb-4">
      ${SKEN.map(s => `<li>${s.t}</li>`).join('')}
    </ol>
    <button type="button" id="mulai-tantangan-modal" class="btn btn-primary">Mulai Tantangan</button>`;
}

function renderTabSelesai(tab) {
  document.querySelectorAll('#modal [role="tab"]').forEach(button => {
    const aktif = button.dataset.tab === tab;
    button.setAttribute('aria-selected', aktif ? 'true' : 'false');
    button.tabIndex = aktif ? 0 : -1;
    button.classList.toggle('btn-primary', aktif);
  });
  const panel = $('modal-tab-content');
  panel.innerHTML = tab === 'ringkasan' ? ringkasanHtml() : skenarioHtml();
  panel.setAttribute('aria-labelledby', `tab-selesai-${tab}`);
  panel.setAttribute('tabindex', '0');
  const mulai = $('mulai-tantangan-modal');
  if (mulai) mulai.onclick = () => {
    tutupModal();
    mulaiTantangan();
  };
}

function bukaSelesai() {
  Modal.buka({
    judul: 'Selesai',
    isi: `
      <div class="sp-modal-tabs" role="tablist" aria-label="Informasi simulasi">
        <button type="button" id="tab-selesai-ringkasan" class="btn btn-primary" role="tab" data-tab="ringkasan" aria-controls="modal-tab-content" aria-selected="true" tabindex="0">Ringkasan</button>
        <button type="button" id="tab-selesai-tantangan" class="btn" role="tab" data-tab="tantangan" aria-controls="modal-tab-content" aria-selected="false" tabindex="-1">Tantangan</button>
      </div>
      <div id="modal-tab-content" class="mt-4" role="tabpanel" tabindex="0"></div>`,
    tombol: [{ label: 'Tutup', kelas: 'btn-outline', aksi: tutupModal }]
  });
  document.querySelectorAll('#modal [role="tab"]').forEach(button => {
    button.onclick = () => renderTabSelesai(button.dataset.tab);
    button.onkeydown = event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const tabs = Array.from(document.querySelectorAll('#modal [role="tab"]'));
      const index = tabs.indexOf(button);
      const target = tabs[(index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      target.focus();
      renderTabSelesai(target.dataset.tab);
    };
  });
  renderTabSelesai('ringkasan');
}

function renderPita(feedback = '', terkunci = false) {
  const pita = $('tantangan-pita');
  if (!tant) {
    pita.classList.add('hidden');
    pita.innerHTML = '';
    return;
  }
  const skenario = SKEN[tant.i];
  pita.classList.remove('hidden');
  pita.innerHTML = `
    <div><b>Tantangan ${tant.i + 1}/5:</b> ${skenario.t}
      ${feedback ? `<span class="sp-challenge-feedback">${feedback}</span>` : ''}
    </div>
    <div class="flex gap-2">
      <button type="button" id="periksa-tantangan" class="btn btn-primary" ${terkunci ? 'disabled' : ''}>Periksa</button>
      <button type="button" id="lewati-tantangan" class="btn btn-outline" ${terkunci ? 'disabled' : ''}>Lewati</button>
    </div>`;
  $('periksa-tantangan').onclick = periksaTantangan;
  $('lewati-tantangan').onclick = lanjutTantangan;
}

function mulaiTantangan() {
  clearTimeout(timerTantangan);
  tant = { i: 0, benar: 0, selesai: false };
  siapkanSkenario();
}

function siapkanSkenario() {
  if (!tant || tant.i >= SKEN.length) {
    selesaiTantangan();
    return;
  }
  const skenario = SKEN[tant.i];
  mode = skenario.mode;
  ubah();
  renderPita();
}

function periksaTantangan() {
  if (!tant || tant.selesai) return;
  const skenario = SKEN[tant.i];
  const nilai = hitung()[skenario.k];
  const benar = Math.abs(nilai - skenario.val) <= 0.05;
  if (benar) tant.benar++;
  const feedback = benar
    ? `${ic('check-circle', 'w-4 h-4 text-green-700')} Benar!`
    : `${ic('x-circle', 'w-4 h-4 text-red-700')} Belum tepat (${fmt(nilai)} ${skenario.u}).`;
  renderPita(feedback, true);
  timerTantangan = setTimeout(lanjutTantangan, 900);
}

function lanjutTantangan() {
  clearTimeout(timerTantangan);
  if (!tant || tant.selesai) return;
  tant.i++;
  if (tant.i >= SKEN.length) {
    selesaiTantangan();
    return;
  }
  siapkanSkenario();
}

function selesaiTantangan() {
  if (!tant) return;
  const benar = tant.benar;
  const persen = Math.round(benar / SKEN.length * 100);
  const lulus = persen >= 80;
  tant.selesai = true;
  tant = null;
  renderPita();
  Store.set('spBest', Math.max(Store.get('spBest', 0), benar));
  Modal.buka({
    judul: 'Hasil Tantangan',
    isi: `
      <div class="text-center">
        <p class="text-3xl font-bold">${benar}/5</p>
        <p>Persentase: <b>${persen}%</b></p>
        <p class="inline-block mt-2 px-4 py-2 rounded-full font-bold ${lulus ? 'ok' : 'no'}">${lulus ? 'Lulus' : 'Belum lulus (minimal 80%)'}</p>
      </div>`,
    tombol: [
      { label: 'Tutup', kelas: 'btn-outline', aksi: tutupModal },
      { label: 'Ulangi', kelas: 'btn-primary', aksi: () => {
        tutupModal();
        mulaiTantangan();
      } }
    ]
  });
}

function reset() {
  clearTimeout(timerTantangan);
  tant = null;
  setResistor(10, 20);
  mode = 'seri';
  renderPita();
  ubah();
}

$('bSeri').onclick = () => setMode('seri');
$('bPar').onclick = () => setMode('paralel');
[$('bSeri'), $('bPar')].forEach((button, index) => {
  button.onkeydown = event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const target = index === 0 ? $('bPar') : $('bSeri');
    target.focus();
    target.click();
  };
});
sinkron($('r1'), $('r1n'), 10, nilai => { R1 = nilai; });
sinkron($('r2'), $('r2n'), 20, nilai => { R2 = nilai; });
$('hint').onclick = bukaPetunjuk;
$('reset').onclick = reset;
$('selesai').onclick = bukaSelesai;
updateSlider($('r1'));
updateSlider($('r2'));
ubah();

if (typeof window !== 'undefined') {
  window.hitungRangkaian = hitung;
  window.resetRangkaian = reset;
  window.mulaiTantanganRangkaian = mulaiTantangan;
}
