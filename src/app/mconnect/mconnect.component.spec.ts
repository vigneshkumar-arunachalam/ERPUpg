import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MconnectComponent } from './mconnect.component';

describe('MconnectComponent', () => {
  let component: MconnectComponent;
  let fixture: ComponentFixture<MconnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MconnectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
