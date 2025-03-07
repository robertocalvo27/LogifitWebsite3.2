import { testStrapiConnection } from '@/lib/api/blog/test-connection';

export default async function TestBlogPage() {
  // Ejecutar la función de prueba
  const articles = await testStrapiConnection();
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Test de Conexión a Strapi v5.0 - Blog</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Resultado de la prueba:</h2>
        {articles ? (
          <div>
            <p className="text-green-600 font-medium">✅ Conexión exitosa</p>
            <p className="mt-2">Número de artículos: {articles.length}</p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Artículos normalizados:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {articles.map((article: any) => (
                <div key={article.id} className="border rounded-lg p-4 bg-white">
                  <h4 className="text-lg font-semibold">{article.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">Slug: {article.slug}</p>
                  <p className="text-sm mb-2">{article.excerpt?.substring(0, 100)}...</p>
                  
                  {article.featuredImage && (
                    <div className="mb-2">
                      <p className="text-sm font-medium">Imagen:</p>
                      <p className="text-xs text-gray-500 break-all">{article.featuredImage.url}</p>
                    </div>
                  )}
                  
                  {article.categories?.length > 0 && (
                    <div className="mb-2">
                      <p className="text-sm font-medium">Categorías:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {article.categories.map((cat: any) => (
                          <span key={cat.slug} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {article.author && (
                    <p className="text-sm text-gray-600 mt-2">
                      Autor: {typeof article.author === 'string' ? article.author : article.author.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-red-600 font-medium">❌ Error al obtener datos</p>
        )}
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Instrucciones:</h2>
        <p>
          Esta página muestra el resultado de la conexión a Strapi v5.0 para obtener artículos del blog.
          Revisa la consola del servidor para ver logs detallados sobre la estructura de los datos.
        </p>
        <p className="mt-2">
          Si la conexión es exitosa, verás los artículos normalizados arriba. Usa esta información para
          actualizar la función getAllArticles en lib/api/blog/index.ts.
        </p>
      </div>
    </div>
  );
} 