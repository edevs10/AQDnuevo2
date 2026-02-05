import React from 'react';
import { useNavigate } from 'react-router-dom';

const WorkingOnIt = () => {
  const navigate = useNavigate();

  const handleNewConsultation = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate('/question/declaration-type');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icono */}
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-orange-600">🚧</span>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
            ¡Estamos trabajando en ello!
          </h1>

          {/* Descripción */}
          <div className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
            <p className="mb-4">
              Actualmente, no podemos abarcar los casos de <strong>declaración conjunta</strong>, 
              pero estamos trabajando para que sea así en un futuro próximo.
            </p>
            
            <p className="mb-6">
              Mientras tanto, puedes utilizar nuestra herramienta para consultas sobre 
              <strong> declaración individual</strong>.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg text-left">
              <p className="text-sm text-gray-700 mb-3">
                <strong>¡Nos ayudarías mucho!</strong> Tu opinión es valiosa para nosotros:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ¿Te parece útil esta funcionalidad?</li>
                <li>• ¿Qué otras mejoras te gustaría ver?</li>
                <li>• ¡Cualquier sugerencia es bienvenida!</li>
              </ul>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              ← Volver a elegir tipo de declaración
            </button>
            
            <button
              onClick={handleNewConsultation}
              className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Comenzar nueva consulta
            </button>
          </div>

          {/* Nota al pie */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Gracias por tu comprensión. Seguimos mejorando "¿Algo Que Declarar?" para ti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingOnIt;