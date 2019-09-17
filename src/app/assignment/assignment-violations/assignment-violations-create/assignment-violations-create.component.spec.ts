import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentViolationsCreateComponent } from './assignment-violations-create.component';

describe('AssignmentViolationsCreateComponent', () => {
  let component: AssignmentViolationsCreateComponent;
  let fixture: ComponentFixture<AssignmentViolationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentViolationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentViolationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
