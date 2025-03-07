export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logifit.io';
    
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/_next/static/'],
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }