"use client";

import Image from 'next/image';
import { useState } from 'react';

interface StrapiImageProps {
  image: any;
  format?: 'thumbnail' | 'small' | 'medium' | 'large';
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export function StrapiImage({ 
  image, 
  format, 
  width, 
  height, 
  className = '', 
  alt = 'Imagen',
  priority = false,
  objectFit = 'cover'
}: StrapiImageProps) {
  const [error, setError] = useState(false);
  
  // Obtener la URL de la imagen
  const getImageUrl = () => {
    if (error || !image) {
      return '/images/placeholder-image.jpg';
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    
    // Caso 1: Si la imagen es una cadena simple
    if (typeof image === 'string') {
      // Si la URL ya es absoluta, devolverla tal cual
      if (image.startsWith('http://') || image.startsWith('https://')) {
        return image;
      }
      // Combinar la URL base con la ruta relativa
      return `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`;
    }
    
    // Caso 2: Si la imagen tiene una URL directa
    if (image.url) {
      // Si la URL ya es absoluta, devolverla tal cual
      if (image.url.startsWith('http://') || image.url.startsWith('https://')) {
        return image.url;
      }
      // Combinar la URL base con la ruta relativa
      return `${baseUrl}${image.url.startsWith('/') ? image.url : `/${image.url}`}`;
    }
    
    // Caso 3: Estructura con data y attributes (Strapi v5)
    if (image.data) {
      const data = image.data;
      
      // Caso 3.1: Estructura con attributes
      if (data.attributes) {
        const attributes = data.attributes;
        
        // Si se especifica un formato y existe, usarlo
        if (format && attributes.formats && attributes.formats[format] && attributes.formats[format].url) {
          const formatUrl = attributes.formats[format].url;
          return formatUrl.startsWith('http') ? formatUrl : `${baseUrl}${formatUrl}`;
        }
        
        // Usar la imagen original
        if (attributes.url) {
          return attributes.url.startsWith('http') ? attributes.url : `${baseUrl}${attributes.url}`;
        }
      }
      
      // Caso 3.2: Estructura sin attributes pero con url
      if (data.url) {
        return data.url.startsWith('http') ? data.url : `${baseUrl}${data.url}`;
      }
    }
    
    // Caso 4: Estructura anidada en featuredImage
    if (image.featuredImage) {
      if (typeof image.featuredImage === 'string') {
        return image.featuredImage.startsWith('http') ? image.featuredImage : `${baseUrl}${image.featuredImage}`;
      }
      
      if (image.featuredImage.url) {
        return image.featuredImage.url.startsWith('http') ? image.featuredImage.url : `${baseUrl}${image.featuredImage.url}`;
      }
      
      if (image.featuredImage.data && image.featuredImage.data.attributes && image.featuredImage.data.attributes.url) {
        return image.featuredImage.data.attributes.url.startsWith('http') 
          ? image.featuredImage.data.attributes.url 
          : `${baseUrl}${image.featuredImage.data.attributes.url}`;
      }
    }
    
    // Si no se pudo obtener la URL, usar imagen por defecto
    console.error('No se pudo obtener la URL de la imagen:', image);
    return '/images/placeholder-image.jpg';
  };
  
  // Obtener el texto alternativo
  const getAltText = () => {
    if (!image) {
      return alt;
    }
    
    // Caso 1: Si la imagen tiene alternativeText directo
    if (image.alternativeText) {
      return image.alternativeText;
    }
    
    // Caso 2: Estructura con data y attributes (Strapi v5)
    if (image.data && image.data.attributes && image.data.attributes.alternativeText) {
      return image.data.attributes.alternativeText;
    }
    
    // Caso 3: Estructura anidada en featuredImage
    if (image.featuredImage) {
      if (image.featuredImage.alternativeText) {
        return image.featuredImage.alternativeText;
      }
      
      if (image.featuredImage.data && image.featuredImage.data.attributes && image.featuredImage.data.attributes.alternativeText) {
        return image.featuredImage.data.attributes.alternativeText;
      }
    }
    
    return alt;
  };
  
  // Obtener dimensiones de la imagen
  const getDimensions = () => {
    let imgWidth = width;
    let imgHeight = height;
    
    if (!imgWidth && image) {
      // Intentar obtener el ancho de la imagen
      if (image.width) {
        imgWidth = image.width;
      } else if (image.data && image.data.attributes && image.data.attributes.width) {
        imgWidth = image.data.attributes.width;
      } else if (image.featuredImage && image.featuredImage.width) {
        imgWidth = image.featuredImage.width;
      } else if (image.featuredImage && image.featuredImage.data && 
                image.featuredImage.data.attributes && 
                image.featuredImage.data.attributes.width) {
        imgWidth = image.featuredImage.data.attributes.width;
      }
    }
    
    if (!imgHeight && image) {
      // Intentar obtener el alto de la imagen
      if (image.height) {
        imgHeight = image.height;
      } else if (image.data && image.data.attributes && image.data.attributes.height) {
        imgHeight = image.data.attributes.height;
      } else if (image.featuredImage && image.featuredImage.height) {
        imgHeight = image.featuredImage.height;
      } else if (image.featuredImage && image.featuredImage.data && 
                image.featuredImage.data.attributes && 
                image.featuredImage.data.attributes.height) {
        imgHeight = image.featuredImage.data.attributes.height;
      }
    }
    
    // Valores por defecto si no se pueden obtener las dimensiones
    return {
      width: imgWidth || 800,
      height: imgHeight || 600
    };
  };
  
  const { width: imgWidth, height: imgHeight } = getDimensions();
  const imageUrl = getImageUrl();
  const imageAlt = getAltText();
  
  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      width={imgWidth}
      height={imgHeight}
      className={className}
      onError={() => setError(true)}
      priority={priority}
      style={{ objectFit }}
    />
  );
}

export default StrapiImage; 