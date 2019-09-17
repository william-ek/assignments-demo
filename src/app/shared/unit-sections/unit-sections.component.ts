import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-unit-sections',
  templateUrl: './unit-sections.component.html',
  styleUrls: ['./unit-sections.component.css']
})
export class UnitSectionsComponent implements OnInit {

  @Input() sections: any;

  constructor() { }

  getSections() {
    const sections = [];
    try {
      const unitSections = this.sections;
      unitSections.forEach(section => {
          const sectionData: any = {};
          sectionData.length = section.length;
          sectionData.width = section.width;
          sectionData.serialNumber = '';
          sectionData.insignia = '';
          try {
            const unitIdentifiers = section.unitIdentifiers;
            unitIdentifiers.forEach(identifier => {
              if (identifier.stopDate === null || identifier.stopDate === '') {
                if (identifier.identifierType === 'INSIGNIA') {
                  sectionData.insignia = identifier.identifierValue;
                }
                if (identifier.identifierType === 'SERIAL_NUMBER') {
                  sectionData.serialNumber = identifier.identifierValue;
                }
              }
            });
          } catch (e) {}
          sections.push(sectionData);
      });
    } catch (e) {}
    return sections;
  }

  ngOnInit() {
  }

}
