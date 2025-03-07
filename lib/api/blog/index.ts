import { fetchAPI } from '../core/fetch';
import { ArticleFilters, Category } from '@/types/blog';

// Interfaces
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  name?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: any;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: any;
}

export interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
  }
}

export interface StrapiAuthor {
  data?: {
    id: number;
    attributes: {
      name: string;
      bio?: string;
      position?: string;
      photo?: StrapiImage;
    }
  } | null;
}

export interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content?: string;
    excerpt?: string;
    publishedAt?: string;
    updatedAt?: string;
    categories?: { data: StrapiCategory[] };
    author?: StrapiAuthor;
    featuredImage?: StrapiImage;
    cta?: {
      title: string;
      description: string;
      buttonText: string;
      buttonUrl: string;
      backgroundColor: string;
    };
    [key: string]: any;
  }
}

// Funciones de normalización
function normalizeCategory(category: StrapiCategory) {
  return {
    id: category.id,
    name: category.attributes.name,
    slug: category.attributes.slug,
    description: category.attributes.description
  };
}

function normalizeAuthor(author: any) {
  if (!author) return null;
  return {
    id: author.id,
    name: author.attributes?.name || '',
    bio: author.attributes?.bio || '',
    position: author.attributes?.position || '',
    photo: author.attributes?.photo?.data?.attributes?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${author.attributes.photo.data.attributes.url}`
      : null
  };
}

export function normalizeArticleData(article: any) {
  console.log('Normalizando artículo:', article);
  
  const normalizedArticle = {
    id: article.id,
    documentId: article.documentId,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    publishedAt: article.publishedAt,
    featuredImage: article.featuredImage ? {
      ...article.featuredImage,
      url: article.featuredImage.url // Mantener la URL tal como viene de Strapi
    } : null,
    categories: article.categories || [],
    author: article.author
  };

  console.log('Artículo normalizado:', normalizedArticle);
  return normalizedArticle;
}

// Obtener todos los artículos
export async function getAllArticles() {
  try {
    const response = await fetchAPI('', {
      query: `
        query {
          articles {
            title
            slug
            excerpt
            content
            featuredImage {
              url
              alternativeText
            }
            categories {
              name
              slug
              description
            }
            author {
              name
              position
            }
            publishedAt
          }
        }
      `
    });
    
    return response.data?.articles || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

// Obtener un artículo por su slug
export async function getArticleBySlug(slug: string) {
  try {
    const response = await fetchAPI('', {
      query: `
        query GetArticleBySlug($slug: String!) {
          articles(filters: { slug: { eq: $slug } }) {
            title
            slug
            excerpt
            content
            publishedAt
            featuredImage {
              url
              alternativeText
            }
            author {
              name
              position
              bio
            }
            categories {
              name
              slug
            }
            webinars {
              Title
              Description
              VideoURL
              Date
              Duration
              Presenter
              FeaturedImage {
                url
                alternativeText
              }
            }
            resources {
              Title
              Description
              Type
              URL
              File {
                url
                name
              }
              FeaturedImage {
                url
                alternativeText
              }
              Date
            }
            reels {
              Title
              Description
              Duration
              VideoURL
              ThumbnailURL {
                url
                alternativeText
              }
              PublishedDate
            }
            related_articles {
              title
              slug
              excerpt
              featuredImage {
                url
                alternativeText
              }
              publishedAt
            }
            cta {
              title
              description
              buttonText
              buttonUrl
              backgroundColor
            }
          }
        }
      `,
      variables: {
        slug: slug
      }
    });

    const article = response.data?.articles?.[0];
    if (!article) return null;

    return {
      ...article,
      webinars: article.webinars || [],
      resources: article.resources || [],
      reels: article.reels || [],
      related_articles: article.related_articles || [],
      cta: article.cta
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Obtener artículos relacionados
export async function getRelatedArticles(currentId: number, categoryIds: number[] = [], limit = 3) {
  try {
    // Construir parámetros para artículos relacionados
    const params = new URLSearchParams({
      'pagination[limit]': limit.toString(),
      'sort': 'publishedAt:desc',
      'populate': 'featuredImage,categories,author',
      'filters[id][$ne]': currentId.toString() // Excluir el artículo actual
    });

    // Añadir filtro de categorías si se proporcionan
    if (categoryIds.length > 0) {
      params.append('filters[categories][id][$in]', categoryIds.join(','));
    }

    const data = await fetchAPI(`/api/articles?${params.toString()}`);
    return data.data.map(normalizeArticleData);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

// Obtener todas las categorías
export async function getAllCategories() {
  try {
    const response = await fetchAPI('', {
      query: `
        query {
          categories {
            name
            slug
            description
            articles {
              title
              slug
            }
          }
        }
      `
    });
    
    return response.data?.categories || [];
  } catch (error) {
    console.error("Error obteniendo categorías:", error);
    return [];
  }
}

// Buscar artículos
export async function searchArticles(query: string, page = 1, pageSize = 10) {
  try {
    const params = new URLSearchParams({
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
      'sort': 'publishedAt:desc',
      'populate': 'featuredImage,categories,author',
      '_q': query // Búsqueda global en Strapi
    });

    const data = await fetchAPI(`/api/articles?${params.toString()}`);
    
    return {
      articles: data.data.map(normalizeArticleData),
      pagination: data.meta.pagination
    };
  } catch (error) {
    console.error('Error searching articles:', error);
    return { articles: [], pagination: { page, pageSize, pageCount: 0, total: 0 } };
  }
}

// Para el parámetro 'c'
function getCategorySlug(c: Category): string {
  return c.slug || c.attributes?.slug || '';
}

/**
 * Obtiene los últimos artículos del blog para mostrar en la página principal
 * @param limit Número de artículos a obtener
 */
export async function getLatestBlogPosts(limit = 3) {
  try {
    // Importar la función actualizada de blog.ts
    const { getLatestBlogPosts: fetchLatestBlogPosts } = require('./blog');
    return await fetchLatestBlogPosts(limit);
  } catch (error) {
    console.error('Error obteniendo últimos artículos del blog:', error);
    return [];
  }
} 