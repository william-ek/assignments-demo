import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentViolationsDialogComponent } from './assignment-violations-dialog.component';

describe('AssignmentViolationsDialogComponent', () => {
  let component: AssignmentViolationsDialogComponent;
  let fixture: ComponentFixture<AssignmentViolationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentViolationsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentViolationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
