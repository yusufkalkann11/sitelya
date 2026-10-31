// Instagram tanıtım carousel'i (5 slayt, 1080×1350) üretir.
// Çalıştırma: node scripts/gen-intro-carousel.js  →  marketing/instagram/intro-1..5.png
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1080;
const H = 1350;
const LX = 90;
const OUT = path.join(__dirname, '..', 'marketing', 'instagram');
const LOGO = path.join(__dirname, '..', 'public', 'logo-square.png');

const C = {
  bg: '#0a0f1c',
  blue: '#2563EB',
  sky: '#60a5fa',
  white: '#f1f5f9',
  muted: '#94a3b8',
  line: 'rgba(255,255,255,0.10)',
};
const HEAVY = '"Arial Black", Arial, sans-serif';
const SANS = 'Arial, sans-serif';

function background(ctx) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Glows
  const g1 = ctx.createRadialGradient(W * 0.9, H * 0.08, 0, W * 0.9, H * 0.08, 700);
  g1.addColorStop(0, 'rgba(37,99,235,0.35)');
  g1.addColorStop(1, 'rgba(37,99,235,0)');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);
  const g2 = ctx.createRadialGradient(0, H, 0, 0, H, 650);
  g2.addColorStop(0, 'rgba(96,165,250,0.16)');
  g2.addColorStop(1, 'rgba(96,165,250,0)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = C.blue;
  ctx.fillRect(0, 0, W, 6);
}

async function brandBar(ctx, logo, index, total) {
  // Logo ikonu (logo-square.png içinden kırpılır) + marka adı
  ctx.drawImage(logo, 170, 120, 150, 175, LX, 70, 46, 54);
  ctx.font = `900 40px ${HEAVY}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  const grad = ctx.createLinearGradient(LX + 62, 0, LX + 262, 0);
  grad.addColorStop(0, C.blue);
  grad.addColorStop(1, C.sky);
  ctx.fillStyle = grad;
  ctx.fillText('Sitelya', LX + 62, 98);

  // Sayfa göstergesi
  ctx.font = `700 26px ${SANS}`;
  ctx.textAlign = 'right';
  ctx.fillStyle = C.muted;
  ctx.fillText(`${index} / ${total}`, W - LX, 98);

  // Alt bilgi
  ctx.textAlign = 'left';
  ctx.font = `600 26px ${SANS}`;
  ctx.fillStyle = C.muted;
  ctx.fillText('@sitelyaweb', LX, H - 80);
  if (index < total) {
    ctx.textAlign = 'right';
    ctx.fillStyle = C.sky;
    ctx.fillText('Kaydır →', W - LX, H - 80);
  }
}

function wrap(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

// Başlık: segment dizisi, her biri { text, color }. "\n" satır sonu.
function headline(ctx, segments, y, size) {
  ctx.font = `900 ${size}px ${HEAVY}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  const lh = size * 1.12;
  let x = LX;
  for (const seg of segments) {
    const parts = seg.text.split('\n');
    parts.forEach((part, i) => {
      if (i > 0) { y += lh; x = LX; }
      if (!part) return;
      ctx.fillStyle = seg.color;
      ctx.fillText(part, x, y);
      x += ctx.measureText(part).width;
    });
  }
  return y + lh;
}

