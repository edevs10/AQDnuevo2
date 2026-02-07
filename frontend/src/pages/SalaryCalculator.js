import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const SalaryCalculator = () => {
  const navigate = useNavigate();
  const { flowPath, setAnswer, answers } = useFlow();
  const [netMonthly, setNetMonthly] = useState('');
  const [retentionPercent, setRetentionPercent] = useState('');
  // Usar el número de pagas del contexto si existe, sino por defecto 12
  const [annualPayments, setAnnualPayments] = useState(answers?.annual_payments || '12');

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

  const calculateGrossAnnual = () => {
    const net = parseFloat(netMonthly) || 0;
    const retention = parseFloat(retentionPercent) || 0;
    const payments = parseFloat(annualPayments) || 12;
    
    // Fórmula: Bruto mensual = Neto mensual / (1 - retención/100)
    // Bruto anual = Bruto mensual * número de pagas
    if (retention >= 100) return 0;
    
    const grossMonthly = net / (1 - retention / 100);
    const grossAnnual = grossMonthly * payments;
    
    return Math.round(grossAnnual * 100) / 100;
  };

  const handleNext = () => {
    const grossAnnual = calculateGrossAnnual();
    setAnswer('calculated_gross_annual', grossAnnual);
    navigate('/salary/result');
  };

  const handlePrevious = () => {
    navigate('/salary/check');
  };

  const isBasqueTerritory = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';
  const isValid = netMonthly && retentionPercent && annualPayments && parseFloat(netMonthly) > 0 && parseFloat(retentionPercent) >= 0 && parseFloat(retentionPercent) < 100 && parseFloat(annualPayments) > 0;

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
              Vamos a calcular tu salario bruto anual
            </h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introduce tu neto mensual (lo que entra en tu cuenta corriente)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={netMonthly}
                    onChange={(e) => setNetMonthly(e.target.value)}
                    placeholder="Ej: 1500"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    data-testid="net-monthly-input"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introduce tu % de retención
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
                    data-testid="retention-percent-input"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introduce tu número de pagas anuales
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={annualPayments}
                    onChange={(e) => setAnnualPayments(e.target.value)}
                    placeholder="Ej: 12 o 14"
                    min="1"
                    max="20"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    data-testid="annual-payments-input"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">pagas</span>
                </div>
              </div>

              {/* Vista previa del cálculo */}
              {isValid && (
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-gray-600">Vista previa del cálculo:</p>
                  <p className="text-lg font-semibold text-blue-700">
                    Salario bruto anual estimado: {calculateGrossAnnual().toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>
              )}
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

export default SalaryCalculator;
