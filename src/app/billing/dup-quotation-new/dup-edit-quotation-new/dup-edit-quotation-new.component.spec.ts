import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupEditQuotationNewComponent } from './dup-edit-quotation-new.component';

describe('DupEditQuotationNewComponent', () => {
  let component: DupEditQuotationNewComponent;
  let fixture: ComponentFixture<DupEditQuotationNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupEditQuotationNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupEditQuotationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
