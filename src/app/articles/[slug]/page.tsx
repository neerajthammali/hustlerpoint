
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug, getArticles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Calendar } from 'lucide-react';
import ShareButtons from '@/components/share-buttons';
import { Separator } from '@/components/ui/separator';
import Comments from '@/components/comments';
import { Suspense } from 'react';
import { TrendingArticles } from '@/components/trending-articles';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

function TrendingArticlesSkeleton() {
  return (
    <div>
      <h3 className="mb-4 font-headline text-xl font-bold">Trending Articles</h3>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === article.imageId);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 md:py-20">
      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {article.category}
          </Badge>
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.publishedDate}</span>
            </div>
          </div>
        </header>

        {image && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={image.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={image.imageHint}
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground">{article.excerpt}</p>
          <Separator className="my-8" />
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
              {article.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </article>

      <footer className="mt-12 space-y-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg border bg-card p-6 sm:flex-row">
            <p className="text-sm font-semibold">Share this article</p>
            <ShareButtons article={{title: article.title, slug: article.slug}} />
        </div>

        <section className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>More Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<TrendingArticlesSkeleton />}>
                <TrendingArticles />
              </Suspense>
            </CardContent>
          </Card>
        </section>

        <Comments />
      </footer>
    </div>
  );
}
