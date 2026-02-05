import React, { useState } from 'react';
import { useFlow } from '../context/FlowContext';

const QuestionCard = ({ 
  questionId, 
  title, 
  options, 
  helpText,
  helpTitle = "Ayuda emergente",
  children,
  onNext,
  onPrevious,
  showPrevious = true,
  customNextText = "Siguiente"
}) => {
  const { answers, setAnswer } = useFlow();
  const [selectedAnswer, setSelectedAnswer] = useState(answers[questionId] || '');
  const [showHelp, setShowHelp] = useState(false);

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
    setAnswer(questionId, value);
  };

  const handleNext = () => {
    if (selectedAnswer && onNext) {
      onNext(selectedAnswer);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Tarjeta principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {title}
            </h1>
            
            {/* Contenido personalizado o opciones estándar */}
            {children || (
              <div className="space-y-4">
                {options?.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedAnswer === option.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                    }`}
                    onClick={() => handleAnswerSelect(option.value)}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        selectedAnswer === option.value
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === option.value && (
                          <div className="w-full h-full rounded-full bg-blue-600"></div>
                        )}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {option.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Ayuda emergente */}
            {helpText && (
              <div className="mt-6">
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                >
                  {showHelp ? '▼' : '▶'} {helpTitle}
                </button>
                
                {showHelp && (
                  <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <div className="text-sm text-gray-700 whitespace-pre-line">
                      {helpText}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            {showPrevious ? (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                ← Anterior
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                selectedAnswer
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {customNextText} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;