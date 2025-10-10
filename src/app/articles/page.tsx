
import { getAllArticles } from '@/lib/articles';
import ArticleList from '@/components/article-list';

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">All Articles</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore our full library of insights on technology, creativity, and the startup world.
        </p>
      </header>
      <ArticleList articles={articles} />
    </div>
  );
}
