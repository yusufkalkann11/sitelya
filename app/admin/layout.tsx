import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: { default: 'Admin | Sitelya', template: '%s | Sitelya Admin' },
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-inter bg-[#080d14] text-white antialiased min-h-screen">{children}</body>
    </html>
  );
}
