import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Aviso Legal - LOGIFIT',
  description: 'Información legal sobre LOGIFIT, sus servicios y responsabilidades.',
};

export default function AvisoLegal() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Aviso Legal</h1>
            <p className="text-lg mb-0 text-blue-100">
              Información legal sobre nuestra empresa y servicios
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
              
              <h2>1. Información general</h2>
              <p>
                En cumplimiento con el deber de información dispuesto en la legislación vigente, por medio del presente aviso legal, LOGIFIT S.A., con domicilio en [Dirección Legal], inscrita en el Registro Mercantil de [Ciudad] con el número [Número de Registro], con NIF [Número de Identificación Fiscal], pone a disposición de los usuarios la siguiente información:
              </p>
              
              <h2>2. Objeto</h2>
              <p>
                El presente aviso legal regula el uso y utilización del sitio web www.logifit.com, del que es titular LOGIFIT S.A.
              </p>
              <p>
                La navegación por el sitio web de LOGIFIT atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal, que pueden sufrir modificaciones.
              </p>
              
              <h2>3. Responsabilidad</h2>
              <p>
                LOGIFIT se exime de cualquier tipo de responsabilidad derivada de la información publicada en su sitio web, siempre que esta información haya sido manipulada o introducida por un tercero ajeno al mismo.
              </p>
              <p>
                El sitio web de LOGIFIT puede utilizar cookies (pequeños archivos de información que el servidor envía al ordenador de quien accede a la página) para llevar a cabo determinadas funciones que son consideradas imprescindibles para el correcto funcionamiento y visualización del sitio. Las cookies utilizadas en el sitio web tienen, en todo caso, carácter temporal con la única finalidad de hacer más eficaz su transmisión ulterior y desaparecen al terminar la sesión del usuario.
              </p>
              
              <h2>4. Propiedad intelectual e industrial</h2>
              <p>
                LOGIFIT es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de LOGIFIT o bien de sus licenciantes.
              </p>
              <p>
                Todos los derechos reservados. En virtud de lo dispuesto en la legislación vigente sobre propiedad intelectual e industrial, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de LOGIFIT.
              </p>
              
              <h2>5. Ley aplicable y jurisdicción</h2>
              <p>
                Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación [país], a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de [Ciudad].
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