import { Component, OnInit } from '@angular/core';
import { DataModelsService } from 'src/app/services/data-models.service';

@Component({
  selector: 'app-assignment-applicant',
  templateUrl: './assignment-applicant.component.html',
  styleUrls: ['./assignment-applicant.component.css']
})
export class AssignmentApplicantComponent implements OnInit {

  application = {};

  constructor(private service: DataModelsService) { }

  ngOnInit() {
    this.application = this.service.getCurrentAssignment().application;
  }

}
