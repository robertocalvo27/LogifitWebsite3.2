#!/usr/bin/env node

/**
 * Script para importar imágenes a Strapi y asociarlas a los servicios
 * 
 * Uso: node scripts/import-images.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config({ path: '.env.local' });

// URL base de la API de Strapi
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
// Token de API de Strapi
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Mapeo de servicios a imágenes
const serviceImages = [
  {
    slug: 'wearables-inteligentes',
    imagePath: 'public/images/services/wearable.jpg',
    iconPath: 'public/images/icons/watch-icon.svg'
  },
  {
    slug: 'camaras-monitoreo-cabina',
    imagePath: 'public/images/services/camera.jpg',
    iconPath: 'public/images/icons/camera-icon.svg'
  },
  {
    slug: 'dashboard-gestion-fatiga',
    imagePath: 'public/images/services/dashboard.jpg',
    iconPath: 'public/images/icons/dashboard-icon.svg'
  },
  {
    slug: 'aplicacion-movil-operadores',
    imagePath: 'public/images/services/app.jpg',
    iconPath: 'public/images/icons/app-icon.svg'
  },
  {
    slug: 'soporte-tecnico-24-7',
    imagePath: 'public/images/services/support.jpg',
    iconPath: 'public/images/icons/support-icon.svg'
  },
  {
    slug: 'consultoria-gestion-fatiga',
    imagePath: 'public/images/services/consulting.jpg',
    iconPath: 'public/images/icons/consulting-icon.svg'
  }
];

/**
 * Función para subir una imagen a Strapi
 * @param {string} filePath - Ruta del archivo a subir
 * @returns {Promise<number>} - ID del archivo subido
 */
