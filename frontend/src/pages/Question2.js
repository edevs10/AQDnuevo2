import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question2 = () => {
  const navigate = useNavigate();
  const { setAnswer, setFlowPath } = useFlow();
  const [showHelp, setShowHelp] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const helpText = `Se considera que tienes el núcleo o base de tus actividades/intereses económicos en España si, por ejemplo:

• Trabajas para una empresa española, aunque viajes al extranjero temporalmente.
• Tu negocio principal está registrado o gestionado en España.
• Tus inversiones más relevantes (inmuebles, empresas, cuentas) se encuentran principalmente en España.
• Más de la mitad de tus ingresos provienen de fuentes situadas en España.`;

  const handleNext = (answer) => {
    setAnswer('q2', answer);
    
    if (answer === 'yes') {
      setFlowPath('economicResident');
      navigate('/question/4b');
    } else {
      navigate('/question/3');
    }
  };

  const handlePrevious = () => {
    navigate('/question/1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿El núcleo principal o la base de tus actividades económicas o intereses económicos está en España, directa o indirectamente?
            </h1>
            
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'yes' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('yes')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'yes' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === 'no' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAnswer('no')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedAnswer === 'no' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} mr-3`}></div>
                  <span className="text-gray-700 font-medium">NO</span>
                </div>
              </div>
            </div>

            {/* Ayuda emergente */}
            <div className="mt-6">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
              >
                {showHelp ? '▼' : '▶'} ¿Qué es mi núcleo principal o base de actividades económicas o intereses económicos?
              </button>
              
              {showHelp && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {helpText}
                  </div>
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

export default Question2;
