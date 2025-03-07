'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Watch, Camera, LayoutDashboard, Headphones, Bed, CheckCircle,
  Shield, Clock, Battery, BarChart3, ChevronRight, Smartphone,
  Download, ArrowRight, Star, DollarSign
} from "lucide-react";
import { useState } from "react";

export default function SolucionesV2() {
  // Añadimos estado para manejar la categoría activa
  const [activeCategory, setActiveCategory] = useState("wearables");

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Scroll suave al inicio de la sección de contenido
    const contentSection = document.getElementById('category-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Componente para los tabs de navegación
  const NavigationTabs = () => (
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto py-4 gap-4 no-scrollbar">
          <button
            onClick={() => handleCategoryChange("wearables")}
            className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              activeCategory === "wearables"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
              Wearables Inteligentes
          </button>
          <button
            onClick={() => handleCategoryChange("camaras")}
            className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              activeCategory === "camaras"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
              Cámaras DMS/ADAS
          </button>
          <button
            onClick={() => handleCategoryChange("plataforma")}
            className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              activeCategory === "plataforma"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
              Plataforma Digital
          </button>
          <button
            onClick={() => handleCategoryChange("servicios")}
            className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              activeCategory === "servicios"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
              Servicios Preventivos
          </button>
          <button
            onClick={() => handleCategoryChange("paquetes")}
            className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              activeCategory === "paquetes"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
              Paquetes Integrales
          </button>
        </div>
        </div>
      </section>
  );

  // Renderizado condicional del contenido
  const renderContent = () => {
    switch (activeCategory) {
      case "wearables":
        return (
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Watch className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Before Driving</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Wearables Inteligentes</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Monitoreo continuo de signos vitales y patrones de sueño para detectar fatiga antes de que se convierta en un riesgo.
              </p>
            </div>

            {/* Product Options */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Modelos Disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LOGIFIT Band Lite */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6"
                        alt="LOGIFIT Band Lite"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT Band Lite</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Básico</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Monitoreo de sueño y frecuencia cardíaca</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Batería de hasta 10 días</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Resistente al agua IP67</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-band-lite.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* LOGIFIT Band Pro */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow relative">
                  <div className="absolute top-0 right-0 bg-blue-700 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                    Más vendido
                  </div>
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1510017803434-a899398421b3"
                        alt="LOGIFIT Band Pro"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT Band Pro</h4>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Avanzado</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Monitoreo completo (sueño, FC, SpO2)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Batería de hasta 20 días</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Resistente a condiciones extremas IP68</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Alertas de fatiga predictivas</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-band-pro.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* LOGIFIT Ring */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1617625802912-cde586faf331"
                        alt="LOGIFIT Ring"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT Ring</h4>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Premium</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Monitoreo avanzado con alta precisión</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Batería de hasta 7 días</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Diseño discreto y cómodo 24/7</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Análisis de calidad de sueño avanzado</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-ring.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Services Included */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Servicios Incluidos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-blue-700" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">App de Monitoreo</h4>
                  <p className="text-slate-600 mb-4">
                    Aplicación móvil para visualizar datos de sueño, recibir alertas y recomendaciones personalizadas.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Dashboard personal de fatiga</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Alertas predictivas</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <LayoutDashboard className="h-6 w-6 text-blue-700" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Plataforma Web</h4>
                  <p className="text-slate-600 mb-4">
                    Acceso a la plataforma web para supervisores y gerentes con reportes detallados.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Reportes por equipos y turnos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Análisis de tendencias</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Headphones className="h-6 w-6 text-blue-700" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Soporte Técnico</h4>
                  <p className="text-slate-600 mb-4">
                    Asistencia técnica para la configuración, uso y mantenimiento de los dispositivos.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Soporte 8x5</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Capacitación inicial</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ROI and Case Study */}
            <div className="bg-blue-50 p-8 rounded-lg mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Beneficios Empresariales</h3>
                  <p className="text-slate-700 mb-4">
                    Nuestros wearables ofrecen beneficios tangibles para su operación:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>Detección temprana</strong> de fatiga antes del inicio del turno</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>Reducción de hasta 75%</strong> en incidentes relacionados con fatiga</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>Mejora en la calidad del sueño</strong> de los operadores</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Caso de Éxito: Minera Los Andes</h3>
                  <p className="text-slate-700 mb-4">
                    "Desde que implementamos los wearables LOGIFIT, hemos reducido los incidentes por fatiga en un 75%. La capacidad de detectar patrones de sueño deficientes antes de que el operador comience su turno ha sido clave para nuestra operación."
                  </p>
                  <p className="text-blue-700 font-medium">
                    — Juan Rodríguez, Gerente de Seguridad, Minera Los Andes
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/casos-exito">Ver más casos de éxito</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Cross-selling */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Soluciones Complementarias</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Camera className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Cámaras DMS/ADAS</h4>
                      <p className="text-slate-600 mb-4">
                        Complementa tus wearables con cámaras inteligentes para monitoreo en tiempo real durante la operación.
                      </p>
                      <Link href="#camaras" className="text-blue-700 font-medium flex items-center">
                        Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Headphones className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Servicio Preventivo 24/7</h4>
                      <p className="text-slate-600 mb-4">
                        Añade monitoreo profesional por analistas SSOMA para una prevención más efectiva.
                      </p>
                      <Link href="#servicios" className="text-blue-700 font-medium flex items-center">
                        Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/contacto">Solicitar demostración</Link>
              </Button>
            </div>
          </div>
        );
      
      case "camaras":
        return (
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Camera className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">During Drive</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Cámaras Inteligentes DMS/ADAS</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Detección en tiempo real de microsueños, distracciones y signos de fatiga para prevenir accidentes durante la operación.
              </p>
            </div>

            {/* Product Options */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Modelos Disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LOGIFIT DMS Basic */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1580983218765-f663bec07b37"
                        alt="LOGIFIT DMS Basic"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT DMS Basic</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Básico</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Detección de microsueños</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Alertas sonoras en cabina</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Grabación de eventos</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-dms-basic.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* LOGIFIT DMS Pro */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow relative">
                  <div className="absolute top-0 right-0 bg-blue-700 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                    Más vendido
                  </div>
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1494905998402-395d579af36f"
                        alt="LOGIFIT DMS Pro"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT DMS Pro</h4>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Avanzado</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Detección de microsueños y distracciones</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Alertas en tiempo real al centro de monitoreo</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Transmisión 4G/LTE</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Visión nocturna infrarroja</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-dms-pro.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* LOGIFIT DMS+ADAS */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1581092335397-9583eb92d232"
                        alt="LOGIFIT DMS+ADAS"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT DMS+ADAS</h4>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Premium</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Todo lo incluido en DMS Pro</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Sistema ADAS (detección de colisiones)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Monitoreo de carril y distancia</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Integración con telemetría del vehículo</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-dms-adas.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Services Included */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Servicios Incluidos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <LayoutDashboard className="h-6 w-6 text-blue-700" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Plataforma de Monitoreo</h4>
                  <p className="text-slate-600 mb-4">
                    Acceso a la plataforma web para visualizar eventos, alertas y estadísticas en tiempo real.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Dashboard de eventos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Reportes automáticos</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Headphones className="h-6 w-6 text-blue-700" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Instalación y Configuración</h4>
                  <p className="text-slate-600 mb-4">
                    Servicio de instalación profesional y configuración personalizada para cada vehículo.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Instalación certificada</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Calibración personalizada</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-blue-700" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">App para Supervisores</h4>
                  <p className="text-slate-600 mb-4">
                    Aplicación móvil para supervisores con notificaciones en tiempo real de eventos críticos.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Alertas instantáneas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-slate-700">Visualización de eventos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ROI and Case Study */}
            <div className="bg-blue-50 p-8 rounded-lg mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Beneficios Empresariales</h3>
                  <p className="text-slate-700 mb-4">
                    Nuestras cámaras DMS/ADAS ofrecen beneficios tangibles para su operación:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>100% de detección</strong> de microsueños durante la conducción</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>Reducción de hasta 82%</strong> en incidentes por fatiga</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>28% de reducción</strong> en costos de seguros</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Caso de Éxito: TransLogic</h3>
                  <p className="text-slate-700 mb-4">
                    "Las cámaras DMS/ADAS de LOGIFIT han transformado nuestra operación de transporte. La detección inmediata de microsueños y la respuesta del centro de monitoreo han evitado múltiples incidentes potencialmente graves."
                  </p>
                  <p className="text-blue-700 font-medium">
                    — María Fernández, Directora de Operaciones, TransLogic
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/casos-exito">Ver más casos de éxito</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Cross-selling */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Soluciones Complementarias</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Watch className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Wearables Inteligentes</h4>
                      <p className="text-slate-600 mb-4">
                        Complementa tus cámaras con wearables para monitoreo previo al turno y detección temprana de fatiga.
                      </p>
                      <Link href="#wearables" className="text-blue-700 font-medium flex items-center">
                        Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Headphones className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Servicio Preventivo 24/7</h4>
                      <p className="text-slate-600 mb-4">
                        Añade monitoreo profesional por analistas SSOMA para una prevención más efectiva.
                      </p>
                      <Link href="#servicios" className="text-blue-700 font-medium flex items-center">
                        Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/contacto">Solicitar demostración</Link>
              </Button>
            </div>
          </div>
        );
      
      case "plataforma":
        return (
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Monitoreo Continuo</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Plataforma Digital LOGIFIT</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Centraliza toda la información de fatiga y somnolencia en una plataforma intuitiva que permite una gestión proactiva y eficiente de los riesgos.
              </p>
            </div>

            {/* Platform Options */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Versiones Disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LOGIFIT Dashboard */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                        alt="LOGIFIT Dashboard"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT Dashboard</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Web</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Dashboard de fatiga en tiempo real</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Reportes detallados y personalizables</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Gestión de usuarios y permisos</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-dashboard.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* LOGIFIT App */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6"
                        alt="LOGIFIT App"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT App</h4>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Móvil</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Monitoreo personal de fatiga</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Alertas y notificaciones en tiempo real</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Sincronización con wearables</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-app.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* LOGIFIT Enterprise */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow relative">
                  <div className="absolute top-0 right-0 bg-blue-700 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                    Recomendado
                  </div>
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                        alt="LOGIFIT Enterprise"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-bold">LOGIFIT Enterprise</h4>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completo</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Dashboard web + App móvil</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Integración con sistemas existentes</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Análisis predictivo y preventivo</span>
                        </li>
                      </ul>
                      <div className="flex justify-between items-center">
                        <Link href="/recursos/ficha-enterprise.pdf" className="text-blue-700 font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Ficha técnica
                        </Link>
                        <Button asChild size="sm">
                          <Link href="/contacto">Cotizar</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ROI and Case Study */}
            <div className="bg-blue-50 p-8 rounded-lg mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Beneficios Empresariales</h3>
                  <p className="text-slate-700 mb-4">
                    Nuestra plataforma digital ofrece beneficios tangibles para su operación:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>Visibilidad completa</strong> de los niveles de fatiga en toda la operación</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>Toma de decisiones</strong> basada en datos en tiempo real</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>Optimización de turnos</strong> y asignación de personal</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Caso de Éxito: CUMBRA Construcciones</h3>
                  <p className="text-slate-700 mb-4">
                    "La plataforma LOGIFIT nos ha permitido identificar patrones de fatiga que no habíamos detectado antes. Ahora podemos programar mejor los turnos y asignar tareas críticas en los momentos óptimos del día."
                  </p>
                  <p className="text-blue-700 font-medium">
                    — Carlos Ramírez, Gerente de Seguridad, CUMBRA Construcciones
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/casos-exito">Ver más casos de éxito</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Cross-selling */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Soluciones Complementarias</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Watch className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Wearables Inteligentes</h4>
                      <p className="text-slate-600 mb-4">
                        Complementa tu plataforma con wearables para obtener datos precisos de fatiga y sueño.
                      </p>
                      <Link href="#wearables" className="text-blue-700 font-medium flex items-center">
                        Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Camera className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Cámaras DMS/ADAS</h4>
                      <p className="text-slate-600 mb-4">
                        Integra cámaras inteligentes para monitoreo en tiempo real y detección de eventos.
                      </p>
                      <Link href="#camaras" className="text-blue-700 font-medium flex items-center">
                        Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/contacto">Solicitar demostración</Link>
              </Button>
            </div>
          </div>
        );
      
      case "servicios":
        return (
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Headphones className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Soporte Profesional</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Servicios Preventivos LOGIFIT</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Nuestro equipo de analistas SSOMA y especialistas en fatiga trabajan 24/7 para garantizar la seguridad de sus operadores.
              </p>
            </div>

            {/* Service Options */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Servicios Disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="p-3 bg-blue-100 rounded-full mr-4">
                        <Headphones className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Servicio Preventivo 24/7</h4>
                        <p className="text-slate-600 mb-4">
                          Monitoreo continuo por analistas SSOMA especializados que responden inmediatamente ante signos de fatiga.
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span className="text-slate-700">Monitoreo 24/7 por analistas especializados</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span className="text-slate-700">Llamadas preventivas ante signos de fatiga</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span className="text-slate-700">Reportes diarios de eventos y seguimiento</span>
                          </li>
                        </ul>
                        <Button asChild>
                          <Link href="/contacto">Solicitar información</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="p-3 bg-blue-100 rounded-full mr-4">
                        <Bed className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Servicio REST para APNEA</h4>
                        <p className="text-slate-600 mb-4">
                          Acompañamiento médico especializado para operadores con APNEA o fatiga crónica, con seguimiento personalizado.
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span className="text-slate-700">Evaluación médica especializada</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span className="text-slate-700">Seguimiento personalizado para cada operador</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <span className="text-slate-700">Planes de tratamiento y mejora del descanso</span>
                          </li>
                        </ul>
                        <Button asChild>
                          <Link href="/contacto">Solicitar información</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ROI and Case Study */}
            <div className="bg-blue-50 p-8 rounded-lg mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Impacto en la Operación</h3>
                  <p className="text-slate-700 mb-4">
                    Nuestros servicios preventivos han demostrado resultados significativos:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>98% de efectividad</strong> en la prevención de accidentes por fatiga</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>40% de mejora</strong> en la calidad del sueño de los operadores</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-slate-700"><strong>Reducción significativa</strong> en ausentismo laboral</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Testimonio: Minera Los Andes</h3>
                  <p className="text-slate-700 mb-4">
                    "El servicio REST de LOGIFIT ha sido fundamental para nuestros operadores con problemas crónicos de sueño. El seguimiento personalizado y las recomendaciones médicas han mejorado significativamente su calidad de vida y desempeño laboral."
                  </p>
                  <p className="text-blue-700 font-medium">
                    — Juan Rodríguez, Gerente de Seguridad, Minera Los Andes
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/casos-exito">Ver más casos de éxito</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Cross-selling */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Soluciones Complementarias</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Watch className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Wearables Inteligentes</h4>
                      <p className="text-slate-600 mb-4">
                        Complementa el servicio preventivo con monitoreo continuo de signos vitales.
                      </p>
                      <Link href="#wearables" className="text-blue-700 font-medium flex items-center">
                        Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Camera className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Cámaras DMS/ADAS</h4>
                      <p className="text-slate-600 mb-4">
                        Potencia el monitoreo con detección en tiempo real durante la operación.
                      </p>
                      <Link href="#camaras" className="text-blue-700 font-medium flex items-center">
                        Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/contacto">Solicitar demostración</Link>
              </Button>
            </div>
          </div>
        );
      
      case "paquetes":
        return (
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Star className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Soluciones Completas</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Paquetes Integrales LOGIFIT</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Combinaciones optimizadas de hardware, software y servicios diseñadas para maximizar la seguridad y ofrecer el mejor valor.
              </p>
            </div>

            {/* Package Options */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Paquete Esencial */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold">Paquete Esencial</h4>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-blue-700" />
                        <DollarSign className="h-4 w-4 text-slate-300" />
                        <DollarSign className="h-4 w-4 text-slate-300" />
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">
                      Solución básica para empresas que inician su programa de prevención de fatiga.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mb-4">
                      <h5 className="font-semibold mb-2">Incluye:</h5>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">LOGIFIT Band Lite (10 unidades)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">App móvil para operadores</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Dashboard básico para supervisores</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Soporte técnico 8x5</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg mb-6">
                      <p className="text-green-800 text-sm font-medium">
                        Ahorro del 10% comparado con la compra individual
                      </p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/contacto">Solicitar cotización</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Paquete Profesional */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow relative">
                  <div className="absolute top-0 right-0 bg-blue-700 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                    Más popular
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold">Paquete Profesional</h4>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-blue-700" />
                        <DollarSign className="h-4 w-4 text-blue-700" />
                        <DollarSign className="h-4 w-4 text-slate-300" />
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">
                      Solución completa para empresas comprometidas con la seguridad de sus operadores.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mb-4">
                      <h5 className="font-semibold mb-2">Incluye:</h5>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">LOGIFIT Band Pro (20 unidades)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">LOGIFIT DMS (5 unidades)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Plataforma Enterprise completa</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Monitoreo 12x6 por analistas SSOMA</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Capacitación para supervisores</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg mb-6">
                      <p className="text-green-800 text-sm font-medium">
                        Ahorro del 15% comparado con la compra individual
                      </p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/contacto">Solicitar cotización</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Paquete Enterprise */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold">Paquete Enterprise</h4>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-blue-700" />
                        <DollarSign className="h-4 w-4 text-blue-700" />
                        <DollarSign className="h-4 w-4 text-blue-700" />
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">
                      Solución integral para grandes operaciones con máximos estándares de seguridad.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mb-4">
                      <h5 className="font-semibold mb-2">Incluye:</h5>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">LOGIFIT Band Pro (50 unidades)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">LOGIFIT DMS+ADAS (15 unidades)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Plataforma Enterprise personalizada</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Monitoreo 24/7 por analistas SSOMA</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Servicio REST para casos especiales</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span className="text-slate-700">Programa completo de capacitación</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg mb-6">
                      <p className="text-green-800 text-sm font-medium">
                        Ahorro del 20% comparado con la compra individual
                      </p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/contacto">Solicitar cotización</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-800 text-center">Comparativa de Paquetes</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-slate-200 p-3 text-left">Características</th>
                      <th className="border border-slate-200 p-3 text-center">Esencial</th>
                      <th className="border border-slate-200 p-3 text-center">Profesional</th>
                      <th className="border border-slate-200 p-3 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 p-3 font-medium">Wearables incluidos</td>
                      <td className="border border-slate-200 p-3 text-center">10 Band Lite</td>
                      <td className="border border-slate-200 p-3 text-center">20 Band Pro</td>
                      <td className="border border-slate-200 p-3 text-center">50 Band Pro</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-3 font-medium">Cámaras DMS/ADAS</td>
                      <td className="border border-slate-200 p-3 text-center">-</td>
                      <td className="border border-slate-200 p-3 text-center">5 DMS Basic</td>
                      <td className="border border-slate-200 p-3 text-center">15 DMS+ADAS</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-3 font-medium">Plataforma</td>
                      <td className="border border-slate-200 p-3 text-center">Básica</td>
                      <td className="border border-slate-200 p-3 text-center">Enterprise</td>
                      <td className="border border-slate-200 p-3 text-center">Enterprise Personalizada</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-3 font-medium">Monitoreo</td>
                      <td className="border border-slate-200 p-3 text-center">-</td>
                      <td className="border border-slate-200 p-3 text-center">12x6</td>
                      <td className="border border-slate-200 p-3 text-center">24x7</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-3 font-medium">Servicio REST</td>
                      <td className="border border-slate-200 p-3 text-center">-</td>
                      <td className="border border-slate-200 p-3 text-center">-</td>
                      <td className="border border-slate-200 p-3 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-3 font-medium">Capacitación</td>
                      <td className="border border-slate-200 p-3 text-center">Básica</td>
                      <td className="border border-slate-200 p-3 text-center">Completa</td>
                      <td className="border border-slate-200 p-3 text-center">Programa Personalizado</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-3 font-medium">Soporte técnico</td>
                      <td className="border border-slate-200 p-3 text-center">8x5</td>
                      <td className="border border-slate-200 p-3 text-center">12x6</td>
                      <td className="border border-slate-200 p-3 text-center">24x7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-blue-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-800 text-center">Calcula tu ROI</h3>
              <p className="text-slate-700 mb-6 text-center">
                Nuestras soluciones no solo mejoran la seguridad, sino que también ofrecen un retorno de inversión significativo.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold mb-4 text-center">Reducción de Accidentes</h4>
                  <p className="text-slate-600 text-center">
                    Reducción promedio del 75% en accidentes relacionados con fatiga.
                  </p>
                  <div className="mt-4 text-center">
                    <span className="text-3xl font-bold text-blue-700">$150,000</span>
                    <p className="text-sm text-slate-500">Ahorro anual estimado</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold mb-4 text-center">Mejora en Productividad</h4>
                  <p className="text-slate-600 text-center">
                    Aumento promedio del 25% en productividad de operadores.
                  </p>
                  <div className="mt-4 text-center">
                    <span className="text-3xl font-bold text-blue-700">$80,000</span>
                    <p className="text-sm text-slate-500">Beneficio anual estimado</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold mb-4 text-center">Reducción de Seguros</h4>
                  <p className="text-slate-600 text-center">
                    Reducción promedio del 28% en costos de seguros.
                  </p>
                  <div className="mt-4 text-center">
                    <span className="text-3xl font-bold text-blue-700">$45,000</span>
                    <p className="text-sm text-slate-500">Ahorro anual estimado</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button asChild size="lg">
                  <Link href="/contacto">Solicitar análisis personalizado</Link>
                </Button>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/contacto">Solicitar demostración</Link>
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Componente reutilizable para CTA
  const CTASection = ({ title, description }: { title: string; description: string }) => (
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
          {description}
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
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestras Soluciones</h1>
            <p className="text-xl mb-8 text-blue-100">
              Descubre nuestro ecosistema completo de productos y servicios diseñados para maximizar la seguridad y prevenir la fatiga laboral.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Dynamic Content */}
      <section id="category-content" className="py-16">
        {renderContent()}
      </section>

      {/* Después de todos los activeCategory conditions, fuera de ellos */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para proteger a tus operadores?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Contáctanos hoy mismo para conocer cómo nuestras soluciones pueden adaptarse a las necesidades específicas de tu empresa.
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

      {/* Cierre del componente */}
    </div>
  );
}