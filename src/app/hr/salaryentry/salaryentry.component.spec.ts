import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryentryComponent } from './salaryentry.component';

describe('SalaryentryComponent', () => {
  let component: SalaryentryComponent;
  let fixture: ComponentFixture<SalaryentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
