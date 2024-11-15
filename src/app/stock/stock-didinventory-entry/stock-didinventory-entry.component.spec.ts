import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDIDInventoryEntryComponent } from './stock-didinventory-entry.component';

describe('StockDIDInventoryEntryComponent', () => {
  let component: StockDIDInventoryEntryComponent;
  let fixture: ComponentFixture<StockDIDInventoryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDIDInventoryEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDIDInventoryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
