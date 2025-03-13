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
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('[getAllArticles] Base URL:', baseUrl);
    
    // Usar la API REST con la estructura de Strapi v5
    const url = `${baseUrl}/api/articles?sort[0]=publishedAt:desc&populate=*`;
    console.log('[getAllArticles] Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('[getAllArticles] Response status:', response.status);

    if (!response.ok) {
      console.error(`[getAllArticles] Error en la respuesta: ${response.status} ${response.statusText}`);
      return [];
    }

    const responseData = await response.json();
    console.log('[getAllArticles] Response data structure:', Object.keys(responseData));
    
    // Extraer los artículos de la respuesta
    const articles = responseData.data || [];
    
    if (!articles.length) {
      console.log('[getAllArticles] No se encontraron artículos');
      return [];
    }
    
    // Mostrar la estructura del primer artículo para depuración
    if (articles.length > 0) {
      console.log('[getAllArticles] Estructura del primer artículo:', JSON.stringify(articles[0], null, 2).substring(0, 500) + '...');
    }
    
    // Normalizar los datos para el componente (formato Strapi v5)
    const normalizedArticles = articles.map((article: any) => {
      if (!article || !article.id) {
        console.log('[getAllArticles] Artículo sin ID:', article);
        return null;
      }
      
      // Si el artículo no tiene attributes, intentar usar los datos directamente
      if (!article.attributes) {
        return {
          id: article.id,
          title: article.title || '',
          slug: article.slug || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          publishedAt: article.publishedAt || '',
          featuredImage: article.featuredImage ? {
            url: article.featuredImage.url || '',
            alternativeText: article.featuredImage.alternativeText || '',
          } : null,
          categories: article.categories?.map((cat: any) => ({
            id: cat.id,
            name: cat.name || '',
            slug: cat.slug || '',
          })) || [],
          author: article.author ? {
            name: typeof article.author === 'string' ? article.author : article.author.name || '',
          } : null,
        };
      }
      
      const attrs = article.attributes;
      
      // Procesar imagen destacada
      let featuredImage = null;
      if (attrs.featuredImage && attrs.featuredImage.data) {
        featuredImage = {
          url: attrs.featuredImage.data.attributes.url,
          alternativeText: attrs.featuredImage.data.attributes.alternativeText || attrs.title,
        };
      }
      
      // Procesar categorías
      let categories = [];
      if (attrs.categories && attrs.categories.data) {
        categories = attrs.categories.data.map((cat: any) => ({
          id: cat.id,
          name: cat.attributes.name,
          slug: cat.attributes.slug,
          description: cat.attributes.description || '',
        }));
      }
      
      // Procesar autor
      let author = null;
      if (attrs.author && attrs.author.data) {
        author = {
          name: attrs.author.data.attributes.name,
          position: attrs.author.data.attributes.position || '',
        };
      } else if (typeof attrs.author === 'string') {
        author = {
          name: attrs.author,
          position: '',
        };
      }
      
      return {
        id: article.id,
        title: attrs.title || '',
        slug: attrs.slug || '',
        excerpt: attrs.excerpt || '',
        content: attrs.content || '',
        publishedAt: attrs.publishedAt || '',
        featuredImage,
        categories,
        author,
      };
    }).filter(Boolean); // Eliminar elementos nulos
    
    console.log('[getAllArticles] Normalized articles count:', normalizedArticles.length);
    console.log('[getAllArticles] Primer artículo normalizado:', normalizedArticles.length > 0 ? JSON.stringify(normalizedArticles[0], null, 2).substring(0, 200) + '...' : 'No hay artículos');
    
    return normalizedArticles;
  } catch (error) {
    console.error("[getAllArticles] Error fetching articles:", error);
    return [];
  }
}

