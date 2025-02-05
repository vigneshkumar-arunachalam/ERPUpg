import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontmasterComponent } from './editcontmaster.component';

describe('EditcontmasterComponent', () => {
  let component: EditcontmasterComponent;
  let fixture: ComponentFixture<EditcontmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcontmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
