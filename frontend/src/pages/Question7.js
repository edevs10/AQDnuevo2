import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question7 = () => {
  const navigate = useNavigate();
  const { setAnswer, flowPath } = useFlow();
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Determinar el texto según el territorio
  const getTerritoryText = () => {
    switch (flowPath) {
      case 'navarraTerritory':
        return 'normativa foral navarra';
      case 'bizkaiaTerritory':
        return 'normativa foral de Bizkaia';
      case 'gipuzkoaTerritory':
        return 'normativa foral de Gipuzkoa';
      case 'alavaTerritory':
        return 'normativa foral de Álava';
      case 'basqueTerritory':
        return 'normativa foral específica';
      case 'commonTerritory':
      default:
        return 'normativa general española (territorio común)';
    }
  };

  const handleNext = (answer) => {
    setAnswer('q7', answer);
    
    if (answer === 'yes') {
      navigate('/result/obligated');
    } else {
      navigate('/question/8');
    }
  };

  const handlePrevious = () => {
    // Volver según el territorio
    switch (flowPath) {
      case 'navarraTerritory':
        navigate('/result/navarra');
        break;
      case 'bizkaiaTerritory':
        navigate('/result/basque-bizkaia');
        break;
      case 'gipuzkoaTerritory':
        navigate('/result/basque-gipuzkoa');
        break;
      case 'alavaTerritory':
        navigate('/result/basque-alava');
        break;
      case 'basqueTerritory':
        navigate('/result/basque');
        break;
      case 'commonTerritory':
      default:
        navigate('/question/6');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            {/* Indicador de territorio */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-gray-700">
                <strong>Aplicable:</strong> {getTerritoryText()}
              </p>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Deseas aplicar la deducción por doble imposición internacional o has realizado aportaciones a patrimonios protegidos de las personas con discapacidad, planes de pensiones, planes de previsión asegurados o mutualidades de previsión social, planes de previsión social empresarial y deseas reducir la base imponible por esas aportaciones?
            </h1>
            
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'yes' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('yes')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'yes' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'no' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('no')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'no' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">NO</span>
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

export default Question7;
