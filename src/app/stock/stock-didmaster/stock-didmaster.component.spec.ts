import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDIDMasterComponent } from './stock-didmaster.component';

describe('StockDIDMasterComponent', () => {
  let component: StockDIDMasterComponent;
  let fixture: ComponentFixture<StockDIDMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDIDMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDIDMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
