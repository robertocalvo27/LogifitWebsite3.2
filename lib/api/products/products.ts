import { getStrapiURL } from '../core/config';
import { fetchAPI } from '../core/fetch';

// Interfaces para los componentes de productos
interface ProductFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface TechnicalSpecification {
  id: number;
  label: string;
  value: string;
}

interface ProductBenefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  likes: number;
  company: string;
}

interface RatingDistribution {
  id: number;
  stars: number;
  percentage: number;
}

// Interfaz para el producto normalizado
export interface NormalizedProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  status: string;
  ctaType: string;
  ctaText: string;
  ctaLink: string;
  reviewsCount: number;
  category: string;
  features: ProductFeature[];
  specifications: TechnicalSpecification[];
  benefits: ProductBenefit[];
  reviews: Review[];
  ratingDistribution: RatingDistribution[];
  images?: {
    url: string;
    alternativeText?: string;
  }[];
}

/**
 * Obtiene todos los productos
 */
export async function getAllProducts() {
  try {
    const apiUrl = getStrapiURL('api/products?populate=*');
    console.log('Fetching all products with URL:', apiUrl);
    const data = await fetchAPI(apiUrl);
    console.log('All products data received:', JSON.stringify(data, null, 2));
    
    if (data?.data) {
      const normalizedProducts = normalizeProductsData(data.data);
      console.log('Normalized products:', normalizedProducts);
      return normalizedProducts;
    }
    
    return [];
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

/**
 * Obtiene un producto por su slug
 */
export async function getProductBySlug(slug: string) {
  try {
    const apiUrl = getStrapiURL(`api/products?filters[slug][$eq]=${slug}&populate=*`);
    console.log('Fetching product with URL:', apiUrl);
    const data = await fetchAPI(apiUrl);
    
    // Log para depuración
    if (data?.data && data.data.length > 0) {
      const rawProduct = data.data[0];
      console.log('Raw product data structure:', {
        id: rawProduct.id,
        hasAttributes: !!rawProduct.attributes,
        attributeKeys: rawProduct.attributes ? Object.keys(rawProduct.attributes) : [],
        hasImages: rawProduct.attributes && (
          !!rawProduct.attributes.images || 
          !!rawProduct.attributes.image
        ),
        imagesStructure: rawProduct.attributes && rawProduct.attributes.images 
          ? JSON.stringify(rawProduct.attributes.images, null, 2) 
          : 'No images field',
        imageStructure: rawProduct.attributes && rawProduct.attributes.image 
          ? JSON.stringify(rawProduct.attributes.image, null, 2) 
          : 'No image field'
      });
    }
    
    if (data?.data && data.data.length > 0) {
      return normalizeProductData(data.data[0]);
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener producto con slug ${slug}:`, error);
    return null;
  }
}

/**
 * Obtiene productos por categoría
 */
export async function getProductsByCategory(category: string) {
  try {
    // Obtener todos los productos
    const apiUrl = getStrapiURL('api/products?populate=*');
    console.log('Fetching all products with URL:', apiUrl);
    const data = await fetchAPI(apiUrl);
    
    // Normalizar todos los productos
    let allProducts: NormalizedProduct[] = [];
    if (data?.data) {
      allProducts = normalizeProductsData(data.data);
      console.log('All normalized products count:', allProducts.length);
    }
    
    // Obtener el servicio por slug para conocer su categoría
    const serviceApiUrl = getStrapiURL(`api/services?filters[slug][$eq]=${category}&populate=*`);
    console.log('Fetching service with URL:', serviceApiUrl);
    const serviceData = await fetchAPI(serviceApiUrl);
    
    let serviceCategory = '';
    if (serviceData?.data && serviceData.data.length > 0) {
      serviceCategory = serviceData.data[0].category || '';
      console.log('Service category:', serviceCategory);
    }
    
    // Filtrar productos por la categoría del servicio
    let filteredProducts: NormalizedProduct[] = [];
    
    // Para propósitos de depuración, mostrar todos los productos y sus categorías
    console.log('All products with their categories:');
    allProducts.forEach(product => {
      console.log(`Product: ${product.name}, Category: ${product.category || 'N/A'}`);
    });
    
    if (serviceCategory) {
      filteredProducts = allProducts.filter(product => {
        // Intentar diferentes formas de comparar la categoría
        const productCategory = product.category || '';
        
        const isMatch = 
          productCategory.toLowerCase() === serviceCategory.toLowerCase() ||
          productCategory.toLowerCase().includes(serviceCategory.toLowerCase()) ||
          serviceCategory.toLowerCase().includes(productCategory.toLowerCase());
        
        console.log(`Comparing product "${product.name}" category "${productCategory}" with service category "${serviceCategory}" - Match: ${isMatch}`);
        
        return isMatch;
      });
      
      console.log('Filtered products by service category count:', filteredProducts.length);
    }
    
    // Si no hay productos filtrados, intentar filtrar por el slug del servicio
    if (filteredProducts.length === 0) {
      filteredProducts = allProducts.filter(product => {
        const productCategory = product.category || '';
        
        const isMatch = 
          productCategory.toLowerCase() === category.toLowerCase() ||
          productCategory.toLowerCase().includes(category.toLowerCase()) ||
          category.toLowerCase().includes(productCategory.toLowerCase());
        
        console.log(`Comparing product "${product.name}" category "${productCategory}" with service slug "${category}" - Match: ${isMatch}`);
        
        return isMatch;
      });
      
      console.log('Filtered products by service slug count:', filteredProducts.length);
    }
    
    // Si aún no hay productos, devolver todos los productos (para propósitos de depuración)
    if (filteredProducts.length === 0) {
      console.log('No products found with filtering, returning all products for debugging');
      return allProducts;
    }
    
    return filteredProducts;
  } catch (error) {
    console.error(`Error al obtener productos de la categoría ${category}:`, error);
    return [];
  }
}

/**
 * Normaliza los datos de un producto desde el formato de Strapi v5
 */
export function normalizeProductData(product: any): NormalizedProduct {
  console.log("Raw product data to normalize:", JSON.stringify(product, null, 2));
  
  // Extraer la categoría si existe
  const category = product.service?.data?.attributes?.name || '';
  console.log("Extracted product category:", category);
  
  // Procesar imágenes
  let processedImages: { url: string; alternativeText?: string }[] = [];
  
  // Verificar si hay imágenes en la estructura de datos de Strapi v5
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    console.log("Processing images from 'images' array field");
    processedImages = product.images.map((img: any) => {
      // Construir la URL completa
      let imageUrl = img.url;
      
      // Si la URL no comienza con http, añadir el prefijo del servidor de Strapi
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${imageUrl}`;
      }
      
      return {
        url: imageUrl,
        alternativeText: img.alternativeText || product.name || ''
      };
    });
  } else if (product.image && product.image.data) {
    // Manejar el caso de un solo objeto de imagen
    console.log("Processing single 'image' field");
    const img = product.image.data.attributes;
    let imageUrl = img.url;
    
    // Si la URL no comienza con http, añadir el prefijo del servidor de Strapi
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${imageUrl}`;
    }
    
    processedImages = [{
      url: imageUrl,
      alternativeText: img.alternativeText || product.name || ''
    }];
  }
  
  console.log("Processed product images:", processedImages);
  
  // Normalizar el producto
  const normalizedProduct: NormalizedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription,
    price: product.price,
    status: product.status1 || 'active',
    ctaType: product.ctaType || 'demo',
    ctaText: product.ctaText || 'Ver detalles',
    ctaLink: product.ctaLink || `/productos/${product.slug}`,
    reviewsCount: product.reviewsCount || 0,
    category,
    features: product.ProductFeature || [],
    specifications: product.TechnicalSpecification || [],
    benefits: product.ProductBenefit || [],
    reviews: product.reviews || [],
    ratingDistribution: product.ratingDistribution || [],
    images: processedImages
  };
  
  console.log("Normalized product result:", {
    id: normalizedProduct.id,
    name: normalizedProduct.name,
    category: normalizedProduct.category,
    status: normalizedProduct.status,
    imagesCount: normalizedProduct.images.length
  });
  
  return normalizedProduct;
}

/**
 * Normaliza un array de productos
 */
function normalizeProductsData(products: any[]): NormalizedProduct[] {
  return products.map(product => normalizeProductData(product));
}

/**
 * Obtiene productos usando GraphQL
 */
export async function getProductsWithGraphQL() {
  try {
    const query = `
      query GetProducts {
        products {
          data {
            id
            attributes {
              name
              slug
              description
              shortDescription
              price
              status
              ctaType
              ctaText
              ctaLink
              reviewsCount
              ProductFeature {
                id
                title
                description
                icon
              }
              TechnicalSpecification {
                id
                label
                value
              }
              ProductBenefit {
                id
                title
                description
                icon
              }
              reviews {
                id
                author
                rating
                date
                title
                comment
                verified
                likes
                company
              }
              ratingDistribution {
                id
                stars
                percentage
              }
            }
          }
        }
      }
    `;
    
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      body: JSON.stringify({ query })
    });
    
    const result = await response.json();
    
    if (result.data?.products?.data) {
      return result.data.products.data.map((product: any) => ({
        id: product.id,
        ...product.attributes,
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error al obtener productos con GraphQL:", error);
    return [];
  }
}

/**
 * Obtiene un producto por slug usando GraphQL
 */
export async function getProductBySlugWithGraphQL(slug: string) {
  try {
    const query = `
      query GetProductBySlug($slug: String!) {
        products(filters: { slug: { eq: $slug } }) {
          data {
            id
            attributes {
              name
              slug
              description
              shortDescription
              price
              status
              ctaType
              ctaText
              ctaLink
              reviewsCount
              ProductFeature {
                id
                title
                description
                icon
              }
              TechnicalSpecification {
                id
                label
                value
              }
              ProductBenefit {
                id
                title
                description
                icon
              }
              reviews {
                id
                author
                rating
                date
                title
                comment
                verified
                likes
                company
              }
              ratingDistribution {
                id
                stars
                percentage
              }
            }
          }
        }
      }
    `;
    
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      body: JSON.stringify({ 
        query,
        variables: { slug }
      })
    });
    
    const result = await response.json();
    
    if (result.data?.products?.data && result.data.products.data.length > 0) {
      const product = result.data.products.data[0];
      return {
        id: product.id,
        ...product.attributes
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener producto con slug ${slug} usando GraphQL:`, error);
    return null;
  }
}