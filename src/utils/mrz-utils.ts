// Weighting factors for check digit calculation: 7, 3, 1 repeating
const WEIGHTS = [7, 3, 1];

const CHAR_VALUES: Record<string, number> = {
  '<': 0, '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19,
  'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24, 'P': 25, 'Q': 26, 'R': 27, 'S': 28, 'T': 29,
  'U': 30, 'V': 31, 'W': 32, 'X': 33, 'Y': 34, 'Z': 35
};

/**
 * Calculates the check digit for a given string using ICAO 9303 Modulo 10 algorithm.
 */
export const calculateCheckDigit = (input: string): string => {
  const upperInput = input.toUpperCase();
  let sum = 0;
  
  for (let i = 0; i < upperInput.length; i++) {
    const char = upperInput[i];
    const value = CHAR_VALUES[char];
    
    // If char is invalid (not in map), treat as 0 or throw error? 
    // ICAO says treat non-specified as 0, but usually input is sanitized first.
    if (value === undefined) continue;

    const weight = WEIGHTS[i % 3];
    sum += value * weight;
  }
  
  return (sum % 10).toString();
};

/**
 * Basic transliteration to ICAO 9303 compliant characters (A-Z, 0-9, <).
 * Replaces spaces with '<'.
 */
export const transliterate = (input: string): string => {
  // TODO: Add full transliteration map for accented characters (e.g. Ö -> OE)
  // Current implementation: Uppercase, keep alphanum, replace space with <, others to <
  return input
    .toUpperCase()
    .trim()
    .replace(/\s+/g, '<')
    .replace(/[^A-Z0-9<]/g, '<');
};

/**
 * Pads a string with '<' to a specific length.
 */
export const pad = (str: string, length: number): string => {
  if (str.length > length) {
    return str.substring(0, length);
  }
  return str.padEnd(length, '<');
};

/**
 * Formats a date object to YYMMDD string.
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};
