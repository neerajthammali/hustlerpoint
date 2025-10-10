
import { getArticles as getAllStaticArticles, getArticleBySlug as getStaticArticleBySlug } from './data';
import { type Article } from './types';


export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
    // This is now a wrapper around the static data function
    return getStaticArticleBySlug(slug);
}

export async function getAllArticles(): Promise<Article[]> {
    // This is now a wrapper around the static data function
    const articles = getAllStaticArticles();
    // Sort articles by date
    return articles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}
