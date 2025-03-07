import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea una fecha en formato legible en español
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return '';
  }
}

export function calculateReadingTime(content: string): number {
  // Eliminar etiquetas HTML
  const text = content.replace(/<[^>]*>/g, '');
  
  // Contar palabras (aproximadamente)
  const words = text.split(/\s+/).length;
  
  // Velocidad de lectura promedio: 200 palabras por minuto
  const readingTime = Math.ceil(words / 200);
  
  // Asegurar un mínimo de 1 minuto
  return Math.max(1, readingTime);
}
