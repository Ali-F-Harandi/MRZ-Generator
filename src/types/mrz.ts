export enum DocumentType {
  PASSPORT = 'P', // TD3 (2 lines x 44 chars)
  ID_CARD_TD1 = 'I', // TD1 (3 lines x 30 chars) - Usually ID cards
  ID_CARD_TD2 = 'I', // TD2 (2 lines x 36 chars) - Can be ID or Visa
  VISA_A = 'V', // MRV-A (2 lines x 44 chars)
  VISA_B = 'V', // MRV-B (2 lines x 36 chars)
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
  personalNumber?: string; // Optional, often used in ID cards
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
