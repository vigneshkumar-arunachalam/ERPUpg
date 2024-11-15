import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PEVoipTrendComponent } from './pevoip-trend.component';

describe('PEVoipTrendComponent', () => {
  let component: PEVoipTrendComponent;
  let fixture: ComponentFixture<PEVoipTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PEVoipTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PEVoipTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
