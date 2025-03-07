import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageData {
  id: number;
  url: string;
  hash?: string;
  ext?: string;
}

interface DebugImageProps {
  imageData: ImageData;
  baseUrl?: string;
}

export const DebugImage: React.FC<DebugImageProps> = ({ 
  imageData, 
  baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL 
}) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [loadStatus, setLoadStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!imageData) return;

    // Genera diferentes variantes de URLs para probar
    const relativePath = imageData.url.startsWith('/') 
      ? imageData.url 
      : `/${imageData.url}`;
      
    const possibleUrls = [
      // Variante 1: URL directa
      `${baseUrl}${relativePath}`,
      // Variante 2: Con /api/upload
      `${baseUrl}/api/upload${relativePath}`,
      // Variante 3: Con /api/upload/files
      `${baseUrl}/api/upload/files${relativePath}`,
      // Variante 4: Sin uploads en la ruta
      `${baseUrl}${relativePath.replace('/uploads', '')}`,
      // Variante 5: Solo con el nombre del archivo
      imageData.hash && imageData.ext ? `${baseUrl}/uploads/${imageData.hash}${imageData.ext}` : null,
      // Variante 6: Ruta directa al archivo
      `${baseUrl}${relativePath.split('/uploads')[1] || ''}`
    ].filter(Boolean) as string[];

    setUrls(possibleUrls);
    
    // Inicializa estado de carga
    const initialStatus: Record<string, boolean> = {};
    possibleUrls.forEach(url => { initialStatus[url] = false; });
    setLoadStatus(initialStatus);

    // Log inicial para depuración
    console.log('Datos de imagen recibidos:', imageData);
    console.log('URLs a probar:', possibleUrls);
  }, [imageData, baseUrl]);

  const handleImageLoad = (url: string) => {
    setLoadStatus(prev => ({ ...prev, [url]: true }));
    console.log(`✅ Imagen cargada correctamente desde: ${url}`);
  };

  const handleImageError = (url: string) => {
    console.error(`❌ Error cargando imagen desde: ${url}`);
  };

  return (
    <div className="debug-image-container">
      <h3>Depuración de URLs de imagen</h3>
      
      <div className="image-data">
        <h4>Datos originales de la imagen:</h4>
        <pre>{JSON.stringify(imageData, null, 2)}</pre>
      </div>
      
      <div className="image-tests">
        {urls.map((url, index) => (
          <div key={index} className="image-test-case">
            <p>Prueba #{index + 1}:</p>
            <code className="url">{url}</code>
            <div className="image-container">
              <img
                src={url}
                alt={`Test ${index + 1}`}
                style={{ maxWidth: '200px', height: 'auto' }}
                onLoad={() => handleImageLoad(url)}
                onError={() => handleImageError(url)}
              />
            </div>
            <p className="status">
              Estado: {loadStatus[url] ? '✅ Cargada' : '❌ No cargada'}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .debug-image-container {
          margin: 20px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f9f9f9;
        }
        .image-data {
          margin: 20px 0;
          padding: 15px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 4px;
          overflow-x: auto;
        }
        .image-tests {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .image-test-case {
          padding: 15px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 4px;
        }
        .url {
          display: block;
          padding: 8px;
          margin: 8px 0;
          background: #f5f5f5;
          border-radius: 4px;
          font-size: 12px;
          word-break: break-all;
        }
        .image-container {
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          margin: 10px 0;
          padding: 10px;
          border-radius: 4px;
        }
        .status {
          margin: 8px 0 0 0;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default DebugImage; 