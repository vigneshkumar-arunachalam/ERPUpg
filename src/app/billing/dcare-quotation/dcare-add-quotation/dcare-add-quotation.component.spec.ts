import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcareAddQuotationComponent } from './dcare-add-quotation.component';

describe('DcareAddQuotationComponent', () => {
  let component: DcareAddQuotationComponent;
  let fixture: ComponentFixture<DcareAddQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcareAddQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcareAddQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
