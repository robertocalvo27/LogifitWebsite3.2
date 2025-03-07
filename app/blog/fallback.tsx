import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, AlertCircle } from "lucide-react";

interface FallbackProps {
  error?: Error | null;
  isLoading?: boolean;
}

export default function BlogFallback({ error, isLoading }: FallbackProps) {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Cargando artículos...</h2>
        <p className="text-gray-600">Por favor, espera mientras cargamos el contenido.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Error al cargar el blog</h1>
          <p className="text-gray-600 mb-8">
            Lo sentimos, ha ocurrido un error al cargar los artículos del blog. Estamos trabajando para solucionarlo.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-left mb-8">
            <h2 className="font-bold text-yellow-800 mb-2">Información para desarrolladores:</h2>
            <p className="text-yellow-700 text-sm">
              {error.message || "Error desconocido"}
            </p>
          </div>
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  // No hay artículos disponibles
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <BookOpen className="h-16 w-16 text-blue-300 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">No hay artículos disponibles</h1>
      <p className="text-gray-600 mb-8">
        Actualmente no hay artículos publicados en nuestro blog. ¡Vuelve pronto para ver nuevo contenido!
      </p>
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left mb-8 max-w-2xl mx-auto">
        <h2 className="font-bold text-blue-800 mb-2">¿Eres administrador?</h2>
        <p className="text-blue-700">
          Si eres parte del equipo de contenido, puedes comenzar a crear artículos desde el panel de administración.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
} 