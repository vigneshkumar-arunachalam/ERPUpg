import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseKeyManagementComponent } from './license-key-management.component';

describe('LicenseKeyManagementComponent', () => {
  let component: LicenseKeyManagementComponent;
  let fixture: ComponentFixture<LicenseKeyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseKeyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseKeyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
