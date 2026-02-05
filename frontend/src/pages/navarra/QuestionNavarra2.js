import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const QuestionNavarra2 = () => {
  const navigate = useNavigate();
  const { setAnswer, setFlowPath } = useFlow();
  const [showRCMHelp, setShowRCMHelp] = useState(false);
  const [showIPHelp, setShowIPHelp] = useState(false);
  const [showRetencionHelp, setShowRetencionHelp] = useState(false);

  const handleNext = async (answer) => {
    setAnswer('navarra_q2', answer);
    
    if (answer === 'no') {
      navigate('/result/navarra-obligated');
    } else {
      await setFlowPath('navarra');
      navigate('/salary/check');
    }
  };

  const handlePrevious = () => {
    navigate('/result/navarra');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            {/* Indicador de territorio */}
            <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <p className="text-base text-gray-700">
                <strong>Normativa aplicable:</strong> Régimen foral de Navarra
              </p>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Has obtenido EXCLUSIVAMENTE rendimientos de las siguientes categorías?
            </h1>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700 font-medium mb-2">Categorías permitidas:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Trabajo (se incluyen pensiones)</li>
                <li>
                  <span 
                    className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                    onClick={() => setShowRCMHelp(!showRCMHelp)}
                  >
                    Rendimientos brutos del Capital Mobiliario (RCM)
                  </span>
                  {' '}/{' '}
                  <span 
                    className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                    onClick={() => setShowIPHelp(!showIPHelp)}
                  >
                    Incrementos de patrimonio
                  </span>
                  {' '}CON retención/ingreso a cuenta
                </li>
              </ul>
            </div>

            {/* Popup RCM */}
            {showRCMHelp && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  Los RCM son rendimientos obtenidos del propio dinero, como por ejemplo intereses de cuentas corrientes, dividendos, rendimientos de bonos, etc.
                </p>
              </div>
            )}

            {/* Popup Incrementos de patrimonio */}
            {showIPHelp && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  Los incrementos de patrimonio son el aumento de valor del patrimonio por un cambio en su composición. Normalmente, se deben a la venta de un bien. Por ejemplo, si compré un garaje por 20.000 y lo vendo por 30.000, tengo un incremento de patrimonio de 10.000.
                </p>
              </div>
            )}

            {/* Nota emergente sobre retenciones */}
            <div className="mb-6">
              <button
                onClick={() => setShowRetencionHelp(!showRetencionHelp)}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
              >
                {showRetencionHelp ? '▼' : '▶'} ¿Qué significa que sean CON retención o ingreso a cuenta y cómo lo tengo en cuenta?
              </button>
              
              {showRetencionHelp && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-sm text-gray-700 mb-3">
                    Las retenciones e ingresos a cuenta son adelantos que se pagan a Hacienda antes de presentar el IRPF.
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    En el caso de los RCM, lo normal es que lleven retención. Se puede decir que todos llevan retención, menos los derivados de las Letras del Tesoro. Así, si has obtenido un interés por una Letra del Tesoro, no lleva retención, por lo que si obtuvieras eso junto con otros rendimientos tendrías que marcar no.
                  </p>
                  <p className="text-sm text-gray-700">
                    En el caso de los incrementos de patrimonio, lo normal es que NO LLEVEN. Por eso, si por ejemplo has vendido un garaje y has ganado dinero porque lo vendes 10.000 euros más caro, por ejemplo, ese incremento de patrimonio no lleva retención. Por lo tanto, si tuvieras alguno de esos, tendrías que marcar no.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-25"
                onClick={() => handleNext('yes')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">
                    SÍ - Solo he obtenido rendimientos de estas categorías
                  </span>
                </div>
              </div>

              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-25"
                onClick={() => handleNext('no')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">
                    NO - He obtenido otros tipos de rendimientos
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavarra2;
