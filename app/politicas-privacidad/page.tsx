import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Políticas de Privacidad - LOGIFIT',
  description: 'Políticas de privacidad y tratamiento de datos personales de LOGIFIT.',
};

export default function PoliticasPrivacidad() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Políticas de Privacidad</h1>
            <p className="text-lg mb-0 text-blue-100">
              Información sobre el tratamiento de sus datos personales
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
              
              <h2>1. Introducción</h2>
              <p>
                En LOGIFIT respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web y le informará sobre sus derechos de privacidad y cómo la ley lo protege.
              </p>
              
              <h2>2. Datos que recopilamos</h2>
              <p>
                Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted, que hemos agrupado de la siguiente manera:
              </p>
              <ul>
                <li><strong>Datos de identidad:</strong> incluye nombre, apellido, nombre de usuario o identificador similar.</li>
                <li><strong>Datos de contacto:</strong> incluye dirección de facturación, dirección de entrega, dirección de correo electrónico y números de teléfono.</li>
                <li><strong>Datos técnicos:</strong> incluye dirección de protocolo de Internet (IP), datos de inicio de sesión, tipo y versión del navegador, configuración de zona horaria y ubicación, tipos y versiones de complementos del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que utiliza para acceder a este sitio web.</li>
                <li><strong>Datos de perfil:</strong> incluye su nombre de usuario y contraseña, compras o pedidos realizados por usted, sus intereses, preferencias, comentarios y respuestas a encuestas.</li>
                <li><strong>Datos de uso:</strong> incluye información sobre cómo utiliza nuestro sitio web, productos y servicios.</li>
              </ul>
              
              <h2>3. Cómo utilizamos sus datos</h2>
              <p>
                Solo utilizaremos sus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos sus datos personales en las siguientes circunstancias:
              </p>
              <ul>
                <li>Cuando necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado con usted.</li>
                <li>Cuando sea necesario para nuestros intereses legítimos (o los de un tercero) y sus intereses y derechos fundamentales no anulen esos intereses.</li>
                <li>Cuando necesitemos cumplir con una obligación legal o regulatoria.</li>
              </ul>
              
              <h2>4. Divulgación de sus datos personales</h2>
              <p>
                Podemos compartir sus datos personales con las partes que se indican a continuación para los fines establecidos en esta política de privacidad:
              </p>
              <ul>
                <li>Proveedores de servicios que proporcionan servicios de TI y administración de sistemas.</li>
                <li>Asesores profesionales, incluidos abogados, banqueros, auditores y aseguradoras.</li>
                <li>Autoridades fiscales, reguladoras y otras autoridades.</li>
                <li>Terceros a quienes podemos optar por vender, transferir o fusionar partes de nuestro negocio o nuestros activos.</li>
              </ul>
              
              <h2>5. Seguridad de datos</h2>
              <p>
                Hemos implementado medidas de seguridad apropiadas para evitar que sus datos personales se pierdan, utilicen o accedan de manera no autorizada, se modifiquen o divulguen accidentalmente.
              </p>
              
              <h2>6. Sus derechos legales</h2>
              <p>
                Bajo ciertas circunstancias, usted tiene derechos bajo las leyes de protección de datos en relación con sus datos personales, que incluyen:
              </p>
              <ul>
                <li>Solicitar acceso a sus datos personales.</li>
                <li>Solicitar la corrección de sus datos personales.</li>
                <li>Solicitar la eliminación de sus datos personales.</li>
                <li>Oponerse al procesamiento de sus datos personales.</li>
                <li>Solicitar la restricción del procesamiento de sus datos personales.</li>
                <li>Solicitar la transferencia de sus datos personales.</li>
                <li>Derecho a retirar el consentimiento.</li>
              </ul>
              
              <h2>7. Contacto</h2>
              <p>
                Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, contáctenos en:
              </p>
              <p>
                Email: privacidad@logifit.com<br />
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