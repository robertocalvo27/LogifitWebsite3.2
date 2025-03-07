'use client';

import { useEffect } from 'react';

export default function ApiDataDebugger() {
  useEffect(() => {
    const fetchApiDirectly = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate=*`);
      const data = await response.json();
      console.log("API Data Structure:", JSON.stringify(data, null, 2));
    };
    
    fetchApiDirectly();
  }, []);
  
  return null; // Este componente no renderiza nada
} 