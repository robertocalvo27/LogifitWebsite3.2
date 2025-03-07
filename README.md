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

```
logifit-web3.0/
├── app/                  # Directorio principal de la aplicación
│   ├── api/             # API routes
│   ├── blog/            # Sección de blog
│   ├── casos-exito/     # Casos de éxito
│   ├── contacto/        # Página de contacto
│   ├── demo/            # Solicitud de demo
│   ├── industrias/      # Información por industrias
│   ├── nosotros/        # Acerca de la empresa
│   ├── soluciones/      # Soluciones y productos
│   │   └── [slug]/      # Página dinámica de categoría
│   │       └── productos/
│   │           └── [productSlug]/ # Página dinámica de producto
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de UI (Shadcn)
│   ├── hero/           # Sistema de héroes dinámicos
│   ├── products/       # Componentes de productos
│   │   └── ProductCard.tsx # Tarjeta de producto/categoría
│   ├── layout/         # Componentes de layout
│   └── shared/         # Componentes compartidos
├── lib/                # Utilidades y funciones
│   ├── api/           # Funciones de API
│   │   ├── home.ts    # API para la página principal
│   │   └── index.ts   # Exportaciones principales
│   └── utils/         # Utilidades generales
└── public/            # Archivos estáticos
```

## Características Implementadas

### Sistema de Héroes Dinámicos
- Programación temporal de héroes
- Gestión de prioridades
- Soporte para múltiples tipos de media
- Control de estado activo/inactivo
- Fechas de publicación y expiración

### Catálogo de Productos
- Vista de categorías
- Detalle de productos
- Sistema de navegación por tabs
- Galería de imágenes
- Especificaciones técnicas
- Productos relacionados
- Sistema de reviews

## Integración con Strapi

### API GraphQL
Ejemplo de consulta para héroes programados:
```graphql
query GetScheduledHeroes {
  heroes(
    filters: {
      and: [
        { isActive: { eq: true } }
        { publishAt: { lte: "$currentDate" } }
        { or: [
          { expireAt: { gt: "$currentDate" } }
          { expireAt: { null: true } }
        ]}
      ]
    }
    sort: "priority:desc"
  ) {
    name
    isActive
    displayType
    autoplayInterval
    publishAt
    expireAt
    priority
    slides {
      title
      subtitle
      backgroundColor
      textColor
      mediaType
      image {
        url
        alternativeText
      }
      video {
        url
      }
      imagePosition
      ctaButtons {
        text
        url
        variant
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

## Licencia

Todos los derechos reservados © LOGIFIT 2025 

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

## Componentes Principales

### ProductCard

El componente `ProductCard` es un componente reutilizable que se puede usar tanto para mostrar categorías como productos individuales. Se encuentra en `components/products/ProductCard.tsx`.

#### Propiedades

```typescript
interface ProductCardProps {
  name: string              // Nombre del producto o categoría
  slug: string             // Slug para la URL
  categorySlug?: string    // Slug de la categoría (opcional, solo para productos)
  shortDescription: string // Descripción corta
  price?: number          // Precio (opcional)
  status: 'active' | 'inactive' | 'coming_soon' // Estado del producto
  imageUrl: string        // URL de la imagen
  isCategory?: boolean    // Indica si es una categoría (por defecto: false)
}
```

#### Uso

1. Para mostrar una categoría:
```tsx
<ProductCard
  name="Wearables Inteligentes"
  slug="wearables-inteligentes"
  shortDescription="Descripción de la categoría"
  status="active"
  imageUrl="/ruta/imagen.jpg"
  isCategory={true}
/>
```

2. Para mostrar un producto:
```tsx
<ProductCard
  name="SmartWatch X1"
  slug="smartwatch-x1"
  categorySlug="wearables-inteligentes"
  shortDescription="Descripción del producto"
  price={299}
  status="active"
  imageUrl="/ruta/imagen.jpg"
/>
```

El componente maneja automáticamente las rutas:
- Para categorías: `/soluciones/[slug]`
- Para productos: `/soluciones/[categorySlug]/productos/[slug]` 