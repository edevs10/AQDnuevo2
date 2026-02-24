import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question12 = () => {
  const navigate = useNavigate();
  const { setAnswer, answers, flowPath } = useFlow();
  const [showImputadas, setShowImputadas] = useState(false);

  const handleAnswerSelect = (value) => {
    setAnswer('q12', value);
  };

  const handleNext = () => {
    const answer = answers.q12;
    if (!answer) return;
    if (answer === 'yes') {
      navigate('/question/13');
    } else {
      if (flowPath === 'bizkaiaTerritory') {
        navigate('/result/bizkaia-not-obligated');
      } else if (flowPath === 'gipuzkoaTerritory') {
        navigate('/result/gipuzkoa-not-obligated');
      } else if (flowPath === 'alavaTerritory') {
        navigate('/result/alava-not-obligated');
      } else {
        navigate('/result/not-obligated');
      }
    }
  };

  const handlePrevious = () => {
    navigate('/question/11');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿En 2025 has obtenido ayudas públicas, RCM derivados de letras del Tesoro, o{' '}
              <span
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                onClick={() => setShowImputadas(!showImputadas)}
              >
                rentas imputadas del artículo 85.1. LIRPF
              </span>
              ?
            </h1>

            {showImputadas && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  Las rentas imputadas del artículo 85.1 LIRPF son las que Hacienda te asigna por ser propietario de un inmueble urbano que no es tu vivienda habitual y que no está alquilado. Por ejemplo, si tienes una segunda vivienda vacía, Hacienda te imputa una renta aunque no hayas cobrado nada por ella.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answers.q12 === 'yes'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('yes')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers.q12 === 'yes' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answers.q12 === 'no'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('no')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers.q12 === 'no' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
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
              disabled={!answers.q12}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                answers.q12
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

export default Question12;
