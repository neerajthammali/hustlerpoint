import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';

// Your live site URL
const siteUrl = 'https://hustlerspoint.vercel.app';

// List of all key pages (add/edit anytime)
const pages = [
  '',               // homepage
  'about',
  'contact',
  'blog',
  'services',
  'privacy-policy',
];

async function generate() {
  const sitemap = new SitemapStream({ hostname: siteUrl });

  pages.forEach((page) => {
    sitemap.write({
      url: `/${page}`,
      changefreq: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  const filePath = path.resolve('./public/sitemap.xml');

  createWriteStream(filePath).write(xml);
  console.log('✅  Sitemap generated at public/sitemap.xml');
}

generate().catch((err) => {
  console.error('❌  Error generating sitemap:', err);
  process.exit(1);
});
