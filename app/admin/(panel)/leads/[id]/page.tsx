import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db, isDbConfigured, type Lead } from '@/lib/supabase';
import { formatDate, timeAgo, whatsappLink } from '@/lib/admin';
import LeadControls from './LeadControls';

export const metadata = { title: 'Talep detayı' };

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  if (!isDbConfigured() || !/^[0-9a-f-]{36}$/i.test(params.id)) notFound();

  const { data } = await db().from('leads').select('*').eq('id', params.id).maybeSingle();
  if (!data) notFound();
  let lead = data as Lead;

  // Açılan talebi otomatik olarak okundu işaretle
  if (!lead.is_read) {
    await db().from('leads').update({ is_read: true }).eq('id', lead.id);
    lead = { ...lead, is_read: true };
  }

  const wa = whatsappLink(lead.phone);
  const greeting = lead.locale === 'en' ? `Hi ${lead.name}, this is Sitelya.` : `Merhaba ${lead.name}, Sitelya'dan yazıyorum.`;

  const details: Array<[string, React.ReactNode]> = [
    ['E-posta', <a key="e" href={`mailto:${lead.email}`} className="text-[#60a5fa] hover:text-white break-all">{lead.email}</a>],
    ['Telefon', lead.phone ? <a key="p" href={`tel:${lead.phone.replace(/\s/g, '')}`} className="text-[#60a5fa] hover:text-white">{lead.phone}</a> : '—'],
    ['Paket', lead.package ?? 'Belirtilmedi'],
    ['Dil', lead.locale === 'en' ? 'İngilizce' : 'Türkçe'],
    ['Gönderildiği sayfa', lead.source ?? '—'],
    ['Gönderim', `${formatDate(lead.created_at)} (${timeAgo(lead.created_at)})`],
    ['Son güncelleme', formatDate(lead.updated_at)],
    ['KVKK onayı', formatDate(lead.kvkk_accepted_at)],
  ];

  return (
    <div className="max-w-5xl space-y-5">
      <Link href="/admin/leads" className="text-sm text-white/50 hover:text-white">← Mesajlar</Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <p className="text-sm text-white/45 mt-1">{formatDate(lead.created_at)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {wa && (
            <a href={`${wa}?text=${encodeURIComponent(greeting)}`} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20">
              WhatsApp
            </a>
          )}
          <a href={`mailto:${lead.email}?subject=${encodeURIComponent(lead.locale === 'en' ? 'Your website project – Sitelya' : 'Web sitesi talebiniz – Sitelya')}`}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#2563EB] hover:bg-blue-600">
            E-posta yaz
          </a>
          {lead.phone && (
            <a href={`tel:${lead.phone.replace(/\s/g, '')}`} className="px-4 py-2 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/5">
              Ara
            </a>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-3">Mesaj</h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-white/85">{lead.message}</p>
          </section>
          <LeadControls id={lead.id} status={lead.status} notes={lead.notes} />
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 h-fit">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-3">Bilgiler</h2>
          <dl className="space-y-3 text-sm">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-white/40">{label}</dt>
                <dd className="text-white/80 break-words">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
