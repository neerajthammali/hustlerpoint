import { getArticles } from '@/lib/data';
import { suggestTrendingArticles } from '@/ai/flows/suggest-trending-articles';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export async function TrendingArticles() {
  const allArticles = getArticles();
  
  if (allArticles.length === 0) {
    return (
        <div>
            <h3 className="mb-4 font-headline text-xl font-bold">Trending Articles</h3>
            <p className="text-sm text-muted-foreground">No articles available to determine trends.</p>
        </div>
    );
  }

  const { suggestedArticles: trendingArticleTitles } = await suggestTrendingArticles({
    articleTitles: allArticles.map(a => a.title),
    articleExcerpts: allArticles.map(a => a.excerpt),
    engagementMetrics: allArticles.map(a => a.engagement),
    numberOfSuggestions: 3,
  });

  const trendingArticles = allArticles
    .filter(a => trendingArticleTitles.includes(a.title))
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
