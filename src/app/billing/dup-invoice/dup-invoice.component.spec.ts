import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupInvoiceComponent } from './dup-invoice.component';

describe('DupInvoiceComponent', () => {
  let component: DupInvoiceComponent;
  let fixture: ComponentFixture<DupInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
