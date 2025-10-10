
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/article-card';

export default async function Home() {
  const allArticles = await getAllArticles();
  const featuredArticles = allArticles.filter(article => article.featured).slice(0, 3);

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
                <Link href="/about">About Us</Link>
            </Button>
        </div>
      </div>

      <section className="mt-24 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Featured Articles</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
          Dive into our latest insights and stories from the world of tech, creators, and startup culture.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link href="/articles">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

    </div>
  );
}
