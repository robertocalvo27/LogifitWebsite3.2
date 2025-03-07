import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Battery, BarChart3, Award, ChevronRight, Smartphone, MapPin, Users, TrendingUp, Globe, Lightbulb, BookOpen, FileText } from "lucide-react";
import { getAllServices, getFeaturedServices, getAppHighlightService } from '@/lib/api';
import { getActiveHero } from '@/lib/api/home';
import { getLatestBlogPosts } from '@/lib/api/blog';
import Link from 'next/link';
import { HeroCarousel } from '@/components/hero/hero-carousel'

// Primero definimos la interfaz para el servicio
interface HomepageService {
  id: number;
  title: string;
  description: string;
  homePosition: number;
  image?: {
    url: string;
    alternativeText?: string;
  };
  homeImage?: {
    url: string;
    alternativeText?: string;
  };
  slug?: string;
  Title?: string; // Para compatibilidad con datos antiguos
  // Añadir cualquier otra propiedad que estemos usando en el template
}

interface HeroButton {
  text: string;
  url: string;
  variant: 'primary' | 'secondary';
}

interface HeroSlide {
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
  mediaType: 'image' | 'video';
  image?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      }
    }
  };
  video?: {
    data?: {
      attributes: {
        url: string;
      }
    }
  };
  imagePosition: 'left' | 'right' | 'center';
  ctaButtons: HeroButton[];
}

interface Hero {
  name: string;
  isActive: boolean;
  displayType: 'static' | 'carousel' | 'slider';
  autoplayInterval: number;
  slides: HeroSlide[];
}

