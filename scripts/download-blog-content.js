#!/usr/bin/env node

/**
 * Script para descargar contenido de artículos del blog de LOGIFIT
 * 
 * Uso: node scripts/download-blog-content.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

// URLs de los artículos a descargar
const blogArticles = [
  {
    url: 'https://logifit.netlify.app/blog/avances-tecnologia-dms',
    slug: 'avances-tecnologia-dms'
  },
  {
    url: 'https://logifit.netlify.app/blog/higiene-sueno-operadores',
    slug: 'higiene-sueno-operadores'
  },
  {
    url: 'https://logifit.netlify.app/blog/fatiga-turnos-rotativos',
    slug: 'fatiga-turnos-rotativos'
  }
];

// Directorios para guardar el contenido
const CONTENT_DIR = 'data/blog-content';
const IMAGES_DIR = 'public/images/blog';

/**
 * Función para crear directorios si no existen
 */
function ensureDirectoriesExist() {
  const directories = [CONTENT_DIR, IMAGES_DIR];
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Directorio creado: ${dir}`);
    }
  });
}

/**
 * Función para descargar una imagen
 * @param {string} url - URL de la imagen
 * @param {string} outputPath - Ruta donde guardar la imagen
 * @returns {Promise<boolean>}
 */
async function downloadImage(url, outputPath) {
  try {
    // Si la URL es relativa, convertirla a absoluta
    if (url.startsWith('/')) {
      url = `https://logifit.netlify.app${url}`;
    } else if (!url.startsWith('http')) {
      url = `https://logifit.netlify.app/${url}`;
    }

    console.log(`Descargando imagen desde: ${url}`);
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });
    
    await pipeline(response.data, fs.createWriteStream(outputPath));
    console.log(`✅ Imagen descargada: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al descargar la imagen ${url}:`, error.message);
    return false;
  }
}

/**
 * Función para extraer contenido de un artículo
 * @param {string} url - URL del artículo
 * @param {string} slug - Slug del artículo
 * @returns {Promise<Object>} - Datos del artículo
 */
async function extractArticleContent(url, slug) {
  try {
    console.log(`Extrayendo contenido de: ${url}`);
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    
    // Extraer título
    const title = $('h1').first().text().trim();
    console.log(`Título: ${title}`);
    
    // Extraer fecha
    const dateText = $('time').text().trim() || $('.date').text().trim() || $('article .date').text().trim();
    console.log(`Fecha: ${dateText}`);
    
    // Extraer autor
    const author = $('article .author').text().trim() || $('article .byline').text().trim() || $('.author').text().trim();
    console.log(`Autor: ${author}`);
    
    // Extraer categoría
    const category = $('article .category').text().trim() || $('.category').text().trim();
    console.log(`Categoría: ${category}`);
    
    // Extraer imagen destacada
    let featuredImageUrl = '';
    const featuredImg = $('article img').first() || $('.featured-image img').first() || $('main img').first();
    if (featuredImg && featuredImg.attr('src')) {
      featuredImageUrl = featuredImg.attr('src');
      console.log(`Imagen destacada: ${featuredImageUrl}`);
    }
    
    // Extraer contenido principal
    // Seleccionar el contenido principal del artículo (ajustar según la estructura del sitio)
    const contentSection = $('article') || $('main');
    
    // Eliminar elementos no deseados
    contentSection.find('nav, header, footer, .related-articles, .cta, .newsletter').remove();
    
    // Obtener el HTML del contenido principal
    let content = '';
    
    // Buscar elementos de contenido (párrafos, headings, listas, etc.)
    contentSection.find('p, h2, h3, h4, h5, h6, ul, ol, blockquote').each(function() {
      // Ignorar elementos de navegación, cabecera, pie de página, etc.
      const parentClasses = $(this).parent().attr('class') || '';
      if (parentClasses.includes('header') || parentClasses.includes('footer') || 
          parentClasses.includes('nav') || parentClasses.includes('sidebar')) {
        return;
      }
      
      // Añadir el HTML del elemento al contenido
      content += $.html(this);
    });
    
    console.log(`Contenido extraído: ${content.length} caracteres`);
    
    // Buscar todas las imágenes en el contenido
    const images = [];
    contentSection.find('img').each(function() {
      const imgSrc = $(this).attr('src');
      if (imgSrc && !images.includes(imgSrc)) {
        images.push(imgSrc);
      }
    });
    
    console.log(`Imágenes encontradas: ${images.length}`);
    
    // Crear un objeto con los datos del artículo
    const articleData = {
      title,
      slug,
      date: dateText,
      author,
      category,
      featuredImage: featuredImageUrl,
      content,
      images
    };
    
    return articleData;
  } catch (error) {
    console.error(`❌ Error al extraer contenido de ${url}:`, error.message);
    throw error;
  }
}

/**
 * Función principal para descargar el contenido de los artículos
 */
async function downloadBlogContent() {
  console.log('Iniciando descarga de contenido del blog...');
  
  // Asegurarse de que existan los directorios necesarios
  ensureDirectoriesExist();
  
  const articlesData = [];
  
  for (const article of blogArticles) {
    try {
      console.log(`\nProcesando artículo: ${article.slug}`);
      
      // Extraer contenido del artículo
      const articleData = await extractArticleContent(article.url, article.slug);
      
      // Crear directorio para las imágenes del artículo
      const articleImagesDir = path.join(IMAGES_DIR, article.slug);
      if (!fs.existsSync(articleImagesDir)) {
        fs.mkdirSync(articleImagesDir, { recursive: true });
      }
      
      // Descargar imagen destacada
      if (articleData.featuredImage) {
        const featuredImagePath = path.join(articleImagesDir, 'featured.jpg');
        await downloadImage(articleData.featuredImage, featuredImagePath);
        articleData.featuredImageLocal = featuredImagePath;
      }
      
      // Descargar imágenes del contenido
      const downloadedImages = [];
      for (let i = 0; i < articleData.images.length; i++) {
        const imgUrl = articleData.images[i];
        const imgFilename = `image-${i + 1}.jpg`;
        const imgPath = path.join(articleImagesDir, imgFilename);
        
        const success = await downloadImage(imgUrl, imgPath);
        if (success) {
          downloadedImages.push({
            url: imgUrl,
            localPath: imgPath,
            filename: imgFilename
          });
        }
      }
      
      articleData.downloadedImages = downloadedImages;
      
      // Guardar datos del artículo en un archivo JSON
      const articleJsonPath = path.join(CONTENT_DIR, `${article.slug}.json`);
      fs.writeFileSync(articleJsonPath, JSON.stringify(articleData, null, 2));
      console.log(`✅ Datos del artículo guardados en: ${articleJsonPath}`);
      
      articlesData.push(articleData);
    } catch (error) {
      console.error(`❌ Error al procesar el artículo ${article.slug}:`, error.message);
    }
  }
  
  // Guardar un archivo JSON con todos los artículos
  const allArticlesPath = path.join(CONTENT_DIR, 'all-articles.json');
  fs.writeFileSync(allArticlesPath, JSON.stringify(articlesData, null, 2));
  console.log(`\n✅ Todos los datos guardados en: ${allArticlesPath}`);
  
  console.log('\nResumen de descarga:');
  console.log(`✅ Artículos procesados: ${articlesData.length}`);
  console.log(`❌ Artículos con errores: ${blogArticles.length - articlesData.length}`);
}

// Ejecutar la función principal
downloadBlogContent().catch(error => {
  console.error('Error durante la descarga de contenido:', error);
  process.exit(1);
}); 