import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTemplateComponent } from './calendar-template.component';

describe('CalendarTemplateComponent', () => {
  let component: CalendarTemplateComponent;
  let fixture: ComponentFixture<CalendarTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
