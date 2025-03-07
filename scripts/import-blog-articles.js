#!/usr/bin/env node

/**
 * Script para importar artículos del blog a Strapi
 * 
 * Uso: node scripts/import-blog-articles.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

// URL base de la API de Strapi
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
// Token de API de Strapi
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Ruta al directorio con los datos de los artículos
const CONTENT_DIR = 'data/blog-content';

/**
 * Función para obtener la categoría por nombre o crearla si no existe
 * @param {string} categoryName - Nombre de la categoría
 * @returns {Promise<number>} - ID de la categoría
 */
async function getCategoryByNameOrCreate(categoryName) {
  try {
    // Normalizar el nombre de la categoría
    categoryName = categoryName.trim();
    
    // Generar un slug basado en el nombre
    const slug = categoryName
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    console.log(`Buscando categoría: ${categoryName} (slug: ${slug})`);
    
    // Buscar la categoría por nombre
    const response = await axios.get(`${API_URL}/api/categories?filters[name][$eq]=${encodeURIComponent(categoryName)}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    // Si la categoría existe, devolver su ID
    if (response.data && response.data.data && response.data.data.length > 0) {
      const categoryId = response.data.data[0].id;
      console.log(`✅ Categoría encontrada con ID: ${categoryId}`);
      return categoryId;
    }
    
    // Si la categoría no existe, crearla
    console.log(`Categoría no encontrada. Creando nueva categoría: ${categoryName}`);
    
    const createResponse = await axios.post(`${API_URL}/api/categories`, {
      data: {
        name: categoryName,
        slug: slug,
        description: `Artículos sobre ${categoryName}`
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    const newCategoryId = createResponse.data.data.id;
    console.log(`✅ Nueva categoría creada con ID: ${newCategoryId}`);
    return newCategoryId;
  } catch (error) {
    console.error(`❌ Error al obtener/crear la categoría "${categoryName}":`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Función para obtener el autor por nombre o crearlo si no existe
 * @param {string} authorName - Nombre del autor
 * @returns {Promise<number>} - ID del autor
 */
async function getAuthorByNameOrCreate(authorName) {
  try {
    // Normalizar el nombre del autor
    authorName = authorName.trim();
    
    console.log(`Buscando autor: ${authorName}`);
    
    // Buscar el autor por nombre
    const response = await axios.get(`${API_URL}/api/authors?filters[name][$eq]=${encodeURIComponent(authorName)}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    // Si el autor existe, devolver su ID
    if (response.data && response.data.data && response.data.data.length > 0) {
      const authorId = response.data.data[0].id;
      console.log(`✅ Autor encontrado con ID: ${authorId}`);
      return authorId;
    }
    
    // Si el autor no existe, crearlo
    console.log(`Autor no encontrado. Creando nuevo autor: ${authorName}`);
    
    const createResponse = await axios.post(`${API_URL}/api/authors`, {
      data: {
        name: authorName,
        bio: `Experto en seguridad laboral y prevención de fatiga.`,
        position: `Especialista`
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    const newAuthorId = createResponse.data.data.id;
    console.log(`✅ Nuevo autor creado con ID: ${newAuthorId}`);
    return newAuthorId;
  } catch (error) {
    console.error(`❌ Error al obtener/crear el autor "${authorName}":`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Función para crear un artículo en Strapi
 * @param {Object} articleData - Datos del artículo
 * @returns {Promise<Object>} - Respuesta de la API
 */
async function createArticle(articleData) {
  try {
    console.log(`Creando artículo: ${articleData.title}`);
    
    // Preparar datos del artículo
    const strapiArticleData = {
      title: articleData.title,
      slug: articleData.slug,
      content: articleData.content,
      excerpt: articleData.content.substring(0, 300).replace(/<\/?[^>]+(>|$)/g, "") + "...",
      publishedAt: new Date()
    };
    
    // Agregar fecha de publicación si existe
    if (articleData.date) {
      try {
        // Intentar parsear la fecha
        const dateMatch = articleData.date.match(/(\d+)\s+(\w+),\s+(\d+)/);
        if (dateMatch) {
          const day = parseInt(dateMatch[1], 10);
          const month = dateMatch[2].toLowerCase();
          const year = parseInt(dateMatch[3], 10);
          
          const months = {
            'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
            'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11,
            'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
            'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
          };
          
          if (months[month] !== undefined) {
            const date = new Date(year, months[month], day);
            strapiArticleData.publishedAt = date.toISOString();
          }
        }
      } catch (dateError) {
        console.log(`⚠️ No se pudo parsear la fecha: ${articleData.date}. Usando fecha actual.`);
      }
    }
    
    // Asociar categoría si existe
    if (articleData.category) {
      const categoryId = await getCategoryByNameOrCreate(articleData.category);
      if (categoryId) {
        strapiArticleData.categories = [categoryId];
      }
    }
    
    // Asociar autor si existe
    if (articleData.author) {
      const authorId = await getAuthorByNameOrCreate(articleData.author);
      if (authorId) {
        strapiArticleData.author = authorId;
      }
    }
    
    console.log('Datos preparados para Strapi:', JSON.stringify(strapiArticleData, null, 2));
    
    // Enviar solicitud para crear el artículo
    const response = await axios.post(`${API_URL}/api/articles`, {
      data: strapiArticleData
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    console.log(`✅ Artículo creado con ID: ${response.data.data.id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al crear el artículo "${articleData.title}":`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Función principal para importar artículos
 */
async function importBlogArticles() {
  console.log('Iniciando importación de artículos a Strapi...');
  
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
  
  // Importar cada artículo
  let successCount = 0;
  let errorCount = 0;
  
  for (const articleData of articlesData) {
    try {
      console.log(`\nImportando artículo: ${articleData.title}`);
      await createArticle(articleData);
      successCount++;
    } catch (error) {
      console.error(`❌ Error al importar el artículo: ${articleData.title}`);
      errorCount++;
    }
  }
  
  console.log('\nResumen de importación:');
  console.log(`✅ Artículos importados con éxito: ${successCount}`);
  console.log(`❌ Artículos con errores: ${errorCount}`);
  console.log(`Total: ${articlesData.length}`);
}

// Ejecutar la función principal
importBlogArticles().catch(error => {
  console.error('Error durante la importación de artículos:', error);
  process.exit(1);
}); 