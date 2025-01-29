import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DidStockComponent } from './did-stock.component';

describe('DidStockComponent', () => {
  let component: DidStockComponent;
  let fixture: ComponentFixture<DidStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DidStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DidStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
