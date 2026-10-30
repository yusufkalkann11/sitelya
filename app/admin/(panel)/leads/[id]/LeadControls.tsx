'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { LeadStatus } from '@/lib/supabase';
import { deleteLead, saveNotes, setRead, updateStatus } from '../../../actions';

const STATUSES: Array<{ value: LeadStatus; label: string; active: string }> = [
  { value: 'new',       label: 'Yeni',           active: 'bg-blue-500/20 border-blue-400/60 text-blue-200' },
  { value: 'contacted', label: 'Görüşülüyor',    active: 'bg-amber-500/20 border-amber-400/60 text-amber-200' },
  { value: 'proposal',  label: 'Teklif verildi', active: 'bg-violet-500/20 border-violet-400/60 text-violet-200' },
  { value: 'won',       label: 'Kazanıldı',      active: 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' },
  { value: 'lost',      label: 'Kaybedildi',     active: 'bg-rose-500/20 border-rose-400/60 text-rose-200' },
  { value: 'spam',      label: 'Spam',           active: 'bg-white/10 border-white/30 text-white/70' },
];

export default function LeadControls({ id, status, notes }: { id: string; status: LeadStatus; notes: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useState(status);
  const [draft, setDraft] = useState(notes);
  const [saved, setSaved] = useState(notes);
  const [message, setMessage] = useState<string | null>(null);

  const changeStatus = (value: LeadStatus) => {
    const previous = current;
    setCurrent(value);
    startTransition(async () => {
      try {
        await updateStatus(id, value);
      } catch {
        setCurrent(previous);
        setMessage('Durum kaydedilemedi.');
      }
    });
  };

  const persistNotes = () => {
    startTransition(async () => {
      try {
        await saveNotes(id, draft);
        setSaved(draft);
        setMessage('Notlar kaydedildi.');
      } catch {
        setMessage('Notlar kaydedilemedi.');
      }
    });
  };

  return (
    <>
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-3">Durum</h2>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              disabled={pending}
              onClick={() => changeStatus(s.value)}
              aria-pressed={current === s.value}
              className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                current === s.value ? s.active : 'border-white/10 text-white/55 hover:text-white hover:border-white/25'
              }`}
            >
              {current === s.value && '✓ '}{s.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white/45">Notlar</h2>
          {draft !== saved && <span className="text-xs text-amber-300">Kaydedilmedi</span>}
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={6}
          placeholder="Görüşme notları, fiyat teklifi, takip tarihi…"
          className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-white/10 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <button
            disabled={pending || draft === saved}
            onClick={persistNotes}
            className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-sm font-semibold disabled:opacity-40"
          >
            Notları kaydet
          </button>
          {message && <span className="text-xs text-white/50">{message}</span>}
          <div className="ml-auto flex gap-2">
            <button
              disabled={pending}
              onClick={() => startTransition(async () => { await setRead(id, false); router.push('/admin/leads'); })}
              className="px-3 py-2 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/5"
            >
              Okunmadı işaretle
            </button>
            <button
              disabled={pending}
              onClick={() => {
                if (confirm('Bu talep kalıcı olarak silinecek. Emin misiniz?')) {
                  startTransition(async () => { await deleteLead(id); });
                }
              }}
              className="px-3 py-2 rounded-lg text-sm text-rose-300 hover:bg-rose-500/15"
            >
              Sil
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
