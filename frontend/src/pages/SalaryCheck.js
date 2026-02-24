import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const SalaryCheck = () => {
  const navigate = useNavigate();
  const { flowPath, setAnswer } = useFlow();
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const getTerritoryName = () => {
    switch (flowPath) {
      case 'bizkaiaTerritory':
        return 'Bizkaia';
      case 'gipuzkoaTerritory':
        return 'Gipuzkoa';
      case 'alavaTerritory':
        return 'Álava';
      case 'navarra':
        return 'Navarra';
      default:
        return 'Territorio Común';
    }
  };

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
    setAnswer('salary_knowledge', value);
  };

  const handleNext = () => {
    if (selectedAnswer === 'yes') {
      // Ir directamente a la pregunta de umbral de RTP según territorio
      switch (flowPath) {
        case 'bizkaiaTerritory':
        case 'gipuzkoaTerritory':
        case 'alavaTerritory':
          navigate('/question/basque/1');
          break;
        case 'navarra':
          navigate('/question/navarra/3');
          break;
        default:
          navigate('/question/9');
          break;
      }
    } else {
      // Ir a la pantalla de selección de número de pagas
      navigate('/salary/payments-question');
    }
  };

  const handlePrevious = () => {
    switch (flowPath) {
      case 'bizkaiaTerritory':
        navigate('/result/basque-bizkaia');
        break;
      case 'gipuzkoaTerritory':
        navigate('/result/basque-gipuzkoa');
        break;
      case 'alavaTerritory':
        navigate('/result/basque-alava');
        break;
      case 'navarra':
        navigate('/question/navarra/2');
        break;
      default:
        navigate('/question/8');
        break;
    }
  };

  const isBasqueTerritory = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            {/* Indicador de territorio */}
            {(isBasqueTerritory || flowPath === 'navarra') && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <p className="text-sm text-gray-700">
                  <strong>Normativa aplicable:</strong> Régimen foral de {getTerritoryName()}
                </p>
              </div>
            )}

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Conoces tu salario bruto anual?
            </h1>
            
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === 'yes'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('yes')}
                data-testid="salary-check-yes"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === 'yes'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">Sí, lo conozco</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === 'no'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('no')}
                data-testid="salary-check-no"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === 'no'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">No, sólo conozco mi salario mensual y mi % de retención</span>
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
              onClick={handleNext}
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

export default SalaryCheck;
