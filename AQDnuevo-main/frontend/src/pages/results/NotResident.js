import React from 'react';
import ResultCard from '../../components/ResultCard';

const NotResident = () => {
  return (
    <ResultCard
      title="No eres contribuyente IRPF en España"
      description={`Según tus respuestas, no cumples los criterios para ser considerado residente fiscal en España para efectos del IRPF.

Esto significa que no tienes obligación de presentar la declaración de la Renta en España, salvo casos excepcionales no cubiertos por esta aplicación.

Si tienes dudas o tu situación es compleja, te recomendamos consultar con un asesor fiscal o la propia Agencia Tributaria.`}
      type="info"
      actionText="Comenzar nueva consulta"
    />
  );
};

export default NotResident;