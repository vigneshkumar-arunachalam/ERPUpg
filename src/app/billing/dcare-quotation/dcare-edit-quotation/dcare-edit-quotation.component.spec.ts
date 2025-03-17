import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcareEditQuotationComponent } from './dcare-edit-quotation.component';

describe('DcareEditQuotationComponent', () => {
  let component: DcareEditQuotationComponent;
  let fixture: ComponentFixture<DcareEditQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcareEditQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcareEditQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
