// Re-export core functionality
export * from './core/api.config';
export * from './core/api.client';

// Re-export domain-specific APIs
export * from './home';
// TODO: Uncomment as modules are created
// export * from './services';
// export * from './products';
// export * from './blog';
// export * from './testimonials';
// export * from './case-studies';

// Exportar otras funciones según sea necesario 

export async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  
  return json.data;
} 