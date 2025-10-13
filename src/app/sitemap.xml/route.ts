import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

const siteUrl = 'https://hustlerspoint.vercel.app';

// Add more pages for better Google coverage: include key static pages, main dynamic pages, and popular blog post URLs if possible.
const pages = [
  '',               // homepage
  'about',
  'contact',
  'blog',
  'services',
  'privacy-policy',
  // Add any additional important pages for SEO below:
  'terms-of-service',
];

export async function GET() {
  const sitemap = new SitemapStream({ hostname: siteUrl });

  for (const page of pages) {
    sitemap.write({
      url: `/${page}`,
      changefreq: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    });
  }

  sitemap.end();

  const xml = await streamToPromise(sitemap);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      // Google recommends UTF-8 encoding
      'X-Robots-Tag': 'index, follow',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
