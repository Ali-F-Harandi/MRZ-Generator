# MRZ Generator Roadmap

## Phase 1: Initialization & Setup [DONE]
- [x] Create project skeleton (React, TS, Vite)
- [x] Setup Tailwind CSS
- [x] Define Project Context
- [x] Create Deployment Scripts (`deploy.txt` template)
- [x] Create README, CHANGELOG, and Commit templates
- [x] Setup GitHub Actions workflow

## Phase 2: Core MRZ Logic [DONE]
- [x] Implement Modulo 10 calculation utility
- [x] Create Transliteration service (Latin-based char mapping)
- [x] Define TypeScript interfaces for Document Types (TD1, TD2, TD3)
- [x] Implement MRZ generation class/functions for Passport (TD3)
- [x] Implement logic for ID Cards (TD1, TD2) and Visas (MRV-A, MRV-B)

## Phase 3: UI Implementation [DONE]
- [x] Create Input Forms for Personal Data
- [x] Create MRZ Display Component (OCR-B font styling)
- [x] Implement Document Type Selector
- [x] Build Real-time Validation feedback

## Phase 4: Advanced Features [IN_PROGRESS]
- [x] Copy to Clipboard
- [x] Smart Date Pickers
- [x] Country Selection Dropdowns
- [ ] Add Persian Localization (i18n)
- [ ] Implement "Download as Image"
- [ ] History/LocalStorage support

## Phase 5: Polish & Deploy [IN_PROGRESS]
- [x] Layout Responsiveness Improvements
- [ ] Final Accessibility Check
- [ ] Performance Optimization
- [x] Production Deployment (CI/CD Pipeline Fixes)
- [ ] Verify GitHub Pages Live URL