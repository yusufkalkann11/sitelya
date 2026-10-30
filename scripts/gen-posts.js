const { createCanvas, loadImage } = require('canvas');
const fs   = require('fs');
const path = require('path');

const SIZE   = 1080;
const PUBLIC = path.join(__dirname, '..', 'public');
const BG_PATH = 'C:\\Users\\yusuf\\Downloads\\aditya-sethia-S8p9PXFpoCs-unsplash.jpg';

function drawTrackedCenter(ctx, text, cx, y, spacing) {
  const chars  = text.split('');
  const widths = chars.map(c => ctx.measureText(c).width);
  const total  = widths.reduce((s, w) => s + w, 0) + spacing * (chars.length - 1);
  let x = cx - total / 2;
  ctx.textBaseline = 'middle';
  ctx.textAlign    = 'left';
  chars.forEach((c, i) => {
    ctx.fillText(c, x, y);
    x += widths[i] + spacing;
  });
}

async function generate({ outFile, l1, l2, l3, l4, sub1, sub2, bullets }) {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx    = canvas.getContext('2d');

  // ── Background image, cover-crop to 1080×1080 ──────────────────────────────
  const bg    = await loadImage(BG_PATH);
  const scale = Math.max(SIZE / bg.width, SIZE / bg.height);
  const bw    = bg.width  * scale;
  const bh    = bg.height * scale;
  const bx    = (SIZE - bw) / 2;
  const by    = (SIZE - bh) / 2;
  ctx.drawImage(bg, bx, by, bw, bh);

  // ── Dark overlay (heavier to push photo back) ───────────────────────────────
  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.fillStyle   = '#0a0e1a';
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.restore();

  // ── Top accent bar 4px ──────────────────────────────────────────────────────
  ctx.fillStyle = '#2563EB';
  ctx.fillRect(0, 0, SIZE, 4);

  const LX = 70;

  // ── Headlines ───────────────────────────────────────────────────────────────
  ctx.save();
  ctx.textBaseline = 'top';
  ctx.textAlign    = 'left';

  ctx.font      = `900 96px "Arial Black", Arial, sans-serif`;
  ctx.fillStyle = '#f1f5f9';
  ctx.fillText(l1, LX, 100);

  ctx.font      = `900 108px "Arial Black", Arial, sans-serif`;
  ctx.fillStyle = '#2563EB';
  ctx.fillText(l2, LX, 206);

  ctx.font      = `900 96px "Arial Black", Arial, sans-serif`;
  ctx.fillStyle = '#f1f5f9';
  ctx.fillText(l3, LX, 326);
  ctx.fillText(l4, LX, 432);
  ctx.restore();

  // ── Subtext ──────────────────────────────────────────────────────────────────
  ctx.save();
  ctx.font         = `400 32px Arial, sans-serif`;
  ctx.fillStyle    = '#7d9cc0';
  ctx.textBaseline = 'top';
  ctx.textAlign    = 'left';
  ctx.fillText(sub1, LX, 578);
  ctx.fillText(sub2, LX, 622);
  ctx.restore();

  // ── Separator ────────────────────────────────────────────────────────────────
  ctx.save();
  ctx.strokeStyle = '#1e3a5f';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(LX, 676);
  ctx.lineTo(SIZE - LX, 676);
  ctx.stroke();
  ctx.restore();

  // ── Bullets ───────────────────────────────────────────────────────────────────
  const bulletYs = [706, 756, 806, 856];
  bullets.forEach((b, i) => {
    const cy = bulletYs[i] + 13;
    ctx.save();
    ctx.fillStyle = '#2563EB';
    ctx.beginPath();
    ctx.arc(LX + 6, cy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.font         = `600 28px Arial, sans-serif`;
    ctx.fillStyle    = '#e2e8f0';
    ctx.textBaseline = 'top';
    ctx.textAlign    = 'left';
    ctx.fillText(b, LX + 26, bulletYs[i]);
    ctx.restore();
  });


  // ── Save ─────────────────────────────────────────────────────────────────────
  fs.mkdirSync(PUBLIC, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC, outFile), canvas.toBuffer('image/png'));
  console.log(`✓ ${outFile}  ${SIZE}×${SIZE}`);
}

(async () => {
  await generate({
    outFile: 'post-tr.png',
    l1:      'İşletmeniz için',
    l2:      'profesyonel',
    l3:      'web sitesi',
    l4:      'yapıyoruz.',
    sub1:    'Restoran, klinik, e-ticaret —',
    sub2:    'her sektöre özel tasarım.',
    bullets: ['7-14 gün içinde teslim', 'Mobil uyumlu tasarım', 'SEO optimizasyonu dahil', 'Türkiye ve dünya geneli hizmet'],
  });

  await generate({
    outFile: 'post-en.png',
    l1:      'Professional',
    l2:      'websites',
    l3:      'for your',
    l4:      'business.',
    sub1:    'Restaurants, clinics, e-commerce —',
    sub2:    'custom design for every industry.',
    bullets: ['7-14 day delivery', 'Mobile friendly design', 'SEO optimization included', 'Serving Turkey & worldwide'],
  });
})();
