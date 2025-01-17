import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesgTypeMgmtComponent } from './desg-type-mgmt.component';

describe('DesgTypeMgmtComponent', () => {
  let component: DesgTypeMgmtComponent;
  let fixture: ComponentFixture<DesgTypeMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesgTypeMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesgTypeMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
