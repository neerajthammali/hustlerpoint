
import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';
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
        <div className="p-4">
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

  const { image, image_alt, image_width, image_height, image_hint } = article;

  return (
    <Card className="group h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {image && (
        <CardHeader className="p-0">
          <Link href={`/articles/${article.slug}`}>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={image}
                alt={image_alt || article.title}
                width={image_width || 400}
                height={image_height || 225}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image_hint || "article hero"}
              />
            </div>
          </Link>
        </CardHeader>
      )}
      <CardContent className="flex flex-col justify-between p-4">
        <div>
          <Badge variant="secondary" className="mb-2">
            {article.category}
          </Badge>
          <Link href={`/articles/${article.slug}`}>
            <h3 className="font-headline text-lg font-bold group-hover:text-primary">{article.title}</h3>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
            {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs font-light">{tag}</Badge>
                    ))}
                </div>
            )}
            <div className="text-xs text-muted-foreground">
            {new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
