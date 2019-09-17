import { Component, OnInit, Input } from '@angular/core';
import { DataModelsService } from 'src/app/services/data-models.service';

@Component({
  selector: 'app-assignment-unit',
  templateUrl: './assignment-unit.component.html',
  styleUrls: ['./assignment-unit.component.css']
})
export class AssignmentUnitComponent implements OnInit {

  @Input() unit: any;

  constructor(private service: DataModelsService) { }

  ngOnInit() {
    if (this.unit === undefined) {
      this.unit = this.service.getCurrentAssignment().unit;
    }
  }

}
