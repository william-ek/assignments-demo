import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataModelsService } from 'src/app/services/data-models.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  assignment = {};

  constructor(private service: DataModelsService) { }

  ngOnInit() {
    this.assignment = this.service.getCurrentAssignment();
  }

}
