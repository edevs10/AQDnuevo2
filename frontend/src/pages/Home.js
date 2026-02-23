import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Home = () => {
  const navigate = useNavigate();
  const { resetFlow } = useFlow();

  const handleStart = () => {
    resetFlow();
    navigate('/before-start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4 pt-0">
    {/* Logo arriba a la izquierda */}
   <div className="absolute top-0 left-0 md:left-4 z-50">
  <img 
    src="/logo.png" 
    alt="AQD Logo" 
    style={{ height: 'clamp(64px, 10vw, 256px)', width: 'auto' }}
  />
</div>
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
       <div className="text-center mb-6 mt-4 md:mt-0 pl-20 md:pl-0">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            ¿Algo Que <span className="text-blue-600">Declarar?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-0 max-w-3xl mx-auto">
            Determina si eres residente fiscal en España y si tienes obligación de presentar 
            la declaración de la Renta de forma rápida y sencilla.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                ¿Necesitas presentar la declaración 2025?
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Te guiaremos a través de un cuestionario basado en la normativa española 
                para determinar tu situación fiscal. El proceso incluye:
              </p>
              
              <ul className="space-y-2 mb-5">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Determinación de residencia fiscal
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Identificación del territorio fiscal aplicable
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Evaluación de obligaciones de declarar
                </li>
              </ul>

              <button
                onClick={handleStart}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                Comenzar consulta →
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-6">
                <div className="text-5xl mb-3">📋</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Proceso simplificado
                </h3>
                <p className="text-gray-600">
                  Responde unas pocas preguntas y obtén tu resultado al instante
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-1">Rápido</h3>
            <p className="text-gray-600 text-sm">
              Solo las preguntas necesarias para tu caso específico
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-1">Preciso</h3>
            <p className="text-gray-600 text-sm">
              Basado en las distintas normativas fiscales vigentes en territorio español
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-800 mb-1">Informativo</h3>
            <p className="text-gray-600 text-sm">
              Orientación general, consulta con un profesional para casos específicos
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            <strong>Nota importante:</strong> Esta herramienta proporciona orientación general. 
            Para casos complejos o dudas específicas, consulta con un asesor fiscal profesional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
