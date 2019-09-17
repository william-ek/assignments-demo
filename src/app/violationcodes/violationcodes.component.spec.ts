import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationcodesComponent } from './violationcodes.component';

describe('ViolationcodesComponent', () => {
  let component: ViolationcodesComponent;
  let fixture: ComponentFixture<ViolationcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
