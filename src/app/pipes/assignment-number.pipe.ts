import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assignmentNumber'
})
export class AssignmentNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value === null || value === undefined || value === '') {
      return '';
    }

    const assignmentNumber = value.assignmentNumber;
    const assignmentVersion = value.assignmentVersion;
    const formattedAssignmentNumber = assignmentNumber.substr(0, 4) + '-' +
                                      assignmentNumber.substr(4, 2) + '-' +
                                      assignmentNumber.substr(6, 5) + '.' +
                                      assignmentVersion;
    return formattedAssignmentNumber;
  }

}
