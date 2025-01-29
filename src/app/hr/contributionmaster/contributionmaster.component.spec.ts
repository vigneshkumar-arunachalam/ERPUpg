import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionmasterComponent } from './contributionmaster.component';

describe('ContributionmasterComponent', () => {
  let component: ContributionmasterComponent;
  let fixture: ComponentFixture<ContributionmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
