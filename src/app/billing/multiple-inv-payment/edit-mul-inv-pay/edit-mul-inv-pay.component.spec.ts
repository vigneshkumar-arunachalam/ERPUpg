import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMulInvPayComponent } from './edit-mul-inv-pay.component';

describe('EditMulInvPayComponent', () => {
  let component: EditMulInvPayComponent;
  let fixture: ComponentFixture<EditMulInvPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMulInvPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMulInvPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
