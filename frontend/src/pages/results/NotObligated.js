import React from 'react';
import ResultCard from '../../components/ResultCard';


const NotObligated = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  return (
    <ResultCard
      title="No tienes nada que declarar"
      mainMessage={
        <p className="text-green-600 text-lg font-semibold">
          ¡Enhorabuena! Según tus respuestas, NO tienes obligación de presentar la declaración de la Renta 2025 (según normativa a {formattedDate})
        </p>
      }
      additionalContent={
        <div>
          <div className="bg-blue-50 border-l-4 border-blue-300 p-5 rounded-r-lg text-left">
            <p className="text-blue-700 font-semibold mb-2 text-lg">💡 Consejo</p>
            <p className="text-gray-700">
              Aunque no tengas obligación, puedes querer presentarla si te sale a devolver. Pero ojo: si la presentas, tus ascendientes podrían perder deducciones por ti, lo cual puede perjudicarte. Compara ambos escenarios antes de decidir en el{' '}
              <a 
                href="https://www2.agenciatributaria.gob.es/wlpl/AVAC-CALC/AsistenteIRPF" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold"
              >
                simulador de la Agencia Tributaria
              </a>.
            </p>
          </div>
        
        </div>
      }
      type="success"
      actionText="Comenzar nueva consulta"
      isObligated={false}
    />
  );
};
export default NotObligated;
