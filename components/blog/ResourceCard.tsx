import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { 
  FileText as DocumentTextIcon, 
  Video as VideoCameraIcon, 
  BarChart as PresentationChartBarIcon,
  Calendar as CalendarIcon,
  Wrench as WrenchIcon
} from "lucide-react";

interface ResourceProps {
  title: string;
  description: string;
  type: 'video' | 'documento' | 'caso_estudio' | 'evento' | 'herramienta';
  url?: string;
  file?: {
    url: string;
    name: string;
  };
  featuredImage: {
    url: string;
    alternativeText?: string;
  };
  date: string;
}

const ResourceCard: React.FC<ResourceProps> = ({
  title,
  description,
  type,
  url,
  file,
  featuredImage,
  date
}) => {
  // Iconos para cada tipo de recurso
  const getResourceIcon = () => {
    switch (type) {
      case 'video':
        return <VideoCameraIcon className="h-6 w-6" />;
      case 'documento':
        return <DocumentTextIcon className="h-6 w-6" />;
      case 'caso_estudio':
        return <PresentationChartBarIcon className="h-6 w-6" />;
      case 'evento':
        return <CalendarIcon className="h-6 w-6" />;
      case 'herramienta':
        return <WrenchIcon className="h-6 w-6" />;
      default:
        return <DocumentTextIcon className="h-6 w-6" />;
    }
  };

  // Texto del botón según el tipo
  const getButtonText = () => {
    switch (type) {
      case 'video':
        return 'Ver video';
      case 'documento':
        return 'Descargar';
      case 'caso_estudio':
        return 'Leer caso';
      case 'evento':
        return 'Ver evento';
      case 'herramienta':
        return 'Usar herramienta';
      default:
        return 'Ver recurso';
    }
  };

  // URL del recurso
  const resourceUrl = file ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${file.url}` : url;

  return (
    <div className="border rounded-lg overflow-hidden group hover:shadow-md transition">
      <div className="relative h-40">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featuredImage.url}`}
          alt={featuredImage.alternativeText || title}
          fill
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-white rounded-full p-2">
          <div className="text-blue-600">
            {getResourceIcon()}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{formatDate(date)}</div>
        <h3 className="font-bold mb-2 group-hover:text-blue-600 transition">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Link 
          href={resourceUrl || '#'} 
          target={type !== 'evento' ? "_blank" : "_self"}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
        >
          {getButtonText()}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ResourceCard; 