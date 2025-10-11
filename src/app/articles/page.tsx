
import { getAllArticles } from '@/lib/articles';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PaginatedArticles from '@/components/paginated-articles';

export default async function ArticlesPage() {
  const allArticles = await getAllArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">All Articles</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore our full library of insights on technology, creativity, and the startup world.
        </p>
      </header>
      
      <PaginatedArticles articles={allArticles} />

    </div>
  );
}
