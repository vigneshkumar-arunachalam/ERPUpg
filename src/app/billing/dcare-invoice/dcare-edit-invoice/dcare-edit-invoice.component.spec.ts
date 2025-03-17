import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcareEditInvoiceComponent } from './dcare-edit-invoice.component';

describe('DcareEditInvoiceComponent', () => {
  let component: DcareEditInvoiceComponent;
  let fixture: ComponentFixture<DcareEditInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcareEditInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcareEditInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
