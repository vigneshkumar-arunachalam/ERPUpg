import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInventoryEntryComponent } from './stock-inventory-entry.component';

describe('StockInventoryEntryComponent', () => {
  let component: StockInventoryEntryComponent;
  let fixture: ComponentFixture<StockInventoryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockInventoryEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInventoryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
