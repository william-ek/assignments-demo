import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentDetailComponent } from './assignment/assignment-detail/assignment-detail.component';
import { AssignmentInspectionComponent } from './assignment/assignment-inspection/assignment-inspection.component';
import { AssignmentViolationsComponent } from './assignment/assignment-violations/assignment-violations.component';
import { AssignmentUnitComponent } from './assignment/assignment-unit/assignment-unit.component';
import { ViolationcodesComponent } from './violationcodes/violationcodes.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AssignmentApplicantComponent } from './assignment/assignment-applicant/assignment-applicant.component';
import { ConfigureComponent } from './configure/configure.component';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { AssignmentCustomerComponent } from './assignment/assignment-customer/assignment-customer.component';
import { ActivityReportComponent } from './footer/activity-report/activity-report.component';
import { AssignmentViolationsEditComponent } from './assignment/assignment-violations/assignment-violations-edit/assignment-violations-edit.component';
import { AddViolationComponent } from './footer/add-violation/add-violation.component';
import { AssignmentViolationsCreateComponent } from './assignment/assignment-violations/assignment-violations-create/assignment-violations-create.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'assignments', canActivate: [AuthGuardService], component: AssignmentsComponent},
  { path: 'assignment/:id', canActivateChild: [AuthGuardService], component: AssignmentComponent, children: [
    { path: 'detail', component: AssignmentDetailComponent},
    { path: 'customer', component: AssignmentCustomerComponent},
    { path: 'applicant', component: AssignmentApplicantComponent},
    { path: 'unit', component: AssignmentUnitComponent},
    { path: 'inspection', component: AssignmentInspectionComponent, canDeactivate: [CanDeactivateGuardService]},
    { path: 'violations', component: AssignmentViolationsComponent},
    { path: 'violation', component: AssignmentViolationsCreateComponent, canDeactivate: [CanDeactivateGuardService]},
    { path: 'violation/:vid', component: AssignmentViolationsEditComponent, canDeactivate: [CanDeactivateGuardService]}
    ]},
  { path: 'violationcodes', canActivate: [AuthGuardService], component: ViolationcodesComponent},
  { path: 'configuration', canActivate: [AuthGuardService], component: ConfigureComponent},
  {
    path: '',
    component: ActivityReportComponent,
    outlet: 'activityReport'
   },
   {
    path: '',
    component: AddViolationComponent,
    outlet: 'addViolation'
   },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
