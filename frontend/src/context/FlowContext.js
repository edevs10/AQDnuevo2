import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Estados posibles para cada pregunta
const initialState = {
  sessionId: null,
  currentStep: 1,
  answers: {},
  flowPath: 'initial', // 'initial', 'timeResident', 'economicResident', 'commonTerritory'
  isCompleted: false,
  result: null
};

// Actions para el reducer
const FlowActionTypes = {
  SET_SESSION_ID: 'SET_SESSION_ID',
  SET_ANSWER: 'SET_ANSWER',
  NEXT_STEP: 'NEXT_STEP',
  PREVIOUS_STEP: 'PREVIOUS_STEP',
  SET_STEP: 'SET_STEP', 
  SET_FLOW_PATH: 'SET_FLOW_PATH',
  SET_RESULT: 'SET_RESULT',
  RESET_FLOW: 'RESET_FLOW'
};

// Reducer para manejar el estado del flujo
function flowReducer(state, action) {
  switch (action.type) {
    case FlowActionTypes.SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.sessionId
      };

    case FlowActionTypes.SET_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer
        }
      };
    
    case FlowActionTypes.NEXT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1
      };
    
    case FlowActionTypes.PREVIOUS_STEP:
      return {
        ...state,
        currentStep: Math.max(1, state.currentStep - 1)
      };
    
    case FlowActionTypes.SET_STEP:
      return {
        ...state,
        currentStep: action.step
      };
    
    case FlowActionTypes.SET_FLOW_PATH:
      return {
        ...state,
        flowPath: action.path
      };
    
    case FlowActionTypes.SET_RESULT:
      return {
        ...state,
        result: action.result,
        isCompleted: true
      };
    
    case FlowActionTypes.RESET_FLOW:
      return initialState;
    
    default:
      return state;
  }
}

// Crear contexto
const FlowContext = createContext();

// Hook personalizado para usar el contexto
export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow debe ser usado dentro de FlowProvider');
  }
  return context;
};

// Provider del contexto
export const FlowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(flowReducer, initialState);

  // Crear sesión de usuario
  const createSession = async (birthYear, consentGiven) => {
    try {
      const response = await axios.post(`${API}/user-session`, {
        birth_year: birthYear,
        consent_given: consentGiven
      });
      
      dispatch({
        type: FlowActionTypes.SET_SESSION_ID,
        sessionId: response.data.id
      });
      
      return response.data.id;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  };

  // Actualizar sesión en el backend
  const updateSession = async (updates) => {
    if (!state.sessionId) return;
    
    try {
      await axios.put(`${API}/user-session/${state.sessionId}`, updates);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  // Funciones helper para las acciones
  const setAnswer = async (questionId, answer) => {
    dispatch({
      type: FlowActionTypes.SET_ANSWER,
      questionId,
      answer
    });

    // Actualizar en el backend
    const updatedAnswers = {
      ...state.answers,
      [questionId]: answer
    };
    
    await updateSession({ answers: updatedAnswers });
  };

  const nextStep = () => {
    dispatch({ type: FlowActionTypes.NEXT_STEP });
  };

  const previousStep = () => {
    dispatch({ type: FlowActionTypes.PREVIOUS_STEP });
  };

  const setStep = (step) => {
    dispatch({ 
      type: FlowActionTypes.SET_STEP, 
      step 
    });
  };

  const setFlowPath = async (path) => {
    dispatch({
      type: FlowActionTypes.SET_FLOW_PATH,
      path
    });

    // Actualizar en el backend
    await updateSession({ flow_path: path });
  };

  const setResult = async (result) => {
    dispatch({
      type: FlowActionTypes.SET_RESULT,
      result
    });

    // Actualizar en el backend
    await updateSession({ 
      result: result,
      completed: true 
    });
  };

  const resetFlow = () => {
    dispatch({ type: FlowActionTypes.RESET_FLOW });
  };

  // Función para determinar el siguiente paso basado en la lógica del flujo
  const getNextStep = (currentStep, answers) => {
    switch (currentStep) {
      case 1:
        return answers.q1 === 'yes' ? 'result_resident' : 2;
      
      case 2:
        return answers.q2 === 'yes' ? '4b' : 3;
      
      case 3:
        return answers.q3 === 'yes' ? '4a' : 'result_not_resident';
      
      case '4a':
        return answers.q4a === 'yes' ? 'result_basque' : '5a';
      
      case '5a':
        return answers.q5a === 'yes' ? 'result_navarra' : 6;
      
      case '4b':
        return answers.q4b === 'yes' ? 'result_basque' : '5b';
      
      case '5b':
        return answers.q5b === 'yes' ? 'result_navarra' : 6;
      
      case 6:
        return 7;
      
      case 7:
        return answers.q7 === 'yes' ? 'result_obligated' : 8;
      
      case 8:
        return answers.q8 === 'yes' ? 'result_obligated' : 9;
      
      case 9:
        return answers.q9 === 'yes' ? 'result_obligated' : 10;
      
      case 10:
        if (answers.q10 === 'no' || answers.q10 === 'none_applies') return 11;
        return 'result_obligated';
      
      case 11:
        return answers.q11 === 'yes' ? 'result_obligated' : 12;
      
      case 12:
        return answers.q12 === 'yes' ? 13 : 14;
      
      case 13:
        return answers.q13 === 'yes' ? 'result_obligated' : 14;
      
      case 14:
        return answers.q14 === 'yes' ? 'result_obligated' : 'result_not_obligated';
      
      default:
        return currentStep + 1;
    }
  };

  const value = {
    ...state,
    createSession,
    setAnswer,
    nextStep,
    previousStep,
    setStep,
    setFlowPath,
    setResult,
    resetFlow,
    getNextStep
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
};