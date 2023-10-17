import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupAddQuotationNewComponent } from './dup-add-quotation-new.component';

describe('DupAddQuotationNewComponent', () => {
  let component: DupAddQuotationNewComponent;
  let fixture: ComponentFixture<DupAddQuotationNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupAddQuotationNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupAddQuotationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
