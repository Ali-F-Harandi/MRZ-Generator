# Changelog

All notable changes to this project will be documented in this file.

## [0.1.11] - 2024-05-20

### Fixed
- **GitHub Pages 404 Error**: Added `base: '/MRZ-Generator/'` to `vite.config.ts`. This fixes the issue where scripts and styles were trying to load from the root domain instead of the repository subfolder.

## [0.1.10] - 2024-05-20

### Fixed
- **Deployment**: Reverted to **Incremental Strategy**. The script no longer deletes `.git` on every run.
- **Git Flow**: Now only commits and pushes files that have physically changed on the disk.

## [0.1.9] - 2024-05-20

### Fixed
- **Deployment Strategy**: Switched to a **Hybrid Strategy**.
  - Uses `rmdir .git` (Clean Slate) to fix "fetch first" errors.
  - Uses `git push --force` to ensure synchronization.
  - Preserves `commit.txt` support for custom messages.

## [0.1.8] - 2024-05-20

### Fixed
- **Build Error**: Added `@types/node` to `devDependencies` to resolve `TS2688: Cannot find type definition file for 'node'`.

## [0.1.7] - 2024-05-20

### Fixed
- **Deployment Script**: Completely refactored `deploy.txt` to support **Incremental Pushes**. It no longer deletes the `.git` folder.
- **Commit Messages**: Script now correctly reads from `commit.txt` if it exists.

## [0.1.6] - 2024-05-20

### Fixed
- **CI/CD**: Fixed GitHub Actions failure by switching from `npm ci` to `npm install` and removing the npm cache requirement.

## [0.1.5] - 2024-05-20

### Added
- **Auto-Deploy**: Integrated GitHub API `curl` command to automatically create the repository if it doesn't exist.
- **Force Sync**: Deployment script now resets local git and force pushes to ensure perfect sync with remote.

## [0.1.4] - 2024-05-20

### Fixed
- **Deployment**: Enhanced error messages in `deploy.txt`.

## [0.1.3] - 2024-05-20

### Fixed
- **Critical**: Refactored `deploy.txt` to remove nested code blocks.

## [0.1.0] - 2024-05-20

### Added
- Initial project structure.
- Core MRZ logic and UI.