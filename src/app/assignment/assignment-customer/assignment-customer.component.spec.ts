import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCustomerComponent } from './assignment-customer.component';

describe('AssignmentCustomerComponent', () => {
  let component: AssignmentCustomerComponent;
  let fixture: ComponentFixture<AssignmentCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
