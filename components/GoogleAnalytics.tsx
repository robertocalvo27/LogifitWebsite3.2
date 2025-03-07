'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Declarar el tipo global para gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'js' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// Tipos para la función pageview
function pageview(url: string, id: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', id, {
      page_path: url,
    });
  }
}

// Tipos para las props del componente
interface GoogleAnalyticsProps {
  GA_TRACKING_ID: string;
}

export default function GoogleAnalytics({ GA_TRACKING_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageview(pathname, GA_TRACKING_ID);
    }
  }, [pathname, searchParams, GA_TRACKING_ID]);

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}