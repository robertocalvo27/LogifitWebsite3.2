import Link from 'next/link';
import Image from 'next/image';
import { searchArticles } from '@/lib/api/blog';
import { BookOpen } from 'lucide-react';

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

interface SearchArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featuredImage?: {
    url: string;
    alternativeText?: string;
  };
  author?: {
    name: string;
  };
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
}

export const dynamic = 'force-dynamic';

export default async function SearchResultsPage({ 
  searchParams 
}: SearchPageProps) {
  const query = searchParams?.q || '';
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  
  // Usar el nuevo servicio de búsqueda
  const { articles, pagination } = await searchArticles(query, page, 12);
  
  return (
    <>
      {/* Hero Section Minimalista */}
      <div className="bg-blue-800 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Resultados de búsqueda</h1>
          <p className="text-blue-100">
            {articles.length} 
            {articles.length === 1 ? ' resultado' : ' resultados'} para "{query}"
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: SearchArticle) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <Link href={`/blog/${article.slug}`}>
                  <div className="relative h-48">
                    {article.featuredImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.featuredImage.url}`}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </Link>
                
                <div className="p-6">
                  {article.categories && article.categories.length > 0 && (
                    <div className="mb-2">
                      <Link 
                        href={`/blog/categoria/${article.categories[0].slug}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {article.categories[0].name}
                      </Link>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">
                    <Link href={`/blog/${article.slug}`} className="hover:text-blue-600 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt || "Descubre más sobre este interesante tema."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <Link 
                      href={`/blog/${article.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Leer más
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">No se encontraron resultados</h2>
            <p className="text-gray-600 mb-6">
              No hemos encontrado artículos que coincidan con tu búsqueda.
            </p>
            <Link 
              href="/blog" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Volver al blog
            </Link>
          </div>
        )}
        
        {/* Paginación */}
        {pagination && pagination.pageCount > 1 && (
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center shadow-sm">
              {Array.from({ length: pagination.pageCount }).map((_, i) => (
                <Link
                  key={i}
                  href={`/blog/buscar?q=${query}&page=${i + 1}`}
                  className={`px-4 py-2 border ${
                    page === i + 1 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  } ${i === 0 ? 'rounded-l-md' : ''} ${
                    i === pagination.pageCount - 1 ? 'rounded-r-md' : ''
                  }`}
                  aria-current={page === i + 1 ? 'page' : undefined}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 