
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { type Article } from '@/lib/types';
import { getAllArticles } from '@/lib/articles';

export async function TrendingArticles({ currentArticleSlug }: { currentArticleSlug?: string }) {
  const allArticles = (await getAllArticles()).filter(a => a.slug !== currentArticleSlug);

  const trendingArticles = allArticles
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 3);
  
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
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group flex items-start space-x-4">
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
                <p className="mt-1 text-xs text-muted-foreground">{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
