#!/usr/bin/env node

/**
 * Script para importar servicios a Strapi de forma masiva
 * 
 * Uso: node scripts/import-services.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

// URL base de la API de Strapi
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
// Token de API de Strapi (debes crearlo en el panel de administración)
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Datos de los servicios a importar
const services = [
  {
    Title: "Wearables Inteligentes",
    slug: "wearables-inteligentes",
    Description: "Nuestros dispositivos wearables monitorean constantemente los signos vitales y patrones de sueño para detectar fatiga antes de que se convierta en un riesgo.",
    Content: `<p>Los wearables inteligentes de LOGIFIT representan la primera línea de defensa contra la fatiga en operadores. Estos dispositivos avanzados monitorean constantemente los signos vitales y patrones de sueño para detectar fatiga antes de que se convierta en un riesgo operacional.</p>
    <p>Mediante sensores de última generación, nuestros wearables registran datos críticos como la frecuencia cardíaca, niveles de oxígeno en sangre y patrones de sueño, proporcionando una visión completa del estado de alerta del operador.</p>
    <p>La información recopilada se sincroniza con nuestra plataforma central, permitiendo análisis predictivos y alertas tempranas cuando se detectan signos de fatiga.</p>`,
    category: "Before Driving",
    order: 1,
    features: "Monitoreo de sueño, frecuencia cardíaca y oxígeno en sangre\nBatería de larga duración (hasta 20 días)\nResistentes al agua y condiciones extremas",
    benefits: "Detección temprana de fatiga\nPrevención proactiva de incidentes\nMejora en la calidad del sueño de los operadores\nReducción de riesgos operacionales",
    showOnHomepage: true,
    homePosition: 1,
    homeDescription: "Monitoreo constante de signos vitales y patrones de sueño para detectar fatiga anticipadamente.",
    isAppHighlight: false
  },
  {
    Title: "Cámaras de Monitoreo en Cabina",
    slug: "camaras-monitoreo-cabina",
    Description: "Nuestras cámaras inteligentes detectan signos de fatiga y distracción en tiempo real, alertando al conductor y al centro de monitoreo para prevenir accidentes.",
    Content: `<p>Las cámaras de monitoreo en cabina de LOGIFIT utilizan inteligencia artificial avanzada para detectar signos de fatiga y distracción en tiempo real mientras el operador está al volante.</p>
    <p>El sistema analiza los movimientos oculares, la frecuencia de parpadeo, la posición de la cabeza y las expresiones faciales para identificar señales tempranas de somnolencia o pérdida de atención.</p>
    <p>Cuando se detectan estos signos, el sistema emite alertas inmediatas tanto al conductor como al centro de monitoreo, permitiendo una intervención oportuna antes de que ocurra un incidente.</p>`,
    category: "During Drive",
    order: 2,
    features: "Detección de micro-sueños y distracciones\nAlertas sonoras y visuales en tiempo real\nFuncionamiento en condiciones de baja iluminación\nIntegración con sistema de gestión de flotas",
    benefits: "Prevención inmediata de accidentes\nReducción de incidentes por fatiga\nMejora en hábitos de conducción\nEvidencia objetiva para capacitación",
    showOnHomepage: true,
    homePosition: 2,
    homeDescription: "Detección en tiempo real de microsueños y fatiga con alertas inmediatas para prevenir accidentes.",
    isAppHighlight: false
  },
  {
    Title: "Dashboard de Gestión de Fatiga",
    slug: "dashboard-gestion-fatiga",
    Description: "Nuestra plataforma centralizada permite visualizar en tiempo real el estado de alerta de toda la flota, identificando patrones y tendencias para optimizar la gestión de fatiga.",
    Content: `<p>El Dashboard de Gestión de Fatiga de LOGIFIT es una plataforma centralizada que integra datos de todos nuestros dispositivos para proporcionar una visión completa del estado de fatiga de su flota.</p>
    <p>Los supervisores pueden monitorear en tiempo real el nivel de alerta de cada operador, recibir notificaciones de incidentes y acceder a análisis detallados sobre patrones de fatiga a nivel individual y de flota.</p>
    <p>La plataforma utiliza algoritmos avanzados para identificar tendencias y factores de riesgo, permitiendo implementar medidas preventivas específicas y optimizar la programación de turnos.</p>`,
    category: "Monitoreo Continuo",
    order: 3,
    features: "Monitoreo en tiempo real de toda la flota\nAnálisis predictivo de riesgos\nInformes personalizados y automatizados\nIntegración con sistemas existentes",
    benefits: "Visión completa del estado de la flota\nToma de decisiones basada en datos\nOptimización de turnos y rutas\nReducción de costos operativos",
    showOnHomepage: true,
    homePosition: 3,
    homeDescription: "Centralización de datos de fatiga con métricas en tiempo real para gestión proactiva de riesgos.",
    isAppHighlight: false
  },
  {
    Title: "Aplicación Móvil para Operadores",
    slug: "aplicacion-movil-operadores",
    Description: "Nuestra app exclusiva permite a los operadores realizar auto-evaluaciones de fatiga, recibir recomendaciones personalizadas y gestionar su descanso de manera efectiva.",
    Content: `<p>La Aplicación Móvil para Operadores de LOGIFIT es una herramienta esencial que empodera a los conductores para gestionar su propio nivel de fatiga y alerta.</p>
    <p>A través de la app, los operadores pueden realizar auto-evaluaciones rápidas antes de iniciar su turno, recibir alertas personalizadas basadas en su historial de sueño y acceder a recomendaciones específicas para mejorar su descanso.</p>
    <p>La aplicación también facilita la comunicación directa con supervisores en caso de detectar niveles elevados de fatiga, permitiendo ajustes inmediatos en la programación cuando sea necesario.</p>`,
    category: "Aplicación Exclusiva",
    order: 4,
    features: "Auto-evaluaciones rápidas de fatiga\nRecomendaciones personalizadas de descanso\nSincronización con wearables\nRegistro de horas de conducción y descanso",
    benefits: "Mayor conciencia sobre la fatiga\nMejora en la calidad del descanso\nReducción de estrés laboral\nAumento en la satisfacción del operador",
    showOnHomepage: true,
    homePosition: 4,
    homeDescription: "Aplicación exclusiva diseñada por especialistas en SSOMA para monitoreo y gestión de fatiga.",
    isAppHighlight: true
  },
  {
    Title: "Soporte Técnico 24/7",
    slug: "soporte-tecnico-24-7",
    Description: "Nuestro equipo de especialistas está disponible las 24 horas para resolver cualquier incidencia técnica y garantizar el funcionamiento continuo del sistema.",
    Content: `<p>El Soporte Técnico 24/7 de LOGIFIT garantiza que su sistema de gestión de fatiga funcione sin interrupciones, con especialistas disponibles en todo momento para resolver cualquier incidencia.</p>
    <p>Nuestro equipo técnico monitorea constantemente el rendimiento de todos los componentes del sistema, realizando mantenimiento preventivo y actualizaciones para asegurar su óptimo funcionamiento.</p>
    <p>En caso de incidencias, contamos con protocolos de respuesta rápida que minimizan el tiempo de inactividad y garantizan la continuidad operativa de su flota.</p>`,
    category: "Soporte Profesional",
    order: 5,
    features: "Disponibilidad 24/7/365\nTiempos de respuesta garantizados\nMonitoreo proactivo de sistemas\nActualizaciones automáticas",
    benefits: "Minimización de tiempos de inactividad\nResolución rápida de incidencias\nTransferencia de conocimiento al equipo interno\nPaz mental para la operación",
    showOnHomepage: false,
    homePosition: null,
    homeDescription: "",
    isAppHighlight: false
  },
  {
    Title: "Consultoría en Gestión de Fatiga",
    slug: "consultoria-gestion-fatiga",
    Description: "Nuestros expertos analizan su operación y desarrollan estrategias personalizadas para implementar un programa integral de gestión de fatiga adaptado a sus necesidades específicas.",
    Content: `<p>La Consultoría en Gestión de Fatiga de LOGIFIT ofrece un enfoque integral para desarrollar e implementar programas efectivos de prevención de fatiga adaptados a las necesidades específicas de su operación.</p>
    <p>Nuestros consultores especializados realizan un diagnóstico completo de su operación, identificando factores de riesgo, evaluando prácticas actuales y analizando datos históricos de incidentes relacionados con fatiga.</p>
    <p>Con base en este análisis, desarrollamos estrategias personalizadas que incluyen recomendaciones sobre políticas operativas, programación de turnos, capacitación del personal y selección de tecnologías apropiadas.</p>`,
    category: "Atención Especializada",
    order: 6,
    features: "Diagnóstico completo de la operación\nDesarrollo de políticas y procedimientos\nCapacitación especializada para supervisores\nImplementación y seguimiento de programas",
    benefits: "Estrategias adaptadas a su operación\nCumplimiento de normativas de seguridad\nReducción de costos por incidentes\nMejora en la cultura de seguridad",
    showOnHomepage: false,
    homePosition: null,
    homeDescription: "",
    isAppHighlight: false
  }
];

/**
 * Función para crear un servicio en Strapi
 * @param {Object} service - Datos del servicio a crear
 * @returns {Promise<Object>} - Respuesta de la API
 */
