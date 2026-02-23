import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { FlowProvider } from "./context/FlowContext";

// Componente que muestra el logo pequeño en todas las páginas menos la home
const GlobalLogo = () => {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return (
    <div style={{ position: 'fixed', top: 8, left: 8, zIndex: 9999 }}>
      <a href="https://www.algoquedeclarar.es">
        <img
          src="/logo.png"
          alt="AQD Logo"
          style={{
            height: 'clamp(32px, 5vw, 48px)',
            width: 'auto',
          }}
        />
      </a>
    </div>
  );
};

const ProtectedRoute = ({ element }) => {
  const termsAccepted = localStorage.getItem('terms_accepted') === 'true';
  const adConsent = localStorage.getItem('ad_consent') !== null;
if (!termsAccepted || !adConsent) return <Navigate to="/ad-consent" replace />;
  return element;
};
// Importar páginas
import Home from "./pages/Home";
import BeforeStartPage from "./pages/BeforeStartPage";

import AdConsentPage from "./pages/AdConsentPage";
import ConsentPage from "./pages/ConsentPage";
import QuestionDeclarationType from "./pages/QuestionDeclarationType";
import Question1 from "./pages/Question1";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import Question4A from "./pages/Question4A";
import Question5A from "./pages/Question5A";
import Question4B from "./pages/Question4B";
import Question5B from "./pages/Question5B";
import Question6 from "./pages/Question6";
import Question7 from "./pages/Question7";
import Question8 from "./pages/Question8";
import Question9 from "./pages/Question9";
import Question10 from "./pages/Question10";
import Question11 from "./pages/Question11";
import Question12 from "./pages/Question12";
import Question13 from "./pages/Question13";
import Question14 from "./pages/Question14";

// Importar preguntas específicas de Navarra
import QuestionNavarra2 from "./pages/navarra/QuestionNavarra2";
import QuestionNavarra3 from "./pages/navarra/QuestionNavarra3";
import QuestionNavarra4 from "./pages/navarra/QuestionNavarra4";
import QuestionNavarra5 from "./pages/navarra/QuestionNavarra5";

// Importar preguntas específicas del País Vasco
import BasqueTerritoryByTime from "./pages/basque/BasqueTerritoryByTime";
import BasqueTerritoryByEconomic from "./pages/basque/BasqueTerritoryByEconomic";
import QuestionBasque1 from "./pages/basque/QuestionBasque1";
import QuestionBasque2 from "./pages/basque/QuestionBasque2";
import QuestionBasque3 from './pages/basque/QuestionBasque3';

// Importar páginas de salario compartidas
import SalaryCheck from "./pages/SalaryCheck";
import SalaryPaymentsQuestion from "./pages/SalaryPaymentsQuestion";

// Importar calculadoras y RetentionVariable - Territorio Común
import SalaryCalculatorCommon12 from "./pages/common/SalaryCalculatorCommon12";
import SalaryCalculatorCommon14 from "./pages/common/SalaryCalculatorCommon14";
import SalaryCalculatorCommon15 from "./pages/common/SalaryCalculatorCommon15";
import SalaryResultCommon from "./pages/common/SalaryResultCommon";
import RetentionVariableQuestionCommon from "./pages/common/RetentionVariableQuestionCommon";

// Importar calculadoras y RetentionVariable - Navarra
import SalaryCalculatorNavarra12 from "./pages/navarra/salary/SalaryCalculatorNavarra12";
import SalaryCalculatorNavarra14 from "./pages/navarra/salary/SalaryCalculatorNavarra14";
import SalaryCalculatorNavarra15 from "./pages/navarra/salary/SalaryCalculatorNavarra15";
import SalaryResultNavarra from "./pages/navarra/salary/SalaryResultNavarra";
import RetentionVariableQuestionNavarra from "./pages/navarra/salary/RetentionVariableQuestionNavarra";

