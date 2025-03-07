import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Términos de Uso - LOGIFIT',
  description: 'Términos y condiciones de uso de los servicios y plataforma de LOGIFIT.',
};

export default function TerminosUso() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Términos de Uso</h1>
            <p className="text-lg mb-0 text-blue-100">
              Condiciones generales para el uso de nuestros servicios
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
              
              <h2>1. Aceptación de los términos</h2>
              <p>
                Al acceder y utilizar los servicios de LOGIFIT, usted acepta estar sujeto a estos Términos de Uso. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a nuestros servicios.
              </p>
              
              <h2>2. Cambios en los términos</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web. Su uso continuado de nuestros servicios después de la publicación de los cambios constituirá su aceptación de dichos cambios.
              </p>
              
              <h2>3. Descripción del servicio</h2>
              <p>
                LOGIFIT proporciona soluciones tecnológicas y servicios para la prevención y gestión de fatiga laboral, incluyendo pero no limitado a wearables inteligentes, cámaras DMS/ADAS, plataformas de monitoreo y servicios preventivos.
              </p>
              
              <h2>4. Cuentas de usuario</h2>
              <p>
                Cuando crea una cuenta con nosotros, debe proporcionar información precisa, completa y actualizada en todo momento. El incumplimiento de esta obligación constituye un incumplimiento de los Términos, lo que puede resultar en la terminación inmediata de su cuenta.
              </p>
              <p>
                Usted es responsable de mantener la confidencialidad de su cuenta y contraseña y de restringir el acceso a su computadora, y acepta la responsabilidad de todas las actividades que ocurran bajo su cuenta o contraseña.
              </p>
              
              <h2>5. Propiedad intelectual</h2>
              <p>
                El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de LOGIFIT y sus licenciantes. El servicio está protegido por derechos de autor, marcas registradas y otras leyes de propiedad intelectual.
              </p>
              
              <h2>6. Enlaces a otros sitios web</h2>
              <p>
                Nuestro servicio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por LOGIFIT. LOGIFIT no tiene control ni asume ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios web de terceros.
              </p>
              
              <h2>7. Terminación</h2>
              <p>
                Podemos terminar o suspender su cuenta inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluyendo, sin limitación, si usted incumple los Términos.
              </p>
              
              <h2>8. Limitación de responsabilidad</h2>
              <p>
                En ningún caso LOGIFIT, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo, sin limitación, pérdida de beneficios, datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes de su acceso o uso o incapacidad para acceder o usar el servicio.
              </p>
              
              <h2>9. Ley aplicable</h2>
              <p>
                Estos Términos se regirán e interpretarán de acuerdo con las leyes del país donde LOGIFIT tiene su sede principal, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
              </p>
              
              <h2>10. Contacto</h2>
              <p>
                Si tiene alguna pregunta sobre estos Términos, contáctenos en:
              </p>
              <p>
                Email: legal@logifit.com<br />
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