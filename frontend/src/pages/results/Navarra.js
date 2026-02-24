import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const Navarra = () => {
  const navigate = useNavigate();
  const { setFlowPath, flowPath } = useFlow();

  const handleContinueToObligations = async () => {
    await setFlowPath('navarraTerritory');
    navigate('/question/navarra/2');
  };

  const handlePrevious = () => {
    // Determinar de dónde venimos según el flowPath
    if (flowPath === 'timeResident') {
      navigate('/question/5a');
    } else if (flowPath === 'economicResident') {
      navigate('/question/5b');
    } else {
      navigate('/question/5a'); // fallback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            {/* Icono */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-green-600">✓</span>
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
              Eres contribuyente IRPF de Navarra
            </h1>

            {/* Información sobre normativa */}
            <div className="p-6 bg-green-50 border-l-4 border-green-400 rounded-r-lg mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Según tus respuestas, eres residente fiscal de Navarra (régimen foral navarro).
              </p>
              
              <div className="text-gray-700 leading-relaxed">
             <p className="font-semibold mb-2">Tu obligación tributaria corresponde a:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Hacienda Foral de Navarra</li>
                  <li>
                    Normativa fiscal foral específica de Navarra:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li className="text-sm">TEXTO REFUNDIDO DE LA LEY FORAL DEL IMPUESTO SOBRE LA RENTA DE LAS PERSONAS FÍSICAS (Decreto Foral Legislativo 4/2008, de 2 de junio)</li>
                      <li className="text-sm">Decreto Foral 174/1999, de 24 de mayo, por el que se aprueba el Reglamento del Impuesto sobre la Renta de las Personas Físicas</li>
                    </ul>
                  </li>
                  <li>Declaraciones y pagos a través de la Hacienda Foral de Navarra</li>
                </ul>
                <p className="mb-4">
                  El régimen fiscal de Navarra tiene sus propias particularidades y beneficios fiscales específicos.
                </p>

                <p className="text-sm text-gray-600">
                  Para más información: Web oficial de Hacienda Foral de Navarra u oficinas forales.
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-center">
              Ahora determinaremos si tienes obligación de declarar el IRPF bajo la normativa navarra.
            </p>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              ← Anterior
            </button>

            <button
              onClick={handleContinueToObligations}
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Descubre si tienes obligación de declarar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navarra;
