import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { DownloadService } from './download.service';

// import violations from '../../assets/jsonobjects/violationCodes.json';
// import assignments from '../../assets/jsonobjects/assignments.json';

declare function readBlob(files, output): any;

@Injectable({
  providedIn: 'root'
})
export class DataModelsService {

  fileAssignments: any;

  fileName: string;

  assignment: any = {};

  violations: any = {};

  sortedViolations = [];

  downloadAssignmentsStatus = '';

  downloadAssignmentStatus = '';

  constructor(private downloadService: DownloadService, private repository: RepositoryService) { }

  getViolations() {

    if (this.sortedViolations.length > 1) {
      return this.sortedViolations;
    }

    this.sortedViolations = this.violations.violations.sort((v1, v2) => {
      if (v1.category > v2.category) {
          return 1;
      }

      if (v1.category < v2.category) {
          return -1;
      }

      return 0;
  });
    return this.sortedViolations;
  }

  public getAssigments() {
    return this.fileAssignments;
  }

  public setAssignments(fileAssignments: any) {
    this.fileAssignments = fileAssignments;
  }

  setFileName(fileName: string) {
    this.fileName = fileName;
  }

  public getAssignment(assignmentId: number) {
    this.assignment = this.getAssigments().assignments.find(i => i.id === assignmentId);
    return this.assignment;
  }

  public getCurrentAssignment() {
    return this.assignment;
  }

/*   downloadAssignments() {
    this.downloadService.downloadFile(JSON.stringify(this.fileAssignments), this.fileName);
  }

  downloadAssignment() {
    const fileName = 'assignment_' + this.getCurrentAssignment().assignmentNumber + '_' + this.getCurrentAssignment().assignmentVersion + '.json';
    this.downloadService.downloadFile(JSON.stringify(this.getCurrentAssignment()), fileName);
  } */

  downloadAssignments() {
    this.repository.postJsonObject('assignments.json', this.fileAssignments)
    .subscribe(
      response => {
        this.downloadAssignmentsStatus = 'assignments.json was successfully saved';
      },
      error => {
        this.downloadAssignmentsStatus = 'error writing file: assignments.json';
        console.log(error);
      }
    );
  }

  downloadAssignment() {
    const fileName = 'assignment_' + this.getCurrentAssignment().id + '.json';
    this.repository.postJsonObject(fileName, this.getCurrentAssignment())
    .subscribe(
      response => {
        this.downloadAssignmentStatus = fileName + ' was successfully saved';
      },
      error => {
        this.downloadAssignmentStatus = 'error writing file: ' + fileName;
        console.log(error);
      }
    );
  }

  getAssignmentsDownloadStatus() {
    return this.downloadAssignmentsStatus;
  }
  getAssignmentDownloadStatus() {
    return this.downloadAssignmentStatus;
  }

}
