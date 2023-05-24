import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionnewComponent } from './transactionnew.component';

describe('TransactionnewComponent', () => {
  let component: TransactionnewComponent;
  let fixture: ComponentFixture<TransactionnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
