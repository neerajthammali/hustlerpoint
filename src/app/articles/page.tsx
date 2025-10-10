
import { Suspense } from 'react';
import { getArticles, getEditorsPicks } from '@/lib/data';
import ArticleCard from '@/components/article-card';
import { TrendingArticles } from '@/components/trending-articles';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

function EditorsPicks() {
  const editorsPicks = getEditorsPicks();

  return (
    <div>
      <h3 className="mb-4 font-headline text-xl font-bold">Editor's Pick</h3>
      <div className="space-y-4">
        {editorsPicks.map((article) => {
          const image = PlaceHolderImages.find((img) => img.id === article.imageId);
          return (
            <Link key={article.id} href={`/articles/${article.slug}`} className="group flex items-start space-x-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                  />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight group-hover:text-primary">{article.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{article.publishedDate}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}


export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">All Articles</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore our full library of insights on technology, creativity, and the startup world.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="grid gap-8 lg:col-span-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} layout="horizontal" />
          ))}
        </div>

        <aside className="space-y-8 lg:col-span-4">
          <div className="rounded-lg bg-card p-6 shadow-sm">
            <Suspense fallback={<TrendingArticlesSkeleton />}>
              <TrendingArticles />
            </Suspense>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-sm">
            <EditorsPicks />
          </div>
        </aside>
      </div>
    </div>
  );
}
