import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, Users, Award, ChevronRight, MapPin, Calendar
} from "lucide-react";

export const metadata = {
  title: 'Trabaja con Nosotros - LOGIFIT',
  description: 'Únete a nuestro equipo y contribuye a crear entornos laborales más seguros en América Latina.',
};

export default function TrabajaNosotros() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trabaja con Nosotros</h1>
            <p className="text-xl mb-8 text-blue-100">
              Únete a nuestro equipo y contribuye a crear entornos laborales más seguros en América Latina
            </p>
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              <a href="#vacantes">Ver Vacantes Disponibles</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Por qué trabajar con nosotros */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué trabajar en LOGIFIT?</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Somos una empresa en crecimiento con un propósito claro: proteger la vida de las personas a través de la tecnología y la innovación.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Briefcase className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Propósito con Impacto</h3>
                  <p className="text-slate-600">
                    Tu trabajo tendrá un impacto directo en la seguridad y bienestar de miles de personas en América Latina.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Users className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Cultura Colaborativa</h3>
                  <p className="text-slate-600">
                    Fomentamos un ambiente de trabajo inclusivo, colaborativo y orientado a resultados.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Award className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Desarrollo Profesional</h3>
                  <p className="text-slate-600">
                    Ofrecemos oportunidades de crecimiento, capacitación continua y desarrollo de carrera.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Beneficios de ser parte de LOGIFIT</h2>
              <p className="text-lg text-slate-600 mb-6">
                Valoramos a nuestro equipo y ofrecemos beneficios competitivos para asegurar su bienestar y desarrollo.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                    <ChevronRight className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Horario Flexible</h4>
                    <p className="text-slate-600">Balance entre vida personal y profesional con opciones de trabajo remoto.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                    <ChevronRight className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Desarrollo Continuo</h4>
                    <p className="text-slate-600">Programas de capacitación, certificaciones y oportunidades de crecimiento.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                    <ChevronRight className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Seguro Médico</h4>
                    <p className="text-slate-600">Cobertura médica completa para ti y tu familia.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                    <ChevronRight className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Bonos por Desempeño</h4>
                    <p className="text-slate-600">Reconocemos y premiamos el buen desempeño y la contribución al equipo.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                    <ChevronRight className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Ambiente Innovador</h4>
                    <p className="text-slate-600">Trabajarás con tecnologías de punta y participarás en proyectos desafiantes.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Equipo LOGIFIT"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vacantes */}
      <section id="vacantes" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vacantes Disponibles</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explora nuestras oportunidades actuales y únete a un equipo apasionado por la innovación y la seguridad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Ingeniero de Software Senior</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Tiempo Completo</span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Remoto</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-slate-600 text-sm">Lima, Perú (Remoto)</span>
                  <Calendar className="h-4 w-4 text-slate-500 ml-4 mr-2" />
                  <span className="text-slate-600 text-sm">Publicado: 15/05/2025</span>
                </div>
                
                <p className="text-slate-600 mb-4">
                  Buscamos un Ingeniero de Software Senior para liderar el desarrollo de nuestras plataformas de monitoreo y prevención de fatiga. Experiencia en desarrollo web, aplicaciones móviles y sistemas en tiempo real.
                </p>
                
                <Button asChild>
                  <Link href="/contacto">Aplicar ahora</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Especialista en Seguridad Ocupacional</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Tiempo Completo</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Híbrido</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-slate-600 text-sm">Santiago, Chile</span>
                  <Calendar className="h-4 w-4 text-slate-500 ml-4 mr-2" />
                  <span className="text-slate-600 text-sm">Publicado: 10/05/2025</span>
                </div>
                
                <p className="text-slate-600 mb-4">
                  Buscamos un Especialista en Seguridad Ocupacional para nuestro equipo en Chile. Serás responsable de asesorar a clientes sobre implementación de soluciones de prevención de fatiga y análisis de riesgos.
                </p>
                
                <Button asChild>
                  <Link href="/contacto">Aplicar ahora</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Analista de Datos</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Tiempo Completo</span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Remoto</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-slate-600 text-sm">Bogotá, Colombia (Remoto)</span>
                  <Calendar className="h-4 w-4 text-slate-500 ml-4 mr-2" />
                  <span className="text-slate-600 text-sm">Publicado: 05/05/2025</span>
                </div>
                
                <p className="text-slate-600 mb-4">
                  Buscamos un Analista de Datos para procesar y analizar información de nuestros dispositivos y plataformas. Experiencia en análisis de datos, machine learning y visualización de datos.
                </p>
                
                <Button asChild>
                  <Link href="/contacto">Aplicar ahora</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Ejecutivo de Ventas B2B</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Tiempo Completo</span>
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Presencial</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-slate-500 mr-2" />
                  <span className="text-slate-600 text-sm">Ciudad de México, México</span>
                  <Calendar className="h-4 w-4 text-slate-500 ml-4 mr-2" />
                  <span className="text-slate-600 text-sm">Publicado: 01/05/2025</span>
                </div>
                
                <p className="text-slate-600 mb-4">
                  Buscamos un Ejecutivo de Ventas B2B para nuestro equipo en México. Serás responsable de desarrollar nuevas oportunidades de negocio y mantener relaciones con clientes corporativos.
                </p>
                
                <Button asChild>
                  <Link href="/contacto">Aplicar ahora</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-slate-600 mb-6">
              ¿No encuentras la posición que buscas? Envíanos tu CV y te tendremos en cuenta para futuras oportunidades.
            </p>
            <Button asChild size="lg">
              <Link href="/contacto">Enviar CV Espontáneo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proceso de Selección */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro Proceso de Selección</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Conoce los pasos de nuestro proceso de selección, diseñado para encontrar el mejor talento y asegurar un buen match con nuestra cultura.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Aplicación</h3>
              <p className="text-slate-600">
                Envía tu CV y carta de presentación a través de nuestro formulario de contacto.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Entrevista Inicial</h3>
              <p className="text-slate-600">
                Conversación telefónica o por videollamada para conocer tu experiencia y expectativas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Evaluación Técnica</h3>
              <p className="text-slate-600">
                Dependiendo del puesto, realizarás pruebas técnicas o casos prácticos relacionados.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Entrevista Final</h3>
              <p className="text-slate-600">
                Conocerás a tu futuro equipo y discutiremos detalles sobre la posición y oferta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para unirte a nuestro equipo?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Forma parte de una empresa innovadora que está transformando la seguridad laboral en América Latina.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
            <Link href="/contacto">Enviar mi Aplicación</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}