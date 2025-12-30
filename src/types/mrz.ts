export enum DocumentType {
  PASSPORT = 'TD3',       // Passport (2 lines x 44 chars)
  ID_CARD_TD1 = 'TD1',    // ID Card (3 lines x 30 chars)
  ID_CARD_TD2 = 'TD2',    // ID Card (2 lines x 36 chars)
  VISA_A = 'MRVA',        // Visa A (2 lines x 44 chars)
  VISA_B = 'MRVB',        // Visa B (2 lines x 36 chars)
}

export type Gender = 'M' | 'F' | '<';

export interface MrzPersonalData {
  documentType: DocumentType;
  countryCode: string; // 3-letter ICAO code
  documentNumber: string;
  birthDate: string; // YYMMDD
  sex: Gender;
  expiryDate: string; // YYMMDD
  nationality: string; // 3-letter ICAO code
  surname: string;
  givenNames: string;
  personalNumber?: string; // Optional
}

export interface MrzResult {
  line1: string;
  line2: string;
  line3?: string; // Only for TD1
  verification: {
    isValid: boolean;
    errors: string[];
  };
}