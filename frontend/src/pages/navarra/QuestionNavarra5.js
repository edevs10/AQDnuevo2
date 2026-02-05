import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const QuestionNavarra5 = () => {
  const navigate = useNavigate();
  const { setAnswer } = useFlow();

  const handleNext = (answer) => {
    setAnswer('navarra_q5', answer);
    
    if (answer === 'yes') {
      navigate('/result/navarra-obligated');
    } else {
      navigate('/result/navarra-not-obligated');
    }
  };

  const handlePrevious = () => {
    navigate('/question/navarra/4');
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
              ¿Tienes incrementos de patrimonio por transmisión/reembolso de fondos de inversión donde NO procede determinar base de retención por art. 80.2?
            </h1>
            
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-2">Explicación:</p>
                <p className="mb-2">
                  Se refiere a casos específicos de fondos de inversión donde la normativa establece 
                  que no se debe determinar la base de retención según el artículo 80.2.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Si no los hay, seleccionar "no".</strong>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-25"
                onClick={() => handleNext('yes')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">
                    SÍ - Tengo estos incrementos específicos
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
                    NO - No tengo estos incrementos (o no aplica)
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

export default QuestionNavarra5;