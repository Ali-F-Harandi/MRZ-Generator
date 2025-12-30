# Developer Notes

## Project Architecture

### Directory Structure
- `src/components`: UI components (keep them small and functional).
- `src/services`: Business logic (MRZ calculation, validation).
- `src/utils`: Pure utility functions.
- `src/hooks`: Custom React hooks.

### State Management
- Use local state (`useState`) for simple forms.
- Use `useContext` if global preferences (like Theme or Language) are needed later.

### Styling
- Use **Tailwind CSS** utility classes.
- Avoid inline styles.
- Keep the design responsive (mobile-first approach).

## MRZ Logic Implementation Guide

### Check Digit Calculation (Modulo 10)
Weighting factors: `7, 3, 1` repeating.
Characters: `0-9`, `A-Z`, `<`.
Values:
- `0-9` = Face value
- `A-Z` = 10-35
- `<` = 0

### Document Types
1. **TD3 (Passport)**: 2 lines, 44 chars each.
2. **TD1 (ID Card)**: 3 lines, 30 chars each.
3. **TD2 (ID Card)**: 2 lines, 36 chars each.

## Deployment
The `deploy.txt` file is a template for a Windows Batch script. Rename it to `.bat` to use it for quick commits and pushes. It automatically reads the version from `package.json`.