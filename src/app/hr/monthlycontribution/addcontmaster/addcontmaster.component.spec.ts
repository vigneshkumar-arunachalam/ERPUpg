import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontmasterComponent } from './addcontmaster.component';

describe('AddcontmasterComponent', () => {
  let component: AddcontmasterComponent;
  let fixture: ComponentFixture<AddcontmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcontmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
