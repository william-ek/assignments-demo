import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let formattedPhoneNumber = '';

    if (value !== null && value !== undefined && value !== '') {
      formattedPhoneNumber = '(' + value.substr(0, 3) + ')' +
      value.substr(3, 3) + '-' +
      value.substr(6, 4);
    }
    return formattedPhoneNumber;
  }

}
