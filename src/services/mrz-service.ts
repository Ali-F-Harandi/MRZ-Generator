import { DocumentType, MrzPersonalData, MrzResult } from '../types/mrz';
import { calculateCheckDigit, pad, transliterate } from '../utils/mrz-utils';

export class MrzService {
  
  public static generate(data: MrzPersonalData): MrzResult {
    switch (data.documentType) {
      case DocumentType.PASSPORT:
        return this.generateTD3(data);
      case DocumentType.ID_CARD_TD1:
        return this.generateTD1(data);
      case DocumentType.ID_CARD_TD2:
        return this.generateTD2(data);
      case DocumentType.VISA_A:
        return this.generateMRVA(data);
      case DocumentType.VISA_B:
        return this.generateMRVB(data);
      default:
        throw new Error(`Document type ${data.documentType} not implemented`);
    }
  }

  // --- TD3: Passport (2x44) ---
  private static generateTD3(data: MrzPersonalData): MrzResult {
    const docCode = 'P<';
    const issuer = pad(transliterate(data.countryCode), 3);
    const names = pad(`${transliterate(data.surname)}<<${transliterate(data.givenNames)}`, 39);
    const line1 = `${docCode}${issuer}${names}`;

    const docNum = pad(transliterate(data.documentNumber), 9);
    const docNumCD = calculateCheckDigit(docNum);
    const nationality = pad(transliterate(data.nationality), 3);
    const dob = pad(data.birthDate, 6);
    const dobCD = calculateCheckDigit(dob);
    const sex = data.sex;
    const exp = pad(data.expiryDate, 6);
    const expCD = calculateCheckDigit(exp);
    const personalNum = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 14);
    const personalNumCD = calculateCheckDigit(personalNum);
    
    // Final CD: DocNum+CD + DOB+CD + Exp+CD + PersonalNum+CD
    const composite = `${docNum}${docNumCD}${dob}${dobCD}${exp}${expCD}${personalNum}${personalNumCD}`;
    const finalCD = calculateCheckDigit(composite);

    const line2 = `${docNum}${docNumCD}${nationality}${dob}${dobCD}${sex}${exp}${expCD}${personalNum}${personalNumCD}${finalCD}`;

