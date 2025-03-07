#!/usr/bin/env node

/**
 * Script para importar imágenes del blog a Strapi y asociarlas a los artículos
 * 
 * Uso: node scripts/import-blog-images.js
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

// Ruta al directorio con los datos de los artículos
const CONTENT_DIR = 'data/blog-content';
const IMAGES_DIR = 'public/images/blog';

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
 * Función para obtener un artículo por su slug
 * @param {string} slug - Slug del artículo
 * @returns {Promise<Object>} - Artículo encontrado
 */
async function getArticleBySlug(slug) {
  try {
    console.log(`Buscando artículo con slug: ${slug}`);
    
    const response = await axios.get(`${API_URL}/api/articles?filters[slug][$eq]=${slug}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (response.data && response.data.data && response.data.data.length > 0) {
      console.log(`✅ Artículo encontrado por slug: ${slug}`);
      return response.data.data[0];
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener el artículo con slug ${slug}:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Función para actualizar un artículo con la imagen destacada
 * @param {number} articleId - ID del artículo
 * @param {number} imageId - ID de la imagen
 * @returns {Promise<Object>} - Respuesta de la API
 */
async function updateArticleWithFeaturedImage(articleId, imageId) {
  try {
    console.log(`Actualizando artículo ID: ${articleId} con imagen destacada ID: ${imageId}`);
    
    // Intentar con el endpoint correcto para Strapi v4
    const response = await axios.put(`${API_URL}/api/articles/${articleId}`, {
      data: {
        featuredImage: imageId
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    console.log('Respuesta de actualización:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el artículo ${articleId}:`, error.response?.data || error.message);
    
    // Si falla, intentar obtener más información sobre la API
    try {
      console.log(`Intentando obtener información sobre el artículo ID: ${articleId}`);
      
      // Verificar si podemos al menos obtener el artículo individual
      const articleResponse = await axios.get(`${API_URL}/api/articles/${articleId}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      
      console.log(`Artículo encontrado mediante ID directo:`, articleResponse.data);
      
      // Si podemos obtener el artículo, intentemos actualizar con la estructura correcta
      console.log(`Intentando actualizar con estructura alternativa...`);
      
      // Intento alternativo con formato diferente
      const altResponse = await axios.put(`${API_URL}/api/articles/${articleId}`, {
        featuredImage: imageId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      
      console.log('Respuesta de actualización alternativa:', altResponse.data);
      return altResponse.data;
    } catch (infoError) {
      console.error(`No se pudo obtener información adicional:`, infoError.message);
    }
    
    // Método manual si todo falla
    console.log('\n=======================');
    console.log('INSTRUCCIONES MANUALES');
    console.log('=======================');
    console.log(`El artículo con ID ${articleId} no pudo ser actualizado automáticamente.`);
    console.log(`Por favor, actualiza manualmente la imagen en el panel de administración de Strapi:`);
    console.log(`1. Ve a: http://127.0.0.1:1337/admin/content-manager/collectionType/api::article.article/${articleId}`);
    console.log(`2. En el campo "Featured Image", selecciona la imagen con ID ${imageId}`);
    console.log(`3. Guarda los cambios`);
    
    throw error;
  }
}

/**
 * Función principal para importar imágenes del blog
 */
async function importBlogImages() {
  console.log('Iniciando importación de imágenes del blog a Strapi...');
  
  if (!API_TOKEN) {
    console.error('Error: No se ha definido el token de API de Strapi.');
    console.log('Por favor, crea un token en el panel de administración de Strapi y agrégalo a tu archivo .env.local:');
    console.log('STRAPI_API_TOKEN=tu_token_aqui');
    process.exit(1);
  }
  
  // Verificar la conexión a Strapi
  try {
    console.log(`Verificando conexión a Strapi en ${API_URL}...`);
    await axios.get(`${API_URL}/api/articles`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    console.log('✅ Conexión a Strapi establecida.');
  } catch (error) {
    console.error('❌ Error al conectar con Strapi:', error.message);
    process.exit(1);
  }
  
  // Verificar si existe el archivo con todos los artículos
  const allArticlesPath = path.join(CONTENT_DIR, 'all-articles.json');
  if (!fs.existsSync(allArticlesPath)) {
    console.error(`❌ No se encontró el archivo: ${allArticlesPath}`);
    console.log('Ejecuta primero: node scripts/download-blog-content.js');
    process.exit(1);
  }
  
  // Cargar datos de los artículos
  const articlesData = JSON.parse(fs.readFileSync(allArticlesPath, 'utf8'));
  console.log(`Cargados ${articlesData.length} artículos desde: ${allArticlesPath}`);
  
  // Importar imágenes para cada artículo
  let successCount = 0;
  let errorCount = 0;
  
  for (const articleData of articlesData) {
    try {
      console.log(`\nProcesando imágenes para artículo: ${articleData.title}`);
      
      // Obtener el artículo de Strapi
      const article = await getArticleBySlug(articleData.slug);
      if (!article) {
        console.error(`❌ No se encontró el artículo con slug: ${articleData.slug}`);
        errorCount++;
        continue;
      }
      
      // Subir imagen destacada
      if (articleData.featuredImageLocal) {
        console.log(`Subiendo imagen destacada: ${articleData.featuredImageLocal}`);
        const featuredImagePath = articleData.featuredImageLocal;
        
        if (fs.existsSync(featuredImagePath)) {
          const imageId = await uploadFile(featuredImagePath);
          if (imageId) {
            console.log(`✅ Imagen destacada subida con ID: ${imageId}`);
            
            // Actualizar el artículo con la imagen destacada
            await updateArticleWithFeaturedImage(article.id, imageId);
            console.log(`✅ Artículo actualizado con la imagen destacada`);
            successCount++;
          } else {
            console.error(`❌ Error al subir la imagen destacada: ${featuredImagePath}`);
            errorCount++;
          }
        } else {
          console.error(`❌ No se encontró la imagen destacada: ${featuredImagePath}`);
          errorCount++;
        }
      } else {
        console.log(`⚠️ No hay imagen destacada para el artículo: ${articleData.title}`);
      }
      
      // Nota: Las imágenes del contenido se gestionan de forma diferente
      // En este caso, el contenido HTML ya tiene las URLs de las imágenes originales
      // Si quisieras reemplazar las URLs por las de las imágenes subidas a Strapi,
      // necesitarías un proceso más complejo de reemplazo en el HTML
    } catch (error) {
      console.error(`❌ Error al procesar imágenes para el artículo: ${articleData.title}`);
      console.error(error.message);
      errorCount++;
    }
  }
  
  console.log('\nResumen de importación de imágenes:');
  console.log(`✅ Artículos actualizados con imágenes: ${successCount}`);
  console.log(`❌ Artículos con errores: ${errorCount}`);
  console.log(`Total: ${articlesData.length}`);
}

// Ejecutar la función principal
importBlogImages().catch(error => {
  console.error('Error durante la importación de imágenes:', error);
  process.exit(1);
}); 