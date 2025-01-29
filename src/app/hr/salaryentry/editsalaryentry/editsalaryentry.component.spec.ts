import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsalaryentryComponent } from './editsalaryentry.component';

describe('EditsalaryentryComponent', () => {
  let component: EditsalaryentryComponent;
  let fixture: ComponentFixture<EditsalaryentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsalaryentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsalaryentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
