import { Component, OnInit, Input } from '@angular/core';
import { DataModelsService } from 'src/app/services/data-models.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  @Input() unit: any;

  constructor(private service: DataModelsService) { }

  ngOnInit() {
    if (this.unit === undefined) {
      this.unit = this.service.getCurrentAssignment().unit;
    }
  }

}
