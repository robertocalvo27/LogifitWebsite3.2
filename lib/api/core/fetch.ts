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
    headers: {
      ...defaultOptions.headers,
      ...(options as any).headers,
    },
  };

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
  }

  // Asegurarse de que la ruta comience con /api/ si no es una ruta de GraphQL
  let fullPath = path;
  if (!path.startsWith('/api/') && !path.includes('/graphql')) {
    fullPath = `/api${path.startsWith('/') ? path : `/${path}`}`;
  }

  const url = `${baseUrl}${fullPath}`;
  console.log('[fetchAPI] Fetching from URL:', url);

  try {
    const res = await fetch(url, mergedOptions);
    
    if (!res.ok) {
      console.error(`[fetchAPI] Error en la respuesta: ${res.status} ${res.statusText}`);
      throw new Error(`Error en la respuesta: ${res.status} ${res.statusText}`);
    }
    
    // Primero obtener el texto para poder logearlo en caso de error
    const text = await res.text();
    
    try {
      const data = JSON.parse(text);
      return data;
    } catch (parseError) {
      console.error('[fetchAPI] Error parsing JSON:', parseError);
      console.error('[fetchAPI] Response text:', text);
      throw new Error('Error parsing JSON response');
    }
  } catch (error) {
    console.error('[fetchAPI] Fetch Error:', error);
    throw error;
  }
}

/**
 * Función para realizar peticiones GraphQL a Strapi
 */
export async function fetchGraphQL(options: GraphQLRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  const fetchUrl = `${apiUrl}/graphql`;
  
  console.log("[fetchGraphQL] Fetching GraphQL from URL:", fetchUrl);

  const mergedOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options)
  };

  try {
    const res = await fetch(fetchUrl, mergedOptions);
    
    if (!res.ok) {
      console.error(`[fetchGraphQL] Error en la respuesta: ${res.status} ${res.statusText}`);
      throw new Error(`Error en la respuesta: ${res.status} ${res.statusText}`);
    }
    
    // Primero obtener el texto para poder logearlo en caso de error
    const text = await res.text();
    
    try {
      const data = JSON.parse(text);
      
      if (data.errors) {
        console.error("[fetchGraphQL] GraphQL Errors:", data.errors);
        throw new Error(`GraphQL Error: ${data.errors[0].message}`);
      }
      
      return data;
    } catch (parseError) {
      console.error('[fetchGraphQL] Error parsing JSON:', parseError);
      console.error('[fetchGraphQL] Response text:', text);
      throw new Error('Error parsing JSON response');
    }
  } catch (error) {
    console.error("[fetchGraphQL] GraphQL Fetch Error:", error);
    throw error;
  }
} 