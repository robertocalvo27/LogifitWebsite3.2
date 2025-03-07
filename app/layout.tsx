import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'LOGIFIT Blog',
    template: '%s | LOGIFIT Blog',
  },
  description: 'Blog sobre seguridad y prevención de fatiga en entornos industriales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // El ID de GA debe venir de tus variables de entorno
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
  
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Etiquetas meta existentes */}
      </head>
      <body className={inter.className}>
        <GoogleAnalytics GA_TRACKING_ID={GA_TRACKING_ID} />
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}