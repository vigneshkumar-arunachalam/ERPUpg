import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDIDNumCatStockComponent } from './edit-didnum-cat-stock.component';

describe('EditDIDNumCatStockComponent', () => {
  let component: EditDIDNumCatStockComponent;
  let fixture: ComponentFixture<EditDIDNumCatStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDIDNumCatStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDIDNumCatStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
