// ===== Layar 4: Kuis interaktif =====
const app = document.getElementById('app'), badge = () => document.getElementById('hdr-extra');
let q = [], i = 0, skor = 0, pilih = -1;
const acak = a => { a = a.slice(); for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; };
function mulai() { q = acak(SOAL); i = 0; skor = 0; soal(); }
function soal() {
  pilih = -1; const s = q[i]; badge().textContent = `${i + 1}/${q.length}`;
  app.innerHTML = `<div class="card"><p class="text-xs font-semibold text-blue-700 mb-1">Tingkat: ${s.level}</p>
  <fieldset><legend class="font-semibold mb-3">${s.q}</legend>
  ${s.opsi.map((o, k) => `<label class="flex items-center gap-3 border-2 rounded-lg p-3 mb-2 cursor-pointer bg-white"><input type="radio" name="o" value="${k}"> <b>${'ABCD'[k]}.</b> ${o}</label>`).join('')}</fieldset>
  <button id="sub" class="btn btn-primary mt-2" disabled>Submit</button><div id="fb" role="status" aria-live="polite" class="mt-4"></div></div>`;
  app.querySelectorAll('input').forEach(r => r.onchange = () => { pilih = +r.value; document.getElementById('sub').disabled = false; });
  document.getElementById('sub').onclick = kirim;
}
function kirim() {
  const s = q[i], benar = pilih === s.benar; if (benar) skor++;
  app.querySelectorAll('input').forEach(r => r.disabled = true);
  document.getElementById('sub').classList.add('hidden');
  const last = i === q.length - 1;
  document.getElementById('fb').innerHTML = `<div class="rounded-xl p-3 ${benar ? 'ok' : 'no'}"><p class="font-bold text-lg flex items-center gap-2">${benar ? `${ic('check-circle', 'w-6 h-6 text-green-700')} BENAR!` : `${ic('x-circle', 'w-6 h-6 text-red-700')} SALAH`}</p><p class="mt-1"><b>Pembahasan:</b> ${s.bahas}</p>${benar ? '' : `<p>Jawaban benar: <b>${'ABCD'[s.benar]}. ${s.opsi[s.benar]}</b></p>`}</div>
  <div class="box text-left mt-3 flex items-start gap-2"><span>${ic('lightbulb', 'w-5 h-5 text-amber-500')}</span><div><b>Ingat:</b> V = I × R; seri: Rt = R1 + R2; paralel: Rt = R1·R2/(R1+R2).</div></div>
  <button id="nx" class="btn btn-primary mt-3">${last ? 'Lihat Hasil →' : 'Soal Berikutnya →'}</button>`;
  document.getElementById('nx').onclick = () => { if (last) hasil(); else { i++; soal(); } };
}
function hasil() {
  const p = Math.round(skor / q.length * 100), lulus = p >= 80, best = Math.max(Store.get('kuisBest', 0), p);
  Store.set('kuisBest', best); badge().textContent = '';
  app.innerHTML = `<div class="card text-center"><h2 class="text-xl font-bold">Hasil Akhir</h2><p class="text-4xl font-bold my-3">${skor}/${q.length}</p><p>Persentase: <b>${p}%</b></p>
  <p class="my-3 inline-block px-4 py-2 rounded-full font-bold ${lulus ? 'ok' : 'no'}">${lulus ? 'Lulus' : 'Ulangi'}</p><p class="text-sm">Skor terbaik: ${best}%</p>
  <div class="mt-4 flex gap-2 justify-center flex-wrap"><button id="ul" class="btn btn-primary">Ulangi</button><a class="btn" href="simulasi-sp.html">Ke Simulasi Seri-Paralel</a></div></div>`;
  document.getElementById('ul').onclick = mulai;
}
mulai();
