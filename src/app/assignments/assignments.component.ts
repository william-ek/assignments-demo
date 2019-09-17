import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataModelsService } from '../services/data-models.service';
import { RepositoryService } from '../services/repository.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit, OnDestroy {

  repositorySubscription: Subscription;

  assignments = {};

  constructor(private service: DataModelsService, private repository: RepositoryService) { }

  getAssignments() {
    const assignments = this.service.getAssigments();
    if (assignments !== undefined) {
      const assign = assignments.assignments;
      return assign;
    }
    return undefined;
  }

  ngOnInit() {

    this.repositorySubscription = this.repository.getJsonObject('assignments.json')
    .subscribe((response) => {
        if (response.status === 'good') {
          this.service.setAssignments(JSON.parse(response.content));
        }
    });
  }

  ngOnDestroy() {
    this.repositorySubscription.unsubscribe();
  }

}
