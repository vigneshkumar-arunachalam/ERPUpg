import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEntryCall4telTrendComponent } from './purchase-entry-call4tel-trend.component';

describe('PurchaseEntryCall4telTrendComponent', () => {
  let component: PurchaseEntryCall4telTrendComponent;
  let fixture: ComponentFixture<PurchaseEntryCall4telTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseEntryCall4telTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEntryCall4telTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
