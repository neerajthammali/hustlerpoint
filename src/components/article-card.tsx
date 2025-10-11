
import Image from 'next/image';
import Link from 'next/link';
import { type Article } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

type ArticleCardProps = {
  article: Article | null;
  isLoading?: boolean;
};

export default function ArticleCard({ article, isLoading }: ArticleCardProps) {

  if (isLoading || !article) {
    return (
      <Card className="h-full overflow-hidden">
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
    )
  }

  const { image } = article;

  return (
    <Card className="group h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {image && (
        <CardHeader className="p-0">
          <Link href={`/articles/${article.slug}`}>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="article hero"
              />
            </div>
          </Link>
        </CardHeader>
      )}
      <CardContent className="flex flex-col justify-between p-6">
        <div>
          <Badge variant="secondary" className="mb-2">
            {article.category}
          </Badge>
          <Link href={`/articles/${article.slug}`}>
            <h3 className="font-headline text-lg font-bold group-hover:text-primary">{article.title}</h3>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
        </div>
        <div className="mt-4 pt-4 text-xs text-muted-foreground">
          {new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </CardContent>
    </Card>
  );
}
