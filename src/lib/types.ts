
export type Stat = {
  label: string;
  value: number;
  growth: number;
};

export interface Article {
  // Core Fields
  slug: string;
  title: string;
  content: string;
  excerpt: string; // from 'description' in frontmatter
  
  // Metadata
  author: string;
  publisher?: string;
  category: string;
  tags?: string[];
  
  // Dates
  publishedDate: string; // from 'date' in frontmatter
  modifiedDate?: string; // from 'modified_date' in frontmatter
  
  // Media
  image: string;
  image_alt: string;
  image_width: number;
  image_height: number;
  image_hint: string;
  
  // SEO & Technical
  status?: 'published' | 'draft';
  language?: string;
  canonicalUrl?: string;
  
  // Display & Engagement
  read_time?: string;
  featured?: boolean;
  engagement: number; // Placeholder for analytics
}
