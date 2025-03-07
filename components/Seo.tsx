'use client';

import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
  keywords?: string;
}

export default function SEO({ title, description, image, article, keywords }: SEOProps) {
  const siteTitle = `${title} | LOGIFIT`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logifit.com';
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}`} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${siteUrl}`} />
    </Head>
  );
} 