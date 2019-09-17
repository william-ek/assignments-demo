export class Inspection {

  public id: string;
  public assignmentNumber: string;
  public assignmentVersion: number;
  public activitySite: string;
  public assigmentCompletedDate: string;
  public assigmentStartDate: string;
  public openingStatement: string;
  public enforcementActionType: string;
  public facilityId: string;
  public feeDue: string;
  public inspectionActionType: string;
  public inspectionDate: string;
  public inspectionResults: string;
  public inspectionTimeHours: string;
  public inspectionTimeMinutes: string;
  public noticeSentDate: string;
  public purposeOfReport: string;
  public recommendations: string;
  public resultsEnteredDate: string;
  public travelMiles: string;
  public travelTimeHours: string;
  public travelTimeMinutes: string;
  public dirty: string;


  constructor(id: string, assignmentNumber: string, assignmentVersion: number) {
      this.id = id;
      this.assignmentNumber = assignmentNumber;
      this.assignmentVersion = assignmentVersion;
  }

}
