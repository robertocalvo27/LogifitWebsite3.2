import { fetchAPI } from '../core/fetch';
import { getStrapiURL } from '../core/config';

/**
 * Obtiene todos los testimonios
 */
export async function getAllTestimonials() {
  try {
    const apiUrl = getStrapiURL('api/testimonials?populate=*');
    const data = await fetchAPI(apiUrl);
    
    if (data && data.data) {
      return data.data.map((item: any) => item.attributes);
    } else if (data) {
      // Para Strapi v5
      return data;
    }
    
    return [];
  } catch (error) {
    console.error("Error al obtener testimonios:", error);
    return [];
  }
} 