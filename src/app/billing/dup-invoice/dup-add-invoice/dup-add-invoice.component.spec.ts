import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupAddInvoiceComponent } from './dup-add-invoice.component';

describe('DupAddInvoiceComponent', () => {
  let component: DupAddInvoiceComponent;
  let fixture: ComponentFixture<DupAddInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupAddInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupAddInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
