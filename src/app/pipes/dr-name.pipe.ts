import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'drName'
})
export class DrNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== null && value !== undefined && value !== '') {
      const drFirstName = value.firstName;
      const drLastName = value.lastName;
      const drId = value.id;
      const formattedDrId = drFirstName + ' ' + drLastName + ' (DR ID: ' + drId + ')';
      return formattedDrId;
    } else {
      return '';
    }

  }

}
