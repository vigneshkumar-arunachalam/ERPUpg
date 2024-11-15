import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRateCatalogComponent } from './add-rate-catalog.component';

describe('AddRateCatalogComponent', () => {
  let component: AddRateCatalogComponent;
  let fixture: ComponentFixture<AddRateCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRateCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRateCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
