import type { LeadStatus } from './supabase';

export const STATUS_META: Record<LeadStatus, { label: string; className: string }> = {
  new:       { label: 'Yeni',            className: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
  contacted: { label: 'Görüşülüyor',     className: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  proposal:  { label: 'Teklif verildi',  className: 'bg-violet-500/15 text-violet-300 border-violet-500/30' },
  won:       { label: 'Kazanıldı',       className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  lost:      { label: 'Kaybedildi',      className: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
  spam:      { label: 'Spam',            className: 'bg-white/5 text-white/40 border-white/10' },
};
