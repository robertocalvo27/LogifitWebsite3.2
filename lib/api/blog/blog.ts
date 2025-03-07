export async function getLatestBlogPosts(limit = 3) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('Base URL:', baseUrl); // Debug log
    
    // Usar la API REST en lugar de GraphQL
    const url = `${baseUrl}/api/articles?pagination[limit]=${limit}&sort[0]=publishedAt:desc&populate=featuredImage,categories,author`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('Response status:', response.status); // Debug log

    if (!response.ok) {
      console.error(`Error en la respuesta: ${response.status} ${response.statusText}`);
      return getDummyBlogPosts();
    }

    const responseData = await response.json();
    console.log('Response data:', JSON.stringify(responseData, null, 2));
    
    // Extraer los artículos de la respuesta
    const articles = responseData.data || [];
    
    if (!articles.length) {
      console.log('No se encontraron artículos, usando datos de ejemplo');
      return getDummyBlogPosts();
    }
    
    // Normalizar los datos para el componente
    const normalizedArticles = articles.map((article: any) => {
      const featuredImage = article.attributes?.featuredImage?.data 
        ? {
            url: article.attributes.featuredImage.data.attributes.url || '',
            alt: article.attributes.featuredImage.data.attributes.alternativeText || '',
          } 
        : null;
      
      console.log('Imagen del artículo:', featuredImage);
      
      return {
        id: article.id || '',
        title: article.attributes?.title || '',
        slug: article.attributes?.slug || '',
        excerpt: article.attributes?.excerpt || '',
        publishedAt: article.attributes?.publishedAt || '',
        featuredImage,
        categories: article.attributes?.categories?.data?.map((cat: any) => ({
          name: cat.attributes.name || '',
          slug: cat.attributes.slug || '',
        })) || [],
        author: article.attributes?.author?.data?.attributes?.name || '',
      };
    });
    
    console.log('Artículos normalizados:', normalizedArticles);
    return normalizedArticles;
  } catch (error) {
    console.error('Error obteniendo últimos artículos del blog:', error);
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