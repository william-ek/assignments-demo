import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitButtonDialogComponent } from './submit-button-dialog.component';

describe('SubmitButtonDialogComponent', () => {
  let component: SubmitButtonDialogComponent;
  let fixture: ComponentFixture<SubmitButtonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitButtonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
