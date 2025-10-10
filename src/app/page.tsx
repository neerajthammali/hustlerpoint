import Image from 'next/image';
import { ArrowRight, BarChart, TrendingUp, Users } from 'lucide-react';

import { getArticles, getStats } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import AnimatedCounter from '@/components/animated-counter';
import NewsletterSignup from '@/components/newsletter-signup';
import { ArticleCarousel } from '@/components/article-carousel';
import Link from 'next/link';

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
  const featuredArticles = getArticles().filter((article) => article.featured);

  const statIcons = [
    <Users key="users" className="h-8 w-8 text-primary" />,
    <TrendingUp key="trending-up" className="h-8 w-8 text-primary" />,
    <BarChart key="bar-chart" className="h-8 w-8 text-primary" />,
  ];

  const marqueeStats = [...stats, ...stats];

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <Badge variant="outline" className="py-2 px-4 text-sm">
          Where Insight Meets Impact
        </Badge>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Hustler Point
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          A digital voice built for the modern hustler — where ideas, innovation, and individuality meet.
        </p>
      </div>

      <div className="relative mt-16 w-full overflow-hidden group">
          <div className="flex whitespace-nowrap group-hover:[animation-play-state:paused]">
              <div className="marquee flex min-w-full flex-shrink-0 items-center justify-around">
                  {marqueeStats.map((stat, index) => (
                      <StatBlock key={`${stat.label}-${index}`} stat={stat} icon={statIcons[index % statIcons.length]} />
                  ))}
              </div>
              <div aria-hidden="true" className="marquee2 flex min-w-full flex-shrink-0 items-center justify-around">
                  {marqueeStats.map((stat, index) => (
                      <StatBlock key={`${stat.label}-2-${index}`} stat={stat} icon={statIcons[index % statIcons.length]} />
                  ))}
              </div>
          </div>
      </div>

      <section className="mt-24 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Featured Articles</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
          Dive into our latest insights and stories from the world of tech, creators, and startup culture.
        </p>
        <div className="mt-8">
          <ArticleCarousel articles={featuredArticles} />
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link href="/articles">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section className="mt-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-card">
          <div className="grid md:grid-cols-2">
            <div className="p-8 sm:p-10">
              <h3 className="font-headline text-2xl font-bold tracking-tight">Join the Hustle</h3>
              <p className="mt-2 text-muted-foreground">
                Get the latest insights, articles, and updates delivered straight to your inbox.
              </p>
              <div className="mt-6">
                <NewsletterSignup />
              </div>
            </div>
            <div className="relative hidden aspect-square md:block">
              <Image
                src="https://picsum.photos/seed/newsletter/600/600"
                alt="Newsletter abstract image"
                fill
                className="object-cover"
                data-ai-hint="abstract texture"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
