import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useFlow } from '../context/FlowContext';

const Question5B = () => {
  const navigate = useNavigate();
  const { setAnswer, setFlowPath } = useFlow();

  const handleNext = (answer) => {
    setAnswer('q5b', answer);
    
    if (answer === 'yes') {
      navigate('/result/navarra');
    } else {
      setFlowPath('commonTerritory');
      navigate('/question/6');
    }
  };

  const handlePrevious = () => {
    navigate('/question/4b');
  };

  return (
    <QuestionCard
      questionId="q5b"
      title="¿Radica en Navarra el núcleo principal o la base de tus actividades o intereses económicos, de forma directa o indirecta?"
      options={[
        { value: 'yes', label: 'SÍ' },
        { value: 'no', label: 'NO' }
      ]}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Question5B;