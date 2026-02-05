import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useFlow } from '../context/FlowContext';

const Question12 = () => {
  const navigate = useNavigate();
  const { setAnswer, flowPath } = useFlow();

  const helpText = `Ejemplos de rentas NO sujetas a retención:
• Alquileres de inmuebles a particulares
• Ventas de bienes particulares (coches, joyas, etc.)
• Trabajo freelance/autónomo sin retención
• Ganancias de criptomonedas
• Actividades económicas sin retención
• Premios de loterías de otros países`;

  const isBasqueTerritory = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';

  const handleNext = (answer) => {
    setAnswer('q12', answer);
    
    if (answer === 'yes') {
      navigate('/question/13');
    } else {
      // Redirigir según el territorio
      if (flowPath === 'bizkaiaTerritory') {
        navigate('/result/bizkaia-not-obligated');
      } else if (flowPath === 'gipuzkoaTerritory') {
        navigate('/result/gipuzkoa-not-obligated');
      } else if (flowPath === 'alavaTerritory') {
        navigate('/result/alava-not-obligated');
      } else {
        navigate('/question/14');
      }
    }
  };

  const handlePrevious = () => {
    navigate('/question/11');
  };

  return (
    <QuestionCard
      questionId="q12"
      title="¿En 2025 has obtenido rendimientos del trabajo, de capital (mobiliario e inmobiliario), actividades económicas o ganancias patrimoniales NO sujetos a retención o ingreso a cuenta?"
      options={[
        { value: 'yes', label: 'SÍ' },
        { value: 'no', label: 'NO' }
      ]}
      helpText={helpText}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Question12;