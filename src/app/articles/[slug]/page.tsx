
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Calendar } from 'lucide-react';
import ShareButtons from '@/components/share-buttons';
import { Separator } from '@/components/ui/separator';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 md:py-20">
      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {article.category}
          </Badge>
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.publishedDate}</span>
            </div>
          </div>
        </header>

        {article.imageUrl && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={article.imageHint}
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.excerpt && <p className="lead text-xl text-muted-foreground">{article.excerpt}</p>}
          <Separator className="my-8" />
          <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
        </div>
      </article>

      <footer className="mt-12 space-y-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg border bg-card p-6 sm:flex-row">
            <p className="text-sm font-semibold">Share this article</p>
            <ShareButtons article={{title: article.title, slug: article.slug}} />
        </div>
      </footer>
    </div>
  );
}
