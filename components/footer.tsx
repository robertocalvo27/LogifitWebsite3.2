import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LOGIFIT</h3>
            <p className="text-slate-300 mb-4">
              Tecnología + Servicio Preventivo que protege a miles de personal clave en América Latina.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-300 hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-slate-300 hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/industrias" className="text-slate-300 hover:text-white">
                  Industrias
                </Link>
              </li>
              <li>
                <Link href="/casos-exito" className="text-slate-300 hover:text-white">
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-slate-300 hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-slate-300 hover:text-white">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/trabaja-con-nosotros" className="text-slate-300 hover:text-white">
                  Trabaja con Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios#wearables" className="text-slate-300 hover:text-white">
                  Wearables
                </Link>
              </li>
              <li>
                <Link href="/servicios#camaras" className="text-slate-300 hover:text-white">
                  Cámaras DMS/ADAS
                </Link>
              </li>
              <li>
                <Link href="/servicios#plataforma" className="text-slate-300 hover:text-white">
                  Plataforma Web y App
                </Link>
              </li>
              <li>
                <Link href="/servicios#servicio" className="text-slate-300 hover:text-white">
                  Servicio Preventivo
                </Link>
              </li>
              <li>
                <Link href="/servicios#rest" className="text-slate-300 hover:text-white">
                  Servicio REST
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-slate-300" />
                <div>
                  <p className="text-slate-300">Perú: +51 123 456 789</p>
                  <p className="text-slate-300">Chile: +56 2 2123 4567</p>
                  <p className="text-slate-300">México: +52 55 1234 5678</p>
                  <p className="text-slate-300">Centroamérica: +506 2222 3333</p>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-slate-300" />
                <span className="text-slate-300">contacto@logifit.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} LOGIFIT. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/politicas-privacidad" className="text-slate-400 hover:text-white text-sm">
                Políticas de Privacidad
              </Link>
              <Link href="/terminos-uso" className="text-slate-400 hover:text-white text-sm">
                Términos de Uso
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-white text-sm">
                Política de Cookies
              </Link>
              <Link href="/aviso-legal" className="text-slate-400 hover:text-white text-sm">
                Aviso Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;