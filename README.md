# LOGIFIT Web 3.0

## Descripción

LOGIFIT Web 3.0 es una plataforma web moderna para la empresa LOGIFIT, especializada en soluciones integrales para la prevención y gestión de fatiga laboral. La plataforma combina tecnología de vanguardia con servicios preventivos especializados, enfocados en proteger la vida de trabajadores en entornos de alto riesgo, reduciendo accidentes causados por fatiga y somnolencia.

## Características Principales

- **Diseño Responsivo**: Interfaz adaptable a dispositivos móviles, tablets y escritorio
- **Arquitectura Moderna**: Construido con Next.js 13 y App Router
- **CMS Headless**: Integración con Strapi v5.0 como backend para gestión de contenidos
- **UI Componentes**: Implementación de Shadcn UI y Tailwind CSS
- **Optimización SEO**: Estructura optimizada para motores de búsqueda
- **Rendimiento**: Carga rápida y experiencia de usuario fluida
- **Sistema de Héroes Dinámicos**: Gestión avanzada de héroes con programación temporal
- **Blog Completo**: Sistema de blog con categorías, búsqueda y artículos relacionados
- **Casos de Éxito**: Sección para mostrar casos de éxito con clientes reales

## Tecnologías Utilizadas

- **Frontend**:
  - Next.js 13.5.1
  - React 18.2.0
  - TypeScript 5.2.2
  - Tailwind CSS 3.3.3
  - Shadcn UI (basado en Radix UI)
  - Lucide React (iconos)

- **Backend CMS**:
  - Strapi v5.0 (Headless CMS)
  - GraphQL API
  - REST API

- **Herramientas de Desarrollo**:
  - ESLint
  - PostCSS
  - TypeScript
  - Scripts personalizados para importación/exportación de datos

## Estructura del Proyecto

