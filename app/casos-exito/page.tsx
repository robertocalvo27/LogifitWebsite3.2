import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, TrendingDown, Users, Clock, BarChart3, ChevronRight
} from "lucide-react";

export const metadata = {
  title: 'Casos de Éxito - LOGIFIT',
  description: 'Descubre cómo empresas líderes han reducido accidentes y mejorado la seguridad con nuestras soluciones de prevención de fatiga.',
};

export default function CasosExito() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Casos de Éxito</h1>
            <p className="text-xl mb-8 text-blue-100">
              Descubre cómo empresas líderes en América Latina han transformado la seguridad de sus operaciones con LOGIFIT.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resultados que hablan por sí solos</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Nuestras soluciones han demostrado resultados medibles y significativos en la reducción de accidentes y mejora de la seguridad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md text-center">
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <TrendingDown className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-3xl font-bold text-blue-900 mb-2">75%</h3>
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
                    <Users className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-3xl font-bold text-blue-900 mb-2">10,000+</h3>
                  <p className="text-slate-600">
                    Operadores protegidos por nuestras soluciones
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md text-center">
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-3xl font-bold text-blue-900 mb-2">98%</h3>
                  <p className="text-slate-600">
                    Tasa de detección temprana de fatiga
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

      {/* Case Study 1 */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Award className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Caso de Éxito: Minería</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Minera Quellaveco</h2>
              <p className="text-lg text-slate-600 mb-6">
                Una de las operaciones mineras más grandes de Perú implementó LOGIFIT para proteger a sus operadores de camiones de alto tonelaje y maquinaria pesada.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Desafío</h3>
                  <p className="text-slate-600">
                    Altos índices de fatiga en operadores debido a turnos de 12 horas, operaciones a gran altura y condiciones climáticas extremas.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Solución implementada</h3>
                  <p className="text-slate-600">
                    Sistema integral con wearables para monitoreo previo al turno, cámaras DMS/ADAS en vehículos y plataforma de monitoreo 24/7.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Resultados</h3>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 75% de reducción en incidentes relacionados con fatiga</li>
                    <li>• 98% de detección temprana de signos de fatiga</li>
                    <li>• 22% de mejora en productividad</li>
                    <li>• ROI positivo en menos de 6 meses</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800 font-medium">
                  "LOGIFIT ha transformado nuestra gestión de fatiga. La combinación de tecnología y servicio preventivo nos ha permitido anticiparnos a los incidentes y proteger a nuestros operadores."
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  — Carlos Rodríguez, Gerente HSE, Minera Quellaveco
                </p>
              </div>
              
              <Button asChild>
                <Link href="/demo">Solicitar una solución similar</Link>
              </Button>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Minera Quellaveco - LOGIFIT"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 2 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="TransLogic - LOGIFIT"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Award className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Caso de Éxito: Transporte</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">TransLogic</h2>
              <p className="text-lg text-slate-600 mb-6">
                Una de las principales empresas de transporte de carga en Colombia implementó LOGIFIT para su flota de más de 200 vehículos.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Desafío</h3>
                  <p className="text-slate-600">
                    Alta incidencia de microsueños en conductores de larga distancia, especialmente en rutas nocturnas y con carga peligrosa.
                  </p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Solución implementada</h3>
                  <p className="text-slate-600">
                    Cámaras DMS/ADAS en toda la flota, wearables para monitoreo de sueño y servicio de monitoreo 24/7 con llamadas preventivas.
                  </p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Resultados</h3>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 82% de reducción en incidentes por fatiga</li>
                    <li>• 100% de detección de microsueños</li>
                    <li>• 35% de mejora en tiempos de entrega</li>
                    <li>• 28% de reducción en costos de seguros</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800 font-medium">
                  "La plataforma de LOGIFIT nos permite tomar decisiones basadas en datos reales. El servicio preventivo y las alertas tempranas han mejorado significativamente la seguridad en nuestras operaciones."
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  — María Fernández, Directora de Operaciones, TransLogic
                </p>
              </div>
              
              <Button asChild>
                <Link href="/demo">Solicitar una solución similar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 3 */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Award className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Caso de Éxito: Construcción</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">CUMBRA Construcciones</h2>
              <p className="text-lg text-slate-600 mb-6">
                Una de las constructoras más importantes de Chile implementó LOGIFIT para sus operadores de maquinaria pesada y conductores.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Desafío</h3>
                  <p className="text-slate-600">
                    Fatiga acumulada en operadores debido a turnos extendidos y rotación de personal en proyectos de gran envergadura.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Solución implementada</h3>
                  <p className="text-slate-600">
                    Sistema integral con App LOGIFIT, wearables y servicio REST para casos de APNEA y fatiga crónica.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Resultados</h3>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 68% de reducción en incidentes relacionados con fatiga</li>
                    <li>• 40% de mejora en la calidad del sueño de los operadores</li>
                    <li>• 25% de aumento en productividad</li>
                    <li>• Reducción significativa en ausentismo laboral</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800 font-medium">
                  "LOGIFIT nos ha permitido gestionar mejor los turnos y reducir significativamente los incidentes relacionados con fatiga. El servicio REST ha sido fundamental para nuestros operadores con problemas crónicos de sueño."
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  — Carlos Ramírez, Gerente de Seguridad, CUMBRA Construcciones
                </p>
              </div>
              
              <Button asChild>
                <Link href="/demo">Solicitar una solución similar</Link>
              </Button>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="CUMBRA Construcciones - LOGIFIT"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Empresas que confían en LOGIFIT</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Nos enorgullece trabajar con empresas líderes en diversos sectores de América Latina.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            <div className="bg-slate-50 p-6 rounded-lg h-24 flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-700">Quellaveco</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg h-24 flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-700">CUMBRA</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg h-24 flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-700">TransLogic</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg h-24 flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-700">PetroPeru</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg h-24 flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-700">Codelco</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg h-24 flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-700">Antamina</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres ser nuestro próximo caso de éxito?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Contáctanos hoy mismo para conocer cómo LOGIFIT puede transformar la seguridad en tu empresa y convertirse en tu aliado estratégico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              <Link href="/demo">Solicitar Demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              <Link href="/contacto">Cotizar Servicio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}