import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question1 = () => {
  const navigate = useNavigate();
  const { setAnswer, setFlowPath, answers } = useFlow();
  const [selectedAnswer, setSelectedAnswer] = useState(answers['q1'] || '');

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
    setAnswer('q1', value);
  };

  const handleNext = () => {
    if (selectedAnswer === 'yes') {
      setFlowPath('timeResident');
      navigate('/question/4a');
    } else {
      navigate('/question/2');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Has residido en España más de 183 días durante 2025 teniendo en cuenta las ausencias esporádicas?
            </h1>

            {/* Cuadro informativo amarillo */}
            <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
              <p className="text-sm text-gray-700 font-semibold mb-2">OJO:</p>
              <p className="text-sm text-gray-700 mb-3">
                Las ausencias esporádicas son los días que hayas pasado fuera de España por trabajo, viajes, etc. En principio, estos días cuentan como si hubieses vivido en España, salvo que PRUEBES que tenías la residencia fiscal en otro país o sea una ausencia de más de 183 días.
              </p>
              <p className="text-sm text-gray-700">
                Así, por ejemplo, si pasé 181 días en España, pero estuve 3 días en Francia de vacaciones, tengo que contestar SÍ, porque estuve 184 días en España considerando las ausencias esporádicas.
              </p>
            </div>
            
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === 'yes'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('yes')}
                data-testid="q1-yes"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === 'yes'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === 'no'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('no')}
                data-testid="q1-no"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === 'no'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}></div>
                  <span className="text-gray-700 font-medium">NO</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              data-testid="q1-home"
            >
              ← Inicio
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                selectedAnswer
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              data-testid="q1-next"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question1;