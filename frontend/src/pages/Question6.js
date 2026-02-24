import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useFlow } from '../context/FlowContext';

const Question6 = () => {
  const navigate = useNavigate();
  const { setAnswer, flowPath } = useFlow();

  const handleNext = (answer) => {
    setAnswer('q6', answer);
    navigate('/question/7');
  };

  const handlePrevious = () => {
    // Determinar de dónde venimos según el flowPath
    if (flowPath === 'timeResident') {
      navigate('/question/5a');
    } else if (flowPath === 'economicResident') {
      navigate('/question/5b');
    } else {
      navigate('/question/5a'); // fallback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">
              Territorio Común - Agencia Tributaria (AEAT)
            </h1>
            
            <div className="p-6 bg-green-50 border-l-4 border-green-400 rounded-r-lg mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Te corresponde la Agencia Tributaria estatal (AEAT), y la normativa general de territorio común (al margen de particularidades por comunidad autónoma):
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li className="font-medium text-gray-800">Ley 35/2006, de 28 de noviembre, del Impuesto sobre la Renta de las Personas Físicas y de modificación parcial de las leyes de los Impuestos sobre Sociedades, sobre la Renta de no Residentes y sobre el Patrimonio.</li>
                <li className="font-medium text-gray-800">Real Decreto 439/2007, de 30 de marzo, por el que se aprueba el Reglamento del Impuesto sobre la Renta de las Personas Físicas y se modifica el Reglamento de Planes y Fondos de Pensiones, aprobado por Real Decreto 304/2004, de 20 de febrero.</li>
              </ul>
            </div>

            <p className="text-gray-600 mb-4">
              Ahora determinaremos si tienes obligación de declarar el IRPF. Presiona "Continuar" para seguir.
            </p>
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
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Continuar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question6;
