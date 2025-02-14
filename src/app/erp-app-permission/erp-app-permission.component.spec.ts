import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpAppPermissionComponent } from './erp-app-permission.component';

describe('ErpAppPermissionComponent', () => {
  let component: ErpAppPermissionComponent;
  let fixture: ComponentFixture<ErpAppPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErpAppPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpAppPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
