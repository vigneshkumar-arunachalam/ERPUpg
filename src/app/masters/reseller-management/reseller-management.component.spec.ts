import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerManagementComponent } from './reseller-management.component';

describe('ResellerManagementComponent', () => {
  let component: ResellerManagementComponent;
  let fixture: ComponentFixture<ResellerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellerManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
