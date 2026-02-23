import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question8ter = () => {
  const navigate = useNavigate();
  const { setAnswer } = useFlow();

  const handleNext = (answer) => {
    setAnswer('q8ter', answer);
    if (answer === 'yes') {
      navigate('/result/not-obligated');
    } else {
      navigate('/salary/check');
    }
  };

  const handlePrevious = () => {
    navigate('/question/8bis');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿En caso de que además hayas tenido pérdidas patrimoniales, éstas han sido inferiores a 500 euros?
            </h1>
            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                onClick={() => handleNext('yes')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">Sí, han sido inferiores o no he tenido pérdidas patrimoniales</span>
                </div>
              </div>
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                onClick={() => handleNext('no')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">No, mis pérdidas han sido de 500 euros o más</span>
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

export default Question8ter;
