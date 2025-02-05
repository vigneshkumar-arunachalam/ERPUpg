import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavereqFinalComponent } from './leavereq-final.component';

describe('LeavereqFinalComponent', () => {
  let component: LeavereqFinalComponent;
  let fixture: ComponentFixture<LeavereqFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavereqFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavereqFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
