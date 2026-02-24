import React from 'react';
import ResultCard from '../../components/ResultCard';

const AlavaObligated = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  return (
    <ResultCard
      title="Tienes algo que declarar"
      mainMessage={
        <>
          <p className="text-orange-600 text-lg font-semibold mb-4">
            Según tus respuestas, SÍ tienes obligación de presentar la declaración de la Renta 2025 bajo la normativa foral de Álava (según normativa a {formattedDate})
          </p>
          <p className="text-gray-800 font-bold text-lg bg-orange-100 py-3 px-4 rounded-lg inline-block">
            ¡No olvides cumplir con tus obligaciones fiscales!
          </p>
        </>
      }
      additionalContent={
        <div>
          <div className="bg-blue-50 border-l-4 border-blue-300 p-5 rounded-r-lg text-left">
            <p className="text-blue-700 font-semibold mb-3 text-lg">ℹ️ Información adicional</p>
            <p className="text-gray-700 mb-3">
              <strong>Organismo:</strong> Hacienda Foral de Álava
            </p>
            <p className="text-gray-700 font-medium mb-2">Recomendaciones:</p>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li>Reúne toda la documentación necesaria</li>
              <li>Consulta la web oficial de Hacienda Foral de Álava para información específica</li>
            </ul>
          </div>
        </div>
      }
      type="warning"
      actionText="Comenzar nueva consulta"
      isObligated={true}
    />
  );
};
export default AlavaObligated;
