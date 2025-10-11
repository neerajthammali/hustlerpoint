'use server';

import { type Article } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import placeholderImages from './placeholder-images.json';

const articlesDirectory = path.join(process.cwd(), 'articles');

export async function getAllArticles(): Promise<Article[]> {
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames
    .map(fileName => {
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data: frontmatter, content } = matter(fileContents);

        // Skip drafts or non-published articles
        if (frontmatter.status !== 'published') {
            return null;
        }
        
        const imageId = frontmatter.image_id as keyof typeof placeholderImages | undefined;
        const imageInfo = imageId ? placeholderImages[imageId] : placeholderImages['article-card'];


        return {
            slug: frontmatter.slug,
            content,
            title: frontmatter.title,
            author: frontmatter.author,
            publisher: frontmatter.publisher,
            category: frontmatter.category,
            excerpt: frontmatter.description,
            image: imageInfo.url,
            image_alt: imageInfo.alt,
            image_width: imageInfo.width,
            image_height: imageInfo.height,
            image_hint: imageInfo.hint,
            publishedDate: new Date(frontmatter.date).toISOString(),
            modifiedDate: frontmatter.modified_date ? new Date(frontmatter.modified_date).toISOString() : new Date(frontmatter.date).toISOString(),
            tags: frontmatter.tags || [],
            read_time: frontmatter.read_time,
            status: frontmatter.status,
            language: frontmatter.language,
            canonicalUrl: frontmatter.canonicalUrl,
            featured: frontmatter.featured || false,
            // Engagement is a dummy value for now, can be replaced with real analytics
            engagement: (frontmatter.title.length * 10) % 100, 
        } as Article;
    })
    .filter((article): article is Article => article !== null); // Filter out nulls (drafts)


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
