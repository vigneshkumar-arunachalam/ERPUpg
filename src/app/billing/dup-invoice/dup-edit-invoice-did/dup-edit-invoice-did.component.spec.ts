import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupEditInvoiceDIDComponent } from './dup-edit-invoice-did.component';

describe('DupEditInvoiceDIDComponent', () => {
  let component: DupEditInvoiceDIDComponent;
  let fixture: ComponentFixture<DupEditInvoiceDIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupEditInvoiceDIDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupEditInvoiceDIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
