import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Política de Cookies - LOGIFIT',
  description: 'Información sobre el uso de cookies en el sitio web de LOGIFIT.',
};

export default function Cookies() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Política de Cookies</h1>
            <p className="text-lg mb-0 text-blue-100">
              Información sobre el uso de cookies en nuestro sitio web
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p>
                <strong>Última actualización:</strong> 1 de junio de 2025
              </p>
              
              <h2>1. ¿Qué son las cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tablet o móvil) cuando visita un sitio web. Las cookies son ampliamente utilizadas para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
              </p>
              
              <h2>2. Cómo utilizamos las cookies</h2>
              <p>
                Utilizamos cookies por varias razones que se detallan a continuación. Desafortunadamente, en la mayoría de los casos, no existen opciones estándar de la industria para deshabilitar las cookies sin deshabilitar por completo la funcionalidad y las características que agregan a este sitio. Se recomienda que deje activadas todas las cookies si no está seguro de si las necesita o no, en caso de que se utilicen para proporcionar un servicio que usted utiliza.
              </p>
              
              <h2>3. Tipos de cookies que utilizamos</h2>
              
              <h3>3.1 Cookies estrictamente necesarias</h3>
              <p>
                Estas cookies son esenciales para permitirle utilizar las funcionalidades del sitio web, como el acceso a áreas seguras. Sin estas cookies, no podemos proporcionar los servicios que ha solicitado.
              </p>
              
              <h3>3.2 Cookies de rendimiento</h3>
              <p>
                Estas cookies recopilan información sobre cómo los visitantes utilizan un sitio web, por ejemplo, qué páginas visitan con más frecuencia y si reciben mensajes de error. Estas cookies no recopilan información que identifique a un visitante. Toda la información que recopilan estas cookies es agregada y, por lo tanto, anónima. Solo se utiliza para mejorar el funcionamiento de un sitio web.
              </p>
              
              <h3>3.3 Cookies de funcionalidad</h3>
              <p>
                Estas cookies permiten que el sitio web recuerde las elecciones que hace (como su nombre de usuario, idioma o la región en la que se encuentra) y proporciona características mejoradas y más personales.
              </p>
              
              <h3>3.4 Cookies de publicidad</h3>
              <p>
                Estas cookies se utilizan para entregar anuncios más relevantes para usted y sus intereses. También se utilizan para limitar el número de veces que ve un anuncio, así como para ayudar a medir la efectividad de la campaña publicitaria.
              </p>
              
              <h2>4. Control de cookies</h2>
              <p>
                Puede controlar y/o eliminar las cookies según lo desee. Puede eliminar todas las cookies que ya están en su computadora y puede configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si hace esto, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y algunos servicios y funcionalidades pueden no funcionar.
              </p>
              
              <h2>5. Más información</h2>
              <p>
                Esperamos que esto haya aclarado las cosas para usted. Como se mencionó anteriormente, si hay algo que no está seguro de si necesita o no, generalmente es más seguro dejar las cookies habilitadas en caso de que interactúen con una de las funciones que utiliza en nuestro sitio.
              </p>
              <p>
                Si todavía está buscando más información, puede contactarnos a través de uno de nuestros métodos de contacto preferidos:
              </p>
              <p>
                Email: cookies@logifit.com<br />
                Teléfono: +51 123 456 789
              </p>
              
              <div className="mt-8">
                <Button asChild>
                  <Link href="/">Volver al inicio</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}