// Función auxiliar para manejar imágenes de forma segura
function getSafeImageUrl(imageData: any): string {
  // Imágenes de placeholder por defecto
  const placeholderImages = [
    "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580983218765-f663bec07b37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  ];
  
  // Retornar una imagen de placeholder aleatoria
  return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
}

// Función para normalizar los datos de servicios
function normalizeServiceData(service: any) {
  // Si el servicio tiene estructura de la nueva API
  if (service.attributes) {
    return {
      id: service.id || Math.random().toString(36).substring(7),
      title: service.attributes.title || 'Solución',
      description: service.attributes.description || 'Sin descripción',
      slug: service.attributes.slug || `solucion-${service.id || Math.random().toString(36).substring(7)}`,
    };
  }
  
  // Si el servicio tiene estructura antigua
  if (service.Title) {
    return {
      id: service.id || Math.random().toString(36).substring(7),
      title: service.Title || 'Solución',
      description: service.Description || 'Sin descripción',
      slug: service.slug || `solucion-${service.id || Math.random().toString(36).substring(7)}`,
    };
  }
  
  // Estructura por defecto si no coincide con ninguna
  return {
    id: service.id || Math.random().toString(36).substring(7),
    title: 'Solución',
    description: 'Sin descripción',
    slug: `solucion-${Math.random().toString(36).substring(7)}`,
  };
}

function normalizeHomepageService(service: any) {
  if (!service) return null;
  
  // Añadir logs para depuración
  console.log(`[DEBUG] Normalizando servicio:`, JSON.stringify({
    id: service.id,
    title: service.Title || service.title || "",
    slug: service.slug || "",
    rawData: service
  }, null, 2));
  
  return {
    id: service.id,
    title: service.Title || service.title || "",
    slug: service.slug || "", // Asegurarse de que el slug se está extrayendo correctamente
    description: service.homeDescription || service.Description || service.description || "",
    image: service.homeImage?.url || service.Image?.url || '',
    homePosition: service.homePosition || 0
  };
}

export default async function Home() {
  try {
    console.log('Iniciando carga de página...');
    
    const hero = await getActiveHero();
    console.log('Hero cargado:', hero);

    let allServices = [];
    
    try {
      allServices = await getAllServices();
      
      // Logs para debugging
      console.log('Estado de las llamadas API:');
      console.log('Services:', allServices);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
    
    // Log para ver qué valores se están usando
    console.log('Valores finales del hero:');
    console.log('Title:', hero?.slides[0]?.title || "Prevención de accidentes por fatiga y somnolencia");
    console.log('Subtitle:', hero?.slides[0]?.subtitle || "Tecnología + Servicio Preventivo...");
    
    // Usar los datos del hero dinámico o mantener el contenido estático como fallback
    const heroTitle = hero?.slides[0]?.title || "Prevención de accidentes por fatiga y somnolencia";
    const heroSubtitle = hero?.slides[0]?.subtitle || "Tecnología + Servicio Preventivo que protege a miles de personal clave en América Latina";
    
    // Obtener servicios destacados para la página principal
    const featuredServicesData = await getFeaturedServices();
    const featuredServices = featuredServicesData
      .map(normalizeHomepageService)
      .filter(Boolean)
      .sort((a: HomepageService, b: HomepageService) => a.homePosition - b.homePosition);

    // Obtener el servicio destacado para la app (opcional, usando la opción 2)
    const appHighlightService = await getAppHighlightService();
    const appService = appHighlightService ? normalizeHomepageService(appHighlightService) : null;

    // Obtener los últimos artículos del blog
    console.log('Intentando obtener últimos posts del blog...');
    let latestBlogPosts = [];
    try {
      latestBlogPosts = await getLatestBlogPosts(3);
      console.log('Posts obtenidos:', latestBlogPosts);
    } catch (error) {
      console.error('Error al obtener posts del blog:', error);
      // Usar posts de ejemplo en caso de error
      latestBlogPosts = [
        {
          id: 1,
          title: "Cómo la fatiga afecta la seguridad en operaciones mineras",
          slug: "fatiga-seguridad-operaciones-mineras",
          excerpt: "Descubre cómo la fatiga impacta en la seguridad de las operaciones mineras y qué medidas preventivas implementar.",
          publishedAt: "2025-02-15T10:00:00.000Z",
          categories: [{ name: "Seguridad Industrial", slug: "seguridad-industrial" }],
          author: { name: "Carlos Rodríguez" }
        },
        {
          id: 2,
          title: "5 tecnologías que están revolucionando la gestión de fatiga",
          slug: "tecnologias-revolucionando-gestion-fatiga",
          excerpt: "Analizamos las 5 tecnologías más innovadoras que están transformando la forma en que las empresas gestionan la fatiga laboral.",
          publishedAt: "2025-01-28T14:30:00.000Z",
          categories: [{ name: "Tecnología", slug: "tecnologia" }],
          author: { name: "Ana Martínez" }
        },
        {
          id: 3,
          title: "Normativa internacional sobre gestión de fatiga en transporte",
          slug: "normativa-internacional-gestion-fatiga-transporte",
          excerpt: "Guía completa sobre las regulaciones internacionales que rigen la gestión de fatiga en el sector transporte.",
          publishedAt: "2025-01-10T09:15:00.000Z",
          categories: [{ name: "Normativa", slug: "normativa" }],
          author: { name: "Roberto Méndez" }
        }
      ];
    }

    // Añadir log para debug
    console.log('Latest blog posts:', latestBlogPosts);

    return (
      <div className="flex flex-col min-h-screen">
        <HeroCarousel hero={hero} />

        {/* Qué es LOGIFIT y su propuesta de valor */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">¿Qué es LOGIFIT?</h2>
                <p className="text-lg text-slate-600 mb-4">
                  LOGIFIT es una empresa líder en soluciones integrales para la prevención y gestión de fatiga laboral, combinando tecnología de vanguardia con servicios preventivos especializados.
                </p>
                <p className="text-lg text-slate-600 mb-6">
                  Nuestra misión es proteger la vida de los trabajadores en entornos de alto riesgo, reduciendo accidentes causados por fatiga y somnolencia a través de un enfoque preventivo y personalizado.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Nuestra Propuesta de Valor</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                      <Lightbulb className="h-4 w-4 text-blue-700" />
                    </div>
                    <span className="text-slate-700">Soluciones integrales que combinan hardware, software y servicio humano</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                      <Lightbulb className="h-4 w-4 text-blue-700" />
                    </div>
                    <span className="text-slate-700">Tecnología adaptada a las necesidades específicas de cada industria</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                      <Lightbulb className="h-4 w-4 text-blue-700" />
                    </div>
                    <span className="text-slate-700">Enfoque preventivo que anticipa y evita accidentes antes de que ocurran</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                      <Lightbulb className="h-4 w-4 text-blue-700" />
                    </div>
                    <span className="text-slate-700">Experiencia especializada en el contexto latinoamericano</span>
                  </li>
                </ul>
                
                <Button asChild>
                  <Link href="/nosotros">Conocer más sobre LOGIFIT</Link>
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Propuesta de valor LOGIFIT"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Innovación Tecnológica */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Innovación Tecnológica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service: HomepageService) => (
                <div key={service.slug} className="bg-white rounded-lg shadow-lg p-6">
                  {service.homeImage && (
                    <img 
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.homeImage.url}`}
                      alt={service.homeImage.alternativeText || service.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impacto Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestro Impacto</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Transformamos la seguridad laboral con soluciones que generan resultados medibles y significativos para empresas en toda América Latina.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-md text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <Users className="h-8 w-8 text-blue-700" />
                    </div>
                    <h3 className="text-3xl font-bold text-blue-900 mb-2">15,000+</h3>
                    <p className="text-slate-600">
                      Personal protegido por nuestras soluciones
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <TrendingUp className="h-8 w-8 text-blue-700" />
                    </div>
                    <h3 className="text-3xl font-bold text-blue-900 mb-2">78%</h3>
                    <p className="text-slate-600">
                      Reducción promedio de incidentes por fatiga
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <Globe className="h-8 w-8 text-blue-700" />
                    </div>
                    <h3 className="text-3xl font-bold text-blue-900 mb-2">5</h3>
                    <p className="text-slate-600">
                      Países con operaciones activas
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <BarChart3 className="h-8 w-8 text-blue-700" />
                    </div>
                    <h3 className="text-3xl font-bold text-blue-900 mb-2">30%</h3>
                    <p className="text-slate-600">
                      Mejora promedio en productividad
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Servicios Destacados - Sección nueva que muestra servicios de Strapi */}
        {featuredServices.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Nuestras Soluciones</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Descubre nuestras soluciones especializadas para la prevención de fatiga y somnolencia
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredServices.slice(0, 3).map((service: HomepageService, index: number) => {
                  const normalizedService = normalizeServiceData(service);
                  const placeholderImages = [
                    "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1580983218765-f663bec07b37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  ];
                  
                  return (
                    <Card key={normalizedService.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={placeholderImages[index % placeholderImages.length]}
                          alt={normalizedService.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{normalizedService.title}</h3>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {normalizedService.description}
                        </p>
                        <Button asChild size="sm">
                          <Link href={`/soluciones/${normalizedService.slug}`}>
                            Ver más
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="mt-12 text-center">
                <Button asChild>
                  <Link href="/soluciones">Ver todas las soluciones</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Beneficios Clave */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Beneficios Clave</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Prevención Proactiva</h3>
                    <p className="text-slate-600">
                      Anticipamos y prevenimos accidentes antes de que ocurran con tecnología predictiva.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <Clock className="h-8 w-8 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Detección en Tiempo Real</h3>
                    <p className="text-slate-600">
                      Cámaras DMS/ADAS que detectan microsueños y fatiga al instante, emitiendo alertas inmediatas.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <Battery className="h-8 w-8 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Wearables Resistentes</h3>
                    <p className="text-slate-600">
                      Dispositivos con batería de hasta 20 días, resistentes al agua y condiciones extremas.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <BarChart3 className="h-8 w-8 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Plataforma Completa</h3>
                    <p className="text-slate-600">
                      Acceso a informes detallados y dashboards en tiempo real desde web y aplicación móvil.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Blog LOGIFIT</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Compartimos conocimiento especializado sobre prevención de fatiga.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestBlogPosts && latestBlogPosts.length > 0 ? (
                latestBlogPosts.map((post: any) => (
                  <Card key={post.slug} className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative h-48">
                        {post.featuredImage?.url && (
                          <Image
                            src={post.featuredImage.url.startsWith('http') 
                              ? post.featuredImage.url 
                              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.featuredImage.url}`}
                            alt={post.featuredImage.alt || post.title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-t-lg"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        {post.categories?.[0] && (
                          <div className="flex items-center mb-2">
                            <BookOpen className="h-4 w-4 text-blue-700 mr-2" />
                            <span className="text-sm text-blue-700">{post.categories[0].name}</span>
                          </div>
                        )}
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                          <Link href={`/blog/${post.slug}`} className="text-blue-700 hover:text-blue-900 flex items-center">
                            Leer más <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <>
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">Cómo la fatiga afecta la seguridad en operaciones mineras</h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">
                          Descubre cómo la fatiga impacta en la seguridad de las operaciones mineras y qué medidas preventivas implementar.
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">15 de febrero, 2025</span>
                          <Link href="/blog" className="text-blue-700 hover:text-blue-900 flex items-center">
                            Leer más <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">5 tecnologías que están revolucionando la gestión de fatiga</h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">
                          Analizamos las 5 tecnologías más innovadoras que están transformando la forma en que las empresas gestionan la fatiga laboral.
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">28 de enero, 2025</span>
                          <Link href="/blog" className="text-blue-700 hover:text-blue-900 flex items-center">
                            Leer más <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">Normativa internacional sobre gestión de fatiga en transporte</h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">
                          Guía completa sobre las regulaciones internacionales que rigen la gestión de fatiga en el sector transporte.
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">10 de enero, 2025</span>
                          <Link href="/blog" className="text-blue-700 hover:text-blue-900 flex items-center">
                            Leer más <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Empresas líderes confían en LOGIFIT para proteger a su personal clave y reducir accidentes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-full mr-4">
                        <Award className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-semibold">Carlos Rodríguez</p>
                        <p className="text-sm text-slate-500">Gerente HSE, Minera Quellaveco</p>
                      </div>
                    </div>
                    <p className="text-slate-600 italic">
                      "Desde que implementamos LOGIFIT, hemos reducido los incidentes por fatiga en un 75%. La combinación de wearables y monitoreo en tiempo real ha sido clave para la seguridad de nuestro personal."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-full mr-4">
                        <Award className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-semibold">María Fernández</p>
                        <p className="text-sm text-slate-500">Directora de Operaciones, CUMBRA</p>
                      </div>
                    </div>
                    <p className="text-slate-600 italic">
                      "La plataforma de LOGIFIT nos permite tomar decisiones basadas en datos reales. El servicio preventivo y las alertas tempranas han mejorado significativamente la seguridad en nuestras operaciones."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/demo">Agenda una demostración</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Experiencia Latinoamericana */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Experiencia Latinoamericana</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Entendemos los desafíos específicos de cada región y adaptamos nuestras soluciones al contexto local.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Perú</h3>
                      <p className="text-slate-500">Minería y Transporte</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Soluciones adaptadas para operaciones mineras en altura, condiciones extremas y rutas de transporte desafiantes en la cordillera.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      "LOGIFIT entiende perfectamente los desafíos de la minería peruana."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Chile</h3>
                      <p className="text-slate-500">Minería y Construcción</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Experiencia en normativas chilenas de seguridad laboral y soluciones para la industria minera con los más altos estándares.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      "Su conocimiento de la normativa chilena ha sido clave para nuestra implementación."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Centroamérica y México</h3>
                      <p className="text-slate-500">Transporte y Logística</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Soluciones para flotas de transporte en largas distancias y condiciones climáticas variables, adaptadas a la realidad centroamericana.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      "Han adaptado su tecnología a nuestras necesidades específicas en México."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="/industrias">Conocer más sobre nuestras soluciones por región</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Canales Clave */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Comunidad</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Mantente actualizado con las últimas tendencias en prevención de fatiga y seguridad laboral a través de nuestros canales especializados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Grupo WhatsApp</h3>
                    <p className="text-slate-600 mb-4">
                      Únete a nuestro grupo de especialistas en seguridad laboral y recibe consejos prácticos y actualizaciones.
                    </p>
                    <Button asChild variant="outline">
                      <Link href="#">Unirse al Grupo</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                    <p className="text-slate-600 mb-4">
                      Sigue nuestra página para contenido exclusivo sobre prevención de fatiga y casos de éxito.
                    </p>
                    <Button asChild variant="outline">
                      <Link href="#">Seguir en LinkedIn</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Canal YouTube</h3>
                    <p className="text-slate-600 mb-4">
                      Tutoriales, webinars y entrevistas con expertos en seguridad y prevención de fatiga.
                    </p>
                    <Button asChild variant="outline">
                      <Link href="#">Suscribirse</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-blue-50 p-8 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-bold mb-2">Boletín Especializado</h3>
                  <p className="text-slate-600">
                    Recibe mensualmente las últimas tendencias en prevención de fatiga y seguridad laboral.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="email" 
                      placeholder="Tu correo electrónico" 
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button>Suscribirse</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error en Home:', error);
    return <div>Error al cargar la página</div>;
  }
}
