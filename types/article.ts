import { Author, Category } from './blog';

interface CTA {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundColor: string;
}

export interface Article {
  id: number;
  attributes?: {
    title: string;
    slug: string;
    content: string;
    publishedAt: string;
    author?: Author;
    categories?: {
      data: Category[];
    };
    excerpt: string;
    featuredImage?: {
      id: number;
      url: string;
      alternativeText: string;
      width: number;
      height: number;
    };
    related_articles?: Article[];
    cta?: CTA;
    // ... otros campos necesarios
  };
} 