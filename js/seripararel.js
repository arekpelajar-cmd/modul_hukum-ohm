// ===== Layar 5: Simulasi Rangkaian Seri-Paralel =====
const $ = (id) => document.getElementById(id);
const SUMBER = 12;
let mode = 'seri';
let R1 = 10;
let R2 = 20;
let R3 = 30;
let JUMLAH_BEBAN = 2;
let tant = null;
let timerTantangan = null;
let timerAnnouncer = null;

const SKEN = [
  {
    t: 'Rangkaian seri: atur hambatan listrik total menjadi 50 Ω',
    mode: 'seri',
    k: 'Rt',
    val: 50,
    u: 'Ω',
  },
  {
    t: 'Rangkaian seri: atur kuat arus listrik menjadi 0,30 A',
    mode: 'seri',
    k: 'I',
    val: 0.3,
    u: 'A',
  },
  {
    t: 'Rangkaian paralel: atur hambatan listrik total menjadi 6 Ω',
    mode: 'paralel',
    k: 'Rt',
    val: 6,
    u: 'Ω',
  },
  {
    t: 'Rangkaian paralel: atur kuat arus listrik total menjadi 2,40 A',
    mode: 'paralel',
    k: 'I',
    val: 2.4,
    u: 'A',
  },
  {
    t: 'Rangkaian seri: atur tegangan listrik pada R2 menjadi 8 V',
    mode: 'seri',
    k: 'V2',
    val: 8,
    u: 'V',
  },
];

function hitung(
  r1 = R1,
  r2 = R2,
  jenis = mode,
  tegangan = SUMBER,
  jumlahBeban = JUMLAH_BEBAN,
  r3 = R3,
) {
  const resistansi = jumlahBeban === 3 ? [r1, r2, r3] : [r1, r2];

  if (jenis === 'seri') {
    const Rt = resistansi.reduce((total, nilai) => total + nilai, 0);
    const I = tegangan / Rt;
    const teganganBeban = resistansi.map((nilai) => I * nilai);
    return {
      Rt,
      I,
      V1: teganganBeban[0],
      V2: teganganBeban[1],
      V3: teganganBeban[2],
      resistansi,
      teganganBeban,
      arusBeban: resistansi.map(() => I),
    };
  }

  const Rt = 1 / resistansi.reduce((total, nilai) => total + 1 / nilai, 0);
  const arusBeban = resistansi.map((nilai) => tegangan / nilai);
  return {
    Rt,
    I: arusBeban.reduce((total, nilai) => total + nilai, 0),
    V1: tegangan,
    V2: tegangan,
    V3: tegangan,
    I1: arusBeban[0],
    I2: arusBeban[1],
    I3: arusBeban[2],
    resistansi,
    teganganBeban: resistansi.map(() => tegangan),
    arusBeban,
  };
}

const fmtNilai = (n) => (Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : fmt(n));

