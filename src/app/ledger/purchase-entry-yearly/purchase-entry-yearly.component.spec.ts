import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEntryYearlyComponent } from './purchase-entry-yearly.component';

describe('PurchaseEntryYearlyComponent', () => {
  let component: PurchaseEntryYearlyComponent;
  let fixture: ComponentFixture<PurchaseEntryYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseEntryYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEntryYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
