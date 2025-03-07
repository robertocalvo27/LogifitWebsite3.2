import React from 'react';

export interface ArticleSchemaProps {
  title: string;
  description: string;
  image?: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  authorBio?: string;
}

const ArticleSchema: React.FC<ArticleSchemaProps> = (props) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": props.title,
    "description": props.description,
    "image": props.image,
    "author": {
      "@type": "Person",
      "name": props.authorName,
      "description": props.authorBio
    },
    "datePublished": props.datePublished,
    "dateModified": props.dateModified || props.datePublished,
    "url": props.url,
    "publisher": {
      "@type": "Organization",
      "name": "Logifit",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": props.url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ArticleSchema; 