'use server';

import { type Article } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'articles');

export async function getAllArticles(): Promise<Article[]> {
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data: frontmatter, content } = matter(fileContents);

        return {
            slug,
            content,
            title: frontmatter.title,
            author: frontmatter.author,
            category: frontmatter.category,
            excerpt: frontmatter.description, // Using description as excerpt
            image: frontmatter.image,
            publishedDate: new Date(frontmatter.date).toISOString(),
            engagement: (frontmatter.title.length * 10) % 100, // Dummy engagement
        } as Article;
    });

    return allArticlesData.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
    const articles = await getAllArticles();
    const article = articles.find(article => article.slug === slug);
    if (!article) {
        return undefined;
    }
    const processedContent = await remark()
        .use(html)
        .process(article.content);
    const contentHtml = processedContent.toString();

    return {
        ...article,
        content: contentHtml,
    };
}
