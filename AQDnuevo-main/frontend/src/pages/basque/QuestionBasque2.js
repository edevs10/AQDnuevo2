import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../../context/FlowContext';

const QuestionBasque2 = () => {
  const navigate = useNavigate();
  const { setAnswer, flowPath } = useFlow();
  const [showRCMHelp, setShowRCMHelp] = useState(false);
  const [showGPHelp, setShowGPHelp] = useState(false);
  const [showCoeficientes, setShowCoeficientes] = useState(false);
  const [showRetencionHelp, setShowRetencionHelp] = useState(false);

  const coeficientesData = [
    { year: '1994 y anteriores', coef: '1,969' },
    { year: '1995', coef: '2,091' },
    { year: '1996', coef: '2,014' },
    { year: '1997', coef: '1,969' },
    { year: '1998', coef: '1,925' },
    { year: '1999', coef: '1,873' },
    { year: '2000', coef: '1,809' },
    { year: '2001', coef: '1,742' },
    { year: '2002', coef: '1,680' },
    { year: '2003', coef: '1,634' },
    { year: '2004', coef: '1,586' },
    { year: '2005', coef: '1,536' },
    { year: '2006', coef: '1,485' },
    { year: '2007', coef: '1,444' },
    { year: '2008', coef: '1,387' },
    { year: '2009', coef: '1,383' },
    { year: '2010', coef: '1,360' },
    { year: '2011', coef: '1,319' },
    { year: '2012', coef: '1,290' },
    { year: '2013', coef: '1,270' },
    { year: '2014', coef: '1,268' },
    { year: '2015', coef: '1,268' },
    { year: '2016', coef: '1,267' },
    { year: '2017', coef: '1,243' },
    { year: '2018', coef: '1,223' },
    { year: '2019', coef: '1,212' },
    { year: '2020', coef: '1,212' },
    { year: '2021', coef: '1,175' },
    { year: '2022', coef: '1,088' },
    { year: '2023', coef: '1,050' },
    { year: '2024', coef: '1,018' },
    { year: '2025', coef: '1,000' },
  ];

  const handleNext = (answer) => {
    setAnswer('basque_q2', answer);
    
    if (answer === 'yes') {
      if (flowPath === 'bizkaiaTerritory') {
        navigate('/result/bizkaia-obligated');
      } else if (flowPath === 'gipuzkoaTerritory') {
        navigate('/result/gipuzkoa-obligated');
      } else if (flowPath === 'alavaTerritory') {
        navigate('/result/alava-obligated');
      } else {
        navigate('/result/obligated');
      }
    } else {
      navigate('/question/12');
    }
  };

  const handlePrevious = () => {
    navigate('/question/basque/1');
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
              ¿Has obtenido en 2025{' '}
              <span 
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                onClick={() => setShowRCMHelp(!showRCMHelp)}
                data-testid="rcm-toggle"
              >
                Rendimientos brutos del Capital Mobiliario (RCM)
              </span>
              {' '}y/o{' '}
              <span 
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                onClick={() => setShowGPHelp(!showGPHelp)}
                data-testid="gp-toggle"
              >
                Ganancias Patrimoniales (GP)
              </span>
              {' '}sometidos a retención o ingreso a cuenta y su suma supera los 1.600 €?
            </h1>

            {/* Popup RCM */}
            {showRCMHelp && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg" data-testid="rcm-content">
                <p className="text-sm text-gray-700">
                  Los RCM son rendimientos obtenidos del propio dinero, como por ejemplo intereses de cuentas corrientes, dividendos, rendimientos de bonos, etc.
                </p>
              </div>
            )}

            {/* Popup GP */}
            {showGPHelp && (
              <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg" data-testid="gp-content">
                <p className="text-sm text-gray-700 mb-3">
                  Las GP, en su mayoría, son la diferencia que surge cuando se vende un elemento de nuestro patrimonio y se hace la siguiente operación: Precio de Venta -{' '}
                  <span 
                    className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                    onClick={() => setShowCoeficientes(!showCoeficientes)}
                    data-testid="coeficientes-toggle"
                  >
                    Precio de Compra multiplicado por coeficiente del año de compra
                  </span>
                </p>

                {/* Tabla de coeficientes */}
                {showCoeficientes && (
                  <div className="mt-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg overflow-auto max-h-64" data-testid="coeficientes-table">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-amber-300">
                          <th className="text-left py-2 font-semibold text-gray-700">Año de compra</th>
                          <th className="text-right py-2 font-semibold text-gray-700">Coeficiente</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coeficientesData.map((item, index) => (
                          <tr key={index} className="border-b border-amber-200">
                            <td className="py-1 text-gray-700">{item.year}</td>
                            <td className="py-1 text-right text-gray-700">{item.coef}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-25"
                onClick={() => handleNext('yes')}
                data-testid="basque-q2-yes"
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">SÍ</span>
                </div>
              </div>

              <div
                className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-25"
                onClick={() => handleNext('no')}
                data-testid="basque-q2-no"
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                  <span className="text-gray-700 font-medium">NO</span>
                </div>
              </div>
            </div>

            {/* Ayuda sobre retención */}
            <div className="mt-6">
              <button
                onClick={() => setShowRetencionHelp(!showRetencionHelp)}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                data-testid="retencion-toggle"
              >
                {showRetencionHelp ? '▼' : '▶'} ¿Qué significa que tengan retención o ingreso a cuenta y cuáles lo tienen?
              </button>
              
              {showRetencionHelp && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg" data-testid="retencion-content">
                  <p className="text-sm text-gray-700 mb-3">
                    La retención o ingreso a cuenta significa que Hacienda se queda con un adelanto de lo que vas a pagar.
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    La gran mayoría de RCM llevan ingreso a cuenta. Si has obtenido RCM que NO VENGAN DE LETRAS DEL TESORO, tienes que tenerlos en cuenta para considerar los 1.600, aunque estén exentos.
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    Las GP, normalmente, no llevan ingreso a cuenta. Por lo tanto, si has obtenido una ganancia porque has vendido un inmueble, por ejemplo, no tienes que tenerla en cuenta aquí.
                  </p>
                  <p className="text-sm text-gray-700">
                    Otras, como las generadas por la venta de participaciones en fondos de inversión o la mayoría de premios no oficiales, sí llevan retención del 19 %.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              data-testid="basque-q2-previous"
            >
              ← Anterior
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBasque2;
