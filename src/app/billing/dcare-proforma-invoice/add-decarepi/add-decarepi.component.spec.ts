import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecarepiComponent } from './add-decarepi.component';

describe('AddDecarepiComponent', () => {
  let component: AddDecarepiComponent;
  let fixture: ComponentFixture<AddDecarepiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDecarepiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDecarepiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
