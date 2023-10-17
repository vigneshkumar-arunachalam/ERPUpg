import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupEditInvoiceComponent } from './dup-edit-invoice.component';

describe('DupEditInvoiceComponent', () => {
  let component: DupEditInvoiceComponent;
  let fixture: ComponentFixture<DupEditInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupEditInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupEditInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
