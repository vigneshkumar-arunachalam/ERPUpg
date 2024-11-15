import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMulInvPayComponent } from './add-mul-inv-pay.component';

describe('AddMulInvPayComponent', () => {
  let component: AddMulInvPayComponent;
  let fixture: ComponentFixture<AddMulInvPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMulInvPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMulInvPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
