import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffpermissionreportComponent } from './staffpermissionreport.component';

describe('StaffpermissionreportComponent', () => {
  let component: StaffpermissionreportComponent;
  let fixture: ComponentFixture<StaffpermissionreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffpermissionreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffpermissionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
