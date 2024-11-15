import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCatalogComponent } from './rate-catalog.component';

describe('RateCatalogComponent', () => {
  let component: RateCatalogComponent;
  let fixture: ComponentFixture<RateCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
