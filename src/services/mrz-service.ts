import { DocumentType, MrzPersonalData, MrzResult } from '../types/mrz';
import { calculateCheckDigit, pad, transliterate } from '../utils/mrz-utils';

export class MrzService {
  
  /**
   * Generates MRZ lines based on document type and input data.
   */
  public static generate(data: MrzPersonalData): MrzResult {
    switch (data.documentType) {
      case DocumentType.PASSPORT:
        return this.generateTD3(data);
      default:
        throw new Error(`Document type ${data.documentType} not yet implemented`);
    }
  }

  /**
   * Generates TD3 (Passport) MRZ - 2 lines, 44 characters each
   * Line 1: P<CCCSURNAME<<GIVEN<NAMES<<<<<<<<<<<<<<<<<<<<<
   * Line 2: NUM<DNATDOB<SEXEXP<D<<<<<<<<<<<<<<CD
   */
  private static generateTD3(data: MrzPersonalData): MrzResult {
    // --- LINE 1 ---
    // Pos 1-2: Document Code (P<)
    const docCode = 'P<';
    // Pos 3-5: Issuing State (3 chars)
    const issuer = pad(transliterate(data.countryCode), 3);
    // Pos 6-44: Name (Surname<<GivenNames)
    const nameStr = `${transliterate(data.surname)}<<${transliterate(data.givenNames)}`;
    const names = pad(nameStr, 39);
    
    const line1 = `${docCode}${issuer}${names}`;

    // --- LINE 2 ---
    // Pos 1-9: Document Number
    const docNumRaw = transliterate(data.documentNumber);
    const docNum = pad(docNumRaw, 9);
    // Pos 10: Check digit for Doc Number
    const docNumCheck = calculateCheckDigit(docNum);
    
    // Pos 11-13: Nationality (3 chars)
    const nationality = pad(transliterate(data.nationality), 3);
    
    // Pos 14-19: Date of Birth (YYMMDD)
    const dob = pad(data.birthDate, 6); // Assumes already verified format
    // Pos 20: Check digit for DOB
    const dobCheck = calculateCheckDigit(dob);
    
    // Pos 21: Sex (M, F, <)
    const sex = data.sex;
    
    // Pos 22-27: Date of Expiry (YYMMDD)
    const exp = pad(data.expiryDate, 6);
    // Pos 28: Check digit for Expiry
    const expCheck = calculateCheckDigit(exp);
    
    // Pos 29-42: Personal Number (Optional)
    const personalNumRaw = data.personalNumber ? transliterate(data.personalNumber) : '';
    const personalNum = pad(personalNumRaw, 14);
    // Pos 43: Check digit for Personal Number (or < if empty? ICAO says check digit of personal number)
    // If personal number is empty/unspecified, check digit logic might vary, usually 0 or calc on <s
    const personalNumCheck = calculateCheckDigit(personalNum);

    // Composite Line for Final Check Digit
    // ICAO TD3 Final Check: Pos 1-10 + 14-20 + 22-43 (DocNum+CD + DOB+CD + EXP+CD + Personal+CD)
    // Note: It validates the data elements, not the full line string directly.
    // The composite string is: DocNum + CD + DOB + CD + EXP + CD + PersonalNum + CD
    const compositeData = `${docNum}${docNumCheck}${dob}${dobCheck}${exp}${expCheck}${personalNum}${personalNumCheck}`;
    const finalCheck = calculateCheckDigit(compositeData);

    const line2 = `${docNum}${docNumCheck}${nationality}${dob}${dobCheck}${sex}${exp}${expCheck}${personalNum}${personalNumCheck}${finalCheck}`;

    return {
      line1,
      line2,
      verification: {
        isValid: true, // TODO: Implement validation of existing MRZ
        errors: []
      }
    };
  }
}
