import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RelatedArticles({ articles = [], currentArticleId }) {
  // Filtrar el artículo actual si está en la lista y limitar a 3 artículos relacionados
  const filteredArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3);

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-6">Artículos relacionados</h3>
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <div key={article.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4">
            <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded">
              {article.featuredImage ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.featuredImage.url}`}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <Link href={`/blog/${article.slug}`} className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">
                {article.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                }) : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 