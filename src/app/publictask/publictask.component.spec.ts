import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublictaskComponent } from './publictask.component';

describe('PublictaskComponent', () => {
  let component: PublictaskComponent;
  let fixture: ComponentFixture<PublictaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublictaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublictaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
