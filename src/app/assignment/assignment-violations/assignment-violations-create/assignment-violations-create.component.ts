import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataModelsService } from 'src/app/services/data-models.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AssignmentViolationsDialogComponent } from '../assignment-violations-dialog/assignment-violations-dialog.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { SubmitButtonDialogComponent } from 'src/app/shared/submit-button-dialog/submit-button-dialog.component';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate-guard.service';
import { Violation } from 'src/app/models/violation';
import { ComplianceDatePipe } from 'src/app/pipes/compliance-date.pipe';

@Component({
  selector: 'app-assignment-violations-create',
  templateUrl: './assignment-violations-create.component.html',
  styleUrls: ['./assignment-violations-create.component.css']
})
export class AssignmentViolationsCreateComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  repositorySubscription: Subscription;

  buttonDialogRef: any = null;

  violation: any = {};

  violationCodes: any;

  violationCodeId: string;

  selectedViolationCode: string;

  descriptionOfViolation = '';

  violationPrintOnNotice = '';

  violationDrComments = '';

  violationCleared: string;

  violationPermitRequired: string;

  violationClearedDate: string;

  violationForm: FormGroup = new FormGroup({});

  constructor(private dataService: DataModelsService,
              private repository: RepositoryService,
              public dialog: MatDialog) { }

  showViolationCodeDialog() {

    const dialogConfig = new MatDialogConfig();

    const programViolationCodes: any = [];

    try {
      this.violationCodes.forEach(violation => {
        if (violation.program === this.dataService.getCurrentAssignment().application.program) {
          programViolationCodes.push(violation);
        }
      });
    } catch (e) {}

    const dialogRef = this.dialog.open(AssignmentViolationsDialogComponent, {
      data:  programViolationCodes
    });

    dialogRef.afterClosed().subscribe(selectedViolationCode => {

      if (selectedViolationCode !== null && selectedViolationCode !== undefined && selectedViolationCode !== '') {
        this.selectedViolationCode = selectedViolationCode;
        this.violationCodeId = selectedViolationCode.id;
        this.descriptionOfViolation = selectedViolationCode.longDescription;
        this.violationForm.patchValue({'violationCodeId': selectedViolationCode.id});
        this.violationForm.patchValue({'violationDescription': selectedViolationCode.longDescription});
        this.violationForm.patchValue({'violationComplianceDate': this.getComplianceDate(selectedViolationCode)});
      }
    });

  }

  onButtonHover() {

    if (this.buttonDialogRef !== null) {
      return;
    }

    this.buttonDialogRef = this.dialog.open(SubmitButtonDialogComponent, {
    });

    this.buttonDialogRef.afterClosed().subscribe(selectedViolationCode => {
    });
  }

  onSubmit() {

    this.violation = new Violation('new');
    this.violation.violationCode = this.violationForm.value.violationCodeId;
    this.violation.descriptionOfViolation = this.violationForm.value.violationDescription;
    this.violation.internalNotes = this.violationForm.value.violationDrComments;
    this.violation.additionalPrintOnNotice = this.violationForm.value.violationPrintOnNotice;
    this.violation.violationClearedDate = this.violationForm.value.clearedDate;
    this.violation.complianceDate = this.violationForm.value.violationComplianceDate;
    if (this.violationForm.value.violationCleared === 'YES') {
      this.violation.clearedIndicator = 'true';
    } else {
      this.violation.clearedIndicator = 'false';
    }
    if (this.violationForm.value.violationPermitRequired === 'YES') {
      this.violation.permitRequired = 'true';
    } else {
      this.violation.permitRequired = 'false';
    }

    this.violation.status = 'Pending';
    this.violation.statusDate = new Date();

    if (this.dataService.getCurrentAssignment().violations === '') {
      this.dataService.getCurrentAssignment().violations = [];
    }

    this.violation.dirty = 'true';
    this.dataService.getCurrentAssignment().violations.push(this.violation);

    this.dataService.downloadAssignments();
    this.dataService.downloadAssignment();

    this.violationForm.markAsPristine();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.violationForm.pristine) {
      return true;
    } else {
      return confirm('Are you sure you want to leave this page?\n There are unsaved changes in the form.');
    }
  }

  getAssignmentsDownloadStatus() {
    return this.dataService.getAssignmentsDownloadStatus();
  }
  getAssignmentDownloadStatus() {
    return this.dataService.getAssignmentDownloadStatus();
  }

  getComplianceDate(violationCode: any) {

    if (violationCode !== null) {
      if (violationCode.daysToCorrect === '') {
        return 'None';
      }
      if (violationCode.daysToCorrect === '999') {
        return 'No Correction Limit';
      }
      try {
        const daysToCorrect = +violationCode.daysToCorrect;
        const complianceDate = new Date();
        complianceDate.setDate(complianceDate.getDate() + daysToCorrect);
        return new ComplianceDatePipe('en-US').transform(complianceDate, 'MM/dd/yyyy');
      } catch (e) {
        return 'None';
      }
    }
  }

  ngOnInit() {

    this.repositorySubscription = this.repository.getJsonObject('violationCodes.json')
    .subscribe((response) => {
      if (response.status === 'good') {
        this.violationCodes = JSON.parse(response.content);
      }
    });

    this.violationForm = new FormGroup({
      'violationCodeId': new FormControl('violation Code', [Validators.required, this.violationIdValidator.bind(this)]),
      'violationDescription': new FormControl(null),
      'violationPrintOnNotice': new FormControl(null),
      'violationDrComments': new FormControl(null),
      'violationPermitRequired': new FormControl('NO'),
      'violationCleared': new FormControl('NO'),
      'violationClearedDate': new FormControl(null, this.dateValidator.bind(this)),
      'violationComplianceDate': new FormControl(null)
    });

  }

  ngOnDestroy() {
    this.repositorySubscription.unsubscribe();
  }

  violationIdValidator(control: FormControl): {[s: string]: boolean} {

    if (control.value === null || control.pristine === true) {
      return null;
    }

    const violation = this.violationCodes.find(x => x.id === control.value);

    if (violation === undefined) {
      this.descriptionOfViolation = '';
      return {'invalidViolationCodeId': true};
    }
    this.violationCodeId = violation.violationCode;
    this.descriptionOfViolation = violation.longDescription;
    this.violationForm.patchValue({'descriptionOfViolation': violation.longDescription});
    return null;
  }

  dateValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === null || control.pristine === true) {
      return null;
    }
    try {
      const clearedDate = control.value;
      const thisDate = new Date(clearedDate);
      const dateNow = new Date();
      if (dateNow < thisDate) {
        return {'dateCantBeFuture': true};
      }
    } catch (e) {
      return {'dateIsInvalid': true};
    }
    return null;
  }

}

