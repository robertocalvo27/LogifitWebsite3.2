import { getServiceBySlug } from '@/lib/api/services/services'
import { ProductCard } from '@/components/products/ProductCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
import { getAllProducts, getProductsByCategory, NormalizedProduct } from '@/lib/api/products/products'

// Componente para depuración (solo visible en desarrollo)
function DebugData({ data, title = "Debug Data" }: { data: any, title?: string }) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="mt-8 p-4 border border-red-300 bg-red-50 rounded-md">
      <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
      <pre className="text-xs overflow-auto max-h-96 bg-white p-2 rounded border">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

// Datos de ejemplo de productos para la categoría (fallback)
const mockProductsData: NormalizedProduct[] = [
  {
    id: 1,
    name: "Xiaomi Mi Band 9",
    slug: "xiaomi-mi-band-9",
    description: "Pulsera inteligente con monitoreo avanzado de fatiga",
    shortDescription: "Pulsera inteligente con monitoreo avanzado de fatiga",
    price: 59.99,
    status: "active",
    ctaType: "demo",
    ctaText: "Solicitar Demo",
    ctaLink: "/productos/xiaomi-mi-band-9",
    reviewsCount: 3,
    category: "",
    features: [],
    specifications: [],
    benefits: [],
    reviews: [],
    ratingDistribution: []
  },
  {
    id: 2,
    name: "AMAZFIT BAND 7",
    slug: "amazfit-band-7",
    description: "Sistema avanzado de monitoreo de fatiga con 18 días de autonomía",
    shortDescription: "Sistema avanzado de monitoreo de fatiga con 18 días de autonomía",
    price: 89.99,
    status: "active",
    ctaType: "quote",
    ctaText: "Cotiza Aquí",
    ctaLink: "/productos/amazfit-band-7",
    reviewsCount: 2,
    category: "",
    features: [],
    specifications: [],
    benefits: [],
    reviews: [],
    ratingDistribution: []
  }
];

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Obtener información de la categoría/servicio
  const service = await getServiceBySlug(params.slug)
  
  // Obtener productos de Strapi filtrados por categoría
  const strapiProducts = await getProductsByCategory(params.slug)
  console.log('Products from Strapi for category', params.slug, ':', strapiProducts)
  
  // Si no hay productos en Strapi, usar los datos mock
  let products: NormalizedProduct[] = strapiProducts.length > 0 ? strapiProducts : mockProductsData
  
  // Asignar manualmente la categoría a los productos si no la tienen
  products = products.map(product => ({
    ...product,
    category: product.category || service?.category || params.slug
  }))
  
  if (!service) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold">Categoría no encontrada</h1>
        <p className="mt-4">Lo sentimos, la categoría que buscas no existe.</p>
      </div>
    )
  }

  // Procesar features y benefits
  let features: string[] = []
  let benefits: string[] = []
  
  if (typeof service.features === 'string') {
    features = service.features.split('\n')
  } else if (Array.isArray(service.features)) {
    features = service.features
  }
  
  if (typeof service.benefits === 'string') {
    benefits = service.benefits.split('\n')
  } else if (Array.isArray(service.benefits)) {
    benefits = service.benefits
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm mb-6">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/soluciones" className="text-gray-500 hover:text-gray-700">
          Soluciones
        </Link>{" "}
        /{" "}
        <span className="text-gray-900">{service.Title}</span>
      </div>

      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{service.Title}</h1>
        <p className="text-xl text-gray-600">{service.Description}</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="productos">
        <TabsList className="mb-8">
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="caracteristicas">Características</TabsTrigger>
          <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="productos">
          <DebugData data={{
            serviceCategory: service.category,
            serviceSlug: service.slug,
            productsCount: products.length,
            products: products.map(p => ({
              name: p.name,
              category: p.category,
              status: p.status,
              hasImages: !!p.images,
              imagesCount: p.images?.length || 0,
              imageUrls: p.images?.map(img => img.url) || []
            }))
          }} title="Información de depuración" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              // Determinar la URL de la imagen
              let imageUrl = "/images/product-placeholder.jpg";
              
              // Si el producto tiene imágenes, usar la primera
              if (product.images && product.images.length > 0) {
                const img = product.images[0];
                imageUrl = img.url;
                
                console.log('Product image URL:', {
                  productName: product.name,
                  imageUrl: imageUrl
                });
              }
              
              return (
                <div key={product.id} className="col-span-1">
                  <ProductCard
                    name={product.name}
                    slug={product.slug}
                    categorySlug={service.slug}
                    shortDescription={product.shortDescription}
                    price={product.price}
                    status={product.status as 'active' | 'inactive' | 'coming_soon'}
                    imageUrl={imageUrl}
                  />
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="caracteristicas" className="mt-6">
          <div className="py-8">
            <ul className="space-y-4">
              {features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="beneficios" className="mt-6">
          <div className="py-8">
            <ul className="space-y-4">
              {benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 