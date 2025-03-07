import { getAllArticles } from '@/lib/api/blog';

interface Category {
  id: number;
  slug?: string;
  attributes?: {
    slug: string;
    name: string;
    updatedAt?: string;
  };
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logifit.com';
  
  interface PaginationParams {
    page?: number;
    pageSize?: number;
  }

  // Obtener todos los artículos con paginación
  const articlesData = await getAllArticles({ page: 1, pageSize: 100 });
  const articles = articlesData.articles || [];
  
  // Crear URLs para artículos
  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  // Obtener todas las categorías
  // Nota: deberías implementar getAllCategories si no lo has hecho ya
  let categories = [];
  try {
    const categoriesData = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`);
    const result = await categoriesData.json();
    categories = result.data || [];
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }
  
  // Crear URLs para categorías
  const categoryUrls = categories.map((category: Category) => ({
    url: `${baseUrl}/blog/categoria/${category.slug || category.attributes?.slug}`,
    lastModified: new Date(category.attributes?.updatedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...articleUrls,
    ...categoryUrls,
  ];
} 