function paragraph(ctx, text, y, size = 34, color = C.muted, maxWidth = W - LX * 2) {
  ctx.font = `400 ${size}px ${SANS}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = color;
  const lh = size * 1.45;
  for (const line of wrap(ctx, text, maxWidth)) { ctx.fillText(line, LX, y); y += lh; }
  return y;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function card(ctx, x, y, w, h, highlight = false) {
  roundRect(ctx, x, y, w, h, 24);
  ctx.fillStyle = highlight ? 'rgba(37,99,235,0.18)' : 'rgba(255,255,255,0.045)';
  ctx.fill();
  ctx.strokeStyle = highlight ? 'rgba(96,165,250,0.55)' : C.line;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function check(ctx, x, y, size = 40) {
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = C.blue;
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x + size * 0.28, y + size * 0.52);
  ctx.lineTo(x + size * 0.44, y + size * 0.67);
  ctx.lineTo(x + size * 0.72, y + size * 0.36);
  ctx.stroke();
}

const slides = [
  // 1 — Dikkat çek
  (ctx) => {
    let y = headline(ctx, [
      { text: 'Müşterileriniz\nsizi önce\n', color: C.white },
      { text: 'internette', color: C.sky },
      { text: '\narıyor.', color: C.white },
    ], 320, 112);
    y = paragraph(ctx, 'Peki sizi bulduklarında karşılarına ne çıkıyor?', y + 80, 40, C.white);
    paragraph(ctx, 'Web siteniz, uyurken bile çalışan en iyi satış temsilcinizdir.', y + 24, 34);
  },
  // 2 — Biz kimiz
  (ctx) => {
    let y = headline(ctx, [
      { text: 'Merhaba,\nbiz ', color: C.white },
      { text: 'Sitelya', color: C.sky },
      { text: '.', color: C.white },
    ], 260, 112);
    y = paragraph(ctx, 'İşletmelere modern, hızlı ve mobil uyumlu web siteleri tasarlayan bir web tasarım ajansıyız.', y + 70, 38, C.white);
    y += 40;
    const tags = ['Restoran & Kafe', 'Klinik', 'E-Ticaret', 'Hukuk', 'Eğitim', 'Emlak'];
    ctx.font = `700 30px ${SANS}`;
    ctx.textBaseline = 'middle';
    let x = LX;
    for (const tag of tags) {
      const w = ctx.measureText(tag).width + 48;
      if (x + w > W - LX) { x = LX; y += 84; }
      card(ctx, x, y, w, 66);
      ctx.fillStyle = C.white;
      ctx.fillText(tag, x + 24, y + 34);
      x += w + 16;
    }
    paragraph(ctx, 'Her sektörün ihtiyacı farklı. Sitenizi işinizin nasıl çalıştığına göre kurguluyoruz.', y + 120, 32);
  },
  // 3 — Neden biz
  (ctx) => {
    let y = headline(ctx, [{ text: 'Neden\n', color: C.white }, { text: 'Sitelya?', color: C.sky }], 220, 104);
    y += 60;
    const items = [
      ['7-14 günde teslim', 'Aylarca beklemeden siteniz yayında.'],
      ['Her cihazda kusursuz', 'Telefon, tablet ve bilgisayarda mobil uyumlu.'],
      ['Google’a hazır', 'Temel SEO tüm paketlerde dahil.'],
      ['Onayınız olmadan ilerlemiyoruz', 'Tasarımı birlikte şekillendiriyoruz.'],
    ];
    for (const [title, text] of items) {
      card(ctx, LX, y, W - LX * 2, 150);
      check(ctx, LX + 32, y + 36, 48);
      ctx.textBaseline = 'top';
      ctx.font = `800 36px ${SANS}`;
      ctx.fillStyle = C.white;
      ctx.fillText(title, LX + 110, y + 32);
      ctx.font = `400 29px ${SANS}`;
      ctx.fillStyle = C.muted;
      ctx.fillText(text, LX + 110, y + 85);
      y += 172;
    }
  },
  // 4 — Nasıl çalışıyoruz
  (ctx) => {
    let y = headline(ctx, [{ text: '4 adımda\n', color: C.white }, { text: 'web siteniz hazır.', color: C.sky }], 220, 92);
    y += 80;
    const steps = [
      ['01', 'Ücretsiz keşif görüşmesi', 'İhtiyaçlarınızı ve hedeflerinizi dinliyoruz.'],
      ['02', 'Tasarım', 'Markanıza özel tasarımı onayınıza sunuyoruz.'],
      ['03', 'Geliştirme', 'Hızlı, güvenli ve SEO uyumlu olarak kodluyoruz.'],
      ['04', 'Yayın & destek', 'Sitenizi yayına alıyor, yanınızda kalıyoruz.'],
    ];
    steps.forEach(([num, title, text], i) => {
      const top = y + i * 170;
      if (i < steps.length - 1) {
        ctx.strokeStyle = 'rgba(96,165,250,0.35)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(LX + 45, top + 92);
        ctx.lineTo(LX + 45, top + 170);
        ctx.stroke();
      }
      card(ctx, LX, top, 90, 90, true);
      ctx.font = `900 34px ${HEAVY}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = C.white;
      ctx.fillText(num, LX + 45, top + 47);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = `800 36px ${SANS}`;
      ctx.fillText(title, LX + 125, top + 6);
      ctx.font = `400 29px ${SANS}`;
      ctx.fillStyle = C.muted;
      ctx.fillText(text, LX + 125, top + 56);
    });
  },
  // 5 — Harekete çağrı
  (ctx) => {
    let y = headline(ctx, [
      { text: 'Sitenizi\n', color: C.white },
      { text: 'birlikte\n', color: C.sky },
      { text: 'kuralım.', color: C.white },
    ], 250, 120);
    y = paragraph(ctx, 'Paketlerimiz $65’ten başlıyor. İlk görüşme ücretsiz, hiçbir yükümlülük yok.', y + 70, 38, C.white);
    y += 50;
    card(ctx, LX, y, W - LX * 2, 130, true);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 42px ${HEAVY}`;
    ctx.fillStyle = C.white;
    ctx.fillText('DM veya WhatsApp’tan yazın', W / 2, y + 66);
    y += 170;
    ctx.font = `600 32px ${SANS}`;
    ctx.fillStyle = C.muted;
    ctx.fillText('Paketler ve fiyatlar:', W / 2, y);
    ctx.font = `800 40px ${SANS}`;
    ctx.fillStyle = C.sky;
    ctx.fillText('sitelyaweb.com', W / 2, y + 56);
    ctx.textAlign = 'left';
  },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const logo = await loadImage(LOGO);
  for (let i = 0; i < slides.length; i++) {
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');
    background(ctx);
    await brandBar(ctx, logo, i + 1, slides.length);
    slides[i](ctx);
    const file = path.join(OUT, `intro-${i + 1}.png`);
    fs.writeFileSync(file, canvas.toBuffer('image/png'));
    console.log('wrote', path.relative(process.cwd(), file));
  }
})();
