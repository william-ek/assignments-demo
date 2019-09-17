import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityReportDialogComponent } from './activity-report-dialog.component';

describe('ActivityReportDialogComponent', () => {
  let component: ActivityReportDialogComponent;
  let fixture: ComponentFixture<ActivityReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
