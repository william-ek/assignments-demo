import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentInspectionComponent } from './assignment-inspection.component';

describe('AssignmentInspectionComponent', () => {
  let component: AssignmentInspectionComponent;
  let fixture: ComponentFixture<AssignmentInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
