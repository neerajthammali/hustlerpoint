
import Image from 'next/image';
import Link from 'next/link';
import { type Article } from '@/lib/articles';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="group h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {article.imageUrl && (
        <CardHeader className="p-0">
          <Link href={`/articles/${article.slug}`}>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={article.imageHint}
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
          {article.publishedDate}
        </div>
      </CardContent>
    </Card>
  );
}
