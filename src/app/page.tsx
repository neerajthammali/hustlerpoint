'use client';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ArticleCard from '@/components/article-card';
import { ArticleCarousel } from '@/components/article-carousel';
import { type Article } from '@/lib/types';
import { useEffect, useState } from 'react';
import { getAllArticles } from '@/lib/articles';

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [editorsPicks, setEditorsPicks] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const allArticles = await getAllArticles();
      
      const editorsPicksSlugs = ['the-art-of-the-pitch-deck', 'ai-tools-that-will-10x-your-productivity', 'from-side-hustle-to-main-gig'];
      const picks = allArticles.filter(article => editorsPicksSlugs.includes(article.slug));

      const featured = allArticles.filter(article => article.featured && !picks.find(p => p.slug === article.slug));

      setFeaturedArticles(featured);
      setEditorsPicks(picks);
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
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
            <Link href="/about">About Us</Link>
          </Button>
        </div>
      </div>

      <section className="mt-24 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Editor's Picks</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
          Hand-picked articles from our editors to get you started.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <ArticleCard key={i} article={null} isLoading={true}/>)
          ) : (
            editorsPicks.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))
          )}
        </div>
      </section>

      <section className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Featured Articles</h2>
          <Button asChild variant="outline">
            <Link href="/articles">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ArticleCarousel articles={featuredArticles} isLoading={isLoading} />
      </section>
    </div>
  );
}
