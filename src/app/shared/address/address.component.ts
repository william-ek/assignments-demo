import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input() addresses: any[];

  constructor() { }

  ngOnInit() {
    const selectedAddresses = [];

    try {
      this.addresses.forEach(address => {
        if (address.stopDate === '') {
          selectedAddresses.push(address);
        }
      });
    } catch (e) {
    }

    this.addresses = selectedAddresses;
  }

}
