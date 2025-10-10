
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { type Article } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { getArticles } from '@/lib/data';

export function TrendingArticles({ currentArticleId }: { currentArticleId?: string }) {
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allArticles = getArticles();

    // Simple trending logic: sort by engagement and filter out the current article
    const sortedArticles = allArticles
      .sort((a, b) => b.engagement - a.engagement)
      .filter(a => a.id !== currentArticleId)
      .slice(0, 3);
      
    setTrendingArticles(sortedArticles);
    setIsLoading(false);
  }, [currentArticleId]);


  if (isLoading) {
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
  
  if (!trendingArticles || trendingArticles.length === 0) {
    return (
        <div>
            <h3 className="mb-4 font-headline text-xl font-bold">Trending Articles</h3>
            <p className="text-sm text-muted-foreground">No trending articles right now.</p>
        </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 font-headline text-xl font-bold">Trending Articles</h3>
      <div className="space-y-4">
        {trendingArticles.map((article) => {
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
                <p className="text-sm font-semibold leading-tight group-hover:text-primary line-clamp-2">{article.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{article.publishedDate}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