// Importar calculadoras y RetentionVariable - Bizkaia
import SalaryCalculatorBizkaia12 from "./pages/bizkaia/SalaryCalculatorBizkaia12";
import SalaryCalculatorBizkaia14 from "./pages/bizkaia/SalaryCalculatorBizkaia14";
import SalaryCalculatorBizkaia15 from "./pages/bizkaia/SalaryCalculatorBizkaia15";
import SalaryResultBizkaia from "./pages/bizkaia/SalaryResultBizkaia";
import RetentionVariableQuestionBizkaia from "./pages/bizkaia/RetentionVariableQuestionBizkaia";

// Importar calculadoras y RetentionVariable - Gipuzkoa
import SalaryCalculatorGipuzkoa12 from "./pages/gipuzkoa/SalaryCalculatorGipuzkoa12";
import SalaryCalculatorGipuzkoa14 from "./pages/gipuzkoa/SalaryCalculatorGipuzkoa14";
import SalaryCalculatorGipuzkoa15 from "./pages/gipuzkoa/SalaryCalculatorGipuzkoa15";
import SalaryResultGipuzkoa from "./pages/gipuzkoa/SalaryResultGipuzkoa";
import RetentionVariableQuestionGipuzkoa from "./pages/gipuzkoa/RetentionVariableQuestionGipuzkoa";

// Importar calculadoras y RetentionVariable - Álava
import SalaryCalculatorAlava12 from "./pages/alava/SalaryCalculatorAlava12";
import SalaryCalculatorAlava14 from "./pages/alava/SalaryCalculatorAlava14";
import SalaryCalculatorAlava15 from "./pages/alava/SalaryCalculatorAlava15";
import SalaryResultAlava from "./pages/alava/SalaryResultAlava";
import RetentionVariableQuestionAlava from "./pages/alava/RetentionVariableQuestionAlava";

// Importar páginas de resultados
import NotResident from "./pages/results/NotResident";
import BasqueTerritory from "./pages/results/BasqueTerritory";
import Navarra from "./pages/results/Navarra";
import Obligated from "./pages/results/Obligated";
import NotObligated from "./pages/results/NotObligated";
import NavarraObligated from "./pages/results/NavarraObligated";
import BizkaiaTerritoryResult from "./pages/results/BizkaiaTerritoryResult";
import GipuzkoaTerritoryResult from "./pages/results/GipuzkoaTerritoryResult";
import AlavaTerritoryResult from "./pages/results/AlavaTerritoryResult";
import WorkingOnIt from "./pages/results/WorkingOnIt";
import BizkaiaObligated from "./pages/results/BizkaiaObligated";
import GipuzkoaObligated from "./pages/results/GipuzkoaObligated";
import AlavaObligated from "./pages/results/AlavaObligated";
import BizkaiaNotObligated from "./pages/results/BizkaiaNotObligated";
import GipuzkoaNotObligated from "./pages/results/GipuzkoaNotObligated";
import AlavaNotObligated from "./pages/results/AlavaNotObligated";
import NavarraNotObligated from "./pages/results/NavarraNotObligated";

// Importar componente de footer
import SuggestionFooter from "./components/SuggestionFooter";

