import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoipswitchComponent } from './voipswitch.component';

describe('VoipswitchComponent', () => {
  let component: VoipswitchComponent;
  let fixture: ComponentFixture<VoipswitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoipswitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoipswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
