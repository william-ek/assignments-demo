import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DataModelsService } from 'src/app/services/data-models.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AssignmentViolationsDialogComponent } from '../assignment-violations-dialog/assignment-violations-dialog.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { SubmitButtonDialogComponent } from 'src/app/shared/submit-button-dialog/submit-button-dialog.component';
import { ComplianceDatePipe } from 'src/app/pipes/compliance-date.pipe';

@Component({
  selector: 'app-assignment-violations-edit',
  templateUrl: './assignment-violations-edit.component.html',
  styleUrls: ['./assignment-violations-edit.component.css']
})
export class AssignmentViolationsEditComponent implements OnInit, OnDestroy {

  parametersSubscription: Subscription;

  repositorySubscription: Subscription;

  buttonDialogRef: any = null;

  violation: any;

  violationCodes: any;

  violationCodeId: string;

  descriptionOfViolation: string;

  violationPrintOnNotice: string;

  violationDrComments: string;

  violationCleared: string;

  violationPermitRequired: string;

  violationClearedDate: string;

  violationForm: FormGroup = new FormGroup({});

  constructor(private dataService: DataModelsService, private repository: RepositoryService, private route: ActivatedRoute, public dialog: MatDialog) { }

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
      this.violationCodeId = selectedViolationCode.id;
      this.descriptionOfViolation = selectedViolationCode.longDescription;
      this.violationForm.patchValue({'violationCodeId': selectedViolationCode.id});
      this.violationForm.patchValue({'violationDescription': selectedViolationCode.longDescription});
      this.violationForm.patchValue({'violationComplianceDate': this.getComplianceDate(selectedViolationCode)});
    });

  }

  onSubmit() {

    this.violation.violationCode = this.violationForm.value.violationCodeId;
    this.violation.descriptionOfViolation = this.violationForm.value.violationDescription;
    this.violation.correctiveAction = this.violationForm.value.violationDrComments;
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

    this.violation.dirty = 'true';
    this.dataService.downloadAssignments();
    this.dataService.downloadAssignment();

    this.violationForm.markAsPristine();
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
        return complianceDate.toDateString;
      } catch (e) {
        return 'None';
      }
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.violationForm.pristine) {
      return true;
    } else {
      return confirm('Are you sure you want to leave this page?\n There are unsaved changes in the form.');
    }
  }

  ngOnInit() {
    this.parametersSubscription = this.route.params.subscribe(
      (params: Params) => {
        const violationId = params['vid'];
        this.violation = this.dataService.getCurrentAssignment().violations.find(x => x.id === violationId);
        this.violationCodeId = this.violation.violationCode;
        this.descriptionOfViolation = this.violation.descriptionOfViolation;
        this.violationDrComments = this.violation.internalNotes;
        this.violationPrintOnNotice = this.violation.additionalPrintOnNotice;
        if (this.violation.clearedIndicator === 'true') {
          this.violationCleared = 'YES';
        } else {
          this.violationCleared = 'NO';
        }
        if (this.violation.permitRequired === 'true') {
          this.violationPermitRequired = 'YES';
        } else {
          this.violationPermitRequired = 'NO';
        }
        this.violation.clearedDate = this.violation.violationClearedDate;
      }
    );

    this.repositorySubscription = this.repository.getJsonObject('violationCodes.json')
    .subscribe((response) => {
      if (response.status === 'good') {
        this.violationCodes = JSON.parse(response.content);
      }
    });

    this.violationForm = new FormGroup({
      'violationCodeId': new FormControl(this.violationCodeId, [Validators.required, this.violationIdValidator.bind(this)]),
      'violationDescription': new FormControl(this.descriptionOfViolation),
      'violationPrintOnNotice': new FormControl(this.violationPrintOnNotice),
      'violationDrComments': new FormControl(this.violationDrComments),
      'violationPermitRequired': new FormControl(this.violationPermitRequired),
      'violationCleared': new FormControl(this.violationCleared),
      'violationClearedDate': new FormControl(this.violationClearedDate, this.dateValidator.bind(this))
    });

  }

  ngOnDestroy() {
    this.parametersSubscription.unsubscribe();
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
    this.descriptionOfViolation = violation.longDescription;
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
