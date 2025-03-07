import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, ChevronRight, Search, Calendar, User, Tag, AlertCircle, SearchIcon, BookOpenIcon, InboxIcon, ArrowLeftIcon
} from "lucide-react";
import { getAllArticles, getAllCategories } from "@/lib/api/blog";
import SEO from '@/components/Seo';
import { formatDate } from '@/lib/utils';
import SearchBar from '@/components/SearchBar';
import { Category, Article } from '@/types/blog';

// Mantén el metadata (esto solo funciona en Server Components)
export const metadata = {
  title: 'Blog | LOGIFIT',
  description: 'Artículos y recursos sobre prevención de fatiga y seguridad en operaciones industriales'
};

export const dynamic = 'force-dynamic';

interface BlogPageProps {
  initialArticles?: any[];
  initialPagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  selectedCategory?: string;
}

export default async function BlogPage({ 
  initialArticles, 
  initialPagination, 
  selectedCategory 
}: BlogPageProps) {
  console.log("Obteniendo artículos del blog...");
  
  const articles = initialArticles || await getAllArticles();
  const categories = await getAllCategories();

  console.log("Estado de los artículos:", {
    totalArticles: articles?.length || 0,
    firstArticle: articles?.[0] ? JSON.stringify(articles[0]).substring(0, 200) + '...' : 'No hay artículos',
    categories: categories?.length || 0
  });

  console.log('BlogPage - Número de artículos:', articles.length);
  console.log('BlogPage - Categoría seleccionada:', selectedCategory);

  // Filtrar artículos si hay una categoría seleccionada y no tenemos artículos iniciales
  const displayedArticles = !initialArticles && selectedCategory
    ? articles.filter(article => 
        article.categories?.some((cat: any) => cat.slug === selectedCategory)
      )
    : articles;

  console.log('BlogPage - Artículos a mostrar:', displayedArticles.length);
  
  if (displayedArticles.length > 0) {
    console.log('BlogPage - Primer artículo a mostrar:', JSON.stringify(displayedArticles[0]).substring(0, 200) + '...');
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Blog LOGIFIT</h1>
            <p className="text-xl mb-8">
              Artículos, guías y recursos sobre prevención de fatiga y seguridad laboral
            </p>
            <div className="relative max-w-xl mx-auto">
              <form action="/blog/buscar" method="get">
                <input
                  type="text"
                  name="q"
                  placeholder="Buscar artículos..."
                  className="w-full px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600"
                  aria-label="Buscar"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full ${
              !selectedCategory ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Todos
          </Link>
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/blog/categoria/${category.slug}`}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.slug 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Artículos Recientes */}
        <h2 className="text-3xl font-bold mb-8">Artículos Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles
            .filter(article => article !== null)
            .map((article) => (
              <div key={article.id} className="flex flex-col h-full">
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
                  {article.featuredImage ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.featuredImage.url}`}
                      alt={article.featuredImage.alternativeText || article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Link href={`/blog/${article.slug}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    {article.author ? (
                      <>
                        <span className="font-medium">{article.author.name}</span>
                        <span className="mx-2">•</span>
                      </>
                    ) : (
                      <span className="font-medium">LOGIFIT</span>
                    )}
                    {article.publishedAt && (
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Paginación */}
        {initialPagination && initialPagination.pageCount > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow">
              {Array.from({ length: initialPagination.pageCount }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/blog${selectedCategory ? `/categoria/${selectedCategory}` : ''}?page=${pageNum}`}
                  className={`px-4 py-2 border ${
                    pageNum === initialPagination.page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}