import React from 'react';
import { useNavigate } from 'react-router-dom';

const BeforeStartPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/ad-consent');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="64" height="64">
    <rect x="10" y="20" width="80" height="70" rx="8" ry="8" fill="#ffffff" stroke="#333333" strokeWidth="2.5"/>
    <rect x="10" y="20" width="80" height="24" rx="8" ry="0" fill="#e74c3c"/>
    <rect x="10" y="32" width="80" height="12" fill="#e74c3c"/>
    <rect x="30" y="14" width="6" height="16" rx="3" ry="3" fill="#555555"/>
    <rect x="64" y="14" width="6" height="16" rx="3" ry="3" fill="#555555"/>
    <text x="50" y="40" fontFamily="Arial, Helvetica, sans-serif" fontSize="14" fontWeight="bold" fill="#ffffff" textAnchor="middle" dominantBaseline="middle">ABRIL</text>
    <text x="50" y="68" fontFamily="Arial, Helvetica, sans-serif" fontSize="10" fill="#888888" textAnchor="middle" dominantBaseline="middle">• • • • •</text>
    <text x="50" y="80" fontFamily="Arial, Helvetica, sans-serif" fontSize="10" fill="#888888" textAnchor="middle" dominantBaseline="middle">• • • • •</text>
  </svg>
</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Antes de empezar...
            </h1>
            
            <div className="text-left bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
              <p className="text-lg text-gray-700 mb-4">
                <span className="text-blue-600 font-semibold">Recuerda:</span> la declaración de IRPF se presenta a año vencido.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Por lo tanto, aunque la presentes en 2026, <span className="text-blue-600 font-semibold">te estamos preguntando por los datos de 2025</span>
              </p>
              <p className="text-lg text-gray-700 font-semibold text-blue-700 text-center">
                ¡Esperamos que te resulte útil!
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              data-testid="continue-button"
            >
              Continuar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeStartPage;
