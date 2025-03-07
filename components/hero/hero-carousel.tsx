'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface HeroProps {
  hero: {
    name: string;
    isActive: boolean;
    displayType: 'carousel' | 'static' | 'rollover' | 'parallax';
    autoplayInterval?: number;
    publishAt?: string;
    expireAt?: string | null;
    priority?: number;
    slides: {
      title: string;
      subtitle: string;
      backgroundColor: string;
      textColor: string;
      mediaType: 'image' | 'video';
      image: {
        url: string;
        alternativeText: string;
      }[];
      video?: {
        url: string;
      }[];
      imagePosition?: 'left' | 'right' | 'center';
      ctaButtons: {
        text: string;
        url: string;
        variant: 'primary' | 'secondary';
      }[];
    }[];
  };
}

export function HeroCarousel({ hero }: HeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start'
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Limpiar el intervalo existente
  const clearAutoplayInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Configurar el autoplay
  useEffect(() => {
    if (!emblaApi || !hero?.autoplayInterval) return

    const autoplay = () => {
      clearAutoplayInterval()
      intervalRef.current = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext()
        }
      }, hero.autoplayInterval * 1000)
    }

    autoplay()

    // Limpiar al desmontar
    return () => clearAutoplayInterval()
  }, [emblaApi, hero?.autoplayInterval, clearAutoplayInterval])

  // Actualizar el slide actual
  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  return (
    <section className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {hero?.slides?.map((slide, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: slide.backgroundColor || '#144272',
              }}
              className={`embla__slide flex-[0_0_100%] relative py-20 md:py-32 text-white`}
            >
              <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-8 text-white/90">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {slide.ctaButtons?.map((button, btnIndex) => (
                        <Button 
                          key={btnIndex}
                          asChild 
                          size="lg" 
                          variant={button.variant === 'primary' ? 'default' : 'outline'}
                          className={
                            button.variant === 'primary' 
                              ? 'bg-white text-[#144272] hover:bg-blue-50'
                              : 'border-white text-white hover:bg-white/10'
                          }
                        >
                          <Link href={button.url}>{button.text}</Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                    {slide.mediaType === 'video' ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${slide.video[0]?.url}`}
                        className="object-cover rounded-lg w-full h-full"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <Image
                        src={slide.image?.[0]?.url ?
                          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${slide.image[0].url}` :
                          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        }
                        alt={slide.image?.[0]?.alternativeText || "Hero Image"}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-lg"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {hero?.slides?.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  )
} 