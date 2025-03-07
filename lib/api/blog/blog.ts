export async function getLatestBlogPosts(limit = 3) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('[getLatestBlogPosts] Base URL:', baseUrl);
    
    // Usar la API REST con la estructura de Strapi v5
    // La ruta correcta debe incluir /api/ para acceder a la API de Strapi
    const url = `${baseUrl}/api/articles?pagination[limit]=${limit}&sort[0]=publishedAt:desc&populate=*`;
    console.log('[getLatestBlogPosts] Fetching from URL:', url);
    
    // Realizar la petición directamente sin usar fetchAPI
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('[getLatestBlogPosts] Response status:', response.status);

    if (!response.ok) {
      console.error(`[getLatestBlogPosts] Error en la respuesta: ${response.status} ${response.statusText}`);
      return getDummyBlogPosts();
    }

    const responseText = await response.text();
    console.log('[getLatestBlogPosts] Response text (primeros 500 caracteres):', responseText.substring(0, 500));
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('[getLatestBlogPosts] Response data structure:', Object.keys(responseData));
      
      if (responseData.data) {
        console.log('[getLatestBlogPosts] Data array length:', Array.isArray(responseData.data) ? responseData.data.length : 'Not an array');
        if (Array.isArray(responseData.data) && responseData.data.length > 0) {
          console.log('[getLatestBlogPosts] First item keys:', Object.keys(responseData.data[0]));
        }
      }
    } catch (parseError) {
      console.error('[getLatestBlogPosts] Error parsing JSON response:', parseError);
      return getDummyBlogPosts();
    }
    
    // Extraer los artículos de la respuesta
    const articles = responseData.data || [];
    
    if (!articles.length) {
      console.log('[getLatestBlogPosts] No se encontraron artículos, usando datos de ejemplo');
      return getDummyBlogPosts();
    }
    
    // Normalizar los datos para el componente (formato Strapi v5)
    const normalizedArticles = articles.map((article: any) => {
      // En Strapi v5, los datos están aplanados (no anidados en attributes)
      console.log(`[getLatestBlogPosts] Article ${article.id} title:`, article.title);
      
      // Extraer la imagen destacada
      let featuredImage = null;
      if (article.featuredImage) {
        featuredImage = {
          url: article.featuredImage.url || '',
          alt: article.featuredImage.alternativeText || '',
        };
        console.log(`[getLatestBlogPosts] Article ${article.id} featuredImage:`, featuredImage);
      }
      
      // Extraer categorías
      const categories = article.categories?.map((cat: any) => ({
        name: cat.name || '',
        slug: cat.slug || '',
      })) || [];
      
      console.log(`[getLatestBlogPosts] Article ${article.id} categories:`, categories);
      
      // Extraer autor
      const author = article.author?.name || '';
      console.log(`[getLatestBlogPosts] Article ${article.id} author:`, author);
      
      return {
        id: article.id || '',
        title: article.title || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        publishedAt: article.publishedAt || '',
        featuredImage,
        categories,
        author,
      };
    });
    
    console.log('[getLatestBlogPosts] Normalized articles:', normalizedArticles);
    return normalizedArticles;
  } catch (error) {
    console.error('[getLatestBlogPosts] Error obteniendo últimos artículos del blog:', error);
    return getDummyBlogPosts();
  }
}

// Función para generar datos de ejemplo cuando no se pueden obtener artículos reales
function getDummyBlogPosts() {
  return [
    {
      id: 1,
      title: "Cómo la fatiga afecta la seguridad en operaciones mineras",
      slug: "fatiga-seguridad-operaciones-mineras",
      excerpt: "Descubre cómo la fatiga impacta en la seguridad de las operaciones mineras y qué medidas preventivas implementar.",
      publishedAt: "2025-02-15T10:00:00.000Z",
      featuredImage: null, // No usar imágenes para evitar problemas de rutas
      categories: [
        {
          name: "Seguridad Industrial",
          slug: "seguridad-industrial"
        }
      ],
      author: {
        name: "Carlos Rodríguez"
      }
    },
    {
      id: 2,
      title: "5 tecnologías que están revolucionando la gestión de fatiga",
      slug: "tecnologias-revolucionando-gestion-fatiga",
      excerpt: "Analizamos las 5 tecnologías más innovadoras que están transformando la forma en que las empresas gestionan la fatiga laboral.",
      publishedAt: "2025-01-28T14:30:00.000Z",
      featuredImage: null, // No usar imágenes para evitar problemas de rutas
      categories: [
        {
          name: "Tecnología",
          slug: "tecnologia"
        }
      ],
      author: {
        name: "Ana Martínez"
      }
    },
    {
      id: 3,
      title: "Normativa internacional sobre gestión de fatiga en transporte",
      slug: "normativa-internacional-gestion-fatiga-transporte",
      excerpt: "Guía completa sobre las regulaciones internacionales que rigen la gestión de fatiga en el sector transporte.",
      publishedAt: "2025-01-10T09:15:00.000Z",
      featuredImage: null, // No usar imágenes para evitar problemas de rutas
      categories: [
        {
          name: "Normativa",
          slug: "normativa"
        }
      ],
      author: {
        name: "Roberto Méndez"
      }
    }
  ];
} 