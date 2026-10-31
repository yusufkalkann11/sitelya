// Minimal stroke icon set drawn for Sitelya (24×24 grid, currentColor).
type IconProps = { className?: string };

function Svg({ className = 'h-5 w-5', children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);
export const Check = (p: IconProps) => (
  <Svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>
);
export const Bolt = (p: IconProps) => (
  <Svg {...p}><path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12l1-8z" /></Svg>
);
export const Mobile = (p: IconProps) => (
  <Svg {...p}><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18h3" /></Svg>
);
export const Shield = (p: IconProps) => (
  <Svg {...p}><path d="M12 2.8l7.5 3v5.7c0 4.6-3.2 8.3-7.5 9.7-4.3-1.4-7.5-5.1-7.5-9.7V5.8l7.5-3z" /><path d="M8.8 12l2.2 2.2 4.2-4.4" /></Svg>
);
export const Search = (p: IconProps) => (
  <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></Svg>
);
export const Chat = (p: IconProps) => (
  <Svg {...p}><path d="M4 5.5h16v10H9l-5 4v-14z" /><path d="M8 9.5h8M8 12.5h5" /></Svg>
);
export const Palette = (p: IconProps) => (
  <Svg {...p}><path d="M12 3a9 9 0 100 18c1.2 0 1.8-.8 1.8-1.7 0-1.4-1.3-1.6-1.3-3 0-1 .8-1.8 1.8-1.8H17a4 4 0 004-4C21 6.4 17 3 12 3z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7" r="1" /></Svg>
);
export const Code = (p: IconProps) => (
  <Svg {...p}><path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5M13.5 5l-3 14" /></Svg>
);
export const Rocket = (p: IconProps) => (
  <Svg {...p}><path d="M14 4c3.5-1.2 6-.5 6-.5s.7 2.5-.5 6L14 15l-5-5 5-6z" /><path d="M9 10l-4 .5L3 13l4 1M14 15l-.5 4L11 21l-1-4" /><circle cx="15.5" cy="8.5" r="1.3" /></Svg>
);
export const Mail = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></Svg>
);
export const Instagram = (p: IconProps) => (
  <Svg {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></Svg>
);
export const Sparkle = (p: IconProps) => (
  <Svg {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" /></Svg>
);
export const Globe = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.6 5.7 3.6 9s-1.1 6.3-3.6 9c-2.5-2.7-3.6-5.7-3.6-9S9.5 5.7 12 3z" /></Svg>
);

export function WhatsAppGlyph({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.845L.057 23.428a.75.75 0 0 0 .916.919l5.671-1.486A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 0 1-4.953-1.356l-.355-.21-3.668.961.977-3.576-.23-.368A9.695 9.695 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}
