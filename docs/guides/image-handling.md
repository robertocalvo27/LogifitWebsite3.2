# Guía de Manejo de Imágenes en LogifitWeb

Esta guía documenta el enfoque estándar para manejar imágenes en el proyecto LogifitWeb, incluyendo el uso del componente `StrapiImage`, la estructura de datos esperada y ejemplos de implementación en diferentes módulos.

## Índice

1. [Componente StrapiImage](#componente-strapiimage)
2. [Estructura de Datos de Imágenes](#estructura-de-datos-de-imágenes)
3. [Implementación por Módulo](#implementación-por-módulo)
   - [Blog](#blog)
   - [Productos](#productos)
   - [Servicios](#servicios)
   - [Hero](#hero)
4. [Manejo de Thumbnails](#manejo-de-thumbnails)
5. [Imágenes de Respaldo](#imágenes-de-respaldo)
6. [Buenas Prácticas](#buenas-prácticas)
7. [Solución de Problemas Comunes](#solución-de-problemas-comunes)

## Componente StrapiImage

El componente `StrapiImage` es un componente reutilizable diseñado para manejar diferentes estructuras de datos de imágenes que pueden venir de Strapi. Este componente se encuentra en `components/StrapiImage.tsx`.

### Propósito

- Proporcionar una interfaz unificada para mostrar imágenes de Strapi
- Manejar diferentes formatos y estructuras de datos de imágenes
- Gestionar errores y proporcionar imágenes de respaldo

### Props

```typescript
interface StrapiImageProps {
  image: any;                                      // Datos de la imagen (múltiples formatos soportados)
  format?: 'thumbnail' | 'small' | 'medium' | 'large'; // Formato de imagen a utilizar
  width?: number;                                  // Ancho de la imagen
  height?: number;                                 // Alto de la imagen
  className?: string;                              // Clases CSS adicionales
  alt?: string;                                    // Texto alternativo (fallback)
  priority?: boolean;                              // Prioridad de carga
  objectFit?: 'cover' | 'contain' | 'fill';        // Estilo de ajuste de la imagen
}
```

### Uso Básico

```jsx
import StrapiImage from '@/components/StrapiImage';

// En tu componente
<StrapiImage
  image={article.featuredImage}
  alt={article.title}
  width={800}
  height={600}
  className="rounded-lg"
  priority={true}
  objectFit="cover"
/>
```

## Estructura de Datos de Imágenes

El componente `StrapiImage` está diseñado para manejar múltiples estructuras de datos de imágenes que pueden venir de Strapi. A continuación se detallan las estructuras soportadas:

### 1. URL Simple

```javascript
const image = "/uploads/image.jpg";
```

### 2. Objeto con URL

```javascript
const image = {
  url: "/uploads/image.jpg",
  alternativeText: "Descripción de la imagen"
};
```

### 3. Estructura Strapi v5 (con data y attributes)

```javascript
const image = {
  data: {
    id: 1,
    attributes: {
      url: "/uploads/image.jpg",
      alternativeText: "Descripción de la imagen",
      width: 800,
      height: 600,
      formats: {
        thumbnail: { url: "/uploads/thumbnail_image.jpg" },
        small: { url: "/uploads/small_image.jpg" },
        medium: { url: "/uploads/medium_image.jpg" },
        large: { url: "/uploads/large_image.jpg" }
      }
    }
  }
};
```

### 4. Estructura Anidada (featuredImage)

```javascript
const image = {
  featuredImage: {
    url: "/uploads/image.jpg",
    alternativeText: "Descripción de la imagen"
  }
};
```

## Implementación por Módulo

### Blog

En el módulo de blog, las imágenes se manejan principalmente a través de la función `getArticleBySlug` en `lib/api/blog/index.ts`. Esta función obtiene los datos del artículo y mantiene la estructura original de las imágenes para que el componente `StrapiImage` pueda procesarlas.

#### Estructura de Datos

```javascript
// Estructura normalizada de un artículo
{
  id: number,
  title: string,
  slug: string,
  // ...
  featuredImage: {
    url: string,
    alternativeText: string,
    // ...
  },
  // ...
}
```

#### Ejemplo de Uso

```jsx
// En app/blog/[slug]/page.tsx
{article.featuredImage && (
  <div className="mx-auto max-w-4xl mb-8">
    <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
      <StrapiImage
        image={article.featuredImage}
        alt={article.title}
        width={1200}
        height={675}
        className="object-cover object-center"
        priority={true}
        objectFit="cover"
      />
    </div>
  </div>
)}
```

### Productos

Para el módulo de productos, se debe seguir un enfoque similar al del blog. La función que obtiene los datos del producto debe mantener la estructura original de las imágenes.

#### Estructura de Datos Recomendada

```javascript
// Estructura normalizada de un producto
{
  id: number,
  name: string,
  slug: string,
  // ...
  mainImage: {
    url: string,
    alternativeText: string,
    // ...
  },
  gallery: [
    {
      url: string,
      alternativeText: string,
      // ...
    },
    // ...
  ],
  // ...
}
```

#### Ejemplo de Implementación

```jsx
// En app/productos/[slug]/page.tsx
{product.mainImage && (
  <div className="product-image-container">
    <StrapiImage
      image={product.mainImage}
      alt={product.name}
      width={600}
      height={600}
      className="product-image"
      priority={true}
      objectFit="contain"
    />
  </div>
)}

// Galería de imágenes
<div className="product-gallery">
  {product.gallery?.map((image, index) => (
    <div key={index} className="gallery-item">
      <StrapiImage
        image={image}
        alt={`${product.name} - Imagen ${index + 1}`}
        width={300}
        height={300}
        className="gallery-image"
        objectFit="cover"
      />
    </div>
  ))}
</div>
```

### Servicios

Para el módulo de servicios, se debe seguir un enfoque similar al del blog y productos.

#### Estructura de Datos Recomendada

```javascript
// Estructura normalizada de un servicio
{
  id: number,
  title: string,
  slug: string,
  // ...
  image: {
    url: string,
    alternativeText: string,
    // ...
  },
  icon: {
    url: string,
    alternativeText: string,
    // ...
  },
  // ...
}
```

### Hero

Para el componente Hero, la estructura debe ser consistente con los otros módulos.

#### Estructura de Datos Recomendada

```javascript
// Estructura normalizada de un hero
{
  name: string,
  isActive: boolean,
  displayType: string,
  // ...
  slides: [
    {
      title: string,
      subtitle: string,
      // ...
      image: {
        url: string,
        alternativeText: string,
        // ...
      },
      // ...
    },
    // ...
  ],
  // ...
}
```

## Manejo de Thumbnails

Los thumbnails son versiones reducidas de las imágenes originales que se utilizan para mostrar previsualizaciones. Strapi genera automáticamente diferentes formatos de imagen (thumbnail, small, medium, large) cuando se sube una imagen.

### Acceso a Thumbnails

Para acceder a los thumbnails, se debe utilizar el prop `format` del componente `StrapiImage`:

```jsx
<StrapiImage
  image={article.featuredImage}
  format="thumbnail"  // Usar el formato thumbnail
  alt={article.title}
  width={300}
  height={200}
  className="thumbnail-image"
  objectFit="cover"
/>
```

### Thumbnails Personalizados

Si necesitas thumbnails con dimensiones específicas que no son generados por Strapi, puedes:

1. Configurar Strapi para generar formatos adicionales
2. Utilizar servicios de transformación de imágenes como Cloudinary
3. Implementar una solución personalizada en el frontend

## Imágenes de Respaldo

El componente `StrapiImage` proporciona imágenes de respaldo en caso de que la imagen original no esté disponible o haya un error al cargarla.

### Ubicación de Imágenes de Respaldo

Las imágenes de respaldo se encuentran en el directorio `public/images/`:

- `placeholder.png`: Imagen de respaldo genérica
- `article-placeholder.jpg`: Imagen de respaldo para artículos
- `webinar-placeholder.jpg`: Imagen de respaldo para webinars
- `document-placeholder.jpg`: Imagen de respaldo para documentos
- `reel-placeholder.jpg`: Imagen de respaldo para reels

### Personalización de Imágenes de Respaldo

Para personalizar las imágenes de respaldo para diferentes tipos de contenido, se debe modificar la lógica en el componente `StrapiImage`.

## Buenas Prácticas

1. **Mantener la Estructura Original**: Las funciones de API deben mantener la estructura original de las imágenes para que el componente `StrapiImage` pueda procesarlas correctamente.

2. **Usar Interfaces Consistentes**: Definir interfaces claras para las estructuras de datos de imágenes y utilizarlas de manera consistente en todos los módulos.

3. **Proporcionar Texto Alternativo**: Siempre proporcionar un texto alternativo para las imágenes, ya sea a través de los datos de Strapi o como prop del componente.

4. **Optimizar Dimensiones**: Especificar las dimensiones adecuadas para las imágenes según su uso para optimizar el rendimiento.

5. **Manejar Errores**: Implementar manejo de errores para casos en los que las imágenes no estén disponibles o tengan formatos incorrectos.

## Solución de Problemas Comunes

### Problema: La imagen no se muestra

**Posibles causas y soluciones:**

1. **URL incorrecta**: Verificar que la URL de la imagen sea correcta y accesible.
2. **Estructura de datos incorrecta**: Verificar que la estructura de datos de la imagen sea compatible con el componente `StrapiImage`.
3. **Imagen no disponible**: Verificar que la imagen exista en Strapi y esté publicada.

### Problema: Se muestra la imagen de respaldo en lugar de la imagen original

**Posibles causas y soluciones:**

1. **Error al cargar la imagen**: Verificar que la imagen original sea accesible.
2. **Estructura de datos incorrecta**: Verificar que la estructura de datos de la imagen sea compatible con el componente `StrapiImage`.
3. **URL malformada**: Verificar que la URL de la imagen no contenga caracteres especiales o espacios.

### Problema: La imagen se muestra distorsionada

**Posibles causas y soluciones:**

1. **Dimensiones incorrectas**: Ajustar las dimensiones de la imagen o el valor de `objectFit`.
2. **Formato incorrecto**: Utilizar un formato de imagen más adecuado para el contenido.

### Problema: Error "Invalid URL"

**Posibles causas y soluciones:**

1. **URL malformada**: Verificar que la URL no contenga caracteres especiales o espacios.
2. **Concatenación incorrecta**: Verificar que no se esté concatenando incorrectamente la URL base con la URL de la imagen.
3. **URL relativa vs absoluta**: Verificar que se esté manejando correctamente la diferencia entre URLs relativas y absolutas. 