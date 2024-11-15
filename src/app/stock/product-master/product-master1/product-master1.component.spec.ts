import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMaster1Component } from './product-master1.component';

describe('ProductMaster1Component', () => {
  let component: ProductMaster1Component;
  let fixture: ComponentFixture<ProductMaster1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMaster1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMaster1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
