// Interfaces base para Strapi
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  name?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: any;
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Interfaces para servicios
export interface StrapiService {
  id: number;
  Title: string;
  slug: string;
  Description: string;
  Content?: string;
  category: string;
  features: string;
  benefits: string;
  order: number;
  showOnHomepage: boolean;
  homePosition?: number;
  homeDescription?: string;
  isAppHighlight: boolean;
  Image?: StrapiImage;
  icon?: StrapiImage;
  homeImage?: StrapiImage;
}

export interface NormalizedService {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: string;
  features: string[];
  benefits: string[];
  order: number;
  showOnHomepage: boolean;
  homePosition?: number;
  homeDescription?: string;
  isAppHighlight: boolean;
  image: {
    url: string;
    alt?: string;
    thumbnail?: string;
  } | null;
  icon: {
    url: string;
    alt?: string;
  } | null;
  homeImage: {
    url: string;
    alt?: string;
  } | null;
}

// Interfaces para productos
export interface StrapiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  status: 'active' | 'inactive' | 'coming_soon';
  category: string;
  features: string;
  benefits: string;
  specifications: Array<{
    label: string;
    value: string;
  }>;
  gallery: StrapiImage[];
  mainImage: StrapiImage;
}

export interface NormalizedProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  status: 'active' | 'inactive' | 'coming_soon';
  category: string;
  features: string[];
  benefits: string[];
  specifications: Array<{
    label: string;
    value: string;
  }>;
  gallery: Array<{
    url: string;
    alt?: string;
    thumbnail?: string;
  }>;
  mainImage: {
    url: string;
    alt?: string;
    thumbnail?: string;
  };
}

// Tipos de error personalizados
export type StrapiError = {
  status: number;
  name: string;
  message: string;
  details?: any;
} 