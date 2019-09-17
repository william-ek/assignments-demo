import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentViolationsComponent } from './assignment-violations.component';

describe('AssignmentViolationsComponent', () => {
  let component: AssignmentViolationsComponent;
  let fixture: ComponentFixture<AssignmentViolationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentViolationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
