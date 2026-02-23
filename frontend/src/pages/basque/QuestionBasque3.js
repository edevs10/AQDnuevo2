import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../../context/FlowContext';

const QuestionBasque3 = () => {
  const navigate = useNavigate();
  const { setAnswer, flowPath } = useFlow();

  const handleNext = (answer) => {
    setAnswer('basque_q3', answer);
    if (answer === 'yes') {
      if (flowPath === 'bizkaiaTerritory') navigate('/result/bizkaia-obligated');
      else if (flowPath === 'gipuzkoaTerritory') navigate('/result/gipuzkoa-obligated');
      else if (flowPath === 'alavaTerritory') navigate('/result/alava-obligated');
      else navigate('/result/obligated');
    } else {
      if (flowPath === 'bizkaiaTerritory') navigate('/result/bizkaia-not-obligated');
      else if (flowPath === 'gipuzkoaTerritory') navigate('/result/gipuzkoa-not-obligated');
      else if (flowPath === 'alavaTerritory') navigate('/result/alava-not-obligated');
      else navigate('/result/not-obligated');
    }
  };

  const handlePrevious = () => {
    navigate('/question/basque/2');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Has obtenido algún rendimiento distinto de los anteriores? Por ejemplo, por el alquiler de una vivienda.
            </h1>
            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300"
                onClick={() => handleNext('yes')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300"
                onClick={() => handleNext('no')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBasque3;
