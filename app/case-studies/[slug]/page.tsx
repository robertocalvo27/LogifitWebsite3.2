import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/api';
import { notFound } from 'next/navigation';
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

// Generamos los parámetros estáticos para las rutas
export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  
  return caseStudies.map((caseStudy: any) => ({
    slug: caseStudy.attributes.slug,
  }));
}

// Generamos los metadatos dinámicamente
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  
  if (!caseStudy) {
    return {
      title: 'Caso de éxito no encontrado | Logifit',
      description: 'El caso de éxito que buscas no existe o ha sido eliminado.',
    };
  }
  
  return {
    title: `${caseStudy.attributes.title} | Casos de Éxito | Logifit`,
    description: `Caso de éxito: ${caseStudy.attributes.client} - ${caseStudy.attributes.industry}`,
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  
  if (!caseStudy) {
    notFound();
  }
  
  const imageUrl = caseStudy.attributes.image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${caseStudy.attributes.image.data.attributes.url}`
    : '/placeholder-case-study.jpg';
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
            {caseStudy.attributes.industry}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{caseStudy.attributes.title}</h1>
        <p className="text-xl text-gray-600 mb-8">Cliente: {caseStudy.attributes.client}</p>
        
        <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
          {caseStudy.attributes.image?.data ? (
            <Image 
              src={imageUrl}
              alt={caseStudy.attributes.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {caseStudy.attributes.challenge && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-red-600">Desafío</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: caseStudy.attributes.challenge }} />
            </div>
          )}
          
          {caseStudy.attributes.solution && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-blue-600">Solución</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: caseStudy.attributes.solution }} />
            </div>
          )}
          
          {caseStudy.attributes.results && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-green-600">Resultados</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: caseStudy.attributes.results }} />
            </div>
          )}
        </div>
        
        <div className="mt-8 border-t pt-8 flex justify-between">
          <a 
            href="/case-studies" 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a casos de éxito
          </a>
          
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