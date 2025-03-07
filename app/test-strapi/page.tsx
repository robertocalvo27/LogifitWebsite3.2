'use client';

import { useState, useEffect } from 'react';

export default function TestStrapiPage() {
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Obtener la URL base de Strapi desde las variables de entorno
        const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
        
        // Intentar obtener servicios
        const servicesResponse = await fetch(`${apiUrl}/api/services?populate=*`);
        if (!servicesResponse.ok) {
          throw new Error(`Error al obtener servicios: ${servicesResponse.statusText}`);
        }
        const servicesData = await servicesResponse.json();
        console.log('Datos de servicios recibidos:', servicesData);
        setServices(servicesData.data || []);
        
        // Intentar obtener testimonios
        const testimonialsResponse = await fetch(`${apiUrl}/api/testimonials?populate=*`);
        if (!testimonialsResponse.ok) {
          throw new Error(`Error al obtener testimonios: ${testimonialsResponse.statusText}`);
        }
        const testimonialsData = await testimonialsResponse.json();
        console.log('Datos de testimonios recibidos:', testimonialsData);
        setTestimonials(testimonialsData.data || []);
        
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Test de Conexión con Strapi</h1>
      
      {loading && <p className="text-gray-600">Cargando datos...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
          <p className="mt-2">
            Asegúrate de que:
          </p>
          <ul className="list-disc ml-6 mt-1">
            <li>Strapi está ejecutándose en http://localhost:1337</li>
            <li>Has configurado correctamente los permisos en Strapi (Settings &gt; USERS & PERMISSIONS PLUGIN &gt; Roles &gt; Public)</li>
            <li>Has creado contenido en las colecciones de Strapi</li>
          </ul>
        </div>
      )}
      
      {!loading && !error && (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Servicios ({services.length})</h2>
            {services.length === 0 ? (
              <p className="text-gray-600">No se encontraron servicios. Asegúrate de haber creado algunos en Strapi.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-medium mb-2">
                      {service.attributes?.title || "Sin título"}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {service.attributes?.description || "Sin descripción"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Slug: {service.attributes?.slug || "Sin slug"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Testimonios ({testimonials.length})</h2>
            {testimonials.length === 0 ? (
              <p className="text-gray-600">No se encontraron testimonios. Asegúrate de haber creado algunos en Strapi.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-medium mb-1">
                      {testimonial.attributes?.name || "Sin nombre"}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {testimonial.attributes?.position || "Sin posición"}, 
                      {testimonial.attributes?.company || "Sin empresa"}
                    </p>
                    <p className="text-gray-600 italic">
                      "{testimonial.attributes?.quote || "Sin testimonio"}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 