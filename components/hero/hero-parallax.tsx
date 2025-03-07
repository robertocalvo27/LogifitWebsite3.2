'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import { HeroProps } from './types'

export function HeroParallax({ hero }: { hero: HeroProps }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const currentSlide = hero.slides[0]
  
  // Usar URLs directas del adaptador
  const mediaUrl = currentSlide.mediaType === 'image' 
    ? (currentSlide.image && currentSlide.image[0]?.url) 
    : (currentSlide.video && currentSlide.video[0]?.url)

  if (!mediaUrl) {
    return <div>Error: No se pudo cargar el contenido multimedia</div>
  }

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 h-[120%] w-full"
      >
        {currentSlide.mediaType === 'image' ? (
          <Image
            src={mediaUrl}
            alt={currentSlide.image?.[0]?.alternativeText || currentSlide.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        )}
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="max-w-4xl space-y-6 text-center">
          <motion.h1 style={{ opacity }} className="text-5xl font-bold text-white">
            {currentSlide.title}
          </motion.h1>
          <motion.p style={{ opacity }} className="text-xl text-white">
            {currentSlide.subtitle}
          </motion.p>
          
          {/* Botones CTA si existen */}
          {currentSlide.ctaButtons && currentSlide.ctaButtons.length > 0 && (
            <div className="mt-8 flex justify-center space-x-4">
              {currentSlide.ctaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.url}
                  className={`px-6 py-3 rounded-md ${
                    button.variant === 'primary'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border border-blue-600'
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 