import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGenStockComponent } from './edit-gen-stock.component';

describe('EditGenStockComponent', () => {
  let component: EditGenStockComponent;
  let fixture: ComponentFixture<EditGenStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGenStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGenStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
