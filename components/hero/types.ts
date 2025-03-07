export interface CtaButton {
  texto: string
  url: string
  variante: 'primario' | 'secundario'
}

export interface MediaStrapi {
  data?: {
    attributes: {
      url: string
      alternativeText?: string
    }
  } | null
}

export interface HeroSlideStrapi {
  titulo: string
  subtitulo: string
  tipoMedia: 'imagen' | 'video'
  imagen: MediaStrapi
  video: MediaStrapi
  botonesCta?: CtaButton[]
}

export interface HeroStrapi {
  // Puede ser cualquier estructura, ya que será adaptada por adaptarHero
  [key: string]: any
}

export interface HeroSlide {
  title: string
  subtitle: string
  backgroundColor?: string
  textColor?: string
  mediaType: 'image' | 'video'
  image: {
    url: string
    alternativeText?: string
  }[]
  video: {
    url: string
  }[]
  imagePosition?: string
  ctaButtons?: {
    text: string
    url: string
    variant: 'primary' | 'secondary'
  }[]
}

export interface HeroProps {
  name: string
  isActive: boolean
  displayType: string
  autoplayInterval?: number
  publishAt?: string
  expireAt?: string | null
  priority?: number
  slides: HeroSlide[]
} 