import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatecatalogComponent } from './ratecatalog.component';

describe('RatecatalogComponent', () => {
  let component: RatecatalogComponent;
  let fixture: ComponentFixture<RatecatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatecatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatecatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
