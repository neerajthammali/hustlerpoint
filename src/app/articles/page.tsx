
'use client';

import { useState, useEffect, useMemo } from 'react';
import { type Article } from '@/lib/types';
import ArticleList from '@/components/article-list';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getAllArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    if (!searchTerm) {
      return articles;
    }
    return articles.filter(article => {
      const term = searchTerm.toLowerCase();
      return (
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    });
  }, [searchTerm, articles]);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">All Articles</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore our full library of insights on technology, creativity, and the startup world.
        </p>
      </header>
      
      <div className="mb-12 max-w-lg mx-auto">
          <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Search articles by title, tag, or content..."
                className="w-full pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
          </div>
      </div>

      {isLoading ? (
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <div className="aspect-video w-full animate-pulse rounded-lg bg-muted"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-1/4 animate-pulse rounded bg-muted"></div>
                        <div className="h-5 w-full animate-pulse rounded bg-muted"></div>
                        <div className="h-12 w-full animate-pulse rounded bg-muted"></div>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <ArticleList articles={filteredArticles} />
      )}
    </div>
  );
}