logifit-web3.0/
├── app/                  # Directorio principal de la aplicación
│   ├── admin/           # Panel de administración interno
│   ├── api/             # API routes para operaciones del servidor
│   ├── aviso-legal/     # Página de aviso legal
│   ├── blog/            # Sección de blog
│   │   ├── [slug]/      # Página de artículo individual
│   │   ├── buscar/      # Búsqueda de artículos
│   │   └── categoria/   # Filtrado por categorías
│   ├── case-studies/    # Casos de estudio (inglés)
│   ├── casos-exito/     # Casos de éxito (español)
│   ├── contact/         # Página de contacto (inglés)
│   ├── contacto/        # Página de contacto (español)
│   ├── cookies/         # Política de cookies
│   ├── demo/            # Solicitud de demo
│   ├── home/            # Página de inicio alternativa
│   ├── industrias/      # Información por industrias
│   ├── nosotros/        # Acerca de la empresa
│   ├── politicas-privacidad/ # Políticas de privacidad
│   ├── soluciones/      # Soluciones y productos
│   │   └── [slug]/      # Página dinámica de categoría
│   │       └── productos/
│   │           └── [productSlug]/ # Página dinámica de producto
│   ├── soluciones-v3/   # Versión alternativa de soluciones
│   ├── terminos-uso/    # Términos de uso
│   ├── test-strapi/     # Pruebas de integración con Strapi
│   ├── trabaja-con-nosotros/ # Oportunidades laborales
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal
│   ├── not-found.tsx    # Página 404
│   ├── page.tsx         # Página principal
│   ├── robots.ts        # Configuración de robots.txt
│   └── sitemap.ts       # Generación de sitemap
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de UI (Shadcn)
│   │   ├── accordion.tsx # Componente de acordeón
│   │   └── ... (otros componentes UI)
│   ├── blog/           # Componentes específicos del blog
│   │   ├── ArticleContent.tsx # Renderizado de contenido de artículos
│   │   ├── ResourceCard.tsx   # Tarjeta para recursos relacionados
│   │   └── WebinarEmbed.tsx   # Embebido de webinars
│   ├── hero/           # Sistema de héroes dinámicos
│   │   ├── adapters.ts      # Adaptadores para diferentes formatos de datos
│   │   ├── hero-carousel.tsx # Carrusel de héroes
│   │   ├── hero-parallax.tsx # Efecto parallax para héroes
│   │   ├── hero-rollover.tsx # Efecto rollover para héroes
│   │   ├── hero.tsx         # Componente principal de héroes
│   │   └── types.ts         # Tipos para los componentes de héroes
│   ├── layout/         # Componentes de layout
│   │   └── header.tsx  # Componente de cabecera alternativo
│   ├── products/       # Componentes de productos
│   │   └── ProductCard.tsx # Tarjeta de producto/categoría
│   ├── ApiDataDebugger.tsx # Herramienta de depuración de API
│   ├── ArticleSchema.tsx   # Schema estructurado para artículos
│   ├── BreadcrumbSchema.tsx # Schema estructurado para migas de pan
│   ├── DebugImage.tsx      # Herramienta de depuración de imágenes
│   ├── footer.tsx          # Pie de página global
│   ├── GoogleAnalytics.tsx # Integración con Google Analytics
│   ├── header.tsx          # Cabecera global
│   ├── Newsletter.tsx      # Formulario de suscripción a newsletter
│   ├── RelatedArticles.js  # Componente de artículos relacionados
│   ├── SearchBar.tsx       # Barra de búsqueda
│   ├── Seo.tsx             # Componente para metadatos SEO
│   ├── ShareButtons.tsx    # Botones para compartir en redes sociales
│   └── theme-provider.tsx  # Proveedor de temas
├── lib/                # Utilidades y funciones
│   ├── api/           # Funciones de API
│   │   ├── blog/      # API específica para el blog
│   │   │   ├── blog.ts # Funciones para artículos del blog
│   │   │   └── index.ts # Exportaciones del blog
│   │   ├── case-studies/ # API para casos de estudio
│   │   │   └── case-studies.ts # Funciones para casos de estudio
│   │   ├── core/      # Funciones base para API
│   │   │   ├── config.ts # Configuración de la API
│   │   │   └── fetch.ts # Funciones para realizar peticiones
│   │   ├── home/      # API para la página principal
│   │   │   ├── hero.ts # Funciones para héroes
│   │   │   └── home.ts # Funciones para la página principal
│   │   ├── products/  # API para productos
│   │   │   └── products.ts # Funciones para productos
│   │   ├── services/  # API para servicios
│   │   │   └── services.ts # Funciones para servicios
│   │   ├── testimonials/ # API para testimonios
│   │   │   └── testimonials.ts # Funciones para testimonios
│   │   ├── home.ts    # API para la página principal
│   │   └── index.ts   # Exportaciones principales
│   ├── types/        # Tipos TypeScript para la API
│   │   └── strapi.ts # Tipos para Strapi
│   ├── api.ts        # Funciones generales de API
│   └── utils.ts      # Utilidades generales
├── public/            # Archivos estáticos
│   ├── images/       # Imágenes estáticas
│   │   ├── blog/     # Imágenes para artículos del blog
│   │   ├── icons/    # Iconos SVG
│   │   │   ├── app-icon.svg       # Icono de aplicación
│   │   │   ├── camera-icon.svg    # Icono de cámara
│   │   │   ├── consulting-icon.svg # Icono de consultoría
│   │   │   ├── dashboard-icon.svg # Icono de dashboard
│   │   │   ├── support-icon.svg   # Icono de soporte
│   │   │   └── watch-icon.svg     # Icono de reloj
│   │   ├── products/ # Imágenes de productos
│   │   ├── services/ # Imágenes de servicios
│   │   └── .DS_Store # Archivo de sistema macOS
│   └── .DS_Store     # Archivo de sistema macOS
├── scripts/           # Scripts de utilidad
│   ├── download-blog-content.js # Descarga contenido de blog
│   ├── download-images.js       # Descarga imágenes
│   ├── import-all.js            # Ejecuta todos los scripts de importación
│   ├── import-blog-all.js       # Ejecuta scripts de importación de blog
│   ├── import-blog-articles.js  # Importa artículos de blog a Strapi
│   ├── import-blog-images.js    # Importa imágenes de blog a Strapi
│   ├── import-images.js         # Importa imágenes a Strapi
│   ├── import-products.ts       # Importa productos a Strapi
│   └── import-services.js       # Importa servicios a Strapi
└── types/             # Tipos TypeScript globales
    ├── article.ts    # Tipos para artículos
    ├── blog.ts       # Tipos para el blog
    └── service.ts    # Tipos para servicios

