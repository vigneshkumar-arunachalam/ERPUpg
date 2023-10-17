import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupEditPIComponent } from './dup-edit-pi.component';

describe('DupEditPIComponent', () => {
  let component: DupEditPIComponent;
  let fixture: ComponentFixture<DupEditPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupEditPIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupEditPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
