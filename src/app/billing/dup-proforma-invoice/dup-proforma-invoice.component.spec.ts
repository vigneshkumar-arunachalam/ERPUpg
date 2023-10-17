import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupProformaInvoiceComponent } from './dup-proforma-invoice.component';

describe('DupProformaInvoiceComponent', () => {
  let component: DupProformaInvoiceComponent;
  let fixture: ComponentFixture<DupProformaInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupProformaInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupProformaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
