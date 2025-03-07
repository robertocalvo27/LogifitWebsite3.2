import { fetchAPI } from '../core/fetch';
import { getStrapiURL } from '../core/config';

/**
 * Obtiene los datos de la página principal
 */
export async function getHomePage() {
  try {
    console.log("Obteniendo datos de la página principal...");
    // Corregir la URL para Strapi v5
    const apiUrl = getStrapiURL('api/homepage');
    console.log("URL para obtener datos de la página principal:", apiUrl);
    
    const data = await fetchAPI(apiUrl);
    
    if (data && data.data) {
      console.log("Datos de la página principal obtenidos correctamente");
      return data.data;
    }
    
    console.log("No se encontraron datos para la página principal");
    return null;
  } catch (error) {
    console.error("Error al obtener datos de la página principal:", error);
    return null;
  }
} 