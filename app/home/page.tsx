import { getAllServices, getAllTestimonials, getAllCaseStudies, getHomePage } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Logifit - Soluciones Logísticas Integrales',
  description: 'Ofrecemos servicios logísticos de alta calidad para optimizar tu cadena de suministro.',
};

export default async function HomePage() {
  // Obtenemos los datos de Strapi
  const services = await getAllServices();
  const testimonials = await getAllTestimonials();
  const caseStudies = await getAllCaseStudies();
  
  // Intentamos obtener los datos de la página de inicio
  let homeData;
  try {
    homeData = await getHomePage();
  } catch (error) {
    console.error('Error al obtener datos de la página de inicio:', error);
    homeData = null;
  }
  
  // Datos predeterminados en caso de que no se puedan obtener de Strapi
  const defaultHero = {
    title: 'Soluciones Logísticas Integrales',
    subtitle: 'Optimizamos tu cadena de suministro con servicios personalizados',
    cta: 'Conoce nuestros servicios',
  };
  
  // Usamos los datos de Strapi o los predeterminados
  const hero = homeData?.hero || defaultHero;
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {hero.title}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/servicios" 
                className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {hero.cta}
              </Link>
              <Link 
                href="/contact" 
                className="border border-white text-white hover:bg-blue-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-950 opacity-30"></div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones logísticas adaptadas a las necesidades específicas de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <p className="text-center col-span-3 py-8 text-gray-500">No hay servicios disponibles en este momento.</p>
            ) : (
              services.slice(0, 3).map((service: any) => {
                if (!service || !service.attributes) return null;
                
                const imageUrl = service.attributes.image?.data?.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.attributes.image.data.attributes.url}`
                  : '/placeholder-service.jpg';
                  
                return (
                  <Link 
                    href={`/servicios/${service.attributes.slug}`}
                    key={service.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      {service.attributes.image?.data ? (
                        <Image 
                          src={imageUrl}
                          alt={service.attributes.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">Sin imagen</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{service.attributes.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{service.attributes.description}</p>
                      <div className="text-blue-600 font-medium flex items-center">
                        Ver detalles
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link 
                href="/servicios"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md inline-flex items-center"
              >
                Ver todos los servicios
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre por qué nuestros clientes confían en nosotros para sus necesidades logísticas.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {testimonials.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No hay testimonios disponibles en este momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.slice(0, 2).map((testimonial: any) => {
                  const imageUrl = testimonial.attributes.image?.data?.attributes?.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${testimonial.attributes.image.data.attributes.url}`
                    : '/placeholder-avatar.jpg';
                    
                  return (
                    <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                          {testimonial.attributes.image?.data ? (
                            <Image 
                              src={imageUrl}
                              alt={testimonial.attributes.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Sin foto</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-gray-700 italic mb-4">"{testimonial.attributes.quote}"</p>
                          <div>
                            <h3 className="font-semibold text-lg">{testimonial.attributes.name}</h3>
                            <p className="text-gray-600">
                              {testimonial.attributes.position}, {testimonial.attributes.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/testimonials" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver todos los testimonios
            </Link>
          </div>
        </div>
      </section>

      {/* Casos de Éxito */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Casos de Éxito</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre cómo hemos ayudado a nuestros clientes a optimizar sus operaciones logísticas.
            </p>
          </div>

          {caseStudies.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No hay casos de éxito disponibles en este momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.slice(0, 3).map((caseStudy: any) => {
                const imageUrl = caseStudy.attributes.image?.data?.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${caseStudy.attributes.image.data.attributes.url}`
                  : '/placeholder-case-study.jpg';
                  
                return (
                  <Link 
                    href={`/case-studies/${caseStudy.attributes.slug}`}
                    key={caseStudy.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      {caseStudy.attributes.image?.data ? (
                        <Image 
                          src={imageUrl}
                          alt={caseStudy.attributes.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">Sin imagen</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2 inline-block">
                        {caseStudy.attributes.industry}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{caseStudy.attributes.title}</h3>
                      <p className="text-gray-600 mb-4">Cliente: {caseStudy.attributes.client}</p>
                      <div className="text-blue-600 font-medium flex items-center">
                        Ver caso completo
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link 
              href="/case-studies" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Ver todos los casos de éxito
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para optimizar tu logística?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Contáctanos hoy mismo para descubrir cómo podemos ayudarte a mejorar tus operaciones logísticas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contactar ahora
              </Link>
              <Link 
                href="/servicios" 
                className="border border-white text-white hover:bg-blue-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 