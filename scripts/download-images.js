#!/usr/bin/env node

/**
 * Script para descargar imágenes del sitio web de LOGIFIT
 * 
 * Uso: node scripts/download-images.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

// Imágenes del sitio web de LOGIFIT
const serviceImages = [
  {
    name: 'wearable.jpg',
    url: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Reemplazar con URL real cuando esté disponible
    path: 'public/images/services/wearable.jpg',
    description: 'Wearables Inteligentes'
  },
  {
    name: 'camera.jpg',
    url: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Reemplazar con URL real cuando esté disponible
    path: 'public/images/services/camera.jpg',
    description: 'Cámaras Inteligentes DMS/ADAS'
  },
  {
    name: 'dashboard.jpg',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Reemplazar con URL real cuando esté disponible
    path: 'public/images/services/dashboard.jpg',
    description: 'Plataforma Web y App'
  },
  {
    name: 'app.jpg',
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Reemplazar con URL real cuando esté disponible
    path: 'public/images/services/app.jpg',
    description: 'App LOGIFIT'
  },
  {
    name: 'support.jpg',
    url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Reemplazar con URL real cuando esté disponible
    path: 'public/images/services/support.jpg',
    description: 'Servicio Preventivo'
  },
  {
    name: 'consulting.jpg',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Reemplazar con URL real cuando esté disponible
    path: 'public/images/services/consulting.jpg',
    description: 'Servicio REST'
  }
];

// Iconos SVG para los servicios (basados en las categorías del sitio web)
const serviceIcons = [
  {
    name: 'watch-icon.svg',
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>`,
    path: 'public/images/icons/watch-icon.svg',
    category: 'Before Driving'
  },
  {
    name: 'camera-icon.svg',
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>`,
    path: 'public/images/icons/camera-icon.svg',
    category: 'During Drive'
  },
  {
    name: 'dashboard-icon.svg',
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
    path: 'public/images/icons/dashboard-icon.svg',
    category: 'Monitoreo Continuo'
  },
  {
    name: 'app-icon.svg',
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
    path: 'public/images/icons/app-icon.svg',
    category: 'Aplicación Exclusiva'
  },
  {
    name: 'support-icon.svg',
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    path: 'public/images/icons/support-icon.svg',
    category: 'Soporte Profesional'
  },
  {
    name: 'consulting-icon.svg',
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    path: 'public/images/icons/consulting-icon.svg',
    category: 'Atención Especializada'
  }
];

/**
 * Función para descargar una imagen
 * @param {string} url - URL de la imagen
 * @param {string} outputPath - Ruta donde guardar la imagen
 * @returns {Promise<boolean>}
 */
async function downloadImage(url, outputPath) {
  try {
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
 * Función para guardar un archivo SVG
 * @param {string} content - Contenido del SVG
 * @param {string} outputPath - Ruta donde guardar el SVG
 * @returns {Promise<boolean>}
 */
async function saveSvgIcon(content, outputPath) {
  try {
    fs.writeFileSync(outputPath, content);
    console.log(`✅ Icono guardado: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al guardar el icono ${outputPath}:`, error.message);
    return false;
  }
}

/**
 * Función para extraer URLs de imágenes del sitio web de LOGIFIT
 * @returns {Promise<void>}
 */
async function extractImagesFromWebsite() {
  try {
    console.log('Intentando extraer URLs de imágenes del sitio web de LOGIFIT...');
    
    const response = await axios.get('https://logifit.netlify.app/soluciones');
    const html = response.data;
    
    // Buscar URLs de imágenes en el HTML (esto es una aproximación simple)
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const imageUrls = [];
    
    while ((match = imgRegex.exec(html)) !== null) {
      imageUrls.push(match[1]);
    }
    
    console.log(`Encontradas ${imageUrls.length} imágenes en el sitio web.`);
    
    // Actualizar las URLs en serviceImages si se encontraron suficientes imágenes
    if (imageUrls.length >= serviceImages.length) {
      for (let i = 0; i < serviceImages.length; i++) {
        // Solo actualizar si la URL parece ser una imagen (no un icono SVG)
        if (imageUrls[i].match(/\.(jpg|jpeg|png|gif|webp)/i)) {
          serviceImages[i].url = imageUrls[i];
          console.log(`Actualizada URL para ${serviceImages[i].description}: ${imageUrls[i]}`);
        }
      }
    } else {
      console.log('No se encontraron suficientes imágenes en el sitio web. Se usarán las URLs predeterminadas.');
    }
  } catch (error) {
    console.error('Error al extraer imágenes del sitio web:', error.message);
    console.log('Se usarán las URLs de imágenes predeterminadas.');
  }
}

/**
 * Función principal para descargar imágenes
 */
async function downloadImages() {
  console.log('Iniciando descarga de imágenes para servicios...');
  
  // Intentar extraer URLs de imágenes del sitio web
  await extractImagesFromWebsite();
  
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
  
  // Descargar imágenes
  let successCount = 0;
  let errorCount = 0;
  
  console.log('\nDescargando imágenes de servicios...');
  for (const image of serviceImages) {
    try {
      console.log(`Procesando imagen para: ${image.description}`);
      const success = await downloadImage(image.url, image.path);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error al procesar la imagen ${image.name}:`, error.message);
      errorCount++;
    }
  }
  
  // Guardar iconos SVG
  console.log('\nGuardando iconos SVG...');
  for (const icon of serviceIcons) {
    try {
      console.log(`Procesando icono para categoría: ${icon.category}`);
      const success = await saveSvgIcon(icon.content, icon.path);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error al procesar el icono ${icon.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\nResumen de descarga de imágenes:');
  console.log(`✅ Archivos descargados/guardados con éxito: ${successCount}`);
  console.log(`❌ Archivos con errores: ${errorCount}`);
  console.log(`Total: ${serviceImages.length + serviceIcons.length}`);
  
  console.log('\nNota: Si algunas imágenes no se pudieron descargar automáticamente,');
  console.log('puedes descargarlas manualmente del sitio web y guardarlas en las rutas indicadas.');
}

// Ejecutar la función principal
downloadImages().catch(error => {
  console.error('Error durante la descarga de imágenes:', error);
  process.exit(1);
}); 