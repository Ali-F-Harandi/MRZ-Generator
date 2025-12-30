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

## Phase 4: Advanced Features [DONE]
- [x] Copy to Clipboard
- [x] Smart Date Pickers
- [x] Country Selection Dropdowns
- [x] UI/UX Polish for v1.0.0

## Phase 5: Future / Post-v1.0 [DEFERRED]
- [ ] Add Persian Localization (i18n)
- [ ] Implement "Download as Image"
- [ ] History/LocalStorage support
- [ ] Final Accessibility Audit
- [ ] Performance Optimization (Bundle Analysis)

## Phase 6: Maintenance [IN_PROGRESS]
- [x] Production Deployment (GitHub Pages)
- [ ] Periodic Updates