import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const QuestionNavarra3 = () => {
  const navigate = useNavigate();
  const { setAnswer } = useFlow();
  const [showHelp, setShowHelp] = useState(false);
  const [showEquivalents, setShowEquivalents] = useState(false);

  const equivalentsText = `O bien cobradas, en los mismos supuestos, de:

• en el caso de autónomos, de las Mutualidades de Previsión Social alternativas al RETA

• en el caso de socios cooperativistas, de las Entidades de Previsión Social Voluntaria (EPSV).

O bien las pensiones por inutilidad o incapacidad reconocidas por las Administraciones Públicas cuando el grado de disminución física o psíquica sea constitutivo de una incapacidad permanente absoluta para el desempeño de cualquier puesto de trabajo o de una gran invalidez.

El límite de la cantidad exenta será el importe de la prestación máxima que reconozca la Seguridad Social por el concepto que corresponda.`;

  const handleNext = (answer) => {
    setAnswer('navarra_q3', answer);
    
    if (answer === 'no') {
      navigate('/result/navarra-obligated');
    } else {
      navigate('/question/navarra/4');
    }
  };

  const handlePrevious = () => {
    navigate('/salary/check');
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
              ¿Los rendimientos del trabajo brutos NO EXENTOS han sido inferiores a 14.500€?
            </h1>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Nota:</strong> Se refiere al total bruto de rendimientos del trabajo NO EXENTOS obtenidos en 2025, incluyendo salarios, pensiones y otras remuneraciones laborales.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Si no se ha obtenido ninguno, seleccionar "sí".</strong>
              </p>
            </div>

            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-25"
                onClick={() => handleNext('yes')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">
                    SÍ - Inferiores a 14.500€ (o no he obtenido ninguno)
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
                    NO - Iguales o superiores a 14.500€
                  </span>
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
                      <span>Al calcular estos 14.500 euros no tienes que sumar aquellos que estén exentos. Entre las cantidades exentas más típicas, encontramos, por ejemplo, las cobradas de la </span>
                      <span 
                        className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                        onClick={() => setShowEquivalents(!showEquivalents)}
                        data-testid="navarra-equivalents-toggle"
                      >
                        Seguridad Social o equivalentes (ver) {showEquivalents ? '▼' : ''}
                      </span>
                      <span> por Incapacidad Permanente Absoluta (IPA) o Gran Invalidez (GI) en todo caso.</span>
                    </div>

                    {showEquivalents && (
                      <div className="mt-3 mb-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg" data-testid="navarra-equivalents-content">
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {equivalentsText}
                        </p>
                      </div>
                    )}
                    
                    <p className="mb-3">
                      Así por ejemplo, si sólo cobras 25.000 euros por una pensión por IPA (exenta), tienes que marcar "no", porque las rentas no exentas son 0.
                    </p>
                    
                    <p>
                      Para conocer la lista total de cantidades exentas, puedes consultar el siguiente link: <a href="https://www.navarra.es/NR/rdonlyres/9F0B796F-D699-4BEF-87E2-0BB39D86C9FC/0/TRLFIRPFv213.html?v=v20250101#a7" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline hover:text-blue-800">haz click aquí</a>.
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
            >
              ← Anterior
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavarra3;