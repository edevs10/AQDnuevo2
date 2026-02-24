import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const RetentionVariableQuestionGipuzkoa = () => {
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


  const calculateGrossAnnual = () => {
    const retention = parseFloat(retentionPercent) || 0;
    const payments = answers?.annual_payments || '12';
    
    if (retention >= 100) return 0;
    
    // Dependiendo del número de pagas, calcular diferente
    if (payments === '14') {
      const netOrdinary = parseFloat(answers?.net_monthly_ordinary) || 0;
      const netExtra1 = parseFloat(answers?.net_month_extra1) || 0;
      const netExtra2 = parseFloat(answers?.net_month_extra2) || 0;
      
      const grossMonthlyOrdinary = netOrdinary / (1 - retention / 100);
      const grossExtra1 = netExtra1 / (1 - retention / 100);
      const grossExtra2 = netExtra2 / (1 - retention / 100);
      
      return Math.round((grossMonthlyOrdinary * 10 + grossExtra1 + grossExtra2) * 100) / 100;
    } else if (payments === '15') {
      const netOrdinary = parseFloat(answers?.net_monthly_ordinary) || 0;
      const netExtra1 = parseFloat(answers?.net_month_extra1) || 0;
      const netExtra2 = parseFloat(answers?.net_month_extra2) || 0;
      const netExtra3 = parseFloat(answers?.net_month_extra3) || 0;
      
      const grossMonthlyOrdinary = netOrdinary / (1 - retention / 100);
      const grossExtra1 = netExtra1 / (1 - retention / 100);
      const grossExtra2 = netExtra2 / (1 - retention / 100);
      const grossExtra3 = netExtra3 / (1 - retention / 100);
      
      return Math.round((grossMonthlyOrdinary * 9 + grossExtra1 + grossExtra2 + grossExtra3) * 100) / 100;
    } else {
      // 10, 11 o 12 pagas
      const net = parseFloat(answers?.net_monthly) || 0;
      const paymentsNum = parseFloat(payments) || 12;
      
      const grossMonthly = net / (1 - retention / 100);
      return Math.round((grossMonthly * paymentsNum) * 100) / 100;
    }
  };

  const handleNext = () => {
    setAnswer('retention_percent', retentionPercent);
    setAnswer('retention_variable', true);
    
    // Calcular el salario bruto anual con el porcentaje de retención
    const grossAnnual = calculateGrossAnnual();
    setAnswer('calculated_gross_annual', grossAnnual);
    
    // Ir directamente a la página de resultado
    navigate('/salary/gipuzkoa/result');
  };

  const handlePrevious = () => {
    // Volver según el número de pagas
    const payments = answers?.annual_payments;
    if (payments === '10') {
      navigate('/salary/gipuzkoa/calculator-10');
    } else if (payments === '11') {
      navigate('/salary/gipuzkoa/calculator-11');
    } else if (payments === '14') {
      navigate('/salary/gipuzkoa/calculator-14');
    } else if (payments === '15') {
      navigate('/salary/gipuzkoa/calculator-15');
    } else {
      navigate('/salary/gipuzkoa/calculator-12');
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

export default RetentionVariableQuestionGipuzkoa;