    return { line1, line2, verification: { isValid: true, errors: [] } };
  }

  // --- TD1: ID Card (3x30) ---
  private static generateTD1(data: MrzPersonalData): MrzResult {
    // Line 1: I< + Issuer(3) + DocNum(9) + CD + Opt(15)
    const docCode = 'I<';
    const issuer = pad(transliterate(data.countryCode), 3);
    const docNum = pad(transliterate(data.documentNumber), 9);
    const docNumCD = calculateCheckDigit(docNum);
    // Use personal number for Optional Data 1 if fits, else blank
    const opt1 = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 15);
    
    const line1 = `${docCode}${issuer}${docNum}${docNumCD}${opt1}`;

    // Line 2: DOB(6)+CD + Sex(1) + Exp(6)+CD + Nat(3) + Opt2(11) + FinalCD
    const dob = pad(data.birthDate, 6);
    const dobCD = calculateCheckDigit(dob);
    const sex = data.sex;
    const exp = pad(data.expiryDate, 6);
    const expCD = calculateCheckDigit(exp);
    const nationality = pad(transliterate(data.nationality), 3);
    const opt2 = pad('', 11); // Second optional field usually empty or internal
    
    // Final CD for TD1: Line 1(6-30) + Line 2(1-7) + Line 2(9-15) + Line 2(19-29)
    // Means: DocNum+CD+Opt1 + DOB+CD + Exp+CD + Opt2
    const composite = `${docNum}${docNumCD}${opt1}${dob}${dobCD}${exp}${expCD}${opt2}`;
    const finalCD = calculateCheckDigit(composite);

    const line2 = `${dob}${dobCD}${sex}${exp}${expCD}${nationality}${opt2}${finalCD}`;

    // Line 3: Name(30)
    const names = pad(`${transliterate(data.surname)}<<${transliterate(data.givenNames)}`, 30);
    const line3 = names;

    return { line1, line2, line3, verification: { isValid: true, errors: [] } };
  }

  // --- TD2: ID Card (2x36) ---
  private static generateTD2(data: MrzPersonalData): MrzResult {
    // Line 1: I< + Issuer(3) + Name(31)
    const docCode = 'I<';
    const issuer = pad(transliterate(data.countryCode), 3);
    const names = pad(`${transliterate(data.surname)}<<${transliterate(data.givenNames)}`, 31);
    const line1 = `${docCode}${issuer}${names}`;

    // Line 2: DocNum(9)+CD + Nat(3) + DOB(6)+CD + Sex(1) + Exp(6)+CD + Opt(7) + FinalCD
    const docNum = pad(transliterate(data.documentNumber), 9);
    const docNumCD = calculateCheckDigit(docNum);
    const nationality = pad(transliterate(data.nationality), 3);
    const dob = pad(data.birthDate, 6);
    const dobCD = calculateCheckDigit(dob);
    const sex = data.sex;
    const exp = pad(data.expiryDate, 6);
    const expCD = calculateCheckDigit(exp);
    const opt = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 7);
    
    // Final CD: DocNum+CD + DOB+CD + Exp+CD + Opt
    const composite = `${docNum}${docNumCD}${dob}${dobCD}${exp}${expCD}${opt}`;
    const finalCD = calculateCheckDigit(composite);

    const line2 = `${docNum}${docNumCD}${nationality}${dob}${dobCD}${sex}${exp}${expCD}${opt}${finalCD}`;

    return { line1, line2, verification: { isValid: true, errors: [] } };
  }

  // --- MRV-A: Visa (2x44) ---
  private static generateMRVA(data: MrzPersonalData): MrzResult {
    // Line 1: V< + Issuer(3) + Name(39)
    const docCode = 'V<';
    const issuer = pad(transliterate(data.countryCode), 3);
    const names = pad(`${transliterate(data.surname)}<<${transliterate(data.givenNames)}`, 39);
    const line1 = `${docCode}${issuer}${names}`;

    // Line 2: DocNum(9)+CD + Nat(3) + DOB(6)+CD + Sex(1) + Exp(6)+CD + Opt(16)
    const docNum = pad(transliterate(data.documentNumber), 9);
    const docNumCD = calculateCheckDigit(docNum);
    const nationality = pad(transliterate(data.nationality), 3);
    const dob = pad(data.birthDate, 6);
    const dobCD = calculateCheckDigit(dob);
    const sex = data.sex;
    const exp = pad(data.expiryDate, 6);
    const expCD = calculateCheckDigit(exp);
    const opt = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 16);
    
    // No Final CD for MRV-A
    const line2 = `${docNum}${docNumCD}${nationality}${dob}${dobCD}${sex}${exp}${expCD}${opt}`;

    return { line1, line2, verification: { isValid: true, errors: [] } };
  }

  // --- MRV-B: Visa (2x36) ---
  private static generateMRVB(data: MrzPersonalData): MrzResult {
    // Line 1: V< + Issuer(3) + Name(31)
    const docCode = 'V<';
    const issuer = pad(transliterate(data.countryCode), 3);
    const names = pad(`${transliterate(data.surname)}<<${transliterate(data.givenNames)}`, 31);
    const line1 = `${docCode}${issuer}${names}`;

    // Line 2: DocNum(9)+CD + Nat(3) + DOB(6)+CD + Sex(1) + Exp(6)+CD + Opt(8)
    const docNum = pad(transliterate(data.documentNumber), 9);
    const docNumCD = calculateCheckDigit(docNum);
    const nationality = pad(transliterate(data.nationality), 3);
    const dob = pad(data.birthDate, 6);
    const dobCD = calculateCheckDigit(dob);
    const sex = data.sex;
    const exp = pad(data.expiryDate, 6);
    const expCD = calculateCheckDigit(exp);
    const opt = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 8);
    
    // No Final CD for MRV-B
    const line2 = `${docNum}${docNumCD}${nationality}${dob}${dobCD}${sex}${exp}${expCD}${opt}`;

    return { line1, line2, verification: { isValid: true, errors: [] } };
  }
}