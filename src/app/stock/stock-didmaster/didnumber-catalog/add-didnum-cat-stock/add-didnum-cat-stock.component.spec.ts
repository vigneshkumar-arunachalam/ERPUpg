import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDIDNumCatStockComponent } from './add-didnum-cat-stock.component';

describe('AddDIDNumCatStockComponent', () => {
  let component: AddDIDNumCatStockComponent;
  let fixture: ComponentFixture<AddDIDNumCatStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDIDNumCatStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDIDNumCatStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
