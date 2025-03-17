import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPayslipComponent } from './current-payslip.component';

describe('CurrentPayslipComponent', () => {
  let component: CurrentPayslipComponent;
  let fixture: ComponentFixture<CurrentPayslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPayslipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
