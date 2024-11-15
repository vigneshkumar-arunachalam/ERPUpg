import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRateCatalogComponent } from './edit-rate-catalog.component';

describe('EditRateCatalogComponent', () => {
  let component: EditRateCatalogComponent;
  let fixture: ComponentFixture<EditRateCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRateCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRateCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
