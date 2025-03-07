/**
 * Función básica para realizar peticiones a la API de Strapi
 */
interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function fetchAPI(path: string, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
  }

  const url = `${baseUrl}${path}`;
  console.log('Fetching from URL:', url); // Debug log

  try {
    const res = await fetch(url, mergedOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

/**
 * Función para realizar peticiones GraphQL a Strapi
 */
export async function fetchGraphQL(options: GraphQLRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  const fetchUrl = `${apiUrl}/graphql`;
  
  console.log("Fetching GraphQL from URL:", fetchUrl);

  const mergedOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options)
  };

  try {
    const res = await fetch(fetchUrl, mergedOptions);
    const data = await res.json();

    if (data.errors) {
      console.log("GraphQL Errors:", data.errors);
      throw new Error(`GraphQL Error: ${data.errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.log("GraphQL Fetch Error:", error);
    throw error;
  }
} 