import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Watch, Camera, LayoutDashboard, Headphones, Bed,
  Shield, Clock, Battery, BarChart3, ChevronRight, Smartphone, HeartPulse, LifeBuoy
} from "lucide-react";
import { getAllServices, getServiceBySlug } from "@/lib/api";
import { Metadata } from 'next';
import { ProductCard } from "@/components/products/ProductCard"

export const metadata: Metadata = {
  title: 'Soluciones - LOGIFIT',
  description: 'Conoce nuestras soluciones innovadoras para la prevención y gestión de fatiga y somnolencia en entornos laborales.',
};

// Definir la interfaz para el servicio
interface Service {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  category: string;
  order: number;
  features: string[];
  benefits: string[];
  Image?: {
    url: string;
  };
  icon?: string;
}

// Datos de respaldo completos para todos los servicios
const fallbackServices = [
  {
    id: 1,
    title: "Wearables Inteligentes",
    slug: "wearables-inteligentes",
    description: "Nuestros dispositivos wearables monitorean constantemente los signos vitales y patrones de sueño para detectar fatiga antes de que se convierta en un riesgo.",
    category: "Before Driving",
    order: 1,
    features: [
      "Monitoreo de sueño, frecuencia cardiaca y oxígeno en sangre",
      "Batería de larga duración (hasta 20 días)",
      "Resistentes al agua y condiciones extremas"
    ],
    benefits: [
      "Detección temprana de fatiga",
      "Prevención proactiva de accidentes"
    ],
    image: "",
    icon: ""
  },
  {
    id: 3,
    title: "Cámaras de Monitoreo en Cabina",
    slug: "camaras-monitoreo-cabina",
    description: "Nuestras cámaras inteligentes detectan signos de fatiga y distracciones en tiempo real, alertando al conductor para prevenir accidentes.",
    category: "During Drive",
    order: 2,
    features: [
      "Detección de microsueños y distracciones",
      "Alertas sonoras y visuales inmediatas",
      "Funciona en condiciones de baja iluminación"
    ],
    benefits: [
      "Prevención de accidentes en tiempo real",
      "Monitoreo continuo durante la conducción"
    ],
    image: "",
    icon: ""
  },
  {
    id: 5,
    title: "Dashboard de Gestión de Fatiga",
    slug: "dashboard-gestion-fatiga",
    description: "Nuestra plataforma centralizada permite visualizar y analizar datos de fatiga de toda la flota en tiempo real.",
    category: "Platform",
    order: 3,
    features: [
      "Monitoreo en tiempo real de toda la flota",
      "Análisis de tendencias y patrones de fatiga",
      "Reportes personalizados y alertas configurables"
    ],
    benefits: [
      "Toma de decisiones basada en datos",
      "Mejora continua de la seguridad"
    ],
    image: "",
    icon: ""
  },
  {
    id: 7,
    title: "Aplicación Móvil para Operadores",
    slug: "aplicacion-movil-operadores",
    description: "Nuestra app exclusiva permite a los operadores monitorear su propio nivel de fatiga y recibir recomendaciones personalizadas.",
    category: "App",
    order: 4,
    features: [
      "Monitoreo personal de niveles de fatiga",
      "Recomendaciones personalizadas",
      "Registro de horas de descanso"
    ],
    benefits: [
      "Mayor conciencia del operador sobre su estado",
      "Mejora de hábitos de descanso"
    ],
    image: "",
    icon: ""
  },
  {
    id: 9,
    title: "Soporte Técnico 24/7",
    slug: "soporte-tecnico-24-7",
    description: "Nuestro equipo de especialistas está disponible las 24 horas para resolver cualquier incidencia técnica.",
    category: "Support",
    order: 5,
    features: [
      "Disponibilidad 24/7",
      "Soporte multicanal (teléfono, email, chat)",
      "Tiempo de respuesta garantizado"
    ],
    benefits: [
      "Resolución rápida de problemas",
      "Continuidad operativa"
    ],
    image: "",
    icon: ""
  },
  {
    id: 11,
    title: "Consultoría en Gestión de Fatiga",
    slug: "consultoria-gestion-fatiga",
    description: "Nuestros expertos analizan su operación y desarrollan estrategias personalizadas para la gestión de fatiga.",
    category: "Consulting",
    order: 6,
    features: [
      "Análisis completo de operaciones",
      "Estrategias personalizadas",
      "Capacitación a personal clave"
    ],
    benefits: [
      "Soluciones adaptadas a su operación",
      "Transferencia de conocimiento"
    ],
    image: "",
    icon: ""
  }
];

