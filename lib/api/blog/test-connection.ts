/**
 * Función de prueba para validar la conexión a Strapi v5.0
 * Esta función es similar a getLatestBlogPosts pero con más logs para depuración
 */
export async function testStrapiConnection() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('[testStrapiConnection] Base URL:', baseUrl);
    
    // Usar la API REST con la estructura de Strapi v5
    const url = `${baseUrl}/api/articles?pagination[limit]=2&sort[0]=publishedAt:desc&populate=*`;
    console.log('[testStrapiConnection] Fetching from URL:', url);
    
    // Realizar la petición directamente
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('[testStrapiConnection] Response status:', response.status);

    if (!response.ok) {
      console.error(`[testStrapiConnection] Error en la respuesta: ${response.status} ${response.statusText}`);
      return null;
    }

    const responseData = await response.json();
    console.log('[testStrapiConnection] Response data structure:', Object.keys(responseData));
    
    // Extraer los artículos de la respuesta
    const articles = responseData.data || [];
    
    if (!articles.length) {
      console.log('[testStrapiConnection] No se encontraron artículos');
      return null;
    }
    
    // Mostrar la estructura del primer artículo
    console.log('[testStrapiConnection] Estructura del primer artículo:', JSON.stringify(articles[0], null, 2));
    
    // Verificar si los datos están en article o article.attributes
    const firstArticle = articles[0];
    const hasAttributes = !!firstArticle.attributes;
    
    console.log('[testStrapiConnection] ¿Los datos están en attributes?', hasAttributes);
    
    if (hasAttributes) {
      console.log('[testStrapiConnection] Estructura de attributes:', JSON.stringify(firstArticle.attributes, null, 2));
    }
    
    // Normalizar los datos según la estructura detectada
    const normalizedArticles = articles.map((article: any) => {
      if (hasAttributes) {
        // Estructura con attributes (típica de Strapi v5)
        const attrs = article.attributes;
        
        // Procesar imagen destacada
        let featuredImage = null;
        if (attrs.featuredImage && attrs.featuredImage.data) {
          featuredImage = {
            url: attrs.featuredImage.data.attributes.url,
            alt: attrs.featuredImage.data.attributes.alternativeText || attrs.title,
          };
        }
        
        // Procesar categorías
        let categories = [];
        if (attrs.categories && attrs.categories.data) {
          categories = attrs.categories.data.map((cat: any) => ({
            id: cat.id,
            name: cat.attributes.name,
            slug: cat.attributes.slug,
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
          publishedAt: attrs.publishedAt || '',
          featuredImage,
          categories,
          author,
        };
      } else {
        // Estructura aplanada (como en la función getLatestBlogPosts)
        let featuredImage = null;
        if (article.featuredImage) {
          featuredImage = {
            url: article.featuredImage.url || '',
            alt: article.featuredImage.alternativeText || '',
          };
        }
        
        const categories = article.categories?.map((cat: any) => ({
          name: cat.name || '',
          slug: cat.slug || '',
        })) || [];
        
        const author = article.author?.name || '';
        
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
      }
    });
    
    console.log('[testStrapiConnection] Artículos normalizados:', normalizedArticles);
    return normalizedArticles;
  } catch (error) {
    console.error('[testStrapiConnection] Error:', error);
    return null;
  }
} 