import { Inspection } from './inspection';
import { ViolationCodes } from './violation-codes';

export class Violation {

  public id: string;
  public descriptionOfViolation: string;
  public violationCode: string;
  public parkLotId: string;
  public parkLotStreet: string;
  public internalNotes: string;
  public correctiveAction: string;
  public severityLevel: string;
  public followupCount: string;
  public clearedIndicator: string;
  public clearedDate: string;
  public citationMailedDate: string;
  public status: string;
  public statusDate: string;
  public complianceDate: string;
  public additionalPrintOnNotice: string;
  public permitRequired: string;
  public dirty: string;

  constructor(id: string) {
      this.id = id;
  }
}
