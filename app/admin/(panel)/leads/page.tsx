import Link from 'next/link';
import { db, isDbConfigured, LEAD_STATUSES, type Lead, type LeadStatus } from '@/lib/supabase';
import { STATUS_META } from '@/lib/admin';
import LeadsTable from './LeadsTable';

export const metadata = { title: 'Mesajlar' };

const PAGE_SIZE = 25;

type Search = { q?: string; status?: string; package?: string; read?: string; sort?: string; page?: string };

export default async function LeadsPage({ searchParams }: { searchParams: Search }) {
  const q = (searchParams.q ?? '').trim().slice(0, 100);
  const status = LEAD_STATUSES.includes(searchParams.status as LeadStatus) ? (searchParams.status as LeadStatus) : '';
  const pkg = (searchParams.package ?? '').slice(0, 60);
  const read = searchParams.read === 'unread' || searchParams.read === 'read' ? searchParams.read : '';
  const sort = searchParams.sort === 'oldest' ? 'oldest' : 'newest';
  const page = Math.max(1, Number(searchParams.page) || 1);

  let leads: Lead[] = [];
  let total = 0;
  let packages: string[] = [];
  let loadError: string | null = null;

  if (isDbConfigured()) {
    let query = db().from('leads').select('*', { count: 'exact' });
    if (q) {
      // PostgREST "or" sözdizimini bozabilecek karakterleri temizle
      const term = q.replace(/[,()*%\\]/g, ' ').trim();
      if (term) {
        query = query.or(['name', 'email', 'phone', 'message', 'notes'].map((c) => `${c}.ilike.*${term}*`).join(','));
      }
    }
    if (status) query = query.eq('status', status);
    else query = query.neq('status', 'spam');
    if (pkg === '__none') query = query.is('package', null);
    else if (pkg) query = query.eq('package', pkg);
    if (read) query = query.eq('is_read', read === 'read');

    const from = (page - 1) * PAGE_SIZE;
    const { data, count, error } = await query
      .order('created_at', { ascending: sort === 'oldest' })
      .range(from, from + PAGE_SIZE - 1);
    leads = (data as Lead[]) ?? [];
    total = count ?? 0;
    loadError = error?.message ?? null;

    const { data: pkgRows } = await db().from('leads').select('package').not('package', 'is', null).limit(2000);
    packages = Array.from(new Set((pkgRows ?? []).map((r) => r.package as string))).sort();
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const params = new URLSearchParams(
    Object.entries({ q, status, package: pkg, read, sort: sort === 'oldest' ? sort : '' }).filter(([, v]) => v) as [string, string][]
  );
  const pageHref = (p: number) => {
    const next = new URLSearchParams(params);
    if (p > 1) next.set('page', String(p));
    const s = next.toString();
    return `/admin/leads${s ? `?${s}` : ''}`;
  };
  const filtered = Boolean(q || status || pkg || read);

  const selectCls = 'px-3 py-2 rounded-lg bg-[#1e293b] border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50';

  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Mesajlar</h1>
          <p className="text-sm text-white/45 mt-1">{total} sonuç{!status && ' (spam hariç)'}</p>
        </div>
        <a href={`/admin/export?${params.toString()}`} className="px-4 py-2 rounded-lg border border-white/15 text-sm font-medium hover:bg-white/5">
          CSV indir
        </a>
      </div>

      <form className="flex flex-wrap gap-2 items-center rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <input
          name="q" defaultValue={q} placeholder="İsim, e-posta, telefon, mesaj veya notta ara…"
          className={`${selectCls} flex-1 min-w-[220px]`}
        />
        <select name="status" defaultValue={status} className={selectCls} aria-label="Durum">
          <option value="">Tüm durumlar</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
        </select>
        <select name="package" defaultValue={pkg} className={selectCls} aria-label="Paket">
          <option value="">Tüm paketler</option>
          {packages.map((p) => <option key={p} value={p}>{p}</option>)}
          <option value="__none">Belirtilmedi</option>
        </select>
        <select name="read" defaultValue={read} className={selectCls} aria-label="Okunma">
          <option value="">Okunan + okunmayan</option>
          <option value="unread">Okunmamış</option>
          <option value="read">Okunmuş</option>
        </select>
        <select name="sort" defaultValue={sort} className={selectCls} aria-label="Sıralama">
          <option value="newest">En yeni</option>
          <option value="oldest">En eski</option>
        </select>
        <button className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-sm font-semibold">Filtrele</button>
        {filtered && <Link href="/admin/leads" className="px-3 py-2 text-sm text-white/50 hover:text-white">Temizle</Link>}
      </form>

      {loadError && <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">Veriler alınamadı: {loadError}</p>}

      <LeadsTable leads={leads} />

      {pages > 1 && (
        <nav className="flex items-center justify-between text-sm">
          {page > 1 ? <Link href={pageHref(page - 1)} className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5">← Önceki</Link> : <span />}
          <span className="text-white/45">Sayfa {page} / {pages}</span>
          {page < pages ? <Link href={pageHref(page + 1)} className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5">Sonraki →</Link> : <span />}
        </nav>
      )}
    </div>
  );
}