## Documentación

El proyecto incluye documentación detallada para facilitar el desarrollo y mantenimiento:

- **Guías de Desarrollo**:
  - [Manejo de Imágenes](docs/guides/image-handling.md): Guía completa sobre cómo manejar imágenes con el componente StrapiImage
  - [Componente StrapiImage](components/StrapiImage.README.md): Documentación específica del componente StrapiImage

- **Convenciones de Código**:
  - Seguimos las convenciones de código de Next.js y React
  - Utilizamos TypeScript para tipado estático
  - Implementamos un enfoque modular para la organización del código

## Características Implementadas

### Sistema de Héroes Dinámicos
- Programación temporal de héroes
- Gestión de prioridades
- Soporte para múltiples tipos de media
- Control de estado activo/inactivo
- Fechas de publicación y expiración
- Múltiples estilos de visualización:
  - Carrusel
  - Parallax
  - Rollover

### Blog Completo
- Artículos con contenido rico
- Categorización de artículos
- Sistema de búsqueda
- Artículos relacionados
- Recursos adicionales (webinars, documentos)
- Esquemas estructurados para SEO
- Compartir en redes sociales

### Catálogo de Productos
- Vista de categorías
- Detalle de productos
- Sistema de navegación por tabs
- Galería de imágenes
- Especificaciones técnicas
- Productos relacionados
- Sistema de reviews

### Casos de Éxito
- Presentación de casos de clientes
- Estructura de desafío-solución-resultados
- Filtrado por industria
- Llamadas a la acción contextuales

## Integración con Strapi v5.0

Strapi v5.0 introduce cambios significativos en la estructura de la API y el manejo de datos en comparación con versiones anteriores. Esta sección detalla cómo trabajar correctamente con Strapi v5.0 en este proyecto.

### Cambios Importantes en Strapi v5.0

1. **Rutas de API**: Todas las rutas de API REST deben incluir `/api/` al principio.
2. **Estructura de Respuesta**: La estructura de respuesta ha cambiado, con datos aplanados en algunos casos y más anidados en otros.
3. **Manejo de Relaciones**: Las relaciones se manejan de manera diferente, requiriendo el uso de `populate` para obtener datos relacionados.
4. **Imágenes y Media**: El acceso a imágenes y archivos multimedia sigue una estructura específica y más anidada.
5. **Filtros y Consultas**: La sintaxis para filtros y consultas ha cambiado, utilizando corchetes para parámetros anidados.

### Lecciones Aprendidas y Soluciones Implementadas

#### 1. Estructura de Datos Inconsistente

**Problema**: La estructura de datos puede variar entre diferentes endpoints y tipos de contenido, lo que dificulta el procesamiento uniforme.

**Solución**: Implementar funciones de normalización robustas que puedan manejar diferentes estructuras:

```typescript
// Función para normalizar datos de artículos independientemente de su estructura
export function normalizeArticleData(article: any) {
  // Verificar si los datos están en article.attributes o directamente en article
  const articleData = article.attributes || article;
  
  return {
    id: article.id,
    title: articleData.title,
    slug: articleData.slug,
    excerpt: articleData.excerpt || '',
    content: articleData.content || '',
    publishedAt: articleData.publishedAt,
    // Procesamiento robusto de imágenes
    featuredImage: processImageData(articleData.featuredImage),
    // Procesamiento robusto de categorías
    categories: processCategoriesData(articleData.categories),
    // Procesamiento robusto de autor
    author: processAuthorData(articleData.author),
  };
}
```

