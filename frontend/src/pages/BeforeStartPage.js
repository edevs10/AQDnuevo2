import React from 'react';
import { useNavigate } from 'react-router-dom';

const BeforeStartPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/terms');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">📅</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Antes de empezar...
            </h1>
            
            <div className="text-left bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
              <p className="text-base text-gray-700 mb-4">
                <strong>Recuerda:</strong> la declaración de IRPF se presenta a año vencido.
              </p>
              <p className="text-base text-gray-700 mb-4">
                Por lo tanto, aunque la presentes en 2026, <strong>te estamos preguntando por los datos de 2025</strong>
              </p>
              <p className="text-base text-gray-700 font-semibold text-blue-700">
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