function App() {
  return (
    <div className="App">
      <FlowProvider>
        <BrowserRouter>
          <GlobalLogo />
          <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/before-start" element={<BeforeStartPage />} />

  <Route path="/ad-consent" element={<AdConsentPage />} />
  <Route path="/consent" element={<ConsentPage />} />
  <Route path="/question/declaration-type" element={<ProtectedRoute element={<QuestionDeclarationType />} />} />

  <Route path="/question/1" element={<ProtectedRoute element={<Question1 />} />} />
  <Route path="/question/2" element={<ProtectedRoute element={<Question2 />} />} />
  <Route path="/question/3" element={<ProtectedRoute element={<Question3 />} />} />
  <Route path="/question/4a" element={<ProtectedRoute element={<Question4A />} />} />
  <Route path="/question/5a" element={<ProtectedRoute element={<Question5A />} />} />
  <Route path="/question/4b" element={<ProtectedRoute element={<Question4B />} />} />
  <Route path="/question/5b" element={<ProtectedRoute element={<Question5B />} />} />
  <Route path="/question/6" element={<ProtectedRoute element={<Question6 />} />} />
  <Route path="/question/7" element={<ProtectedRoute element={<Question7 />} />} />
  <Route path="/question/8" element={<ProtectedRoute element={<Question8 />} />} />
  <Route path="/question/9" element={<ProtectedRoute element={<Question9 />} />} />
  <Route path="/question/10" element={<ProtectedRoute element={<Question10 />} />} />
  <Route path="/question/11" element={<ProtectedRoute element={<Question11 />} />} />
  <Route path="/question/12" element={<ProtectedRoute element={<Question12 />} />} />
  <Route path="/question/13" element={<ProtectedRoute element={<Question13 />} />} />
  <Route path="/question/14" element={<ProtectedRoute element={<Question14 />} />} />

  <Route path="/question/navarra/2" element={<ProtectedRoute element={<QuestionNavarra2 />} />} />
  <Route path="/question/navarra/3" element={<ProtectedRoute element={<QuestionNavarra3 />} />} />
  <Route path="/question/navarra/4" element={<ProtectedRoute element={<QuestionNavarra4 />} />} />
  <Route path="/question/navarra/5" element={<ProtectedRoute element={<QuestionNavarra5 />} />} />

  <Route path="/question/basque/territory-by-time" element={<ProtectedRoute element={<BasqueTerritoryByTime />} />} />
  <Route path="/question/basque/territory-by-economic" element={<ProtectedRoute element={<BasqueTerritoryByEconomic />} />} />
  <Route path="/question/basque/1" element={<ProtectedRoute element={<QuestionBasque1 />} />} />
  <Route path="/question/basque/2" element={<ProtectedRoute element={<QuestionBasque2 />} />} />
  <Route path="/question/basque/3" element={<ProtectedRoute element={<QuestionBasque3 />} />} />

  <Route path="/salary/check" element={<ProtectedRoute element={<SalaryCheck />} />} />
  <Route path="/salary/payments-question" element={<ProtectedRoute element={<SalaryPaymentsQuestion />} />} />

  <Route path="/salary/common/retention-variable" element={<ProtectedRoute element={<RetentionVariableQuestionCommon />} />} />
  <Route path="/salary/common/calculator-12" element={<ProtectedRoute element={<SalaryCalculatorCommon12 />} />} />
  <Route path="/salary/common/calculator-14" element={<ProtectedRoute element={<SalaryCalculatorCommon14 />} />} />
  <Route path="/salary/common/calculator-15" element={<ProtectedRoute element={<SalaryCalculatorCommon15 />} />} />
  <Route path="/salary/common/result" element={<ProtectedRoute element={<SalaryResultCommon />} />} />

  <Route path="/salary/navarra/retention-variable" element={<ProtectedRoute element={<RetentionVariableQuestionNavarra />} />} />
  <Route path="/salary/navarra/calculator-12" element={<ProtectedRoute element={<SalaryCalculatorNavarra12 />} />} />
  <Route path="/salary/navarra/calculator-14" element={<ProtectedRoute element={<SalaryCalculatorNavarra14 />} />} />
  <Route path="/salary/navarra/calculator-15" element={<ProtectedRoute element={<SalaryCalculatorNavarra15 />} />} />
  <Route path="/salary/navarra/result" element={<ProtectedRoute element={<SalaryResultNavarra />} />} />

  <Route path="/salary/bizkaia/retention-variable" element={<ProtectedRoute element={<RetentionVariableQuestionBizkaia />} />} />
  <Route path="/salary/bizkaia/calculator-12" element={<ProtectedRoute element={<SalaryCalculatorBizkaia12 />} />} />
  <Route path="/salary/bizkaia/calculator-14" element={<ProtectedRoute element={<SalaryCalculatorBizkaia14 />} />} />
  <Route path="/salary/bizkaia/calculator-15" element={<ProtectedRoute element={<SalaryCalculatorBizkaia15 />} />} />
  <Route path="/salary/bizkaia/result" element={<ProtectedRoute element={<SalaryResultBizkaia />} />} />

  <Route path="/salary/gipuzkoa/retention-variable" element={<ProtectedRoute element={<RetentionVariableQuestionGipuzkoa />} />} />
  <Route path="/salary/gipuzkoa/calculator-12" element={<ProtectedRoute element={<SalaryCalculatorGipuzkoa12 />} />} />
  <Route path="/salary/gipuzkoa/calculator-14" element={<ProtectedRoute element={<SalaryCalculatorGipuzkoa14 />} />} />
  <Route path="/salary/gipuzkoa/calculator-15" element={<ProtectedRoute element={<SalaryCalculatorGipuzkoa15 />} />} />
  <Route path="/salary/gipuzkoa/result" element={<ProtectedRoute element={<SalaryResultGipuzkoa />} />} />

  <Route path="/salary/alava/retention-variable" element={<ProtectedRoute element={<RetentionVariableQuestionAlava />} />} />
  <Route path="/salary/alava/calculator-12" element={<ProtectedRoute element={<SalaryCalculatorAlava12 />} />} />
  <Route path="/salary/alava/calculator-14" element={<ProtectedRoute element={<SalaryCalculatorAlava14 />} />} />
  <Route path="/salary/alava/calculator-15" element={<ProtectedRoute element={<SalaryCalculatorAlava15 />} />} />
  <Route path="/salary/alava/result" element={<ProtectedRoute element={<SalaryResultAlava />} />} />

  <Route path="/result/not-resident" element={<ProtectedRoute element={<NotResident />} />} />
  <Route path="/result/basque" element={<ProtectedRoute element={<BasqueTerritory />} />} />
  <Route path="/result/navarra" element={<ProtectedRoute element={<Navarra />} />} />
  <Route path="/result/obligated" element={<ProtectedRoute element={<Obligated />} />} />
  <Route path="/result/not-obligated" element={<ProtectedRoute element={<NotObligated />} />} />
  <Route path="/result/navarra-obligated" element={<ProtectedRoute element={<NavarraObligated />} />} />
  <Route path="/result/basque-bizkaia" element={<ProtectedRoute element={<BizkaiaTerritoryResult />} />} />
  <Route path="/result/basque-gipuzkoa" element={<ProtectedRoute element={<GipuzkoaTerritoryResult />} />} />
  <Route path="/result/basque-alava" element={<ProtectedRoute element={<AlavaTerritoryResult />} />} />
  <Route path="/result/working-on-it" element={<ProtectedRoute element={<WorkingOnIt />} />} />
  <Route path="/result/bizkaia-obligated" element={<ProtectedRoute element={<BizkaiaObligated />} />} />
  <Route path="/result/gipuzkoa-obligated" element={<ProtectedRoute element={<GipuzkoaObligated />} />} />
  <Route path="/result/alava-obligated" element={<ProtectedRoute element={<AlavaObligated />} />} />
  <Route path="/result/bizkaia-not-obligated" element={<ProtectedRoute element={<BizkaiaNotObligated />} />} />
  <Route path="/result/gipuzkoa-not-obligated" element={<ProtectedRoute element={<GipuzkoaNotObligated />} />} />
  <Route path="/result/alava-not-obligated" element={<ProtectedRoute element={<AlavaNotObligated />} />} />
  <Route path="/result/navarra-not-obligated" element={<ProtectedRoute element={<NavarraNotObligated />} />} />
</Routes>
          <SuggestionFooter />
        </BrowserRouter>
      </FlowProvider>
    </div>
  );
}

export default App;