#### 2. Manejo de Imágenes

**Problema**: Las imágenes en Strapi v5.0 tienen una estructura anidada compleja que puede variar según el contexto.

**Solución**: Crear funciones específicas para procesar imágenes que puedan manejar diferentes estructuras:

```typescript
// Función para procesar datos de imágenes de manera robusta
function processImageData(imageData: any) {
  if (!imageData) return null;
  
  // Caso 1: Estructura directa con URL
  if (imageData.url) {
    return {
      url: imageData.url,
      alternativeText: imageData.alternativeText || '',
    };
  }
  
  // Caso 2: Estructura con data y attributes (Strapi v5)
  if (imageData.data) {
    const data = imageData.data;
    
    // Caso 2.1: Estructura con attributes
    if (data.attributes) {
      return {
        url: data.attributes.url,
        alternativeText: data.attributes.alternativeText || '',
      };
    }
    
    // Caso 2.2: Estructura sin attributes
    if (data.url) {
      return {
        url: data.url,
        alternativeText: data.alternativeText || '',
      };
    }
  }
  
  return null;
}
```

#### 3. Relaciones Bidireccionales

**Problema**: Las relaciones bidireccionales (como artículos en categorías y categorías en artículos) no siempre están correctamente pobladas en ambas direcciones.

**Solución**: Implementar un enfoque de consulta en dos pasos para obtener datos relacionados:

```typescript
// Ejemplo: Obtener artículos por categoría
async function getArticlesByCategory(categorySlug: string) {
  // Paso 1: Obtener la categoría por su slug
  const categoryUrl = `${baseUrl}/api/categories?filters[slug][$eq]=${categorySlug}`;
  const categoryResponse = await fetch(categoryUrl);
  const categoryData = await categoryResponse.json();
  
  if (!categoryData.data.length) return [];
  
  const categoryId = categoryData.data[0].id;
  
  // Paso 2: Obtener artículos que pertenecen a esta categoría
  const articlesUrl = `${baseUrl}/api/articles?filters[categories][slug][$eq]=${categorySlug}&populate=*`;
  const articlesResponse = await fetch(articlesUrl);
  const articlesData = await articlesResponse.json();
  
  return normalizeArticlesData(articlesData.data);
}
```

#### 4. Filtros y Consultas Complejas

**Problema**: La sintaxis para filtros y consultas en Strapi v5.0 es más compleja y requiere el uso de corchetes para parámetros anidados.

**Solución**: Utilizar funciones de ayuda para construir URLs de consulta:

```typescript
// Función para construir URLs de consulta complejas
function buildQueryUrl(baseUrl: string, endpoint: string, filters: any, populate: string[] = ['*']) {
  let url = `${baseUrl}/api/${endpoint}?`;
  
  // Añadir filtros
  Object.entries(filters).forEach(([key, value], index) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value as any).forEach(([subKey, subValue]) => {
        url += `filters[${key}][${subKey}]=${subValue}&`;
      });
    } else {
      url += `filters[${key}]=${value}&`;
    }
  });
  
  // Añadir populate
  populate.forEach(item => {
    url += `populate=${item}&`;
  });
  
  return url.slice(0, -1); // Eliminar el último &
}

// Ejemplo de uso
const url = buildQueryUrl(
  'http://localhost:1337',
  'articles',
  { 
    categories: { slug: 'tecnologia' },
    publishedAt: { $ne: null }
  },
  ['featuredImage', 'categories', 'author']
);
```

#### 5. Manejo de Errores y Validación

**Problema**: Las respuestas de error de Strapi v5.0 pueden ser inconsistentes y difíciles de depurar.

