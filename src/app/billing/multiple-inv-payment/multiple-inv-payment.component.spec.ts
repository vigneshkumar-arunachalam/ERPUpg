import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleInvPaymentComponent } from './multiple-inv-payment.component';

describe('MultipleInvPaymentComponent', () => {
  let component: MultipleInvPaymentComponent;
  let fixture: ComponentFixture<MultipleInvPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleInvPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleInvPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
