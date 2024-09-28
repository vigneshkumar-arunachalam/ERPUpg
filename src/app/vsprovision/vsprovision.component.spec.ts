import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsprovisionComponent } from './vsprovision.component';

describe('VsprovisionComponent', () => {
  let component: VsprovisionComponent;
  let fixture: ComponentFixture<VsprovisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VsprovisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VsprovisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
