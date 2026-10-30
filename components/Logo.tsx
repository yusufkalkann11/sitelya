'use client';

import Link from 'next/link';

/**
 * Geometric angular "S" mark — two stacked offset bars connected by a diagonal,
 * inspired by Stripe/Shopify style wordmark logos. Sharp corners, no curves.
 *
 * viewBox: 32×32
 * The "S" is constructed from three filled rectangles arranged to read as an S:
 *   - Top bar (wide, left-aligned)
 *   - Middle bar (wide, right-aligned, slightly narrower)
 *   - Bottom bar (wide, left-aligned)
 *   - Two short vertical connectors on the right-top and left-bottom
 */
export function SiteliyaIcon({ size = 32 }: { size?: number }) {
  const id = `sitelya-grad-${size}`;
  const shadowId = `sitelya-shadow-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sitelya"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#2563EB" floodOpacity="0.45" />
        </filter>
      </defs>
      {/*
        Angular S path built from straight lines only:
        - Top horizontal bar: x 5→25, y 5→10
        - Right vertical drop from top bar: x 20→25, y 10→16
        - Middle horizontal bar: x 5→25, y 16→21  (centered, narrower feel via the connectors)
        - Left vertical drop from middle: x 5→10, y 21→27
        - Bottom horizontal bar: x 5→25, y 27→32  -- but we clip to 32 so use y 27→27
        We'll use a single path for the whole S silhouette.
      */}
      <g filter={`url(#${shadowId})`}>
        {/* Top bar */}
        <rect x="5" y="4" width="20" height="6" rx="1" fill={`url(#${id})`} />
        {/* Top-right connector going down */}
        <rect x="19" y="10" width="6" height="7" rx="1" fill={`url(#${id})`} />
        {/* Middle bar */}
        <rect x="5" y="15" width="20" height="6" rx="1" fill={`url(#${id})`} />
        {/* Bottom-left connector going down */}
        <rect x="5" y="21" width="6" height="7" rx="1" fill={`url(#${id})`} />
        {/* Bottom bar */}
        <rect x="5" y="22" width="20" height="6" rx="1" fill={`url(#${id})`} />
      </g>
    </svg>
  );
}

interface LogoProps {
  href?: string;
  size?: number;
  className?: string;
}

export function SiteliyaLogo({ href, size = 30, className = '' }: LogoProps) {
  const content = (
    <span className={`flex items-center gap-2.5 group ${className}`}>
      <SiteliyaIcon size={size} />
      <span
        style={{
          fontFamily: 'var(--font-jakarta), Inter, sans-serif',
          fontWeight: 800,
          fontSize: size * 0.67,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          paddingRight: '0.12em',
          paddingBottom: '0.05em',
          background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Sitelya
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {content}
      </Link>
    );
  }
  return content;
}
