/**
 * API utilities para interactuar con Strapi CMS
 */

import qs from 'qs';

// URL base de la API de Strapi
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Interfaces para tipado de datos
 */
interface StrapiImage {
  data?: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
    }
  } | null;
}

interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
  }
}

interface StrapiAuthor {
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

interface StrapiArticle {
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
    [key: string]: any; // Para propiedades adicionales
  }
}

/**
 * Función helper para realizar peticiones a la API de Strapi
 * @param endpoint - Endpoint de la API a consultar
 * @param options - Opciones adicionales para la petición fetch
 * @returns Los datos de la respuesta
 */
async function fetchAPI(endpoint: string, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    console.log('=== fetchAPI ===');
    console.log('Endpoint:', endpoint);
    console.log('URL completa:', `${API_URL}${endpoint}`);
    
    // Agregar un timeout para evitar que la petición se quede colgada
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout
    
    console.log('Iniciando fetch...');
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...mergedOptions,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    console.log('Respuesta recibida. Status:', response.status);
    
    if (!response.ok) {
      console.error(`Error en fetchAPI: ${response.status} ${response.statusText}`);
      throw new Error(`Error fetching from Strapi: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Datos parseados correctamente');
    return data;
  } catch (error: any) {
    console.error('Error en fetchAPI:', error);
    if (error.name === 'AbortError') {
      console.error('La petición excedió el tiempo límite');
    } else if (error.message && error.message.includes('fetch failed')) {
      console.error('Error de conexión. Strapi URL:', API_URL);
    }
    throw error;
  }
}

/**
 * Obtiene todos los posts del blog con paginación
 * @param page - Número de página
 * @param pageSize - Tamaño de página
 * @returns Lista de posts
 */
export async function getAllPosts(page = 1, pageSize = 10) {
  const data = await fetchAPI(
    `/api/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc&populate=*`
  );
  
  return data?.data || [];
}

/**
 * Obtiene un post específico por su slug
 * @param slug - El slug del post a obtener
 * @returns El post encontrado o null si no existe
 */
export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(`/api/articles?filters[slug][$eq]=${slug}&populate=*`);
  
  return data?.data?.length > 0 ? data.data[0] : null;
}

/**
 * Obtiene todos los servicios desde Strapi
 */
export async function getAllServices() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('Intentando conectar a:', apiUrl);
    
    // Usar populate=* para obtener todas las relaciones
    const res = await fetch(`${apiUrl}/api/services?sort[0]=order&populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      next: { revalidate: 60 }
    });

    console.log('Estado de la respuesta:', res.status, res.statusText);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error de respuesta:', errorText);
      throw new Error(`Failed to fetch services: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    // Imprimir un ejemplo completo de un servicio para ver su estructura
    if (data.data && data.data.length > 0) {
      console.log('Ejemplo de estructura completa de un servicio:', 
                 JSON.stringify(data.data[0], null, 2));
    }
    
    if (!data.data) {
      console.error('La respuesta no contiene data.data:', data);
      return [];
    }
    
    if (!Array.isArray(data.data)) {
      console.error('data.data no es un array:', data.data);
      return [];
    }
    
    console.log(`Obtenidos ${data.data.length} servicios de Strapi`);
    return data.data;
  } catch (error) {
    console.error('Error detallado al obtener servicios:', error);
    return [];
  }
}

/**
 * Obtiene un servicio específico por su slug
 */
export async function getServiceBySlug(slug: string) {
  try {
    console.log('=== getServiceBySlug ===');
    console.log('Buscando servicio con slug:', slug);
    
    const response = await fetchAPI(`/api/services?filters[slug][$eq]=${slug}&populate=*`);
    console.log('Respuesta de Strapi:', response);

    if (!response?.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.log('No se encontró el servicio');
      return null;
    }

    // Los datos vienen directamente en data[0], no en attributes
    const serviceData = response.data[0];
    console.log('Service data:', serviceData);

    const normalizedService = {
      id: serviceData.id,
      Title: serviceData.Title || '',
      Description: serviceData.Description || '',
      slug: serviceData.slug || '',
      category: serviceData.category || '',
      features: serviceData.features || '',
      benefits: serviceData.benefits || '',
      Content: serviceData.Content || '',
      Image: serviceData.Image || null
    };

    console.log('Servicio normalizado:', normalizedService);
    return normalizedService;
  } catch (error) {
    console.error('Error en getServiceBySlug:', error);
    return null;
  }
}

/**
 * Obtiene todos los testimonios
 * @returns Lista de testimonios
 */
export async function getAllTestimonials() {
  const data = await fetchAPI('/api/testimonials?populate=*');
  
  return data?.data || [];
}

/**
 * Obtiene todos los casos de éxito
 * @returns Lista de casos de éxito
 */
export async function getAllCaseStudies() {
  const data = await fetchAPI('/api/case-studies?populate=*');
  
  return data?.data || [];
}

/**
 * Obtiene un caso de éxito específico por su slug
 * @param slug - El slug del caso de éxito a obtener
 * @returns El caso de éxito encontrado o null si no existe
 */
export async function getCaseStudyBySlug(slug: string) {
  const data = await fetchAPI(`/api/case-studies?filters[slug][$eq]=${slug}&populate=*`);
  
  return data?.data?.length > 0 ? data.data[0] : null;
}

/**
 * Obtiene los datos de la página de inicio
 * @returns Datos de la página de inicio
 */
export async function getHomePage() {
  const data = await fetchAPI('/api/home?populate=deep');
  
  return data?.data?.attributes || null;
}

/**
 * Obtiene los datos de la página Acerca de
 * @returns Datos de la página Acerca de
 */
export async function getAboutPage() {
  const data = await fetchAPI('/api/about?populate=deep');
  
  return data?.data?.attributes || null;
}

/**
 * Obtiene los datos de la página de contacto
 * @returns Datos de la página de contacto
 */
export async function getContactPage() {
  const data = await fetchAPI('/api/contact?populate=deep');
  
  return data?.data?.attributes || null;
}

/**
 * Obtiene los servicios destacados para la página principal
 * @returns Lista de servicios destacados
 */
export async function getFeaturedServices() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    
    const query = `
      query {
        services(
          filters: { showOnHomepage: { eq: true } }
          sort: ["homePosition:asc"]
        ) {
          Title
          slug
          Description
          homeDescription
          homePosition
          category
          features
          benefits
          homeImage {
            url
            formats
            alternativeText
          }
          icon {
            url
          }
        }
      }
    `;

    const res = await fetch(`${apiUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      body: JSON.stringify({ query })
    });

    const { data } = await res.json();
    return data.services;
  } catch (error) {
    console.error('[DEBUG-SERVICIOS] Error:', error);
    return [];
  }
}

