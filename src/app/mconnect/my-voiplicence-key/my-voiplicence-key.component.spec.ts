import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVOIPLicenceKeyComponent } from './my-voiplicence-key.component';

describe('MyVOIPLicenceKeyComponent', () => {
  let component: MyVOIPLicenceKeyComponent;
  let fixture: ComponentFixture<MyVOIPLicenceKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVOIPLicenceKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVOIPLicenceKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
