import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontributionmasterComponent } from './addcontributionmaster.component';

describe('AddcontributionmasterComponent', () => {
  let component: AddcontributionmasterComponent;
  let fixture: ComponentFixture<AddcontributionmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcontributionmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontributionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
