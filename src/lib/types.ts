
import { OutputData } from '@editorjs/editorjs';

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
  content: OutputData;
  featured: boolean;
  engagement: number;
  status: 'draft' | 'published' | 'scheduled';
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
};
