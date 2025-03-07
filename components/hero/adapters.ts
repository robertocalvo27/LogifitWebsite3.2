import { Hero, HeroSlide, HeroStrapi, HeroProps } from './types'

export const getMediaUrl = (slide: HeroSlide) => {
  if (slide.tipoMedia === 'image' && slide.image?.[0]?.url) {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${slide.image[0].url}`
  }
  if (slide.tipoMedia === 'video' && slide.video?.[0]?.url) {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${slide.video[0].url}`
  }
  return null
}

export const adaptToCarousel = (hero: Hero) => ({
  name: hero.nombre,
  isActive: hero.activo,
  displayType: hero.tipoDisplay,
  autoplayInterval: hero.autoplayInterval,
  slides: hero.slides.map(slide => ({
    title: slide.titulo,
    subtitle: slide.subtitulo,
    mediaType: slide.tipoMedia,
    image: slide.image,
    video: slide.video,
    ctaButtons: slide.ctaButtons || []
  }))
})

export const adaptToParallax = (hero: Hero) => ({
  name: hero.nombre,
  isActive: hero.activo,
  displayType: hero.tipoDisplay,
  slides: hero.slides.map(slide => ({
    title: slide.titulo,
    subtitle: slide.subtitulo,
    mediaType: slide.tipoMedia,
    image: slide.image,
    video: slide.video
  }))
})

export const adaptToRollover = (hero: Hero) => ({
  name: hero.name,
  isActive: hero.isActive,
  displayType: hero.displayType,
  slides: hero.slides.map(slide => ({
    title: slide.title,
    subtitle: slide.subtitle,
    backgroundColor: slide.backgroundColor,
    textColor: slide.textColor,
    mediaType: slide.mediaType,
    mediaUrl: getMediaUrl(slide),
    imagePosition: slide.imagePosition,
    ctaButtons: slide.ctaButtons
  }))
})

export function adaptarHero(hero: any) {
  console.log('Adaptando hero en adapters.ts:', hero);
  
  // Si el hero ya tiene la estructura correcta, simplemente lo devolvemos
  if (hero.displayType && hero.slides) {
    console.log('Hero ya adaptado, displayType:', hero.displayType);
    return hero;
  }
  
  // Si viene de Strapi, adaptamos la estructura
  if (hero.data && hero.data.attributes) {
    const heroData = hero.data.attributes;
    console.log('Adaptando hero de Strapi, displayType:', heroData.displayType);
    
    // Resto del código de adaptación...
    return {
      name: heroData.name,
      isActive: heroData.isActive,
      displayType: heroData.displayType, // Asegúrate de que este valor se preserve
      // Resto de propiedades...
    };
  }
  
  // Si no es ninguna de las estructuras anteriores, podría ser un objeto directo
  console.log('Adaptando hero directo, displayType:', hero.displayType);
  
  return {
    ...hero,
    // Asegúrate de que displayType se mantenga
    displayType: hero.displayType || hero.tipoDisplay || 'parallax' // Valor por defecto como fallback
  };
} 