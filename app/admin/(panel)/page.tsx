import Link from 'next/link';
import { db, isDbConfigured, LEAD_STATUSES, type Lead } from '@/lib/supabase';
import { STATUS_META, timeAgo } from '@/lib/admin';
import StatusBadge from './StatusBadge';

export const metadata = { title: 'Özet' };

const DAY = 24 * 60 * 60 * 1000;

function istanbulDay(date: Date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(date);
}

export default async function DashboardPage() {
  let leads: Pick<Lead, 'id' | 'created_at' | 'status' | 'package' | 'is_read' | 'name' | 'message' | 'locale'>[] = [];
  let loadError: string | null = null;
  if (isDbConfigured()) {
    const { data, error } = await db()
      .from('leads')
      .select('id, created_at, status, package, is_read, name, message, locale')
      .order('created_at', { ascending: false })
      .limit(5000);
    leads = data ?? [];
    loadError = error?.message ?? null;
  }

  const now = Date.now();
  const real = leads.filter((l) => l.status !== 'spam');
  const last7 = real.filter((l) => now - new Date(l.created_at).getTime() < 7 * DAY).length;
  const prev7 = real.filter((l) => {
    const age = now - new Date(l.created_at).getTime();
    return age >= 7 * DAY && age < 14 * DAY;
  }).length;
  const won = real.filter((l) => l.status === 'won').length;
  const closed = real.filter((l) => l.status === 'won' || l.status === 'lost').length;
  const unread = leads.filter((l) => !l.is_read).length;
  const waiting = real.filter((l) => l.status === 'new').length;

  // Son 30 gün, günlük
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now - (29 - i) * DAY);
    return { key: istanbulDay(d), date: d, count: 0 };
  });
  const byDay = new Map(days.map((d) => [d.key, d]));
  for (const l of real) {
    const d = byDay.get(istanbulDay(new Date(l.created_at)));
    if (d) d.count++;
  }
  const maxDay = Math.max(1, ...days.map((d) => d.count));

  const statusCounts = LEAD_STATUSES.map((s) => ({ status: s, count: leads.filter((l) => l.status === s).length }));
  const maxStatus = Math.max(1, ...statusCounts.map((s) => s.count));

  const packageMap = new Map<string, number>();
  for (const l of real) {
    const key = l.package || 'Belirtilmedi';
    packageMap.set(key, (packageMap.get(key) ?? 0) + 1);
  }
  const packages = Array.from(packageMap.entries()).sort((a, b) => b[1] - a[1]);
  const maxPackage = Math.max(1, ...packages.map(([, c]) => c));

  const trend = last7 - prev7;
  const stats = [
    { label: 'Toplam talep', value: real.length, hint: `${leads.length - real.length} spam hariç` },
    { label: 'Son 7 gün', value: last7, hint: trend === 0 ? 'önceki haftayla aynı' : `önceki haftaya göre ${trend > 0 ? '+' : ''}${trend}` },
    { label: 'Okunmamış', value: unread, hint: `${waiting} talep "Yeni" durumunda`, href: '/admin/leads?read=unread' },
    { label: 'Kazanma oranı', value: closed ? `%${Math.round((won / closed) * 100)}` : '—', hint: `${won} kazanıldı / ${closed} sonuçlandı` },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Özet</h1>
        <p className="text-sm text-white/45 mt-1">İletişim formundan gelen taleplerin genel durumu</p>
      </div>

      {loadError && <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">Veriler alınamadı: {loadError}</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const inner = (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">{s.label}</p>
              <p className="text-3xl font-bold mt-2 tabular-nums">{s.value}</p>
              <p className="text-xs text-white/40 mt-1">{s.hint}</p>
            </>
          );
          const cls = 'block rounded-2xl border border-white/10 bg-white/[0.03] p-5';
          return s.href
            ? <Link key={s.label} href={s.href} className={`${cls} hover:border-[#2563EB]/40 transition-colors`}>{inner}</Link>
            : <div key={s.label} className={cls}>{inner}</div>;
        })}
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-semibold">Son 30 gündeki talepler</h2>
          <span className="text-xs text-white/40">günlük, spam hariç</span>
        </div>
        <div className="flex items-end gap-[2px] h-40" role="img" aria-label="Son 30 günün günlük talep sayıları">
          {days.map((d) => (
            <div key={d.key} className="group relative flex-1 h-full flex items-end">
              <div
                className="w-full rounded-t-[4px] bg-[#3b82f6] group-hover:bg-[#60a5fa] transition-colors"
                style={{ height: d.count ? `${(d.count / maxDay) * 100}%` : '2px', opacity: d.count ? 1 : 0.25 }}
              />
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap rounded-lg bg-[#1e293b] border border-white/10 px-2.5 py-1.5 text-xs shadow-xl z-10">
                <span className="text-white/60">{new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(d.date)}</span>{' '}
                <span className="font-semibold">{d.count} talep</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-white/35 mt-2 tabular-nums">
          <span>{new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(days[0].date)}</span>
          <span>Bugün</span>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-4">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-semibold mb-4">Durumlara göre</h2>
          <ul className="space-y-3">
            {statusCounts.map(({ status, count }) => (
              <li key={status}>
                <Link href={`/admin/leads?status=${status}`} className="group block">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/70 group-hover:text-white">{STATUS_META[status].label}</span>
                    <span className="tabular-nums text-white/60">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-[#3b82f6]" style={{ width: `${(count / maxStatus) * 100}%` }} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-semibold mb-4">Paketlere göre</h2>
          {packages.length === 0 ? (
            <p className="text-sm text-white/40">Henüz veri yok.</p>
          ) : (
            <ul className="space-y-3">
              {packages.map(([name, count]) => (
                <li key={name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/70">{name}</span>
                    <span className="tabular-nums text-white/60">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-[#3b82f6]" style={{ width: `${(count / maxPackage) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="font-semibold">Son gelen talepler</h2>
          <Link href="/admin/leads" className="text-sm text-[#60a5fa] hover:text-white">Tümünü gör →</Link>
        </div>
        {leads.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-white/40">Henüz form gönderilmedi.</p>
        ) : (
          <ul className="divide-y divide-white/5">
            {leads.slice(0, 6).map((l) => (
              <li key={l.id}>
                <Link href={`/admin/leads/${l.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03]">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${l.is_read ? 'bg-transparent' : 'bg-[#3b82f6]'}`} aria-label={l.is_read ? undefined : 'okunmadı'} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm truncate ${l.is_read ? 'text-white/70' : 'font-semibold'}`}>{l.name}</p>
                    <p className="text-xs text-white/40 truncate">{l.message}</p>
                  </div>
                  <StatusBadge status={l.status} />
                  <span className="hidden sm:block text-xs text-white/40 w-24 text-right">{timeAgo(l.created_at)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
