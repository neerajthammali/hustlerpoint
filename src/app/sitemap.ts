
import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

const URL = 'https://www.hustlerpoint.xyz'; // Replace with your domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map(({ slug, publishedDate }) => ({
    url: `${URL}/articles/${slug}`,
    lastModified: new Date(publishedDate).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
     {
      url: `${URL}/articles`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [...staticPages, ...articleEntries];
}
