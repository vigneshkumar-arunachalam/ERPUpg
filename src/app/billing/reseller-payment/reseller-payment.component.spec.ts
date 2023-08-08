import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerPaymentComponent } from './reseller-payment.component';

describe('ResellerPaymentComponent', () => {
  let component: ResellerPaymentComponent;
  let fixture: ComponentFixture<ResellerPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellerPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