function gambar() {
  const resistansi = JUMLAH_BEBAN === 3 ? [R1, R2, R3] : [R1, R2];
  const judul = `${mode === 'seri' ? 'Rangkaian seri' : 'Rangkaian paralel'} dengan ${JUMLAH_BEBAN} hambatan listrik: ${resistansi.map((nilai, index) => `R${index + 1} ${nilai} ohm`).join(', ')}, sumber ${SUMBER} volt`;
  const baterai =
    '<image href="assets/img/battery.svg" x="22" y="94" width="46" height="84" aria-label="Baterai sumber 12 V"/>';
  const gambarResistor = (x, y, lebar, index, nilai) => `
    <image href="assets/img/resistor.svg" x="${x}" y="${y}" width="${lebar}" height="${lebar / 4}" aria-hidden="true"/>
    <text x="${x + lebar / 2}" y="${y - 7}" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">R${index + 1} = ${nilai} Ω</text>`;

  if (mode === 'seri') {
    const lebar = 100;
    const mulai = 80;
    const akhir = 450;
    const jarak = (akhir - mulai - lebar * resistansi.length) / (resistansi.length + 1);
    const komponen = resistansi
      .map((nilai, index) => {
        const x = mulai + jarak + index * (lebar + jarak);
        return gambarResistor(x, 53, lebar, index, nilai);
      })
      .join('');
    return `
      <svg viewBox="0 0 520 250" class="sp-svg" role="img" aria-label="${judul}">
        <title>${judul}</title>
        <path d="M45 66 H475 V210 H45 M45 66 V94 M45 178 V210" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        ${baterai}
        <text x="45" y="199" font-size="12" font-weight="700" fill="var(--ink)" text-anchor="middle">${SUMBER} V</text>
        ${komponen}
      </svg>`;
  }

  const posisiCabang = resistansi.length === 3 ? [140, 260, 380] : [190, 350];
  const ujungRel = posisiCabang[posisiCabang.length - 1];
  const cabang = resistansi
    .map((nilai, index) => {
      const x = posisiCabang[index];
      return `
      <path d="M${x} 60 V205" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round"/>
      <image href="assets/img/resistor.svg" x="${x - 55}" y="119" width="110" height="27.5" transform="rotate(90 ${x} 132.75)" aria-hidden="true"/>
      <text x="${x}" y="230" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">R${index + 1} = ${nilai} Ω</text>`;
    })
    .join('');
  return `
    <svg viewBox="0 0 520 250" class="sp-svg" role="img" aria-label="${judul}">
      <title>${judul}</title>
      <path d="M45 60 H${ujungRel} M45 205 H${ujungRel} M45 60 V94 M45 178 V205" fill="none" stroke="var(--navy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${baterai}
      <text x="45" y="230" font-size="12" font-weight="700" fill="var(--ink)" text-anchor="middle">${SUMBER} V</text>
      ${cabang}
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

function perbaruiProses(hasil) {
  const variabel = hasil.resistansi.map((_, index) => `R${['₁', '₂', '₃'][index]}`);
  const formula =
    mode === 'seri'
      ? `Rₜ = ${variabel.join(' + ')}`
      : `1/Rₜ = ${variabel.map((nilai) => `1/${nilai}`).join(' + ')}`;
  const substitusi =
    mode === 'seri'
      ? `Rₜ = ${hasil.resistansi.map((nilai) => `${nilai} Ω`).join(' + ')} = ${fmtNilai(hasil.Rt)} Ω`
      : `1/Rₜ = ${hasil.resistansi.map((nilai) => `1/(${nilai} Ω)`).join(' + ')}; Rₜ = ${fmtNilai(hasil.Rt)} Ω`;
  const result = `Rₜ = ${fmtNilai(hasil.Rt)} Ω; Iₜ = ${SUMBER} V / ${fmtNilai(hasil.Rt)} Ω = ${fmt(hasil.I)} A`;
  $('sp-process-formula').textContent = formula;
  $('sp-process-substitution').textContent = substitusi;
  $('sp-process-result').textContent = result;
}

function ubah() {
  const hasil = hitung();
  $('diagram').innerHTML = gambar();
  $('hRt').textContent = `${fmtNilai(hasil.Rt)} Ω`;
  $('hI').textContent = `${fmt(hasil.I)} A`;
  $('hV1').textContent = `${fmtNilai(hasil.teganganBeban[0])} V`;
  $('hV2').textContent = `${fmtNilai(hasil.teganganBeban[1])} V`;
  $('hV3').textContent = JUMLAH_BEBAN === 3 ? `${fmtNilai(hasil.teganganBeban[2])} V` : '';
  $('hasil-v3').hidden = JUMLAH_BEBAN !== 3;
  perbaruiProses(hasil);
  updateModeButtons();

  clearTimeout(timerAnnouncer);
  timerAnnouncer = setTimeout(() => {
    $('hasil-announcer').textContent =
      `Hambatan listrik total ${fmtNilai(hasil.Rt)} ohm, kuat arus listrik total ${fmt(hasil.I)} ampere, tegangan listrik pada R1 ${fmtNilai(hasil.V1)} volt, tegangan listrik pada R2 ${fmtNilai(hasil.V2)} volt.`;
  }, 250);
}

function setMode(jenis) {
  mode = jenis;
  ubah();
}

function setJumlahBeban(jumlah) {
  JUMLAH_BEBAN = Number(jumlah) === 3 ? 3 : 2;
  $('jumlah-beban').value = String(JUMLAH_BEBAN);
  $('r3-row').hidden = JUMLAH_BEBAN !== 3;
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

  input.addEventListener('keydown', (event) => {
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
  const dasar =
    mode === 'seri'
      ? 'Kuat arus listrik yang sama mengalir pada setiap hambatan dalam rangkaian seri; tegangan listrik terbagi sebanding dengan hambatan listrik.'
      : 'Tegangan listrik pada setiap cabang rangkaian paralel sama dengan tegangan sumber; cabang dengan hambatan listrik lebih kecil dialiri kuat arus listrik lebih besar.';
  const skenario = tant && !tant.selesai ? SKEN[tant.i] : null;
  const tambahan = skenario
    ? `
    <div class="mt-3 p-3 rounded-lg bg-[var(--box)]">
      <b>Petunjuk skenario ${tant.i + 1}:</b> ${hintSkenario(skenario)}
    </div>`
    : '';
  Modal.buka({
    judul: 'Petunjuk',
    isi: `<p>${dasar}</p>${tambahan}`,
    tombol: [{ label: 'Tutup', kelas: 'btn-primary', aksi: tutupModal }],
  });
}

function hintSkenario(s) {
  if (s.k === 'Rt' && s.mode === 'seri')
    return 'Hambatan listrik total rangkaian seri adalah jumlah hambatan listrik R1 dan R2.';
  if (s.k === 'I' && s.mode === 'seri')
    return 'Gunakan I = V/Rt. Untuk kuat arus listrik 0,30 A, hambatan listrik total sekitar 40 Ω.';
  if (s.k === 'Rt' && s.mode === 'paralel')
    return 'Dua hambatan listrik 12 Ω yang dipasang dalam rangkaian paralel menghasilkan hambatan total 6 Ω.';
  if (s.k === 'I' && s.mode === 'paralel')
    return 'Kuat arus listrik total adalah jumlah kuat arus listrik setiap cabang. Coba R1 dan R2 masing-masing 10 Ω.';
  return 'Pada rangkaian seri, V2 = 12 × R2/(R1 + R2). Coba R1 = 10 Ω dan R2 = 20 Ω.';
}

function ringkasanHtml() {
  const c = hitung();
  const rows = [
    ['Jenis rangkaian', mode === 'seri' ? 'Rangkaian Seri' : 'Rangkaian Paralel'],
    ...c.resistansi.map((nilai, index) => [`Hambatan listrik R${index + 1}`, `${nilai} Ω`]),
    ['Hambatan listrik total (Rt)', `${fmtNilai(c.Rt)} Ω`],
    ['Kuat arus listrik total (I)', `${fmt(c.I)} A`],
    ...c.teganganBeban.map((nilai, index) => [
      `Tegangan listrik pada R${index + 1}`,
      `${fmtNilai(nilai)} V`,
    ]),
  ];
  if (mode === 'paralel') {
    rows.push(
      ...c.arusBeban.map((nilai, index) => [
        `Kuat arus listrik cabang I${index + 1}`,
        `${fmt(nilai)} A`,
      ]),
    );
  }
  const tafsir =
    mode === 'seri'
      ? 'Kuat arus listrik sama, tegangan listrik terbagi.'
      : 'Tegangan listrik sama, kuat arus listrik terbagi.';
  return `
    <dl class="sp-summary grid grid-cols-2 gap-2">
      ${rows.map(([label, value]) => `<div class="box-hasil text-left"><dt class="text-xs">${label}</dt><dd class="font-bold m-0">${value}</dd></div>`).join('')}
    </dl>
    <p class="mt-3 font-semibold">${tafsir}</p>`;
}

function skenarioHtml() {
  return `
    <ol class="list-decimal list-inside space-y-1 mb-4">
      ${SKEN.map((s) => `<li>${s.t}</li>`).join('')}
    </ol>
    <button type="button" id="mulai-tantangan-modal" class="btn btn-primary">Mulai Tantangan</button>`;
}

function renderTabSelesai(tab) {
  document.querySelectorAll('#modal [role="tab"]').forEach((button) => {
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
  if (mulai)
    mulai.onclick = () => {
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
    tombol: [{ label: 'Tutup', kelas: 'btn-outline', aksi: tutupModal }],
  });
  document.querySelectorAll('#modal [role="tab"]').forEach((button) => {
    button.onclick = () => renderTabSelesai(button.dataset.tab);
    button.onkeydown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const tabs = Array.from(document.querySelectorAll('#modal [role="tab"]'));
      const index = tabs.indexOf(button);
      const target =
        tabs[(index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
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
  setJumlahBeban(2);
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
  const persen = Math.round((benar / SKEN.length) * 100);
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
      {
        label: 'Ulangi',
        kelas: 'btn-primary',
        aksi: () => {
          tutupModal();
          mulaiTantangan();
        },
      },
    ],
  });
}

function reset() {
  clearTimeout(timerTantangan);
  tant = null;
  setResistor(10, 20);
  R3 = 30;
  $('r3').value = $('r3n').value = R3;
  updateSlider($('r3'));
  JUMLAH_BEBAN = 2;
  $('jumlah-beban').value = '2';
  $('r3-row').hidden = true;
  mode = 'seri';
  renderPita();
  ubah();
}

$('bSeri').onclick = () => setMode('seri');
$('bPar').onclick = () => setMode('paralel');
[$('bSeri'), $('bPar')].forEach((button, index) => {
  button.onkeydown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const target = index === 0 ? $('bPar') : $('bSeri');
    target.focus();
    target.click();
  };
});
sinkron($('r1'), $('r1n'), 10, (nilai) => {
  R1 = nilai;
});
sinkron($('r2'), $('r2n'), 20, (nilai) => {
  R2 = nilai;
});
sinkron($('r3'), $('r3n'), 30, (nilai) => {
  R3 = nilai;
});
$('jumlah-beban').addEventListener('change', (event) => setJumlahBeban(event.target.value));
$('hint').onclick = bukaPetunjuk;
$('reset').onclick = reset;
$('selesai').onclick = bukaSelesai;
updateSlider($('r1'));
updateSlider($('r2'));
updateSlider($('r3'));
ubah();

if (typeof window !== 'undefined') {
  window.hitungRangkaian = hitung;
  window.setJumlahBebanRangkaian = setJumlahBeban;
  window.resetRangkaian = reset;
  window.mulaiTantanganRangkaian = mulaiTantangan;
}
