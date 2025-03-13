# StrapiImage Component

Este componente está diseñado para manejar de forma unificada las imágenes provenientes de Strapi CMS, independientemente de su estructura de datos.

## Características

- Maneja múltiples estructuras de datos de imágenes de Strapi
- Soporta diferentes formatos de imagen (thumbnail, small, medium, large)
- Proporciona imágenes de respaldo en caso de error
- Extrae automáticamente el texto alternativo
- Determina dimensiones de imagen cuando están disponibles
- Compatible con Next.js Image component

## Instalación

El componente ya está incluido en el proyecto en `components/StrapiImage.tsx`.

## Uso Básico

```jsx
import StrapiImage from '@/components/StrapiImage';

// Uso básico
<StrapiImage
  image={article.featuredImage}
  alt="Descripción de la imagen"
/>

// Con opciones adicionales
<StrapiImage
  image={article.featuredImage}
  format="thumbnail"
  width={300}
  height={200}
  className="rounded-lg shadow-md"
  alt="Descripción de la imagen"
  priority={true}
  objectFit="cover"
/>
```

## Props

| Prop | Tipo | Descripción | Default |
|------|------|-------------|---------|
| `image` | `any` | Datos de la imagen (múltiples formatos soportados) | - |
| `format` | `'thumbnail' \| 'small' \| 'medium' \| 'large'` | Formato de imagen a utilizar | - |
| `width` | `number` | Ancho de la imagen | `800` |
| `height` | `number` | Alto de la imagen | `600` |
| `className` | `string` | Clases CSS adicionales | `''` |
| `alt` | `string` | Texto alternativo (fallback) | `'Imagen'` |
| `priority` | `boolean` | Prioridad de carga | `false` |
| `objectFit` | `'cover' \| 'contain' \| 'fill'` | Estilo de ajuste de la imagen | `'cover'` |

## Estructuras de Datos Soportadas

El componente `StrapiImage` está diseñado para manejar múltiples estructuras de datos de imágenes que pueden venir de Strapi:

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

## Ejemplos de Uso

### Imagen de Artículo

```jsx
<StrapiImage
  image={article.featuredImage}
  alt={article.title}
  width={1200}
  height={675}
  className="rounded-xl shadow-lg"
  priority={true}
  objectFit="cover"
/>
```

### Thumbnail de Producto

```jsx
<StrapiImage
  image={product.mainImage}
  format="thumbnail"
  alt={product.name}
  width={300}
  height={300}
  className="product-thumbnail"
  objectFit="contain"
/>
```

### Galería de Imágenes

```jsx
<div className="gallery-grid">
  {product.gallery?.map((image, index) => (
    <div key={index} className="gallery-item">
      <StrapiImage
        image={image}
        alt={`${product.name} - Imagen ${index + 1}`}
        width={400}
        height={400}
        className="gallery-image"
        objectFit="cover"
      />
    </div>
  ))}
</div>
```

### Imagen de Hero

```jsx
<StrapiImage
  image={hero.slides[0].image}
  alt={hero.slides[0].title}
  width={1920}
  height={1080}
  className="hero-image"
  priority={true}
  objectFit="cover"
/>
```

## Manejo de Errores

El componente incluye manejo de errores para casos en los que la imagen no esté disponible o tenga un formato incorrecto. En estos casos, se mostrará una imagen de respaldo.

```jsx
// El componente maneja internamente los errores
<StrapiImage
  image={undefined} // Esto mostrará la imagen de respaldo
  alt="Imagen no disponible"
/>
```

## Personalización

Si necesitas personalizar el comportamiento del componente, puedes modificar el archivo `components/StrapiImage.tsx`. Por ejemplo, puedes cambiar la imagen de respaldo o añadir soporte para nuevas estructuras de datos.

## Solución de Problemas

### La imagen no se muestra

Verifica que la estructura de datos de la imagen sea compatible con el componente. Puedes usar `console.log` para depurar la estructura de datos:

```jsx
console.log('Estructura de imagen:', JSON.stringify(image, null, 2));
```

### Se muestra la imagen de respaldo

Si se muestra la imagen de respaldo en lugar de la imagen original, puede ser debido a:

1. La imagen original no está disponible
2. La estructura de datos de la imagen no es compatible
3. La URL de la imagen es incorrecta

### Error "Invalid URL"

Si recibes un error "Invalid URL", verifica que la URL de la imagen sea válida y que no se esté concatenando incorrectamente la URL base con la URL de la imagen. 