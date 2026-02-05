import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdConsentPage = () => {
  const navigate = useNavigate();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showPartners, setShowPartners] = useState(false);
  const [showDetailedOptions, setShowDetailedOptions] = useState(false);

  useEffect(() => {
    // Verificar si ya eligió preferencia de anuncios
    const adPreference = localStorage.getItem('ad_consent');
    if (adPreference !== null) {
      navigate('/consent');
    }
    
    // Verificar que haya aceptado términos primero
    const hasAcceptedTerms = localStorage.getItem('terms_accepted');
    if (hasAcceptedTerms !== 'true') {
      navigate('/terms');
    }
  }, [navigate]);

  const handlePersonalizedAds = () => {
    localStorage.setItem('ad_consent', 'personalized');
    localStorage.setItem('ad_consent_timestamp', Date.now().toString());
    navigate('/consent');
  };

  const handleBasicAds = () => {
    localStorage.setItem('ad_consent', 'basic');
    localStorage.setItem('ad_consent_timestamp', Date.now().toString());
    navigate('/consent');
  };

  const googlePartners = [
    'Google Ads', 'Google Analytics', 'AdMob', 'Firebase', 
    'DoubleClick', 'Google Marketing Platform'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-4xl mb-2 block">💰</span>
            <h1 className="text-2xl font-bold text-gray-800">Mantengamos AQD gratis</h1>
          </div>

          {/* Descripción */}
          <p className="text-gray-700 text-center mb-6">
            Esta app es gratuita gracias a la publicidad. Elige cómo quieres verla:
          </p>

          <hr className="border-gray-200 my-6" />

          {/* Opción 1: Anuncios personalizados */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
              <span className="mr-2">🎯</span> Opción 1: Anuncios personalizados
            </h2>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start"><span className="mr-2 text-green-600">✓</span> Anuncios más relevantes para ti</li>
              <li className="flex items-start"><span className="mr-2 text-green-600">✓</span> Ayudas más a mantener la app</li>
              <li className="flex items-start"><span className="mr-2 text-amber-600">⚠</span> Google y sus socios crearán perfiles sobre tus intereses y navegación</li>
            </ul>
          </div>

          {/* Opción 2: Anuncios básicos */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
              <span className="mr-2">📢</span> Opción 2: Anuncios básicos
            </h2>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start"><span className="mr-2 text-green-600">✓</span> Sin perfiles ni seguimiento</li>
              <li className="flex items-start"><span className="mr-2 text-green-600">✓</span> Más privacidad</li>
              <li className="flex items-start"><span className="mr-2 text-amber-600">⚠</span> Anuncios menos relevantes</li>
            </ul>
          </div>

          {/* Nota */}
          <p className="text-xs text-gray-500 text-center mb-4">
            Puedes cambiar tu elección en Ajustes {'>'} Privacidad en cualquier momento.
          </p>

          {/* Links informativos */}
          <div className="flex flex-col space-y-2 mb-6">
            <button
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="text-blue-600 font-medium hover:text-blue-700 text-left flex items-center text-sm"
              data-testid="more-info-toggle"
            >
              <span className="mr-2">ℹ️</span> {showMoreInfo ? 'Ocultar' : 'Más'} información
            </button>
            
            {showMoreInfo && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                <p className="mb-2">Los anuncios personalizados utilizan datos como tu actividad de navegación, ubicación aproximada y datos demográficos para mostrarte anuncios más relevantes.</p>
                <p>Los anuncios básicos son genéricos y no se basan en tu perfil personal, solo en el contexto de la app.</p>
              </div>
            )}

            <button
              onClick={() => setShowPartners(!showPartners)}
              className="text-blue-600 font-medium hover:text-blue-700 text-left flex items-center text-sm"
              data-testid="partners-toggle"
            >
              <span className="mr-2">👥</span> {showPartners ? 'Ocultar' : 'Ver'} socios publicitarios
            </button>
            
            {showPartners && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                <p className="font-semibold mb-2">Socios publicitarios de Google:</p>
                <ul className="grid grid-cols-2 gap-1">
                  {googlePartners.map((partner, index) => (
                    <li key={index}>• {partner}</li>
                  ))}
                </ul>
                <p className="mt-2 text-gray-500">Para la lista completa, visita: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">políticas de Google</a></p>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={handlePersonalizedAds}
              className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              data-testid="personalized-ads-btn"
            >
              <span className="mr-2">🎯</span> Acepto anuncios personalizados
            </button>
            
            <button
              onClick={handleBasicAds}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              data-testid="basic-ads-btn"
            >
              <span className="mr-2">📢</span> Solo anuncios básicos
            </button>

            <button
              onClick={() => setShowDetailedOptions(!showDetailedOptions)}
              className="w-full px-6 py-2 text-gray-500 font-medium hover:text-gray-700 transition-colors duration-200 flex items-center justify-center text-sm"
              data-testid="detailed-options-toggle"
            >
              <span className="mr-2">⚙️</span> Gestionar opciones detalladas
            </button>

            {showDetailedOptions && (
              <div className="mt-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-gray-700 mb-3">Opciones detalladas de privacidad:</p>
                <div className="space-y-2">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Almacenamiento de información en el dispositivo
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Anuncios personalizados
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Contenido personalizado
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Medición de anuncios y contenido
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-3">Nota: Esta configuración granular estará disponible a través del SDK de Google UMP en la versión móvil.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdConsentPage;
