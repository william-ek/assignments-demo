import { Component, OnInit, OnDestroy } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-violationcodes',
  templateUrl: './violationcodes.component.html',
  styleUrls: ['./violationcodes.component.css']
})
export class ViolationcodesComponent implements OnInit, OnDestroy {

  repositorySubscription: Subscription;

  violations: any = {};

  violationCodes = [];

  programFilter = '';
  categoryFilter = '';
  codeFilter = '';
  codeSectionFilter = '';
  legacyCodeFilter = '';
  descriptionFilter = '';

  constructor(private repository: RepositoryService) { }

  onFilterInput(event: any) {
    this.violationCodes = [];
    for (const violation of this.violations) {
      if (this.programFilter.length > 0) {
        if (violation.program === null || !violation.program.toUpperCase().includes(this.programFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.categoryFilter.length > 0) {
        if (violation.category === null || !violation.category.toUpperCase().includes(this.categoryFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.codeFilter.length > 0) {
        if (violation.code === null || !violation.code.toUpperCase().includes(this.codeFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.codeSectionFilter.length > 0) {
        if (violation.codeSections === null || !violation.codeSections.toUpperCase().includes(this.codeSectionFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.legacyCodeFilter.length > 0) {
        if (violation.legacyCode === null || !violation.legacyCode.toUpperCase().includes(this.legacyCodeFilter.toUpperCase())) {
          continue;
        }
      }
      if (this.descriptionFilter.length > 0) {
        if (violation.longDescription === null || !violation.longDescription.toUpperCase().includes(this.descriptionFilter.toUpperCase())) {
          continue;
        }
      }
      this.violationCodes.push(violation);
    }
  }

  ngOnInit(): void {

    this.repositorySubscription = this.repository.getJsonObject('violationCodes.json')
      .subscribe((response) => {
        if (response.status === 'good') {
          this.violations = JSON.parse(response.content);
          this.violationCodes = this.violations;
        }
    });
  }

  ngOnDestroy() {
    this.repositorySubscription.unsubscribe();
  }

}
