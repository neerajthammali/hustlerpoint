
'use client';

import { useState, useEffect } from 'react';
import type { Article } from '@/lib/types';
import ArticleList from '@/components/article-list';
import { getAllArticles } from '@/lib/articles';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ARTICLES_PER_PAGE = 9;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      const allArticles = await getAllArticles();
      setArticles(allArticles);
      setFilteredArticles(allArticles);
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = articles.filter((article) => {
      const tagsMatch = article.tags?.some(tag => tag.toLowerCase().includes(lowercasedTerm));
      const titleMatch = article.title.toLowerCase().includes(lowercasedTerm);
      const descriptionMatch = article.excerpt.toLowerCase().includes(lowercasedTerm);
      return titleMatch || descriptionMatch || tagsMatch;
    });
    setFilteredArticles(results);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchTerm, articles]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">All Articles</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore our full library of insights on technology, creativity, and the startup world.
        </p>
      </header>

      <div className="relative mx-auto mb-10 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles by title, tag, or content..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ArticleList articles={paginatedArticles} />
      
      {!isLoading && filteredArticles.length === 0 && (
        <div className="text-center mt-16">
          <p className="text-lg font-semibold">No articles found</p>
          <p className="text-muted-foreground mt-2">Try a different search term.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
