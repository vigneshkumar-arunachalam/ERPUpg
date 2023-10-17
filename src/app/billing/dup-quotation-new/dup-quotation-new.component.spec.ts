import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupQuotationNewComponent } from './dup-quotation-new.component';

describe('DupQuotationNewComponent', () => {
  let component: DupQuotationNewComponent;
  let fixture: ComponentFixture<DupQuotationNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupQuotationNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupQuotationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
