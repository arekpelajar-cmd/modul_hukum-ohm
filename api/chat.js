const SYSTEM_INSTRUCTION = `Anda adalah EduBot, asisten belajar interaktif untuk media pembelajaran media-ohm.

IDENTITAS DAN CAKUPAN
Bantu pengguna belajar Hukum Ohm, listrik DC, rangkaian seri, rangkaian paralel, rangkaian gabungan, dan penggunaan media media-ohm. Jawab hanya pertanyaan yang berkaitan dengan kelistrikan dasar atau penggunaan media ini. Tolak dengan sopan permintaan di luar cakupan.

ISTILAH BAKU
Gunakan Tegangan Listrik (V) dengan satuan Volt (V), Kuat Arus Listrik (I) dengan satuan Ampere (A), serta Hambatan Listrik (R) dengan satuan Ohm (Ω). Gunakan istilah Rangkaian Seri dan Rangkaian Paralel secara konsisten.

BIMBINGAN SOAL HITUNGAN
Jangan memberikan jawaban akhir saja atau langsung membocorkannya tanpa penjelasan. Bimbing siswa melalui langkah demi langkah dengan urutan: Diketahui & Ditanya → Rumus → Substitusi → Hasil Akhir. Tunjukkan perhitungan dan satuan SI dengan benar, lalu berikan hasil akhir setelah langkah-langkahnya.

GAYA JAWABAN
Gunakan Bahasa Indonesia yang jelas, ramah, ringkas, dan mendorong siswa memahami konsep. Jangan mengaku memiliki akses ke kontrol atau data yang tidak tersedia di media.`;

function sendJson(res, status, payload) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(payload);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Metode permintaan tidak didukung.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return sendJson(res, 500, { error: 'Layanan EduBot belum dikonfigurasi.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (error) {
      return sendJson(res, 400, { error: 'Format pesan tidak valid.' });
    }
  }

  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 2000) : '';
  if (!message) {
    return sendJson(res, 400, { error: 'Pesan tidak boleh kosong.' });
  }

  const history = Array.isArray(body.history)
    ? body.history
        .filter(
          (item) => item && ['user', 'model'].includes(item.role) && typeof item.text === 'string',
        )
        .slice(-12)
        .map((item) => ({
          role: item.role,
          parts: [{ text: item.text.trim().slice(0, 2000) }],
        }))
        .filter((item) => item.parts[0].text)
    : [];
  const currentPage = typeof body.currentPage === 'string' ? body.currentPage.slice(0, 120) : '';
  const pageContext = currentPage ? `Konteks halaman media-ohm saat ini: ${currentPage}.\n\n` : '';

  try {
    const geminiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: [...history, { role: 'user', parts: [{ text: `${pageContext}${message}` }] }],
          generationConfig: { temperature: 0.45, maxOutputTokens: 900 },
        }),
      },
    );

    if (!geminiResponse.ok) {
      const errorMessage =
        geminiResponse.status === 401 || geminiResponse.status === 403
          ? 'Gemini menolak autentikasi atau akses API key. Periksa izin key dan aktivasi Gemini API.'
          : geminiResponse.status === 404
            ? 'Model Gemini yang diminta tidak tersedia untuk key ini.'
            : geminiResponse.status === 429
              ? 'Kuota atau batas permintaan Gemini telah tercapai.'
              : `Gemini menolak permintaan (HTTP ${geminiResponse.status}).`;
      return sendJson(res, 502, {
        error: errorMessage,
      });
    }

    const result = await geminiResponse.json();
    const reply = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();
    if (!reply) {
      return sendJson(res, 502, { error: 'EduBot belum menghasilkan jawaban. Silakan coba lagi.' });
    }

    return sendJson(res, 200, { reply });
  } catch (error) {
    return sendJson(res, 502, { error: 'Koneksi ke EduBot bermasalah. Silakan coba lagi.' });
  }
}
