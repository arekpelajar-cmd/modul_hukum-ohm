// ===== js/beranda.js — Pengaturan & Profil di Beranda =====

document.addEventListener('DOMContentLoaded', () => {
  const btnSettings = document.getElementById('hdr-settings');
  const btnProfile = document.getElementById('hdr-profile');

  // Helper untuk escape HTML teks dari Store agar aman (XSS prevention)
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 1. Modal Pengaturan
  if (btnSettings) {
    btnSettings.onclick = () => bukaModalPengaturan();
  }

  function bukaModalPengaturan() {
    let suaraAktif = Store.get('suara', true);
    let kontrasAktif = Store.get('kontras', false);
    let hurufBesarAktif = Store.get('hurufBesar', false);

    function getIsiHtml() {
      return `
        <div class="space-y-5">
          <div class="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <div>
              <span class="font-semibold text-sm block" id="setting-label-suara">Suara Materi</span>
              <span class="text-xs text-gray-500" id="setting-desc-suara">Membaca teks materi secara otomatis</span>
            </div>
            <button type="button" role="switch" id="btn-suara-toggle" aria-labelledby="setting-label-suara" aria-describedby="setting-desc-suara" aria-checked="${suaraAktif ? 'true' : 'false'}" class="setting-switch">
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <div>
              <span class="font-semibold text-sm block" id="setting-label-kontras">Kontras tinggi</span>
              <span class="text-xs text-gray-500" id="setting-desc-kontras">Perjelas teks dan garis antarmuka</span>
            </div>
            <button type="button" role="switch" id="btn-kontras-toggle" aria-labelledby="setting-label-kontras" aria-describedby="setting-desc-kontras" aria-checked="${kontrasAktif ? 'true' : 'false'}" class="setting-switch">
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <div>
              <span class="font-semibold text-sm block" id="setting-label-huruf">Huruf besar</span>
              <span class="text-xs text-gray-500" id="setting-desc-huruf">Perbesar teks di seluruh halaman</span>
            </div>
            <button type="button" role="switch" id="btn-huruf-toggle" aria-labelledby="setting-label-huruf" aria-describedby="setting-desc-huruf" aria-checked="${hurufBesarAktif ? 'true' : 'false'}" class="setting-switch">
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="pt-2 border-t border-gray-100">
            <span class="font-semibold text-sm block mb-1">Penyimpanan &amp; Progres</span>
            <p class="text-xs text-gray-500 mb-3">Hapus nilai latihan dan tantangan yang tersimpan di perangkat ini.</p>
            <div id="reset-area">
              <button type="button" id="btn-trigger-reset" class="btn btn-outline">
                ${typeof ic === 'function' ? ic('x-circle', 'w-4 h-4 text-red-500') : ''} Reset Progres
              </button>
            </div>
          </div>
        </div>
      `;
    }

    Modal.buka({
      judul: 'Pengaturan',
      isi: getIsiHtml(),
      tombol: [{ label: 'Tutup', kelas: 'btn-primary', aksi: () => Modal.tutup() }]
    });

    // Pasang interaktivitas di dalam modal
    pasangListenerPengaturan();
  }

  function pasangSakelar(id, aktif, simpan, terapkan) {
    const tombol = document.getElementById(id);
    if (!tombol) return;
    tombol.setAttribute('aria-checked', aktif ? 'true' : 'false');
    tombol.onclick = () => {
      aktif = !aktif;
      Store.set(simpan, aktif);
      tombol.setAttribute('aria-checked', aktif ? 'true' : 'false');
      if (terapkan) terapkan(aktif);
    };
  }

  function pasangListenerPengaturan() {
    pasangSakelar('btn-suara-toggle', Store.get('suara', true), 'suara');
    pasangSakelar('btn-kontras-toggle', Store.get('kontras', false), 'kontras', aktif => {
      document.documentElement.dataset.kontras = aktif ? 'tinggi' : 'normal';
    });
    pasangSakelar('btn-huruf-toggle', Store.get('hurufBesar', false), 'hurufBesar', aktif => {
      document.documentElement.dataset.huruf = aktif ? 'besar' : 'normal';
    });

    const btnTriggerReset = document.getElementById('btn-trigger-reset');
    const resetArea = document.getElementById('reset-area');
    if (btnTriggerReset && resetArea) {
      btnTriggerReset.onclick = () => {
        resetArea.innerHTML = `
          <div class="p-3 bg-red-50 rounded-lg border border-red-200 text-xs">
            <p class="text-red-800 font-medium mb-2">Hapus skor kuis dan hasil tantangan? Tindakan ini tidak dapat dibatalkan.</p>
            <div class="flex gap-2">
              <button type="button" id="btn-batal-reset" class="btn btn-outline">Batal</button>
              <button type="button" id="btn-konfirmasi-reset" class="btn btn-danger">Ya, Hapus</button>
            </div>
          </div>
        `;
        document.getElementById('btn-batal-reset').onclick = () => {
          resetArea.innerHTML = `
            <button type="button" id="btn-trigger-reset" class="btn btn-outline text-xs py-2 px-3">
              ${typeof ic === 'function' ? ic('x-circle', 'w-4 h-4 text-red-500') : ''} Reset Progres
            </button>
          `;
          pasangListenerPengaturan();
        };
        document.getElementById('btn-konfirmasi-reset').onclick = () => {
          // Hanya hapus skor kuis dan tantangan, nama & suara tetap aman
          Store.hapus('kuisBest');
          Store.hapus('spBest');
          resetArea.innerHTML = `
            <div role="status" class="text-sm text-green-700 font-semibold p-2 bg-green-50 rounded border border-green-200">
              ${typeof ic === 'function' ? ic('check-circle', 'w-4 h-4 text-green-600') : ''} Progres direset.
            </div>
          `;
        };
      };
    }
  }

  // 2. Modal Profil
  if (btnProfile) {
    btnProfile.onclick = () => bukaModalProfil();
  }

  function bukaModalProfil() {
    const namaAwal = Store.get('nama', '');
    const kuisBest = Store.get('kuisBest', null);
    const spBest = Store.get('spBest', null);

    let teksKuis = 'Belum ada';
    if (kuisBest !== null && kuisBest !== undefined) {
      teksKuis = `${kuisBest}%`;
    }

    let teksSP = 'Belum dicoba';
    if (spBest !== null && spBest !== undefined) {
      teksSP = `${spBest} dari 5 ${spBest >= 4 ? '(Lulus)' : '(Belum Lulus)'}`;
    }

    const isiHtml = `
      <div class="space-y-4">
        <div>
          <label for="input-nama-siswa" class="font-semibold text-sm block mb-1">Nama Siswa</label>
          <input type="text" id="input-nama-siswa" maxlength="30" class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Ketik nama kamu...">
        </div>

        <div class="pt-2 border-t border-gray-100">
          <span class="font-semibold text-sm block mb-2">Ringkasan Progres</span>
          <div class="grid grid-cols-2 gap-3">
            <div class="box-hasil text-left p-3">
              <small>Skor Kuis Terbaik</small>
              <strong id="profil-skor-kuis">${escapeHtml(teksKuis)}</strong>
            </div>
            <div class="box-hasil text-left p-3">
              <small>Tantangan Seri-Paralel</small>
              <strong id="profil-skor-sp" class="text-xs sm:text-sm block truncate">${escapeHtml(teksSP)}</strong>
            </div>
          </div>
        </div>
      </div>
    `;

    Modal.buka({
      judul: 'Profil Siswa',
      isi: isiHtml,
      tombol: [{ label: 'Simpan & Tutup', kelas: 'btn-primary', aksi: () => Modal.tutup() }]
    });

    const inputNama = document.getElementById('input-nama-siswa');
    if (inputNama) {
      inputNama.value = namaAwal;
      const simpanNama = () => {
        Store.set('nama', inputNama.value.trim());
      };
      inputNama.addEventListener('input', simpanNama);
      inputNama.addEventListener('change', simpanNama);
    }
  }
});
