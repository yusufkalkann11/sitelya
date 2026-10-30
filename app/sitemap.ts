import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const pages: Array<{ tr: string; en: string; priority: number }> = [
  { tr: '/tr', en: '/en', priority: 1 },
  { tr: '/tr/hakkimizda', en: '/en/hakkimizda', priority: 0.7 },
  { tr: '/tr/iletisim', en: '/en/iletisim', priority: 0.8 },
  { tr: '/tr/gizlilik', en: '/en/privacy', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap(({ tr, en, priority }) =>
    [tr, en].map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages: { tr: `${SITE_URL}${tr}`, en: `${SITE_URL}${en}` } },
    }))
  );
}
