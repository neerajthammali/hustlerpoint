import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Poppins } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Hustler Point - Publish, Grow, and Monetize Your Ideas',
    template: '%s | Hustler Point',
  },
  description: 'A creator platform for writers, founders, and learners to share powerful insights, grow an audience, and monetize their ideas with smart, AI-powered tools.',
  metadataBase: new URL('https://hustlerspoint.vercel.app'), // Replace with your actual domain
  openGraph: {
    title: 'Hustler Point',
    description: 'The platform for creators, founders, and learners to build their impact.',
    url: 'https://hustlerspoint.vercel.app',
    siteName: 'Hustler Point',
    images: [
      {
        url: '/og-image.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hustler Point',
    description: 'The platform for creators, founders, and learners to build their impact.',
    images: ['/og-image.png'], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* JSON-LD Organization schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'HustlersPoint',
            url: 'https://hustlerspoint.vercel.app',
            logo: 'https://hustlerspoint.vercel.app/logo.png',
            sameAs: [
              'https://twitter.com/hustlerspoint',
              'https://github.com/neerajthammali'
            ],
            contactPoint: [{
              '@type': 'ContactPoint',
              email: 'contact@hustlerspoint.vercel.app',
              contactType: 'customer support'
            }]
          }) }}
        />
      </head>
      <body className={cn('font-body antialiased')}>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
            <Script src="https://cdn.commoninja.com/sdk/latest/commonninja.js" defer />

            {/* Inline web-vitals sender (collects LCP, CLS, FID/INP) */}
            <Script id="web-vitals-sender" strategy="afterInteractive">
              {`(function(){
    try{
      function sendMetric(name, value, delta, id){
        navigator.sendBeacon && navigator.sendBeacon('/api/web-vitals', JSON.stringify({name, value, delta, id, url: location.pathname, ts: Date.now()})) || fetch('/api/web-vitals', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name, value, delta, id, url: location.pathname, ts: Date.now()})});
      }

      // Observe performance entries
      if (PerformanceObserver) {
        const po = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              sendMetric('LCP', entry.startTime || 0, 0, entry.renderTime || '');
            }
            if (entry.entryType === 'layout-shift') {
              // cumulative shift
              sendMetric('CLS', entry.value || 0, 0, '');
            }
          }
        });
        try{ po.observe({type: 'largest-contentful-paint', buffered: true}); }catch(e){}
        try{ po.observe({type: 'layout-shift', buffered: true}); }catch(e){}
      }

      // First Input Delay / Interaction to Next Paint approximation
      addEventListener('pointerdown', function onFirst(){
        sendMetric('FID', 0, 0, 'first-input');
        removeEventListener('pointerdown', onFirst);
      }, {once:true, passive:true});
    }catch(e){console.warn(e)}
  })();`}
            </Script>
      </body>
    </html>
  );
}