// Obtener un artículo por su slug
export async function getArticleBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('[getArticleBySlug] Base URL:', baseUrl);
    
    // Usar la API REST con la estructura de Strapi v5
    const url = `${baseUrl}/api/articles?filters[slug][$eq]=${slug}&populate=deep`;
    console.log('[getArticleBySlug] Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('[getArticleBySlug] Response status:', response.status);

    if (!response.ok) {
      console.error(`[getArticleBySlug] Error en la respuesta: ${response.status} ${response.statusText}`);
      return null;
    }

    const responseData = await response.json();
    console.log('[getArticleBySlug] Response data structure:', Object.keys(responseData));
    
    // Extraer el artículo de la respuesta
    const articles = responseData.data || [];
    
    if (!articles.length) {
      console.log('[getArticleBySlug] No se encontró el artículo con slug:', slug);
      return null;
    }
    
    const article = articles[0];
    
    // Verificar la estructura del artículo
    console.log('[getArticleBySlug] Article structure:', Object.keys(article));
    
    // Verificar si tenemos attributes o si los datos están directamente en el artículo
    const articleData = article.attributes || article;
    
    console.log('[getArticleBySlug] Article data structure:', Object.keys(articleData));
    
    // Log para depuración de la imagen destacada
    console.log('[getArticleBySlug] Featured image data:', articleData.featuredImage);
    
    // Log para depuración de los webinars
    console.log('[getArticleBySlug] Webinars data:', articleData.webinars);
    
    // Log para depuración de los recursos
    console.log('[getArticleBySlug] Resources data:', articleData.resources);
    
    // Log para depuración de los reels
    console.log('[getArticleBySlug] Reels data:', articleData.reels);
    
    // Log para depuración de los artículos relacionados
    console.log('[getArticleBySlug] Related articles data:', articleData.related_articles);
    
    // Log para depuración del CTA
    console.log('[getArticleBySlug] CTA data:', articleData.cta);
    
    // Normalizar los datos para el componente (formato Strapi v5)
    return {
      id: article.id,
      title: articleData.title,
      slug: articleData.slug,
      excerpt: articleData.excerpt,
      content: articleData.content,
      publishedAt: articleData.publishedAt,
      updatedAt: articleData.updatedAt,
      // Imagen destacada - mantener la estructura completa para que StrapiImage pueda manejarla
      featuredImage: articleData.featuredImage,
      // Categorías
      categories: articleData.categories?.data?.map((cat: any) => ({
        id: cat.id,
        name: cat.attributes.name,
        slug: cat.attributes.slug,
      })) || [],
      // Autor
      author: articleData.author?.data ? {
        name: articleData.author.data.attributes.name,
        position: articleData.author.data.attributes.position || '',
        bio: articleData.author.data.attributes.bio || '',
      } : null,
      // Webinars - mantener la estructura completa para que StrapiImage pueda manejarla
      webinars: articleData.webinars?.data?.map((webinar: any) => ({
        Title: webinar.attributes.Title,
        Description: webinar.attributes.Description,
        VideoURL: webinar.attributes.VideoURL,
        Date: webinar.attributes.Date,
        Duration: webinar.attributes.Duration,
        Presenter: webinar.attributes.Presenter,
        FeaturedImage: webinar.attributes.FeaturedImage,
      })) || [],
      // Recursos - mantener la estructura completa para que StrapiImage pueda manejarla
      resources: articleData.resources?.data?.map((resource: any) => ({
        Title: resource.attributes.Title,
        Description: resource.attributes.Description,
        Type: resource.attributes.Type,
        URL: resource.attributes.URL,
        File: resource.attributes.File?.data ? {
          url: resource.attributes.File.data.attributes.url,
          name: resource.attributes.File.data.attributes.name,
        } : null,
        FeaturedImage: resource.attributes.FeaturedImage,
        Date: resource.attributes.Date,
      })) || [],
      // Reels - mantener la estructura completa para que StrapiImage pueda manejarla
      reels: articleData.reels?.data?.map((reel: any) => ({
        Title: reel.attributes.Title,
        Description: reel.attributes.Description,
        Duration: reel.attributes.Duration,
        VideoURL: reel.attributes.VideoURL,
        ThumbnailURL: reel.attributes.ThumbnailURL,
        PublishedDate: reel.attributes.PublishedDate,
      })) || [],
      // Artículos relacionados - mantener la estructura completa para que StrapiImage pueda manejarla
      related_articles: articleData.related_articles?.data?.map((relatedArticle: any) => ({
        title: relatedArticle.attributes.title,
        slug: relatedArticle.attributes.slug,
        excerpt: relatedArticle.attributes.excerpt,
        featuredImage: relatedArticle.attributes.featuredImage,
        publishedAt: relatedArticle.attributes.publishedAt,
      })) || [],
      // CTA
      cta: articleData.cta?.data ? {
        title: articleData.cta.data.attributes.title,
        description: articleData.cta.data.attributes.description,
        buttonText: articleData.cta.data.attributes.buttonText,
        buttonUrl: articleData.cta.data.attributes.buttonUrl,
        backgroundColor: articleData.cta.data.attributes.backgroundColor,
      } : null,
      // Video snippets para incrustar en el contenido
      videoSnippets: articleData.videoSnippets?.data?.map((snippet: any) => ({
        id: snippet.id,
        title: snippet.attributes.title,
        url: snippet.attributes.url,
        duration: snippet.attributes.duration,
      })) || [],
      // Video reel para la vista previa
      videoReel: articleData.videoReel?.data ? {
        thumbnail: articleData.videoReel.data.attributes.thumbnail,
      } : null,
    };
  } catch (error) {
    console.error('[getArticleBySlug] Error fetching article:', error);
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
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('[getAllCategories] Base URL:', baseUrl);
    
    // Usar la API REST con la estructura de Strapi v5
    const url = `${baseUrl}/api/categories?populate=articles`;
    console.log('[getAllCategories] Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('[getAllCategories] Response status:', response.status);

    if (!response.ok) {
      console.error(`[getAllCategories] Error en la respuesta: ${response.status} ${response.statusText}`);
      return [];
    }

    const responseData = await response.json();
    console.log('[getAllCategories] Response data structure:', Object.keys(responseData));
    
    // Extraer las categorías de la respuesta
    const categories = responseData.data || [];
    
    if (!categories.length) {
      console.log('[getAllCategories] No se encontraron categorías');
      return [];
    }
    
    // Mostrar la estructura de la primera categoría para depuración
    if (categories.length > 0) {
      console.log('[getAllCategories] Estructura de la primera categoría:', JSON.stringify(categories[0], null, 2).substring(0, 500) + '...');
    }
    
    // Normalizar los datos para el componente (formato Strapi v5)
    const normalizedCategories = categories.map((category: any) => {
      // Verificar si la categoría tiene la estructura esperada
      if (!category || !category.id) {
        console.log('[getAllCategories] Categoría sin ID:', category);
        return null;
      }
      
      // Si la categoría no tiene attributes, intentar usar los datos directamente
      if (!category.attributes) {
        return {
          id: category.id,
          name: category.name || '',
          slug: category.slug || '',
          description: category.description || '',
          articles: category.articles?.map((article: any) => ({
            id: article.id,
            title: article.title || '',
            slug: article.slug || '',
          })) || [],
        };
      }
      
      const attrs = category.attributes;
      
      // Procesar artículos relacionados
      let articles = [];
      if (attrs.articles && attrs.articles.data) {
        articles = attrs.articles.data.map((article: any) => {
          if (!article || !article.id) return null;
          
          const articleAttrs = article.attributes || {};
          
          return {
            id: article.id,
            title: articleAttrs.title || '',
            slug: articleAttrs.slug || '',
          };
        }).filter(Boolean); // Eliminar elementos nulos
      }
      
      return {
        id: category.id,
        name: attrs.name || '',
        slug: attrs.slug || '',
        description: attrs.description || '',
        articles,
      };
    }).filter(Boolean); // Eliminar elementos nulos
    
    console.log('[getAllCategories] Normalized categories count:', normalizedCategories.length);
    console.log('[getAllCategories] Primera categoría normalizada:', normalizedCategories.length > 0 ? JSON.stringify(normalizedCategories[0], null, 2).substring(0, 200) + '...' : 'No hay categorías');
    
    return normalizedCategories;
  } catch (error) {
    console.error("[getAllCategories] Error fetching categories:", error);
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

// Función de prueba para obtener la estructura exacta de los artículos
export async function testArticleStructure() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('[testArticleStructure] Base URL:', baseUrl);
    
    // Usar la API REST con la estructura de Strapi v5
    const url = `${baseUrl}/api/articles?pagination[limit]=1&populate=*`;
    console.log('[testArticleStructure] Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('[testArticleStructure] Response status:', response.status);

    if (!response.ok) {
      console.error(`[testArticleStructure] Error en la respuesta: ${response.status} ${response.statusText}`);
      return null;
    }

    const responseData = await response.json();
    console.log('[testArticleStructure] Response data structure:', Object.keys(responseData));
    
    // Extraer el artículo de la respuesta
    const articles = responseData.data || [];
    
    if (!articles.length) {
      console.log('[testArticleStructure] No se encontraron artículos');
      return null;
    }
    
    const article = articles[0];
    
    // Mostrar la estructura completa del artículo
    console.log('[testArticleStructure] Estructura completa del artículo:', JSON.stringify(article, null, 2));
    
    // Mostrar la estructura de attributes
    console.log('[testArticleStructure] Estructura de attributes:', JSON.stringify(article.attributes, null, 2));
    
    // Verificar la estructura de featuredImage
    if (article.attributes.featuredImage) {
      console.log('[testArticleStructure] Estructura de featuredImage:', JSON.stringify(article.attributes.featuredImage, null, 2));
    }
    
    // Verificar la estructura de categories
    if (article.attributes.categories) {
      console.log('[testArticleStructure] Estructura de categories:', JSON.stringify(article.attributes.categories, null, 2));
    }
    
    // Verificar la estructura de author
    if (article.attributes.author) {
      console.log('[testArticleStructure] Estructura de author:', JSON.stringify(article.attributes.author, null, 2));
    }
    
    return article;
  } catch (error) {
    console.error("[testArticleStructure] Error:", error);
    return null;
  }
} 