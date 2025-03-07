import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, Target, Users, Globe, Calendar, ChevronRight
} from "lucide-react";

export const metadata = {
  title: 'Nosotros - LOGIFIT',
  description: 'Conoce más sobre LOGIFIT, nuestra historia, misión, visión y el equipo detrás de nuestras soluciones innovadoras.',
};

export default function Nosotros() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
            <p className="text-xl mb-8 text-blue-100">
              Somos especialistas en prevención y gestión de fatiga laboral, comprometidos con la seguridad de los trabajadores en América Latina.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
              <p className="text-lg text-slate-600 mb-4">
                LOGIFIT nació en 2018 de la visión de un grupo de especialistas en seguridad ocupacional y tecnología, que identificaron la necesidad de soluciones innovadoras para prevenir accidentes causados por fatiga y somnolencia en entornos laborales de alto riesgo.
              </p>
              <p className="text-lg text-slate-600 mb-4">
                Comenzamos desarrollando wearables para monitorear patrones de sueño en operadores mineros, y rápidamente expandimos nuestras soluciones para incluir cámaras inteligentes, plataformas de monitoreo y servicios preventivos.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Hoy, LOGIFIT es líder en prevención de fatiga en América Latina, protegiendo a miles de trabajadores en minería, construcción, transporte y otros sectores de alto riesgo.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold">Fundada en 2018</p>
                  <p className="text-slate-600">Lima, Perú</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Equipo LOGIFIT"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Target className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
                  <p className="text-lg text-slate-600">
                    Proteger la vida de los trabajadores en entornos de alto riesgo mediante soluciones innovadoras que previenen accidentes causados por fatiga y somnolencia, combinando tecnología de punta y servicio preventivo especializado.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Globe className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
                  <p className="text-lg text-slate-600">
                    Ser la empresa líder en América Latina en prevención y gestión de fatiga laboral, reconocida por su innovación tecnológica, excelencia en el servicio y compromiso con la seguridad de los trabajadores en todos los sectores industriales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Estos principios guían nuestras decisiones y acciones cada día.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Innovación</h3>
                <p className="text-slate-600">
                  Buscamos constantemente nuevas formas de mejorar nuestras soluciones, integrando tecnologías emergentes y metodologías avanzadas para ofrecer los mejores resultados.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Compromiso</h3>
                <p className="text-slate-600">
                  Nos comprometemos con la seguridad de cada trabajador, entendiendo que detrás de cada usuario de nuestras soluciones hay una familia que espera su regreso seguro a casa.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Excelencia</h3>
                <p className="text-slate-600">
                  Buscamos la excelencia en todo lo que hacemos, desde el desarrollo de nuestros productos hasta la atención al cliente y el servicio post-venta.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Colaboración</h3>
                <p className="text-slate-600">
                  Trabajamos en estrecha colaboración con nuestros clientes, entendiendo sus necesidades específicas y adaptando nuestras soluciones a sus realidades operativas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Integridad</h3>
                <p className="text-slate-600">
                  Actuamos con honestidad y transparencia en todas nuestras relaciones, manteniendo los más altos estándares éticos en nuestras prácticas comerciales.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Responsabilidad</h3>
                <p className="text-slate-600">
                  Asumimos la responsabilidad de nuestras acciones y decisiones, comprometiéndonos con resultados medibles y significativos para nuestros clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Un equipo multidisciplinario de especialistas en seguridad ocupacional, tecnología, análisis de datos y atención al cliente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Carlos Mendoza - CEO"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">Carlos Mendoza</h3>
                <p className="text-blue-700 mb-3">CEO & Fundador</p>
                <p className="text-slate-600 mb-4">
                  Ingeniero de Seguridad con más de 15 años de experiencia en minería y transporte. Especialista en gestión de fatiga y sistemas preventivos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Ana Martínez - CTO"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">Ana Martínez</h3>
                <p className="text-blue-700 mb-3">CTO</p>
                <p className="text-slate-600 mb-4">
                  Ingeniera en Sistemas con especialización en IA y machine learning. Lidera el desarrollo de nuestras soluciones tecnológicas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Roberto Sánchez - Director Médico"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Roberto Sánchez</h3>
                <p className="text-blue-700 mb-3">Director Médico</p>
                <p className="text-slate-600 mb-4">
                  Médico especialista en medicina del trabajo y trastornos del sueño. Responsable del servicio REST y protocolos médicos.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-lg text-slate-600 mb-4">
              Nuestro equipo incluye además analistas SSOMA, desarrolladores, especialistas en datos y un equipo de soporte 24/7.
            </p>
            <Link href="/contacto" className="text-blue-700 font-medium inline-flex items-center hover:text-blue-800">
              Contáctanos para conocer más sobre nuestro equipo <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Reconocimientos</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Nuestro compromiso con la innovación y la excelencia ha sido reconocido por diversas instituciones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <Award className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Wake Up Award 2021</h3>
                    <p className="text-slate-600">Innovación en Seguridad Laboral</p>
                  </div>
                </div>
                <p className="text-slate-600">
                  Reconocimiento a la solución más innovadora para prevenir accidentes por fatiga en entornos industriales.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <Award className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Empresa del Año 2023</h3>
                    <p className="text-slate-600">Cámara de Comercio de Lima</p>
                  </div>
                </div>
                <p className="text-slate-600">
                  Reconocimiento a nuestra contribución a la seguridad industrial y el impacto positivo en la reducción de accidentes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <Award className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Tech Innovation 2022</h3>
                    <p className="text-slate-600">Asociación Latinoamericana de Seguridad</p>
                  </div>
                </div>
                <p className="text-slate-600">
                  Premio a la mejor integración de tecnología en soluciones de seguridad ocupacional en América Latina.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Únete a nuestra misión</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Trabajemos juntos para crear entornos laborales más seguros y proteger la vida de los trabajadores en América Latina.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              <Link href="/demo">Solicitar Demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              <Link href="/contacto">Contactar al Equipo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}