export async function getAppHighlightService() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    const res = await fetch(
      `${apiUrl}/api/services?filters[isAppHighlight][$eq]=true&populate=*`, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch app highlight service');
    }

    const data = await res.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching app highlight service:', error);
    return null;
  }
}

/**
 * Normaliza los datos de un artículo desde el formato de Strapi v5
 */
export function normalizeArticleData(article: StrapiArticle | any): any {
  try {
    // Verificar si tenemos datos válidos
    if (!article) return null;
    
    // Para Strapi v5, los datos pueden venir directamente o en formato {data: {}}
    const articleData = article.attributes || article;
    
    // Extraer categorías
    const categories: Array<{id: number, name: string, slug: string}> = [];
    if (articleData.categories && articleData.categories.data) {
      articleData.categories.data.forEach((cat: StrapiCategory) => {
        if (cat.attributes) {
          categories.push({
            id: cat.id,
            name: cat.attributes.name,
            slug: cat.attributes.slug,
          });
        }
      });
    }
    
    // Extraer autor
    let author = null;
    if (articleData.author && articleData.author.data) {
      const authorData = articleData.author.data.attributes;
      if (authorData) {
        author = {
          id: articleData.author.data.id,
          name: authorData.name,
          bio: authorData.bio,
          position: authorData.position,
          photo: authorData.photo?.data?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${authorData.photo.data.attributes.url}`
            : null
        };
      }
    }
    
    // URL de imagen destacada
    let featuredImage = null;
    if (articleData.featuredImage && articleData.featuredImage.data) {
      const imageData = articleData.featuredImage.data.attributes;
      if (imageData && imageData.url) {
        featuredImage = {
          data: {
            id: articleData.featuredImage.data.id,
            attributes: {
              url: imageData.url,
              alternativeText: articleData.title || '',
            }
          }
        };
      }
    }
    
    return {
      id: article.id || article.documentId,
      title: articleData.title,
      slug: articleData.slug,
      content: articleData.content,
      excerpt: articleData.excerpt,
      publishedAt: articleData.publishedAt,
      updatedAt: articleData.updatedAt,
      categories,
      author,
      featuredImage
    };
  } catch (error) {
    console.error("Error normalizing article data:", error);
    return {
      id: article.id || article.documentId || 'unknown',
      title: article.title || 'Error al cargar artículo',
      slug: article.slug || 'error',
      content: null,
      excerpt: null,
      publishedAt: null,
      categories: [],
      author: null,
      featuredImage: null
    };
  }
}

/**
 * Obtiene todos los artículos con paginación y filtros opcionales
 */
export async function getAllArticles(params = {}) {
  const defaultParams = {
    populate: '*',
    sort: ['publishedAt:desc'],
  };

  const mergedParams = {
    ...defaultParams,
    ...params,
  };

  const queryString = qs.stringify(mergedParams);
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?${queryString}`;

  try {
    const res = await fetch(apiUrl, { next: { revalidate: 10 } });
    
    if (!res.ok) {
      throw new Error(`Error fetching articles: ${res.status}`);
    }

    const response = await res.json();
    console.log("API response:", response);
    
    // Formato simplificado y a prueba de fallos
    return {
      articles: response.data.map((item: any) => ({
        id: item.id,
        title: item.attributes.title || 'Sin título',
        slug: item.attributes.slug || '',
        content: item.attributes.content || '',
        publishedAt: item.attributes.publishedAt || new Date().toISOString(),
        imageUrl: item.attributes.featuredImage?.data?.attributes?.url 
          ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.attributes.featuredImage.data.attributes.url}`
          : null
      })),
      meta: response.meta
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { 
      articles: [], 
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } 
    };
  }
}

/**
 * Obtiene un artículo específico por su slug
 */
export async function getArticleBySlug(slug: string) {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log(`Buscando artículo con slug "${slug}" en ${strapiUrl}`);
    
    const url = `${strapiUrl}/api/articles?filters[slug][$eq]=${slug}&populate=*`;
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error(`Error buscando artículo: ${res.status} ${res.statusText}`);
      return null;
    }
    
    const data = await res.json();
    
    // Verificar si hay datos
    if (!data || !data.data || data.data.length === 0) {
      console.log(`No se encontró artículo con slug "${slug}"`);
      return null;
    }
    
    // Normalizar y retornar el primer resultado
    return normalizeArticleData(data.data[0]);
  } catch (error) {
    console.error(`Error obteniendo artículo con slug "${slug}":`, error);
    return null;
  }
}

/**
 * Obtiene todas las categorías
 */
export async function getAllCategories() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    
    const url = `${strapiUrl}/api/categories?sort=name&populate=*`;
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error(`Error obteniendo categorías: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data = await res.json();
    
    if (!data || !data.data) {
      return [];
    }
    
    // Normalizar las categorías
    return data.data.map((category: any) => ({
      id: category.id,
      name: category.attributes?.name || '',
      slug: category.attributes?.slug || '',
      description: category.attributes?.description || ''
    }));
  } catch (error) {
    console.error("Error obteniendo categorías:", error);
    return [];
  }
} 