import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseentryreportComponent } from './purchaseentryreport.component';

describe('PurchaseentryreportComponent', () => {
  let component: PurchaseentryreportComponent;
  let fixture: ComponentFixture<PurchaseentryreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseentryreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseentryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
