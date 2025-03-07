import { fetchAPI } from '../core/fetch';
import { getStrapiURL } from '../core/config';

/**
 * Obtiene todos los servicios de Strapi
 */
export async function getAllServices() {
  try {
    console.log("Intentando obtener servicios de Strapi...");
    const apiUrl = getStrapiURL('api/services?populate=*');
    const data = await fetchAPI(apiUrl);
    
    console.log(`Obtenidos ${data?.data?.length || 0} servicios de Strapi con sus imágenes`);
    
    if (data && data.data) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error al obtener todos los servicios:", error);
    return [];
  }
}

/**
 * Obtiene un servicio específico por su slug
 */
export async function getServiceBySlug(slug: string) {
  try {
    console.log(`Intentando obtener servicio con slug: ${slug}`);
    
    const apiUrl = getStrapiURL(`api/services?filters[slug][$eq]=${slug}&populate=*`);
    console.log(`URL de la API: ${apiUrl}`);
    
    const data = await fetchAPI(apiUrl);
    console.log("Datos recibidos de Strapi:", JSON.stringify(data?.data, null, 2));
    
    if (data?.data && data.data.length > 0) {
      // Los datos vienen directamente en el primer elemento del array
      const serviceData = data.data[0];
      
      // Construimos el objeto de servicio
      const service = {
        id: serviceData.id,
        Title: serviceData.Title,
        slug: serviceData.slug,
        Description: serviceData.Description,
        Content: serviceData.Content,
        category: serviceData.category,
        features: serviceData.features,
        benefits: serviceData.benefits,
        order: serviceData.order,
        showOnHomepage: serviceData.showOnHomepage,
        homePosition: serviceData.homePosition,
        homeDescription: serviceData.homeDescription,
        isAppHighlight: serviceData.isAppHighlight,
        Image: serviceData.Image ? {
          ...serviceData.Image,
          url: `/uploads/${serviceData.Image.hash}${serviceData.Image.ext}`
        } : null,
        icon: serviceData.icon ? {
          ...serviceData.icon,
          url: `/uploads/${serviceData.icon.hash}${serviceData.icon.ext}`
        } : null,
        homeImage: serviceData.homeImage ? {
          ...serviceData.homeImage,
          url: `/uploads/${serviceData.homeImage.hash}${serviceData.homeImage.ext}`
        } : null
      };
      
      console.log("Servicio procesado:", {
        title: service.Title,
        category: service.category,
        imageUrl: service.Image?.url
      });
      
      return service;
    }
    
    console.log(`No se encontró ningún servicio con slug: ${slug}`);
    return null;
  } catch (error) {
    console.error(`Error al obtener servicio con slug ${slug}:`, error);
    return null;
  }
}

/**
 * Obtiene los servicios destacados
 */
export async function getFeaturedServices() {
  try {
    console.log("Obteniendo servicios destacados para la página principal...");
    const services = await getAllServices();
    return services.filter((service: any) => service.showOnHomepage);
  } catch (error) {
    console.error("Error al obtener servicios destacados:", error);
    return [];
  }
}

/**
 * Obtiene el servicio destacado para la app
 */
export async function getAppHighlightService() {
  try {
    const services = await getAllServices();
    return services.find((service: any) => service.isAppHighlight);
  } catch (error) {
    console.error("Error al obtener servicio destacado para app:", error);
    return null;
  }
} 