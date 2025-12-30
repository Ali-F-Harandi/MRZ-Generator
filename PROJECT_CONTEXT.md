# Project Context: MRZ Generator

## Overview
MRZ Generator is a React-based web application designed to generate, validate, and visualize Machine Readable Zones (MRZ) for various official documents including Passports (TD3), Visas, and ID Cards (TD1, TD2).

## Tech Stack
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via CDN)
- **Build Tool**: Vite
- **Deployment**: GitHub Pages (Automated via Actions or manual via script)

## Core Features (Planned)
1. **Document Support**:
   - Passport (ICAO 9303 TD3)
   - ID Card (ICAO 9303 TD1)
   - ID Card (ICAO 9303 TD2)
   - Visa (ICAO 9303 MRV-A/B)
2. **Logic**:
   - Automatic Check Digit Calculation (Modulo 10)
   - Transliteration of non-Latin characters
   - Validation of existing MRZ strings
3. **UI/UX**:
   - Live Preview
   - One-click Copy/Download
   - Responsive Design (Mobile First)

## Current Status
- **Phase**: Initialization Complete
- **Version**: 0.1.0
- **State**: Project structure defined, documentation complete, CI/CD pipeline configured.

## Directory Structure
- `src/components`: UI Components
- `src/services`: Core MRZ calculation logic
- `src/utils`: Helper functions
- `src/types`: TypeScript definitions
- `src/locales`: Internationalization
- `deploy.txt`: Deployment script template (rename to .bat to use)
- `commit.txt`: Commit message template