

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
  imageId?: string;
  author: string;
  publishedDate: string;
  content: string;
  engagement: number;
}
