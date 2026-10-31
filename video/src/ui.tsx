import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const FONT = fontFamily;

export const C = {
  bg: "#070b16",
  blue: "#2563EB",
  sky: "#60a5fa",
  white: "#f1f5f9",
  muted: "#94a3b8",
  card: "rgba(255,255,255,0.05)",
  line: "rgba(255,255,255,0.12)",
};

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 ease-out progress starting at `delay` frames, lasting `duration` frames. */
export const useIn = (delay = 0, duration = 18) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + duration], [0, 1], { ...clamp, easing: EASE });
};

/** Springy 0→1 starting at `delay` frames. */
export const usePop = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 140, mass: 0.8 } });
};

/** Fades a whole scene out over its last `out` frames. */
export const SceneFade: React.FC<{ duration: number; out?: number; children: React.ReactNode }> = ({
  duration,
  out = 10,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, duration - out, duration], [0, 1, 1, 0], clamp);
  const y = interpolate(frame, [duration - out, duration], [0, -40], clamp);
  return (
    <AbsoluteFill style={{ opacity, transform: `translateY(${y}px)` }}>{children}</AbsoluteFill>
  );
};

/** Text that slides up and fades in. */
export const Rise: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, children, style }) => {
  const p = useIn(delay, 20);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 60}px)`, ...style }}>
      {children}
    </div>
  );
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const gx = 780 + Math.sin(frame / 70) * 160;
  const gy = 260 + Math.cos(frame / 90) * 120;
  const hx = 200 + Math.cos(frame / 80) * 140;
  const hy = 1650 + Math.sin(frame / 60) * 100;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          backgroundPosition: `0 ${-(frame * 0.6) % 90}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: gx - 650,
          top: gy - 650,
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.38) 0%, rgba(37,99,235,0) 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: hx - 550,
          top: hy - 550,
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.18) 0%, rgba(96,165,250,0) 65%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const LogoIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <rect x="5" y="4" width="20" height="6" rx="1" fill="url(#lg)" />
    <rect x="19" y="10" width="6" height="7" rx="1" fill="url(#lg)" />
    <rect x="5" y="15" width="20" height="6" rx="1" fill="url(#lg)" />
    <rect x="5" y="21" width="6" height="7" rx="1" fill="url(#lg)" />
    <rect x="5" y="22" width="20" height="6" rx="1" fill="url(#lg)" />
  </svg>
);

export const GradientText: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <span
    style={{
      background: `linear-gradient(90deg, ${C.blue} 0%, ${C.sky} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      paddingRight: "0.06em",
      ...style,
    }}
  >
    {children}
  </span>
);

export const Check: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill={C.blue} />
    <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
