import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcareAddInvoiceComponent } from './dcare-add-invoice.component';

describe('DcareAddInvoiceComponent', () => {
  let component: DcareAddInvoiceComponent;
  let fixture: ComponentFixture<DcareAddInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcareAddInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcareAddInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
