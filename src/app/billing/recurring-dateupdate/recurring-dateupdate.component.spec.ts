import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDateupdateComponent } from './recurring-dateupdate.component';

describe('RecurringDateupdateComponent', () => {
  let component: RecurringDateupdateComponent;
  let fixture: ComponentFixture<RecurringDateupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringDateupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringDateupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
