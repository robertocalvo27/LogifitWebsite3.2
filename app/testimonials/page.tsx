import { getAllTestimonials } from '@/lib/api';
import Image from 'next/image';
import { Metadata } from 'next';

// Definimos la interfaz para el tipo Testimonial
interface TestimonialAttributes {
  name: string;
  position: string;
  company: string;
  quote: string;
  image?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
}

interface Testimonial {
  id: string | number;
  attributes: TestimonialAttributes;
}

export const metadata: Metadata = {
  title: 'Testimonios | Logifit',
  description: 'Descubre lo que nuestros clientes dicen sobre nuestros servicios logísticos.',
};

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Testimonios de Clientes</h1>
      
      <div className="max-w-4xl mx-auto">
        {testimonials.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No hay testimonios disponibles en este momento.</p>
        ) : (
          <div className="space-y-8">
            {testimonials.map((testimonial: Testimonial) => {
              const imageUrl = testimonial.attributes.image?.data?.attributes?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${testimonial.attributes.image.data.attributes.url}`
                : '/placeholder-avatar.jpg';
                
              return (
                <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
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
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Quieres compartir tu experiencia?</h2>
          <p className="text-gray-600 mb-6">Nos encantaría escuchar sobre tu experiencia con nuestros servicios.</p>
          <a 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>
    </div>
  );
} 