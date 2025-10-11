
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Calendar, Clock, Tag } from 'lucide-react';
import ShareButtons from '@/components/share-buttons';
import { Separator } from '@/components/ui/separator';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { TrendingArticles } from '@/components/trending-articles';
import ArticleRenderer from '@/components/article-renderer';
import Comments from '@/components/comments';
import { Metadata } from 'next';
import Link from 'next/link';

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

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {};
  }
  
  const imageUrl = article.image ? new URL(article.image, 'https://www.hustlerpoint.xyz').toString() : '/og-image.png';

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `/articles/${article.slug}`,
      publishedTime: article.publishedDate,
      modifiedTime: article.modifiedDate,
      authors: [article.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.image_alt || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: article.canonicalUrl || `/articles/${article.slug}`,
    },
  };
}


export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }
  const { image } = article;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    image: image ? new URL(image, 'https://www.hustlerpoint.xyz').toString() : undefined,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher || 'Hustler Point',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.hustlerpoint.xyz/logo.png',
      },
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    description: article.excerpt,
  };


  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Main Content */}
        <div className="lg:col-span-8">
          <article>
            <header className="mb-8">
              <Link href={`/category/${article.category.toLowerCase()}`}>
                <Badge variant="secondary" className="mb-4">
                  {article.category}
                </Badge>
              </Link>
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
                  <span>{new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                {article.read_time && (
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{article.read_time}</span>
                    </div>
                )}
              </div>
            </header>

            {image && (
              <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image}
                  alt={article.image_alt || article.title}
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint="article hero"
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ArticleRenderer content={article.content} />
            </div>

            {article.tags && article.tags.length > 0 && (
                <div className="mt-8">
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-muted-foreground">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                        {article.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                        </div>
                    </div>
                </div>
            )}
          </article>
          <Separator className="my-12" />
          <Comments articleId={article.slug} />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 lg:pt-24">
          <div className="sticky top-28 space-y-8">
            <TrendingArticles currentArticleSlug={article.slug} />
             <div className="flex flex-col items-center justify-between gap-4 rounded-lg border bg-card p-6">
                <p className="text-sm font-semibold">Share this article</p>
                <ShareButtons article={{ title: article.title, slug: article.slug }} />
              </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}
