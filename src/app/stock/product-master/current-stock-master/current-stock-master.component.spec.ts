import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockMasterComponent } from './current-stock-master.component';

describe('CurrentStockMasterComponent', () => {
  let component: CurrentStockMasterComponent;
  let fixture: ComponentFixture<CurrentStockMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentStockMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStockMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
