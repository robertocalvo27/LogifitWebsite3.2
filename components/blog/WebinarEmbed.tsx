'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Calendar as CalendarIcon, Clock as ClockIcon, User as UserIcon } from "lucide-react";

interface WebinarProps {
  title: string;
  description: string;
  videoUrl: string;
  date: string;
  duration: string;
  presenter: string;
  featuredImage: {
    url: string;
    alternativeText?: string;
  };
}

const WebinarEmbed: React.FC<WebinarProps> = ({
  title,
  description,
  videoUrl,
  date,
  duration,
  presenter,
  featuredImage
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Extraer el ID del video de YouTube
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYouTubeId(videoUrl);
  const thumbnailUrl = featuredImage?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${featuredImage.url}`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  return (
    <div className="mb-8 border rounded-lg overflow-hidden">
      <div className="relative">
        {!isPlaying ? (
          <>
            <div className="relative w-full h-64">
              <Image
                src={thumbnailUrl}
                alt={featuredImage?.alternativeText || title}
                fill
                style={{ objectFit: "cover" }}
                className="brightness-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-red-700 transition"
                  aria-label="Reproducir webinar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-gray-100 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{formatDate(date)}</span>
                <span className="text-sm text-gray-600">{duration}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-700 text-sm mb-2">{description}</p>
              <p className="text-sm font-medium">Presentado por: {presenter}</p>
            </div>
          </>
        ) : (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 md:h-96"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebinarEmbed; 