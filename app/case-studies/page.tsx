import { getAllCaseStudies } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

// Definimos la interfaz para el tipo CaseStudy
interface CaseStudyAttributes {
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge?: string;
  solution?: string;
  results?: string;
  image?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
}

interface CaseStudy {
  id: string | number;
  attributes: CaseStudyAttributes;
}

export const metadata: Metadata = {
  title: 'Casos de Éxito | Logifit',
  description: 'Descubre cómo hemos ayudado a nuestros clientes a optimizar sus operaciones logísticas.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Casos de Éxito</h1>
      
      {caseStudies.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No hay casos de éxito disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy: CaseStudy) => {
            const imageUrl = caseStudy.attributes.image?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${caseStudy.attributes.image.data.attributes.url}`
              : '/placeholder-case-study.jpg';
              
            return (
              <Link 
                href={`/case-studies/${caseStudy.attributes.slug}`}
                key={caseStudy.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56 w-full">
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
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold">{caseStudy.attributes.title}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {caseStudy.attributes.industry}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">Cliente: {caseStudy.attributes.client}</p>
                  
                  <div className="mt-4 text-blue-600 font-medium flex items-center">
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
    </div>
  );
} 