async function uploadFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`El archivo ${filePath} no existe.`);
      return null;
    }
    
    const formData = new FormData();
    formData.append('files', fs.createReadStream(filePath));
    
    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (response.data && response.data.length > 0) {
      return response.data[0].id;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al subir el archivo ${filePath}:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Función para obtener un servicio por su slug
 * @param {string} slug - Slug del servicio
 * @returns {Promise<Object>} - Servicio encontrado
 */
async function getServiceBySlug(slug) {
  try {
    console.log(`Buscando servicio con slug: ${slug}`);
    
    // Primero intentamos buscar por slug exacto
    const response = await axios.get(`${API_URL}/api/services?filters[slug][$eq]=${slug}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (response.data && response.data.data && response.data.data.length > 0) {
      console.log(`✅ Servicio encontrado por slug exacto: ${slug}`);
      
      // Inspeccionar la estructura del servicio
      const service = response.data.data[0];
      console.log('Estructura del servicio:');
      console.log(JSON.stringify(service, null, 2));
      
      return service;
    }
    
    // Si no encontramos por slug exacto, obtenemos todos los servicios y buscamos uno similar
    console.log(`No se encontró servicio con slug exacto: ${slug}. Buscando similares...`);
    const allServicesResponse = await axios.get(`${API_URL}/api/services`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (allServicesResponse.data && allServicesResponse.data.data && allServicesResponse.data.data.length > 0) {
      console.log(`Encontrados ${allServicesResponse.data.data.length} servicios en total.`);
      
      // Mostrar todos los slugs disponibles para depuración
      console.log('Slugs disponibles:');
      allServicesResponse.data.data.forEach(service => {
        const title = service.Title || service.title || 'Sin título';
        const slug = service.slug || 'Sin slug';
        console.log(`- ${slug} (ID: ${service.id}, Título: ${title})`);
      });
      
      // Buscar un servicio con un slug similar
      const similarService = allServicesResponse.data.data.find(service => 
        service.slug.includes(slug) || slug.includes(service.slug)
      );
      
      if (similarService) {
        console.log(`✅ Encontrado servicio similar: ${similarService.slug} (ID: ${similarService.id})`);
        return similarService;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener el servicio con slug ${slug}:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Función para actualizar un servicio con las imágenes
 * @param {number} serviceId - ID del servicio
 * @param {number} imageId - ID de la imagen
 * @param {number} iconId - ID del icono
 * @returns {Promise<Object>} - Respuesta de la API
 */
async function updateServiceWithImages(serviceId, imageId, iconId) {
  try {
    console.log(`Preparando datos para actualizar servicio ID: ${serviceId}`);
    console.log(`Imagen ID: ${imageId}, Icono ID: ${iconId}`);
    
    // Obtener los nombres de campo correctos para las imágenes
    // Primero obtenemos el esquema del modelo Service para ver los campos disponibles
    try {
      const schemaResponse = await axios.get(`${API_URL}/api/content-type-builder/content-types/api::service.service`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      
      console.log('Esquema del modelo Service:');
      console.log(JSON.stringify(schemaResponse.data, null, 2));
    } catch (schemaError) {
      console.log('No se pudo obtener el esquema del modelo Service:', schemaError.message);
    }
    
    // Estructura para la API de Strapi
    const data = {};
    
    if (imageId) {
      // Usar el nombre de campo correcto para la imagen: 'Image' (con I mayúscula)
      data.Image = imageId;
      // Usar la misma imagen para la página principal
      data.homeImage = imageId;
      console.log(`Asignando imagen ID ${imageId} al servicio con campos 'Image' y 'homeImage'`);
    }
    
    if (iconId) {
      // Usar el nombre de campo correcto para el icono: 'icon' (con i minúscula)
      data.icon = iconId;
      console.log(`Asignando icono ID ${iconId} al servicio con campo 'icon'`);
    }
    
    console.log('Datos a enviar:', JSON.stringify(data, null, 2));
    
    const response = await axios.put(`${API_URL}/api/services/${serviceId}`, { data }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    console.log('Respuesta de la API:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el servicio ${serviceId}:`, error.response?.data || error.message);
    if (error.response) {
      console.error('Detalles del error:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

/**
 * Función principal para importar imágenes y asociarlas a servicios
 */
async function importImages() {
  console.log('Iniciando importación de imágenes a Strapi...');
  
  if (!API_TOKEN) {
    console.error('Error: No se ha definido el token de API de Strapi.');
    console.log('Por favor, crea un token en el panel de administración de Strapi y agrégalo a tu archivo .env.local:');
    console.log('STRAPI_API_TOKEN=tu_token_aqui');
    process.exit(1);
  }
  
  // Verificar la conexión a Strapi
  try {
    console.log(`Verificando conexión a Strapi en ${API_URL}...`);
    const response = await axios.get(`${API_URL}/api/services`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    console.log(`✅ Conexión a Strapi establecida. Encontrados ${response.data.data.length} servicios.`);
  } catch (error) {
    console.error('❌ Error al conectar con Strapi:', error.message);
    if (error.response) {
      console.error('Detalles del error:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
  
  // Crear directorios para imágenes si no existen
  const directories = [
    'public/images',
    'public/images/services',
    'public/images/icons'
  ];
  
  for (const dir of directories) {
    if (!fs.existsSync(dir)) {
      console.log(`Creando directorio: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
  // Verificar si las imágenes existen
  console.log('\nVerificando imágenes...');
  for (const serviceImage of serviceImages) {
    const imageExists = fs.existsSync(serviceImage.imagePath);
    const iconExists = fs.existsSync(serviceImage.iconPath);
    
    console.log(`Servicio: ${serviceImage.slug}`);
    console.log(`- Imagen (${serviceImage.imagePath}): ${imageExists ? '✅ Existe' : '❌ No existe'}`);
    console.log(`- Icono (${serviceImage.iconPath}): ${iconExists ? '✅ Existe' : '❌ No existe'}`);
  }
  
  console.log('\n=== SUBIENDO IMÁGENES A STRAPI ===');
  console.log('Sube las imágenes y luego asígnalas manualmente en el panel de administración de Strapi:');
  console.log('http://127.0.0.1:1337/admin/content-manager/collectionType/api::service.service\n');
  
  const uploadedImages = [];
  
  for (const serviceImage of serviceImages) {
    try {
      console.log(`\nProcesando servicio: ${serviceImage.slug}`);
      
      // Obtener el servicio
      const service = await getServiceBySlug(serviceImage.slug);
      if (!service) {
        console.error(`❌ No se encontró el servicio con slug: ${serviceImage.slug}`);
        continue;
      }
      
      // Obtener el título del servicio de manera segura
      const serviceTitle = service.Title || service.title || `Servicio ID: ${service.id}`;
      console.log(`Servicio encontrado: ${serviceTitle} (ID: ${service.id})`);
      
      // Verificar si las imágenes existen
      const imageExists = fs.existsSync(serviceImage.imagePath);
      const iconExists = fs.existsSync(serviceImage.iconPath);
      
      if (!imageExists && !iconExists) {
        console.log(`⚠️ No se encontraron imágenes para el servicio: ${serviceImage.slug}`);
        console.log(`Rutas buscadas:\n- ${serviceImage.imagePath}\n- ${serviceImage.iconPath}`);
        console.log('Puedes agregar estas imágenes manualmente y volver a ejecutar el script.');
        continue;
      }
      
      // Subir imagen principal
      let imageId = null;
      if (imageExists) {
        console.log(`Subiendo imagen: ${serviceImage.imagePath}`);
        imageId = await uploadFile(serviceImage.imagePath);
        if (imageId) {
          console.log(`✅ Imagen subida con éxito (ID: ${imageId})`);
          uploadedImages.push({
            serviceId: service.id,
            serviceTitle: serviceTitle,
            type: 'Imagen principal',
            fileId: imageId,
            filePath: serviceImage.imagePath,
            fieldName: 'Image'
          });
        } else {
          console.error(`❌ Error al subir la imagen: ${serviceImage.imagePath}`);
        }
      }
      
      // Subir icono
      let iconId = null;
      if (iconExists) {
        console.log(`Subiendo icono: ${serviceImage.iconPath}`);
        iconId = await uploadFile(serviceImage.iconPath);
        if (iconId) {
          console.log(`✅ Icono subido con éxito (ID: ${iconId})`);
          uploadedImages.push({
            serviceId: service.id,
            serviceTitle: serviceTitle,
            type: 'Icono',
            fileId: iconId,
            filePath: serviceImage.iconPath,
            fieldName: 'icon'
          });
        } else {
          console.error(`❌ Error al subir el icono: ${serviceImage.iconPath}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error al procesar el servicio: ${serviceImage.slug}`);
      console.error('Detalles del error:', error.message);
    }
  }
  
  // Mostrar resumen de imágenes subidas
  console.log('\n=== RESUMEN DE IMÁGENES SUBIDAS ===');
  console.log('Utiliza esta información para asignar las imágenes manualmente en el panel de administración de Strapi:');
  console.log('http://127.0.0.1:1337/admin/content-manager/collectionType/api::service.service\n');
  
  if (uploadedImages.length === 0) {
    console.log('❌ No se subieron imágenes.');
  } else {
    console.log('| Servicio ID | Servicio | Tipo | Archivo ID | Campo |');
    console.log('|-------------|----------|------|------------|-------|');
    
    for (const image of uploadedImages) {
      console.log(`| ${image.serviceId} | ${image.serviceTitle} | ${image.type} | ${image.fileId} | ${image.fieldName} |`);
    }
    
    console.log('\nPasos para asignar las imágenes manualmente:');
    console.log('1. Accede al panel de administración de Strapi: http://127.0.0.1:1337');
    console.log('2. Ve a "Content Manager" > "Services"');
    console.log('3. Edita cada servicio y asigna las imágenes correspondientes seleccionándolas de la biblioteca de medios');
    console.log('4. Guarda los cambios');
  }
}

// Ejecutar la función principal
importImages().catch(error => {
  console.error('Error durante la importación de imágenes:', error);
  process.exit(1);
}); 