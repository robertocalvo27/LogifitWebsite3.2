'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface HeroProps {
  hero: {
    name: string;
    isActive: boolean;
    displayType: 'carousel' | 'static' | 'rollover' | 'parallax';
    slides: {
      title: string;
      subtitle: string;
      backgroundColor: string;
      textColor: string;
      mediaType: 'image' | 'video';
      image: {
        data?: {
          attributes: {
            url: string;
            alternativeText?: string;
          }
        }
      };
      ctaButtons: {
        text: string;
        url: string;
        variant: 'primary' | 'secondary';
      }[];
    }[];
  };
}

export function HeroRollover({ hero }: HeroProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hero?.slides?.map((slide, index) => (
          <motion.div
            key={index}
            className="relative h-[400px] group overflow-hidden rounded-lg"
            whileHover="hover"
            initial="initial"
          >
            {/* Imagen de fondo */}
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${slide.image?.data?.attributes?.url || ''}`}
              alt={slide.image?.data?.attributes?.alternativeText || slide.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay con gradiente */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ backgroundColor: slide.backgroundColor }}
            />
            
            {/* Contenido */}
            <motion.div
              className="absolute inset-0 p-6 flex flex-col justify-end"
              variants={{
                initial: { opacity: 0, y: 20 },
                hover: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: slide.textColor }}>
                {slide.title}
              </h2>
              <p className="mb-4 line-clamp-2" style={{ color: slide.textColor }}>
                {slide.subtitle}
              </p>
              <div className="flex gap-3">
                {slide.ctaButtons?.map((button, btnIndex) => (
                  <Button
                    key={btnIndex}
                    asChild
                    variant={button.variant === 'primary' ? 'default' : 'outline'}
                    className={
                      button.variant === 'primary'
                        ? 'bg-white text-black hover:bg-white/90'
                        : 'border-white text-white hover:bg-white/10'
                    }
                  >
                    <Link href={button.url}>{button.text}</Link>
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 