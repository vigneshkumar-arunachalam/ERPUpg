import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsalaryentryComponent } from './addsalaryentry.component';

describe('AddsalaryentryComponent', () => {
  let component: AddsalaryentryComponent;
  let fixture: ComponentFixture<AddsalaryentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsalaryentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsalaryentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
