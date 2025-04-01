import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockOneComponent } from './current-stock-one.component';

describe('CurrentStockOneComponent', () => {
  let component: CurrentStockOneComponent;
  let fixture: ComponentFixture<CurrentStockOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentStockOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStockOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
