import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirynewComponent } from './enquirynew.component';

describe('EnquirynewComponent', () => {
  let component: EnquirynewComponent;
  let fixture: ComponentFixture<EnquirynewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquirynewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirynewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
