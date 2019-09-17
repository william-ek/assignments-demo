import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feetAndInches'
})
export class FeetAndInchesPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value === null || value === undefined || value === '') {
      return '';
    }

    try {
      const feet = Math.abs(+value / 12);
      const inches = +value - (feet * 12);
      return feet.toString() + '\' ' + inches.toString() + '"'; 
    } catch (e) {
    }
    return value;
  }

}
