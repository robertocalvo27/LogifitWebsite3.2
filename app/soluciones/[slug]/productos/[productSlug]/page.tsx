import Image from 'next/image'
import Link from 'next/link'
import { Activity, Battery, Check, ChevronRight, Zap, Star, StarHalf } from 'lucide-react'
import { ThumbsUp } from 'lucide-react'
import { getProductBySlug } from '@/lib/api/products/products'
import { notFound } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TableHeader,
} from "@/components/ui/table"
import { 
  Download,
  Phone,
  Mail,
  Clock,
  Shield,
} from "lucide-react"

// Interfaces
interface Feature {
  title: string
  description: string
  icon: JSX.Element
}

interface Spec {
  label: string
  value: string
}

interface RelatedProduct {
  name: string
  slug: string
  category: string
  price: number
  image: string
}

interface Review {
  id: number
  author: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
  likes: number
  company: string
}

interface RatingDistribution {
  stars: number
  percentage: number
}

interface Product {
  name: string
  category: string
  status: string
  price: number
  shortDescription: string
  description: string
  features: Feature[]
  specs: Spec[]
  gallery: string[]
  benefits: string[]
  rating: number
  reviewsCount: number
  reviews: Review[]
  ratingDistribution: RatingDistribution[]
  relatedProducts: RelatedProduct[]
}

interface ProductsData {
  [key: string]: Product
}

// Función para mapear iconos según el nombre
const getIconByName = (iconName: string) => {
  const icons: { [key: string]: JSX.Element } = {
    'Activity': <Activity className="w-6 h-6" />,
    'Battery': <Battery className="w-6 h-6" />,
    'Zap': <Zap className="w-6 h-6" />,
    'Shield': <Shield className="w-6 h-6" />,
    'Clock': <Clock className="w-6 h-6" />,
    'AlertTriangle': <Activity className="w-6 h-6" />,
    'Bell': <Activity className="w-6 h-6" />,
    'Droplet': <Activity className="w-6 h-6" />,
    'Eye': <Activity className="w-6 h-6" />,
    'Heart': <Activity className="w-6 h-6" />,
    'Moon': <Activity className="w-6 h-6" />,
    'Feather': <Activity className="w-6 h-6" />,
    'Monitor': <Activity className="w-6 h-6" />,
    'Brain': <Activity className="w-6 h-6" />,
    'Wifi': <Activity className="w-6 h-6" />,
    'Settings': <Activity className="w-6 h-6" />,
    'Link': <Activity className="w-6 h-6" />,
    'Smartphone': <Activity className="w-6 h-6" />,
    'Camera': <Activity className="w-6 h-6" />,
    'Compass': <Activity className="w-6 h-6" />,
    'FileText': <Activity className="w-6 h-6" />,
    'Briefcase': <Activity className="w-6 h-6" />,
    'Target': <Activity className="w-6 h-6" />,
    'CheckSquare': <Activity className="w-6 h-6" />,
    'Tool': <Activity className="w-6 h-6" />,
    'Maximize': <Activity className="w-6 h-6" />,
    'TrendingUp': <Activity className="w-6 h-6" />,
    'TrendingDown': <Activity className="w-6 h-6" />,
    'PieChart': <Activity className="w-6 h-6" />,
    'BarChart2': <Activity className="w-6 h-6" />,
    'Lock': <Activity className="w-6 h-6" />,
    'Users': <Activity className="w-6 h-6" />,
    'Smile': <Activity className="w-6 h-6" />,
    'Calendar': <Activity className="w-6 h-6" />,
    'HeadPhones': <Activity className="w-6 h-6" />,
  };
  
  return icons[iconName] || <Activity className="w-6 h-6" />;
};

// Helper function for rendering stars
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={i + fullStars} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  )
}

