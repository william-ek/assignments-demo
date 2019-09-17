import { Component, OnInit } from '@angular/core';
import { DataModelsService } from 'src/app/services/data-models.service';

@Component({
  selector: 'app-assignment-customer',
  templateUrl: './assignment-customer.component.html',
  styleUrls: ['./assignment-customer.component.css']
})
export class AssignmentCustomerComponent implements OnInit {

  customer = {};

  constructor(private service: DataModelsService) { }

  ngOnInit() {
    this.customer = this.service.getCurrentAssignment().customer;
  }

}
