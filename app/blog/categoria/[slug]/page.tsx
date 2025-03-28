import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllArticles, getAllCategories } from '@/lib/api/blog';
import { fetchAPI } from '@/lib/api/core/fetch';
import SEO from '@/components/Seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import BlogPage from '../../page';

export const dynamic = 'force-dynamic';

interface Category {
  name: string;
  slug: string;
  description?: string;
  articles: {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    publishedAt: string;
    featuredImage?: {
      url: string;
      alternativeText?: string;
    };
    author: {
      name: string;
      position: string;
    };
  }[];
}

interface CategoryListItem {
  id: number;
  name: string;
  slug: string;
}

interface CategoryPageParams {
  params: {
    slug: string;
  };
}

// Función para formatear la fecha
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error al formatear la fecha:', error);
    return '';
  }
};

// Actualizar la función getCategoryBySlug para usar la API REST
async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    console.log('[getCategoryBySlug] Fetching category with slug:', slug);
    
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    
    // 1. Primero obtenemos la categoría
    const categoryUrl = `${baseUrl}/api/categories?filters[slug][$eq]=${slug}`;
    console.log('[getCategoryBySlug] Fetching category from URL:', categoryUrl);
    
    const categoryResponse = await fetch(categoryUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!categoryResponse.ok) {
      console.error(`[getCategoryBySlug] Error en la respuesta de categoría: ${categoryResponse.status} ${categoryResponse.statusText}`);
      return null;
    }
    
    const categoryData = await categoryResponse.json();
    const categories = categoryData.data || [];
    
    if (!categories.length) {
      console.log('[getCategoryBySlug] No se encontró la categoría con slug:', slug);
      return null;
    }
    
    const category = categories[0];
    const categoryId = category.id;
    const categoryAttributes = category.attributes || category;
    
    console.log('[getCategoryBySlug] Category found:', {
      id: categoryId,
      name: categoryAttributes.name,
      slug: categoryAttributes.slug
    });
    
    // 2. Ahora buscamos los artículos que pertenecen a esta categoría
    const articlesUrl = `${baseUrl}/api/articles?filters[categories][slug][$eq]=${slug}&populate=*`;
    console.log('[getCategoryBySlug] Fetching articles for category from URL:', articlesUrl);
    
    const articlesResponse = await fetch(articlesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!articlesResponse.ok) {
      console.error(`[getCategoryBySlug] Error en la respuesta de artículos: ${articlesResponse.status} ${articlesResponse.statusText}`);
      return null;
    }
    
    const articlesData = await articlesResponse.json();
    const articles = articlesData.data || [];
    
    console.log('[getCategoryBySlug] Found articles for category:', articles.length);
    
    // 3. Normalizamos los datos para el componente
    return {
      name: categoryAttributes.name,
      slug: categoryAttributes.slug,
      description: categoryAttributes.description || '',
      articles: articles.map((article: any) => {
        const articleData = article.attributes || article;
        
        // Verificar la estructura de featuredImage
        console.log('[getCategoryBySlug] Article featuredImage structure:', 
          articleData.featuredImage ? JSON.stringify(articleData.featuredImage).substring(0, 200) : 'No featuredImage');
        
        // Extraer correctamente la URL de la imagen
        let featuredImage = null;
        if (articleData.featuredImage) {
          // Si es un objeto directo (como en la estructura antigua)
          if (articleData.featuredImage.url) {
            featuredImage = {
              url: articleData.featuredImage.url,
              alternativeText: articleData.featuredImage.alternativeText || articleData.title || '',
            };
          } 
          // Si es la estructura de Strapi v5 con data y attributes
          else if (articleData.featuredImage.data) {
            const imageData = articleData.featuredImage.data;
            if (imageData.attributes) {
              featuredImage = {
                url: imageData.attributes.url,
                alternativeText: imageData.attributes.alternativeText || articleData.title || '',
              };
            } else {
              featuredImage = {
                url: imageData.url || '',
                alternativeText: imageData.alternativeText || articleData.title || '',
              };
            }
          }
        }
        
        if (featuredImage) {
          console.log('[getCategoryBySlug] Processed featuredImage:', featuredImage);
        }
        
        return {
          id: article.id, // Añadir el ID para la key en el renderizado
          title: articleData.title,
          slug: articleData.slug,
          excerpt: articleData.excerpt || '',
          content: articleData.content || '',
          publishedAt: articleData.publishedAt,
          featuredImage: featuredImage,
          author: articleData.author?.data ? {
            name: articleData.author.data.attributes.name,
            position: articleData.author.data.attributes.position || '',
          } : { name: '', position: '' },
        };
      }),
    };
  } catch (error) {
    console.error('[getCategoryBySlug] Error fetching category:', error);
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: CategoryPageParams) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'Categoría no encontrada',
      description: 'La categoría que buscas no existe',
    };
  }
  
  return {
    title: `${category.name} | Blog LOGIFIT`,
    description: category.description || `Artículos sobre ${category.name}`,
    openGraph: {
      title: `${category.name} | Blog LOGIFIT`,
      description: category.description || `Artículos sobre ${category.name} en el blog de LOGIFIT`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/categoria/${category.slug}`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }

  if (category.articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8" key="no-articles">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No hay artículos disponibles
          </h2>
          <p className="text-gray-600 mb-6">
            Actualmente no hay artículos publicados en la categoría &quot;{params.slug.replace(/-/g, ' ')}&quot;
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  console.log(`Encontrados ${category.articles.length} artículos para la categoría ${category.name}`);
  
  return (
    <div key={`category-${params.slug}`}>
      <BlogPage 
        initialArticles={category.articles} 
        initialPagination={{ 
          page: 1, 
          pageSize: 9, 
          pageCount: Math.ceil(category.articles.length / 9), 
          total: category.articles.length 
        }} 
        selectedCategory={category.slug} 
      />
    </div>
  );
}