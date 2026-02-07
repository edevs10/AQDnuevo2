import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const SalaryResult = () => {
  const navigate = useNavigate();
  const { flowPath, answers } = useFlow();
  
  const grossAnnual = answers.calculated_gross_annual || 0;

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

  const getThreshold = () => {
    switch (flowPath) {
      case 'bizkaiaTerritory':
      case 'gipuzkoaTerritory':
      case 'alavaTerritory':
        return 20000;
      case 'navarra':
        return 14500;
      default:
        return 22000;
    }
  };

  const exceedsThreshold = () => {
    const threshold = getThreshold();
    if (flowPath === 'navarra') {
      return grossAnnual >= threshold; // Navarra: "alcanza o supera"
    }
    return grossAnnual > threshold; // Otros: "supera"
  };

  const handleNext = () => {
    if (exceedsThreshold()) {
      // Ir a la página de obligación de declarar según territorio
      switch (flowPath) {
        case 'bizkaiaTerritory':
          navigate('/result/bizkaia-obligated');
          break;
        case 'gipuzkoaTerritory':
          navigate('/result/gipuzkoa-obligated');
          break;
        case 'alavaTerritory':
          navigate('/result/alava-obligated');
          break;
        case 'navarra':
          navigate('/result/navarra-obligated');
          break;
        default:
          navigate('/result/obligated');
          break;
      }
    } else {
      // Continuar con el proceso de descarte según el territorio
      switch (flowPath) {
        case 'bizkaiaTerritory':
        case 'gipuzkoaTerritory':
        case 'alavaTerritory':
          navigate('/question/basque/2'); // Siguiente pregunta en el flujo vasco (RCM y GP)
          break;
        case 'navarra':
          navigate('/question/navarra/4'); // Siguiente pregunta en Navarra
          break;
        default:
          navigate('/question/10'); // Siguiente pregunta en territorio común
          break;
      }
    }
  };

  const handlePrevious = () => {
    navigate('/salary/calculator');
  };

  const isBasqueTerritory = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';
  const threshold = getThreshold();
  const exceeds = exceedsThreshold();

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
              Tu salario bruto anual es:
            </h1>
            
            <div className="text-center py-8">
              <p className="text-5xl font-bold text-blue-600 mb-4">
                {grossAnnual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </p>
              
              <div className={`mt-6 p-4 rounded-lg ${exceeds ? 'bg-amber-50 border-l-4 border-amber-400' : 'bg-green-50 border-l-4 border-green-400'}`}>
                <p className="text-sm text-gray-700">
                  {exceeds ? (
                    <>
                      <strong>Nota:</strong> Tu salario bruto anual {flowPath === 'navarra' ? 'alcanza o supera' : 'supera'} el umbral de {threshold.toLocaleString('es-ES')} € establecido para {getTerritoryName()}.
                    </>
                  ) : (
                    <>
                      <strong>Nota:</strong> Tu salario bruto anual no supera el umbral de {threshold.toLocaleString('es-ES')} € establecido para {getTerritoryName()}. Continuaremos con el proceso de descarte.
                    </>
                  )}
                </p>
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
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryResult;
