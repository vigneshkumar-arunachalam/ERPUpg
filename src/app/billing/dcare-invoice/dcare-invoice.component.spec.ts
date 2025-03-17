import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcareInvoiceComponent } from './dcare-invoice.component';

describe('DcareInvoiceComponent', () => {
  let component: DcareInvoiceComponent;
  let fixture: ComponentFixture<DcareInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcareInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcareInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
