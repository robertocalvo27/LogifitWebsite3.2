#!/usr/bin/env node

/**
 * Script para ejecutar todo el proceso de importación de artículos de blog
 * 
 * Uso: node scripts/import-blog-all.js
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Función para ejecutar un comando y mostrar su salida
 * @param {string} command - Comando a ejecutar
 * @param {string} description - Descripción del comando
 */
function runCommand(command, description) {
  console.log(`\n🚀 ${description}...\n`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`\n✅ ${description} completado con éxito.\n`);
    return true;
  } catch (error) {
    console.error(`\n❌ Error al ${description.toLowerCase()}:`, error.message);
    return false;
  }
}

/**
 * Función principal para ejecutar todo el proceso de importación
 */
async function importBlogAll() {
  console.log('='.repeat(80));
  console.log('🔄 PROCESO DE IMPORTACIÓN DE ARTÍCULOS DE BLOG A STRAPI');
  console.log('='.repeat(80));
  
  console.log('\nEste script ejecutará los siguientes pasos:');
  console.log('1. Descargar contenido e imágenes de los artículos del blog');
  console.log('2. Importar artículos a Strapi');
  console.log('3. Importar imágenes a Strapi y asociarlas a los artículos');
  
  rl.question('\n¿Deseas continuar? (s/n): ', (answer) => {
    if (answer.toLowerCase() !== 's' && answer.toLowerCase() !== 'si') {
      console.log('\nProceso cancelado.');
      rl.close();
      return;
    }
    
    console.log('\n🔄 Iniciando proceso de importación...\n');
    
    // Paso 1: Descargar contenido del blog
    const step1Success = runCommand('node scripts/download-blog-content.js', 'Descarga de contenido del blog');
    if (!step1Success) {
      console.error('\n⚠️ Error en el paso 1. ¿Deseas continuar con el resto del proceso? (s/n): ');
      rl.question('', (answer) => {
        if (answer.toLowerCase() !== 's' && answer.toLowerCase() !== 'si') {
          console.log('\nProceso cancelado.');
          rl.close();
          return;
        }
        continueWithStep2();
      });
    } else {
      continueWithStep2();
    }
    
    function continueWithStep2() {
      // Paso 2: Importar artículos
      const step2Success = runCommand('node scripts/import-blog-articles.js', 'Importación de artículos');
      if (!step2Success) {
        console.error('\n⚠️ Error en el paso 2. ¿Deseas continuar con el resto del proceso? (s/n): ');
        rl.question('', (answer) => {
          if (answer.toLowerCase() !== 's' && answer.toLowerCase() !== 'si') {
            console.log('\nProceso cancelado.');
            rl.close();
            return;
          }
          continueWithStep3();
        });
      } else {
        continueWithStep3();
      }
    }
    
    function continueWithStep3() {
      // Paso 3: Importar imágenes
      const step3Success = runCommand('node scripts/import-blog-images.js', 'Importación de imágenes');
      
      console.log('\n='.repeat(80));
      if (step3Success) {
        console.log('✅ PROCESO DE IMPORTACIÓN COMPLETADO CON ÉXITO');
      } else {
        console.log('⚠️ PROCESO DE IMPORTACIÓN COMPLETADO CON ERRORES');
      }
      console.log('='.repeat(80));
      
      console.log('\nPuedes verificar los resultados en:');
      console.log('- Panel de administración de Strapi: http://127.0.0.1:1337/admin');
      console.log('- Frontend de Next.js: http://localhost:3000/blog');
      
      rl.close();
    }
  });
}

// Ejecutar la función principal
importBlogAll().catch(error => {
  console.error('Error durante el proceso de importación:', error);
  rl.close();
  process.exit(1);
}); 