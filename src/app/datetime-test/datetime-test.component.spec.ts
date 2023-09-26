import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeTestComponent } from './datetime-test.component';

describe('DatetimeTestComponent', () => {
  let component: DatetimeTestComponent;
  let fixture: ComponentFixture<DatetimeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatetimeTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
