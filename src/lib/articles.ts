
import { type Article } from './types';

// Function to get articles from the API, intended for client-side use.
async function getArticlesFromApi(): Promise<Article[]> {
    // In a real app, you might want to fetch from a full URL
    const res = await fetch('/api/articles'); 
    if (!res.ok) {
        console.error('Failed to fetch articles');
        return [];
    }
    return res.json();
}

/**
 * Fetches all articles.
 * This function is universal:
 * - On the server, it reads from the file system.
 * - On the client, it fetches from an API route.
 */
export async function getAllArticles(): Promise<Article[]> {
    if (typeof window === 'undefined') {
        // We are on the server, so we can import the server-only code.
        const { getAllArticles: getAllArticlesServer } = await import('./articles.server');
        return getAllArticlesServer();
    } else {
        // We are on the client
        return getArticlesFromApi();
    }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
    const articles = await getAllArticles();
    return articles.find(article => article.slug === slug);
}
