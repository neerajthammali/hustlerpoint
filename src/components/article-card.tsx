import Image from 'next/image';
import Link from 'next/link';
import { type Article } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type ArticleCardProps = {
  article: Article;
  layout?: 'vertical' | 'horizontal';
};

export default function ArticleCard({ article, layout = 'vertical' }: ArticleCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === article.imageId);

  if (layout === 'horizontal') {
    return (
      <Card className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl md:flex-row">
        <div className="relative aspect-video flex-shrink-0 md:w-2/5">
          {image && (
            <Link href={`/articles/${article.slug}`} className="block h-full w-full">
              <Image
                src={image.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            </Link>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {article.category}
            </Badge>
            <Link href={`/articles/${article.slug}`}>
              <h3 className="font-headline text-xl font-bold group-hover:text-primary">
                {article.title}
              </h3>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {article.publishedDate} &bull; {article.readingTime} min read
            </span>
            <Link href={`/articles/${article.slug}`} className="flex items-center text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Read More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {image && (
        <CardHeader className="p-0">
          <Link href={`/articles/${article.slug}`}>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={image.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
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
          <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
        </div>
        <div className="mt-4 pt-4 text-xs text-muted-foreground">
          {article.publishedDate} &bull; {article.readingTime} min read
        </div>
      </CardContent>
    </Card>
  );
}
