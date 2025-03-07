import { testArticleStructure } from '@/lib/api/blog';

export default async function TestStrapiPage() {
  // Ejecutar la función de prueba
  const articleData = await testArticleStructure();
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Test Strapi API Structure</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Resultado de la prueba:</h2>
        {articleData ? (
          <div>
            <p className="text-green-600 font-medium">✅ Conexión exitosa</p>
            <p className="mt-2">ID del artículo: {articleData.id}</p>
            <p>Título: {articleData.attributes?.title || 'No disponible'}</p>
            <p>Slug: {articleData.attributes?.slug || 'No disponible'}</p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Estructura de datos:</h3>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(articleData, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-red-600 font-medium">❌ Error al obtener datos</p>
        )}
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Instrucciones:</h2>
        <p>
          Esta página muestra la estructura exacta de los datos de un artículo de Strapi v5.
          Revisa la consola del servidor para ver logs detallados sobre la estructura.
        </p>
        <p className="mt-2">
          Usa esta información para corregir las funciones de acceso a datos en el proyecto.
        </p>
      </div>
    </div>
  );
} 