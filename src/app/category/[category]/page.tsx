
import { getAllArticles } from '@/lib/articles';
import ArticleList from '@/components/article-list';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
    const articles = await getAllArticles();
    const categories = [...new Set(articles.map(article => article.category.toLowerCase()))];
    return categories.map(category => ({
        category: category,
    }));
}


export default async function CategoryPage({ params }: CategoryPageProps) {
  const allArticles = await getAllArticles();
  const categoryName = decodeURIComponent(params.category);

  const articles = allArticles.filter(
    (article) => article.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (articles.length === 0) {
    notFound();
  }
  
  const allCategories = [...new Set(allArticles.map(a => a.category))];

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Category: <span className="text-primary">{articles[0].category}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {`Explore articles filed under the "${articles[0].category}" category.`}
        </p>
         <div className="mt-6 flex flex-wrap justify-center gap-2">
            {allCategories.map(cat => (
                <Link href={`/category/${cat.toLowerCase()}`} key={cat}>
                    <Badge variant={cat.toLowerCase() === categoryName.toLowerCase() ? 'default' : 'secondary'}>
                        {cat}
                    </Badge>
                </Link>
            ))}
        </div>
      </header>
      <ArticleList articles={articles} />
    </div>
  );
}

