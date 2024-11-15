import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDIDNumberCatalogComponent } from './stock-didnumber-catalog.component';

describe('StockDIDNumberCatalogComponent', () => {
  let component: StockDIDNumberCatalogComponent;
  let fixture: ComponentFixture<StockDIDNumberCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDIDNumberCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDIDNumberCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
