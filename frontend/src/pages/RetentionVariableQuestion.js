import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const RetentionVariableQuestion = () => {
  const navigate = useNavigate();
  const { flowPath, setAnswer, answers } = useFlow();
  const [retentionPercent, setRetentionPercent] = useState('');

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

  const handleNext = () => {
    setAnswer('retention_percent', retentionPercent);
    setAnswer('retention_variable', true);
    
    // Redirigir según el número de pagas
    const payments = answers?.annual_payments;
    if (payments === '14') {
      navigate('/salary/calculator-14-pagas');
    } else if (payments === '15') {
      navigate('/salary/calculator-15-pagas');
    } else {
      navigate('/salary/calculator');
    }
  };

  const handlePrevious = () => {
    // Volver según el número de pagas
    const payments = answers?.annual_payments;
    if (payments === '14') {
      navigate('/salary/calculator-14-pagas');
    } else if (payments === '15') {
      navigate('/salary/calculator-15-pagas');
    } else if (payments === '12') {
      navigate('/salary/calculator');
    } else {
      navigate('/salary/payments-question');
    }
  };

  const isBasqueTerritory = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';
  const isValid = retentionPercent && parseFloat(retentionPercent) >= 0 && parseFloat(retentionPercent) < 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            {/* Indicador de territorio */}
            {(isBasqueTerritory || flowPath === 'navarra') && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <p className="text-base text-gray-700">
                  <strong>Normativa aplicable:</strong> Régimen foral de {getTerritoryName()}
                </p>
              </div>
            )}

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              % de retención durante la mayor parte del año
            </h1>
            
            <p className="text-gray-600 mb-6">
              Introduce el porcentaje de retención que has tenido durante la mayor parte del año:
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % de retención
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={retentionPercent}
                    onChange={(e) => setRetentionPercent(e.target.value)}
                    placeholder="Ej: 15"
                    min="0"
                    max="99"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    data-testid="retention-percent-variable-input"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
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
              disabled={!isValid}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                isValid
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

export default RetentionVariableQuestion;
