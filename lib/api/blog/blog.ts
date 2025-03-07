export async function getLatestBlogPosts(limit = 3) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    console.log('Base URL:', baseUrl); // Debug log
    
    // Actualizar la query para que coincida con la estructura de Strapi v5
    const query = `
      query {
        articles(
          pagination: { limit: ${limit} }
          sort: ["publishedAt:desc"]
        ) {
          data {
            attributes {
              title
              slug
              excerpt
              publishedAt
              featuredImage {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              categories {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              author {
                data {
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      cache: 'no-store'
    });

    console.log('Response status:', response.status); // Debug log
    const responseData = await response.json();
    console.log('Response data:', JSON.stringify(responseData, null, 2)); // Debug log

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    
    if (!data?.articles?.data) {
      console.warn('No articles found in response');
      return [];
    }

    // Normalizar los datos para el componente
    return data.articles.data.map((article: any) => ({
      id: article.id,
      title: article.attributes.title,
      slug: article.attributes.slug,
      excerpt: article.attributes.excerpt,
      publishedAt: article.attributes.publishedAt,
      featuredImage: article.attributes.featuredImage?.data ? {
        url: article.attributes.featuredImage.data.attributes.url,
        alternativeText: article.attributes.featuredImage.data.attributes.alternativeText
      } : null,
      categories: article.attributes.categories?.data?.map((cat: any) => ({
        name: cat.attributes.name,
        slug: cat.attributes.slug
      })) || [],
      author: article.attributes.author?.data ? {
        name: article.attributes.author.data.attributes.name
      } : null
    }));

  } catch (error) {
    console.error('Error detallado:', error);
    return [];
  }
} 