import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEntryMrVoipTrendComponent } from './purchase-entry-mr-voip-trend.component';

describe('PurchaseEntryMrVoipTrendComponent', () => {
  let component: PurchaseEntryMrVoipTrendComponent;
  let fixture: ComponentFixture<PurchaseEntryMrVoipTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseEntryMrVoipTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEntryMrVoipTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
