// ===== js/beranda.js — Pengaturan, Profil, & Pembaruan Status Progres di Beranda =====

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

  // ===== Pembaruan Badge Status Belajar (Poin Revisi 4) =====
  function perbaruiBadgeProgres() {
    if (typeof Progres === 'undefined') return;
    const p = Progres.baca();
    const kuisBest = Store.get('kuisBest', null);
    const spBest = Store.get('spBest', null);

    // 1. Badge Materi
    const bMateri = document.getElementById('badge-materi');
    if (bMateri) {
      if (p.materi) {
        bMateri.textContent = 'Selesai';
        bMateri.className = 'menu-card-badge badge-selesai';
      } else {
        bMateri.textContent = 'Belum Dipelajari';
        bMateri.className = 'menu-card-badge badge-belum';
      }
    }

    // 2. Badge Simulasi Hukum Ohm
    const bOhm = document.getElementById('badge-simulasi-ohm');
    if (bOhm) {
      if (p.simulasiOhm) {
        bOhm.textContent = 'Selesai Dicoba';
        bOhm.className = 'menu-card-badge badge-selesai';
      } else {
        bOhm.textContent = 'Belum Dicoba';
        bOhm.className = 'menu-card-badge badge-belum';
      }
    }

    // 3. Badge Simulasi Rangkaian Seri-Paralel
    const bSp = document.getElementById('badge-simulasi-sp');
    if (bSp) {
      if (spBest !== null && spBest !== undefined) {
        bSp.textContent = `${spBest}/5 Tantangan`;
        bSp.className = 'menu-card-badge badge-selesai';
      } else if (p.simulasiSp) {
        bSp.textContent = 'Sedang Dicoba';
        bSp.className = 'menu-card-badge badge-proses';
      } else {
        bSp.textContent = 'Belum Dicoba';
        bSp.className = 'menu-card-badge badge-belum';
      }
    }

    // 4. Badge Latihan & Evaluasi (Kuis)
    const bKuis = document.getElementById('badge-kuis');
    if (bKuis) {
      if (kuisBest !== null && kuisBest !== undefined) {
        bKuis.textContent = 'Selesai';
        bKuis.className = 'menu-card-badge badge-selesai';
      } else if (p.kuis) {
        bKuis.textContent = 'Sedang Berjalan';
        bKuis.className = 'menu-card-badge badge-proses';
      } else {
        bKuis.textContent = 'Belum Dikerjakan';
        bKuis.className = 'menu-card-badge badge-belum';
      }
    }

    // Update Aksi Tombol Hero Mulai Belajar sesuai Alur
    const btnMulai = document.getElementById('btn-mulai-belajar');
    if (btnMulai) {
      if (!p.materi) {
        btnMulai.href = 'materi.html';
        btnMulai.innerHTML = `<span>Mulai Belajar</span> ${typeof ic === 'function' ? ic('arrow-right', 'w-4 h-4') : '→'}`;
      } else if (!p.simulasiOhm) {
        btnMulai.href = 'simulasi-ohm.html';
        btnMulai.innerHTML = `<span>Lanjut ke Simulasi Ohm</span> ${typeof ic === 'function' ? ic('arrow-right', 'w-4 h-4') : '→'}`;
      } else if (!p.simulasiSp) {
        btnMulai.href = 'simulasi-sp.html';
        btnMulai.innerHTML = `<span>Lanjut ke Seri-Paralel</span> ${typeof ic === 'function' ? ic('arrow-right', 'w-4 h-4') : '→'}`;
      } else {
        btnMulai.href = 'kuis.html';
        btnMulai.innerHTML = `<span>Uji Pemahaman di Kuis</span> ${typeof ic === 'function' ? ic('arrow-right', 'w-4 h-4') : '→'}`;
      }
    }
  }

  // Intersepsi Akses Menu Kuis dari Beranda jika Belum Siap
  const menuKuis = document.getElementById('menu-kuis');
  if (menuKuis) {
    menuKuis.addEventListener('click', (e) => {
      if (typeof Progres !== 'undefined' && !Progres.isSiapKuis()) {
        Progres.konfirmasiAksesKuis(e, 'kuis.html');
      }
    });
  }

  // Jalankan pembaruan badge saat halaman dimuat
  perbaruiBadgeProgres();

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
              <span class="font-semibold text-sm block" id="setting-label-suara">Suara Pembaca Materi</span>
              <span class="text-xs text-gray-500" id="setting-desc-suara">Membaca teks narasi materi secara otomatis</span>
            </div>
            <button type="button" role="switch" id="btn-suara-toggle" aria-labelledby="setting-label-suara" aria-describedby="setting-desc-suara" aria-checked="${suaraAktif ? 'true' : 'false'}" class="setting-switch">
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <div>
              <span class="font-semibold text-sm block" id="setting-label-kontras">Kontras Tinggi</span>
              <span class="text-xs text-gray-500" id="setting-desc-kontras">Perjelas teks, batas panel, dan garis antarmuka</span>
            </div>
            <button type="button" role="switch" id="btn-kontras-toggle" aria-labelledby="setting-label-kontras" aria-describedby="setting-desc-kontras" aria-checked="${kontrasAktif ? 'true' : 'false'}" class="setting-switch">
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <div>
              <span class="font-semibold text-sm block" id="setting-label-huruf">Ukuran Huruf Lebih Besar</span>
              <span class="text-xs text-gray-500" id="setting-desc-huruf">Perbesar ukuran teks di seluruh media</span>
            </div>
            <button type="button" role="switch" id="btn-huruf-toggle" aria-labelledby="setting-label-huruf" aria-describedby="setting-desc-huruf" aria-checked="${hurufBesarAktif ? 'true' : 'false'}" class="setting-switch">
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="pt-2 border-t border-gray-100">
            <span class="font-semibold text-sm block mb-1">Penyimpanan &amp; Progres Belajar</span>
            <p class="text-xs text-gray-500 mb-3">Hapus catatan status belajar, skor kuis, dan hasil tantangan di perangkat ini.</p>
            <div id="reset-area">
              <button type="button" id="btn-trigger-reset" class="btn btn-outline text-xs py-2 px-3">
                ${typeof ic === 'function' ? ic('x-circle', 'w-4 h-4 text-red-500') : ''} Reset Progres Belajar
              </button>
            </div>
          </div>
        </div>
      `;
    }

    Modal.buka({
      judul: 'Pengaturan Media',
      isi: getIsiHtml(),
      tombol: [{ label: 'Tutup', kelas: 'btn-primary', aksi: () => Modal.tutup() }],
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
    pasangSakelar('btn-kontras-toggle', Store.get('kontras', false), 'kontras', (aktif) => {
      document.documentElement.dataset.kontras = aktif ? 'tinggi' : 'normal';
    });
    pasangSakelar('btn-huruf-toggle', Store.get('hurufBesar', false), 'hurufBesar', (aktif) => {
      document.documentElement.dataset.huruf = aktif ? 'besar' : 'normal';
    });

    const btnTriggerReset = document.getElementById('btn-trigger-reset');
    const resetArea = document.getElementById('reset-area');
    if (btnTriggerReset && resetArea) {
      btnTriggerReset.onclick = () => {
        resetArea.innerHTML = `
          <div class="p-3 bg-red-50 rounded-lg border border-red-200 text-xs">
            <p class="text-red-800 font-medium mb-2">Hapus seluruh riwayat progres belajar, skor latihan, dan hasil tantangan? Tindakan ini tidak dapat dibatalkan.</p>
            <div class="flex gap-2">
              <button type="button" id="btn-batal-reset" class="btn btn-outline">Batal</button>
              <button type="button" id="btn-konfirmasi-reset" class="btn btn-danger">Ya, Hapus Semua</button>
            </div>
          </div>
        `;
        document.getElementById('btn-batal-reset').onclick = () => {
          resetArea.innerHTML = `
            <button type="button" id="btn-trigger-reset" class="btn btn-outline text-xs py-2 px-3">
              ${typeof ic === 'function' ? ic('x-circle', 'w-4 h-4 text-red-500') : ''} Reset Progres Belajar
            </button>
          `;
          pasangListenerPengaturan();
        };
        document.getElementById('btn-konfirmasi-reset').onclick = () => {
          // Hapus skor kuis, tantangan, dan data progres alur belajar
          Store.hapus('kuisBest');
          Store.hapus('spBest');
          if (typeof Progres !== 'undefined') {
            Progres.reset();
          }
          perbaruiBadgeProgres();
          resetArea.innerHTML = `
            <div role="status" class="text-xs text-green-700 font-semibold p-2 bg-green-50 rounded border border-green-200 flex items-center gap-1.5">
              ${typeof ic === 'function' ? ic('check-circle', 'w-4 h-4 text-green-600') : ''} Seluruh progres belajar berhasil direset.
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
          <span class="font-semibold text-sm block mb-2">Ringkasan Capaian Pembelajaran</span>
          <div class="grid grid-cols-2 gap-3">
            <div class="box-hasil text-left p-3">
              <small>Skor Latihan / Kuis Terbaik</small>
              <strong id="profil-skor-kuis" class="text-base text-[var(--navy)]">${escapeHtml(teksKuis)}</strong>
            </div>
            <div class="box-hasil text-left p-3">
              <small>Tantangan Seri-Paralel</small>
              <strong id="profil-skor-sp" class="text-xs sm:text-sm block truncate text-[var(--navy)]">${escapeHtml(teksSP)}</strong>
            </div>
          </div>
        </div>
      </div>
    `;

    Modal.buka({
      judul: 'Profil Siswa',
      isi: isiHtml,
      tombol: [{ label: 'Simpan & Tutup', kelas: 'btn-primary', aksi: () => Modal.tutup() }],
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
