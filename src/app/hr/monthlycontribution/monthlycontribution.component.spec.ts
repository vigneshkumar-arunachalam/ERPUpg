import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlycontributionComponent } from './monthlycontribution.component';

describe('MonthlycontributionComponent', () => {
  let component: MonthlycontributionComponent;
  let fixture: ComponentFixture<MonthlycontributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlycontributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlycontributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
