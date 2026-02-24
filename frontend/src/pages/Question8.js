import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useFlow } from '../context/FlowContext';

const Question8 = () => {
  const navigate = useNavigate();
  const { setAnswer, setFlowPath } = useFlow();

  const handleNext = async (answer) => {
    setAnswer('q8', answer);
    
    if (answer === 'yes') {
      navigate('/result/obligated');
    } else {
      await setFlowPath('commonTerritory');
      navigate('/question/8bis');
    }
  };

  const handlePrevious = () => {
    navigate('/question/7');
  };

  return (
    <QuestionCard
      questionId="q8"
      title="¿En cualquier momento del período impositivo has estado de alta, como trabajador por cuenta propia, bien en el Régimen Especial de Trabajadores por Cuenta Propia o Autónomos, o bien en el Régimen Especial de la Seguridad Social de los Trabajadores del Mar?"
      options={[
        { value: 'yes', label: 'SÍ' },
        { value: 'no', label: 'NO' }
      ]}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Question8;
