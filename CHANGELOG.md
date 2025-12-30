# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - Official Release

### Changed
- **Release**: Promoted to version 1.0.0.
- **Dependencies**: Removed unused dependencies (`lucide-react`) for optimized performance.
- **Documentation**: Updated README and Project Context for public release.
- **Roadmap**: Deferred advanced features (i18n, history) to future versions.

## [0.1.16]

### Added
- **Multiple Document Support**: Added full support for 4 new document types:
  - **ID Cards (TD1)**: 3-line format (30 characters).
  - **ID Cards (TD2)**: 2-line format (36 characters).
  - **Visas (MRV-A)**: 2-line format (44 characters).
  - **Visas (MRV-B)**: 2-line format (36 characters).
- **Core Logic**: Implemented specific MRZ generation and checksum rules for all above types.

## [0.1.15]

### Added
- **Searchable Dropdowns**: Implemented a "Smart Search" component for Country and Nationality selection.
- **Aliases**: Added support for searching countries by alternative names (e.g., "America" -> "USA").
- **UI Optimization**: Reduced MRZ text size to minimize horizontal scrolling.

### Changed
- **Documentation**: Removed dates from changelog.

## [0.1.14]

### Added
- **Country Database**: Added `countries.ts` with a list of nations and ICAO codes.
- **Smart Forms**: Replaced manual text inputs with dropdowns for Country/Nationality selection.
- **Date Pickers**: Added native date pickers for Birth Date and Expiry Date with auto-conversion to MRZ format.

### Changed
- **Layout**: Increased application width (`max-w-7xl`) to prevent scrolling on standard desktop screens.

## [0.1.13]

### Changed
- **Configuration**: Simplified `.gitignore` to strictly exclude deployment scripts (`deploy.bat`, `deploy.txt`) and commit messages (`commit.txt`) along with standard build artifacts.

## [0.1.12]

### Fixed
- **Deployment Paths**: Re-verified `vite.config.ts` settings to ensure assets load from `/MRZ-Generator/assets/` instead of `/assets/`.
- **UI**: Updated version indicator to v0.1.12 to help verify successful deployment.

## [0.1.11]

### Fixed
- **GitHub Pages 404 Error**: Added `base: '/MRZ-Generator/'` to `vite.config.ts`. This fixes the issue where scripts and styles were trying to load from the root domain instead of the repository subfolder.

## [0.1.10]

### Fixed
- **Deployment**: Reverted to **Incremental Strategy**. The script no longer deletes `.git` on every run.
- **Git Flow**: Now only commits and pushes files that have physically changed on the disk.

## [0.1.9]

### Fixed
- **Deployment Strategy**: Switched to a **Hybrid Strategy**.
  - Uses `rmdir .git` (Clean Slate) to fix "fetch first" errors.
  - Uses `git push --force` to ensure synchronization.
  - Preserves `commit.txt` support for custom messages.

## [0.1.8]

### Fixed
- **Build Error**: Added `@types/node` to `devDependencies` to resolve `TS2688: Cannot find type definition file for 'node'`.

## [0.1.7]

### Fixed
- **Deployment Script**: Completely refactored `deploy.txt` to support **Incremental Pushes**. It no longer deletes the `.git` folder.
- **Commit Messages**: Script now correctly reads from `commit.txt` if it exists.

## [0.1.6]

### Fixed
- **CI/CD**: Fixed GitHub Actions failure by switching from `npm ci` to `npm install` and removing the npm cache requirement.

## [0.1.5]

### Added
- **Auto-Deploy**: Integrated GitHub API `curl` command to automatically create the repository if it doesn't exist.
- **Force Sync**: Deployment script now resets local git and force pushes to ensure perfect sync with remote.

## [0.1.4]

### Fixed
- **Deployment**: Enhanced error messages in `deploy.txt`.

## [0.1.3]

### Fixed
- **Critical**: Refactored `deploy.txt` to remove nested code blocks.

## [0.1.0]

### Added
- Initial project structure.
- Core MRZ logic and UI.