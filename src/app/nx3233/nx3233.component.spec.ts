import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nx3233Component } from './nx3233.component';

describe('Nx3233Component', () => {
  let component: Nx3233Component;
  let fixture: ComponentFixture<Nx3233Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Nx3233Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Nx3233Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
