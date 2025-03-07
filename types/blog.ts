// Interfaces base
export interface Category {
  id: number;
  slug?: string;
  name?: string;
  attributes?: {
    name: string;
    slug: string;
    description?: string;
  };
}

export interface Author {
  id: number;
  attributes?: {
    name: string;
    position?: string;
    bio?: string;
    photo?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

// Interfaces para queries
export interface PaginationInput {
  page: number;
  pageSize: number;
}

export interface ArticleFilters {
  categories?: {
    id: {
      $eq: number;
    };
  };
  page?: number;
  pageSize?: number;
  sort?: string[];
}

// Para mantener compatibilidad con la API de Strapi
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  featuredImage?: {
    url: string;
    alternativeText?: string;
  };
  author?: Author;
  categories?: Category[];
  // ... otros campos
}

// ... otras interfaces necesarias 