# ¿Algo Que Declarar? - Product Requirements Document

## Original Problem Statement
Build a web application based on a flowchart that guides users through a series of questions to determine their tax residency and declaration obligations in Spain. The application should present each question on a separate screen.

## Core Requirements
1. **Flowchart Logic**: Implement the detailed question-and-answer flow to determine tax status (residente/no residente, territorio común, Navarra, País Vasco) and declaration obligations.
2. **UI/Design**:
   - Color palette: Blue (#1976D2), Green (#43A047), light blues/greens, grays
   - "Siguiente" (Next) and "Anterior" (Previous) buttons
   - No progress bar needed
   - Final result screen
   - Application name: "¿Algo Que Declarar?"
3. **Data Handling**:
   - Ask for user's year of birth on consent page
   - Backend saves user session data (answers, results, year of birth) for analytics
4. **Consent and Legal**:
   - Consent screen with disclaimer (informational purposes only)
   - Notice about anonymous data usage for commercial purposes
5. **Declaration Type**: Preliminary question for "individual" or "conjunta" (joint leads to "working on it" page)

## Implemented Features (Jan 2026)

### Core Application ✅
- [x] Home page with app introduction
- [x] Consent page with year of birth collection and terms acceptance
- [x] Declaration type selection (Individual/Conjunta)
- [x] Multi-branch question flow for Territorio Común, Navarra, and País Vasco

### Territorio Común Flow ✅
- [x] Questions 1-14 for determining tax obligations
- [x] Help popups with detailed explanations
- [x] Result pages (Obligated/Not Obligated)

### Navarra Flow ✅
- [x] Specific question flow (Questions Navarra 2-5)
- [x] NavarraObligated result page with Hacienda Foral de Navarra reference

### País Vasco Flow ✅
- [x] Territory determination by time or economic criteria
- [x] Separate flows for Bizkaia, Gipuzkoa, and Álava
- [x] Simplified question path for Basque territories (skips common questions)
- [x] Specific result pages referencing correct local Hacienda Foral
- [x] Interactive help text for Álava

### Backend ✅
- [x] FastAPI server with MongoDB integration
- [x] POST /api/user-session - Create session
- [x] PUT /api/user-session/{id} - Update session with answers
- [x] GET /api/analytics/sessions - Retrieve anonymized data

## Pending Items

### P1 - Awaiting User Input
- [ ] Complete specific tax obligation questions for Basque territories (Bizkaia, Gipuzkoa, Álava) - User reviewing regulations

### P2 - To Be Completed
- [ ] Fill placeholder hyperlinks (`pdte.`) with actual URLs
- [ ] Joint declaration flow (currently shows "working on it")

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS, React Context API
- **Backend**: FastAPI, MongoDB
- **Database Schema**: `{ _id: UUID, birth_year: int, answers: dict, result: str, flowPath: str, createdAt, updatedAt }`

## File Structure
```
/app
├── backend/
│   └── server.py
└── frontend/
    └── src/
        ├── App.js (routing)
        ├── context/FlowContext.js (global state)
        ├── pages/
        │   ├── Home.js, ConsentPage.js, QuestionDeclarationType.js
        │   ├── Question[1-14].js
        │   ├── navarra/QuestionNavarra[2-5].js
        │   ├── basque/QuestionBasque1.js, BasqueTerritoryBy*.js
        │   └── results/*.js
        └── components/
```

## Important Notes
- Each Basque territory has its own specific foral regulation (not "régimen foral vasco")
- Basque result pages must reference Hacienda Foral, NOT AEAT
- User prefers Spanish language for all communications
