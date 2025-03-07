import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/lib/api/services/services";
import { getProductsByCategory } from "@/lib/api/products/products";
import Image from "next/image";
import { Shield, CheckCircle, FileText, BookOpen, Download, Calendar } from "lucide-react";

export default async function ServiceDetailPageV2({ params }: { params: { slug: string } }) {
  const serviceData = await getServiceBySlug(params.slug);
  const products = await getProductsByCategory(serviceData.category);

  if (!serviceData) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Mejorado */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {serviceData.Title}
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                {serviceData.Description}
              </p>
              <div className="flex gap-4">
                <Button variant="secondary">
                  Ver Catálogo
                </Button>
                <Button variant="primary">
                  Solicitar Demo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={serviceData.Image?.url || '/fallback.jpg'}
                  alt={serviceData.Title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal con Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="solution" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="solution">Solución</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="packages">Paquetes</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
              <TabsTrigger value="cases">Casos de Éxito</TabsTrigger>
            </TabsList>

            <TabsContent value="solution" className="space-y-8">
              {/* Visión General de la Solución */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 prose max-w-none">
                  <h2>Solución Integral de Prevención</h2>
                  {renderContent(serviceData.Content)}
                  
                  <div className="mt-8">
                    <h3>Características principales</h3>
                    <ul className="space-y-3">
                      {serviceData.features.split('\n').map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Shield className="h-5 w-5 mr-2 text-blue-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Beneficios Clave</h3>
                    <ul className="space-y-3">
                      {serviceData.benefits.split('\n').map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Recursos Disponibles</h3>
                    <ul className="space-y-4">
                      <li>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Ficha Técnica
                        </Button>
                      </li>
                      <li>
                        <Button variant="outline" className="w-full justify-start">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Guía de Implementación
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.shortDescription}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">${product.price}</span>
                        <Button>Ver Detalles</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="packages">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Paquetes Empresariales */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-4">Kit Básico</h3>
                  <ul className="space-y-2 mb-6">
                    <li>✓ 10 wearables</li>
                    <li>✓ 1 tablet de supervisión</li>
                    <li>✓ Dashboard básico</li>
                    <li>✓ Soporte 8/5</li>
                  </ul>
                  <Button className="w-full">Cotizar Kit</Button>
                </div>
                {/* ... otros paquetes ... */}
              </div>
            </TabsContent>

            {/* ... otros TabsContent ... */}
          </Tabs>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para implementar {serviceData.Title}?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Agenda una demostración personalizada y descubre cómo podemos ayudarte
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Descargar Brochure
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 