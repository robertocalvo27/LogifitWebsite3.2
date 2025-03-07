import { HeroParallax } from './hero-parallax'
import { HeroCarousel } from './hero-carousel'
import { HeroRollover } from './hero-rollover'
import { adaptarHero } from './adapters'
import { HeroStrapi } from './types'

export function Hero({ hero }: { hero: HeroStrapi }) {
  try {
    const heroAdaptado = adaptarHero(hero)
    
    // Forzar el uso de HeroParallax para probar
    console.log('Forzando HeroParallax independientemente del displayType')
    return <HeroParallax hero={heroAdaptado} />
  } catch (error) {
    console.error('Error renderizando Hero:', error)
    return null
  }
} 