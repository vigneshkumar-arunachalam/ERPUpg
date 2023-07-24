import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateDOComponent } from './duplicate-do.component';

describe('DuplicateDOComponent', () => {
  let component: DuplicateDOComponent;
  let fixture: ComponentFixture<DuplicateDOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateDOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateDOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
