import { DocumentType, MrzPersonalData, MrzResult, Gender } from '../types/mrz';
import { calculateCheckDigit, pad, transliterate } from '../utils/mrz-utils';

export class MrzService {
  
  // ==========================================
  // GENERATOR LOGIC
  // ==========================================
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
    const docCode = 'I<';
    const issuer = pad(transliterate(data.countryCode), 3);
    const docNum = pad(transliterate(data.documentNumber), 9);
    const docNumCD = calculateCheckDigit(docNum);
    const opt1 = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 15);
    
    const line1 = `${docCode}${issuer}${docNum}${docNumCD}${opt1}`;

    const dob = pad(data.birthDate, 6);
    const dobCD = calculateCheckDigit(dob);
    const sex = data.sex;
    const exp = pad(data.expiryDate, 6);
    const expCD = calculateCheckDigit(exp);
    const nationality = pad(transliterate(data.nationality), 3);
    const opt2 = pad('', 11); 
    
    const composite = `${docNum}${docNumCD}${opt1}${dob}${dobCD}${exp}${expCD}${opt2}`;
    const finalCD = calculateCheckDigit(composite);

    const line2 = `${dob}${dobCD}${sex}${exp}${expCD}${nationality}${opt2}${finalCD}`;

    const names = pad(`${transliterate(data.surname)}<<${transliterate(data.givenNames)}`, 30);
    const line3 = names;

    return { line1, line2, line3, verification: { isValid: true, errors: [] } };
  }

  // --- TD2: ID Card (2x36) ---
  private static generateTD2(data: MrzPersonalData): MrzResult {
    const docCode = 'I<';
    const issuer = pad(transliterate(data.countryCode), 3);
    const names = pad(`${transliterate(data.surname)}<<${transliterate(data.givenNames)}`, 31);
    const line1 = `${docCode}${issuer}${names}`;

    const docNum = pad(transliterate(data.documentNumber), 9);
    const docNumCD = calculateCheckDigit(docNum);
    const nationality = pad(transliterate(data.nationality), 3);
    const dob = pad(data.birthDate, 6);
    const dobCD = calculateCheckDigit(dob);
    const sex = data.sex;
    const exp = pad(data.expiryDate, 6);
    const expCD = calculateCheckDigit(exp);
    const opt = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 7);
    
    const composite = `${docNum}${docNumCD}${dob}${dobCD}${exp}${expCD}${opt}`;
    const finalCD = calculateCheckDigit(composite);

    const line2 = `${docNum}${docNumCD}${nationality}${dob}${dobCD}${sex}${exp}${expCD}${opt}${finalCD}`;

    return { line1, line2, verification: { isValid: true, errors: [] } };
  }

  // --- MRV-A: Visa (2x44) ---
  private static generateMRVA(data: MrzPersonalData): MrzResult {
    const docCode = 'V<';
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
    const opt = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 16);
    
    const line2 = `${docNum}${docNumCD}${nationality}${dob}${dobCD}${sex}${exp}${expCD}${opt}`;

    return { line1, line2, verification: { isValid: true, errors: [] } };
  }

  // --- MRV-B: Visa (2x36) ---
  private static generateMRVB(data: MrzPersonalData): MrzResult {
    const docCode = 'V<';
    const issuer = pad(transliterate(data.countryCode), 3);
    const names = pad(`${transliterate(data.surname)}<<${transliterate(data.givenNames)}`, 31);
    const line1 = `${docCode}${issuer}${names}`;

    const docNum = pad(transliterate(data.documentNumber), 9);
    const docNumCD = calculateCheckDigit(docNum);
    const nationality = pad(transliterate(data.nationality), 3);
    const dob = pad(data.birthDate, 6);
    const dobCD = calculateCheckDigit(dob);
    const sex = data.sex;
    const exp = pad(data.expiryDate, 6);
    const expCD = calculateCheckDigit(exp);
    const opt = pad(data.personalNumber ? transliterate(data.personalNumber) : '', 8);
    
    const line2 = `${docNum}${docNumCD}${nationality}${dob}${dobCD}${sex}${exp}${expCD}${opt}`;

    return { line1, line2, verification: { isValid: true, errors: [] } };
  }

  // ==========================================
  // PARSER LOGIC (NEW)
  // ==========================================
  public static parse(rawMrz: string): MrzPersonalData {
    const lines = rawMrz.trim().split(/\r?\n/).map(l => l.trim().toUpperCase());
    
    if (lines.length < 2 || lines.length > 3) {
      throw new Error('Invalid MRZ: Must be 2 or 3 lines.');
    }

    const len = lines[0].length;
    const count = lines.length;

    // DETECT TYPE
    if (count === 3 && len === 30) {
      return this.parseTD1(lines);
    } else if (count === 2 && len === 44) {
       // Could be TD3 or MRV-A
       if (lines[0].startsWith('V')) return this.parseMRVA(lines);
       return this.parseTD3(lines);
    } else if (count === 2 && len === 36) {
       // Could be TD2 or MRV-B
       if (lines[0].startsWith('V')) return this.parseMRVB(lines);
       return this.parseTD2(lines);
    } else {
      throw new Error(`Unrecognized format: ${count} lines of ${len} characters.`);
    }
  }

  // Helper to extract names (Surname<<Given<Name)
  private static parseNames(mrzNameSection: string): { surname: string, givenNames: string } {
    const parts = mrzNameSection.split('<<');
    const surname = parts[0].replace(/</g, ' ').trim();
    const givenNames = parts.length > 1 ? parts[1].replace(/</g, ' ').trim() : '';
    return { surname, givenNames };
  }

  // Helper to clean fields (replace < with empty)
  private static clean(str: string): string {
    return str.replace(/</g, '');
  }

  private static parseTD3(lines: string[]): MrzPersonalData {
    // Line 1: Type(2), Issuer(3), Name(39)
    // Line 2: DocNum(9), CD, Nat(3), DOB(6), CD, Sex(1), Exp(6), CD, Personal(14), CD, FinalCD
    const l1 = lines[0];
    const l2 = lines[1];

    const { surname, givenNames } = this.parseNames(l1.substring(5));

    return {
      documentType: DocumentType.PASSPORT,
      countryCode: this.clean(l1.substring(2, 5)),
      surname,
      givenNames,
      documentNumber: this.clean(l2.substring(0, 9)),
      nationality: this.clean(l2.substring(10, 13)),
      birthDate: l2.substring(13, 19),
      sex: l2[20] as Gender,
      expiryDate: l2.substring(21, 27),
      personalNumber: this.clean(l2.substring(28, 42))
    };
  }

  private static parseTD1(lines: string[]): MrzPersonalData {
    // L1: Type(2), Issuer(3), DocNum(9), CD, Opt(15)
    // L2: DOB(6), CD, Sex(1), Exp(6), CD, Nat(3), Opt2(11), Final
    // L3: Names(30)
    const l1 = lines[0];
    const l2 = lines[1];
    const l3 = lines[2];

    const { surname, givenNames } = this.parseNames(l3);

    return {
      documentType: DocumentType.ID_CARD_TD1,
      countryCode: this.clean(l1.substring(2, 5)),
      documentNumber: this.clean(l1.substring(5, 14)),
      personalNumber: this.clean(l1.substring(15, 30)), // Mapping Opt1 to Personal Number
      birthDate: l2.substring(0, 6),
      sex: l2[7] as Gender,
      expiryDate: l2.substring(8, 14),
      nationality: this.clean(l2.substring(15, 18)),
      surname,
      givenNames
    };
  }

  private static parseTD2(lines: string[]): MrzPersonalData {
    // L1: Type(2), Issuer(3), Names(31)
    // L2: DocNum(9), CD, Nat(3), DOB(6), CD, Sex(1), Exp(6), CD, Opt(7), Final
    const l1 = lines[0];
    const l2 = lines[1];

    const { surname, givenNames } = this.parseNames(l1.substring(5));

    return {
      documentType: DocumentType.ID_CARD_TD2,
      countryCode: this.clean(l1.substring(2, 5)),
      surname,
      givenNames,
      documentNumber: this.clean(l2.substring(0, 9)),
      nationality: this.clean(l2.substring(10, 13)),
      birthDate: l2.substring(13, 19),
      sex: l2[20] as Gender,
      expiryDate: l2.substring(21, 27),
      personalNumber: this.clean(l2.substring(28, 35))
    };
  }

  private static parseMRVA(lines: string[]): MrzPersonalData {
    // Identical structure to TD3 but Type starts with V
    const data = this.parseTD3(lines);
    data.documentType = DocumentType.VISA_A;
    // MRV-A Opt field is longer (16 chars) at end of line 2, but logic in TD3 parse handles up to 42.
    // Actually TD3 line 2: personal is 28-42.
    // MRV-A line 2: opt is 28-44.
    const l2 = lines[1];
    data.personalNumber = this.clean(l2.substring(28, 44));
    return data;
  }

  private static parseMRVB(lines: string[]): MrzPersonalData {
    // Identical structure to TD2 but Type starts with V
    const data = this.parseTD2(lines);
    data.documentType = DocumentType.VISA_B;
    // MRV-B line 2: opt is 28-36 (8 chars). TD2 was 7 chars.
    const l2 = lines[1];
    data.personalNumber = this.clean(l2.substring(28, 36));
    return data;
  }
}