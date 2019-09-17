import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerAddress'
})
export class CustomerAddressPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== null && value !== undefined && value !== '') {
      let formattedAddress = value.address1;
      if (value.address2 !== null && value.address2 !== '') {
        formattedAddress = formattedAddress + ', ' + value.address2;
      }
      if (value.address3 !== null && value.address3 !== '') {
        formattedAddress = formattedAddress + ', ' + value.address3;

      }
      formattedAddress = formattedAddress + ', ' + value.cityStateZip;
      return formattedAddress;
    } else {
      return '';
    }
  }

}
