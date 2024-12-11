import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DIDNumberCatalogComponent } from './didnumber-catalog.component';

describe('DIDNumberCatalogComponent', () => {
  let component: DIDNumberCatalogComponent;
  let fixture: ComponentFixture<DIDNumberCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DIDNumberCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DIDNumberCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
