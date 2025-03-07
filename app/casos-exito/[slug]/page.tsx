import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Briefcase, FileText, CheckCircle } from "lucide-react";

// Definición de tipos para los casos de éxito
interface CaseStudy {
  id: number;
  attributes: {
    title: string;
    slug: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string;
    image?: {
      data?: {
        attributes?: {
          url: string;
        }
      }
    }
  }
}

// Generar parámetros estáticos para las rutas
export async function generateStaticParams() {
  try {
    const caseStudies = await getAllCaseStudies();
    return caseStudies.map((caseStudy: any) => ({
      slug: caseStudy.attributes.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for case studies:", error);
    return []; // Devolver un array vacío si hay un error
  }
}

// Generación de metadatos dinámicos basados en el caso de éxito
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const caseStudy = await getCaseStudyBySlug(params.slug);
    
    if (!caseStudy) {
      return {
        title: 'Caso de éxito no encontrado - LOGIFIT',
        description: 'El caso de éxito que buscas no existe o ha sido movido.',
      };
    }
    
    return {
      title: `${caseStudy.attributes.title} - Casos de Éxito LOGIFIT`,
      description: `Descubre cómo LOGIFIT ayudó a ${caseStudy.attributes.client} a superar sus desafíos de seguridad laboral.`,
    };
  } catch (error) {
    console.error("Error fetching case study metadata:", error);
    return {
      title: 'Casos de Éxito - LOGIFIT',
      description: 'Descubre cómo LOGIFIT ha ayudado a empresas a mejorar su seguridad laboral.',
    };
  }
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  try {
    const caseStudy = await getCaseStudyBySlug(params.slug);
    
    if (!caseStudy) {
      notFound();
    }
    
    return (
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Link href="/casos-exito" className="inline-flex items-center text-blue-100 hover:text-white mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a todos los casos
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{caseStudy.attributes.title}</h1>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center bg-blue-800 bg-opacity-50 px-4 py-2 rounded-full">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>{caseStudy.attributes.client}</span>
                </div>
                <div className="flex items-center bg-blue-800 bg-opacity-50 px-4 py-2 rounded-full">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{caseStudy.attributes.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido Principal */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-[400px] rounded-lg overflow-hidden mb-12">
                <Image
                  src={caseStudy.attributes.image?.data?.attributes?.url || "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}
                  alt={caseStudy.attributes.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-900">
                    <FileText className="h-5 w-5 mr-2" />
                    El Desafío
                  </h2>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: caseStudy.attributes.challenge }} />
                </div>
                
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-900">
                    <FileText className="h-5 w-5 mr-2" />
                    Nuestra Solución
                  </h2>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: caseStudy.attributes.solution }} />
                </div>
                
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-900">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Resultados
                  </h2>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: caseStudy.attributes.results }} />
                </div>
              </div>
              
              <div className="text-center mt-12">
                <h2 className="text-2xl font-bold mb-6">¿Quieres resultados similares para tu empresa?</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/demo">Solicitar Demo</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contacto">Contactar a un especialista</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching case study:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Error al cargar el caso de éxito</h1>
        <p>No se pudo cargar el caso de éxito. Por favor, inténtalo de nuevo más tarde.</p>
        <Button asChild className="mt-4">
          <Link href="/casos-exito">Ver todos los casos de éxito</Link>
        </Button>
      </div>
    );
  }
} 