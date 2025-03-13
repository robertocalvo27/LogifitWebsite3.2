export async function getActiveHero() {
  const currentDate = new Date().toISOString();
  
  const query = `
    query GetScheduledHeroes {
      heroes(
        filters: {
          and: [
            { isActive: { eq: true } }
            { publishAt: { lte: "${currentDate}" } }
            { or: [
              { expireAt: { gt: "${currentDate}" } }
              { expireAt: { null: true } }
            ]}
          ]
        }
        sort: "priority:desc"
      ) {
        name
        isActive
        displayType
        autoplayInterval
        publishAt
        expireAt
        priority
        slides {
          title
          subtitle
          backgroundColor
          textColor
          mediaType
          image {
            url
            alternativeText
          }
          video {
            url
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
  `;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 } // Revalidar cada minuto
    });

    if (!response.ok) {
      console.error('Error en la respuesta del API de hero:', response.status, response.statusText);
      return getDefaultHero();
    }

    const { data } = await response.json();
    
    // Retornar el hero con mayor prioridad (el primero debido al sort)
    return data.heroes && data.heroes.length > 0 ? data.heroes[0] : getDefaultHero();
  } catch (error) {
    console.error('Error in getActiveHero:', error);
    return getDefaultHero();
  }
}

// Función para obtener un hero por defecto
function getDefaultHero() {
  console.log('Usando hero por defecto');
  return {
    name: "Hero por defecto",
    isActive: true,
    displayType: "carousel",
    autoplayInterval: 5,
    slides: [
      {
        title: "Prevención de accidentes por fatiga y somnolencia",
        subtitle: "Tecnología + Servicio Preventivo que protege a miles de personal clave en América Latina",
        backgroundColor: "#144272",
        textColor: "#FFFFFF",
        mediaType: "image",
        image: {
          url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alternativeText: "Prevención de fatiga laboral"
        },
        imagePosition: "right",
        ctaButtons: [
          {
            text: "Conocer soluciones",
            url: "/soluciones",
            variant: "primary"
          },
          {
            text: "Contactar",
            url: "/contacto",
            variant: "secondary"
          }
        ]
      }
    ]
  };
} 