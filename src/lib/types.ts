
export type Stat = {
  label: string;
  value: number;
  growth: number;
};

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  author: string;
  publishedDate: string;
  content: string;
  engagement: number;
  keywords?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  featured?: boolean;
}
