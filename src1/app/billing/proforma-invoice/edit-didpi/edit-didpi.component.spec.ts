import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDidpiComponent } from './edit-didpi.component';

describe('EditDidpiComponent', () => {
  let component: EditDidpiComponent;
  let fixture: ComponentFixture<EditDidpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDidpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDidpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
