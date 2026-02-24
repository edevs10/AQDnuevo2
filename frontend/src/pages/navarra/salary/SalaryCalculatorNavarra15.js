import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../../context/FlowContext';

const SalaryCalculatorNavarra15 = () => {
  const navigate = useNavigate();
  const { flowPath, setAnswer, answers } = useFlow();
  const [netMonthlyOrdinary, setNetMonthlyOrdinary] = useState('');
  const [netMonthExtra1, setNetMonthExtra1] = useState('');
  const [netMonthExtra2, setNetMonthExtra2] = useState('');
  const [netMonthExtra3, setNetMonthExtra3] = useState('');
  const [retentionSame, setRetentionSame] = useState('');
  const [retentionPercent, setRetentionPercent] = useState(answers?.retention_percent || '');

  useEffect(() => {
    // Si viene de la página de retención variable, pre-seleccionar "no"
    if (answers?.retention_variable) {
      setRetentionSame('no');
    }
  }, [answers]);

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
    const netOrdinary = parseFloat(netMonthlyOrdinary) || 0;
    const netExtra1 = parseFloat(netMonthExtra1) || 0;
    const netExtra2 = parseFloat(netMonthExtra2) || 0;
    const netExtra3 = parseFloat(netMonthExtra3) || 0;
    const retention = parseFloat(retentionPercent) || 0;
    
    if (retention >= 100) return 0;
    
    // Calcular bruto mensual ordinario (9 meses)
    const grossMonthlyOrdinary = netOrdinary / (1 - retention / 100);
    
    // Calcular bruto de los meses con paga extra
    const grossExtra1 = netExtra1 / (1 - retention / 100);
    const grossExtra2 = netExtra2 / (1 - retention / 100);
    const grossExtra3 = netExtra3 / (1 - retention / 100);
    
    // Total bruto anual = 9 meses ordinarios + 3 meses con extras
    const grossAnnual = (grossMonthlyOrdinary * 9) + grossExtra1 + grossExtra2 + grossExtra3;
    
    return Math.round(grossAnnual * 100) / 100;
  };

  const handleRetentionChange = (value) => {
    setRetentionSame(value);
    // No redirigir automáticamente, solo marcar la opción
  };

  const handleNext = () => {
    // Guardar datos de salario en el contexto
    setAnswer('net_monthly_ordinary', netMonthlyOrdinary);
    setAnswer('net_month_extra1', netMonthExtra1);
    setAnswer('net_month_extra2', netMonthExtra2);
    setAnswer('net_month_extra3', netMonthExtra3);
    
    if (retentionSame === 'no') {
      // Si la retención NO ha sido igual, ir a la página de retención variable
      navigate('/salary/navarra/retention-variable');
    } else {
      // Si la retención ha sido igual, calcular y continuar
      const grossAnnual = calculateGrossAnnual();
      setAnswer('calculated_gross_annual', grossAnnual);
      navigate('/salary/navarra/result');
    }
  };

const handlePrevious = () => {
    if (answers?.annual_payments) {
      navigate('/salary/payments-question');
    } else {
      navigate('/salary/check');
    }
  };

  const isBasqueTerritory = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';
  const isValid = netMonthlyOrdinary && netMonthExtra1 && netMonthExtra2 && netMonthExtra3 && retentionSame && 
                  parseFloat(netMonthlyOrdinary) > 0 && 
                  parseFloat(netMonthExtra1) > 0 && 
                  parseFloat(netMonthExtra2) > 0 && 
                  parseFloat(netMonthExtra3) > 0 &&
                  (retentionSame === 'no' || (retentionPercent && parseFloat(retentionPercent) >= 0 && parseFloat(retentionPercent) < 100));

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
              Vamos a calcular tu salario bruto anual (15 pagas)
            </h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introduce tu neto mensual de las pagas ordinarias (lo que entra en tu cuenta los meses sin paga extra)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={netMonthlyOrdinary}
                    onChange={(e) => setNetMonthlyOrdinary(e.target.value)}
                    placeholder="Ej: 1500"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    data-testid="net-monthly-ordinary-input"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Introduce el neto de los meses en que recibes paga ordinaria + paga extra:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primer mes con paga extra (ej: abril)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={netMonthExtra1}
                        onChange={(e) => setNetMonthExtra1(e.target.value)}
                        placeholder="Ej: 3000"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        data-testid="net-month-extra1-input"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Segundo mes con paga extra (ej: agosto)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={netMonthExtra2}
                        onChange={(e) => setNetMonthExtra2(e.target.value)}
                        placeholder="Ej: 3000"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        data-testid="net-month-extra2-input"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tercer mes con paga extra (ej: diciembre)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={netMonthExtra3}
                        onChange={(e) => setNetMonthExtra3(e.target.value)}
                        placeholder="Ej: 3000"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        data-testid="net-month-extra3-input"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  ¿Tu % de retención ha sido el mismo todo el año?
                </label>
                
                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      retentionSame === 'yes'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setRetentionSame('yes')}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                        retentionSame === 'yes'
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}></div>
                      <div className="flex items-center flex-1 gap-3">
                        <span className="text-gray-700 font-medium">Sí, y ha sido del</span>
                        <div className="relative flex-1 max-w-xs">
                          <input
                            type="number"
                            value={retentionPercent}
                            onChange={(e) => {
                              setRetentionPercent(e.target.value);
                              if (!retentionSame) setRetentionSame('yes');
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setRetentionSame('yes');
                            }}
                            placeholder="Ej: 15"
                            min="0"
                            max="99"
                            disabled={retentionSame === 'no'}
                            className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100"
                            data-testid="retention-percent-input"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      retentionSame === 'no'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleRetentionChange('no')}
                    data-testid="retention-no-button"
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        retentionSame === 'no'
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}></div>
                      <span className="text-gray-700 font-medium">NO</span>
                    </div>
                  </div>
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

export default SalaryCalculatorNavarra15;
