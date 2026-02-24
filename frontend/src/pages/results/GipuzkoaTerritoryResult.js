import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const GipuzkoaTerritoryResult = () => {
  const navigate = useNavigate();
  const { setFlowPath } = useFlow();

  const handleContinueToObligations = async () => {
    await setFlowPath('gipuzkoaTerritory');
    navigate('/salary/check');
  };

  const handlePrevious = () => {
    // Necesitamos determinar de dónde viene - por tiempo o por núcleo económico
    // Por ahora volver a la selección de territorio por tiempo (podríamos mejorarlo)
    navigate('/question/basque/territory-by-time');
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
              Eres contribuyente IRPF de Gipuzkoa
            </h1>

            {/* Información sobre normativa */}
            <div className="p-6 bg-green-50 border-l-4 border-green-400 rounded-r-lg mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Según tus respuestas, eres residente fiscal del territorio histórico de Gipuzkoa.
              </p>
              
              <div className="text-gray-700 leading-relaxed">
                <p className="font-semibold mb-2">Tu obligación tributaria corresponde a:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Hacienda Foral de Gipuzkoa</li>
                  <li>
                    Normativa fiscal foral específica de Gipuzkoa:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li className="text-sm">Norma Foral 3/2014, de 17 de enero, del Impuesto sobre la Renta de las Personas Físicas del Territorio Histórico de Gipuzkoa</li>
                      <li className="text-sm">DECRETO FORAL 33/2014, de 14 de octubre, por el que se aprueba el Reglamento del Impuesto sobre la Renta de las Personas Físicas y se modifica el Reglamento por el que se desarrollan determinadas obligaciones tributarias formales</li>
                    </ul>
                  </li>
                  <li>Declaraciones y pagos a través de la Diputación Foral de Gipuzkoa</li>
                </ul>
                
                
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-center">
              Ahora determinaremos si tienes obligación de declarar el IRPF bajo la normativa foral de Gipuzkoa.
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

export default GipuzkoaTerritoryResult;
