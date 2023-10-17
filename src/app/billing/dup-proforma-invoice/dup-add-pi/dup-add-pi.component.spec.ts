import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupAddPIComponent } from './dup-add-pi.component';

describe('DupAddPIComponent', () => {
  let component: DupAddPIComponent;
  let fixture: ComponentFixture<DupAddPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupAddPIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupAddPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
