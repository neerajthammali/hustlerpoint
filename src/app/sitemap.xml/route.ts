import { getAllArticles } from '@/lib/articles';

export async function GET() {
  const baseUrl = 'https://hustlerspoint.vercel.app';
  const pages = [
    { loc: `${baseUrl}/`, priority: 1.0, changefreq: 'daily' },
    { loc: `${baseUrl}/articles`, priority: 0.9, changefreq: 'daily' },
    { loc: `${baseUrl}/community`, priority: 0.7, changefreq: 'weekly' },
    { loc: `${baseUrl}/talent-showcase`, priority: 0.6, changefreq: 'weekly' },
    { loc: `${baseUrl}/newsletter`, priority: 0.6, changefreq: 'monthly' },
    { loc: `${baseUrl}/about`, priority: 0.5, changefreq: 'monthly' },
  ];

  let articles = [];
  try {
    articles = await getAllArticles();
  } catch (e) {
    articles = [];
  }

  const urls = [];

  for (const p of pages) {
    urls.push(`
  <url>
    <loc>${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(2)}</priority>
  </url>`);
  }

  for (const a of articles) {
    const loc = `${baseUrl}/articles/${a.slug}`;
    const lastmod = a.modifiedDate || a.publishedDate || new Date().toISOString();
    urls.push(`
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
