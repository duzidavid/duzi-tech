import type { MetadataRoute } from 'next';
import { company } from '@/lib/company';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${company.url}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${company.url}/ochrana-osobnich-udaju`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
