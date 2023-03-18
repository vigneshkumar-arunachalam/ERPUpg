import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDidpiComponent } from './add-didpi.component';

describe('AddDidpiComponent', () => {
  let component: AddDidpiComponent;
  let fixture: ComponentFixture<AddDidpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDidpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDidpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
