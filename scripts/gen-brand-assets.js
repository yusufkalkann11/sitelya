const { createCanvas } = require('canvas');
const fs   = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');

// Icon geometry from icon.svg (viewBox 32×32)
const RECTS = [
  { x: 5,  y: 4,  w: 20, h: 6  },
  { x: 19, y: 10, w: 6,  h: 7  },
  { x: 5,  y: 15, w: 20, h: 6  },
  { x: 5,  y: 21, w: 6,  h: 7  },
  { x: 5,  y: 22, w: 20, h: 6  },
];

function drawIcon(ctx, ox, oy, scale) {
  const rx   = Math.max(1, scale * 1);
  const grad = ctx.createLinearGradient(ox, oy, ox + 32 * scale, oy + 32 * scale);
  grad.addColorStop(0, '#2563EB');
  grad.addColorStop(1, '#1D4ED8');

  // Shadow pass
  ctx.save();
  ctx.shadowColor   = 'rgba(37,99,235,0.45)';
  ctx.shadowBlur    = scale * 4;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = scale;
  ctx.fillStyle     = grad;
  RECTS.forEach(r => {
    ctx.beginPath();
    ctx.roundRect(ox + r.x * scale, oy + r.y * scale, r.w * scale, r.h * scale, rx);
    ctx.fill();
  });
  ctx.restore();

  // Clean fill on top
  ctx.save();
  ctx.fillStyle = grad;
  RECTS.forEach(r => {
    ctx.beginPath();
    ctx.roundRect(ox + r.x * scale, oy + r.y * scale, r.w * scale, r.h * scale, rx);
    ctx.fill();
  });
  ctx.restore();
}

// Returns rendered width of wordmark text with -0.05em letter-spacing
function drawWordmark(ctx, ox, cy, fontSize) {
  ctx.save();
  ctx.font         = `800 ${fontSize}px Arial, sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.textAlign    = 'left';

  const ls = -0.05 * fontSize;
  const grad = (() => {
    // measure total width first
    let tw = 0;
    for (const ch of 'Sitelya') tw += ctx.measureText(ch).width + ls;
    tw -= ls;
    const g = ctx.createLinearGradient(ox, 0, ox + tw, 0);
    g.addColorStop(0, '#2563EB');
    g.addColorStop(1, '#60A5FA');
    return g;
  })();

  ctx.fillStyle = grad;
  let x = ox;
  let totalW = 0;
  for (const ch of 'Sitelya') {
    ctx.fillText(ch, x, cy);
    const cw = ctx.measureText(ch).width;
    x      += cw + ls;
    totalW += cw + ls;
  }
  totalW -= ls;
  ctx.restore();
  return totalW;
}

// ── logo-horizontal.png  500×150 ─────────────────────────────────────────────
{
  const W = 500, H = 150;
  const cv  = createCanvas(W, H);
  const ctx = cv.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, W, H);

  const iconScale = 68 / 32;        // icon = 68px tall
  const iconPx    = 32 * iconScale; // 68px
  const iconX     = 36;
  const iconY     = (H - iconPx) / 2;

  drawIcon(ctx, iconX, iconY, iconScale);

  // Gap between icon right edge and wordmark: tight, 10px
  const wordX    = iconX + iconPx + 10;
  const wordSize = 38;
  const wordY    = H / 2;
  drawWordmark(ctx, wordX, wordY, wordSize);

  fs.mkdirSync(PUBLIC, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC, 'logo-horizontal.png'), cv.toBuffer('image/png'));
  console.log('✓ logo-horizontal.png  500×150');
}

// ── logo-square.png  500×500 (no tagline) ────────────────────────────────────
{
  const W = 500, H = 500;
  const cv  = createCanvas(W, H);
  const ctx = cv.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, W, H);

  const iconScale = 200 / 32;
  const iconPx    = 200;
  const iconX     = (W - iconPx) / 2;
  const iconY     = 110;

  drawIcon(ctx, iconX, iconY, iconScale);

  // Wordmark centred below icon
  const wordSize = 52;
  const ls52     = -0.05 * wordSize;
  // measure
  const tmp = createCanvas(1, 1).getContext('2d');
  tmp.font  = `800 ${wordSize}px Arial, sans-serif`;
  let measW = 0;
  for (const ch of 'Sitelya') measW += tmp.measureText(ch).width + ls52;
  measW -= ls52;

  const wordX = W / 2 - measW / 2;
  const wordY = iconY + iconPx + 42;
  drawWordmark(ctx, wordX, wordY, wordSize);

  fs.writeFileSync(path.join(PUBLIC, 'logo-square.png'), cv.toBuffer('image/png'));
  console.log('✓ logo-square.png      500×500');
}
