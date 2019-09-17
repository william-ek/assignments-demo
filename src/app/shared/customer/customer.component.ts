import { Component, OnInit, Input } from '@angular/core';
import { DataModelsService } from 'src/app/services/data-models.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Input() customer: any;

  constructor(private service: DataModelsService) { }

  ngOnInit() {
    if (this.customer === undefined) {
      this.customer = this.service.getCurrentAssignment().customer;
    }
  }

}