export default async function ProductPage({ params }: { params: { slug: string, productSlug: string } }) {
  // Obtener los datos del producto desde Strapi
  const strapiProduct = await getProductBySlug(params.productSlug);
  
  // Si no existe el producto, mostrar página 404
  if (!strapiProduct) {
    notFound();
  }
  
  // Transformar los datos de Strapi al formato que espera la UI
  const product: Product = {
    name: strapiProduct.name,
    category: params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Convertir slug a nombre de categoría
    status: strapiProduct.status,
    price: strapiProduct.price,
    shortDescription: strapiProduct.shortDescription,
    description: strapiProduct.description,
    features: strapiProduct.features.map(feature => ({
      title: feature.title,
      description: feature.description,
      icon: getIconByName(feature.icon)
    })),
    specs: strapiProduct.specifications.map(spec => ({
      label: spec.label,
      value: spec.value
    })),
    gallery: strapiProduct.images && strapiProduct.images.length > 0
      ? strapiProduct.images.map(img => img.url)
      : [
          "/images/product-placeholder.jpg",
          "/images/product-placeholder.jpg",
          "/images/product-placeholder.jpg",
          "/images/product-placeholder.jpg"
        ],
    benefits: strapiProduct.benefits.map(benefit => benefit.description),
    rating: strapiProduct.reviews.length > 0 
      ? strapiProduct.reviews.reduce((sum, review) => sum + review.rating, 0) / strapiProduct.reviews.length 
      : 0,
    reviewsCount: strapiProduct.reviewsCount,
    reviews: strapiProduct.reviews.map(review => ({
      id: review.id,
      author: review.author,
      rating: review.rating,
      date: review.date,
      title: review.title,
      comment: review.comment,
      verified: review.verified,
      likes: review.likes,
      company: review.company
    })),
    ratingDistribution: strapiProduct.ratingDistribution.map(dist => ({
      stars: dist.stars,
      percentage: dist.percentage
    })),
    relatedProducts: [
      {
        name: "Producto relacionado",
        slug: "producto-relacionado",
        category: "Wearables Inteligentes",
        price: 199,
        image: "/images/product-placeholder.jpg"
      }
    ]
  };

  // Añadir logs para depuración
  console.log('Product images:', {
    hasImages: !!strapiProduct.images,
    imagesCount: strapiProduct.images?.length || 0,
    imageUrls: strapiProduct.images?.map(img => img.url) || []
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50/50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/soluciones" className="hover:text-blue-600 transition-colors">
              Soluciones
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/soluciones/${params.slug}`} className="hover:text-blue-600 transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Gallery */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square mb-4 border rounded-lg overflow-hidden">
                <Image
                  src={product.gallery[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} - Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <Badge variant="outline" className="mb-4">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <RatingStars rating={product.rating} />
                <span className="text-sm text-gray-500">{product.reviewsCount} opiniones</span>
              </div>
              <p className="text-xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-8">{product.shortDescription}</p>

              <div className="space-y-6 mb-8">
                <h3 className="font-semibold">Características Principales:</h3>
                <ul className="space-y-3">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="flex-1">
                  {strapiProduct.ctaText || "Solicitar Información"}
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Descargar Ficha Técnica
                </Button>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>+51 123 456 789</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>ventas@logifit.pe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="descripcion" className="space-y-8">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="descripcion"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-8 py-4"
              >
                Descripción
              </TabsTrigger>
              <TabsTrigger 
                value="caracteristicas"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-8 py-4"
              >
                Características
              </TabsTrigger>
              <TabsTrigger 
                value="beneficios"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-8 py-4"
              >
                Beneficios
              </TabsTrigger>
              <TabsTrigger 
                value="especificaciones"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-8 py-4"
              >
                Especificaciones
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="descripcion" className="mt-8">
              <Card className="p-6">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed text-gray-600">
                    {product.description}
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="caracteristicas" className="mt-8">
              <div className="grid md:grid-cols-3 gap-8">
                {product.features.map((feature, index) => (
                  <Card key={index} className="relative overflow-hidden group hover:border-blue-200 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-6 relative">
                      <div className="flex flex-col space-y-4">
                        <div className="p-3 bg-blue-50 rounded-xl w-fit">
                          {feature.icon}
                        </div>
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beneficios" className="mt-8">
              <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="p-2 bg-green-50 rounded-full mr-4">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="especificaciones" className="mt-8">
              <Card className="p-0 overflow-hidden">
                <Table>
                  <TableBody>
                    {product.specs.map((spec, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <TableCell className="font-medium w-1/3">{spec.label}</TableCell>
                        <TableCell>{spec.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Reviews Summary */}
            <div className="lg:w-1/3">
              <div className="sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Opiniones de Clientes</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-4xl font-bold mr-2">{product.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">de 5</span>
                  </div>
                  <div>
                    <RatingStars rating={product.rating} />
                    <p className="text-sm text-gray-500 mt-1">{product.reviewsCount} opiniones</p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {product.ratingDistribution.map((dist) => (
                    <div key={dist.stars} className="flex items-center gap-2">
                      <div className="flex items-center w-24">
                        <span className="text-sm">{dist.stars}</span>
                        <Star className="w-4 h-4 ml-1 text-gray-400" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${dist.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12">{dist.percentage}%</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-8">Escribir una opinión</Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:w-2/3">
              <div className="space-y-8">
                {product.reviews.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{review.author}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                              Compra verificada
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.company}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>

                    <div className="mb-3">
                      <RatingStars rating={review.rating} />
                    </div>

                    <h3 className="font-semibold mb-2">{review.title}</h3>
                    <p className="text-gray-600 mb-4">{review.comment}</p>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Útil ({review.likes})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        Reportar
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Productos Relacionados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.relatedProducts.map((product, index) => (
              <Card 
                key={index} 
                className="overflow-hidden group hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {product.category}
                  </Badge>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    <Button variant="outline" asChild>
                      <Link href={`/soluciones/${params.slug}/productos/${product.slug}`}>
                        Ver Detalles
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 