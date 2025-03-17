import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcareProformaInvoiceComponent } from './dcare-proforma-invoice.component';

describe('DcareProformaInvoiceComponent', () => {
  let component: DcareProformaInvoiceComponent;
  let fixture: ComponentFixture<DcareProformaInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcareProformaInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcareProformaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
