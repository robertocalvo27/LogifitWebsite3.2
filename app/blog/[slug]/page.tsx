import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowLeft, Share2, Bookmark, ThumbsUp, Book, Play, Clock } from "lucide-react";
import { getArticleBySlug } from "@/lib/api/blog";
import ArticleSchema from '@/components/ArticleSchema';
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Metadata } from "next";
import SEO from '@/components/Seo';
import ShareButtons from '@/components/ShareButtons';
import DebugImage from '@/components/DebugImage';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import ArticleContent from '@/components/blog/ArticleContent';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StrapiImage from '@/components/StrapiImage';
// import WebinarEmbed from '@/components/blog/WebinarEmbed';
// import ResourceCard from '@/components/blog/ResourceCard';

// Esta línea es crucial - fuerza la renderización dinámica
export const dynamic = 'force-dynamic';

// Interfaces para tipos
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Author {
  id: number;
  name: string;
  position?: string;
  bio?: string;
  photo?: string;
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface FeaturedImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Record<string, ImageFormat>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Resource {
  Title: string;
  Description: string;
  Type: 'documento' | string;
  URL: string | null;
  File: {
    url: string;
    name: string;
  };
  FeaturedImage: {
    url: string;
  };
  Date: string;
}

interface Reel {
  Title: string;
  Description: string;
  Duration: string;
  VideoURL: string;
  ThumbnailURL: {
    url: string;
  } | null;
  PublishedDate: string;
}

interface Webinar {
  Title: string;
  Description: string;
  VideoURL: string;
  Date: string;
  Duration: string;
  Presenter: string;
  FeaturedImage: {
    url: string;
  };
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage: FeaturedImage;
  categories: Category[];
  author: Author | null;
  relatedArticles?: Article[];
  cta?: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    backgroundColor: string;
  }[];
  similarArticles?: Article[];
  webinars?: {
    Title: string;
    Description: string;
    VideoURL: string;
    Date: string;
    Duration: string;
    Presenter: string;
    FeaturedImage: {
      url: string;
    };
  }[];
  resources?: Resource[];
  videoReel?: {
    thumbnail: string;
  };
  videoSnippets?: {
    id: number;
    title: string;
    url: string;
    duration: string;
  }[];
  relatedReels?: {
    id: number;
    title: string;
    thumbnail: string;
    duration: string;
  }[];
  reels?: Reel[];
}

// Actualizar el tipo del artículo para asegurar que coincida con ArticleSchemaProps
interface ArticleData extends Article {
  excerpt: string;
  updatedAt: string;
}

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

