import { Component, OnInit } from '@angular/core';
import { DataModelsService } from '../services/data-models.service';

declare function readBlob(files: any, outputId: any): any;

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  reader = new FileReader();

  constructor(private service: DataModelsService) { }

  handleFileInput(file: any) {
    // this.defaultFile = new Blob(file);
    this.reader.onloadend = (event: Event) => {
      this.service.setAssignments(this.reader.result);
      this.service.setFileName(file.name);
   };
    this.reader.readAsBinaryString(file);
  }

  buttonClicked() {
      console.log('put together a file to use with filereader');
  }

  ngOnInit() {
  }

}
