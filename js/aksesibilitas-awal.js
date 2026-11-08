try {
  const preferensi = JSON.parse(localStorage.getItem('mediaOhm') || '{}');
  document.documentElement.dataset.kontras = preferensi.kontras ? 'tinggi' : 'normal';
  document.documentElement.dataset.huruf = preferensi.hurufBesar ? 'besar' : 'normal';
} catch (error) {
  document.documentElement.dataset.kontras = 'normal';
  document.documentElement.dataset.huruf = 'normal';
}
