import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataModelsService } from 'src/app/services/data-models.service';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-violations',
  templateUrl: './assignment-violations.component.html',
  styleUrls: ['./assignment-violations.component.css']
})
export class AssignmentViolationsComponent implements OnInit, OnDestroy {

  repositorySubscription: Subscription;

  violationCodes: any;

  assignment: any;

  constructor(private dataService: DataModelsService, private repository: RepositoryService, private router: Router) { }

  getViolations() {

    const violationData: any = [];

    try {
      this.assignment.violations.forEach(violation => {
        if (violation.status === 'Pending' || violation.id === 'new') {
          const violationCode = this.violationCodes.find(code => code.id === violation.violationCode);
          const violationItem: any = {};
          violationItem.violationCode = violation.violationCode;
          violationItem.id = violation.id;
          violationItem.shortDescription = violationCode.shortDescription;
          violationItem.longDescription = violationCode.longDescription;
          violationItem.legacyCode = violationCode.legacyCode;
          violationItem.lotId = violation.parkLot;
          violationItem.lotStreet = violation.parkLotStreet;
          violationItem.cleared = violation.clearedIndicator;
          violationItem.comments = violation.additionalPrintOnNotice;
          violationItem.status = violation.status;
          violationItem.statusDate = violation.statusDate;
          violationItem.complianceDate = violation.complianceDate;
          violationItem.violationClearedDate = violation.violationClearedDate;
          violationData.push(violationItem);
        }
      });
    } catch (e) {
    }
    return violationData;
  }

  editViolation(violation: any) {
    this.router.navigate(['/assignment/', this.assignment.id, 'violation', violation.id]);
  }

  deleteViolation(selectedViolation: any) {

    try {
      this.assignment.violations.forEach((violation, index) => {
        if (violation.statusDate !== undefined && selectedViolation.statusDate === violation.statusDate) {
          this.assignment.violations.splice(index, 1);
          this.dataService.downloadAssignments();
          this.dataService.downloadAssignment();
        }
      });
    } catch (e) {}

  }

  clearViolation(selectedViolation: any) {

    const clearedViolation = this.assignment.violations.find(violation => violation.id === selectedViolation.id && violation.statusDate === selectedViolation.statusDate);
    clearedViolation.violationClearedDate = new Date();
    clearedViolation.clearedIndicator = 'true';
    clearedViolation.status = 'Closed';
    this.dataService.downloadAssignments();
    this.dataService.downloadAssignment();

  }

  ngOnInit(): void {
    this.assignment = this.dataService.getCurrentAssignment();

    this.repositorySubscription = this.repository.getJsonObject('violationCodes.json')
      .subscribe((response) => {
        if (response.status === 'good') {
          this.violationCodes = JSON.parse(response.content);
        }
    });
  }

  ngOnDestroy() {
    this.repositorySubscription.unsubscribe();
  }

}
