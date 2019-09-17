import { Component, OnInit } from '@angular/core';
import { DataModelsService } from 'src/app/services/data-models.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-violation',
  templateUrl: './add-violation.component.html',
  styleUrls: ['./add-violation.component.css']
})
export class AddViolationComponent implements OnInit {

  constructor(private data: DataModelsService, private router: Router) { }

  onClick() {
    const route = this.router.url.replace('violations', 'violation');
    this.router.navigate([route]);
  }

  ngOnInit() {
  }

}
