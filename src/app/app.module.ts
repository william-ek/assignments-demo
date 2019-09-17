import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentDetailComponent } from './assignment/assignment-detail/assignment-detail.component';
import { AssignmentInspectionComponent } from './assignment/assignment-inspection/assignment-inspection.component';
import { AssignmentUnitComponent } from './assignment/assignment-unit/assignment-unit.component';
import { AssignmentViolationsComponent } from './assignment/assignment-violations/assignment-violations.component';
import { ViolationcodesComponent } from './violationcodes/violationcodes.component';
import { AssignmentApplicantComponent } from './assignment/assignment-applicant/assignment-applicant.component';
import { AssignmentNumberPipe } from './pipes/assignment-number.pipe';
import { ConfigureComponent } from './configure/configure.component';
import { AssignmentCustomerComponent } from './assignment/assignment-customer/assignment-customer.component';
import { ViolationCodesTableComponent } from './violationcodes/violation-codes-table/violation-codes-table.component';
import { ActivityReportComponent } from './footer/activity-report/activity-report.component';
import { ActivityReportDialogComponent } from './footer/activity-report/activity-report-dialog/activity-report-dialog.component';
import { DrNamePipe } from './pipes/dr-name.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { CustomerNamePipe } from './pipes/customer-name.pipe';
import { PhoneNumbersPipe } from './pipes/phone-numbers.pipe';
import { FeetAndInchesPipe } from './pipes/feet-and-inches.pipe';
import { AssignmentViolationsEditComponent } from './assignment/assignment-violations/assignment-violations-edit/assignment-violations-edit.component';
import { CustomerAddressPipe } from './pipes/customer-address.pipe';
import { AssignmentViolationsDialogComponent } from './assignment/assignment-violations/assignment-violations-dialog/assignment-violations-dialog.component';
import { SubmitButtonDialogComponent } from './shared/submit-button-dialog/submit-button-dialog.component';
import { AddressComponent } from './shared/address/address.component';
import { UnitSectionsComponent } from './shared/unit-sections/unit-sections.component';
import { UnitOwnersComponent } from './shared/unit-owners/unit-owners.component';
import { ParkComponent } from './shared/park/park.component';
import { CustomerComponent } from './shared/customer/customer.component';
import { UnitComponent } from './shared/unit/unit.component';
import { AddViolationComponent } from './footer/add-violation/add-violation.component';
import { AssignmentViolationsCreateComponent } from './assignment/assignment-violations/assignment-violations-create/assignment-violations-create.component';
import { ComplianceDatePipe } from './pipes/compliance-date.pipe';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    AssignmentsComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
    AssignmentInspectionComponent,
    AssignmentUnitComponent,
    ViolationcodesComponent,
    AssignmentApplicantComponent,
    AssignmentNumberPipe,
    ConfigureComponent,
    AssignmentCustomerComponent,
    ViolationCodesTableComponent,
    ActivityReportComponent,
    ActivityReportDialogComponent,
    DrNamePipe,
    PhoneNumberPipe,
    CustomerNamePipe,
    PhoneNumbersPipe,
    FeetAndInchesPipe,
    AssignmentViolationsComponent,
    AssignmentViolationsEditComponent,
    CustomerAddressPipe,
    AssignmentViolationsDialogComponent,
    SubmitButtonDialogComponent,
    AddressComponent,
    UnitSectionsComponent,
    UnitOwnersComponent,
    ParkComponent,
    CustomerComponent,
    UnitComponent,
    AddViolationComponent,
    AssignmentViolationsCreateComponent,
    ComplianceDatePipe,
    LoadingSpinnerComponent,
    HomeComponent
  ],
  entryComponents: [
    ActivityReportDialogComponent,
    AssignmentViolationsDialogComponent,
    SubmitButtonDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
