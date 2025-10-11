
'use client';

import ArticleCard from '@/components/article-card';
import type { Article } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

type ArticleListProps = {
  articles: Article[];
};

export default function ArticleList({ articles }: ArticleListProps) {
  const isLoading = !articles;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
                <div className="mt-4 pt-4">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
          </Card>
        ))
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))
      )}
    </div>
  );
}
