/**
 * Configuración básica para la API
 */
export const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

export function getStrapiURL(path = '') {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  
  // Asegurarse de que la URL base no esté vacía
  if (!strapiUrl) {
    console.error('NEXT_PUBLIC_STRAPI_API_URL no está definido');
    return 'http://127.0.0.1:1337/' + path;
  }
  
  // Normalizar la URL base para asegurar que termine con /
  const normalizedStrapiUrl = strapiUrl.endsWith('/') ? strapiUrl : `${strapiUrl}/`;
  
  // Normalizar el path para asegurar que no comience con /
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  return `${normalizedStrapiUrl}${normalizedPath}`;
} 