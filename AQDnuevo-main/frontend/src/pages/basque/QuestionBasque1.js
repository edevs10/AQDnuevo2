import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const QuestionBasque1 = () => {
  const navigate = useNavigate();
  const { setAnswer, flowPath } = useFlow();
  const [showHelp, setShowHelp] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [showEquivalents, setShowEquivalents] = useState(false);

  // Determinar si mostrar ayuda emergente (para Bizkaia, Gipuzkoa y Álava)
  const shouldShowHelp = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';

  // Texto de equivalentes (para todos los territorios)
  const equivalentsText = `O bien cobradas de:
• en el caso de autónomos, de las Mutualidades de Previsión Social alternativas al RETA
• en el caso de socios cooperativistas, de las Entidades de Previsión Social Voluntaria (EPSV).

El límite de la cantidad exenta será el importe de la prestación máxima que reconozca la Seguridad Social por el concepto que corresponda.`;

  // Texto para Bizkaia y Gipuzkoa (parte antes del enlace interactivo)
  const generalHelpTextBefore1 = `Los Rendimientos del Trabajo (RTP) incluyen, entre otros: salarios y sueldos; pensiones públicas y privadas; rescates de seguros del trabajo; otras remuneraciones por trabajo.

Al calcular estos 20.000 euros no tienes que sumar aquellos que estén exentos. Entre las cantidades exentas más típicas, encontramos, por ejemplo, las cobradas de la`;

  const generalHelpTextBefore2 = `por Incapacidad Permanente Absoluta (IPA) o Gran Invalidez (GI) en todo caso.

También están exentas las cantidades cobradas por Incapacidad Permanente Total (IPT), pero`;

  // Texto de requisitos para Bizkaia y Gipuzkoa
  const bizkaiaGipuzkoaRequirementsText = `Para que lo percibido por IPT esté exento, además de tener 55 años o más a 31/12/2025, es necesario que no hayas recibido ningún rendimiento por trabajo activo o rendimiento por actividades económicas, salvo el primer año de la prestación, en que sí se te permite.

Si lo que cobras son rendimientos de trabajo pasivos (pensión por jubilación, EPSV o plan de pensiones, etc.), la IPT estará exenta si cumples con la edad.`;

  // Texto específico para Álava
  const alavaHelpTextBefore1 = `Los Rendimientos del Trabajo (RTP) incluyen, entre otros: salarios y sueldos; pensiones públicas y privadas; rescates de seguros del trabajo; otras remuneraciones por trabajo.

Al calcular estos 20.000 euros no tienes que sumar aquellos que estén exentos. Entre las cuantías más típicas, encontramos, por ejemplo, las cobradas de la`;

  const alavaHelpTextBefore2 = `por Incapacidad Permanente Absoluta (IPA) o Gran Invalidez (GI) en todo caso.

También están exentas las cantidades cobradas por Incapacidad Permanente Parcial (IPP) o (IPT), pero sólo`;

  const requirementsText = `Para que lo percibido por IPT o IPP esté exento, es necesario que no percibas ningún otro rendimiento de trabajo activos (sueldos) o rendimiento de actividades económicas. Si lo que percibes es un rendimiento de trabajo pasivo (jubilación, rescate EPSV o plan de pensiones, etc.), la IPT o IPP estará exenta.

Incluso, si percibes rendimientos de trabajo activos o rendimientos de actividades económicas de manera periódica, el año en que empieces a cobrar la IPP o IPT estará exenta. Los años sucesivos NO estará exenta, salvo que lo que cobres por trabajo activo o actividades económicas sean 1000 euros anuales o menos.`;

  const handleNext = (answer) => {
    setAnswer('basque_q1', answer);
    
    if (answer === 'yes') {
      // Navegar a la página de obligado específica según el territorio
      switch (flowPath) {
        case 'bizkaiaTerritory':
          navigate('/result/bizkaia-obligated');
          break;
        case 'gipuzkoaTerritory':
          navigate('/result/gipuzkoa-obligated');
          break;
        case 'alavaTerritory':
          navigate('/result/alava-obligated');
          break;
        default:
          navigate('/result/obligated');
          break;
      }
    } else {
      // Ir a la pregunta 2 específica de territorios vascos (RCM y GP)
      navigate('/question/basque/2');
    }
  };

  const handlePrevious = () => {
    navigate('/salary/check');
  };

  const getTerritoryName = () => {
    switch (flowPath) {
      case 'bizkaiaTerritory':
        return 'Bizkaia';
      case 'gipuzkoaTerritory':
        return 'Gipuzkoa';
      case 'alavaTerritory':
        return 'Álava';
      default:
        return 'País Vasco';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            {/* Indicador de territorio */}
            <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <p className="text-sm text-gray-700">
                <strong>Normativa aplicable:</strong> Régimen foral de {getTerritoryName()}
              </p>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ¿En 2025 has recibido más de 20.000 euros brutos de rendimientos del trabajo NO EXENTOS?
            </h1>
            
            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-25"
                onClick={() => handleNext('yes')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>

              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-25"
                onClick={() => handleNext('no')}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">NO</span>
                </div>
              </div>
            </div>

            {/* Ayuda emergente */}
            {shouldShowHelp && (
              <div className="mt-6">
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                >
                  {showHelp ? '▼' : '▶'} ¿Qué son rendimientos no exentos y cómo los tengo en cuenta?
                </button>
                
                {showHelp && (
                  <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    {flowPath === 'alavaTerritory' ? (
                      <div className="text-sm text-gray-700">
                        <div className="mb-2">
                          <span className="whitespace-pre-line">{alavaHelpTextBefore1}</span>
                          {' '}
                          <span 
                            className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                            onClick={() => setShowEquivalents(!showEquivalents)}
                            data-testid="alava-equivalents-toggle"
                          >
                            Seguridad Social o equivalentes (ver) {showEquivalents ? '▼' : ''}
                          </span>
                          {' '}
                          <span className="whitespace-pre-line">{alavaHelpTextBefore2}</span>
                          {' '}
                          <span 
                            className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                            onClick={() => setShowRequirements(!showRequirements)}
                            data-testid="alava-requirements-toggle"
                          >
                            cuando se cumplen los requisitos {showRequirements ? '▼' : '(ver)'}
                          </span>
                          .
                        </div>

                        {showEquivalents && (
                          <div className="mt-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg" data-testid="alava-equivalents-content">
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                              {equivalentsText}
                            </p>
                          </div>
                        )}
                        
                        {showRequirements && (
                          <div className="mt-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg" data-testid="alava-requirements-content">
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                              {requirementsText}
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-4">
                          <p>Así por ejemplo, si cobras 25.000 euros por una pensión por IPA, tienes que marcar "no", porque las rentas no exentas son 0.</p>
                          
                          <p className="mt-4">Para conocer la lista total de cantidades exentas, puedes consultar el siguiente link: <a href="https://noticias.juridicas.com/base_datos/CCAA/517914-norma-foral-33-2013-de-27-nov-alava-impuesto-sobre-la-renta-de-las-personas.html#a9" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline hover:text-blue-800">haz click aquí</a>.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-700">
                        <div className="mb-2">
                          <span className="whitespace-pre-line">{generalHelpTextBefore1}</span>
                          {' '}
                          <span 
                            className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                            onClick={() => setShowEquivalents(!showEquivalents)}
                            data-testid="bizkaia-gipuzkoa-equivalents-toggle"
                          >
                            Seguridad Social o equivalentes (ver) {showEquivalents ? '▼' : ''}
                          </span>
                          {' '}
                          <span className="whitespace-pre-line">{generalHelpTextBefore2}</span>
                          {' '}
                          <span 
                            className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                            onClick={() => setShowRequirements(!showRequirements)}
                            data-testid="bizkaia-gipuzkoa-requirements-toggle"
                          >
                            sólo si cumples determinados requisitos (ver) {showRequirements ? '▼' : ''}
                          </span>
                          .
                        </div>

                        {showEquivalents && (
                          <div className="mt-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg" data-testid="bizkaia-gipuzkoa-equivalents-content">
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                              {equivalentsText}
                            </p>
                          </div>
                        )}
                        
                        {showRequirements && (
                          <div className="mt-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg" data-testid="bizkaia-gipuzkoa-requirements-content">
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                              {bizkaiaGipuzkoaRequirementsText}
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-4">
                          <p>Así por ejemplo, si sólo cobras 25.000 euros por una pensión por IPA (exenta), tienes que marcar "no", porque las rentas no exentas son 0.</p>
                          
                          <p className="mt-4">
                            Para conocer la lista total de cantidades exentas, puedes consultar el siguiente link: {flowPath === 'bizkaiaTerritory' ? (
                              <a href="https://noticias.juridicas.com/base_datos/CCAA/518289-norma-foral-13-2013-de-5-de-diciembre-del-impuesto-sobre-la-renta-de-las.html#a9" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline hover:text-blue-800">haz click aquí</a>
                            ) : (
                              <a href="https://noticias.juridicas.com/base_datos/CCAA/521360-norma-foral-3-2014-de-17-de-enero-del-impuesto-sobre-la-renta-de-las-personas.html#a9" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline hover:text-blue-800">haz click aquí</a>
                            )}.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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

export default QuestionBasque1;