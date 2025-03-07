import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  HardHat, Truck, Building, Droplet, Factory, 
  Shield, Clock, Battery, BarChart3, ChevronRight 
} from "lucide-react";

export const metadata = {
  title: 'Industrias - LOGIFIT',
  description: 'Soluciones de prevención de fatiga adaptadas a las necesidades específicas de cada industria.',
};

export default function Industrias() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Soluciones por Industria</h1>
            <p className="text-xl mb-8 text-blue-100">
              Adaptamos nuestras soluciones a las necesidades específicas de cada sector, garantizando la máxima eficacia en la prevención de accidentes.
            </p>
          </div>
        </div>
      </section>

      {/* Industrias Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Minería"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <HardHat className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Minería</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Soluciones adaptadas para turnos de 12 horas, operaciones en altura y condiciones extremas en campamentos mineros.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#mineria">Ver detalles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Transporte"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Truck className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Transporte</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Monitoreo continuo para conductores de larga distancia, transporte de carga peligrosa y flotas de distribución.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#transporte">Ver detalles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Construcción"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Building className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Construcción</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Control de fatiga para operadores de maquinaria pesada, conductores y personal en turnos extendidos.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#construccion">Ver detalles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Petróleo y Gas"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Droplet className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Petróleo y Gas</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Prevención de fatiga en plataformas offshore, plantas de procesamiento y transporte de combustibles.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#petroleo">Ver detalles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1565108477327-9a8161d222a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Manufactura"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Factory className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold">Manufactura</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Control de fatiga para operarios de maquinaria industrial, líneas de producción y turnos rotativos.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#manufactura">Ver detalles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Minería Section */}
      <section id="mineria" className="py-16 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <HardHat className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Minería</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Soluciones para la Industria Minera</h2>
              <p className="text-lg text-slate-600 mb-6">
                La industria minera presenta desafíos únicos: turnos extendidos de 12 horas, operaciones en altura, condiciones climáticas extremas y alta exigencia física y mental.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Shield className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Monitoreo de operadores de camiones de alto tonelaje y maquinaria pesada</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Battery className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Wearables resistentes a condiciones extremas de polvo y temperatura</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Clock className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Detección de fatiga por altura y turnos extendidos</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <BarChart3 className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Integración con sistemas de gestión de flotas y dispatch</span>
                </li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800 font-medium">
                  "LOGIFIT ha reducido nuestros incidentes por fatiga en un 75% en las operaciones de tajo abierto."
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  — Juan Pérez, Gerente de Seguridad, Minera Los Andes
                </p>
              </div>
              <Button asChild>
                <Link href="/contacto">Solicitar solución para minería</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Soluciones LOGIFIT para minería"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transporte Section */}
      <section id="transporte" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Soluciones LOGIFIT para transporte"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Truck className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Transporte</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Soluciones para Transporte y Logística</h2>
              <p className="text-lg text-slate-600 mb-6">
                El sector de transporte enfrenta riesgos constantes: largas horas al volante, conducción nocturna, presión por cumplir plazos y monotonía en carretera.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Shield className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Cámaras DMS/ADAS con detección inmediata de microsueños</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Battery className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Monitoreo de patrones de sueño para conductores de larga distancia</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Clock className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Alertas en tiempo real con respuesta inmediata del centro de monitoreo</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <BarChart3 className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Integración con sistemas de gestión de flotas y GPS</span>
                </li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800 font-medium">
                  "Desde que implementamos LOGIFIT en nuestra flota, hemos eliminado por completo los incidentes por fatiga en carretera."
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  — María González, Directora de Operaciones, TransLogic
                </p>
              </div>
              <Button asChild>
                <Link href="/contacto">Solicitar solución para transporte</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Construcción Section */}
      <section id="construccion" className="py-16 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Building className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Construcción</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Soluciones para Construcción</h2>
              <p className="text-lg text-slate-600 mb-6">
                La industria de la construcción combina operación de maquinaria pesada, trabajo en altura, turnos extendidos y condiciones climáticas variables.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Shield className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Monitoreo de operadores de grúas, excavadoras y maquinaria pesada</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Battery className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Wearables resistentes para entornos de construcción</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <Clock className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Control de fatiga para trabajos en altura y espacios confinados</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                    <BarChart3 className="h-4 w-4 text-blue-700" />
                  </div>
                  <span className="text-slate-700">Dashboards específicos para supervisores de obra</span>
                </li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800 font-medium">
                  "LOGIFIT nos ha permitido gestionar mejor los turnos y reducir significativamente los incidentes relacionados con fatiga."
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  — Carlos Ramírez, Gerente de Seguridad, CUMBRA Construcciones
                </p>
              </div>
              <Button asChild>
                <Link href="/contacto">Solicitar solución para construcción</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Soluciones LOGIFIT para construcción"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Soluciones adaptadas a tu industria</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Cada sector tiene desafíos únicos. En LOGIFIT personalizamos nuestras soluciones para adaptarse perfectamente a las necesidades específicas de tu industria.
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