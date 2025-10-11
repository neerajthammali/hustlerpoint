
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Poppins } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';

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
  metadataBase: new URL('https://www.hustlerpoint.xyz'), // Replace with your actual domain
  openGraph: {
    title: 'Hustler Point',
    description: 'The platform for creators, founders, and learners to build their impact.',
    url: 'https://www.hustlerpoint.xyz',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn('font-body antialiased')}>
        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
