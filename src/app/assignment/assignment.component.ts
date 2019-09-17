import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Data, Params } from '@angular/router';
import { DataModelsService } from 'src/app/services/data-models.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit, OnDestroy {

  assignment = {};

  assignmentId = 0;

  parametersSubscription: Subscription;

  constructor(private service: DataModelsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
/*     console.log('AssignmentComponent - init');
    this.assignmentId = +this.route.snapshot.params['id'];
    this.assignment = this.service.getAssignment(this.assignmentId);
    console.log(this.assignmentId);
    this.router.navigate(['detail'], {relativeTo: this.route}); */
    this.parametersSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.assignmentId = params['id'];
        this.assignment = this.service.getAssignment(this.assignmentId);
        this.router.navigate(['detail'], {relativeTo: this.route});
      }
    );
  }

  ngOnDestroy() {
    this.parametersSubscription.unsubscribe();
    this.service.assignment = {};
  }

}
