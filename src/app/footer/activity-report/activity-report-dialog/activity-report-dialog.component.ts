import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RepositoryService } from 'src/app/services/repository.service';
import { Subscription } from 'rxjs';
import { ViolationCodes } from 'src/app/models/violation-codes';
import { Violation } from 'src/app/models/violation';

@Component({
  selector: 'app-activity-report-dialog',
  templateUrl: './activity-report-dialog.component.html',
  styleUrls: ['./activity-report-dialog.component.css']
})
export class ActivityReportDialogComponent implements OnInit, OnDestroy {

  repositorySubscription: Subscription;

  violationCodes = [];

  constructor(
    private repository: RepositoryService,
    public dialogRef: MatDialogRef<ActivityReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public assignment: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getViolations() {
    const returnedViolations = [];

    try {
      this.assignment.violations.forEach(violation => {
        if (violation.status === 'Pending' || violation.id === 'new') {
          returnedViolations.push(violation);
        }
      });
    } catch (e) {}

    return returnedViolations;
  }

  getViolationCode(violation: any) {

    let returnedViolationCode = new ViolationCodes('', '', '', '', '');

    if (violation === null || violation === undefined) {
      return returnedViolationCode;
    }

    try {
      this.violationCodes.forEach(violationCode => {
        if (violationCode.id === violation) {
          returnedViolationCode = violationCode;
        }
      });
    } catch (e) {}

    return returnedViolationCode;
  }

  /**
   * Format the available address fields in the assignment record.
   */
  getActivitySiteAddress(assignment: any) {
    let formattedAddress = assignment.address1;
    if (assignment.address2 !== null && assignment.address2 !== '') {
      formattedAddress = formattedAddress + ', ' + assignment.address2;
    }
    if (assignment.address3 !== null && assignment.address3 !== '') {
      formattedAddress = formattedAddress + ', ' + assignment.address3;
    }
    formattedAddress = formattedAddress + ', ' + assignment.city + ', ' + assignment.stateCode + ' ' + assignment.zipCode;

    return formattedAddress;
  }

  /**
   * Extract the Decal or DMV tag number from the array attached to assignment.application.unit.identifiers
   */
  getUnitIdentifier(assignment: any) {

    let formattedIdentifier = '';

    try {
      if (assignment.application.unit.identifiers !== null && assignment.application.unit.identifiers !== undefined && assignment.application.unit.identifiers !== '') {
        assignment.application.unit.unitIdentifiers.forEach(identifier => {
          if (identifier.stopDate === null || identifier.stopDate === '') {
            if (identifier.identifierType === 'DECAL' || identifier.identifierType === 'DMV') {
              formattedIdentifier = identifier.identifierType + ': ' + identifier.identifierValue;
            }
          }
        });
      }
    } catch (e) {}

    return formattedIdentifier;
  }

  getSections(assignment: any) {
    const sections = [];
    try {
      const unitSections = assignment.application.unit.unitSections;
      unitSections.forEach(section => {
          const sectionData: any = {};
          sectionData.length = section.length;
          sectionData.width = section.width;
          sectionData.serialNumber = '';
          sectionData.insignia = '';
          try {
            const unitIdentifiers = section.unitIdentifiers;
            unitIdentifiers.forEach(identifier => {
              if (identifier.stopDate === null || identifier.stopDate === '') {
                if (identifier.identifierType === 'INSIGNIA') {
                  sectionData.insignia = identifier.identifierValue;
                }
                if (identifier.identifierType === 'SERIAL_NUMBER') {
                  sectionData.serialNumber = identifier.identifierValue;
                }
              }
            });
          } catch (e) {}
          sections.push(sectionData);
      });
    } catch (e) {}
    return sections;
  }

  getOwners(assignment: any) {
    const owners = [];
    try {
      const unitOwners = assignment.application.unit.unitOwners;
      unitOwners.forEach(owner => {
        if (owner.ownerType === 'REGISTERED' && owner.status === 'ACTIVE') {
          try {
            owner.ownerGroups[0].groupMembers.forEach(member => {
              const ownerData: any = {};
              ownerData.customer = member.customer;
              try {
                member.customer.addresses.forEach(address => {
                  if (address.stopDate === null || address.stopDate === '') {
                    ownerData.address = address;
                  }
                });
                owners.push(ownerData);
              } catch (e) {}
            });
          } catch (e) {}
        }
      });
    } catch (e) {
    }
    return owners;
  }

  createReport() {
    const data = document.getElementById('reportcontent');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    const imgWidth = 612;
    const pageHeight = 792;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;
    console.log(canvas.height);
    console.log(canvas.width);
    console.log(imgHeight);

    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'letter'); // Letter size page of PDF
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('Activity_Report.pdf'); // Generated PDF
    });
  }

  ngOnInit(): void {

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
