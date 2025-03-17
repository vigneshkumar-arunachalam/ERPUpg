import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcareQuotationComponent } from './dcare-quotation.component';

describe('DcareQuotationComponent', () => {
  let component: DcareQuotationComponent;
  let fixture: ComponentFixture<DcareQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcareQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcareQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
