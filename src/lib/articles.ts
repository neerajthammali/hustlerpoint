
'use server';

import { type Article } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/articles');

// This function is guaranteed to only run on the server.
export async function getAllArticles(): Promise<Article[]> {
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data: frontmatter, content } = matter(fileContents);

        // This is a hack to give a somewhat unique ID and engagement score
        // In a real app, this would come from a database.
        const engagement = frontmatter.title.length * 10 % 100;
        const imageId = `article-${(engagement % 5) + 1}`;

        return {
            slug,
            content,
            engagement,
            imageId,
            ...frontmatter,
            publishedDate: new Date(frontmatter.publishedDate).toISOString(),
        } as Article;
    });

    return allArticlesData.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
    const articles = await getAllArticles();
    return articles.find(article => article.slug === slug);
}
