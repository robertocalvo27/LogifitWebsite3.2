import { fetchAPI } from '@/lib/api';

interface CtaButton {
  text: string;
  url: string;
  variant: 'primary' | 'secondary';
}

interface HeroSlide {
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
  mediaType: 'image' | 'video';
  image: {
    data: {
      attributes: {
        url: string;
        width: number;
        height: number;
        alternativeText?: string;
      };
    };
  };
  video?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  imagePosition: string;
  ctaButtons: CtaButton[];
}

interface Hero {
  data: {
    attributes: {
      name: string;
      isActive: boolean;
      displayType: 'carousel' | 'rollover' | 'parallax';
      autoplayInterval: number;
      slides: HeroSlide[];
    };
  }[];
}

const HERO_QUERY = `
  query {
    heroes {
      data {
        attributes {
          name
          isActive
          displayType
          autoplayInterval
          slides {
            title
            subtitle
            backgroundColor
            textColor
            mediaType
            image {
              data {
                attributes {
                  url
                  width
                  height
                  alternativeText
                }
              }
            }
            video {
              data {
                attributes {
                  url
                }
              }
            }
            imagePosition
            ctaButtons {
              text
              url
              variant
            }
          }
        }
      }
    }
  }
`;

export async function getActiveHero() {
  try {
    const response = await fetchAPI('', {
      query: HERO_QUERY
    });

    console.log('Respuesta de API heroes:', response);

    const activeHero = response.heroes?.data?.find(
      (hero: any) => hero.attributes.isActive
    );

    if (activeHero) {
      console.log('displayType en API:', activeHero.attributes.displayType);
    }

    // Devolver el hero con la estructura correcta para nuestros componentes
    return activeHero ? {
      name: activeHero.attributes.name,
      isActive: activeHero.attributes.isActive,
      displayType: activeHero.attributes.displayType,
      autoplayInterval: activeHero.attributes.autoplayInterval,
      slides: activeHero.attributes.slides.map((slide: any) => ({
        title: slide.title,
        subtitle: slide.subtitle,
        backgroundColor: slide.backgroundColor || '#144272',
        textColor: slide.textColor || 'white',
        mediaType: slide.mediaType,
        image: slide.image?.data ? [{
          url: slide.image.data.attributes.url,
          alternativeText: slide.image.data.attributes.alternativeText || slide.title
        }] : [],
        video: slide.video?.data ? [{
          url: slide.video.data.attributes.url
        }] : [],
        imagePosition: slide.imagePosition || 'center',
        ctaButtons: slide.ctaButtons || []
      }))
    } : null;
  } catch (error) {
    console.error('Error fetching hero:', error);
    return null;
  }
} 