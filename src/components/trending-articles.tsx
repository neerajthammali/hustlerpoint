
'use client';

import { getArticles } from '@/lib/data';
import { suggestTrendingArticles } from '@/ai/flows/suggest-trending-articles';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { type Article } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

export function TrendingArticles({ currentArticleId }: { currentArticleId?: string }) {
  const firestore = useFirestore();
  
  const articlesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    let q = query(
        collection(firestore, 'articles'), 
        where('status', '==', 'published'),
        orderBy('engagement', 'desc'), 
        limit(4)
    );
    return q;
  }, [firestore]);

  const { data: allArticles, isLoading } = useCollection<Article>(articlesQuery);

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
  
  if (!allArticles || allArticles.length === 0) {
    return (
        <div>
            <h3 className="mb-4 font-headline text-xl font-bold">Trending Articles</h3>
            <p className="text-sm text-muted-foreground">No articles available to determine trends.</p>
        </div>
    );
  }

  // Filter out the current article from the trending list and take the top 3
  const trendingArticles = allArticles
    .filter(a => a.id !== currentArticleId)
    .slice(0, 3);

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
