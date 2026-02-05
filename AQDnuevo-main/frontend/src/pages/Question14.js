import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useFlow } from '../context/FlowContext';

const Question14 = () => {
  const navigate = useNavigate();
  const { setAnswer } = useFlow();

  const helpText = `Pérdidas patrimoniales pueden incluir:
• Pérdidas por venta de acciones, fondos o criptomonedas
• Pérdidas en inversiones
• Pérdidas por transmisión de bienes inmuebles

Estas pérdidas pueden compensar ganancias patrimoniales futuras, por lo que es conveniente declararlas aunque no tengas obligación por otros conceptos.`;

  const handleNext = (answer) => {
    setAnswer('q14', answer);
    
    if (answer === 'yes') {
      navigate('/result/obligated');
    } else {
      navigate('/result/not-obligated');
    }
  };

  const handlePrevious = () => {
    const { answers } = useFlow();
    // Si en la pregunta 12 respondió SÍ, viene de la 13
    // Si respondió NO, viene directamente de la 12
    if (answers.q12 === 'yes') {
      navigate('/question/13');
    } else {
      navigate('/question/12');
    }
  };

  return (
    <QuestionCard
      questionId="q14"
      title="¿Junto con las rentas no sometidas a retención o ingreso a cuenta, tienes pérdidas patrimoniales de 500 euros o más?"
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

export default Question14;