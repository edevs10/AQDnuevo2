import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useFlow } from '../context/FlowContext';

const Question13 = () => {
  const navigate = useNavigate();
  const { setAnswer, flowPath } = useFlow();

  const isBasqueTerritory = flowPath === 'bizkaiaTerritory' || flowPath === 'gipuzkoaTerritory' || flowPath === 'alavaTerritory';

  const handleNext = (answer) => {
    setAnswer('q13', answer);
    
    if (answer === 'yes') {
      // Para territorios vascos, usar páginas específicas
      if (isBasqueTerritory) {
        switch (flowPath) {
          case 'bizkaiaTerritory':
            navigate('/result/bizkaia-obligated');
            break;
          case 'gipuzkoaTerritory':
            navigate('/result/gipuzkoa-obligated');
            break;
          case 'alavaTerritory':
            navigate('/result/alava-obligated');
            break;
          default:
            navigate('/result/obligated');
            break;
        }
      } else {
        navigate('/result/obligated');
      }
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
    navigate('/question/12');
  };

  return (
    <QuestionCard
      questionId="q13"
      title="¿El total de todas estas rentas no sometidas a retención o ingreso a cuenta supera 1.000 € anuales?"
      options={[
        { value: 'yes', label: 'SÍ' },
        { value: 'no', label: 'NO' }
      ]}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Question13;