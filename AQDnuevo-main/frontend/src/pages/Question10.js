import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const Question10 = () => {
  const navigate = useNavigate();
  const { setAnswer, answers } = useFlow();
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [showTooltip3, setShowTooltip3] = useState(false);
  const [showTooltip4, setShowTooltip4] = useState(false);
  const [showTooltip5, setShowTooltip5] = useState(false);

  const handleAnswerSelect = (value) => {
    setAnswer('q10', value);
  };

  const handleNext = () => {
    const answer = answers.q10;
    if (!answer) return;
    
    // NO y "Ninguna de las anteriores" van a pregunta 11
    if (answer === 'no' || answer === 'none_applies') {
      navigate('/question/11');
    } else {
      // Todas las demás opciones específicas van a obligated
      navigate('/result/obligated');
    }
  };

  const handlePrevious = () => {
    navigate('/question/9');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Has obtenido más de 15.876 € brutos anuales de rendimientos del trabajo NO EXENTOS (salarios, pensiones, jubilaciones)?
            </h1>
            
            <div className="space-y-4">
              {/* Opción NO */}
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answers.q10 === 'no'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
                onClick={() => handleAnswerSelect('no')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers.q10 === 'no'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {answers.q10 === 'no' && (
                      <div className="w-full h-full rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">
                    NO
                  </span>
                </div>
              </div>

              {/* Sección SÍ con sub-opciones */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-sm text-gray-700 font-medium mb-4">
                  SÍ (marca el caso que te corresponda):
                </p>
                
                <div className="space-y-3">
                  {/* Opción 1: Más de un pagador */}
                  <div
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      answers.q10 === 'multiple_payers'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswerSelect('multiple_payers')}
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full border mr-2 mt-1 flex-shrink-0 ${
                        answers.q10 === 'multiple_payers'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <div className="text-sm text-gray-700">
                        <span>He tenido más de un pagador y la suma percibida del segundo y siguientes supera los 1.500 € anuales </span>
                        <span 
                          className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                          onClick={(e) => { e.stopPropagation(); setShowTooltip1(!showTooltip1); }}
                        >
                          (ejemplo)
                        </span>
                        <span>.</span>
                        {showTooltip1 && (
                          <div className="mt-2 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg text-sm">
                            Cambiaste de empresa durante el año y el segundo empleador te pagó más de 1.400 €, y el tercero 300 €.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Opción 2: Pensiones públicas */}
                  <div
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      answers.q10 === 'public_pensions'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswerSelect('public_pensions')}
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full border mr-2 mt-1 flex-shrink-0 ${
                        answers.q10 === 'public_pensions'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <div className="text-sm text-gray-700">
                        <span>Todos mis rendimientos del trabajo son pensiones públicas (Seguridad Social, Clases Pasivas, etc.), y he solicitado en Hacienda que mis pagadores calculen la retención por el </span>
                        <span 
                          className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                          onClick={(e) => { e.stopPropagation(); setShowTooltip2(!showTooltip2); }}
                        >
                          "procedimiento especial"
                        </span>
                        <span>.</span>
                        {showTooltip2 && (
                          <div className="mt-2 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg text-sm">
                            Aplica si recibes pensiones públicas de distintos organismos y presentaste el modelo 146 en la AEAT.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Opción 3: Pensiones compensatorias */}
                  <div
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      answers.q10 === 'compensatory_pensions'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswerSelect('compensatory_pensions')}
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full border mr-2 mt-1 flex-shrink-0 ${
                        answers.q10 === 'compensatory_pensions'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <div className="text-sm text-gray-700">
                        <span>He recibido pensiones compensatorias del cónyuge o anualidades por alimentos de persona distinta de mis padres </span>
                        <span 
                          className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                          onClick={(e) => { e.stopPropagation(); setShowTooltip3(!showTooltip3); }}
                        >
                          (ejemplo)
                        </span>
                        <span>.</span>
                        {showTooltip3 && (
                          <div className="mt-2 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg text-sm">
                            Recibes pagos por divorcio/separación establecidos en sentencia o convenio.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Opción 4: Sin retención */}
                  <div
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      answers.q10 === 'no_retention'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswerSelect('no_retention')}
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full border mr-2 mt-1 flex-shrink-0 ${
                        answers.q10 === 'no_retention'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <div className="text-sm text-gray-700">
                        <span>Algún pagador no estaba obligado a practicar retención sobre mis ingresos </span>
                        <span 
                          className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                          onClick={(e) => { e.stopPropagation(); setShowTooltip4(!showTooltip4); }}
                        >
                          (ejemplo)
                        </span>
                        <span>.</span>
                        {showTooltip4 && (
                          <div className="mt-2 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg text-sm">
                            Has tenido un empleador particular (v. ejerciste como empleado/a doméstico/a), un empleador que era organismo internacional, o una empresa extranjera sin filial en España.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Opción 5: Tipo fijo de retención */}
                  <div
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      answers.q10 === 'fixed_retention'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswerSelect('fixed_retention')}
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full border mr-2 mt-1 flex-shrink-0 ${
                        answers.q10 === 'fixed_retention'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <div className="text-sm text-gray-700">
                        <span>He obtenido rendimientos sujetos a tipo fijo de retención </span>
                        <span 
                          className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                          onClick={(e) => { e.stopPropagation(); setShowTooltip5(!showTooltip5); }}
                        >
                          (ejemplo)
                        </span>
                        <span>.</span>
                        {showTooltip5 && (
                          <div className="mt-2 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg text-sm">
                            Números 3.º y 4.º del artículo 80.1. del RIRPF: contrato temporal de duración &lt; 1 año; pagos por consejos de administración, sindicatos o similares.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Opción 6: Ninguna de las anteriores */}
                  <div
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      answers.q10 === 'none_applies'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswerSelect('none_applies')}
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full border mr-2 mt-1 flex-shrink-0 ${
                        answers.q10 === 'none_applies'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <span className="text-sm text-gray-700">
                        Ninguna de las anteriores es mi caso
                      </span>
                    </div>
                  </div>
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
              disabled={!answers.q10}
              className={`px-8 py-3 font-medium rounded-lg transition-colors duration-200 ${
                answers.q10
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

export default Question10;
