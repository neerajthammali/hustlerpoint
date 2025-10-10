import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/articles');

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  featured: boolean;
  contentHtml: string;
  imageUrl?: string;
  imageHint?: string;
};

export async function getArticleBySlug(slug: string): Promise<Article> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      excerpt: string;
      category: string;
      author: string;
      publishedDate: string;
      featured: boolean;
      imageUrl?: string;
      imageHint?: string;
    }),
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = await Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    return getArticleBySlug(slug);
  }));

  return allArticlesData.sort((a, b) => {
    if (new Date(a.publishedDate) < new Date(b.publishedDate)) {
      return 1;
    } else {
      return -1;
    }
  });
}
