import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCatelogMasterComponent } from './rate-catelog-master.component';

describe('RateCatelogMasterComponent', () => {
  let component: RateCatelogMasterComponent;
  let fixture: ComponentFixture<RateCatelogMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateCatelogMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCatelogMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
