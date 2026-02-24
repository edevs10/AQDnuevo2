import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const QuestionNavarra4 = () => {
  const navigate = useNavigate();
  const { setAnswer } = useFlow();
  const [showRCMHelp, setShowRCMHelp] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleNext = (answer) => {
    setAnswer('navarra_q4', answer);
    
    if (answer === 'no') {
      navigate('/result/navarra-obligated');
    } else {
      navigate('/question/navarra/5');
    }
  };

  const handlePrevious = () => {
    navigate('/question/navarra/3');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            {/* Indicador de territorio */}
            <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <p className="text-sm text-gray-700">
                <strong>Normativa aplicable:</strong> Régimen foral de Navarra
              </p>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Los{' '}
              <span 
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                onClick={() => setShowRCMHelp(!showRCMHelp)}
              >
                Rendimientos brutos del Capital Mobiliario (RCM)
              </span>
              {' '}+ Incrementos de patrimonio CON retención han sido inferiores a 1.600€, contando los exentos?
            </h1>

            {/* Popup RCM */}
            {showRCMHelp && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  Los RCM son rendimientos obtenidos del propio dinero, como por ejemplo intereses de cuentas corrientes, dividendos, rendimientos de bonos, etc.
                </p>
              </div>
            )}
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-2">Se incluyen:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Intereses de depósitos bancarios</li>
                  <li>Dividendos de acciones</li>
                  <li>Ganancias por venta de valores mobiliarios</li>
                  <li>Otros rendimientos CON retención o ingreso a cuenta</li>
                </ul>
                <p className="text-xs text-gray-600">
                  <strong>Si no se ha obtenido ninguno, seleccionar "sí".</strong>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'yes' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('yes')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'yes' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">
                    SÍ - Inferiores a 1.600€ (o no he obtenido ninguno)
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'no' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('no')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'no' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">
                    NO - Iguales o superiores a 1.600€
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

export default QuestionNavarra4;
