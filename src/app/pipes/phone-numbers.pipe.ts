import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumberPipe } from './phone-number.pipe';

@Pipe({
  name: 'phoneNumbers'
})
export class PhoneNumbersPipe extends PhoneNumberPipe implements PipeTransform {

  /*
  * value is an array of phone objects
  */
  transform(value: any, args?: any): any {

    if (value !== null && value !== undefined && value !== '') {
      let formattedPhones = '';
      value.forEach(phone => {
        const phoneType = phone.phoneType;
        const phoneNumber = phone.phoneNumber;
        if (phoneType !== 'FAX') {
          const formattedPhoneNumber = super.transform(phoneNumber) + ' ';
          formattedPhones = formattedPhones  + formattedPhoneNumber;
        }
      });
      return formattedPhones;
    } else {
      return '';
    }
  }

}
