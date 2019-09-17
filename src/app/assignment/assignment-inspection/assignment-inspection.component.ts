import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DownloadService } from 'src/app/services/download.service';
import { DataModelsService } from 'src/app/services/data-models.service';
import { Inspection } from 'src/app/models/inspection';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate-guard.service';

@Component({
  selector: 'app-assignment-inspection',
  templateUrl: './assignment-inspection.component.html',
  styleUrls: ['./assignment-inspection.component.css']
})
export class AssignmentInspectionComponent implements OnInit, CanComponentDeactivate {


  buttonTitle = '';
  backgroundColor = '';
  inspection: Inspection;
  inspectionDateError = '';
  assignmentsFileStatus = '';
  assignmentFileStatus = '';

  @ViewChild('f') inspectionForm: NgForm;

  constructor(private download: DownloadService, private dataService: DataModelsService) { }

  onSubmit(form: NgForm) {

    if (!(this.inspectionForm.form.pristine)) {

      if (form.form.value.activitySite !== undefined) {
        this.inspection.activitySite = form.form.value.activitySite;
      }
      if (form.form.value.assigmentCompletedDate !== undefined) {
        this.inspection.assigmentCompletedDate = form.form.value.assigmentCompletedDate;
      }
      if (form.form.value.assigmentStartDate !== undefined) {
        this.inspection.assigmentStartDate = form.form.value.assigmentStartDate;
      }
      if (form.form.value.openingStatement !== undefined) {
        this.inspection.openingStatement = form.form.value.openingStatement;
      }
      if (form.form.value.enforcementActionType !== undefined) {
        this.inspection.enforcementActionType = form.form.value.enforcementActionType;
      }
      if (form.form.value.facilityId !== undefined) {
        this.inspection.facilityId = form.form.value.facilityId;
      }
      if (form.form.value.feeDue !== undefined) {
        this.inspection.feeDue = form.form.value.feeDue;
      }
      if (form.form.value.inspectionActionType !== undefined) {
        this.inspection.inspectionActionType = form.form.value.inspectionActionType;
      }
      if (form.form.value.inspectionDate !== undefined) {
        this.inspection.inspectionDate = form.form.value.inspectionDate;
      }
      if (form.form.value.inspectionResults !== undefined) {
        this.inspection.inspectionResults = form.form.value.inspectionResults;
      }
      if (form.form.value.inspectionTimeHours !== undefined) {
        this.inspection.inspectionTimeHours = form.form.value.inspectionTimeHours;
      }
      if (form.form.value.inspectionTimeMinutes !== undefined) {
        this.inspection.inspectionTimeMinutes = form.form.value.inspectionTimeMinutes;
      }
      if (form.form.value.noticeSentDate !== undefined) {
        this.inspection.noticeSentDate = form.form.value.noticeSentDate;
      }
      if (form.form.value.purposeOfReport !== undefined) {
        this.inspection.purposeOfReport = form.form.value.purposeOfReport;
      }
      if (form.form.value.recommendations !== undefined) {
        this.inspection.recommendations = form.form.value.recommendations;
      }
      if (form.form.value.resultsEnteredDate !== undefined) {
        this.inspection.resultsEnteredDate = form.form.value.resultsEnteredDate;
      }
      if (form.form.value.travelMiles !== undefined) {
        this.inspection.travelMiles = form.form.value.travelMiles;
      }
      if (form.form.value.travelTimeHours !== undefined) {
        this.inspection.travelTimeHours = form.form.value.travelTimeHours;
      }
      if (form.form.value.travelTimeMinutes !== undefined) {
        this.inspection.travelTimeMinutes = form.form.value.travelTimeMinutes;
      }

      this.inspection.dirty = 'true';
      this.dataService.downloadAssignments();
      this.dataService.downloadAssignment();

      form.form.markAsPristine();
    }

  }

  getAssignmentsDownloadStatus() {
    return this.dataService.getAssignmentsDownloadStatus();
  }
  getAssignmentDownloadStatus() {
    return this.dataService.getAssignmentDownloadStatus();
  }

  onSelections(form: NgForm) {
    const inspectionDate = form.form.value.inspectionDate;
    const thisDate = new Date(inspectionDate);
    const dateNow = new Date();
    if (dateNow < thisDate) {
      this.inspectionDateError = 'Date cant be in the future';
    }
  }

  onButtonHover(form: NgForm) {

    this.buttonTitle = '';
    if (!form.form.controls.inspectionDate.valid) {
      this.buttonTitle += 'Required Fields Missing: Inspection Date\n';
    }
    if (!form.form.controls.purposeOfReport.valid) {
      this.buttonTitle += 'Required Fields Missing: Purpose of Report\n';
    }
    if (!form.form.controls.inspectionResults.valid) {
      this.buttonTitle += 'Required Fields Missing: Inspection Results\n';
    }
    if (!form.form.controls.inspectionTimeHours.valid) {
      this.buttonTitle += 'Required Fields Missing: Inspection Time Hours\n';
    }
    if (!form.form.controls.inspectionTimeMinutes.valid) {
      this.buttonTitle += 'Required Fields Missing: Inspection Time Minutes\n';
    }
    if (!form.form.controls.travelTimeHours.valid) {
      this.buttonTitle += 'Required Fields Missing: Travel Time Hours\n';
    }
    if (!form.form.controls.travelTimeMinutes.valid) {
      this.buttonTitle += 'Required Fields Missing: Travel Time Minutes\n';
    }
    if (!form.form.controls.travelMiles.valid) {
      this.buttonTitle += 'Required Fields Missing: Travel Miles\n';
    }
    if (this.buttonTitle === '') {
      this.buttonTitle += 'Click to Submit';
      this.backgroundColor = 'transparent';
    } else {
      this.backgroundColor = 'transparent';
    }

  }


  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.inspectionForm.form.pristine) {
      return true;
    } else {
      return confirm('Are you sure you want to leave this page?\n There are unsaved changes in the form.');
    }
  }

  ngOnInit() {
    const assignment = this.dataService.getCurrentAssignment();
    if (assignment.inspection) {
      this.inspection = assignment.inspection;
    } else {
      this.inspection = new Inspection('0', assignment.assignmentNumber, assignment.assignmentVersion);
      assignment['inspection'] = this.inspection;
    }
  }

}
