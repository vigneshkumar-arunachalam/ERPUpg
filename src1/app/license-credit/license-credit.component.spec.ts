import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCreditComponent } from './license-credit.component';

describe('LicenseCreditComponent', () => {
  let component: LicenseCreditComponent;
  let fixture: ComponentFixture<LicenseCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
