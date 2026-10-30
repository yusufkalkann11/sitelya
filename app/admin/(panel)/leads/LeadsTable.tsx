'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Lead, LeadStatus } from '@/lib/supabase';
import { bulkUpdate } from '../../actions';
import StatusBadge from '../StatusBadge';

const STATUS_OPTIONS: Array<[LeadStatus, string]> = [
  ['new', 'Yeni'], ['contacted', 'Görüşülüyor'], ['proposal', 'Teklif verildi'],
  ['won', 'Kazanıldı'], ['lost', 'Kaybedildi'], ['spam', 'Spam'],
];

function shortDate(iso: string) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul',
  }).format(new Date(iso));
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();

  const allSelected = leads.length > 0 && selected.size === leads.length;
  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const run = (action: Parameters<typeof bulkUpdate>[1]) => {
    if (action === 'delete' && !confirm(`${selected.size} talep kalıcı olarak silinecek. Emin misiniz?`)) return;
    startTransition(async () => {
      await bulkUpdate(Array.from(selected), action);
      setSelected(new Set());
      router.refresh();
    });
  };

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-16 text-center text-sm text-white/40">
        Bu filtrelere uyan talep yok.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-[#2563EB]/10 border-b border-[#2563EB]/30 text-sm">
          <span className="font-semibold mr-2">{selected.size} seçili</span>
          <button disabled={pending} onClick={() => run('read')} className="px-2.5 py-1 rounded-md hover:bg-white/10">Okundu yap</button>
          <button disabled={pending} onClick={() => run('unread')} className="px-2.5 py-1 rounded-md hover:bg-white/10">Okunmadı yap</button>
          <select
            disabled={pending}
            value=""
            onChange={(e) => e.target.value && run(e.target.value as LeadStatus)}
            className="px-2 py-1 rounded-md bg-[#1e293b] border border-white/10"
            aria-label="Durumu değiştir"
          >
            <option value="">Durumu değiştir…</option>
            {STATUS_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <button disabled={pending} onClick={() => run('delete')} className="ml-auto px-2.5 py-1 rounded-md text-rose-300 hover:bg-rose-500/15">Sil</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className={`w-full text-sm ${pending ? 'opacity-60' : ''}`}>
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-white/40 border-b border-white/10">
              <th className="pl-4 pr-2 py-3 w-8">
                <input
                  type="checkbox" checked={allSelected} aria-label="Tümünü seç"
                  onChange={() => setSelected(allSelected ? new Set() : new Set(leads.map((l) => l.id)))}
                  className="accent-[#2563EB]"
                />
              </th>
              <th className="px-2 py-3 font-semibold">Kişi</th>
              <th className="px-2 py-3 font-semibold hidden lg:table-cell">Mesaj</th>
              <th className="px-2 py-3 font-semibold hidden sm:table-cell">Paket</th>
              <th className="px-2 py-3 font-semibold">Durum</th>
              <th className="px-4 py-3 font-semibold text-right">Tarih</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((l) => (
              <tr
                key={l.id}
                onClick={() => router.push(`/admin/leads/${l.id}`)}
                className={`cursor-pointer hover:bg-white/[0.04] ${selected.has(l.id) ? 'bg-[#2563EB]/[0.07]' : ''}`}
              >
                <td className="pl-4 pr-2 py-3" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={selected.has(l.id)} onChange={() => toggle(l.id)} aria-label={`${l.name} seç`} className="accent-[#2563EB]" />
                </td>
                <td className="px-2 py-3 max-w-[220px]">
                  <div className="flex items-center gap-2">
                    {!l.is_read && <span className="w-2 h-2 rounded-full bg-[#3b82f6] flex-shrink-0" title="Okunmadı" />}
                    <span className={`truncate ${l.is_read ? 'text-white/75' : 'font-semibold'}`}>{l.name}</span>
                    {l.locale === 'en' && <span className="text-[10px] px-1 rounded bg-white/10 text-white/50">EN</span>}
                  </div>
                  <div className="text-xs text-white/40 truncate">{l.email}</div>
                </td>
                <td className="px-2 py-3 hidden lg:table-cell max-w-[320px]">
                  <p className="truncate text-white/55">{l.message}</p>
                </td>
                <td className="px-2 py-3 hidden sm:table-cell text-white/60 whitespace-nowrap">{l.package ?? '—'}</td>
                <td className="px-2 py-3"><StatusBadge status={l.status} /></td>
                <td className="px-4 py-3 text-right text-xs text-white/45 whitespace-nowrap tabular-nums">{shortDate(l.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
