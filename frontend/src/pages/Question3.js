import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useFlow } from '../context/FlowContext';

const Question3 = () => {
  const navigate = useNavigate();
  const { setAnswer, setFlowPath } = useFlow();

  const helpText = `Se presume residencia fiscal en España si tu familia inmediata (pareja no separada o menores a tu cargo) vive habitualmente en España, aunque puedas probar lo contrario.`;

  const handleNext = (answer) => {
    setAnswer('q3', answer);
    
    if (answer === 'yes') {
      setFlowPath('timeResident');
      navigate('/question/4a');
    } else {
      navigate('/result/not-resident');
    }
  };

  const handlePrevious = () => {
    navigate('/question/2');
  };

  return (
    <QuestionCard
      questionId="q3"
      title="¿Tu cónyuge no separado legalmente y/o tus hijos menores residen habitualmente en España?"
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

export default Question3;