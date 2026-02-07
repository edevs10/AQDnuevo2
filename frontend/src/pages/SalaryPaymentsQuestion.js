import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const SalaryPaymentsQuestion = () => {
  const navigate = useNavigate();
  const { flowPath, setAnswer } = useFlow();
  const [selectedPayments, setSelectedPayments] = useState('');

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

  const handlePaymentsSelect = (value) => {
    setSelectedPayments(value);
  };

  const handleNext = () => {
    // Guardar el número de pagas seleccionado
    setAnswer('annual_payments', selectedPayments);
    
    // Redirigir según el territorio y el número de pagas
    const routeMap = {
      'navarra': {
        '12': '/salary/navarra/calculator-12',
        '14': '/salary/navarra/calculator-14',
        '15': '/salary/navarra/calculator-15'
      },
      'bizkaiaTerritory': {
        '12': '/salary/bizkaia/calculator-12',
        '14': '/salary/bizkaia/calculator-14',
        '15': '/salary/bizkaia/calculator-15'
      },
      'gipuzkoaTerritory': {
        '12': '/salary/gipuzkoa/calculator-12',
        '14': '/salary/gipuzkoa/calculator-14',
        '15': '/salary/gipuzkoa/calculator-15'
      },
      'alavaTerritory': {
        '12': '/salary/alava/calculator-12',
        '14': '/salary/alava/calculator-14',
        '15': '/salary/alava/calculator-15'
      },
      'default': {
        '12': '/salary/common/calculator-12',
        '14': '/salary/common/calculator-14',
        '15': '/salary/common/calculator-15'
      }
    };
    
    const territoryRoutes = routeMap[flowPath] || routeMap['default'];
    const route = territoryRoutes[selectedPayments];
    
    if (route) {
      navigate(route);
    } else {
      // Fallback
      navigate('/salary/common/calculator-12');
    }
  };

  const handlePrevious = () => {
    navigate('/salary/check');
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
                <p className="text-base text-gray-700">
                  <strong>Normativa aplicable:</strong> Régimen foral de {getTerritoryName()}
                </p>
              </div>
            )}

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Cuántas pagas recibes al año?
            </h1>
            
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPayments === '12'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handlePaymentsSelect('12')}
                data-testid="payments-12"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedPayments === '12'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">12 pagas</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPayments === '14'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handlePaymentsSelect('14')}
                data-testid="payments-14"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedPayments === '14'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">14 pagas</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPayments === '15'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handlePaymentsSelect('15')}
                data-testid="payments-15"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedPayments === '15'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">15 pagas</span>
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
              disabled={!selectedPayments}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                selectedPayments
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

export default SalaryPaymentsQuestion;
