import { STATUS_META } from '@/lib/lead-status';
import type { LeadStatus } from '@/lib/supabase';

export default function StatusBadge({ status }: { status: LeadStatus }) {
  const meta = STATUS_META[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-semibold whitespace-nowrap ${meta.className}`}>
      {meta.label}
    </span>
  );
}
