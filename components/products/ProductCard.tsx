// components/products/ProductCard.tsx
'use client';

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  name: string
  slug: string
  categorySlug?: string
  shortDescription: string
  price?: number
  status: 'active' | 'inactive' | 'coming_soon'
  imageUrl: string
  isCategory?: boolean
}

export function ProductCard({
  name,
  slug,
  categorySlug,
  shortDescription,
  price,
  status,
  imageUrl,
  isCategory = false
}: ProductCardProps) {
  console.log("ProductCard rendering:", {
    name,
    slug,
    imageUrl
  });

  // Construir la URL del enlace
  const linkUrl = isCategory
    ? `/soluciones/${slug}`
    : categorySlug
    ? `/soluciones/${categorySlug}/productos/${slug}`
    : `/productos/${slug}`;

  // Usar una imagen de placeholder si la URL de la imagen está vacía o es inválida
  const finalImageUrl = imageUrl || '/images/product-placeholder.jpg';

  return (
    <Link href={linkUrl} className="group">
      <Card className="overflow-hidden border-0 shadow-md transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={finalImageUrl}
            alt={name}
            width={300}
            height={300}
            className="object-cover transition-all hover:scale-105"
            onError={(e) => {
              // Fallback si la imagen principal falla
              e.currentTarget.src = '/images/product-placeholder.jpg';
            }}
          />
          {status === 'coming_soon' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge className="text-lg">Próximamente</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{shortDescription}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          {price ? (
            <p className="text-lg font-bold">${price.toFixed(2)}</p>
          ) : (
            <p className="text-sm text-gray-500">Precio a consultar</p>
          )}
          <span className="text-sm font-medium text-blue-600 group-hover:underline">
            Ver detalles
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}