async function createService(service) {
  try {
    const response = await axios.post(`${API_URL}/api/services`, {
      data: service
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error al crear el servicio "${service.Title}":`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Función principal para importar todos los servicios
 */
async function importServices() {
  console.log('Iniciando importación de servicios a Strapi...');
  
  if (!API_TOKEN) {
    console.error('Error: No se ha definido el token de API de Strapi.');
    console.log('Por favor, crea un token en el panel de administración de Strapi y agrégalo a tu archivo .env.local:');
    console.log('STRAPI_API_TOKEN=tu_token_aqui');
    process.exit(1);
  }
  
  // Verificar si el token es válido
  try {
    const testResponse = await axios.get(`${API_URL}/api/services`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    console.log('✅ Token de API válido. Continuando con la importación...');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('❌ Error: El token de API no es válido o no tiene los permisos necesarios.');
      console.log('\nPor favor, verifica que:');
      console.log('1. El token sea correcto y esté vigente');
      console.log('2. El token tenga permisos de escritura para el modelo Service');
      console.log('3. El servidor de Strapi esté en ejecución en http://127.0.0.1:1337');
      console.log('\nPuedes crear un nuevo token en:');
      console.log('http://127.0.0.1:1337/admin/settings/api-tokens');
      process.exit(1);
    } else {
      console.error('❌ Error al verificar el token:', error.message);
    }
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const service of services) {
    try {
      console.log(`Importando servicio: ${service.Title}`);
      const result = await createService(service);
      console.log(`✅ Servicio creado con éxito: ${service.Title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error al importar servicio: ${service.Title}`);
      errorCount++;
    }
  }
  
  console.log('\nResumen de importación:');
  console.log(`✅ Servicios creados con éxito: ${successCount}`);
  console.log(`❌ Servicios con errores: ${errorCount}`);
  console.log(`Total: ${services.length}`);
}

// Ejecutar la función principal
importServices().catch(error => {
  console.error('Error durante la importación:', error);
  process.exit(1);
}); 