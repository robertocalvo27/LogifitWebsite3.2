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

// Actualizar la función getCategoryBySlug para usar GraphQL
async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await fetchAPI('', {
      query: `
        query GetArticlesByCategory($slug: String!) {
          categories(filters: { slug: { eq: $slug } }) {
            name
            slug
            description
            articles {
              title
              slug
              excerpt
              content
              featuredImage {
                url
                alternativeText
              }
              author {
                name
                position
              }
              publishedAt
            }
          }
        }
      `,
      variables: {
        slug: slug
      }
    });

    const category = response.data?.categories?.[0];
    if (!category) return null;

    return {
      name: category.name,
      slug: category.slug,
      description: category.description,
      articles: category.articles.map(article => ({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        publishedAt: article.publishedAt,
        featuredImage: article.featuredImage,
        author: article.author
      }))
    };
  } catch (error) {
    console.error('Error:', error);
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