import React from 'react';
import ResultCard from '../../components/ResultCard';

const BasqueTerritory = () => {
  return (
    <ResultCard
      title="Eres contribuyente IRPF del País Vasco"
      description={`Según tus respuestas, eres residente fiscal del País Vasco.

Tu obligación tributaria corresponde a:
• Hacienda Foral de tu territorio histórico (Bizkaia, Gipuzkoa o Álava)
• Normativa fiscal foral específica
• Declaraciones y pagos a través de las respectivas Diputaciones Forales

Es importante especificar en qué territorio histórico tienes la residencia para aplicar la normativa correspondiente.

Te recomendamos contactar con la Hacienda Foral de tu territorio para obtener información específica sobre tus obligaciones fiscales.`}
      type="success"
      actionText="Comenzar nueva consulta"
    />
  );
};

export default BasqueTerritory;