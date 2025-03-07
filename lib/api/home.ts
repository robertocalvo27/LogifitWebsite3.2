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
      throw new Error('Error fetching hero data');
    }

    const { data } = await response.json();
    
    // Retornar el hero con mayor prioridad (el primero debido al sort)
    return data.heroes[0] || null;
  } catch (error) {
    console.error('Error in getActiveHero:', error);
    return null;
  }
} 