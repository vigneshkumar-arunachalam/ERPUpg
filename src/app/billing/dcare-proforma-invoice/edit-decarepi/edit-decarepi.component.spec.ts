import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDecarepiComponent } from './edit-decarepi.component';

describe('EditDecarepiComponent', () => {
  let component: EditDecarepiComponent;
  let fixture: ComponentFixture<EditDecarepiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDecarepiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDecarepiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
