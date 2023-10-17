import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupCustomerNewAllComponent } from './dup-customer-new-all.component';

describe('DupCustomerNewAllComponent', () => {
  let component: DupCustomerNewAllComponent;
  let fixture: ComponentFixture<DupCustomerNewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupCustomerNewAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupCustomerNewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
