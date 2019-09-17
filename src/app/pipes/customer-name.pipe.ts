import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerName'
})
export class CustomerNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== null && value !== undefined && value !== '') {
      if (value.customerType === 'PERSON') {
        let formattedName = value.firstName + ' ';
        if (value.middleName !== null) {
          formattedName = formattedName + value.middleName + ' ';
        }
        formattedName = formattedName + value.lastName;
        if (value.suffix !== null) {
          formattedName = formattedName + value.suffix;
        }
        return formattedName;
      } else {
        return value.legalName;
      }
    } else {
      return '';
    }
  }

}
