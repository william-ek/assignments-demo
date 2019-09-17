import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViolationCodes } from 'src/app/models/violation-codes';

@Component({
  selector: 'app-assignment-violations-dialog',
  templateUrl: './assignment-violations-dialog.component.html',
  styleUrls: ['./assignment-violations-dialog.component.css']
})
export class AssignmentViolationsDialogComponent implements OnInit {

  selectedViolationCodes: any = [];

  selectedViolationCode: any;

  violationCodeSelected = false;

  programFilter = '';
  categoryFilter = '';
  codeFilter = '';
  codeSectionFilter = '';
  legacyCodeFilter = '';
  descriptionFilter = '';

  constructor(
    public dialogRef: MatDialogRef<AssignmentViolationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public violationCodes: any) {
  }

  violationSelected(violationCode: any) {
    this.selectedViolationCode = violationCode;
    this.violationCodeSelected = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onFilterInput(event: any) {
    this.selectedViolationCodes = [];
    for (const violation of this.violationCodes) {
      if (this.programFilter.length > 0) {
        if (violation.program === null || !violation.program.toUpperCase().includes(this.programFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.categoryFilter.length > 0) {
        if (violation.category === null || !violation.category.toUpperCase().includes(this.categoryFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.codeFilter.length > 0) {
        if (violation.code === null || !violation.code.toUpperCase().includes(this.codeFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.codeSectionFilter.length > 0) {
        if (violation.codeSections === null || !violation.codeSections.toUpperCase().includes(this.codeSectionFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.legacyCodeFilter.length > 0) {
        if (violation.legacyCode === null || !violation.legacyCode.toUpperCase().includes(this.legacyCodeFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.descriptionFilter.length > 0) {
        if (violation.longDescription === null || !violation.longDescription.toUpperCase().includes(this.descriptionFilter.toUpperCase())) {
          continue;
        }
      }
      this.selectedViolationCodes.push(violation);
    }
  }

  ngOnInit() {
    this.selectedViolationCodes = this.violationCodes;
  }

}
