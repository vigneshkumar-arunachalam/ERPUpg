import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringResellerComponent } from './recurring-reseller.component';

describe('RecurringResellerComponent', () => {
  let component: RecurringResellerComponent;
  let fixture: ComponentFixture<RecurringResellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringResellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringResellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
