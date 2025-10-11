
import sitemap from '../sitemap';

export const revalidate = 60 * 60 * 24; // 24 hours

export async function GET() {
    const sitemapContent = await sitemap();
    
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapContent.map(item => `
    <url>
      <loc>${item.url}</loc>
      <lastmod>${item.lastModified}</lastmod>
      <changefreq>${item.changeFrequency}</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

    return new Response(sitemapXml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
