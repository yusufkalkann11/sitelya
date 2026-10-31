// Device frames and illustrative concept screens, drawn with plain HTML/CSS (no images).

export function BrowserFrame({
  url,
  children,
  className = '',
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0b1222] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <div className="ml-2 flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.05] px-2.5 text-[10px] text-slate-400">
          <svg className="h-2.5 w-2.5 flex-shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 8V7a3 3 0 016 0v3H9z" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/15 bg-[#05080f] p-1.5 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.6rem] bg-[#0b1222]">
        <div className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

/** Thin grey placeholder line used to suggest body copy. */
export const Line = ({ w, className = '' }: { w: string; className?: string }) => (
  <div className={`h-1.5 rounded-full bg-white/10 ${className}`} style={{ width: w }} />
);

/* ── Concept screens ─────────────────────────────────────────────── */

type RestaurantLabels = { brand: string; headline: string; cta: string; menu: string };
export function RestaurantScreen({ l }: { l: RestaurantLabels }) {
  return (
    <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1a0f08] via-[#120b07] to-[#0b0806] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-bold tracking-tight text-amber-200">{l.brand}</span>
        <div className="flex gap-2">
          <Line w="20px" className="bg-amber-100/15" />
          <Line w="20px" className="bg-amber-100/15" />
          <Line w="20px" className="bg-amber-100/15" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-3">
        <div className="col-span-3">
          <p className="font-display text-base font-extrabold leading-tight text-amber-50 sm:text-lg">{l.headline}</p>
          <Line w="85%" className="mt-2.5 bg-amber-100/15" />
          <Line w="60%" className="mt-1.5 bg-amber-100/15" />
          <span className="mt-3 inline-block rounded-md bg-amber-500 px-2.5 py-1 text-[9px] font-bold text-[#1a0f08]">{l.cta}</span>
        </div>
        <div className="col-span-2 aspect-square rounded-lg bg-[radial-gradient(circle_at_40%_35%,#f59e0b_0%,#b45309_35%,#451a03_70%)] opacity-90" />
      </div>
      <div className="mt-4">
        <span className="text-[9px] font-semibold uppercase tracking-widest text-amber-200/70">{l.menu}</span>
        <div className="mt-1.5 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-amber-100/10 bg-amber-100/[0.04] p-1.5">
              <div className="h-5 rounded bg-amber-100/10" />
              <Line w="70%" className="mt-1.5 bg-amber-100/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ClinicLabels = { brand: string; headline: string; cta: string; slot: string };
export function ClinicScreen({ l }: { l: ClinicLabels }) {
  return (
    <div className="relative aspect-[16/10] bg-gradient-to-br from-[#06201f] via-[#071917] to-[#061211] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-display text-[11px] font-bold tracking-tight text-teal-200">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-teal-400 text-[9px] font-black text-[#06201f]">+</span>
          {l.brand}
        </span>
        <span className="rounded-md bg-teal-400 px-2 py-0.5 text-[8px] font-bold text-[#06201f]">{l.cta}</span>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-3">
        <div className="col-span-3">
          <p className="font-display text-base font-extrabold leading-tight text-teal-50 sm:text-lg">{l.headline}</p>
          <Line w="90%" className="mt-2.5 bg-teal-100/15" />
          <Line w="65%" className="mt-1.5 bg-teal-100/15" />
          <div className="mt-3 flex -space-x-1.5">
            {['#5eead4', '#2dd4bf', '#14b8a6'].map((c) => (
              <span key={c} className="h-5 w-5 rounded-full border-2 border-[#071917]" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="col-span-2 rounded-lg border border-teal-100/10 bg-teal-100/[0.04] p-2">
          <span className="text-[8px] font-semibold uppercase tracking-wider text-teal-200/70">{l.slot}</span>
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            {['09:30', '11:00', '14:15', '16:45'].map((s, i) => (
              <span
                key={s}
                className={`rounded px-1 py-0.5 text-center text-[8px] font-semibold ${
                  i === 1 ? 'bg-teal-400 text-[#06201f]' : 'bg-teal-100/[0.07] text-teal-100/70'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-teal-100/10 bg-teal-100/[0.03] p-1.5">
            <div className="h-3 w-3 rounded bg-teal-400/40" />
            <Line w="80%" className="mt-1.5 bg-teal-100/15" />
            <Line w="55%" className="mt-1 bg-teal-100/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

type ShopLabels = { brand: string; headline: string; cta: string; cart: string };
export function ShopScreen({ l }: { l: ShopLabels }) {
  const swatches = [
    'from-fuchsia-400/70 to-violet-600/70',
    'from-sky-300/70 to-indigo-500/70',
    'from-rose-300/70 to-orange-400/70',
    'from-emerald-300/70 to-cyan-500/70',
  ];
  return (
    <div className="relative aspect-[16/10] bg-gradient-to-br from-[#160d24] via-[#100a1c] to-[#0a0714] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-bold tracking-tight text-violet-200">{l.brand}</span>
        <span className="flex items-center gap-1 rounded-md border border-violet-200/15 px-1.5 py-0.5 text-[8px] font-semibold text-violet-100/80">
          {l.cart}
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-violet-400 text-[7px] font-bold text-[#160d24]">2</span>
        </span>
      </div>
      <p className="mt-4 font-display text-base font-extrabold leading-tight text-violet-50 sm:text-lg">{l.headline}</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {swatches.map((g, i) => (
          <div key={g} className="rounded-md border border-violet-100/10 bg-violet-100/[0.03] p-1.5">
            <div className={`aspect-square rounded bg-gradient-to-br ${g}`} />
            <Line w="75%" className="mt-1.5 bg-violet-100/15" />
            <div className="mt-1 flex items-center justify-between">
              <Line w="35%" className="bg-violet-300/40" />
              {i === 0 && <span className="h-2 w-2 rounded-full bg-violet-400" />}
            </div>
          </div>
        ))}
      </div>
      <span className="mt-3 inline-block rounded-md bg-violet-400 px-2.5 py-1 text-[9px] font-bold text-[#160d24]">{l.cta}</span>
    </div>
  );
}
