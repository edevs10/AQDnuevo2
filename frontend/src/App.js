import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FlowProvider } from "./context/FlowContext";

// Importar páginas
import Home from "./pages/Home";
import TermsConsentPage from "./pages/TermsConsentPage";
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

// Importar páginas de salario compartidas
import SalaryCheck from "./pages/SalaryCheck";
import SalaryPaymentsQuestion from "./pages/SalaryPaymentsQuestion";
import RetentionVariableQuestion from "./pages/RetentionVariableQuestion";

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

function App() {
  return (
    <div className="App">
      <FlowProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<TermsConsentPage />} />
            <Route path="/ad-consent" element={<AdConsentPage />} />
            <Route path="/consent" element={<ConsentPage />} />
            <Route path="/question/declaration-type" element={<QuestionDeclarationType />} />
            
            {/* Rutas de preguntas */}
            <Route path="/question/1" element={<Question1 />} />
            <Route path="/question/2" element={<Question2 />} />
            <Route path="/question/3" element={<Question3 />} />
            <Route path="/question/4a" element={<Question4A />} />
            <Route path="/question/5a" element={<Question5A />} />
            <Route path="/question/4b" element={<Question4B />} />
            <Route path="/question/5b" element={<Question5B />} />
            <Route path="/question/6" element={<Question6 />} />
            <Route path="/question/7" element={<Question7 />} />
            <Route path="/question/8" element={<Question8 />} />
            <Route path="/question/9" element={<Question9 />} />
            <Route path="/question/10" element={<Question10 />} />
            <Route path="/question/11" element={<Question11 />} />
            <Route path="/question/12" element={<Question12 />} />
            <Route path="/question/13" element={<Question13 />} />
            <Route path="/question/14" element={<Question14 />} />
            
            {/* Rutas específicas de Navarra */}
            <Route path="/question/navarra/2" element={<QuestionNavarra2 />} />
            <Route path="/question/navarra/3" element={<QuestionNavarra3 />} />
            <Route path="/question/navarra/4" element={<QuestionNavarra4 />} />
            <Route path="/question/navarra/5" element={<QuestionNavarra5 />} />
            
            {/* Rutas específicas del País Vasco */}
            <Route path="/question/basque/territory-by-time" element={<BasqueTerritoryByTime />} />
            <Route path="/question/basque/territory-by-economic" element={<BasqueTerritoryByEconomic />} />
            <Route path="/question/basque/1" element={<QuestionBasque1 />} />
            <Route path="/question/basque/2" element={<QuestionBasque2 />} />
            
            {/* Rutas de cálculo de salario - Compartidas */}
            <Route path="/salary/check" element={<SalaryCheck />} />
            <Route path="/salary/payments-question" element={<SalaryPaymentsQuestion />} />
            
            {/* Rutas de cálculo de salario - Territorio Común */}
            <Route path="/salary/common/retention-variable" element={<RetentionVariableQuestionCommon />} />
            <Route path="/salary/common/calculator-12" element={<SalaryCalculatorCommon12 />} />
            <Route path="/salary/common/calculator-14" element={<SalaryCalculatorCommon14 />} />
            <Route path="/salary/common/calculator-15" element={<SalaryCalculatorCommon15 />} />
            <Route path="/salary/common/result" element={<SalaryResultCommon />} />
            
            {/* Rutas de cálculo de salario - Navarra */}
            <Route path="/salary/navarra/retention-variable" element={<RetentionVariableQuestionNavarra />} />
            <Route path="/salary/navarra/calculator-12" element={<SalaryCalculatorNavarra12 />} />
            <Route path="/salary/navarra/calculator-14" element={<SalaryCalculatorNavarra14 />} />
            <Route path="/salary/navarra/calculator-15" element={<SalaryCalculatorNavarra15 />} />
            <Route path="/salary/navarra/result" element={<SalaryResultNavarra />} />
            
            {/* Rutas de cálculo de salario - Bizkaia */}
            <Route path="/salary/bizkaia/retention-variable" element={<RetentionVariableQuestionBizkaia />} />
            <Route path="/salary/bizkaia/calculator-12" element={<SalaryCalculatorBizkaia12 />} />
            <Route path="/salary/bizkaia/calculator-14" element={<SalaryCalculatorBizkaia14 />} />
            <Route path="/salary/bizkaia/calculator-15" element={<SalaryCalculatorBizkaia15 />} />
            <Route path="/salary/bizkaia/result" element={<SalaryResultBizkaia />} />
            
            {/* Rutas de cálculo de salario - Gipuzkoa */}
            <Route path="/salary/gipuzkoa/retention-variable" element={<RetentionVariableQuestionGipuzkoa />} />
            <Route path="/salary/gipuzkoa/calculator-12" element={<SalaryCalculatorGipuzkoa12 />} />
            <Route path="/salary/gipuzkoa/calculator-14" element={<SalaryCalculatorGipuzkoa14 />} />
            <Route path="/salary/gipuzkoa/calculator-15" element={<SalaryCalculatorGipuzkoa15 />} />
            <Route path="/salary/gipuzkoa/result" element={<SalaryResultGipuzkoa />} />
            
            {/* Rutas de cálculo de salario - Álava */}
            <Route path="/salary/alava/retention-variable" element={<RetentionVariableQuestionAlava />} />
            <Route path="/salary/alava/calculator-12" element={<SalaryCalculatorAlava12 />} />
            <Route path="/salary/alava/calculator-14" element={<SalaryCalculatorAlava14 />} />
            <Route path="/salary/alava/calculator-15" element={<SalaryCalculatorAlava15 />} />
            <Route path="/salary/alava/result" element={<SalaryResultAlava />} />
            
            {/* Rutas de resultados */}
            <Route path="/result/not-resident" element={<NotResident />} />
            <Route path="/result/basque" element={<BasqueTerritory />} />
            <Route path="/result/navarra" element={<Navarra />} />
            <Route path="/result/obligated" element={<Obligated />} />
            <Route path="/result/not-obligated" element={<NotObligated />} />
            <Route path="/result/navarra-obligated" element={<NavarraObligated />} />
            <Route path="/result/basque-bizkaia" element={<BizkaiaTerritoryResult />} />
            <Route path="/result/basque-gipuzkoa" element={<GipuzkoaTerritoryResult />} />
            <Route path="/result/basque-alava" element={<AlavaTerritoryResult />} />
            <Route path="/result/working-on-it" element={<WorkingOnIt />} />
            <Route path="/result/bizkaia-obligated" element={<BizkaiaObligated />} />
            <Route path="/result/gipuzkoa-obligated" element={<GipuzkoaObligated />} />
            <Route path="/result/alava-obligated" element={<AlavaObligated />} />
            <Route path="/result/bizkaia-not-obligated" element={<BizkaiaNotObligated />} />
            <Route path="/result/gipuzkoa-not-obligated" element={<GipuzkoaNotObligated />} />
            <Route path="/result/alava-not-obligated" element={<AlavaNotObligated />} />
            <Route path="/result/navarra-not-obligated" element={<NavarraNotObligated />} />
          </Routes>
        </BrowserRouter>
      </FlowProvider>
    </div>
  );
}

export default App;
