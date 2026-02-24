import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question9 = () => {
  const navigate = useNavigate();
  const { setAnswer, answers } = useFlow();
  const [selectedAnswer, setSelectedAnswer] = useState(answers['q9'] || '');
  const [showHelp, setShowHelp] = useState(false);
  const [showEquivalents, setShowEquivalents] = useState(false);

  const equivalentsText = `O bien cobradas, en los mismos supuestos, de:

• en el caso de autónomos, de las Mutualidades de Previsión Social alternativas al RETA
• en el caso de socios cooperativistas, de las Entidades de Previsión Social Voluntaria (EPSV).

El límite de la cantidad exenta será el importe de la prestación máxima que reconozca la Seguridad Social por el concepto que corresponda.`;

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
    setAnswer('q9', value);
  };

  const handleNext = () => {
    if (selectedAnswer === 'yes') {
      navigate('/result/obligated');
    } else {
      navigate('/question/10');
    }
  };

  const handlePrevious = () => {
    navigate('/salary/check');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿En 2025 has recibido más de 22.000 euros brutos de rendimientos del trabajo NO EXENTOS?
            </h1>
            
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === 'yes'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('yes')}
                data-testid="q9-yes"
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
                data-testid="q9-no"
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

            {/* Ayuda emergente */}
            <div className="mt-6">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
              >
                {showHelp ? '▼' : '▶'} ¿Qué son los rendimientos no exentos y cómo los tengo en cuenta?
              </button>
              
              {showHelp && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <div className="text-sm text-gray-700">
                    <p className="mb-3">
                      Los Rendimientos del Trabajo (RTP) incluyen, entre otros: salarios y sueldos; pensiones públicas y privadas; rescates de seguros del trabajo; otras remuneraciones por trabajo.
                    </p>
                    
                    <div className="mb-3">
                      <span>Al calcular estos 22.000 euros no tienes que sumar aquellos que estén exentos. Entre las cantidades exentas más típicas, encontramos, por ejemplo, las cobradas de la </span>
                      <span 
                        className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                        onClick={() => setShowEquivalents(!showEquivalents)}
                        data-testid="q9-equivalents-toggle"
                      >
                        Seguridad Social o equivalentes (ver) {showEquivalents ? '▼' : ''}
                      </span>
                      <span> por Incapacidad Permanente Absoluta (IPA) o Gran Invalidez (GI).</span>
                    </div>

                    {showEquivalents && (
                      <div className="mt-3 mb-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg" data-testid="q9-equivalents-content">
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {equivalentsText}
                        </p>
                      </div>
                    )}

                    <p className="mb-3">
                      Asimismo, estarán exentas las siguientes prestaciones siempre que se perciban en situaciones idénticas a las previstas para la incapacidad permanente absoluta o gran invalidez de la Seguridad Social.
                    </p>
                    
                    <p className="mb-3">
                      Así por ejemplo, si sólo cobras 23.000 euros por una pensión por IPA (exenta), tienes que marcar "no", porque las rentas no exentas son 0.
                    </p>
                    
                    <p>
                      Para conocer la lista total de cantidades exentas, puedes consultar el siguiente link: <a href="https://noticias.juridicas.com/base_datos/Fiscal/l35-2006.t1.html#a7" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline hover:text-blue-800">haz click aquí</a>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              data-testid="q9-previous"
            >
              ← Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                selectedAnswer
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              data-testid="q9-next"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question9;