interface RelatedArticle {
  slug: string;
  title: string;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Artículo no encontrado',
      description: 'El artículo que buscas no existe',
    };
  }
  
  return {
    title: `${article.title} | Blog LOGIFIT`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.slug}`,
      type: 'article',
    },
  };
}

// Obtener artículos relacionados basados en categorías
async function getRelatedArticles(currentId: number, categoryIds: number[], limit = 3): Promise<Article[]> {
  try {
    if (!categoryIds || categoryIds.length === 0) return [];
    return []; // Devolvemos un array vacío por ahora
  } catch (error) {
    console.error("Error obteniendo artículos relacionados:", error);
    return [];
  }
}

// Función para obtener el color de fondo del CTA
const getBackgroundColor = (color: string | undefined): string => {
  const colorMap: Record<string, string> = {
    'blue-50': '#eff6ff',
    'green-50': '#f0fdf4',
    'red-50': '#fef2f2',
    'yellow-50': '#fffbeb',
    'purple-50': '#faf5ff',
    'gray-50': '#f9fafb',
  };
  
  return colorMap[color || ''] || '#eff6ff';
};

// Añadir esta función helper
function getYouTubeEmbedUrl(url: string): string {
  // Detectar si es un YouTube Short
  if (url.includes('/shorts/')) {
    // Extraer el ID del video
    const videoId = url.split('/shorts/')[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Para videos regulares de YouTube
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Si no se pudo extraer el ID, devolver la URL original
  console.log('No se pudo extraer el ID de YouTube de la URL:', url);
  return url;
}

// Esta función se ejecuta en el servidor en tiempo de build o en cada solicitud en desarrollo
export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    const article = await getArticleBySlug(params.slug);
    
    if (!article) {
      console.error(`Artículo no encontrado: ${params.slug}`);
      return notFound();
    }

    const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.slug}`;
    const imageUrl = article.featuredImage?.url 
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.featuredImage.url}` 
      : undefined;

    // Obtener categorías IDs para artículos relacionados
    const categoryIds = article.categories?.map((cat: Category) => cat.id) || [];
    
    // Obtener artículos relacionados
    const relatedArticles = await getRelatedArticles(article.id, categoryIds, 3);
    
    // Preparar keywords para SEO
    const keywords = [
      'prevención de fatiga',
      'seguridad laboral',
      'turnos rotativos',
      'monitoreo de fatiga',
      ...(article.categories?.map((cat: Category) => cat.name) || [])
    ].join(', ');
    
    // Extraer y formatear los datos que necesitamos para la UI
    const formattedDate = article.publishedAt ? formatDate(article.publishedAt) : '';
    
    // Calcular el tiempo de lectura
    const readingTime = calculateReadingTime(article.content);
    
    // Datos para el esquema de breadcrumb
    const breadcrumbItems = [
      { name: 'Inicio', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: article.title, url: `/blog/${article.slug}` },
    ];
    
    console.log(`Obteniendo artículo con slug: ${params.slug}`);
    console.log("Artículo obtenido:", JSON.stringify(article, null, 2).substring(0, 300) + "...");

    // Añadir log para depuración
    console.log('Datos del artículo cargados:', {
      title: article.title,
      hasWebinars: article.webinars ? 'yes' : 'no',
      webinarsCount: article.webinars?.length,
      hasResources: article.resources ? 'yes' : 'no',
      resourcesCount: article.resources?.length,
      hasReels: article.reels ? 'yes' : 'no',
      reelsCount: article.reels?.length,
      hasRelatedArticles: article.related_articles ? 'yes' : 'no',
      relatedArticlesCount: article.related_articles?.length,
      hasCta: article.cta ? 'yes' : 'no'
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna Principal - ajustada a 2/3 del ancho */}
          <main className="lg:w-2/3">
            {/* Hero Section mejorado */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-lg mb-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Volver al blog
              </Link>

              <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
              
              <div className="flex items-center text-blue-100 text-sm">
                {article.author && (
                  <>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{article.author.name}</span>
                    </span>
                    <span className="mx-3">•</span>
                  </>
                )}
                {article.publishedAt && (
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </span>
                )}
              </div>

              {/* Video Reel Preview */}
              {article.videoReel && (
                <div className="mt-6 relative aspect-[9/16] max-w-[400px] mx-auto rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center group cursor-pointer">
                    <div className="bg-white/90 rounded-full p-4 transform transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="absolute bottom-4 left-4 text-white text-sm font-medium">
                      Ver resumen en video • 60s
                    </span>
                  </div>
                  <Image
                    src={article.videoReel.thumbnail}
                    alt="Video preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <article>
              <div>
                <BreadcrumbSchema items={breadcrumbItems} />
                <SEO 
                  title={article.title}
                  description={article.excerpt || `${article.title} - LOGIFIT ofrece soluciones para prevenir la fatiga en entornos laborales exigentes.`}
                  image={imageUrl}
                  article={true}
                  keywords={keywords}
                />
                <ArticleSchema
                  title={article.title}
                  description={article.excerpt}
                  image={imageUrl}
                  authorName={article.author?.name || 'LOGIFIT'}
                  authorBio={article.author?.bio}
                  datePublished={article.publishedAt}
                  dateModified={article.updatedAt}
                  url={articleUrl}
                />
                
                {/* Main Content - Simplificado */}
                <div className="py-8">
                  {article.featuredImage && (
                    <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
                      <StrapiImage
                        image={article.featuredImage}
                        alt={article.title}
                        width={800}
                        height={400}
                        className="object-cover"
                        priority={true}
                        objectFit="cover"
                      />
                    </div>
                  )}
                  
                  <div className="prose max-w-none">
                    <ArticleContent 
                      content={article.content}
                      videoSnippets={article.videoSnippets}
                      renderVideoSnippet={(video) => (
                        <div className="my-8 relative aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={video.url}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                    />
                  </div>

                  {/* Author and social buttons */}
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    {article.author && (
                      <div className="text-sm text-gray-600 mb-6">
                        <strong>Sobre el autor:</strong> {article.author.bio}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-slate-600 hover:text-blue-700">
                          <ThumbsUp className="h-5 w-5 mr-1" />
                          <span>Me gusta</span>
                        </button>
                        <button className="flex items-center text-slate-600 hover:text-blue-700">
                          <Share2 className="h-5 w-5 mr-1" />
                          <span>Compartir</span>
                        </button>
                        <button className="flex items-center text-slate-600 hover:text-blue-700">
                          <Bookmark className="h-5 w-5 mr-1" />
                          <span>Guardar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar - ajustado a 1/3 del ancho */}
          <aside className="lg:w-1/3 space-y-6">
            {/* Webinars relacionados */}
            {article.webinars && article.webinars.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Webinars relacionados</h3>
                <div className="space-y-4">
                  {article.webinars.map((webinar: Webinar, index: number) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div className="border border-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                          <div className="relative aspect-video bg-gray-100">
                            {webinar.FeaturedImage && (
                              <StrapiImage
                                image={webinar.FeaturedImage}
                                alt={webinar.Title}
                                className="object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center">
                              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90">
                                <Play className="w-6 h-6 text-blue-600" />
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-semibold text-lg mb-2">{webinar.Title}</h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {webinar.Description}
                            </p>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(webinar.Date).toLocaleDateString('es-ES', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {webinar.Duration} min
                              </span>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      
                      <DialogContent className="sm:max-w-[800px] h-[80vh] p-4">
                        <div className="flex flex-col h-full">
                          <div className="flex-grow relative">
                            <iframe
                              src={getYouTubeEmbedUrl(webinar.VideoURL)}
                              className="w-full h-full absolute inset-0 rounded-lg"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="mt-4 flex-shrink-0">
                            <h4 className="font-semibold text-xl mb-2">{webinar.Title}</h4>
                            <p className="text-gray-600 mb-3">{webinar.Description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {webinar.Presenter}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(webinar.Date).toLocaleDateString('es-ES')}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {webinar.Duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            )}

            {/* Recursos relacionados */}
            {article.resources && article.resources.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Recursos relacionados</h3>
                <div className="space-y-4">
                  {article.resources.map((resource: Resource, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0 relative w-12 h-12">
                        {resource.FeaturedImage && (
                          <StrapiImage
                            image={resource.FeaturedImage}
                            alt={resource.Title}
                            width={48}
                            height={48}
                            className="object-cover rounded-lg"
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium text-gray-900">{resource.Title}</h4>
                        <p className="text-sm text-gray-500 mb-2">{resource.Description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            {new Date(resource.Date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <a 
                            href={resource.File && resource.File.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${resource.File.url}` : resource.URL || '#'}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                          >
                            {resource.Type === 'documento' ? (
                              <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Descargar {resource.File?.name ? resource.File.name.split('.').pop()?.toUpperCase() : 'Documento'}
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Ver recurso
                              </>
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reels relacionados */}
            {article.reels && article.reels.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Reels relacionados</h3>
                <div className="grid grid-cols-2 gap-4">
                  {article.reels.map((reel: Reel, index: number) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer">
                          {reel.ThumbnailURL ? (
                            <StrapiImage
                              image={reel.ThumbnailURL}
                              alt={reel.Title}
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700" />
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                            <p className="text-white text-sm font-medium line-clamp-2">
                              {reel.Title}
                            </p>
                            <span className="text-white/80 text-xs flex items-center mt-1">
                              <Play className="w-3 h-3 mr-1" />
                              {reel.Duration}s
                            </span>
                          </div>
                        </div>
                      </DialogTrigger>
                      
                      <DialogContent className="sm:max-w-[400px] h-[80vh] p-4">
                        <div className="flex flex-col h-full">
                          <div className="flex-grow relative">
                            <iframe
                              src={getYouTubeEmbedUrl(reel.VideoURL)}
                              className="w-full h-full absolute inset-0 rounded-lg"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="mt-4 flex-shrink-0">
                            <h4 className="font-semibold text-lg">{reel.Title}</h4>
                            <p className="text-sm text-gray-600 mt-2">{reel.Description}</p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {new Date(reel.PublishedDate).toLocaleDateString('es-ES')}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            )}

            {/* Artículos relacionados */}
            {article.related_articles && article.related_articles.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Artículos relacionados</h3>
                <div className="space-y-4">
                  {article.related_articles.map((relatedArticle: Article, index: number) => (
                    <div key={index} className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded">
                        {relatedArticle.featuredImage ? (
                          <StrapiImage
                            image={relatedArticle.featuredImage}
                            alt={relatedArticle.title}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                            <Book className="h-8 w-8 text-blue-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Link 
                          href={`/blog/${relatedArticle.slug}`} 
                          className="text-lg font-medium text-gray-900 hover:text-blue-600 transition line-clamp-2"
                        >
                          {relatedArticle.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                        <time 
                          dateTime={relatedArticle.publishedAt}
                          className="text-sm text-gray-500 mt-2 block"
                        >
                          {new Date(relatedArticle.publishedAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {article.cta && (
              <div 
                className={`rounded-lg p-6 ${
                  article.cta.backgroundColor === 'blue-50' 
                    ? 'bg-blue-50' 
                    : 'bg-gray-50'
                }`}
              >
                <h3 className="text-xl font-bold mb-2">
                  {article.cta.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {article.cta.description}
                </p>
                <Link 
                  href={`/${article.cta.buttonUrl}`}
                  className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors"
                >
                  {article.cta.buttonText}
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error al cargar el artículo:", error);
    return notFound();
  }
}