**Solución**: Implementar un sistema robusto de manejo de errores y validación:

```typescript
async function fetchWithErrorHandling(url: string, options = {}) {
  try {
    console.log(`[fetchAPI] Fetching from URL: ${url}`);
    
    const response = await fetch(url, options);
    
    if (!response.ok) {
      console.error(`[fetchAPI] Error en la respuesta: ${response.status} ${response.statusText}`);
      return { error: `Error ${response.status}: ${response.statusText}`, data: null };
    }
    
    const data = await response.json();
    
    // Validar la estructura de datos esperada
    if (!data || (data.data === undefined && !data.error)) {
      console.error('[fetchAPI] Estructura de respuesta inesperada:', data);
      return { error: 'Estructura de respuesta inesperada', data: null };
    }
    
    return { error: null, data };
  } catch (error) {
    console.error('[fetchAPI] Error en la petición:', error);
    return { error: `Error en la petición: ${error.message}`, data: null };
  }
}
```

### Configuración de la Conexión

Para conectar correctamente con Strapi v5.0, asegúrate de configurar las siguientes variables de entorno:

```bash
# URL base de la API de Strapi (sin /api/ al final)
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337

# Token de API para autenticación (si es necesario)
STRAPI_API_TOKEN=tu_token_de_api
```

### Funciones de Conexión con Strapi

El proyecto utiliza dos funciones principales para conectar con Strapi:

#### 1. Función `fetchAPI` para peticiones REST

```typescript
export async function fetchAPI(path: string, options = {}) {
  // Configuración de opciones por defecto
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Combinar opciones
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options as any).headers,
    },
  };

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  
  // Asegurarse de que la ruta comience con /api/ si no es una ruta de GraphQL
  let fullPath = path;
  if (!path.startsWith('/api/') && !path.includes('/graphql')) {
    fullPath = `/api${path.startsWith('/') ? path : `/${path}`}`;
  }

  const url = `${baseUrl}${fullPath}`;
  
  // Realizar la petición
  const res = await fetch(url, mergedOptions);
  
  if (!res.ok) {
    throw new Error(`Error en la respuesta: ${res.status} ${res.statusText}`);
  }
  
  // Procesar la respuesta como JSON
  const data = await res.json();
  return data;
}
```

#### 2. Función `fetchGraphQL` para peticiones GraphQL

