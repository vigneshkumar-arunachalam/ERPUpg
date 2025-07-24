import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcipallowComponent } from './dcipallow.component';

describe('DcipallowComponent', () => {
  let component: DcipallowComponent;
  let fixture: ComponentFixture<DcipallowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcipallowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcipallowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
