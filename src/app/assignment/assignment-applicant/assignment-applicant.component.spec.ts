import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentApplicantComponent } from './assignment-applicant.component';

describe('AssignmentApplicantComponent', () => {
  let component: AssignmentApplicantComponent;
  let fixture: ComponentFixture<AssignmentApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
