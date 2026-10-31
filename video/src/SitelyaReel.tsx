import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import {
  Background,
  C,
  Check,
  FONT,
  GradientText,
  LogoIcon,
  Rise,
  SceneFade,
  clamp,
  useIn,
  usePop,
} from "./ui";

// Sahne süreleri (30 fps)
const SCENES = [
  { id: "hook", duration: 105 },
  { id: "question", duration: 120 },
  { id: "intro", duration: 120 },
  { id: "sectors", duration: 150 },
  { id: "benefits", duration: 180 },
  { id: "cta", duration: 180 },
] as const;

export const REEL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);

// Instagram arayüzü alt ~350px'i ve sağ kenarı kapatır; içerik bu güvenli alanda kalır.
const PAD = 96;
const page: React.CSSProperties = {
  fontFamily: FONT,
  color: C.white,
  padding: `0 ${PAD}px`,
  justifyContent: "center",
  paddingBottom: 260,
};
const h1: React.CSSProperties = { fontSize: 128, fontWeight: 900, lineHeight: 1.04, letterSpacing: -4 };
const body: React.CSSProperties = { fontSize: 50, fontWeight: 400, lineHeight: 1.35, color: C.muted };

const Hook: React.FC = () => {
  const words: Array<[string, boolean]> = [
    ["Müşterileriniz", false],
    ["sizi önce", false],
    ["internette", true],
    ["arıyor.", false],
  ];
  return (
    <AbsoluteFill style={page}>
      {words.map(([w, accent], i) => {
        const p = usePop(i * 9);
        return (
          <div
            key={w}
            style={{
              ...h1,
              fontSize: 126,
              opacity: Math.min(1, p * 1.4),
              transform: `translateY(${(1 - p) * 80}px) scale(${0.9 + p * 0.1})`,
              transformOrigin: "left center",
            }}
          >
            {accent ? <GradientText>{w}</GradientText> : w}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Question: React.FC = () => {
  const frame = useCurrentFrame();
  const query = "kadıköy diş kliniği";
  const typed = query.slice(0, Math.floor(interpolate(frame, [8, 50], [0, query.length], clamp)));
  const caret = Math.floor(frame / 8) % 2 === 0 ? "|" : " ";
  const results = useIn(58, 18);
  const pop = usePop(4);
  return (
    <AbsoluteFill style={page}>
      <div
        style={{
          transform: `scale(${0.85 + pop * 0.15})`,
          opacity: pop,
          background: "#fff",
          color: "#1f2937",
          borderRadius: 999,
          padding: "34px 48px",
          fontSize: 48,
          display: "flex",
          alignItems: "center",
          gap: 26,
          boxShadow: "0 30px 80px rgba(37,99,235,0.35)",
        }}
      >
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.6" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span>
          {typed}
          <span style={{ color: C.blue }}>{caret}</span>
        </span>
      </div>
      <div style={{ marginTop: 40, opacity: results, transform: `translateY(${(1 - results) * 30}px)` }}>
        {[0.9, 0.7].map((w, i) => (
          <div key={i} style={{ background: C.card, border: `2px solid ${C.line}`, borderRadius: 28, padding: 32, marginBottom: 20 }}>
            <div style={{ height: 22, width: `${w * 60}%`, background: "rgba(96,165,250,0.5)", borderRadius: 11, marginBottom: 16 }} />
            <div style={{ height: 16, width: `${w * 90}%`, background: "rgba(255,255,255,0.15)", borderRadius: 8 }} />
          </div>
        ))}
      </div>
      <Rise delay={70} style={{ ...h1, fontSize: 96, marginTop: 50 }}>
        Sizi bulduklarında
        <br />
        <GradientText>ne görüyorlar?</GradientText>
      </Rise>
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const icon = usePop(4);
  const frame = useCurrentFrame();
  const glow = 0.5 + Math.sin(frame / 8) * 0.15;
  return (
    <AbsoluteFill style={{ ...page, alignItems: "center", textAlign: "center" }}>
      <div
        style={{
          transform: `scale(${icon}) rotate(${(1 - icon) * -20}deg)`,
          filter: `drop-shadow(0 0 60px rgba(37,99,235,${glow}))`,
          marginBottom: 40,
        }}
      >
        <LogoIcon size={300} />
      </div>
      <Rise delay={14} style={{ ...body, color: C.white, fontSize: 64, fontWeight: 600 }}>
        Merhaba, biz
      </Rise>
      <Rise delay={22} style={{ ...h1, fontSize: 180, letterSpacing: -6 }}>
        <GradientText>Sitelya</GradientText>
      </Rise>
      <Rise delay={34} style={{ ...body, marginTop: 24, fontSize: 52 }}>
        İşletmelere modern, hızlı ve
        <br />
        mobil uyumlu web siteleri yapıyoruz.
      </Rise>
    </AbsoluteFill>
  );
};

const Sectors: React.FC = () => {
  const items = ["🍽️ Restoran & Kafe", "🩺 Klinik", "🛍️ E-Ticaret", "⚖️ Hukuk", "🎓 Eğitim", "🏠 Emlak"];
  return (
    <AbsoluteFill style={page}>
      <Rise style={{ ...h1, fontSize: 112 }}>
        Her sektöre
        <br />
        <GradientText>özel tasarım.</GradientText>
      </Rise>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 22, marginTop: 70 }}>
        {items.map((item, i) => {
          const p = usePop(18 + i * 7);
          return (
            <div
              key={item}
              style={{
                opacity: Math.min(1, p * 1.3),
                transform: `scale(${0.6 + p * 0.4})`,
                padding: "28px 40px",
                borderRadius: 999,
                fontSize: 48,
                fontWeight: 700,
                background: i % 2 ? C.card : "rgba(37,99,235,0.2)",
                border: `2px solid ${i % 2 ? C.line : "rgba(96,165,250,0.5)"}`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Benefits: React.FC = () => {
  const items: Array<[string, string]> = [
    ["7-14 günde teslim", "Aylarca beklemeyin"],
    ["Her cihazda kusursuz", "Telefon, tablet, bilgisayar"],
    ["Google'a hazır", "SEO tüm paketlerde dahil"],
    ["Onayınızla ilerliyoruz", "Tasarımı birlikte şekillendiriyoruz"],
  ];
  return (
    <AbsoluteFill style={page}>
      <Rise style={{ ...h1, fontSize: 112, marginBottom: 60 }}>
        Neden <GradientText>Sitelya?</GradientText>
      </Rise>
      {items.map(([title, text], i) => {
        const p = useIn(16 + i * 18, 20);
        const pop = usePop(16 + i * 18);
        return (
          <div
            key={title}
            style={{
              opacity: p,
              transform: `translateX(${(1 - p) * -120}px)`,
              display: "flex",
              alignItems: "center",
              gap: 36,
              padding: "34px 40px",
              marginBottom: 24,
              borderRadius: 36,
              background: C.card,
              border: `2px solid ${C.line}`,
            }}
          >
            <div style={{ transform: `scale(${pop})` }}>
              <Check size={78} />
            </div>
            <div>
              <div style={{ fontSize: 54, fontWeight: 800 }}>{title}</div>
              <div style={{ fontSize: 38, color: C.muted, marginTop: 6 }}>{text}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const button = usePop(40);
  const pulse = 1 + Math.max(0, Math.sin((frame - 60) / 7)) * 0.03 * (frame > 60 ? 1 : 0);
  return (
    <AbsoluteFill style={{ ...page, alignItems: "center", textAlign: "center" }}>
      <Rise style={{ ...h1, fontSize: 132 }}>
        Sitenizi
        <br />
        <GradientText>birlikte</GradientText>
        <br />
        kuralım.
      </Rise>
      <Rise delay={20} style={{ ...body, color: C.white, marginTop: 50 }}>
        Paketler <b>$65</b>&apos;ten başlıyor.
        <br />
        İlk görüşme ücretsiz.
      </Rise>
      <div
        style={{
          marginTop: 70,
          transform: `scale(${button * pulse})`,
          background: `linear-gradient(135deg, ${C.blue}, #3b82f6)`,
          borderRadius: 999,
          padding: "40px 80px",
          fontSize: 64,
          fontWeight: 900,
          boxShadow: "0 30px 90px rgba(37,99,235,0.55)",
        }}
      >
        sitelyaweb.com
      </div>
      <Rise delay={54} style={{ ...body, marginTop: 40, fontSize: 46 }}>
        DM veya WhatsApp&apos;tan yazın
        <br />
        <span style={{ color: C.sky, fontWeight: 600 }}>@sitelyaweb</span>
      </Rise>
    </AbsoluteFill>
  );
};

const COMPONENTS: Record<(typeof SCENES)[number]["id"], React.FC> = {
  hook: Hook,
  question: Question,
  intro: Intro,
  sectors: Sectors,
  benefits: Benefits,
  cta: Cta,
};

const Header: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / REEL_DURATION;
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <div style={{ position: "absolute", top: 0, left: 0, height: 10, width: `${progress * 100}%`, background: C.blue }} />
      <div style={{ position: "absolute", top: 110, left: PAD, display: "flex", alignItems: "center", gap: 18 }}>
        <LogoIcon size={64} />
        <span style={{ fontSize: 46, fontWeight: 900, letterSpacing: -1.5 }}>
          <GradientText>Sitelya</GradientText>
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const SitelyaReel: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill>
      <Background />
      {SCENES.map(({ id, duration }) => {
        const Scene = COMPONENTS[id];
        const start = from;
        from += duration;
        const isLast = start + duration === REEL_DURATION;
        return (
          <Sequence key={id} from={start} durationInFrames={duration}>
            <SceneFade duration={duration} out={isLast ? 1 : 10}>
              <Scene />
            </SceneFade>
          </Sequence>
        );
      })}
      <Header />
    </AbsoluteFill>
  );
};
