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
```

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

## Integración con Strapi

### API GraphQL
Ejemplo de consulta para artículos del blog:
```graphql
query GetLatestArticles($limit: Int = 3) {
  articles(
    pagination: { limit: $limit }
    sort: ["publishedAt:desc"]
  ) {
    data {
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

### Estructura de Datos en Strapi v5
Strapi v5 utiliza una estructura anidada con `data` y `attributes` para todos los tipos de contenido y relaciones. Por ejemplo:

```javascript
// Estructura de un artículo en Strapi v5
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Título del artículo",
      "slug": "titulo-del-articulo",
      "content": "Contenido del artículo...",
      "publishedAt": "2023-01-01T00:00:00.000Z",
      "featuredImage": {
        "data": {
          "attributes": {
            "url": "/uploads/imagen.jpg",
            "alternativeText": "Descripción de la imagen"
          }
        }
      }
    }
  }
}
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

## Manejo de Imágenes en Strapi v5

Para acceder correctamente a las imágenes en Strapi v5, es necesario seguir la estructura anidada:

```typescript
// Acceso a la URL de una imagen en Strapi v5
const imageUrl = article.featuredImage?.data?.attributes?.url
  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.featuredImage.data.attributes.url}`
  : '/placeholder-image.jpg';
```

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