'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '../actions';

const items = [
  { href: '/admin', label: 'Özet', icon: '▦' },
  { href: '/admin/leads', label: 'Mesajlar', icon: '✉' },
];

export default function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();

  return (
    <nav className="flex md:flex-col gap-1 px-3 md:py-3 items-center md:items-stretch flex-1 md:flex-none">
      {items.map(({ href, label, icon }) => {
        const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              active ? 'bg-[#2563EB]/15 text-white' : 'text-white/55 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="w-4 text-center opacity-70" aria-hidden="true">{icon}</span>
            {label}
            {href === '/admin/leads' && unread > 0 && (
              <span className="ml-auto min-w-5 h-5 px-1.5 rounded-full bg-[#2563EB] text-[11px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </Link>
        );
      })}
      <form action={logout} className="md:hidden ml-auto">
        <button className="px-3 py-2 text-sm text-white/50 hover:text-rose-300">Çıkış</button>
      </form>
    </nav>
  );
}
