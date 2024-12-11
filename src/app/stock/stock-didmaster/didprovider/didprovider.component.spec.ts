import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DIDProviderComponent } from './didprovider.component';

describe('DIDProviderComponent', () => {
  let component: DIDProviderComponent;
  let fixture: ComponentFixture<DIDProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DIDProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DIDProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
