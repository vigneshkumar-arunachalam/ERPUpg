import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DIDTrunkNameComponent } from './didtrunk-name.component';

describe('DIDTrunkNameComponent', () => {
  let component: DIDTrunkNameComponent;
  let fixture: ComponentFixture<DIDTrunkNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DIDTrunkNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DIDTrunkNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
