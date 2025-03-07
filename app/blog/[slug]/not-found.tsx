import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <FileQuestion className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, el artículo que estás buscando no existe o ha sido movido.
        </p>
        <div className="space-y-4">
          <Button asChild variant="default">
            <Link href="/blog">
              Volver al blog
            </Link>
          </Button>
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              ¿Buscas contenido sobre prevención de fatiga? 
              Explora nuestros artículos más recientes en la sección de blog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 