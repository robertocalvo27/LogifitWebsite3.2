import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, Clock, Users, Monitor, CheckCircle, ArrowRight
} from "lucide-react";

export const metadata = {
  title: 'Solicitar Demo - LOGIFIT',
  description: 'Agenda una demostración personalizada de nuestras soluciones de prevención y gestión de fatiga laboral.',
};

export default function Demo() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Solicita una Demostración</h1>
            <p className="text-xl mb-8 text-blue-100">
              Conoce de primera mano cómo nuestras soluciones pueden transformar la seguridad en tu empresa.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Request Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Agenda tu demostración personalizada</h2>
              <p className="text-lg text-slate-600 mb-8">
                Completa el formulario y un especialista se pondrá en contacto contigo para coordinar una demostración adaptada a las necesidades específicas de tu empresa.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-medium">
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cargo" className="text-sm font-medium">
                      Cargo
                    </label>
                    <input
                      id="cargo"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tu cargo en la empresa"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="empresa" className="text-sm font-medium">
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="industria" className="text-sm font-medium">
                      Industria
                    </label>
                    <select
                      id="industria"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona tu industria</option>
                      <option value="mineria">Minería</option>
                      <option value="transporte">Transporte</option>
                      <option value="construccion">Construcción</option>
                      <option value="petroleo">Petróleo y Gas</option>
                      <option value="manufactura">Manufactura</option>
                      <option value="otra">Otra</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="text-sm font-medium">
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+51 123 456 789"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="interes" className="text-sm font-medium">
                    ¿Qué soluciones te interesan?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="wearables" className="mr-2" />
                      <label htmlFor="wearables">Wearables Inteligentes</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="camaras" className="mr-2" />
                      <label htmlFor="camaras">Cámaras DMS/ADAS</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="plataforma" className="mr-2" />
                      <label htmlFor="plataforma">Plataforma de Monitoreo</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="app" className="mr-2" />
                      <label htmlFor="app">App LOGIFIT</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="servicio" className="mr-2" />
                      <label htmlFor="servicio">Servicio Preventivo</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rest" className="mr-2" />
                      <label htmlFor="rest">Servicio REST</label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="mensaje" className="text-sm font-medium">
                    Mensaje adicional
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cuéntanos sobre tus necesidades específicas o cualquier pregunta que tengas..."
                  ></textarea>
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Solicitar demostración
                </Button>
              </form>
            </div>
            
            <div>
              <div className="bg-slate-50 p-8 rounded-lg mb-8">
                <h3 className="text-2xl font-bold mb-6">¿Qué incluye la demostración?</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <Monitor className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Presentación personalizada</h4>
                      <p className="text-slate-600">Demostración adaptada a las necesidades específicas de tu industria y operación.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <Users className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Sesión con especialistas</h4>
                      <p className="text-slate-600">Nuestros expertos en prevención de fatiga responderán todas tus preguntas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Duración aproximada</h4>
                      <p className="text-slate-600">45-60 minutos, con tiempo adicional para resolver todas tus dudas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <Calendar className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Flexibilidad de horarios</h4>
                      <p className="text-slate-600">Programamos la demostración según tu disponibilidad.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <CheckCircle className="h-5 w-5 text-blue-700" />
                    </div>
                    <h4 className="text-lg font-semibold">Prueba sin compromiso</h4>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Después de la demostración, ofrecemos la posibilidad de implementar una prueba piloto en tu operación para que compruebes los beneficios de nuestras soluciones.
                  </p>
                  <Link href="/casos-exito" className="text-blue-700 font-medium flex items-center hover:text-blue-800">
                    Ver casos de éxito <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-slate-600 italic mb-4">
                  "La demostración fue muy clara y nos permitió entender perfectamente cómo LOGIFIT podía adaptarse a nuestras operaciones mineras. Hoy, después de 8 meses de implementación, hemos reducido los incidentes por fatiga en un 80%."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mr-4 flex items-center justify-center text-blue-700 font-bold">
                    JR
                  </div>
                  <div>
                    <p className="font-semibold">Juan Rodríguez</p>
                    <p className="text-sm text-slate-500">Gerente de Seguridad, Minera Los Andes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-slate-600 italic mb-4">
                  "Lo que más valoramos de la demostración fue ver cómo la plataforma se integraba con nuestros sistemas existentes. La implementación fue rápida y el soporte ha sido excepcional."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mr-4 flex items-center justify-center text-blue-700 font-bold">
                    MG
                  </div>
                  <div>
                    <p className="font-semibold">María González</p>
                    <p className="text-sm text-slate-500">Directora de Operaciones, TransLogic</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-slate-600 italic mb-4">
                  "Después de la demostración, decidimos implementar una prueba piloto en 20 vehículos. Los resultados fueron tan positivos que expandimos la solución a toda nuestra flota en menos de 3 meses."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mr-4 flex items-center justify-center text-blue-700 font-bold">
                    CR
                  </div>
                  <div>
                    <p className="font-semibold">Carlos Ramírez</p>
                    <p className="text-sm text-slate-500">Gerente de Seguridad, CUMBRA Construcciones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">¿Cuánto tiempo toma implementar las soluciones de LOGIFIT?</h3>
              <p className="text-slate-600">
                El tiempo de implementación varía según la solución y el tamaño de la operación. Típicamente, podemos tener un sistema básico funcionando en 2-4 semanas, y una implementación completa en 1-2 meses.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">¿Las soluciones de LOGIFIT funcionan en zonas remotas sin conectividad?</h3>
              <p className="text-slate-600">
                Sí, nuestros dispositivos pueden funcionar en modo offline y sincronizar datos cuando recuperan conectividad. Además, ofrecemos soluciones satelitales para operaciones en zonas extremadamente remotas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">¿Qué soporte técnico ofrecen después de la implementación?</h3>
              <p className="text-slate-600">
                Ofrecemos soporte técnico 24/7, capacitación continua para los usuarios, actualizaciones regulares del software y mantenimiento preventivo de los dispositivos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">¿Puedo integrar LOGIFIT con otros sistemas que ya utilizamos?</h3>
              <p className="text-slate-600">
                Sí, nuestras soluciones están diseñadas para integrarse con sistemas de gestión de flotas, ERP, sistemas de seguridad y otras plataformas mediante APIs y conectores estándar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para transformar la seguridad en tu empresa?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Agenda tu demostración hoy mismo y descubre cómo LOGIFIT puede ayudarte a prevenir accidentes y proteger a tus operadores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              <a href="#top">Solicitar Demo</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              <Link href="/contacto">Contactar a Ventas</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}