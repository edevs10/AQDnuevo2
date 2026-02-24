import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question11 = () => {
  const navigate = useNavigate();
  const { setAnswer, flowPath } = useFlow();
  const [showRCMHelp, setShowRCMHelp] = useState(false);
  const [showGPHelp, setShowGPHelp] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleNext = (answer) => {
    setAnswer('q11', answer);
    
    if (answer === 'yes') {
      navigate('/result/obligated');
    } else {
      navigate('/question/12');
    }
  };

  const handlePrevious = () => {
    navigate('/question/10');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Has obtenido en 2025{' '}
              <span 
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                onClick={() => setShowRCMHelp(!showRCMHelp)}
                data-testid="rcm-toggle"
              >
                Rendimientos brutos del Capital Mobiliario (RCM)
              </span>
              {' '}y/o{' '}
              <span 
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                onClick={() => setShowGPHelp(!showGPHelp)}
                data-testid="gp-toggle"
              >
                Ganancias Patrimoniales (GP)
              </span>
              {' '}sometidos a retención o ingreso a cuenta y su suma supera los 1.600 €?
            </h1>

            {/* Popup RCM */}
            {showRCMHelp && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg" data-testid="rcm-content">
                <p className="text-sm text-gray-700">
                  Los RCM son rendimientos obtenidos del propio dinero, como por ejemplo intereses de cuentas corrientes, dividendos, rendimientos de bonos, etc.
                </p>
              </div>
            )}

            {/* Popup GP */}
            {showGPHelp && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg" data-testid="gp-content">
                <p className="text-sm text-gray-700">
                  Las GP, en su mayoría, son la diferencia que surge cuando se vende un elemento de nuestro patrimonio. Por ejemplo: venta de acciones, fondos de inversión, inmuebles, criptomonedas, etc.
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'yes' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('yes')}
                data-testid="q11-yes"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'yes' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'no' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('no')}
                data-testid="q11-no"
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
              data-testid="q11-previous"
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

export default Question11;
