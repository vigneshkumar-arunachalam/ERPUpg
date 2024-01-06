import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringCheckerComponent } from './recurring-checker.component';

describe('RecurringCheckerComponent', () => {
  let component: RecurringCheckerComponent;
  let fixture: ComponentFixture<RecurringCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
