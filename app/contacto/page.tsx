import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, Phone, MapPin, Clock, Calendar, Send
} from "lucide-react";

export const metadata = {
  title: 'Contacto - LOGIFIT',
  description: 'Contáctanos para conocer más sobre nuestras soluciones de prevención y gestión de fatiga laboral.',
};

export default function Contacto() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contáctanos</h1>
            <p className="text-xl mb-8 text-blue-100">
              Estamos listos para ayudarte a implementar la mejor solución de prevención de fatiga para tu empresa.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Envíanos un mensaje</h2>
              <p className="text-lg text-slate-600 mb-8">
                Completa el formulario y un especialista se pondrá en contacto contigo para brindarte toda la información que necesitas.
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
                
                <div className="space-y-2">
                  <label htmlFor="mensaje" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cuéntanos sobre tus necesidades específicas..."
                  ></textarea>
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" /> Enviar mensaje
                </Button>
              </form>
            </div>
            
            <div>
              <div className="bg-slate-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Teléfono</h4>
                      <p className="text-slate-600">+51 123 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Correo electrónico</h4>
                      <p className="text-slate-600">contacto@logifit.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Oficinas</h4>
                      <p className="text-slate-600">Lima, Perú</p>
                      <p className="text-slate-600">Santiago, Chile</p>
                      <p className="text-slate-600">Bogotá, Colombia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Horario de atención</h4>
                      <p className="text-slate-600">Lunes a Viernes: 9:00 - 18:00</p>
                      <p className="text-slate-600">Soporte técnico: 24/7</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Agenda una llamada</h4>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/demo">
                      <Calendar className="mr-2 h-4 w-4" /> Agendar demostración
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Oficinas LOGIFIT"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Prefieres una demostración personalizada?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Agenda una sesión con nuestros especialistas para conocer en detalle cómo LOGIFIT puede adaptarse a las necesidades específicas de tu empresa.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
            <Link href="/demo">Solicitar Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}