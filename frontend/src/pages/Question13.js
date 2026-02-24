import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question13 = () => {
  const navigate = useNavigate();
  const { setAnswer, answers, flowPath } = useFlow();
  const [showImputadas, setShowImputadas] = useState(false);

  const isBasqueTerritory = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';

  const handleAnswerSelect = (value) => {
    setAnswer('q13', value);
  };

  const handleNext = () => {
    const answer = answers.q13;
    if (!answer) return;

    if (answer === 'yes') {
      if (isBasqueTerritory) {
        switch (flowPath) {
          case 'bizkaiaTerritory': navigate('/result/bizkaia-obligated'); break;
          case 'gipuzkoaTerritory': navigate('/result/gipuzkoa-obligated'); break;
          case 'alavaTerritory': navigate('/result/alava-obligated'); break;
          default: navigate('/result/obligated'); break;
        }
      } else {
        navigate('/result/obligated');
      }
    } else {
      if (flowPath === 'bizkaiaTerritory') navigate('/result/bizkaia-not-obligated');
      else if (flowPath === 'gipuzkoaTerritory') navigate('/result/gipuzkoa-not-obligated');
      else if (flowPath === 'alavaTerritory') navigate('/result/alava-not-obligated');
      else navigate('/result/not-obligated');
    }
  };

  const handlePrevious = () => {
    navigate('/question/12');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿El importe total fue mayor de 1.000 euros?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                onClick={() => setShowImputadas(!showImputadas)}
              >
                (¿Cómo se calcula en el caso de las rentas imputadas?)
              </span>
            </h1>

            {showImputadas && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  En el caso de las rentas imputadas por inmuebles, el importe se calcula aplicando el 1,1% al valor catastral del inmueble (o el 2% si el valor catastral no ha sido revisado en los últimos 10 años). Este importe es el que debes sumar al resto de rentas para comprobar si superas los 1.000€.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answers.q13 === 'yes'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('yes')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers.q13 === 'yes' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answers.q13 === 'no'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('no')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers.q13 === 'no' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">NO</span>
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
              disabled={!answers.q13}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                answers.q13
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

export default Question13;
