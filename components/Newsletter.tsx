'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Aquí implementarías la lógica para guardar el email
      // Por ejemplo, usando un servicio de email marketing o tu propio backend
      
      // Simulación de éxito
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setStatus('error');
    }
  };
  
  return (
    <div className="bg-blue-50 rounded-xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">
          Suscríbete a nuestro Newsletter
        </h2>
        <p className="text-blue-700 mb-8">
          Recibe mensualmente artículos exclusivos, casos de estudio y las últimas tendencias en prevención de fatiga y seguridad laboral.
        </p>
        
        {status === 'success' ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
            ¡Gracias por suscribirte! Pronto recibirás nuestro newsletter.
          </div>
        ) : status === 'error' ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.
          </div>
        ) : null}
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={status === 'loading'}
          />
          <button 
            type="submit"
            className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition whitespace-nowrap ${
              status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Procesando...' : 'Suscribirse'}
          </button>
        </form>
        <p className="text-xs text-blue-600 mt-4">
          Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </div>
  );
} 