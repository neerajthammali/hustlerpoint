export type Stat = {
  label: string;
  value: number;
  growth: number;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageId: string;
  author: string;
  publishedDate: string;
  readingTime: number;
  content: string[];
  featured: boolean;
  engagement: number;
};
