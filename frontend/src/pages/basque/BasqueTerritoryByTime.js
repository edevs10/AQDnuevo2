import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const BasqueTerritoryByTime = () => {
  const navigate = useNavigate();
  const { setAnswer } = useFlow();
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleNext = (territory) => {
    setAnswer('basque_territory', territory);
    navigate(`/result/basque-${territory}`);
  };

  const handlePrevious = () => {
    navigate('/question/4a');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            {/* Indicador de territorio */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-gray-700">
                <strong>Determinación por residencia:</strong> Contribuyente del País Vasco
              </p>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿En cuál de los tres Territorios Históricos has pasado más días durante 2025 teniendo en cuenta las ausencias temporales?
            </h1>
            
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm text-gray-700 mb-2">
                <strong>OJO:</strong> Como antes, hay que sumar las ausencias temporales.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Importante:</strong> Selecciona el territorio histórico donde hayas residido la mayor cantidad de días durante el año 2025. Esto determinará qué Hacienda Foral corresponde.
              </p>
            </div>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'bizkaia' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('bizkaia')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'bizkaia' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">
                    Bizkaia
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'gipuzkoa' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('gipuzkoa')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'gipuzkoa' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">
                    Gipuzkoa
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'alava' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('alava')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'alava' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">
                    Álava
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              ← Anterior
            </button>
            <button
              onClick={() => selectedAnswer && handleNext(selectedAnswer)}
              disabled={!selectedAnswer}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                selectedAnswer
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasqueTerritoryByTime;
