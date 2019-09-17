import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'complianceDate'
})
export class ComplianceDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    try {
      const date = new Date(value);
      const transformedDate = super.transform(date, 'MM/dd/yyyy');
      return transformedDate;
    } catch {
      return value;
    }
  }

}
