
'use client';

import { ArrowRight, BarChart, TrendingUp, Users } from 'lucide-react';

import { getStats } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import AnimatedCounter from '@/components/animated-counter';
import NewsletterSignup from '@/components/newsletter-signup';
import { ArticleCarousel } from '@/components/article-carousel';
import Link from 'next/link';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { type Article } from '@/lib/types';


function StatBlock({ stat, icon }: { stat: ReturnType<typeof getStats>[0], icon: React.ReactNode }) {
    return (
        <div className="flex items-center space-x-4 mx-8">
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <div className="text-2xl font-bold">
                    <AnimatedCounter to={stat.value} />
                </div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                 <p className="text-xs text-green-500">
                    +{stat.growth}% from last year
                </p>
            </div>
        </div>
    );
}

export default function Home() {
  const stats = getStats();
  const firestore = useFirestore();

  const featuredArticlesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'articles'),
      where('featured', '==', true),
      where('status', '==', 'published')
    );
  }, [firestore]);
  
  const { data: featuredArticles, isLoading: areArticlesLoading } = useCollection<Article>(featuredArticlesQuery);

  const statIcons = [
    <Users key="users" className="h-8 w-8 text-primary" />,
    <TrendingUp key="trending-up" className="h-8 w-8 text-primary" />,
    <BarChart key="bar-chart" className="h-8 w-8 text-primary" />,
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <Badge variant="outline" className="py-2 px-4 text-sm">
          Where Insight Meets Impact
        </Badge>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Hustler's Point
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Your source for sharp, actionable insights into tech, creativity, and startup culture. We provide practical guides to help you navigate the digital world, build your brand, and turn your ideas into reality.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
                <Link href="/articles">
                    Read Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link href="#newsletter">Join Newsletter</Link>
            </Button>
        </div>
      </div>

      <div className="relative mt-16 w-full">
          <div className="flex items-center justify-center">
              {stats.map((stat, index) => (
                  <StatBlock key={`${stat.label}-${index}`} stat={stat} icon={statIcons[index % statIcons.length]} />
              ))}
          </div>
      </div>

      <section className="mt-24 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Featured Articles</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
          Dive into our latest insights and stories from the world of tech, creators, and startup culture.
        </p>
        <div className="mt-8">
          <ArticleCarousel articles={featuredArticles || []} isLoading={areArticlesLoading} />
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link href="/articles">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section id="newsletter" className="mt-24 scroll-mt-20">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-primary text-primary-foreground">
          <div className="p-8 text-center sm:p-10">
            <h3 className="font-headline text-2xl font-bold tracking-tight">Join Hustler's Point</h3>
            <p className="mt-2 text-primary-foreground/80">
              Get exclusive insights on tech, business, and entrepreneurship, delivered straight to your inbox.
            </p>
            <div className="mt-6 flex justify-center">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
