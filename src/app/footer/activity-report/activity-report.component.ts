import { Component, OnInit } from '@angular/core';
import {MatDialogConfig, MatDialog} from '@angular/material';
import { ActivityReportDialogComponent } from './activity-report-dialog/activity-report-dialog.component';
import { DataModelsService } from 'src/app/services/data-models.service';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.css']
})
export class ActivityReportComponent implements OnInit {

  constructor(private data: DataModelsService, public dialog: MatDialog) {

  }

  createActivityReport() {

    const dialogConfig = new MatDialogConfig();

    const assignment = this.data.getCurrentAssignment();

    const dialogRef = this.dialog.open(ActivityReportDialogComponent, {
      data: assignment
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}

