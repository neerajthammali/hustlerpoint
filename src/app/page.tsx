
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ArticleCard from '@/components/article-card';
import { type Article } from '@/lib/types';
import { getAllArticles } from '@/lib/articles';
import { TestimonialsCarousel } from '@/components/testimonials';
import { Card, CardContent } from '@/components/ui/card';

const expertiseAreas = [
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Startup Playbooks',
    description: 'Proven strategies for building and scaling a successful business.',
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Tech & Productivity',
    description: 'The latest tools and workflows to optimize your hustle.',
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Creator Economy',
    description: 'Insights on audience growth and monetization.',
  },
]

export default async function Home() {
  const allArticles = await getAllArticles();
  
  const editorsPicksSlugs = ['the-art-of-the-pitch-deck', '5-ai-tools-that-will-10x-your-productivity', 'from-side-hustle-to-main-gig'];
  const editorsPicks = allArticles.filter(article => editorsPicksSlugs.includes(article.slug));

  const isLoading = false; // Data is pre-fetched on the server

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Publish Your Ideas. Build Your Future.
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Hustler Point is a creator platform for writers, founders, and learners to share powerful insights, grow an audience, and monetize their ideas with smart, AI-powered tools.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/articles">
              Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
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
        <div className="mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/articles">
              View More Articles
            </Link>
          </Button>
        </div>
      </section>

      <section className="mt-24 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">What They're Saying</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
          Testimonials from our readers and community members.
        </p>
        <TestimonialsCarousel />
      </section>

      <section className="mt-24 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">A Platform Built for Impact</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
          We focus on the tools and topics that matter most to modern creators.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertiseAreas.map((item) => (
                <Card key={item.title} className="text-center">
                    <CardContent className="p-6">
                        <div className="mb-4 flex justify-center">
                          {item.icon}
                        </div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

    </div>
  );
}
