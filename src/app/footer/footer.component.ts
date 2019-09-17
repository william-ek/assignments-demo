import { Component, OnInit } from '@angular/core';
import { DataModelsService } from '../services/data-models.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private data: DataModelsService, private router: Router) { }

  getViolationAddState() {

    try {
      if (this.getCurrentRoute() === '/assignment//violations'
      &&
      this.data.getCurrentAssignment().inspection.purposeOfReport === 'Notice of Violation & Related Information') {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }

  }

  getViolationState() {

    try {
      if (this.getCurrentRoute() === '/assignment//violations'
        &&
        this.data.getCurrentAssignment().violations !== undefined
        &&
        this.data.getCurrentAssignment().violations !== ''
        &&
        this.data.getCurrentAssignment().violations[0] !== undefined) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }

  }

  getCurrentRoute() {
    return this.router.url.replace(/\d/g, '');
  }

  ngOnInit() {
  }

}
