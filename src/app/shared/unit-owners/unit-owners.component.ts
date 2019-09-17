import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-unit-owners',
  templateUrl: './unit-owners.component.html',
  styleUrls: ['./unit-owners.component.css']
})
export class UnitOwnersComponent implements OnInit {

  @Input() owners: any;

  constructor() { }

  getOwners(assignment: any) {
    const owners = [];
    try {
      const unitOwners = this.owners;
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

  ngOnInit() {
  }

}
