export class ViolationCodes {

  id: number;
  category: string;
  code: string;
  codeSections: string;
  legacyCode: string;
  longDescription: string;

  constructor(category: string, code: string, codeSections: string, legacyCode: string, longDescription: string) {

    this.category = category;
    this.code = code;
    this.codeSections = codeSections;
    this.legacyCode = legacyCode;
    this.longDescription = longDescription;

  }

}
