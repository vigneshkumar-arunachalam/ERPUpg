import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenStockComponent } from './add-gen-stock.component';

describe('AddGenStockComponent', () => {
  let component: AddGenStockComponent;
  let fixture: ComponentFixture<AddGenStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGenStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGenStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
