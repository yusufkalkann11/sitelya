import Link from 'next/link';
import { requireAdmin } from '@/lib/admin';
import { db, isDbConfigured } from '@/lib/supabase';
import { SiteliyaIcon } from '@/components/Logo';
import { logout } from '../actions';
import AdminNav from './AdminNav';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  let unread = 0;
  if (isDbConfigured()) {
    const { count } = await db().from('leads').select('id', { count: 'exact', head: true }).eq('is_read', false);
    unread = count ?? 0;
  }

  return (
    <div className="min-h-screen md:flex">
      <aside className="md:w-60 md:min-h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#0b1220] flex md:flex-col">
        <Link href="/admin" className="flex items-center gap-2.5 px-5 h-16 flex-shrink-0">
          <SiteliyaIcon size={26} />
          <span className="font-extrabold tracking-tight">Sitelya <span className="text-white/40 font-medium text-sm">Admin</span></span>
        </Link>
        <AdminNav unread={unread} />
        <div className="hidden md:block mt-auto p-3 border-t border-white/10 space-y-1">
          <a href="/tr" target="_blank" className="block px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5">Siteyi aç ↗</a>
          <form action={logout}>
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/50 hover:text-rose-300 hover:bg-white/5">Çıkış yap</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        {!isDbConfigured() && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Veritabanı bağlı değil. <code className="text-amber-100">SUPABASE_URL</code> ve{' '}
            <code className="text-amber-100">SUPABASE_SERVICE_ROLE_KEY</code> ortam değişkenlerini tanımlayın.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
