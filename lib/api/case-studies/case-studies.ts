import { fetchAPI } from '../core/fetch';
import { getStrapiURL } from '../core/config';

/**
 * Obtiene todos los casos de estudio
 */
export async function getAllCaseStudies() {
  try {
    const apiUrl = getStrapiURL('api/case-studies?populate=*');
    const data = await fetchAPI(apiUrl);
    
    if (data && data.data) {
      return data.data.map((item: any) => item.attributes);
    } else if (data) {
      // Para Strapi v5
      return data;
    }
    
    return [];
  } catch (error) {
    console.error("Error al obtener casos de estudio:", error);
    return [];
  }
} 