// Función para normalizar los datos del servicio
function normalizeServiceData(service: any): Service | null {
  if (!service) return null;
  
  // En Strapi v5, los campos usan mayúsculas iniciales y están directamente en el objeto
  return {
    id: service.id,
    title: service.Title || "", // Con T mayúscula
    slug: service.slug || "",
    description: service.Description || "", // Con D mayúscula
    category: service.category || "",
    order: service.order || 0,
    features: service.features?.split('\n') || [],
    benefits: service.benefits?.split('\n') || [],
    // Preservar el objeto Image completo en lugar de solo la URL
    Image: service.Image || null,
    icon: service.icon || null,
  };
}

// Función para obtener el icono correspondiente según la categoría
function getCategoryIcon(category: string) {
  switch (category?.toLowerCase()) {
    case 'before driving':
      return <Watch className="h-4 w-4 mr-2" />;
    case 'during drive':
      return <Camera className="h-4 w-4 mr-2" />;
    case 'platform':
      return <HeartPulse className="h-4 w-4 mr-2" />;
    case 'app':
      return <Smartphone className="h-4 w-4 mr-2" />;
    case 'support':
      return <LifeBuoy className="h-4 w-4 mr-2" />;
    case 'consulting':
      return <Clock className="h-4 w-4 mr-2" />;
    default:
      return <Watch className="h-4 w-4 mr-2" />;
  }
}

export default async function Soluciones() {
  // Intentar obtener servicios de Strapi
  let services: Service[] = [];
  try {
    console.log("Intentando obtener servicios de Strapi...");
    const servicesData = await getAllServices();
    
    // Verificar que servicesData es un array
    if (Array.isArray(servicesData) && servicesData.length > 0) {
      console.log(`Procesando ${servicesData.length} servicios de Strapi`);
      const normalizedServices = servicesData
        .map(service => normalizeServiceData(service))
        .filter((service): service is Service => service !== null);
      
      if (normalizedServices.length > 0) {
        services = normalizedServices;
        console.log(`Normalizados ${services.length} servicios`);
      } else {
        console.log("No se obtuvieron servicios válidos de Strapi, usando datos de respaldo");
        services = fallbackServices;
      }
    } else {
      console.log("No se obtuvieron servicios de Strapi, usando datos de respaldo");
      services = fallbackServices;
    }
  } catch (error) {
    console.error("Error al procesar servicios:", error);
    services = fallbackServices;
  }
  
  // Si no hay servicios, usar los de respaldo
  if (services.length === 0) {
    console.log("No hay servicios disponibles, usando datos de respaldo");
    services = fallbackServices;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestras Soluciones</h1>
            <p className="text-xl mb-8 text-blue-100">
              Combinamos tecnología de punta y servicio profesional para crear un ecosistema completo de prevención de fatiga y somnolencia.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de soluciones en tarjetas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Nuestras Soluciones
            </h2>
            <p className="text-lg text-gray-600">
              Descubre nuestra línea completa de soluciones para la gestión de fatiga y somnolencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ProductCard
                key={service.slug}
                name={service.title}
                slug={service.slug}
                categorySlug={service.slug}
                shortDescription={service.description}
                price={299}
                status="active"
                imageUrl={service.Image?.url 
                  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${service.Image.url}` 
                  : "/images/products/band-1.jpg"}
                isCategory={true}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}