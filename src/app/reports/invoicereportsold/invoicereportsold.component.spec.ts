import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicereportsoldComponent } from './invoicereportsold.component';

describe('InvoicereportsoldComponent', () => {
  let component: InvoicereportsoldComponent;
  let fixture: ComponentFixture<InvoicereportsoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicereportsoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicereportsoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