```typescript
export async function fetchGraphQL(options: GraphQLRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  const fetchUrl = `${apiUrl}/graphql`;
  
  const mergedOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options)
  };

  const res = await fetch(fetchUrl, mergedOptions);
  
  if (!res.ok) {
    throw new Error(`Error en la respuesta: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  
  if (data.errors) {
    throw new Error(`GraphQL Error: ${data.errors[0].message}`);
  }
  
  return data;
}
```

### Ejemplos de Uso de la API REST

#### Obtener Artículos del Blog

```typescript
export async function getLatestBlogPosts(limit = 3) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    
    // Construir URL con parámetros de paginación, ordenación y populate
    const url = `${baseUrl}/api/articles?pagination[limit]=${limit}&sort[0]=publishedAt:desc&populate=*`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    
    // Extraer los artículos de la respuesta
    const articles = responseData.data || [];
    
    // Normalizar los datos para el componente
    return articles.map((article) => ({
      id: article.id,
      title: article.attributes.title,
      slug: article.attributes.slug,
      excerpt: article.attributes.excerpt,
      publishedAt: article.attributes.publishedAt,
      featuredImage: article.attributes.featuredImage?.data ? {
        url: article.attributes.featuredImage.data.attributes.url,
        alt: article.attributes.featuredImage.data.attributes.alternativeText,
      } : null,
      categories: article.attributes.categories?.data?.map(cat => ({
        name: cat.attributes.name,
        slug: cat.attributes.slug,
      })) || [],
      author: article.attributes.author?.data?.attributes?.name || '',
    }));
  } catch (error) {
    console.error('Error obteniendo artículos:', error);
    return [];
  }
}
```

### Ejemplos de Consultas GraphQL

#### Consulta para Obtener Artículos Recientes

```graphql
query GetLatestArticles($limit: Int = 3) {
  articles(
    pagination: { limit: $limit }
    sort: ["publishedAt:desc"]
    filters: { publishedAt: { notNull: true } }
  ) {
    data {
      id
      attributes {
        title
        slug
        excerpt
        publishedAt
        featuredImage {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
        categories {
          data {
            attributes {
              name
              slug
            }
          }
        }
        author {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
```

#### Consulta para Obtener un Artículo por Slug

```graphql
query GetArticleBySlug($slug: String!) {
  articles(filters: { slug: { eq: $slug } }) {
    data {
      id
      attributes {
        title
        slug
        content
        excerpt
        publishedAt
        updatedAt
        featuredImage {
          data {
            attributes {
              url
              alternativeText
              width
              height
            }
          }
        }
        categories {
          data {
            attributes {
              name
              slug
            }
          }
        }
        author {
          data {
            attributes {
              name
              bio
            }
          }
        }
      }
    }
  }
}
```

## Manejo de Imágenes en Strapi v5.0

El manejo de imágenes en Strapi v5.0 requiere especial atención debido a la estructura anidada de los datos y la forma en que se accede a las URLs.

### Estructura de Datos de Imágenes

En Strapi v5.0, las imágenes siguen esta estructura:

```javascript
{
  "data": {
    "id": 1,
    "attributes": {
      "url": "/uploads/imagen.jpg",
      "alternativeText": "Descripción de la imagen",
      "width": 800,
      "height": 600,
      "formats": {
        "thumbnail": {
          "url": "/uploads/thumbnail_imagen.jpg",
          "width": 156,
          "height": 156
        },
        "small": {
          "url": "/uploads/small_imagen.jpg",
          "width": 500,
          "height": 375
        }
      }
    }
  }
}
```

### Acceso a URLs de Imágenes

Para acceder correctamente a las URLs de imágenes, es necesario:

1. Navegar por la estructura anidada
2. Combinar la URL base de Strapi con la ruta relativa de la imagen

```typescript
// Función para obtener la URL completa de una imagen
function getStrapiImageUrl(image: any): string {
  if (!image || !image.data || !image.data.attributes || !image.data.attributes.url) {
    return '/placeholder-image.jpg'; // Imagen por defecto
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  const imageUrl = image.data.attributes.url;
  
  // Si la URL ya es absoluta, devolverla tal cual
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Combinar la URL base con la ruta relativa
  return `${baseUrl}${imageUrl}`;
}

// Ejemplo de uso en un componente
const articleImage = getStrapiImageUrl(article.attributes.featuredImage);
```

### Acceso a Formatos de Imagen

Strapi v5.0 genera automáticamente diferentes formatos de imagen (thumbnail, small, medium, large). Para acceder a estos formatos:

```typescript
// Función para obtener un formato específico de imagen
function getStrapiImageFormat(image: any, format: 'thumbnail' | 'small' | 'medium' | 'large'): string {
  if (!image || !image.data || !image.data.attributes) {
    return '/placeholder-image.jpg';
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  const attributes = image.data.attributes;
  
  // Si se especifica un formato y existe, usarlo
  if (format && attributes.formats && attributes.formats[format] && attributes.formats[format].url) {
    return `${baseUrl}${attributes.formats[format].url}`;
  }
  
  // Usar la imagen original
  if (attributes.url) {
    return `${baseUrl}${attributes.url}`;
  }
  
  return '/placeholder-image.jpg';
}

// Ejemplo de uso para obtener la versión thumbnail
const thumbnailUrl = getStrapiImageFormat(article.attributes.featuredImage, 'thumbnail');
```

### Componente de Imagen Optimizado

Para facilitar el uso de imágenes de Strapi v5.0 con Next.js, se recomienda crear un componente reutilizable:

```tsx
import Image from 'next/image';
import { useState } from 'react';

interface StrapiImageProps {
  image: any;
  format?: 'thumbnail' | 'small' | 'medium' | 'large';
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export function StrapiImage({ 
  image, 
  format, 
  width, 
  height, 
  className = '', 
  alt = 'Imagen' 
}: StrapiImageProps) {
  const [error, setError] = useState(false);
  
  // Obtener la URL de la imagen
  const getImageUrl = () => {
    if (error || !image || !image.data || !image.data.attributes) {
      return '/placeholder-image.jpg';
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    const attributes = image.data.attributes;
    
    // Si se especifica un formato y existe, usarlo
    if (format && attributes.formats && attributes.formats[format] && attributes.formats[format].url) {
      return `${baseUrl}${attributes.formats[format].url}`;
    }
    
    // Usar la imagen original
    if (attributes.url) {
      return `${baseUrl}${attributes.url}`;
    }
    
    return '/placeholder-image.jpg';
  };
  
  // Obtener el texto alternativo
  const getAltText = () => {
    if (!image || !image.data || !image.data.attributes) {
      return alt;
    }
    
    return image.data.attributes.alternativeText || alt;
  };
  
  return (
    <Image
      src={getImageUrl()}
      alt={getAltText()}
      width={width || (image?.data?.attributes?.width || 800)}
      height={height || (image?.data?.attributes?.height || 600)}
      className={className}
      onError={() => setError(true)}
    />
  );
}
```

### Buenas Prácticas para el Manejo de Imágenes

1. **Siempre Verificar la Estructura**: Antes de acceder a propiedades anidadas, verificar que existan para evitar errores.
2. **Proporcionar Imágenes por Defecto**: Siempre tener una imagen de respaldo en caso de que la imagen de Strapi no esté disponible.
3. **Utilizar Formatos Optimizados**: Aprovechar los diferentes formatos que genera Strapi para optimizar el rendimiento.
4. **Manejar Errores de Carga**: Implementar manejo de errores para cuando las imágenes no se puedan cargar.
5. **Utilizar Lazy Loading**: Aprovechar las capacidades de lazy loading de Next.js para mejorar el rendimiento.
6. **Implementar Funciones Robustas**: Crear funciones que puedan manejar diferentes estructuras de datos para imágenes.
7. **Logging Detallado**: Implementar logs detallados para depurar problemas con las imágenes.
8. **Validación de URLs**: Asegurarse de que las URLs de las imágenes sean válidas antes de usarlas.

### Solución de Problemas Comunes

#### 1. Imágenes No Visibles en Páginas Específicas

**Problema**: Las imágenes se muestran correctamente en algunas páginas pero no en otras, a pesar de usar el mismo componente.

**Solución**: Verificar la estructura de datos en cada contexto y asegurarse de que la normalización sea consistente:

```typescript
// En la página principal
const articles = await getAllArticles();

// En la página de categoría
const category = await getCategoryBySlug(slug);
const articles = category.articles;

// Asegurarse de que ambos tengan la misma estructura
console.log('Estructura de artículo en página principal:', JSON.stringify(articles[0].featuredImage));
console.log('Estructura de artículo en página de categoría:', JSON.stringify(category.articles[0].featuredImage));
```

#### 2. Error 400 en Consultas GraphQL

**Problema**: Las consultas GraphQL fallan con error 400 Bad Request.

**Solución**: Verificar la sintaxis de la consulta y asegurarse de que los campos solicitados existan en el esquema:

```typescript
// En lugar de usar GraphQL para consultas complejas, usar la API REST
// que suele ser más robusta en Strapi v5.0
const articlesUrl = `${baseUrl}/api/articles?filters[categories][slug][$eq]=${slug}&populate=*`;
const response = await fetch(articlesUrl);
const data = await response.json();
```

#### 3. Relaciones No Pobladas

**Problema**: Las relaciones (como categorías en artículos) no se pueblan correctamente.

**Solución**: Usar el parámetro `populate` de manera específica:

```typescript
// Poblar categorías específicamente
const url = `${baseUrl}/api/articles?populate[categories][populate]=*`;

// O poblar múltiples relaciones
const url = `${baseUrl}/api/articles?populate[categories][populate]=*&populate[author][populate]=*&populate[featuredImage][populate]=*`;
```

## Configuración del Entorno

### Variables de Entorno Requeridas
```bash
# Strapi
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=tu_token_de_api

# Configuración del sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=LOGIFIT

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Instalación y Desarrollo

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd logifit-web3.0
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
- Crear archivo `.env.local`
- Añadir las variables necesarias

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Componentes Principales

### ProductCard
```typescript
interface ProductCardProps {
  name: string              // Nombre del producto/categoría
  slug: string             // Slug para la URL
  categorySlug?: string    // Slug de la categoría (productos)
  shortDescription: string // Descripción corta
  price?: number          // Precio (opcional)
  status: 'active' | 'inactive' | 'coming_soon'
  imageUrl: string        // URL de la imagen
  isCategory?: boolean    // Indicador de categoría
}
```

### ArticleSchema
```typescript
interface ArticleSchemaProps {
  title: string;           // Título del artículo
  description: string;     // Descripción o extracto
  image?: string;          // URL de la imagen destacada
  authorName: string;      // Nombre del autor
  datePublished: string;   // Fecha de publicación
  dateModified?: string;   // Fecha de modificación
  url: string;             // URL canónica del artículo
  authorBio?: string;      // Biografía del autor
}
```

### HeroProps
```typescript
interface HeroProps {
  name: string;
  isActive: boolean;
  displayType: 'carousel' | 'static' | 'rollover' | 'parallax';
  autoplayInterval?: number;
  publishAt?: string;
  expireAt?: string | null;
  priority?: number;
  slides: {
    title: string;
    subtitle: string;
    backgroundColor: string;
    textColor: string;
    mediaType: 'image' | 'video';
    image: {
      url: string;
      alternativeText: string;
    }[];
    video?: {
      url: string;
    }[];
    imagePosition?: 'left' | 'right' | 'center';
    ctaButtons: {
      text: string;
      url: string;
      variant: 'primary' | 'secondary';
    }[];
  }[];
}
```

## Características SEO y Analytics

- **Google Analytics**: Implementación completa con seguimiento de eventos
- **Schemas Estructurados**:
  - Schema para artículos del blog
  - Schema para breadcrumbs
  - Schema para productos y servicios
- **Optimización SEO**:
  - Sitemap dinámico
  - Robots.txt configurado
  - Meta tags optimizados
  - URLs amigables
  - Breadcrumbs 

## Herramientas de Depuración

El proyecto incluye varias herramientas de depuración para facilitar el desarrollo:

- **ApiDataDebugger**: Componente para depurar respuestas de la API
- **DebugImage**: Herramienta para probar diferentes variantes de URLs de imágenes
- **Console Logs**: Logs estratégicos para seguir el flujo de datos

## Scripts de Utilidad

El proyecto incluye varios scripts para facilitar la importación y gestión de contenido:

### Scripts de Importación
- **import-all.js**: Ejecuta todos los scripts de importación en secuencia
- **import-services.js**: Importa servicios predefinidos a Strapi
- **import-products.ts**: Importa productos a Strapi con sus especificaciones
- **import-blog-all.js**: Ejecuta todos los scripts relacionados con el blog

### Scripts de Descarga
- **download-images.js**: Descarga imágenes para servicios y productos
- **download-blog-content.js**: Descarga contenido de artículos del blog

### Scripts de Imágenes
- **import-images.js**: Importa imágenes a Strapi y las asocia con servicios
- **import-blog-images.js**: Importa imágenes del blog a Strapi

## Licencia

Todos los derechos reservados © LOGIFIT 2025