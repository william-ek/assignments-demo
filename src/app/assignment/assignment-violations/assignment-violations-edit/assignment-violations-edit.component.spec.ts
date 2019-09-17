import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentViolationsEditComponent } from './assignment-violations-edit.component';

describe('AssignmentViolationsEditComponent', () => {
  let component: AssignmentViolationsEditComponent;
  let fixture: ComponentFixture<AssignmentViolationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentViolationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentViolationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
