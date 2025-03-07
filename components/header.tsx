"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">LOGIFIT</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Inicio
          </Link>
          <Link href="/soluciones" className="text-sm font-medium transition-colors hover:text-primary">
            Soluciones
          </Link>
          <Link href="/industrias" className="text-sm font-medium transition-colors hover:text-primary">
            Industrias
          </Link>
          <Link href="/casos-exito" className="text-sm font-medium transition-colors hover:text-primary">
            Casos de Éxito
          </Link>
          <Link href="/nosotros" className="text-sm font-medium transition-colors hover:text-primary">
            Nosotros
          </Link>
          <Link href="/contacto" className="text-sm font-medium transition-colors hover:text-primary">
            Contacto
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/contacto">Cotizar Servicio</Link>
          </Button>
          <Button asChild>
            <Link href="/demo">Solicitar Demo</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background p-6 flex flex-col">
          <nav className="flex flex-col gap-6">
            <Link href="/" className="text-lg font-medium" onClick={toggleMenu}>
              Inicio
            </Link>
            <Link href="/soluciones" className="text-lg font-medium" onClick={toggleMenu}>
              Soluciones
            </Link>
            <Link href="/industrias" className="text-lg font-medium" onClick={toggleMenu}>
              Industrias
            </Link>
            <Link href="/casos-exito" className="text-lg font-medium" onClick={toggleMenu}>
              Casos de Éxito
            </Link>
            <Link href="/nosotros" className="text-lg font-medium" onClick={toggleMenu}>
              Nosotros
            </Link>
            <Link href="/contacto" className="text-lg font-medium" onClick={toggleMenu}>
              Contacto
            </Link>
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <Button asChild variant="outline" onClick={toggleMenu}>
              <Link href="/contacto">Cotizar Servicio</Link>
            </Button>
            <Button asChild onClick={toggleMenu}>
              <Link href="/demo">Solicitar Demo</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;